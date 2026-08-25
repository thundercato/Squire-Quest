# Chapter One Artwork Manifest

This manifest is the canonical asset order for the Chapter One visual-production pass.

## Global artwork rules

- Every room background is 1280x720 PNG, 16:9.
- Match the established four-room visual style unless a later explicit art direction overrides it.
- Do not bake UI, room names, parser text or borders into room artwork.
- Do not invent prominent objects without reporting them.
- Preserve the geography and named objects in `game/data.js` and `README.md`.
- Existing artwork must not be regenerated unless explicitly requested.
- Generated files belong in `assets/images/rooms/`.

## Batch 1 - Castle/Docks A (10)

1. **Eastern Dock** - `eastern-dock-initial.png` - EXISTING, DO NOT REGENERATE.
2. **Main Dock** - `main-dock.png` - EXISTING, DO NOT REGENERATE.
3. **Western Dock** - `western-dock.png` - EXISTING, DO NOT REGENERATE.
4. **The Southern Gate** - `southern-gate.png` - EXISTING, DO NOT REGENERATE.
5. **Tourist Information** - `tourist-information.png` - busy southern castle courtyard, information booth, abandoned wooden cart, hints of fountain north, tavern west and shops east.
6. **Castle Fountain** - `castle-fountain.png` - grand white-limestone fountain, heroic knight statue, visible coins, fountain guard, castle courtyard routes around it.
7. **Commemorative Tree** - `commemorative-tree.png` - rare camphor tree beside northern castle wall, memorial plaque, dignified old-battle atmosphere.
8. **Main Keep Entrance** - `main-keep-entrance.png` - enormous arched wooden keep doors, guard, imposing inner-castle architecture.
9. **Knights Room** - `knights-room.png` - private knight chamber, large bed, table, medieval personal clutter, no explicit story event underway.
10. **Eastern Gate (Inside)** - `eastern-gate-inside.png` - inner eastern gate, guard, routes visually suggesting fountain west, keep north and shop district south.

## Batch 2 - Castle/Docks B (10)

11. **KFC & 4U Shops (Outside)** - `kfc-4u-outside.png` - Kamalot Fried Chicken shopfront beside adaptable 4U premises, medieval parody retail street, avoid modern branding exact copies.
12. **Kamalot Fried Chicken** - `kfc-inside.png` - medieval fried-chicken counter, server, cooking area and Fiery Fava Beans sample station.
13. **4U Shops** - `four-u-inside.png` - flexible medieval retail interior, Stan behind/among merchandise, state-neutral enough to support later Chicken/Bells/Wood variants.
14. **Western Gate (Inside)** - `western-gate-inside.png` - guarded western inner gate facing forest route, castle courtyard behind.
15. **The Dragons Maw (Outside)** - `dragons-maw-outside.png` - very old timber tavern, dragon-head sign with open jaws, castle street/courtyard context.
16. **The Dragons Maw** - `dragons-maw-inside.png` - smoky medieval tavern, heavy beams, hearth fire, barrels, old knight, dog Scraps, patrons.
17. **Market** - `market.png` - bustling castle market, fruit/meat/herbs/spices stalls, herb merchant, crates/barrels partially masking alley route.
18. **Alleyway** - `alleyway.png` - dark narrow alley behind market, rats, kitchen door, routes to dead end and kitchen.
19. **Alleyway Dead End** - `alleyway-dead-end.png` - stacked crates beneath castle-kitchen window, cramped dead-end masonry.
20. **Castle Kitchen** - `castle-kitchen.png` - frantic castle kitchen, stout chef, pots/chopping boards, onions, fresh chicken, blunt knife, busy banquet preparation.

## Batch 3 - Forest/Waterfall/Mill (10)

21. **Western Gate (Outside)** - `western-gate-outside.png` - exterior western castle wall meeting dense forest, road/path west.
22. **Forest Path** - `forest-path.png` - simple dense woodland trail linking castle and crossroads.
23. **Forest Crossroads** - `forest-crossroads.png` - obvious branching paths north/south/east with deeper forbidden-looking forest west.
24. **Forest Clearing** - `forest-clearing.png` - broad secluded clearing, enough open space for later troll/princess encounter, no mandatory characters in base art.
25. **Old Mill (Outside)** - `old-mill-outside.png` - old riverside watermill with large wooden waterwheel, forest surroundings.
26. **Old Mill** - `old-mill-inside.png` - dusty mill interior, Old Man Emmett, sacks/flour, mill stone and water-powered machinery.
27. **Cog House** - `cog-house.png` - cramped room dominated by huge wooden cogs, belts/shafts and obvious disengage lever.
28. **Tree** - `forest-tree.png` - large climbable forest tree, magpie present, path north/south.
29. **Top of Tree (Long Branch)** - `tree-top.png` - high precarious long branch and magpie nest, strong sense of height.
30. **Waterfall** - `waterfall.png` - forest waterfall/rock face, visible rounded opening high in rocks, route behind falls.

## Batch 4 - Forest End + Dungeon (9)

31. **Cliffs** - `cliffs.png` - wet climbable cliffs behind waterfall, ledge and strong hanging vines.
32. **Plateau** - `plateau.png` - broad high plateau overlooking forest/waterfall landscape.
33. **Top of Waterfall** - `top-of-waterfall.png` - upper river approaching cliff edge, space for later troll chieftain blockage.
34. **Dungeon Cell I** - `dungeon-cell-1.png` - miserable stone cell, straw bed, dripping water, barred vent, torch and loose west-wall stonework.
35. **Dungeon Cell II** - `dungeon-cell-2.png` - neighbouring cell, old clothing rags, chained skeleton, rat hole and femur bone.
36. **Inside Vent Shaft** - `inside-vent-shaft.png` - tight damp crawlspace immediately above dungeon, cobwebs, claustrophobic darkness.
37. **Vent Shaft** - `vent-shaft.png` - deeper narrow shaft, thicker cobwebs and visual suggestion of louder rushing water ahead.
38. **Large Cavern** - `large-cavern.png` - natural cavern, stalagmites, enormous web strands, large cave spider and iron rungs climbing upward.
39. **Vent Shaft Exit** - `vent-shaft-exit.png` - top of vertical shaft, rounded exit opening covered by fast rushing water.

## Progress accounting

- Total Chapter One room screens: **39**
- Existing completed screens at manifest creation: **4**
- New screens requiring generation: **35**
- Batch completion sizes when processing the full manifest in order: **10 / 10 / 10 / 9**, counting the four existing images as already complete in Batch 1.
