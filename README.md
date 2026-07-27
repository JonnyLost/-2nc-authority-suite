# 2NC Authority Suite v2.5

Full database reset and cache recovery release.

## What this fixes
- Forces a fresh internal browser database.
- Reseeds all bundled Music and Comic records.
- Shows live database counts at the top of the app.
- Uses network-first loading for HTML, JavaScript, CSS, and database JSON files.
- Removes all older service-worker caches during activation.

## After uploading
Open the site once with `?v=2.5` at the end of the URL, refresh, then close and reopen the Home Screen app.
