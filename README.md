# 2NC Authority Suite v3.1 — Database-Driven Comic Titles

This release makes the Comic Authority database the sole editorial source for printed series names.

## Comic label rule

- **Primary authority label:** prints the authority name.
- **Series label:** prints the parent authority as the small cue and the exact **Printed divider title** as the large title.
- The generator does **not** strip character names, commas, colons, punctuation, or prefixes.

Examples now print exactly as intended:

- Luke Cage / **Luke Cage, Hero for Hire**
- John Constantine / **John Constantine, Hellblazer**
- Nick Fury / **Nick Fury, Agent of S.H.I.E.L.D.**
- Godzilla / **Godzilla, King of the Monsters**

## Database changes

- Added `printedTitle` to every bundled comic record.
- Removed the two decade authorities: `1980s-90s` and `2000s-2020s`.
- Promoted 22 event records formerly filed under decade authorities to standalone primary authorities.
- Bundled comic record count: 2,043.
- Authority Manager now includes a **Printed divider title** field.

## Upload

1. Unzip this package.
2. Upload everything inside the folder to the root of your GitHub repository.
3. Commit directly to `main`.
4. Wait for GitHub Pages to publish.
5. Open once with:
   `https://jonnylost.github.io/2nc-authority-suite/?v=3.1`
6. Fully close and reopen the Home Screen app after the web version shows v3.1.0.

The internal v3 database will merge the corrected bundled comic records automatically while preserving edited notes and retired status where possible.

## Exact production sizes

- Vinyl: 5.00 × 0.675 inches
- CD: 2.00 × 0.675 inches
- Comic: 3.50 × 0.675 inches
- Instrument tag: 6.00 × 4.00 inches

Always print at **Actual Size / 100%**.
