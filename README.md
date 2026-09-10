# hatzelu

A responsive, standalone MapleStory HEXA planner using the exported MapleScouter orders.

Live website: [hatzelu](https://darealshekel.github.io/hatzelu/)

## Open it

Open `index.html` in a browser. No build step or backend is required. For a local server, run:

```sh
python -m http.server 4173
```

Then visit `http://localhost:4173`.

To add it to your website, copy this entire directory to a static route such as `/hexa/`. Keep the relative file paths intact. Change the brand and navigation in `index.html`, and colors in `styles.css`.

## Included

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
- 632 local skill icons, with fallbacks. Google Fonts is optional; system fonts are used if unavailable.

## Files

- `index.html`: application layout.
- `styles.css`: responsive styles and theme variables.
- `app.js`: UI, state, local storage, and import/export.
- `engine.js`: cost and progression calculations, also usable from Node.js.
- `data.js`: the exported source orders, per-level cost tables, and class metadata.
- `assets/`: local skill icons.

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


