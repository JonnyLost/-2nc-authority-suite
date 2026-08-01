# 2NC Authority Suite v4.12 — Marvel Team Authority Audit

This release applies one filing rule across Marvel team books: a team with its own named publication history receives a primary authority, while branded branches that remain part of an established title family stay beneath that family. Event-branded issues continue to remain with their actual series unless the comic itself is an event-titled publication.

## v4.12 changes

- Audited 49 Marvel team families and normalized every audited primary record to the Team type.
- Added 31 missing team authorities and 102 historical team-series records.
- Repaired 35 parent relationships, including Excalibur, Marauders, X-Factor, X-Force, Eternals, Invaders, Power Pack, Squadron Supreme, and related series.
- Corrected three obvious legacy misfiles: Uncanny X-Men no longer sits under Alpha Flight, Fantastic Four no longer sits under Inhumans, and the 2024 Ultimates series now resolves to Ultimates.
- Preserved Avengers-branded branches such as New Avengers, Secret Avengers, Mighty Avengers, Uncanny Avengers, and West Coast Avengers beneath AVENGERS.
- Preserved event-branded regular-series issues in their normal numbered runs.
- Added a narrowly scoped upgrade migration for the 53 repaired existing records; genuine local Authority Manager edits remain protected.
- Preserved Quick Lookup, one-tap queueing, label filters, printing, Print Station, and synchronization.

## Database

- Music authorities: 4,606
- Comic authorities: 3,931
- Marvel authorities: 1,595
- Marvel primary team authorities: 57
- New primary team authorities: 31
- New historical team-series records: 102
- Repaired existing records: 53
- Duplicate IDs: 0
- Unresolved parent authorities: 0

## Upgrade

Open the published site once with `?v=4.12`, then fully close and reopen any installed PWA. The app will merge new records and apply only the audited canonical team repairs while preserving records explicitly edited in Authority Manager.
