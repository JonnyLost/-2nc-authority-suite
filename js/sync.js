(function () {
  const SETTINGS_KEY = '2ncGitHubSyncSettings';
  const TOKEN_KEY = '2ncGitHubSyncToken';
  const SHA_KEY = '2ncGitHubSyncShas';

  function loadJson(storage, key, fallback) {
    try { return JSON.parse(storage.getItem(key) || '') || fallback; } catch (_) { return fallback; }
  }

  function settings() {
    return {
      owner: 'jonnylost',
      repo: '-2nc-authority-suite',
      branch: 'main',
      musicPath: 'data/music.json',
      comicPath: 'data/comics.json',
      printBranch: 'print-queue',
      printQueuePath: 'print-queue.json',
      deviceName: '',
      ...loadJson(localStorage, SETTINGS_KEY, {})
    };
  }

  function saveSettings(value) {
    const clean = {
      owner: String(value.owner || '').trim(),
      repo: String(value.repo || '').trim(),
      branch: String(value.branch || 'main').trim(),
      musicPath: String(value.musicPath || 'data/music.json').trim(),
      comicPath: String(value.comicPath || 'data/comics.json').trim(),
      printBranch: String(value.printBranch || 'print-queue').trim(),
      printQueuePath: String(value.printQueuePath || 'print-queue.json').trim(),
      deviceName: String(value.deviceName || '').trim()
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(clean));
    if (value.token) sessionStorage.setItem(TOKEN_KEY, String(value.token).trim());
    return clean;
  }

  function token() { return sessionStorage.getItem(TOKEN_KEY) || ''; }
  function shas() { return loadJson(localStorage, SHA_KEY, {}); }
  function saveShas(value) { localStorage.setItem(SHA_KEY, JSON.stringify(value)); }

  function validate(value, requireToken = true) {
    if (!value.owner || !value.repo || !value.branch) throw new Error('Enter the GitHub owner, repository, and branch.');
    if (requireToken && !token()) throw new Error('Enter a GitHub token for this session.');
  }

  async function api(path, options = {}) {
    const response = await fetch(`https://api.github.com${path}`, {
      ...options,
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
        ...(options.headers || {})
      }
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body.message || `GitHub sync failed (${response.status}).`);
      error.status = response.status;
      throw error;
    }
    return body;
  }

  async function getRepositoryFile(path, branch, allowMissing = false) {
    const value = settings();
    validate(value, false);
    try {
      const body = await api(`/repos/${encodeURIComponent(value.owner)}/${encodeURIComponent(value.repo)}/contents/${String(path).split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(branch || value.branch)}`);
      const bytes = Uint8Array.from(atob(String(body.content || '').replace(/\n/g, '')), char => char.charCodeAt(0));
      return { text: new TextDecoder().decode(bytes), sha: body.sha };
    } catch (error) {
      if (allowMissing && error.status === 404) return null;
      throw error;
    }
  }

  function encodeText(text) {
    const bytes = new TextEncoder().encode(String(text));
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    return btoa(binary);
  }

  async function ensureBranch(branch) {
    const value = settings();
    validate(value, true);
    try {
      await api(`/repos/${encodeURIComponent(value.owner)}/${encodeURIComponent(value.repo)}/git/ref/heads/${encodeURIComponent(branch)}`);
      return;
    } catch (error) {
      if (error.status !== 404) throw error;
    }
    const source = await api(`/repos/${encodeURIComponent(value.owner)}/${encodeURIComponent(value.repo)}/git/ref/heads/${encodeURIComponent(value.branch)}`);
    try {
      await api(`/repos/${encodeURIComponent(value.owner)}/${encodeURIComponent(value.repo)}/git/refs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: source.object.sha })
      });
    } catch (error) {
      if (error.status !== 422) throw error;
    }
  }

  async function putRepositoryFile(path, branch, text, sha, message) {
    const value = settings();
    validate(value, true);
    const payload = {
      message: message || 'Update 2NC Authority Suite data',
      content: encodeText(text),
      branch: branch || value.branch
    };
    if (sha) payload.sha = sha;
    return api(`/repos/${encodeURIComponent(value.owner)}/${encodeURIComponent(value.repo)}/contents/${String(path).split('/').map(encodeURIComponent).join('/')}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  function contentPath(value, kind) {
    return kind === 'music' ? value.musicPath : value.comicPath;
  }

  async function getRemote(value, kind) {
    const path = contentPath(value, kind);
    const body = await api(`/repos/${encodeURIComponent(value.owner)}/${encodeURIComponent(value.repo)}/contents/${path.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(value.branch)}`);
    const bytes = Uint8Array.from(atob(String(body.content || '').replace(/\n/g, '')), char => char.charCodeAt(0));
    const rows = JSON.parse(new TextDecoder().decode(bytes));
    if (!Array.isArray(rows)) throw new Error(`Remote ${kind} authority is not a record array.`);
    return { rows, sha: body.sha };
  }

  async function pull() {
    const value = settings();
    validate(value, false);
    const [music, comic] = await Promise.all([getRemote(value, 'music'), getRemote(value, 'comic')]);
    await AuthorityDB.replaceAuthority('music', music.rows, 'github');
    await AuthorityDB.replaceAuthority('comic', comic.rows, 'github');
    await AuthorityDB.markRemoteCanonical('github');
    await AuthorityDB.ensureSeeded();
    const mergedCounts = await AuthorityDB.counts();
    saveShas({ music: music.sha, comic: comic.sha, pulledAt: new Date().toISOString() });
    return mergedCounts;
  }

  function encodeRows(rows) {
    const bytes = new TextEncoder().encode(`${JSON.stringify(rows, null, 2)}\n`);
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    return btoa(binary);
  }

  async function putRemote(value, kind, rows, sha) {
    const path = contentPath(value, kind);
    return api(`/repos/${encodeURIComponent(value.owner)}/${encodeURIComponent(value.repo)}/contents/${path.split('/').map(encodeURIComponent).join('/')}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Update ${kind} authority from 2NC Authority Suite`,
        content: encodeRows(rows),
        branch: value.branch,
        sha
      })
    });
  }

  async function push() {
    const value = settings();
    validate(value, true);
    const known = shas();
    const [remoteMusic, remoteComic] = await Promise.all([getRemote(value, 'music'), getRemote(value, 'comic')]);
    if ((known.music && known.music !== remoteMusic.sha) || (known.comic && known.comic !== remoteComic.sha)) {
      throw new Error('The GitHub authority changed since this device last pulled. Pull the latest data before publishing to avoid overwriting another device.');
    }
    const clean = rows => rows.map(row => Object.fromEntries(Object.entries(row).filter(([key]) => key !== '_localEdited')));
    const [musicRowsRaw, comicRowsRaw] = await Promise.all([AuthorityDB.getAll('music'), AuthorityDB.getAll('comic')]);
    const musicRows = clean(musicRowsRaw);
    const comicRows = clean(comicRowsRaw);
    const musicResult = await putRemote(value, 'music', musicRows, remoteMusic.sha);
    const comicResult = await putRemote(value, 'comic', comicRows, remoteComic.sha);
    saveShas({ music: musicResult.content.sha, comic: comicResult.content.sha, pushedAt: new Date().toISOString() });
    await AuthorityDB.markRemoteCanonical('github');
    return { music: musicRows.length, comic: comicRows.length };
  }

  function status() {
    const value = settings();
    const known = shas();
    return { settings: value, hasToken: Boolean(token()), lastSync: known.pushedAt || known.pulledAt || '' };
  }

  window.AuthoritySync = {
    settings, saveSettings, pull, push, status,
    getRepositoryFile, putRepositoryFile, ensureBranch,
    hasToken: () => Boolean(token())
  };
})();
