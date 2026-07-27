(function () {
  const entries = [];
  const maxEntries = 250;
  const enabled = new URLSearchParams(location.search).get('debug') === '1' || localStorage.getItem('2ncDebug') === '1';

  function add(level, message, detail) {
    const entry = { time: new Date().toISOString(), level, message: String(message), detail: detail ? String(detail.stack || detail) : '' };
    entries.push(entry);
    if (entries.length > maxEntries) entries.shift();
    const fn = console[level] || console.log;
    fn.call(console, `[2NC ${level.toUpperCase()}] ${message}`, detail || '');
    if (enabled) renderBadge(level);
  }

  function renderBadge(level) {
    const badge = document.getElementById('debugBadge');
    if (!badge) return;
    badge.hidden = false;
    badge.textContent = `Debug: ${entries.length} event${entries.length === 1 ? '' : 's'}`;
    badge.dataset.level = level;
  }

  function diagnostics(extra) {
    return {
      app: window.APP_CONFIG,
      url: location.href,
      online: navigator.onLine,
      userAgent: navigator.userAgent,
      time: new Date().toISOString(),
      storage: { queueCount: JSON.parse(localStorage.getItem('2ncQueue') || '[]').length },
      logs: entries.slice(),
      ...extra
    };
  }

  window.AppLog = {
    info: (m, d) => add('info', m, d),
    warn: (m, d) => add('warn', m, d),
    error: (m, d) => add('error', m, d),
    entries: () => entries.slice(),
    diagnostics,
    setEnabled(value) { localStorage.setItem('2ncDebug', value ? '1' : '0'); location.reload(); },
    enabled
  };
})();
