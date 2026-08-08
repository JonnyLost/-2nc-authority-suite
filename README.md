# 2NC Authority Suite v4.22.0 — Music Genre Deep Dive

This release expands the store-floor music filing authority across rock, pop, alternative, punk, and heavy metal. Punk remains filed under Alternative and heavy metal remains filed under Metal, matching the established Authority taxonomy.

## v4.22.0 changes

- Audited established reference highlights, historically important scenes, modern chart and award activity, and retail-relevant artists across the requested genres.
- Added 700 previously missing artists: 86 Rock, 83 Pop, 304 Alternative (including Punk), and 227 Metal.
- Added a primary and secondary subgenre to every new artist so vinyl and CD labels retain both requested descriptor lines.
- Repaired the inherited Queensrÿche record that was missing its secondary label subgenre.
- Assigned Essential, Recommended, or Optional divider levels based on historical influence, recognition, current relevance, and likely store-floor usefulness.
- Preserved all existing artist IDs, locally edited Authority Manager records, retired/deleted records, comics, queues, labels, printing, synchronization, and offline behavior.

## Database

- Music records: 5,306
- Net new music records: 700
- Rock additions: 86
- Pop additions: 83
- Alternative and punk additions: 304
- Metal additions: 227
- Music records missing a primary subgenre: 0
- Music records missing a secondary subgenre: 0
- Duplicate music IDs: 0
- Comic records: 13,287

## Upgrade

Open the published site once with ?v=4.22.0, then fully close and reopen the installed web app. The updated bundle is merged into the device database while preserving genuine Authority Manager edits and device-local custom records.
