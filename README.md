# 2NC Authority Suite v4.9 — DC Deep Authority & Queue Workflow

This release follows an in-store 97-label DC production test. It expands character and classic-series depth, repairs missing parent authorities, and makes the phone queue a practical editing workspace.

## v4.9 changes

- Added the six reported missing labels: Magog, Punchline, Ragman, Robin, Trinity, and The Warlord.
- Audited DC's official character directory and added missing searchable character/team authorities.
- Added classic, cult, anthology, and short-run DC publication authorities.
- Repaired every series whose parent authority was missing; the bundled database now has zero orphan parents.
- Moved **Create custom label** above the queue so it remains easy to reach on mobile.
- Added **Add to queue + database** to the custom-label workflow.
- Made queued labels tappable so they reopen in the live preview and can be updated.
- Preserved authority-line and era/imprint choices per queued label.
- Preserved the approved interface, certified physical dimensions, mobile PDF sharing, Print Station, and synchronization.
- Included `DC_DEEP_AUTHORITY_AUDIT.csv` with every addition, repair, and already-present result.

## Database

- Music authorities: 4,606
- Comic authorities: 3,583
- New comic records: 225
- Unresolved parent authorities: 0

## Upgrade

Open the published site once with `?v=4.9`, then fully close and reopen any installed PWA. The new bundle is merged into existing device databases while preserving local edits, custom records, retirements, and deletions.

The repository remains prefilled for `jonnylost/-2nc-authority-suite`.
