(function () {
  const SCHEMA = 1;
  const ACTIVE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

  function safeId() {
    return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function cleanQueue(queue) {
    const cutoff = Date.now() - ACTIVE_WINDOW_MS;
    const jobs = (Array.isArray(queue?.jobs) ? queue.jobs : [])
      .filter(job => job && job.id && (job.status !== 'completed' || Date.parse(job.completedAt || 0) >= cutoff))
      .slice(-150);
    return { schema: SCHEMA, updatedAt: new Date().toISOString(), jobs };
  }

  async function readQueue() {
    const settings = AuthoritySync.settings();
    const file = await AuthoritySync.getRepositoryFile(settings.printQueuePath, settings.printBranch, true);
    if (!file) return { queue: cleanQueue(null), sha: '' };
    let queue;
    try { queue = JSON.parse(file.text); } catch (_) { throw new Error('The remote Print Station queue is not valid JSON.'); }
    return { queue: cleanQueue(queue), sha: file.sha };
  }

  async function mutateQueue(change, message) {
    const settings = AuthoritySync.settings();
    if (!AuthoritySync.hasToken()) throw new Error('Open Authority → Connection and enter the GitHub token for this session.');
    await AuthoritySync.ensureBranch(settings.printBranch);
    let lastError;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const current = await readQueue();
      const next = cleanQueue(await change(current.queue));
      try {
        await AuthoritySync.putRepositoryFile(
          settings.printQueuePath,
          settings.printBranch,
          `${JSON.stringify(next, null, 2)}\n`,
          current.sha,
          message
        );
        return next;
      } catch (error) {
        lastError = error;
        if (![409, 422].includes(error.status)) throw error;
      }
    }
    throw lastError || new Error('The Print Station queue changed too quickly. Try again.');
  }

  async function send(items, note = '') {
    if (!Array.isArray(items) || !items.length) throw new Error('Add at least one item to the print queue.');
    const settings = AuthoritySync.settings();
    const now = new Date().toISOString();
    const job = {
      id: safeId(),
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      from: settings.deviceName || 'Sales floor device',
      note: String(note || '').trim(),
      itemCount: items.length,
      items: JSON.parse(JSON.stringify(items))
    };
    await mutateQueue(queue => {
      queue.jobs.push(job);
      return queue;
    }, `Send print job from ${job.from}`);
    return job;
  }

  async function list() {
    const current = await readQueue();
    return current.queue.jobs.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }

  async function updateJob(id, update) {
    let changed;
    const settings = AuthoritySync.settings();
    await mutateQueue(queue => {
      const job = queue.jobs.find(item => item.id === id);
      if (!job) throw new Error('This print job is no longer in the queue.');
      Object.assign(job, update, { updatedAt: new Date().toISOString() });
      if (update.status === 'printing') {
        job.claimedAt = job.claimedAt || new Date().toISOString();
        job.station = settings.deviceName || 'Store print station';
      }
      if (update.status === 'completed') job.completedAt = new Date().toISOString();
      if (update.status === 'cancelled') job.cancelledAt = new Date().toISOString();
      changed = job;
      return queue;
    }, `Update print job ${id.slice(0, 8)}`);
    return changed;
  }

  window.PrintStation = {
    send,
    list,
    claim: id => updateJob(id, { status: 'printing' }),
    complete: id => updateJob(id, { status: 'completed' }),
    reopen: id => updateJob(id, { status: 'pending', completedAt: '', cancelledAt: '' }),
    cancel: id => updateJob(id, { status: 'cancelled' })
  };
})();
