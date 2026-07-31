/* 2NC Authority Suite v4.7 — comic label preferences and publication years */
(function () {
  const stages = [
    ['Preparing interface', 12],
    ['Opening internal database', 30],
    ['Validating bundled authority data', 58],
    ['Loading Music and Comic records', 78],
    ['Starting application', 92]
  ];
  let forceRepair = false;

  function setStage(index, customMessage) {
    const [message, percent] = stages[Math.min(index, stages.length - 1)];
    const label = document.getElementById('startupMessage');
    const bar = document.getElementById('startupBar');
    if (label) label.textContent = customMessage || message;
    if (bar) bar.style.width = `${percent}%`;
    AppLog.info(customMessage || message);
  }

  function hideStartup() {
    const overlay = document.getElementById('startupOverlay');
    if (overlay) {
      const bar = document.getElementById('startupBar');
      if (bar) bar.style.width = '100%';
      setTimeout(() => overlay.classList.add('hidden'), 180);
    }
  }

  function showFatal(error) {
    AppLog.error('Application startup failed', error);
    document.getElementById('startupOverlay')?.classList.add('hidden');
    const fatal = document.getElementById('fatalError');
    const text = document.getElementById('fatalErrorText');
    if (text) text.textContent = error.message || String(error);
    if (fatal) fatal.classList.remove('hidden');
  }

  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    const registration = await navigator.serviceWorker.register(`service-worker.js?v=${APP_CONFIG.version}`, { updateViaCache: 'none' });
    await registration.update();
    AppLog.info('Service worker registered', registration.scope);
  }

  async function start() {
    document.getElementById('fatalError')?.classList.add('hidden');
    document.getElementById('startupOverlay')?.classList.remove('hidden');
    try {
      setStage(0);
      if (!window.APP_CONFIG || !window.AppLog || !window.AuthorityDB || !window.AuthoritySync || !window.PrintStation || !window.PrintPacket || !window.LabelEngine || !window.AppUI) throw new Error('One or more application modules did not load. Refresh the page after GitHub Pages finishes publishing.');
      setStage(1);
      const counts = await AuthorityDB.initialize({ force: forceRepair });
      AppLog.info('Database initialized', JSON.stringify(counts));
      forceRepair = false;
      setStage(3);
      await AppUI.initialize();
      setStage(4);
      registerServiceWorker().catch(error => AppLog.warn('Service worker registration failed; the app can still run online', error));
      hideStartup();
    } catch (error) {
      showFatal(error);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const version = document.getElementById('startupVersion');
    if (version && window.APP_CONFIG) version.textContent = `v${APP_CONFIG.version}`;
    document.getElementById('retryStartup')?.addEventListener('click', () => location.reload());
    document.getElementById('repairStartup')?.addEventListener('click', () => { forceRepair = true; start(); });
    document.getElementById('openDiagnostics')?.addEventListener('click', () => {
      if (window.AppUI) AppUI.showAbout();
      else alert(JSON.stringify(AppLog.diagnostics(), null, 2));
    });
    start();
  });

  window.addEventListener('error', event => AppLog.error(`Runtime error: ${event.message}`, event.error));
  window.addEventListener('unhandledrejection', event => AppLog.error('Unhandled promise rejection', event.reason));
})();
