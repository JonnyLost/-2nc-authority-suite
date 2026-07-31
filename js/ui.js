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
    treasure: { title: '2NC Treasures Tags', sub: 'Create 3.5 × 5 portrait Treasures tags', dim: '3.5 × 5 in' },
    station: { title: 'Print Station', sub: 'Receive and print jobs from sales-floor devices', dim: 'Shared queue' },
    manager: { title: 'Authority Manager', sub: 'Edit, back up, and synchronize authority data', dim: 'Authority database' }
  };

  const state = {
    mode: 'vinyl', selected: null, query: '', level: '', category: '', sort: 'name',
    queue: JSON.parse(localStorage.getItem('2ncQueue') || '[]'),
    music: [], comic: [], managerDataset: 'music', managerSelected: null,
    stationJobs: [], stationTimer: null, stationBusy: false, editingQueueIndex: null,
    showComicAuthority: localStorage.getItem('2ncShowComicAuthority') !== 'false',
    showComicEra: localStorage.getItem('2ncShowComicEra') !== 'false'
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
  function comicPrintTitle(row) { return String(row.printedTitle || row.series || row.display || '').trim(); }
  function comicMarker(row) { return String(row.publishingLine || row.publishingEra || '').trim(); }
  function comicYearRange(row) {
    const start = String(row.startYear || '').trim();
    const end = String(row.endYear || '').trim();
    if (!start && !end) return '';
    if (!start) return `Through ${end}`;
    if (!end || end === start) return start;
    return `${start}–${end}`;
  }
  function lengthClass(value) { const n = String(value || '').length; return n > 34 ? 'tight' : n > 22 ? 'compact' : ''; }

  function currentData() { return state.mode === 'comic' ? state.comic : state.music; }
  function recordCategory(row) { return state.mode === 'comic' ? (row.publisher || 'Unknown Publisher') : (row.genre || 'Uncategorized'); }
  function resultName(row) { return state.mode === 'comic' ? (row.primary ? row.display : comicPrintTitle(row)) : row.name; }
  function resultSub(row) {
    return state.mode === 'comic'
      ? (row.primary
        ? [row.publisher, 'Primary authority', comicYearRange(row), row.id].filter(Boolean).join(' · ')
        : [row.parent || 'Standalone', comicMarker(row), comicYearRange(row), row.publisher, row.type, row.id].filter(Boolean).join(' · '))
      : [row.genre, musicSubgenreLine(row), row.level].filter(Boolean).join(' · ');
  }
  function matches(row) {
    const query = state.query.toLowerCase();
    const haystack = state.mode === 'comic'
      ? [row.display, row.parent, row.series, row.printedTitle, row.publishingEra, row.publishingLine, row.startYear, row.endYear, row.publisher, row.type, row.id].join(' ')
      : [row.name, row.display, row.genre, row.primarySubgenre || row.subgenre, row.secondarySubgenre, row.type].join(' ');
    return (!query || haystack.toLowerCase().includes(query))
      && (!state.level || row.level === state.level)
      && (!state.category || recordCategory(row) === state.category);
  }

  function renderResults() {
    if (['instrument', 'treasure', 'station', 'manager'].includes(state.mode)) return;
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
      state.editingQueueIndex = null;
      state.selected = rows[Number(element.dataset.index)];
      renderResults(); renderPreview();
    }));
  }

  function renderPreview() {
    if (['instrument', 'treasure', 'station', 'manager'].includes(state.mode)) return;
    const box = requireElement('#labelPreview');
    const addButton = requireElement('#addSelected');
    const hierarchy = $('#addHierarchy');
    if (!state.selected) {
      box.className = `label ${state.mode === 'cd' ? 'cdLabel' : state.mode === 'comic' ? 'comicLabel' : 'vinylLabel'}`;
      box.innerHTML = '<strong>Select a record</strong>';
      addButton.disabled = true;
      addButton.textContent = 'Add selected to queue';
      if (hierarchy) hierarchy.classList.add('hidden');
      text('#selectedDetails', 'Tap a result to preview it.');
      return;
    }
    addButton.disabled = false;
    addButton.textContent = state.editingQueueIndex === null ? 'Add selected to queue' : 'Update queued label';
    const row = state.selected;
    if (state.mode === 'comic') {
      box.className = `label comicLabel ${row.primary ? 'primaryComic' : ''} ${lengthClass(row.primary ? row.display : comicPrintTitle(row))}`;
      box.innerHTML = row.primary
        ? `<div class="series">${escapeHtml(row.display)}</div>`
        : `${state.showComicAuthority && row.parent ? `<div class="cue">${escapeHtml(row.parent)}</div>` : ''}<div class="series">${escapeHtml(comicPrintTitle(row))}</div>${state.showComicEra && comicMarker(row) ? `<div class="era">${escapeHtml(comicMarker(row))}</div>` : ''}`;
      if (hierarchy) hierarchy.classList.toggle('hidden', !row.parent && !row.primary);
    } else {
      box.className = `label ${state.mode === 'cd' ? 'cdLabel' : 'vinylLabel'} ${lengthClass(row.name)}`;
      box.innerHTML = `<div class="musicGenre">${escapeHtml(row.genre || '')}</div><strong>${escapeHtml(row.name)}</strong><div class="musicSubgenres">${escapeHtml(musicSubgenreLine(row))}</div>`;
      if (hierarchy) hierarchy.classList.add('hidden');
    }
    text('#selectedDetails', resultSub(row));
  }

  function queueRecord(row, existingUid = '') {
    return state.mode === 'comic'
      ? { uid: existingUid || safeId(), sourceId: row.id || row.sourceId || '', mode: 'comic', primary: row.primary, showAuthority: state.showComicAuthority, showMarker: state.showComicEra, parent: row.parent || '', series: row.primary ? row.display : comicPrintTitle(row), canonicalSeries: row.series || '', printedTitle: row.primary ? row.display : comicPrintTitle(row), publishingEra: row.publishingEra || '', publishingLine: row.publishingLine || '', startYear: row.startYear || '', endYear: row.endYear || '', name: row.display || row.name, publisher: row.publisher || '' }
      : { uid: existingUid || safeId(), sourceId: row.id || row.sourceId || '', mode: state.mode, name: row.name || row.display, genre: row.genre || '', primarySubgenre: row.primarySubgenre || row.subgenre || '', secondarySubgenre: row.secondarySubgenre || '' };
  }

  function saveQueue() { localStorage.setItem('2ncQueue', JSON.stringify(state.queue)); renderQueue(); }
  function renderQueue() {
    text('#queuePill', `${state.queue.length.toLocaleString()} queued`);
    requireElement('#queue').innerHTML = state.queue.map((row, index) => `<div class="queueItem" data-index="${index}" role="button" tabindex="0" aria-label="Reopen ${escapeHtml(row.mode === 'comic' ? (row.primary ? row.name : row.series) : row.mode === 'instrument' || row.mode === 'treasure' ? row.product : row.name)}"><div><strong>${escapeHtml(row.mode === 'comic' ? (row.primary ? row.name : row.series) : row.mode === 'instrument' || row.mode === 'treasure' ? row.product : row.name)}</strong><br><small>${escapeHtml(row.mode === 'comic' ? (row.primary ? 'Primary authority' : [row.parent, row.showMarker === false ? '' : comicMarker(row)].filter(Boolean).join(' · ')) : row.mode === 'instrument' ? row.price : row.mode === 'treasure' ? '2NC TREASURES' : row.mode.toUpperCase())}</small></div><button data-index="${index}" aria-label="Remove">×</button></div>`).join('') || '<div class="empty">Your print queue is empty.</div>';
    $$('.queueItem').forEach(item => {
      item.addEventListener('click', event => { if (!event.target.closest('button')) reopenQueueItem(Number(item.dataset.index)); });
      item.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); reopenQueueItem(Number(item.dataset.index)); } });
    });
    $$('.queueItem button').forEach(button => button.addEventListener('click', event => { event.stopPropagation(); const index = Number(button.dataset.index); state.queue.splice(index, 1); if (state.editingQueueIndex === index) state.editingQueueIndex = null; else if (state.editingQueueIndex !== null && state.editingQueueIndex > index) state.editingQueueIndex -= 1; saveQueue(); }));
  }

  function addSelected() {
    if (!state.selected) return;
    if (state.editingQueueIndex !== null) {
      const existing = state.queue[state.editingQueueIndex];
      state.queue[state.editingQueueIndex] = queueRecord(state.selected, existing?.uid);
      state.editingQueueIndex = null;
      saveQueue();
      renderPreview();
      return;
    }
    state.queue.push(queueRecord(state.selected)); saveQueue();
  }

  function reopenQueueItem(index) {
    const item = state.queue[index];
    if (!item || ['instrument', 'treasure'].includes(item.mode)) return;
    setMode(item.mode);
    state.editingQueueIndex = index;
    if (item.mode === 'comic') {
      state.showComicAuthority = item.showAuthority !== false;
      state.showComicEra = item.showMarker !== false && Boolean(item.publishingLine || item.publishingEra);
      const authorityToggle = $('#showComicAuthority'); if (authorityToggle) authorityToggle.checked = state.showComicAuthority;
      const markerToggle = $('#showComicEra'); if (markerToggle) markerToggle.checked = state.showComicEra;
      state.selected = { id: item.sourceId || '', display: item.name || item.series, name: item.name || item.series, primary: Boolean(item.primary), parent: item.parent || '', series: item.canonicalSeries || item.series || '', printedTitle: item.printedTitle || item.series || '', publishingEra: item.publishingEra || '', publishingLine: item.publishingLine || '', startYear: item.startYear || '', endYear: item.endYear || '', publisher: item.publisher || 'DC', type: item.primary ? 'Character' : 'Series', level: 'Recommended' };
    } else {
      state.selected = { id: item.sourceId || '', display: item.name, name: item.name, genre: item.genre || '', primarySubgenre: item.primarySubgenre || '', secondarySubgenre: item.secondarySubgenre || '', level: 'Recommended' };
    }
    renderResults(); renderPreview();
    document.querySelector('.previewPanel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
    state.mode = mode; state.selected = null; state.editingQueueIndex = null; state.query = ''; state.level = ''; state.category = ''; state.sort = 'name';
    const profile = profiles[mode];
    text('#pageTitle', profile.title); text('#pageSub', profile.sub); text('#dimensionText', profile.dim);
    $$('[data-mode]').forEach(button => button.classList.toggle('active', button.dataset.mode === mode));
    show('#searchPanel', !['instrument', 'treasure', 'station', 'manager'].includes(mode));
    show('.previewPanel', !['instrument', 'treasure', 'station', 'manager'].includes(mode));
    show('.queuePanel', !['station', 'manager'].includes(mode));
    show('#instrumentPanel', mode === 'instrument');
    show('#treasurePanel', mode === 'treasure');
    show('#stationPanel', mode === 'station');
    show('#managerPanel', mode === 'manager');
    show('#comicLabelToggles', mode === 'comic');
    if (mode === 'station') {
      refreshStation().catch(error => showStationError(error));
      startStationPolling();
    } else {
      stopStationPolling();
      if (mode === 'manager') renderManager();
    }
    if (!['station', 'manager'].includes(mode)) {
      const search = $('#searchInput'); if (search) search.value = '';
      const level = $('#levelFilter'); if (level) level.value = '';
      populateCategoryFilter(); renderResults(); renderPreview();
    }
  }

  function showModal(title, html) { text('#modalTitle', title); requireElement('#modalBody').innerHTML = html; requireElement('#modal').classList.remove('hidden'); }
  function closeModal() { const modal = $('#modal'); if (modal) modal.classList.add('hidden'); }

  function customLabel() {
    if (state.mode === 'instrument') return showInstrumentModal();
    if (state.mode === 'treasure') return;
    const comic = state.mode === 'comic';
    showModal('Create custom label', `<label>${comic ? 'Main authority' : 'Artist name'}<input id="customMain"></label>${comic ? '<label>Series title <small>(leave blank for a primary authority)</small><input id="customSub"></label><div class="twoCol"><label>Publisher<input id="customPublisher" value="DC"></label><label>Divider level<select id="customLevel"><option>Primary</option><option>Essential</option><option selected>Recommended</option><option>Optional</option></select></label></div><label>Publishing era<select id="customEra"><option value="">None</option><option>The New 52</option><option>DC You</option><option>Rebirth</option><option>DC Universe</option><option>Future State</option><option>Infinite Frontier</option><option>Dawn of DC</option><option>DC All In</option><option>Absolute Universe</option><option>Marvel NOW!</option><option>All-New, All-Different Marvel</option><option>Marvel Legacy</option><option>Fresh Start</option><option>Dawn of X</option><option>Reign of X</option><option>Destiny of X</option><option>Fall of X</option><option>From the Ashes</option></select></label><label>Publishing line / imprint<select id="customLine"><option value="">None</option><option>Vertigo</option><option>Black Label</option><option>Young Animal</option><option>Sandman Universe</option><option>Milestone</option><option>WildStorm</option><option>Elseworlds</option><option>Hill House Comics</option><option>Wonder Comics</option><option>DC Horror</option><option>Ultimate Universe</option><option>Marvel Knights</option><option>MAX</option><option>2099</option><option>Marvel Zombies</option><option>Star Wars</option></select></label>' : ''}<div class="customLabelActions"><button id="saveCustom" class="primaryButton">Add to queue</button><button id="saveCustomDatabase" class="secondaryButton">Add to queue + database</button></div>`);

    const save = async addToDatabase => {
      const main = ($('#customMain')?.value || '').trim();
      const series = comic ? ($('#customSub')?.value || '').trim() : '';
      if (!main) return;
      const custom = comic ? { id: '', display: series || main, name: main, primary: !series, parent: series ? main : '', series: series || main, printedTitle: series || main, publishingEra: ($('#customEra')?.value || '').trim(), publishingLine: ($('#customLine')?.value || '').trim(), publisher: ($('#customPublisher')?.value || 'DC').trim(), type: series ? 'Series' : 'Character', level: $('#customLevel')?.value || 'Recommended' } : { id: '', display: main, name: main, genre: '', primarySubgenre: '', secondarySubgenre: '', type: 'Artist', level: 'Recommended' };
      if (addToDatabase) {
        const kind = comic ? 'comic' : 'music';
        const databaseRows = await AuthorityDB.getAll(kind);
        if (comic && series) {
          const parentAuthority = databaseRows.find(row => row.primary && String(row.display || '').toLowerCase() === main.toLowerCase());
          if (parentAuthority) custom.parent = parentAuthority.display;
          else {
            await AuthorityDB.put('comic', { id: makeId('comic'), display: main, name: main, parent: '', series: main, printedTitle: main, primary: true, publisher: custom.publisher, type: 'Character', level: custom.level, sort: main, status: 'active', notes: 'Created automatically with a custom subordinate label.', updatedAt: new Date().toISOString(), _localEdited: true });
          }
        }
        const existing = databaseRows.find(row => comic
          ? (Boolean(row.primary) === custom.primary && String(row.display || '').toLowerCase() === custom.display.toLowerCase() && String(row.parent || '').toLowerCase() === custom.parent.toLowerCase())
          : String(row.name || row.display || '').toLowerCase() === main.toLowerCase());
        if (existing) {
          custom.id = existing.id;
          alert('That authority already exists. The existing record was used for this label.');
        } else {
          custom.id = makeId(kind);
          const databaseRow = { ...custom, sort: custom.series || custom.display, status: 'active', notes: 'Added from the custom-label workflow.', updatedAt: new Date().toISOString(), _localEdited: true };
          await AuthorityDB.put(kind, databaseRow);
          await reloadData();
        }
      }
      state.queue.push(queueRecord(custom));
      saveQueue(); closeModal();
    };
    on('#saveCustom', 'click', () => save(false).catch(error => alert(error.message)));
    on('#saveCustomDatabase', 'click', () => save(true).catch(error => alert(error.message)));
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


  function addTreasureTag(product) {
    product = String(product).trim(); if (!product) return;
    state.queue.push({ uid: safeId(), mode: 'treasure', product }); saveQueue();
  }

  function makeId(kind) { return `${kind === 'music' ? 'MUS' : 'COM'}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`; }

  function ensurePublicationYearFields() {
    if ($('#publicationYearsField')) return;
    const eraField = $('#publishingEraField');
    if (!eraField) return;
    const fields = document.createElement('div');
    fields.id = 'publicationYearsField';
    fields.className = 'twoCol hidden';
    fields.innerHTML = '<label>Start year<input id="editStartYear" inputmode="numeric" maxlength="4" placeholder="1985"></label><label>End year<input id="editEndYear" inputmode="numeric" maxlength="7" placeholder="Present"></label>';
    eraField.before(fields);
  }

  async function renderManager() {
    if (state.mode !== 'manager') return;
    const dataset = $('#managerDataset')?.value || state.managerDataset;
    state.managerDataset = dataset;
    const query = ($('#managerSearch')?.value || '').toLowerCase();
    const status = $('#managerStatus')?.value || 'active';
    let rows = await AuthorityDB.getAll(dataset);
    rows = rows.filter(row => (status === 'all' || (row.status || 'active') === status) && (!query || JSON.stringify(row).toLowerCase().includes(query))).sort((a, b) => (a.sort || a.display || a.name || '').localeCompare(b.sort || b.display || b.name || ''));
    text('#managerCount', `${rows.length.toLocaleString()} records`);
    requireElement('#managerResults').innerHTML = rows.slice(0, 700).map(row => `<div class="resultCard ${state.managerSelected && state.managerSelected.id === row.id ? 'selected' : ''}" data-id="${escapeHtml(row.id)}"><div><strong>${escapeHtml(row.display || row.name)}</strong><br><small>${escapeHtml(dataset === 'comic' ? [row.parent, row.series, row.printedTitle && row.printedTitle !== row.series ? `Print: ${row.printedTitle}` : '', row.publishingLine, row.publishingEra, comicYearRange(row), row.publisher, row.id].filter(Boolean).join(' · ') : [row.genre, musicSubgenreLine(row), row.type].filter(Boolean).join(' · '))}</small><div class="recordFlags"><span class="flag">${escapeHtml(row.level || '')}</span>${row.status === 'retired' ? '<span class="flag retired">Retired</span>' : ''}</div></div></div>`).join('') || '<div class="empty">No records</div>';
    $$('#managerResults .resultCard').forEach(element => element.addEventListener('click', () => { state.managerSelected = rows.find(row => row.id === element.dataset.id); fillEditor(state.managerSelected); renderManager(); }));
  }

  function fillEditor(row) {
    ensurePublicationYearFields();
    show('#editorEmpty', false); show('#authorityForm', true);
    const comic = state.managerDataset === 'comic';
    show('#parentField', comic); show('#seriesField', comic); show('#printTitleField', comic); show('#publicationYearsField', comic); show('#publishingEraField', comic); show('#publishingLineField', comic); show('#publisherField', comic); show('#genreField', !comic); show('#musicDescriptorFields', !comic);
    const values = {
      editId: row.id || '', editDisplay: row.display || row.name || '', editName: row.name || row.display || '', editParent: row.parent || '', editSeries: row.series || '', editPrintTitle: row.printedTitle || row.series || row.display || '', editStartYear: row.startYear || '', editEndYear: row.endYear || '', editPublishingEra: row.publishingEra || '', editPublishingLine: row.publishingLine || '', editType: row.type || '', editLevel: row.level || 'Recommended', editGenre: row.genre || '', editPrimarySubgenre: row.primarySubgenre || row.subgenre || '', editSecondarySubgenre: row.secondarySubgenre || '', editPublisher: row.publisher || '', editNotes: row.notes || ''
    };
    Object.entries(values).forEach(([id, value]) => { const element = document.getElementById(id); if (element) element.value = value; });
    text('#retireRecord', row.status === 'retired' ? 'Restore' : 'Retire');
  }

  function newAuthority() { state.managerSelected = { id: '', status: 'active' }; fillEditor(state.managerSelected); }
  async function saveAuthority(event) {
    event.preventDefault();
    const kind = state.managerDataset, comic = kind === 'comic', old = state.managerSelected || {};
    const display = ($('#editDisplay')?.value || '').trim(); if (!display) return;
    const row = { ...old, id: $('#editId')?.value || makeId(kind), display, name: ($('#editName')?.value || '').trim() || display, type: ($('#editType')?.value || '').trim(), level: $('#editLevel')?.value || 'Recommended', status: old.status || 'active', notes: ($('#editNotes')?.value || '').trim(), updatedAt: new Date().toISOString(), _localEdited: true };
    if (comic) { row.parent = ($('#editParent')?.value || '').trim(); row.series = ($('#editSeries')?.value || '').trim(); row.printedTitle = ($('#editPrintTitle')?.value || '').trim() || row.series || row.display; row.startYear = ($('#editStartYear')?.value || '').trim(); row.endYear = ($('#editEndYear')?.value || '').trim(); row.publishingEra = ($('#editPublishingEra')?.value || '').trim(); row.publishingLine = ($('#editPublishingLine')?.value || '').trim(); row.publisher = ($('#editPublisher')?.value || '').trim(); row.primary = !row.parent; row.sort = row.series || row.display; }
    else { row.genre = ($('#editGenre')?.value || '').trim(); row.primarySubgenre = ($('#editPrimarySubgenre')?.value || '').trim(); row.secondarySubgenre = ($('#editSecondarySubgenre')?.value || '').trim(); row.subgenre = row.primarySubgenre; row.sort = row.display; }
    await AuthorityDB.put(kind, row); state.managerSelected = row; await reloadData(); alert('Authority saved.');
  }
  async function toggleRetire() { if (!state.managerSelected?.id) return; state.managerSelected.status = state.managerSelected.status === 'retired' ? 'active' : 'retired'; state.managerSelected.updatedAt = new Date().toISOString(); state.managerSelected._localEdited = true; await AuthorityDB.put(state.managerDataset, state.managerSelected); await reloadData(); fillEditor(state.managerSelected); }
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
    if (!confirm('Repair from the bundled authority files? All locally edited fields, custom records, retired records, and deletions will be preserved.')) return;
    await AuthorityDB.ensureSeeded({ force: true }); await reloadData(); alert('Database repair complete.');
  }

  function syncStatusText() {
    if (!window.AuthoritySync) return 'GitHub sync module unavailable';
    const status = AuthoritySync.status();
    if (!status.settings.owner || !status.settings.repo) return 'Not connected';
    const repo = `${status.settings.owner}/${status.settings.repo}`;
    return status.lastSync ? `${repo} · Last sync ${new Date(status.lastSync).toLocaleString()}` : `${repo} · Ready to sync`;
  }

  function renderSyncStatus() { text('#syncStatus', syncStatusText()); }

  function openSyncSettings() {
    const status = AuthoritySync.status();
    const value = status.settings;
    showModal('Connection', `<p class="modalIntro">Connect authority data and the Print Station to the GitHub repository. The token is kept only for this browser session and is never included in backups.</p>
      <div class="twoCol"><label>Repository owner<input id="syncOwner" autocomplete="off" value="${escapeHtml(value.owner)}"></label><label>Repository name<input id="syncRepo" autocomplete="off" value="${escapeHtml(value.repo)}"></label></div>
      <div class="twoCol"><label>Authority branch<input id="syncBranch" autocomplete="off" value="${escapeHtml(value.branch)}"></label><label>This device name<input id="syncDeviceName" autocomplete="off" placeholder="Sales Floor iPad or Back Office PC" value="${escapeHtml(value.deviceName || '')}"></label></div>
      <div class="twoCol"><label>Music file<input id="syncMusicPath" value="${escapeHtml(value.musicPath)}"></label><label>Comic file<input id="syncComicPath" value="${escapeHtml(value.comicPath)}"></label></div>
      <div class="twoCol"><label>Print queue branch<input id="syncPrintBranch" value="${escapeHtml(value.printBranch || 'print-queue')}"></label><label>Print queue file<input id="syncPrintPath" value="${escapeHtml(value.printQueuePath || 'print-queue.json')}"></label></div>
      <label>GitHub token<input id="syncToken" type="password" autocomplete="off" placeholder="${status.hasToken ? 'Token active for this session' : 'Fine-grained token with Contents access'}"></label>
      <small>Use a fine-grained token limited to this repository with Contents read/write permission. The separate print-queue branch prevents print jobs from triggering a website deployment.</small>
      <button id="saveSyncSettings" class="primaryButton">Save connection</button>`);
    on('#saveSyncSettings', 'click', () => {
      AuthoritySync.saveSettings({
        owner: $('#syncOwner')?.value, repo: $('#syncRepo')?.value, branch: $('#syncBranch')?.value,
        musicPath: $('#syncMusicPath')?.value, comicPath: $('#syncComicPath')?.value,
        printBranch: $('#syncPrintBranch')?.value, printQueuePath: $('#syncPrintPath')?.value,
        deviceName: $('#syncDeviceName')?.value, token: $('#syncToken')?.value
      });
      renderSyncStatus(); renderStationConnection(); closeModal(); alert('Connection saved for this device.');
    });
  }

  function renderStationConnection() {
    const status = AuthoritySync.status();
    const name = status.settings.deviceName || 'Unnamed device';
    text('#stationConnection', status.hasToken ? `${name} · Connected` : `${name} · Token needed`);
  }

  function jobTitle(job) {
    if (job.note) return job.note;
    const first = job.items?.[0];
    const label = first ? (first.mode === 'comic' ? (first.primary ? first.name : first.series) : first.mode === 'instrument' || first.mode === 'treasure' ? first.product : first.name) : 'Print job';
    return job.itemCount > 1 ? `${label} + ${job.itemCount - 1} more` : label;
  }

  function jobKinds(job) {
    const counts = {};
    (job.items || []).forEach(item => { counts[item.mode] = (counts[item.mode] || 0) + 1; });
    return Object.entries(counts).map(([kind, count]) => `${count} ${kind}`).join(' · ');
  }

  function stationJobHtml(job) {
    const active = job.status === 'pending' || job.status === 'printing';
    const age = new Date(job.createdAt).toLocaleString();
    const statusLabel = { pending: 'Waiting', printing: 'In progress', completed: 'Completed', cancelled: 'Cancelled' }[job.status] || job.status;
    const action = job.status === 'pending'
      ? `<button class="primaryButton stationPrint" data-id="${escapeHtml(job.id)}">Print job</button><button class="secondaryButton stationCancel" data-id="${escapeHtml(job.id)}">Cancel</button>`
      : job.status === 'printing'
        ? `<button class="primaryButton stationPrint" data-id="${escapeHtml(job.id)}">Print again</button><button class="secondaryButton stationComplete" data-id="${escapeHtml(job.id)}">Mark complete</button>`
        : `<button class="secondaryButton stationReopen" data-id="${escapeHtml(job.id)}">Return to queue</button>`;
    return `<article class="stationJob ${active ? 'active' : ''}" data-status="${escapeHtml(job.status)}">
      <div class="stationJobMain"><div class="stationJobHeading"><span class="jobStatus">${escapeHtml(statusLabel)}</span><time>${escapeHtml(age)}</time></div>
      <h3>${escapeHtml(jobTitle(job))}</h3><p>${escapeHtml(jobKinds(job))}</p><small>From ${escapeHtml(job.from || 'Sales floor device')}${job.station ? ` · ${escapeHtml(job.station)}` : ''}</small></div>
      <div class="stationJobActions">${action}</div></article>`;
  }

  function bindStationJobActions() {
    $$('.stationPrint').forEach(button => button.addEventListener('click', () => printStationJob(button.dataset.id)));
    $$('.stationComplete').forEach(button => button.addEventListener('click', () => updateStationJob('complete', button.dataset.id)));
    $$('.stationReopen').forEach(button => button.addEventListener('click', () => updateStationJob('reopen', button.dataset.id)));
    $$('.stationCancel').forEach(button => button.addEventListener('click', () => updateStationJob('cancel', button.dataset.id)));
  }

  function renderStationJobs() {
    const pending = state.stationJobs.filter(job => job.status === 'pending');
    const printing = state.stationJobs.filter(job => job.status === 'printing');
    const completed = state.stationJobs.filter(job => ['completed', 'cancelled'].includes(job.status));
    text('#pendingJobCount', pending.length);
    text('#printingJobCount', printing.length);
    text('#completedJobCount', completed.length);
    text('#stationUpdated', `Updated ${new Date().toLocaleTimeString()} · Refreshes automatically every 20 seconds`);
    const ordered = [...pending, ...printing, ...completed.slice(0, 20)];
    requireElement('#stationJobs').innerHTML = ordered.map(stationJobHtml).join('') || '<div class="empty">No print jobs are waiting.</div>';
    bindStationJobActions();
  }

  function showStationError(error) {
    AppLog.warn('Print Station refresh failed', error);
    text('#stationUpdated', error.message || String(error));
    renderStationConnection();
  }

  async function refreshStation() {
    if (state.stationBusy) return;
    state.stationBusy = true;
    try {
      renderStationConnection();
      if (!AuthoritySync.hasToken()) throw new Error('Enter the GitHub token under Connection to load print jobs.');
      state.stationJobs = await PrintStation.list();
      renderStationJobs();
    } finally { state.stationBusy = false; }
  }

  function startStationPolling() {
    stopStationPolling();
    state.stationTimer = setInterval(() => {
      if (state.mode === 'station' && !document.hidden) refreshStation().catch(showStationError);
    }, 20000);
  }

  function stopStationPolling() {
    if (state.stationTimer) clearInterval(state.stationTimer);
    state.stationTimer = null;
  }

  async function sendToStation() {
    if (!state.queue.length) throw new Error('Add at least one item to the print queue.');
    const note = prompt('Optional job name or note:', '') ?? '';
    const job = await PrintStation.send(state.queue, note);
    alert(`Sent ${job.itemCount} item${job.itemCount === 1 ? '' : 's'} to the Print Station.`);
  }

  async function sharePrintPacket() {
    const result = await PrintPacket.share(state.queue);
    if (!result.shared) alert(`The share sheet is not available in this browser, so ${result.name} was downloaded instead.`);
  }

  async function printStationJob(id) {
    const job = state.stationJobs.find(item => item.id === id);
    if (!job) return;
    const popup = window.open('', '_blank');
    if (!popup) return alert('Pop-ups are blocked. Allow pop-ups for this site so the print sheet can open.');
    popup.document.write('<!doctype html><title>Preparing 2NC print job…</title><p style="font:16px system-ui;padding:24px">Preparing print job…</p>');
    try {
      if (job.status === 'pending') await PrintStation.claim(id);
      LabelEngine.printQueue(job.items, popup);
      await refreshStation();
    } catch (error) {
      popup.close();
      alert(error.message);
    }
  }

  async function updateStationJob(action, id) {
    if (action === 'cancel' && !confirm('Cancel this print job?')) return;
    await PrintStation[action](id);
    await refreshStation();
  }

  async function pullFromGitHub() {
    if (!confirm('Pull the latest Music and Comic authorities from GitHub? This replaces the database on this device.')) return;
    const result = await AuthoritySync.pull();
    await reloadData(); renderSyncStatus();
    alert(`GitHub data pulled: ${result.music.toLocaleString()} Music and ${result.comic.toLocaleString()} Comic records.`);
  }

  async function publishToGitHub() {
    if (!confirm('Publish this device’s complete Music and Comic authorities to GitHub? This updates the live source files and may trigger a GitHub Pages deployment.')) return;
    const result = await AuthoritySync.push();
    renderSyncStatus();
    alert(`Published ${result.music.toLocaleString()} Music and ${result.comic.toLocaleString()} Comic records to GitHub.`);
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
    on('#showComicAuthority', 'change', event => { state.showComicAuthority = event.target.checked; localStorage.setItem('2ncShowComicAuthority', String(state.showComicAuthority)); renderPreview(); });
    on('#showComicEra', 'change', event => { state.showComicEra = event.target.checked; localStorage.setItem('2ncShowComicEra', String(state.showComicEra)); renderPreview(); });
    on('#clearQueue', 'click', () => { state.queue = []; saveQueue(); });
    on('#printBtn', 'click', () => { try { LabelEngine.printQueue(state.queue); } catch (error) { alert(error.message); } });
    on('#sharePdfBtn', 'click', () => sharePrintPacket().catch(error => { if (error.name !== 'AbortError') alert(error.message); }));
    on('#sendStationBtn', 'click', () => sendToStation().catch(error => alert(error.message)));
    on('#calibrationBtn', 'click', () => { try { LabelEngine.printCalibration(state.mode === 'manager' ? 'vinyl' : state.mode); } catch (error) { alert(error.message); } });
    on('#customBtn', 'click', customLabel);
    on('#addTag', 'click', () => addTagValues($('#priceInput')?.value || '', $('#productInput')?.value || ''));
    on('#addTreasureTag', 'click', () => addTreasureTag($('#treasureProductInput')?.value || ''));
    on('#priceInput', 'input', event => { const element = $('.tagPrice'); if (element) element.textContent = event.target.value ? (event.target.value.startsWith('$') ? event.target.value : `$${event.target.value}`) : '$239'; });
    on('#productInput', 'input', event => { const element = $('.tagProduct'); if (element) element.innerHTML = escapeHtml(event.target.value || 'PRODUCT NAME').replace(/\n/g, '<br>'); });
    on('#treasureProductInput', 'input', event => { const element = $('.treasureProduct'); if (element) element.innerHTML = escapeHtml(event.target.value || 'PRODUCT NAME').replace(/\n/g, '<br>'); });
    on('#closeModal', 'click', closeModal); on('#modal', 'click', event => { if (event.target.id === 'modal') closeModal(); });
    on('#aboutBtn', 'click', showAbout); on('#debugBadge', 'click', showAbout);
    on('#managerDataset', 'change', () => { state.managerSelected = null; renderManager(); }); on('#managerSearch', 'input', renderManager); on('#managerStatus', 'change', renderManager);
    on('#newAuthority', 'click', newAuthority); on('#authorityForm', 'submit', saveAuthority); on('#retireRecord', 'click', toggleRetire); on('#deleteRecord', 'click', deleteSelected);
    on('#exportBackup', 'click', exportBackup); on('#importBackup', 'change', event => importBackup(event.target.files[0]).catch(error => alert(error.message)));
    on('#repairDatabase', 'click', () => repairDatabase().catch(error => alert(error.message)));
    on('#syncSettings', 'click', openSyncSettings);
    on('#syncPull', 'click', () => pullFromGitHub().catch(error => alert(error.message)));
    on('#syncPush', 'click', () => publishToGitHub().catch(error => alert(error.message)));
    on('#stationRefresh', 'click', () => refreshStation().catch(showStationError));
    on('#stationConnectionBtn', 'click', openSyncSettings);
    document.addEventListener('visibilitychange', () => { if (!document.hidden && state.mode === 'station') refreshStation().catch(showStationError); });
  }

  function appendSelectGroup(selector, label, values) {
    const select = $(selector);
    if (!select) return;
    const existing = new Set(Array.from(select.options).map(option => option.value));
    const group = document.createElement('optgroup');
    group.label = label;
    values.filter(value => !existing.has(value)).forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      group.appendChild(option);
    });
    if (group.children.length) select.appendChild(group);
  }

  function installMarvelPublishingOptions() {
    appendSelectGroup('#editPublishingEra', 'Marvel', [
      'Marvel NOW!', 'All-New Marvel NOW!', 'All-New, All-Different Marvel',
      'Marvel NOW! 2.0', 'Marvel Legacy', 'Fresh Start', 'Dawn of X',
      'Reign of X', 'Destiny of X', 'Fall of X', 'From the Ashes'
    ]);
    appendSelectGroup('#editPublishingLine', 'Marvel', [
      'Ultimate Universe', 'Marvel Knights', 'MAX', '2099',
      'Marvel Zombies', 'Star Wars', 'Alien / Predator'
    ]);
  }

  async function initialize() {
    installMarvelPublishingOptions();
    bindEvents();
    const authorityToggle = $('#showComicAuthority'); if (authorityToggle) authorityToggle.checked = state.showComicAuthority;
    const eraToggle = $('#showComicEra'); if (eraToggle) eraToggle.checked = state.showComicEra;
    await reloadData();
    renderQueue(); setMode('vinyl');
    text('#versionBadge', `v${APP_CONFIG.version}`);
    renderSyncStatus();
    renderStationConnection();
  }

  window.AppUI = { initialize, reloadData, setMode, showAbout, state };
})();
