# 2NC Authority Suite GitHub v2.2

## Music label restoration

Vinyl and CD labels once again print all three hierarchy lines:

1. Primary Genre
2. Artist Name
3. Primary Subgenre • Secondary Subgenre

The app automatically migrates existing browser databases so the restored descriptors appear without deleting local records or queues. Exact physical label dimensions from v2.1 are unchanged.

# 2NC Authority Suite v2.0 — Internal Database Edition

This release replaces Excel as the operational database.

## What changed
- Music and Comic authorities seed into IndexedDB on first launch.
- Add, edit, retire, restore, and delete records inside the Authority Manager.
- Export a complete JSON backup at any time.
- Import a prior JSON backup to restore or move the database to another device.
- Excel is not required for normal operation.

## GitHub Pages upload
Upload the **contents of this folder** to the repository root. `index.html` must be at the top level. Enable GitHub Pages from the `main` branch and root folder.

## Important device note
Each browser/device keeps its own local IndexedDB copy. Use **Export backup** and **Import backup** to move edits between devices. A future cloud-sync release can centralize edits across devices.
