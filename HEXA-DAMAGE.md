# Single-level FD references

The stat-planning UI has been removed. Existing matrix levels, goals, materials and HEXA Stat completion markers remain. The old saved stat-roll field is retained for storage compatibility but has no effect on upgrade order.

## Display and lookup

The FD box sits above Material Owned beside the matrix. It describes exactly one skill level. It never divides a multi-level milestone gain, displays grouped FD, or borrows Kaling FD for General bosses.

The lookup prefers a separately calculated before/after damage pair. Otherwise it uses an exact single-level source row from the selected boss/resource reference. If that resource path groups the level, an exact single-level row from the other resource path for the same boss may be used, with its origin labeled. This does not change the selected order or upgrade costs. All results are reference estimates: the user's other stats and node levels can change the actual gain.

## Separately calculated Ren levels

`level-damage-data.js` contains MapleScouter `calculatedHexaDamage_380` results for Wish Unending (masteryCore3), levels 19 through 30. Each request uses the same public synthetic `reference-profiles/ren.json` stats. Other node levels are fixed at the General Fragment reference immediately before its grouped 19-to-25 upgrade. Only masteryCore3 changes between requests. The baseline node levels and source values are stored with the snapshot.

For each single level: `FD percent = (damageAfter / damageBefore - 1) * 100`.

The 19-to-20 comparison is 1,192,569,661.7218194 to 1,195,680,967.5052204, giving approximately 0.260891% FD. Every subsequent level through 30 has its own calculator observation; no interpolation is used. These General bosses results are usable with either limiting-resource order but do not substitute for Kaling results.

## Other snapshot data

`damage-data.js` retains the September 19, 2026 public manual-calculator snapshot using synthetic reference presets. Reference efficiencies and refreshed General orders cover Adele, Angelic Buster, Aran and Ren. Both Kaling resource orders cover Adele, Angelic Buster and Ren; Aran has its Kaling Fragment order. Other classes retain their September 11 General orders. Missing per-level data is explicitly unavailable, never shown as zero.

The source `class_hexa` column 7 is FD efficiency per 30 fragments. Approximate source-step FD is `column7 * column4 / 30`, where column4 is the whole step's fragment cost. It can be displayed for one level only when column10's interval matches that exact level. The source efficiency is rounded. Column8 is a cumulative damage ratio and is not added as FD.

Kaling is source `cycle: "1"`; General is `cycle: "3"`. Third-skill filtering keeps the source ordering rather than reoptimizing a different patch. [Reference assumptions](REFERENCE-PROFILES.md) and [MapleScouter calculator](https://maplescouter.com/en/input).

## Validation

Run `node tests/engine.test.cjs`, `node tests/hexa-damage.test.cjs`, and `node tests/level-damage.test.cjs`. Browser checks against a local preview at port 4181 are in `tests/browser-general-fd.js` and `tests/browser-level-panel.js`. They verify General resource switching, removed stat planning, exact-level FD, saved levels, one-level costs and responsive alignment.
