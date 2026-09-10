# hatzelu

A responsive MapleStory HEXA planner with a game-style matrix and exported MapleScouter orders.

Hover a skill for a compact MapleStory Wiki preview. It never intercepts pointer input and disappears immediately when the pointer leaves the skill. The HEXA Order strip shares its skill colors with View full order. Enhance Node replaces the separate Next upgrade panel: it always displays the first remaining order milestone, its complete target-level description, and its costs. Enhance advances that milestone even with no owned materials. Optional material balances decrease to a minimum of zero; Undo restores the level and both balances. Sol Erda ownership is saved per class (0–20), and fragments share the existing forecast inventory. Older exports default Sol Erda ownership to zero. In preview mode, the button returns to saved progression without changing levels or spending materials. Sol Janus is tracked manually outside the damage order.

The Skill description button, skill-list icons, and milestone details also open complete descriptions with keyboard and phone access. Related mastery skills are grouped together. Third common and third skill nodes, plus unmatched wiki entries, show an explicit unavailable state. See [skill data attribution and coverage](SKILL-DATA-NOTICE.md).

Live website: [hatzelu](https://darealshekel.github.io/hatzelu/)

## Open it

Open `index.html` in a browser. No build step or backend is required. For a local server, run:

```sh
python -m http.server 4173
```

Then visit `http://localhost:4173`.

To add it to your website, copy this entire directory to a static route such as `/hexa/`. Keep the relative file paths intact. Change the brand and navigation in `index.html`, and colors in `styles.css`.

## Included

- Interactive class-specific HEXA matrix arranged like the supplied in-game reference.
- Gray icons for locked nodes, colored unlocked nodes, level badges, and click-to-edit current/target levels.
- Upgrade roadmap directly above the matrix, with the next node outlined in purple and pulsing every second.
- Reduced-motion preferences keep the purple highlight steady.
- Sol Janus level tracking saved per class, separate from damage-order costs and forecasts.
- Expandable bulk level editor, with existing reset, import, and export controls.

- Searchable library with orders for all 54 source-listed classes.
- Separate Erda Fragment Limited (10,763 milestones) and Sol Erda Limited (4,830 milestones) source orders.
- Third skill core toggle, excluded by default for the requested GMS setup. Hidden levels stay saved.
- Current levels and target levels, with exact per-level fragment and Sol Erda costs.
- Next upgrade, mark upgraded, undo, and full upgrade order.
- Per-class progress saved in local storage.
- Read-only class preview, separate from saved progress.
- Daily/weekly fragment forecast and inventory.
- Validated JSON plan import/export.
- Responsive class drawer, keyboard controls, and reduced-motion support.
- 633 local skill icons, with fallbacks. Google Fonts is optional; system fonts are used if unavailable.

## Files

- `index.html`: application layout.
- `styles.css`: responsive styles and theme variables.
- `app.js`: UI, state, local storage, and import/export.
- `engine.js`: cost and progression calculations, also usable from Node.js.
- `matrix.js`: fixed matrix slots, class icons, locked states, stat dock, and node selection.
- `matrix.css`: matrix styling, responsive layout, and reduced-motion-aware highlights.
- `data.js`: the exported source orders, per-level cost tables, and class metadata.
- `assets/`: local skill icons.
- `translations/nexon-v271-common-nodes.json`: official third common-node names and class mappings from Nexon’s v.271 patch notes.

## Data scope

Snapshot: September 10, 2026. Source: https://maplescouter.com/en/hexa

Orders use either fragment efficiency or Sol Erda efficiency, reset starting levels, the general-boss cycle, and the source's built-in reference stats. The same reference efficiency values were used across classes. Each mode is a separate source response, with its original milestones preserved. This planner skips reached milestones and recalculates costs; it does not recompute character-specific damage optimization. No power-band selector is shown because each resource mode contains one reference order per class.

The third skill core (`skillCore3`) is excluded by default. This removes its steps from the roadmap and its costs from totals, progress, and forecasts. Its saved levels and goals are retained. Other milestones keep their relative order: this is a filtered source order, not an independently optimized pre-third-core GMS order. The toggle does not claim to validate all other skills against a particular region's patch.

Resource mode and third-core visibility are saved across classes and reloads, and included in exported plans. Older version 1 plan exports without these settings remain compatible and keep the current settings on import.

Hayato, Lynn, Mo Xuan, Kanna, Sia, and Erel have orders in both resource modes. Their requests require userStat.isGMS=true; the earlier empty responses were caused by submitting the bundled KMS profile flags. Those six now use GMS flags, while the original 48 snapshots retain their KMS flags. Each data.js class records profileRegion. These six source orders do not contain a third skill core, so that toggle is disabled for them. Source skills may be ahead of your region's game patch. English skill labels are provided where a matching label was available in the inspected MapleHub class mapping; the original Korean name remains in the tooltip and milestone details.

Skill costs were checked against every exported milestone. HEXA Stat costs retain the source's assumptions. Free initial unlocks are excluded. Sol Janus is not included in the exported damage progression.

The source snapshot and game assets keep their original ownership; no ownership of third-party data or icons is implied.

## Validation performed

All 15,593 source milestones across both modes matched the cost engine. All 54 classes have distinct resource orders. 3,672 combinations of resource mode, third-core visibility, current levels, and goals passed total-cost consistency checks. Complete, zero-income, and inventory-covered forecast states were checked. Desktop and 390px mobile layouts were inspected. Browser flows verified mode switching, third-core exclusion, hidden-level retention across reloads, upgrading, undo, typed-level persistence, class-preview isolation, class switching, unavailable classes, reset, full orders, import, and export.



Third common-node labels use the [official Nexon v.271 table](https://www.nexon.com/maplestory/news/update/44597/updated-9-10-v-271-maple-story-x-frieren-beyond-journey-s-end-patch-notes#HEXASkill3rdCommonNode). The mapping covers 51 listed classes and updates the 47 that have this node in the exported orders. Names for Lynn, Mo Xuan, Kanna, and Hayato are retained in the translation catalog, but no absent upgrade milestones are invented. Lethe is not listed and keeps its original Korean name. Nexon’s table currently spells the Demon node “HEXA Defender of the DemonI”; that source spelling is preserved.

Matrix validation: all active source cores were represented across 216 class/mode/third-core combinations. Each unfinished plan has one next-upgrade highlight. Sol Janus persistence and compatibility with older exports were checked, without changing damage costs. Browser checks covered node unlocking, the one-second pulse, level persistence, upgrading/undo, preview isolation, and 320px, 390px, 820px, and desktop layouts without horizontal page overflow.

View full order opens a responsive icon progression grid for every class. Tiles show target levels or MAX, with distinct HEXA Stat I/II/III labels and row continuation arrows. Selecting a tile opens its milestone costs. The grid uses the current plan, resource mode, and third-core setting. Validation covered 432 class/mode/filter/progress scenarios and 41,232 rendered milestones, plus desktop, 320px, 390px, and 820px browser layouts and tile details.

Matrix levels can be edited directly above each available skill icon. Current and goal fields replace their selected value on typing, remove leading zeros, and preserve the input and caret while the roadmap updates. Enter or leaving an empty field commits the minimum valid level. Values remain capped at the skill maximum. The matrix uses up to 720px normally and 800px on wide screens, with responsive phone sizing. Validation covered 216 class/filter/preview input scenarios, existing cost checks, slow two-digit entry, leading zeros, maximum levels, keyboard clearing, Janus persistence, preview protection, and 320px/390px browser layouts.
