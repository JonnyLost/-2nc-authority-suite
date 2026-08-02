# 2NC Authority Suite v4.14 — Comprehensive DC Catalog & Imprint Audit

This release extends the DC team pass into a title-by-title filing audit across mainline DC and its major imprints. Imprints remain searchable metadata; the shelf-visible authority is the character, team, event, or recognizable property a customer is most likely to seek.

## v4.14 changes

- Audited mainline DC title families, major events, Vertigo, DC Black Label, WildStorm, Milestone, Young Animal, Hill House Comics, Sandman Universe, Elseworlds, Impact, Wonder Comics, Hanna-Barbera Beyond, DC Horror, and America's Best Comics.
- Added 188 missing primary filing authorities and 87 historical or imprint-series records.
- Repaired 404 existing canonical relationships.
- Removed every remaining DC title from broad catch-all parents such as DC Universe, Crisis Saga, Vertigo / Black Label, and generic imprint umbrellas.
- Normalized older appearance-based cross-files so an exact DC title now resolves to one filing authority.
- Kept regular numbered-series crossover issues in their normal title families while grouping dedicated event-titled books beneath the event.
- Preserved Quick Lookup, one-tap queueing, label filters, alphabetical queues, printing, Print Station, synchronization, and genuine Authority Manager edits.

## Filing examples

- *Y: The Last Man* → **Y: THE LAST MAN** (Vertigo metadata)
- *The Nice House by the Sea* → **THE NICE HOUSE ON THE LAKE**
- *Batman: Damned* → **BATMAN** (Black Label metadata)
- *Far Sector* → **GREEN LANTERN** (Young Animal metadata)
- *Flex Mentallo* → **DOOM PATROL** (Vertigo metadata)
- *Waller vs. Wildstorm* → **SUICIDE SQUAD**
- *Basketful of Heads* → **BASKETFUL OF HEADS**
- *Knight Terrors: Batman* → **KNIGHT TERRORS** because it is a dedicated event-titled miniseries; ordinary Batman tie-in issues remain under **BATMAN**.

## Database

- Music authorities: 4,606
- Comic authorities: 4311
- New comic records: 275
- Repaired existing records: 404
- Duplicate IDs: 0
- Unresolved parent authorities: 0
- Conflicting exact-title filing answers: 0
- Records still buried beneath generic DC/imprint parents: 0

## Upgrade

Open the published site once with `?v=4.14`, then fully close and reopen any installed PWA. The app merges the new bundled records and applies only the audited canonical relationship repairs while preserving genuine Authority Manager edits.
