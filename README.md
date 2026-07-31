# 2NC Authority Suite v4.7 — Comic Label Preferences

This release refines comic-label control and title identification while preserving the v4.5 interface, the v4.6 DC event expansion, and certified print dimensions.

## v4.7 changes

- Added **Show authority name above series title**, enabled by default.
- Both comic-label checkboxes are remembered independently on each device.
- Authority visibility is preserved in browser printing, PDFs, and Print Station jobs.
- Comic search results now identify the parent authority, era/imprint, publication range, publisher, record type, and record ID.
- Added optional `startYear` and `endYear` fields to comic records and Authority Manager.
- Prefilled `startYear` for all 86 audited DC event-family authorities.
- Publication years are searchable and appear in Authority Manager and search results, but never print on labels.
- Existing queued comic labels remain backward compatible and continue showing the authority name.

## What changed

- Added 123 curated publishing-line assignments across 14 label markers:
  - Vertigo
  - Black Label
  - Young Animal
  - Sandman Universe
  - Milestone
  - WildStorm
  - Elseworlds
  - Hill House Comics
  - Wonder Comics
  - America's Best Comics
  - All-Star
  - Impact
  - Hanna-Barbera Beyond
  - DC Horror
- Preserved all nine v4.4 DC publishing eras.
- An imprint/line marker takes priority over an era marker when both are present.
- Renamed the comic-label option to **Show publishing era or imprint on comic labels**.
- Added publishing-line editing to Authority Manager and custom comic labels.
- Added publishing-line search, preview, PDF, browser-printing, and Print Station support.
- Added three line-specific exact-title authorities for *Animal Man*, *Lucifer*, and *The Dreaming* so their Vertigo volumes remain distinct from modern relaunches.
- Included a complete assignment audit and printable example sheet.
- Preserved the exact comic label size at 3.50 × 0.675 inches.

## Database

- Music authorities: 4,606
- Comic authorities: 2,648
- Modern DC era assignments: 651
- DC publishing-line assignments: 123
- DC event authorities: 106

## Upgrade

Upload the contents of this folder to the repository root, then open the site once with `?v=4.7`. Fully close and reopen any installed PWA after that first load.

## v4.6 event expansion

- Audited 86 major DC event and companion periodical titles from 1985 through 2026.
- Added 72 missing event authorities, including *52*, *Countdown to Final Crisis*, *War of the Gods*, *Eclipso: The Darkness Within*, *Underworld Unleashed*, *The Final Night*, *DC One Million*, *Brightest Day*, and the complete set of separately titled *Flashpoint* miniseries and one-shots.
- Preserved the approved v4.5 interface, publishing-era markers, mobile PDF sharing, Print Station, and certified physical label dimensions.
- See `DC_EVENT_AUTHORITY_AUDIT.csv` for the title-by-title result.

The repository remains prefilled for `jonnylost/-2nc-authority-suite`. Existing authority edits, mobile printing, PDF sharing, Print Station, calibration, and GitHub synchronization are preserved.
