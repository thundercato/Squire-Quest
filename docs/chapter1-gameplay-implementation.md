# Chapter One Gameplay Implementation

This document records the current QuestJS implementation of the consolidated Chapter One design source. The three newer Chapter One maps remain authoritative for geography; the consolidated design source supplies puzzle sequence, character beats and interaction intent where it does not conflict with later locked decisions in `README.md`.

## Implemented progression

The current playable chain includes:

1. Opening Eastern Dock ship/crewman state and blocked reboarding.
2. Tourist Information leaflet and KFC voucher.
3. Turning/P.T.O. the leaflet to discover the troll/bell warning.
4. First KFC visit activating the Chicken Quest, removing the ship/crew from the Eastern Dock and spawning the fisherman.
5. Market clutter revealing the alley, kitchen-door interaction, climbing the dead-end crates and discovering rotten worm/maggot onions.
6. Fisherman bait conversation, onion exchange and fish bucket.
7. Fish-in-fountain sabotage, guard departure and gold coin.
8. Herbs/spices merchant and three-spice parcel for the chef.
9. Castle Kitchen access, fresh chicken and blunt knife.
10. Delivering chicken to KFC, voucher-controlled Fiery Fava Beans samples and BELLS 4U.
11. Bell acquisition, Western Gate safety check and troll rescue of the hooded Princess.
12. Tree/magpie nest, jewel-encrusted brooch and gold coin.
13. Old Man Emmett, dry river, waterfall/cliff/plateau route and Troll Chieftain Gorgul Thunderfist.
14. Bean sample response, bucket-of-beans launch and waterfall restoration.
15. Mill belt failure, knife sharpening, cliff vines, Cog House disengage/repair/re-engage sequence and flour production.
16. Flour delivery and WOOD 4U phase.
17. Commemorative camphor tree/plaque, Sir SoInSo tavern sequence, Scraps stealing the prosthetic arm, beggar hint, Wood 4U branch and dog trade.
18. Camphor delivery, final fried-chicken bucket and Main Keep entry.
19. Sir Arrogant room, tavern/hangover/joust cutscene and arrest.
20. Dungeon arrival, Princess/brooch interaction, sleep/Fire-Ra attack, loose-wall escape, femur/rags/water/vent-bar leverage puzzle, torch-in-mouth vent traversal, cave-spider hazards and waterfall escape.
21. Chapter One completion at the Old Mill with the route WEST into Chapter Two established narratively.

## Parser policy

Puzzle commands accept multiple natural verb/object phrasings rather than relying on one exact command. Common variants include TALK/SPEAK/CHAT, TAKE/GET/GRAB/PICK UP, GIVE/HAND/OFFER, LOOK/EXAMINE/INSPECT/SEARCH, CLIMB/ASCEND/GO UP, and USE-specific alternatives. A targeted parser preprocessor also normalises frequent misspellings and spacing variants such as `seagul`, `barrell`, `gang plank`, compass pairs such as `north west`, and Kamelot/Camelot/Kamalot spelling variants.

The parser remains deliberately conservative about completely unrelated misspellings so that it does not silently reinterpret an unintended command.

## Economy note

The consolidated material establishes three plot-significant gold coins: the fountain coin, magpie-nest coin and dropped KFC coin. To keep that finite economy solvable, one tavern coin purchases a continuing round sufficient to complete Sir SoInSo's drinking sequence. The other coins can therefore fund the herb parcel and Wood 4U branch.

## Source gaps deliberately not invented

The design material refers to a printed/manual recipe system with three randomly selected herbs/spices, but the currently available source does not define a complete random recipe table or matching physical-manual data. The prototype therefore represents the required recipe as a single correct `three-spice parcel`, matching the existing demonstration implementation pattern. This can be replaced by the full random/manual mechanic when the missing recipe data is supplied or explicitly designed.

Exact final dialogue, joke polishing, optional deaths/game-over presentation and alternate state artwork remain iterative content work. The main Chapter One puzzle chain itself is now represented in code.

## Artwork status

At the time of this gameplay pass, 24 of the 39 Chapter One room backgrounds exist in `assets/images/rooms/` and are mapped through `game/artwork-map.js`. Rooms without finished artwork retain the fixed blank 16:9 frame so the interface dimensions remain stable while artwork production continues.
