# 2NC Authority Suite v5.0 — Unified Operations Interface

This major release rebuilds the application shell around the visual system established by the 2NC Store Operations Dashboard while preserving the production workflows and v4.5 authority data.

## What changed

- Added a command-center overview with live authority and print-queue counts.
- Added numbered, Store Operations-style desktop and iPad navigation.
- Added a slide-out navigation drawer for iPhone.
- Rebuilt production workspaces with the light operational canvas, white panels, dark typography, and restrained orange accents used by Store Operations.
- Standardized buttons, fields, filters, results, status cards, Authority Manager, and Print Station.
- Preserved the efficient search → preview → queue workflow inside each label generator.
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
- Comic authorities: 2,576
- Modern DC era assignments: 651
- DC publishing-line assignments: 123

## Upgrade

Upload the contents of this folder to the repository root, then open the site once with `?v=5.0`. Fully close and reopen any installed PWA after that first load.

The repository remains prefilled for `jonnylost/-2nc-authority-suite`. Existing authority edits, mobile printing, PDF sharing, Print Station, calibration, and GitHub synchronization are preserved.
