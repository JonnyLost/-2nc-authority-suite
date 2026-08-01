# 2NC Authority Suite v4.10 — Marvel Event Authority Expansion

This release repairs Marvel event structure after the in-store Infinity test. True Marvel events are now independent primary authorities, while only dedicated event-titled books are grouped beneath them. Regular numbered-series tie-ins remain with their actual series so runs stay complete on the sales floor.

## v4.10 changes

- Audited 45 Marvel event families from *Contest of Champions* through 2026's *Queen in Black*.
- Added or repaired 310 event-authority and dedicated-title relationships.
- Promoted *Infinity*, *Infinity Wars*, *War of Kings*, *Realm of Kings*, *Messiah Complex*, *AXIS*, *Spider-Island*, *Gang War*, *Devil's Reign*, *Blood Hunt*, *Venom War*, and other true events to primary-authority status.
- Added dedicated core miniseries, preludes, aftermath books, one-shots, and event-named companion series.
- Kept regular *Avengers*, *New Avengers*, *Amazing Spider-Man*, *X-Men*, and other numbered tie-in issues in their normal authority families.
- Preserved the v4.9.1 interface, label-type filter, alphabetical Add All behavior, queue editing, print dimensions, PDF output, Print Station, and synchronization.
- Included `MARVEL_EVENT_AUTHORITY_AUDIT.csv` with every confirmed, added, enriched, and reparented event record.

## Database

- Music authorities: 4,606
- Comic authorities: 3,795
- Marvel authorities: 1,459
- Marvel primary event authorities: 58
- New comic records: 212
- Unresolved parent authorities: 0

## Upgrade

Open the published site once with `?v=4.10`, then fully close and reopen any installed PWA. The new bundle is merged into existing device databases while preserving local edits, custom records, retirements, and deletions.
