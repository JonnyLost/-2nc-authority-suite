# 2NC Authority Suite v4.19.2 — 30-up Comic Label Layout Fix

This release follows the publisher deep dives with a title-by-title Marvel audit. It covers exact publication runs—not only major character, team, and event families—so short miniseries, one-shots, licensed books, repeated volumes, and historical Timely/Atlas titles can be found without creating custom labels.

The recognizable property, character, team, event, or title family remains the shelf-visible filing authority. Publisher and historical publishing-line data remain supporting metadata.

## v4.19.2 changes

- Corrects comic labels to the measured Amazon stock: 3½ × ⅔ inches.
- Prints 30 comic labels per portrait US Letter sheet in 2 columns of 15.
- Uses exact ½-inch outer margins and center gutter in browser printing, calibration sheets, and generated PDFs.

## v4.19 changes

- Audited 5,295 Marvel publication runs across the complete A–Z history index.
- Audited 380 additional Timely Comics and Atlas Comics publication runs.
- Added 1,120 primary filing authorities and 4,886 run-specific subordinate records over v4.18.
- Reused 788 exact runs already represented in the Authority Suite instead of duplicating them.
- Added start and end years to new run records so repeated titles and volumes remain distinguishable in lookup.
- Corrected the inherited 2017 **Bullseye** series to file under **BULLSEYE**.
- Packaged the Marvel expansion in small supplemental bundles so the offline cache and GitHub synchronization path can load the much larger catalog reliably.
- Preserved Quick Lookup, one-tap Clear, queueing, music lookup, label generators, printing, synchronization, and genuine Authority Manager edits.

## User-reported examples

- *Avataars: Covenant of the Shield* (2000) → **AVATAARS**
- *Bullseye* (2017), *Bullseye: Greatest Hits* (2004–2005), and *Bullseye: Perfect Game* (2011) → **BULLSEYE**
- *Battlefield* (1952–1953) → **BATTLEFIELD**, with Atlas Comics retained as publishing-line metadata
- *Barbie* (1991–1996), *Barbie Fashion* (1991–1995), and *Barbie & Baby Sister Kelly* (1995) → **BARBIE**

## Database

- Music records: 4,606
- Comic records: 13,287
- Primary comic authorities: 3,579
- Subordinate comic records: 9,708
- Net new comic records: 6,006
- Publication runs audited: 5,675
- Duplicate comic IDs: 0
- Duplicate music IDs: 0
- Unresolved parent authorities: 0

## Upgrade

Open the published site once with `?v=4.19`, then fully close and reopen any installed PWA. The app merges the expanded bundle and applies the audited Bullseye filing repair while preserving records explicitly edited in Authority Manager.
