# HEXA damage and stat estimates

The damage layer is an offline snapshot of MapleScouter's public manual calculator, collected on 19 September 2026 using the existing synthetic reference presets in `reference-profiles/`. No player data is used. It is separate from the September 11 order export. Source formula changes can change the recalculated reference score.

## Coverage

Reference efficiencies and refreshed General orders: Adele, Angelic Buster, Aran, Ren.
Kaling orders for both limiting resources: Adele, Angelic Buster, Ren.
Aran currently has the Kaling Fragment order only.
Other classes retain their existing General orders. Their stat editor supports custom marginal efficiencies, but no reference FD is invented for them. MapleScouter rate-limited further collection; incomplete combinations are disabled and labeled in the interface.

## Upgrade FD

The source `class_hexa` rows contain a reference FD efficiency per 30 fragments in column 7, the milestone's fragment cost in column 4, and its level interval in column 10. Approximate FD is `efficiency × fragments / 30`, in percent. The source efficiency is rounded, so this is not an exact measurement. The source's web tooltip converts the same field into FD per meso budget using the configured fragment price.

The interface displays FD only when a source row matches the exact next skill level, in the selected boss and resource path. This appears above Material Owned. Multi-level source gains are never shown as single-level gains or divided across levels. A missing match displays an explicit unavailable value. HEXA Stat completion markers have no single-skill-level FD. Milestone dialogs likewise omit grouped FD.

Column 8 is a cumulative damage ratio used for the source's converted-score display; it is not a per-upgrade FD percentage. It is deliberately not summed or treated as FD, and no linear interpolation between grouped milestone levels is used. Changing the user's other levels does not recompute this reference efficiency. Enhance continues to charge and apply exactly one skill level.

Kaling is the source's `cycle: "1"`; General is `cycle: "3"`. Both use reset-start orders, the preset's class-specific calculated efficiencies, and Mercedes build type 1. Third-skill filtering retains source order; it is not a new optimization for a different patch.

## Stat model

HEXA Stats are saved separately from the matrix's completion markers. Each active node has three distinct stat selections, each line is 0–10, and a node's levels total at most 20. Main-line stat choices must be unique across active nodes; an additional stat can appear at most twice. A main line uses weights `[0,1,2,3,4,6,8,10,13,16,20]`, and additional lines use their level directly.

Per weight: ATT/MATT 5; flat main stat 100 (Xenon 48 flat all stats; Demon Avenger 2,100 flat HP); boss damage 1%; damage 0.75%; critical damage 0.35%; IED 1%.

The FD model uses the reference calculator's marginal efficiencies before these HEXA stats. Damage and boss damage share an additive factor. Attack, flat stat, critical damage and defense each form separate factors that are multiplied together. IED lines combine as `1 − product(1 − lineIED)`. The defense efficiency uses the explicit 380% PDR field. Xenon's flat-stat coefficient sums all three stat efficiencies. Custom inputs use the same model and specify marginal FD percentages, including the denominator for flat-stat units. A 100% critical rate is assumed.

Recommendations exhaustively search valid assignments for the supplied rolls with an upper-bound pruning optimization. They do not reroll levels, estimate reroll cost, spend materials, or alter skill order. This is a marginal-stat estimate; it does not simulate gear interactions, rotations or class-specific nonlinear breakpoints.

Sources: [MapleScouter](https://maplescouter.com/en/hexa), [official MapleSEA HEXA Stat overview](https://www.maplesea.com/newage/6th/), [HEXA Stat level table](https://maplestorywiki.net/w/6th_Job#HEXA_Stats).

## Verification

Run `node tests/engine.test.cjs`, `node tests/hexa-damage.test.cjs`, and `node tests/level-damage.test.cjs` from the repository root. These verify stat scaling, IED composition, custom efficiency units, valid assignments, an independent exhaustive optimizer comparison, saved-state compatibility, all 432 class/resource/boss/third-node planning combinations, and exclusion of grouped FD. `tests/browser-damage.js` verifies the stat UI against a local preview on port 4181 using Playwright CLI. `tests/browser-level-panel.js` checks FD placement and matrix-panel alignment at five viewport widths.
