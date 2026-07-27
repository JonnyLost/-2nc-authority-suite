(function () {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const escapeHtml = value => String(value ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const safeId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

  const profiles = {
    vinyl: { title: 'Vinyl Dividers', sub: 'Search the internal Music Authority', dim: '5 × 0.675 in' },
    cd: { title: 'CD Dividers', sub: 'Search the internal Music Authority', dim: '2 × 0.675 in' },
    comic: { title: 'Comic Dividers', sub: 'Search the internal Comic Authority', dim: '3.5 × 0.675 in' },
    instrument: { title: 'Instrument Tags', sub: 'Create 4 × 6 retail instrument tags', dim: '6 × 4 in' },
    manager: { title: 'Authority Manager', sub: 'Add, edit, retire, import, and back up authority data', dim: 'Internal database' }
  };

  const state = {
    mode: 'vinyl', selected: null, query: '', level: '', category: '', sort: 'name',
    queue: JSON.parse(localStorage.getItem('2ncQueue') || '[]'),
    music: [], comic: [], managerDataset: 'music', managerSelected: null
  };

  function requireElement(selector) {
    const element = $(selector);
    if (!element) throw new Error(`Required interface element is missing: ${selector}`);
    return element;
  }

  function on(selector, eventName, handler) {
    const element = $(selector);
    if (!element) { AppLog.warn(`Optional interface element not found: ${selector}`); return; }
    element.addEventListener(eventName, handler);
  }

  function text(selector, value) { const element = $(selector); if (element) element.textContent = value; }
  function show(selector, visible) { const element = $(selector); if (element) element.classList.toggle('hidden', !visible); }
  function musicSubgenreLine(row) { return LabelEngine.subgenreLine(row); }
  function cleanSeries(parent, series) {
    let value = String(series || '').trim();
    if (!parent) return value;
    const escaped = String(parent).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    value = value.replace(new RegExp(`^${escaped}\\s*[:\\-–—]?\\s*`, 'i'), '');
    return value || series;
  }

  function currentData() { return state.mode === 'comic' ? state.comic : state.music; }
  function recordCategory(row) { return state.mode === 'comic' ? (row.publisher || 'Unknown Publisher') : (row.genre || 'Uncategorized'); }
  function resultName(row) { return state.mode === 'comic' ? (row.primary ? row.display : cleanSeries(row.parent, row.series)) : row.name; }
  function resultSub(row) {
    return state.mode === 'comic'
      ? (row.primary ? `${row.publisher || ''} · Primary authority` : `${row.parent || 'Standalone'} · ${row.publisher || ''}`)
      : [row.genre, musicSubgenreLine(row), row.level].filter(Boolean).join(' · ');
  }
  function matches(row) {
    const query = state.query.toLowerCase();
    const haystack = state.mode === 'comic'
      ? [row.display, row.parent, row.series, row.publisher, row.type].join(' ')
      : [row.name, row.display, row.genre, row.primarySubgenre || row.subgenre, row.secondarySubgenre, row.type].join(' ');
    return (!query || haystack.toLowerCase().includes(query))
      && (!state.level || row.level === state.level)
      && (!state.category || recordCategory(row) === state.category);
  }

  function renderResults() {
    if (['instrument', 'manager'].includes(state.mode)) return;
    const levelRank = { Primary: 0, Essential: 1, Recommended: 2, Optional: 3, 'Reference Only': 4 };
    const all = currentData().filter(matches);
    all.sort((a, b) => {
      if (state.sort === 'category') return recordCategory(a).localeCompare(recordCategory(b)) || resultName(a).localeCompare(resultName(b));
      if (state.sort === 'level') return (levelRank[a.level] ?? 9) - (levelRank[b.level] ?? 9) || resultName(a).localeCompare(resultName(b));
      return resultName(a).localeCompare(resultName(b));
    });
    const rows = all.slice(0, 400);
    text('#resultCount', `${all.length.toLocaleString()} results${all.length > 400 ? ' (showing first 400)' : ''}`);
    requireElement('#results').innerHTML = rows.map((row, index) => `<div class="resultCard ${state.selected && state.selected.id === row.id ? 'selected' : ''}" data-index="${index}"><div><strong>${escapeHtml(resultName(row))}</strong><br><small>${escapeHtml(resultSub(row))}</small></div><span class="badge">${escapeHtml(row.level || row.type || '')}</span></div>`).join('') || '<div class="empty">No matching records</div>';
    $$('.resultCard').forEach(element => element.addEventListener('click', () => {
      state.selected = rows[Number(element.dataset.index)];
      renderResults(); renderPreview();
    }));
  }

  function renderPreview() {
    if (['instrument', 'manager'].includes(state.mode)) return;
    const box = requireElement('#labelPreview');
    const addButton = requireElement('#addSelected');
    const hierarchy = $('#addHierarchy');
    if (!state.selected) {
      box.className = `label ${state.mode === 'cd' ? 'cdLabel' : state.mode === 'comic' ? 'comicLabel' : 'vinylLabel'}`;
      box.innerHTML = '<strong>Select a record</strong>';
      addButton.disabled = true;
      if (hierarchy) hierarchy.classList.add('hidden');
      text('#selectedDetails', 'Tap a result to preview it.');
      return;
    }
    addButton.disabled = false;
    const row = state.selected;
    if (state.mode === 'comic') {
      box.className = `label comicLabel ${row.primary ? 'primaryComic' : ''}`;
      box.innerHTML = row.primary
        ? `<div class="series">${escapeHtml(row.display)}</div>`
        : `<div class="cue">${escapeHtml(row.parent)}</div><div class="series">${escapeHtml(cleanSeries(row.parent, row.series))}</div>`;
      if (hierarchy) hierarchy.classList.toggle('hidden', !row.parent && !row.primary);
    } else {
      box.className = `label ${state.mode === 'cd' ? 'cdLabel' : 'vinylLabel'}`;
      box.innerHTML = `<div class="musicGenre">${escapeHtml(row.genre || '')}</div><strong>${escapeHtml(row.name)}</strong><div class="musicSubgenres">${escapeHtml(musicSubgenreLine(row))}</div>`;
      if (hierarchy) hierarchy.classList.add('hidden');
    }
    text('#selectedDetails', resultSub(row));
  }

  function queueRecord(row) {
    return state.mode === 'comic'
      ? { uid: safeId(), mode: 'comic', primary: row.primary, parent: row.parent || '', series: row.primary ? row.display : cleanSeries(row.parent, row.series), name: row.display, publisher: row.publisher || '' }
      : { uid: safeId(), mode: state.mode, name: row.name, genre: row.genre || '', primarySubgenre: row.primarySubgenre || row.subgenre || '', secondarySubgenre: row.secondarySubgenre || '' };
  }

  function saveQueue() { localStorage.setItem('2ncQueue', JSON.stringify(state.queue)); renderQueue(); }
  function renderQueue() {
    text('#queuePill', `${state.queue.length.toLocaleString()} queued`);
    requireElement('#queue').innerHTML = state.queue.map((row, index) => `<div class="queueItem"><div><strong>${escapeHtml(row.mode === 'comic' ? (row.primary ? row.name : row.series) : row.mode === 'instrument' ? row.product : row.name)}</strong><br><small>${escapeHtml(row.mode === 'comic' ? (row.primary ? 'Primary authority' : row.parent) : row.mode === 'instrument' ? row.price : row.mode.toUpperCase())}</small></div><button data-index="${index}" aria-label="Remove">×</button></div>`).join('') || '<div class="empty">Your print queue is empty.</div>';
    $$('.queueItem button').forEach(button => button.addEventListener('click', () => { state.queue.splice(Number(button.dataset.index), 1); saveQueue(); }));
  }

  function addSelected() { if (state.selected) { state.queue.push(queueRecord(state.selected)); saveQueue(); } }
  function addAll() { currentData().filter(matches).forEach(row => state.queue.push(queueRecord(row))); saveQueue(); }
  function addHierarchy() {
    const row = state.selected; if (!row) return;
    const parent = row.primary ? row.display : row.parent;
    state.comic.filter(item => (item.primary && item.display === parent) || (!item.primary && item.parent === parent)).forEach(item => state.queue.push(queueRecord(item)));
    saveQueue();
  }

  function populateCategoryFilter() {
    const select = $('#categoryFilter'); if (!select) return;
    const comic = state.mode === 'comic';
    const values = Array.from(new Set(currentData().map(recordCategory).filter(Boolean))).sort((a, b) => a.localeCompare(b));
    select.innerHTML = `<option value="">${comic ? 'All publishers' : 'All genres'}</option>` + values.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
    select.value = state.category;
    const search = $('#searchInput'); if (search) search.placeholder = comic ? 'Search characters, series, publishers...' : 'Search artists...';
    const sort = $('#sortFilter');
    if (sort) {
      sort.innerHTML = `<option value="name">Sort: Name A–Z</option><option value="category">Sort: ${comic ? 'Publisher' : 'Genre'}</option><option value="level">Sort: Divider level</option>`;
      sort.value = state.sort;
    }
  }

  function setMode(mode) {
    if (!profiles[mode]) return;
    state.mode = mode; state.selected = null; state.query = ''; state.level = ''; state.category = ''; state.sort = 'name';
    const profile = profiles[mode];
    text('#pageTitle', profile.title); text('#pageSub', profile.sub); text('#dimensionText', profile.dim);
    $$('[data-mode]').forEach(button => button.classList.toggle('active', button.dataset.mode === mode));
    show('#searchPanel', !['instrument', 'manager'].includes(mode));
    show('.previewPanel', !['instrument', 'manager'].includes(mode));
    show('.queuePanel', mode !== 'manager');
    show('#instrumentPanel', mode === 'instrument');
    show('#managerPanel', mode === 'manager');
    if (mode === 'manager') renderManager();
    else {
      const search = $('#searchInput'); if (search) search.value = '';
      const level = $('#levelFilter'); if (level) level.value = '';
      populateCategoryFilter(); renderResults(); renderPreview();
    }
  }

  function showModal(title, html) { text('#modalTitle', title); requireElement('#modalBody').innerHTML = html; requireElement('#modal').classList.remove('hidden'); }
  function closeModal() { const modal = $('#modal'); if (modal) modal.classList.add('hidden'); }

  function customLabel() {
    if (state.mode === 'instrument') return showInstrumentModal();
    const comic = state.mode === 'comic';
    showModal('Create custom label', `<label>${comic ? 'Main authority' : 'Artist name'}<input id="customMain"></label>${comic ? '<label>Series title<input id="customSub"></label>' : ''}<button id="saveCustom" class="primaryButton">Add to queue</button>`);
    on('#saveCustom', 'click', () => {
      const main = ($('#customMain')?.value || '').trim();
      const series = comic ? ($('#customSub')?.value || '').trim() : '';
      if (!main) return;
      state.queue.push(comic ? { uid: safeId(), mode: 'comic', primary: !series, parent: series ? main : '', series, name: main } : { uid: safeId(), mode: state.mode, name: main, genre: '', primarySubgenre: '', secondarySubgenre: '' });
      saveQueue(); closeModal();
    });
  }

  function showInstrumentModal() {
    showModal('Create instrument tag', '<label>Price<input id="mPrice"></label><label>Product name<textarea id="mProduct" rows="5"></textarea></label><button id="saveTag" class="primaryButton">Add to queue</button>');
    on('#saveTag', 'click', () => { addTagValues($('#mPrice')?.value || '', $('#mProduct')?.value || ''); closeModal(); });
  }
  function addTagValues(price, product) {
    product = String(product).trim(); if (!product) return;
    price = String(price).trim(); if (price && !price.startsWith('$')) price = `$${price}`;
    state.queue.push({ uid: safeId(), mode: 'instrument', price, product }); saveQueue();
  }

  function makeId(kind) { return `${kind === 'music' ? 'MUS' : 'COM'}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`; }

  async function renderManager() {
    if (state.mode !== 'manager') return;
    const dataset = $('#managerDataset')?.value || state.managerDataset;
    state.managerDataset = dataset;
    const query = ($('#managerSearch')?.value || '').toLowerCase();
    const status = $('#managerStatus')?.value || 'active';
    let rows = await AuthorityDB.getAll(dataset);
    rows = rows.filter(row => (status === 'all' || (row.status || 'active') === status) && (!query || JSON.stringify(row).toLowerCase().includes(query))).sort((a, b) => (a.sort || a.display || a.name || '').localeCompare(b.sort || b.display || b.name || ''));
    text('#managerCount', `${rows.length.toLocaleString()} records`);
    requireElement('#managerResults').innerHTML = rows.slice(0, 700).map(row => `<div class="resultCard ${state.managerSelected && state.managerSelected.id === row.id ? 'selected' : ''}" data-id="${escapeHtml(row.id)}"><div><strong>${escapeHtml(row.display || row.name)}</strong><br><small>${escapeHtml(dataset === 'comic' ? [row.parent, row.series, row.publisher].filter(Boolean).join(' · ') : [row.genre, musicSubgenreLine(row), row.type].filter(Boolean).join(' · '))}</small><div class="recordFlags"><span class="flag">${escapeHtml(row.level || '')}</span>${row.status === 'retired' ? '<span class="flag retired">Retired</span>' : ''}</div></div></div>`).join('') || '<div class="empty">No records</div>';
    $$('#managerResults .resultCard').forEach(element => element.addEventListener('click', () => { state.managerSelected = rows.find(row => row.id === element.dataset.id); fillEditor(state.managerSelected); renderManager(); }));
  }

  function fillEditor(row) {
    show('#editorEmpty', false); show('#authorityForm', true);
    const comic = state.managerDataset === 'comic';
    show('#parentField', comic); show('#seriesField', comic); show('#publisherField', comic); show('#genreField', !comic); show('#musicDescriptorFields', !comic);
    const values = {
      editId: row.id || '', editDisplay: row.display || row.name || '', editName: row.name || row.display || '', editParent: row.parent || '', editSeries: row.series || '', editType: row.type || '', editLevel: row.level || 'Recommended', editGenre: row.genre || '', editPrimarySubgenre: row.primarySubgenre || row.subgenre || '', editSecondarySubgenre: row.secondarySubgenre || '', editPublisher: row.publisher || '', editNotes: row.notes || ''
    };
    Object.entries(values).forEach(([id, value]) => { const element = document.getElementById(id); if (element) element.value = value; });
    text('#retireRecord', row.status === 'retired' ? 'Restore' : 'Retire');
  }

  function newAuthority() { state.managerSelected = { id: '', status: 'active' }; fillEditor(state.managerSelected); }
  async function saveAuthority(event) {
    event.preventDefault();
    const kind = state.managerDataset, comic = kind === 'comic', old = state.managerSelected || {};
    const display = ($('#editDisplay')?.value || '').trim(); if (!display) return;
    const row = { ...old, id: $('#editId')?.value || makeId(kind), display, name: ($('#editName')?.value || '').trim() || display, type: ($('#editType')?.value || '').trim(), level: $('#editLevel')?.value || 'Recommended', status: old.status || 'active', notes: ($('#editNotes')?.value || '').trim(), updatedAt: new Date().toISOString() };
    if (comic) { row.parent = ($('#editParent')?.value || '').trim(); row.series = ($('#editSeries')?.value || '').trim(); row.publisher = ($('#editPublisher')?.value || '').trim(); row.primary = !row.series; row.sort = row.series || row.display; }
    else { row.genre = ($('#editGenre')?.value || '').trim(); row.primarySubgenre = ($('#editPrimarySubgenre')?.value || '').trim(); row.secondarySubgenre = ($('#editSecondarySubgenre')?.value || '').trim(); row.subgenre = row.primarySubgenre; row.sort = row.display; }
    await AuthorityDB.put(kind, row); state.managerSelected = row; await reloadData(); alert('Authority saved.');
  }
  async function toggleRetire() { if (!state.managerSelected?.id) return; state.managerSelected.status = state.managerSelected.status === 'retired' ? 'active' : 'retired'; await AuthorityDB.put(state.managerDataset, state.managerSelected); await reloadData(); fillEditor(state.managerSelected); }
  async function deleteSelected() { if (!state.managerSelected?.id || !confirm('Permanently delete this authority?')) return; await AuthorityDB.remove(state.managerDataset, state.managerSelected.id); state.managerSelected = null; show('#authorityForm', false); show('#editorEmpty', true); await reloadData(); }

  async function exportBackup() {
    const payload = await AuthorityDB.exportBackup();
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    anchor.download = `2NC_Authority_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click(); URL.revokeObjectURL(anchor.href);
  }
  async function importBackup(file) { if (!file) return; const payload = JSON.parse(await file.text()); if (!confirm('Replace the internal Music and Comic databases with this backup?')) return; await AuthorityDB.importBackup(payload); await reloadData(); alert('Backup imported.'); }

  async function repairDatabase() {
    if (!confirm('Repair the internal database from the bundled authority files? Your edited notes and retired status will be preserved when possible.')) return;
    await AuthorityDB.ensureSeeded({ force: true }); await reloadData(); alert('Database repair complete.');
  }

  function diagnosticsHtml() {
    const diagnostics = AppLog.diagnostics({ counts: { music: state.music.length, comic: state.comic.length }, mode: state.mode });
    return `<p><strong>${escapeHtml(APP_CONFIG.name)} v${escapeHtml(APP_CONFIG.version)}</strong></p><p>Build: ${escapeHtml(APP_CONFIG.build)}</p><p>Music: ${state.music.length.toLocaleString()} · Comics: ${state.comic.length.toLocaleString()}</p><label class="debugToggle"><input id="debugToggle" type="checkbox" ${AppLog.enabled ? 'checked' : ''}> Enable developer logging</label><textarea id="diagnosticText" rows="12" readonly>${escapeHtml(JSON.stringify(diagnostics, null, 2))}</textarea><button id="copyDiagnostics" class="secondaryButton">Copy diagnostics</button>`;
  }
  function showAbout() {
    showModal('About & Diagnostics', diagnosticsHtml());
    on('#debugToggle', 'change', event => AppLog.setEnabled(event.target.checked));
    on('#copyDiagnostics', 'click', async () => { await navigator.clipboard.writeText($('#diagnosticText')?.value || ''); alert('Diagnostics copied.'); });
  }

  async function reloadData() {
    state.music = (await AuthorityDB.getAll('music')).filter(row => row.status !== 'retired');
    state.comic = (await AuthorityDB.getAll('comic')).filter(row => row.status !== 'retired');
    text('#dbStatus', `Music ${state.music.length.toLocaleString()} · Comics ${state.comic.length.toLocaleString()}`);
    if (state.mode !== 'manager') { populateCategoryFilter(); renderResults(); renderPreview(); }
    await renderManager();
  }

  function bindEvents() {
    $$('[data-mode]').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));
    on('#searchInput', 'input', event => { state.query = event.target.value; renderResults(); });
    on('#levelFilter', 'change', event => { state.level = event.target.value; renderResults(); });
    on('#categoryFilter', 'change', event => { state.category = event.target.value; renderResults(); });
    on('#sortFilter', 'change', event => { state.sort = event.target.value; renderResults(); });
    on('#clearSearch', 'click', () => { state.query = ''; state.level = ''; state.category = ''; state.sort = 'name'; if ($('#searchInput')) $('#searchInput').value = ''; if ($('#levelFilter')) $('#levelFilter').value = ''; populateCategoryFilter(); renderResults(); });
    on('#addSelected', 'click', addSelected); on('#addAll', 'click', addAll); on('#addHierarchy', 'click', addHierarchy);
    on('#clearQueue', 'click', () => { state.queue = []; saveQueue(); });
    on('#printBtn', 'click', () => { try { LabelEngine.printQueue(state.queue); } catch (error) { alert(error.message); } });
    on('#calibrationBtn', 'click', () => { try { LabelEngine.printCalibration(state.mode === 'manager' ? 'vinyl' : state.mode); } catch (error) { alert(error.message); } });
    on('#customBtn', 'click', customLabel);
    on('#addTag', 'click', () => addTagValues($('#priceInput')?.value || '', $('#productInput')?.value || ''));
    on('#priceInput', 'input', event => { const element = $('.tagPrice'); if (element) element.textContent = event.target.value ? (event.target.value.startsWith('$') ? event.target.value : `$${event.target.value}`) : '$239'; });
    on('#productInput', 'input', event => { const element = $('.tagProduct'); if (element) element.innerHTML = escapeHtml(event.target.value || 'PRODUCT NAME').replace(/\n/g, '<br>'); });
    on('#closeModal', 'click', closeModal); on('#modal', 'click', event => { if (event.target.id === 'modal') closeModal(); });
    on('#aboutBtn', 'click', showAbout); on('#debugBadge', 'click', showAbout);
    on('#managerDataset', 'change', () => { state.managerSelected = null; renderManager(); }); on('#managerSearch', 'input', renderManager); on('#managerStatus', 'change', renderManager);
    on('#newAuthority', 'click', newAuthority); on('#authorityForm', 'submit', saveAuthority); on('#retireRecord', 'click', toggleRetire); on('#deleteRecord', 'click', deleteSelected);
    on('#exportBackup', 'click', exportBackup); on('#importBackup', 'change', event => importBackup(event.target.files[0]).catch(error => alert(error.message)));
    on('#repairDatabase', 'click', () => repairDatabase().catch(error => alert(error.message)));
  }

  async function initialize() {
    bindEvents();
    await reloadData();
    renderQueue(); setMode('vinyl');
    text('#versionBadge', `v${APP_CONFIG.version}`);
  }

  window.AppUI = { initialize, reloadData, setMode, showAbout, state };
})();
