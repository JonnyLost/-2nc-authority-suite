#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const comicsPath = path.join(root, 'data', 'comics.json');
const auditPath = path.join(root, 'DC_EVENT_AUTHORITY_AUDIT.csv');

// Dedicated event periodicals, bookend specials, weekly event series, and
// clearly branded companion miniseries. Ordinary tie-in issues remain under
// their normal series authorities and are intentionally excluded.
const candidates = [
  // Existing major events are retained and included in the audit.
  ['Crisis on Infinite Earths', 'Crisis Saga', 'Recommended', '', 1985],
  ['Legends', 'DC Universe', 'Recommended', '', 1986],
  ['Millennium', 'DC Universe', 'Recommended', '', 1988],
  ['Invasion!', 'DC Universe', 'Recommended', '', 1988],
  ['Cosmic Odyssey', 'DC Universe', 'Recommended', '', 1988],
  ['Armageddon 2001', 'DC Universe', 'Recommended', '', 1991],
  ['Armageddon: The Alien Agenda', 'Armageddon 2001', 'Optional', '', 1991],
  ['Armageddon: Inferno', 'Armageddon 2001', 'Optional', '', 1992],
  ['War of the Gods', 'DC Universe', 'Recommended', '', 1991],
  ['Eclipso: The Darkness Within', 'DC Universe', 'Recommended', '', 1992],
  ['Bloodlines', 'DC Universe', 'Recommended', '', 1993],
  ['Bloodbath', 'Bloodlines', 'Optional', '', 1993],
  ['Zero Hour: Crisis in Time', 'Crisis Saga', 'Recommended', '', 1994],
  ['Underworld Unleashed', 'DC Universe', 'Recommended', '', 1995],
  ['The Final Night', 'DC Universe', 'Recommended', '', 1996],
  ['Genesis', 'DC Universe', 'Recommended', '', 1997],
  ['DC One Million', 'DC Universe', 'Recommended', '', 1998],
  ['Day of Judgment', 'DC Universe', 'Recommended', '', 1999],
  ['Sins of Youth', 'DC Universe', 'Recommended', '', 2000],
  ['Our Worlds at War', 'DC Universe', 'Recommended', '', 2001],
  ['Joker: Last Laugh', 'DC Universe', 'Recommended', '', 2001],
  ['Identity Crisis', 'Justice League / Universe-Wide', 'Recommended', '', 2004],

  // Infinite Crisis, 52, Countdown, and Final Crisis publishing family.
  ['Countdown to Infinite Crisis', 'Crisis Saga', 'Recommended', '', 2005],
  ['Day of Vengeance', 'Crisis Saga', 'Optional', '', 2005],
  ['Rann-Thanagar War', 'Crisis Saga', 'Optional', '', 2005],
  ['Villains United', 'Crisis Saga', 'Optional', '', 2005],
  ['The OMAC Project', 'Crisis Saga', 'Optional', '', 2005],
  ['Infinite Crisis', 'Crisis Saga', 'Recommended', '', 2005],
  ['Infinite Crisis Aftermath: The Battle for Blüdhaven', 'Crisis Saga', 'Optional', '', 2006],
  ['52', 'DC Universe', 'Recommended', '', 2006],
  ['World War III', '52', 'Optional', '', 2007],
  ['52 Aftermath: The Four Horsemen', '52', 'Optional', '', 2007],
  ['Crime Bible: The Five Lessons of Blood', '52', 'Optional', '', 2007],
  ['Seven Soldiers', 'DC Universe', 'Recommended', '', 2005],
  ['Countdown', 'Crisis Saga', 'Recommended', '', 2007],
  ['Countdown to Final Crisis', 'Crisis Saga', 'Recommended', '', 2007],
  ['Countdown to Adventure', 'Countdown to Final Crisis', 'Optional', '', 2007],
  ['Countdown to Mystery', 'Countdown to Final Crisis', 'Optional', '', 2007],
  ['Countdown: Arena', 'Countdown to Final Crisis', 'Optional', '', 2007],
  ['Countdown Presents: Lord Havok and the Extremists', 'Countdown to Final Crisis', 'Optional', '', 2007],
  ['Countdown Presents: The Search for Ray Palmer', 'Countdown to Final Crisis', 'Optional', '', 2007],
  ['Death of the New Gods', 'Countdown to Final Crisis', 'Optional', '', 2007],
  ['Salvation Run', 'Countdown to Final Crisis', 'Optional', '', 2007],
  ['Final Crisis', 'Crisis Saga', 'Recommended', '', 2008],
  ['Final Crisis: Legion of Three Worlds', 'Final Crisis', 'Optional', '', 2008],
  ['Final Crisis: Revelations', 'Final Crisis', 'Optional', '', 2008],
  ['Final Crisis: Requiem', 'Final Crisis', 'Optional', '', 2008],
  ['Final Crisis: Resist', 'Final Crisis', 'Optional', '', 2008],
  ['Final Crisis: Rage of the Red Lanterns', 'Final Crisis', 'Optional', '', 2008],
  ["Final Crisis: Rogues' Revenge", 'Final Crisis', 'Optional', '', 2008],
  ['Final Crisis: Secret Files', 'Final Crisis', 'Optional', '', 2009],
  ['Final Crisis: Superman Beyond', 'Final Crisis', 'Optional', '', 2008],
  ['Blackest Night', 'Justice League / Universe-Wide', 'Recommended', '', 2009],
  ['Brightest Day', 'DC Universe', 'Recommended', '', 2010],
  ['Brightest Day Aftermath: The Search for Swamp Thing', 'Brightest Day', 'Optional', '', 2011],

  // Flashpoint main series and every separately titled event miniseries/one-shot.
  ['Flashpoint', 'DC Universe', 'Recommended', '', 2011],
  ['Flashpoint: Abin Sur - The Green Lantern', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Batman - Knight of Vengeance', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Citizen Cold', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Deathstroke and the Curse of the Ravager', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Emperor Aquaman', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Frankenstein and the Creatures of the Unknown', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Grodd of War', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Hal Jordan', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Kid Flash Lost', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Legion of Doom', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Lois Lane and the Resistance', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Project Superman', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Reverse Flash', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Secret Seven', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: The Canterbury Cricket', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: The Outsider', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: The World of Flashpoint', 'Flashpoint', 'Optional', '', 2011],
  ['Flashpoint: Wonder Woman and the Furies', 'Flashpoint', 'Optional', '', 2011],

  // Modern event companions that were not captured by the previous title audit.
  ['Dark Days: The Forge', 'Dark Nights: Metal', 'Optional', 'Rebirth', 2017],
  ['Dark Days: The Casting', 'Dark Nights: Metal', 'Optional', 'Rebirth', 2017],
  ['Batman Lost', 'Dark Nights: Metal', 'Optional', 'Rebirth', 2017],
  ['Hawkman Found', 'Dark Nights: Metal', 'Optional', 'Rebirth', 2017],
  ['Batman: The Dawnbreaker', 'Dark Nights: Metal', 'Optional', 'Rebirth', 2017],
  ['Dark Knights Rising: The Wild Hunt', 'Dark Nights: Metal', 'Optional', 'Rebirth', 2018],
  ["DC's Year of the Villain Special", 'DC Universe', 'Optional', 'DC Universe', 2019],
  ['Year of the Villain', 'DC Universe', 'Recommended', 'DC Universe', 2019],
  ['Lazarus Planet', 'DC Universe', 'Recommended', 'Infinite Frontier', 2023],
  ['Titans: Beast World: Waller Rising', 'Teen Titans', 'Optional', 'Dawn of DC', 2023],
  ['DC K.O.: Green Lantern Galactic Slam', 'DC Universe', 'Optional', 'DC All In', 2026],
  ['DC K.O.: Boss Battle', 'DC Universe', 'Optional', 'DC All In', 2026]
];

const normalize = value => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const sortTitle = title => {
  if (/^the\s+/i.test(title)) return `${title.replace(/^the\s+/i, '')}, The`;
  return title;
};

const csv = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
const records = JSON.parse(fs.readFileSync(comicsPath, 'utf8'));
const originalCount = records.length;
let nextEventId = Math.max(0, ...records
  .map(record => /^EVT-(\d+)$/.exec(record.id))
  .filter(Boolean)
  .map(match => Number(match[1]))) + 1;

const audit = [];
for (const [title, parent, level, era, year] of candidates) {
  const key = normalize(title);
  const existing = records.find(record => record.publisher === 'DC' &&
    [record.display, record.series, record.printedTitle].some(value => normalize(value) === key));

  if (existing) {
    audit.push([title, year, 'Already present', existing.id, existing.type, existing.parent, existing.publishingEra || '']);
    continue;
  }

  const id = `EVT-${String(nextEventId++).padStart(5, '0')}`;
  const record = {
    id,
    display: title,
    parent,
    series: title,
    primary: false,
    publisher: 'DC',
    type: 'Event',
    level,
    sort: sortTitle(title),
    printedTitle: title
  };
  if (era) record.publishingEra = era;
  records.push(record);
  audit.push([title, year, 'Added', id, 'Event', parent, era]);
}

records.sort((a, b) => a.sort.localeCompare(b.sort, 'en', { sensitivity: 'base' }) || a.id.localeCompare(b.id));
fs.writeFileSync(comicsPath, `${JSON.stringify(records, null, 2)}\n`);

const header = ['Authority title', 'Year', 'Audit result', 'Authority ID', 'Type', 'Parent authority', 'Publishing era'];
fs.writeFileSync(auditPath, [header, ...audit].map(row => row.map(csv).join(',')).join('\n') + '\n');

const added = records.length - originalCount;
console.log(JSON.stringify({ originalCount, reviewed: candidates.length, added, finalCount: records.length }, null, 2));
