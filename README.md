# 2NC Authority Suite v3.0 — Stable Foundation

This release rebuilds the GitHub/PWA foundation so the app cannot silently fail because one optional control, stale cache file, or incomplete local database is missing.

## What changed

- Staged startup sequence with visible progress
- Separate interface, database, label/print, logging, and startup modules
- Visible app version and live Music/Comic record counts
- Bundled-data validation before the interface opens
- Automatic reseeding when a local database is incomplete
- Best-effort migration of custom records, retired status, and edited notes from the prior browser database
- Manual **Repair bundled data** control in Authority Manager
- Fatal error screen with Retry, Repair, and Diagnostics actions
- Optional developer logging with copyable diagnostics
- Network-first update strategy for app files
- Version-matched HTML, JavaScript, CSS, database, and service-worker files

## Expected data counts

- Music: 4,606 bundled records
- Comics: 2,045 bundled records

The header should show approximately those counts after startup. Retired or custom records may cause small differences.

## Upload to GitHub

1. Unzip this package.
2. Open your `2nc-authority-suite` repository.
3. Choose **Add file → Upload files**.
4. Upload everything inside this folder to the repository root.
5. Commit directly to `main`.
6. Wait for GitHub Pages to finish publishing.
7. Open the site once with `?v=3.0`, for example:
   `https://jonnylost.github.io/2nc-authority-suite/?v=3.0`

Do not clear Safari website data. The release will create a new internal v3 database and attempt to preserve useful local changes from the previous database.

## Diagnostics

Open **About** to see:

- Current app version/build
- Loaded record counts
- Browser/environment information
- Startup and runtime log
- Developer logging toggle
- Copy Diagnostics button

## Exact production sizes

- Vinyl: 5.00 × 0.675 inches
- CD: 2.00 × 0.675 inches
- Comic: 3.50 × 0.675 inches
- Instrument tag: 6.00 × 4.00 inches

Always print at **Actual Size / 100%**.
