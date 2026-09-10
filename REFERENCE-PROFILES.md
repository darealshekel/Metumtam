# Estimated 80–85k reference profiles

These are synthetic reference profiles targeting 82,500 **Normal Power under Boss 380**, at character level 286. Every displayed score was observed in MapleScouter’s public manual calculator. Scores ranged from 82,368 to 82,590 at collection on September 11, 2026. These are not typical equipment builds or personalized optimal orders.

## Method

- Use MapleScouter’s public preset import and manual stat calculator. Set all HEXA inputs and HEXA Stats to zero.
- Change the class and independently adjust base attack until the calculated Boss 380 Normal score is within 150 points of 82,500.
- Keep a fixed assumed stat balance: 120% damage, 544% boss damage, 97.2644% IED, 132.9% critical damage, 129% attack, 5 seconds plus 6% cooldown reduction. Other assumed buffs, links, and ring settings are retained in the input files.
- Standard main-stat inputs: base 7,812, 784%, flat 28,770. Secondary stats where applicable: base 4,388, 205%, flat 710. Demon Avenger uses HP base 40,000, 400%, flat 28,770. Xenon uses base 5,500 and 500% for all three stats, with 28,770 flat on the primary stat.
- Use the source’s standard general-boss cycle. Mercedes uses Full Chain without Surge.
- Collect both Piece and Erda orders from the public HEXA interface, starting after reset, and expand every grouped milestone. Preserve the source order and its multi-level jumps.
- Retain the existing source-region split: KMS for 48 classes; GMS for Erel, Hayato, Kanna, Lynn, Mo Xuan, and Sia. This allows the full-node reference where supplied by the source. It is not a guarantee of current GMS skill availability.

## Limits

The 380% PDR value identifies the **Normal score used for calibration**. Orders use MapleScouter’s standard general-boss calculation; we do not claim to override a separate hidden PDR setting in its HEXA optimizer. Changing the assumed stat balance can change the order even at the same Normal score. Base attack is a synthetic calibration input, not an equipment recommendation.

The downloadable files use MapleScouter’s supported manual-preset format. They retain the assumed preset data and calibrated inputs; derived fields are recalculated by the source calculator. A future source version may produce a different score or order. Select the listed source region when reproducing a profile.

Your saved node levels and goals are preserved. They skip reached milestones and update costs. They do not change the assumed stats or rerun damage optimization. The third-skill toggle only filters the full reference order; it does not independently optimize an older patch.

## Verified profiles

| Class | Boss 380 Normal | Base ATT/MATT | Input preset |
|---|---:|---:|---|
| Adele | 82,498 | 1,848 | [JSON](reference-profiles/adele.json) |
| Angelic Buster | 82,501 | 1,959 | [JSON](reference-profiles/angelic_buster.json) |
| Aran | 82,503 | 1,958 | [JSON](reference-profiles/aran.json) |
| Arch Mage (Fire, Poison) | 82,504 | 2,155 | [JSON](reference-profiles/arch_mage_fire_poison.json) |
| Arch Mage (Ice, Lightning) | 82,499 | 2,227 | [JSON](reference-profiles/arch_mage_ice_lightning.json) |
| Ark | 82,510 | 1,713 | [JSON](reference-profiles/ark.json) |
| Battle Mage | 82,501 | 2,312 | [JSON](reference-profiles/battle_mage.json) |
| Bishop | 82,501 | 2,162 | [JSON](reference-profiles/bishop.json) |
| Blaster | 82,539 | 1,770 | [JSON](reference-profiles/blaster.json) |
| Blaze Wizard | 82,494 | 2,019 | [JSON](reference-profiles/blaze_wizard.json) |
| Bowmaster | 82,515 | 1,950 | [JSON](reference-profiles/bowmaster.json) |
| Buccaneer | 82,513 | 1,904 | [JSON](reference-profiles/buccaneer.json) |
| Cadena | 82,495 | 1,971 | [JSON](reference-profiles/cadena.json) |
| Cannoneer | 82,506 | 1,928 | [JSON](reference-profiles/cannoneer.json) |
| Corsair | 82,451 | 2,073 | [JSON](reference-profiles/corsair.json) |
| Dark Knight | 82,512 | 1,928 | [JSON](reference-profiles/dark_knight.json) |
| Dawn Warrior | 82,508 | 1,967 | [JSON](reference-profiles/dawn_warrior.json) |
| Demon Avenger | 82,590 | 19,525 | [JSON](reference-profiles/demon_avenger.json) |
| Demon Slayer | 82,513 | 1,960 | [JSON](reference-profiles/demon_slayer.json) |
| Dual Blade | 82,504 | 2,042 | [JSON](reference-profiles/dual_blade.json) |
| Erel | 82,509 | 1,970 | [JSON](reference-profiles/erel.json) |
| Evan | 82,514 | 2,371 | [JSON](reference-profiles/evan.json) |
| Hayato | 82,507 | 2,050 | [JSON](reference-profiles/hayato.json) |
| Hero | 82,524 | 1,821 | [JSON](reference-profiles/hero.json) |
| Hoyoung | 82,368 | 2,049 | [JSON](reference-profiles/hoyoung.json) |
| Illium | 82,446 | 2,041 | [JSON](reference-profiles/illium.json) |
| Kain | 82,503 | 1,988 | [JSON](reference-profiles/kain.json) |
| Kaiser | 82,506 | 2,206 | [JSON](reference-profiles/kaiser.json) |
| Kanna | 82,507 | 2,237 | [JSON](reference-profiles/kanna.json) |
| Khali | 82,368 | 1,979 | [JSON](reference-profiles/khali.json) |
| Kinesis | 82,553 | 2,120 | [JSON](reference-profiles/kinesis.json) |
| Lara | 82,507 | 1,954 | [JSON](reference-profiles/lara.json) |
| Lethe | 82,510 | 1,937 | [JSON](reference-profiles/lethe.json) |
| Luminous | 82,505 | 1,948 | [JSON](reference-profiles/luminous.json) |
| Lynn | 82,498 | 2,193 | [JSON](reference-profiles/lynn.json) |
| Marksman | 82,516 | 1,907 | [JSON](reference-profiles/marksman.json) |
| Mechanic | 82,568 | 1,637 | [JSON](reference-profiles/mechanic.json) |
| Mercedes | 82,428 | 2,100 | [JSON](reference-profiles/mercedes.json) |
| Mihile | 82,503 | 1,959 | [JSON](reference-profiles/mihile.json) |
| Mo Xuan | 82,504 | 1,979 | [JSON](reference-profiles/mo_xuan.json) |
| Night Lord | 82,540 | 1,750 | [JSON](reference-profiles/night_lord.json) |
| Night Walker | 82,515 | 1,802 | [JSON](reference-profiles/night_walker.json) |
| Paladin | 82,564 | 1,689 | [JSON](reference-profiles/paladin.json) |
| Pathfinder | 82,504 | 1,910 | [JSON](reference-profiles/pathfinder.json) |
| Phantom | 82,517 | 1,852 | [JSON](reference-profiles/phantom.json) |
| Ren | 82,555 | 1,771 | [JSON](reference-profiles/ren.json) |
| Shade | 82,506 | 1,972 | [JSON](reference-profiles/shade.json) |
| Shadower | 82,493 | 2,013 | [JSON](reference-profiles/shadower.json) |
| Sia | 82,499 | 2,184 | [JSON](reference-profiles/sia.json) |
| Thunder Breaker | 82,510 | 1,951 | [JSON](reference-profiles/thunder_breaker.json) |
| Wild Hunter | 82,509 | 2,013 | [JSON](reference-profiles/wild_hunter.json) |
| Wind Archer | 82,501 | 2,193 | [JSON](reference-profiles/wind_archer.json) |
| Xenon | 82,446 | 2,046 | [JSON](reference-profiles/xenon.json) |
| Zero | 82,538 | 1,799 | [JSON](reference-profiles/zero.json) |

Source: [MapleScouter manual calculator](https://maplescouter.com/en/input) and [HEXA calculator](https://maplescouter.com/en/hexa). [Calibration report](reference-profiles/calibration-report.json).
