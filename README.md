# 🐲 Squire Quest

> **PROJECT DESIGN BIBLE & AI DEVELOPMENT CONTRACT**
>
> This document is the canonical design reference for Squire Quest. Any AI-assisted development, review, commit, pull request, refactor, content addition or gameplay change must read and respect this document before making changes.

## 1. Golden Rule

**The design bible is authoritative.**

Before changing the project:

1. Read this README in full.
2. Preserve established room names, descriptions, directions, tone, jokes, world logic and gameplay rules.
3. Do not silently reinterpret established design decisions.
4. If implementation and this document conflict, flag the conflict rather than quietly changing the design.
5. When Adam locks in a new design decision, update this document as part of the same development change wherever practical.
6. A code change must not overwrite intentional content merely to make implementation easier.

## 2. Project Identity

**Project:** Squire Quest  
**World / source design:** *Dragons Slayer Design Bible*  
**Setting:** Castle Kamalot and its surrounding locations.  
**Engine target:** Quest 6.  
**Style:** Classic parser-driven text adventure with graphics, deliberately comic fantasy writing, sensory room descriptions and irreverent humour.

The game should retain the personality of the original material rather than sanitising it into generic fantasy prose.

### Core interaction rule

The parser should understand sensible natural variations of the same intent without every wording being manually authored. For example, commands such as `CLIMB WALL`, `CLIMB THE WALL`, `SCALE WALL` and similar phrasings should resolve to the same underlying action where appropriate. Likewise, visible scenery should respond sensibly to common examination and interaction verbs.

Artwork and parser world-state must agree. If an object is visibly present in the final room artwork, it must either be represented as interactable/scenery in the game or deliberately removed from the artwork. Avoid visible objects that produce an immersion-breaking `I can't see that here` response.

## 3. Opening Sequence and Dock Area

The dock is a broad **T-shaped structure** with three gameplay locations:

- **Eastern Dock**: starting screen and arrival point.
- **Main Dock**: central navigation/transition screen.
- **Western Dock**: fisherman location once the Chicken Quest has begun.

The opening should establish that visitors and cargo are arriving for the forthcoming games/festivities at Castle Kamalot.

### Eastern Dock

**Purpose:** Opening scene, initial narrative setup and temporary ship location.

#### Opening state

The player arrives by ship with **Sir Arrogant**, who is leading his horse. The gangplank is lowered and both come ashore. Sir Arrogant tells the player to obtain his **Camel Lot Fried Chicken** and bring it to the castle immediately. He then exits WEST towards the Main Dock and leaves the player in control.

The ship is the only ship at this dock. It is present for storytelling rather than as a playable destination.

Visible/background elements may include:

- the ship and gangplank
- sea and dock timbers
- crates, barrels, nets and cargo associated with unloading for the festivities
- seagulls and normal dock activity
- other unnamed crew members unloading cargo
- a prominent games/festivities banner or hanging sign helping establish why people and supplies are arriving

A **crewman with a clipboard** stands at or near the top of the gangplank and prevents the player from re-boarding. He is an officious, nerdy, regulation-quoting jobsworth. His humour should come primarily from attempts to board the ship or TALK TO him, rather than making every scenery interaction trigger a joke. Other unloading crew may occasionally correct his confidently incorrect regulation numbers or interpretations. Exact dialogue remains to be written later.

#### State change: Chicken Quest active

The ship remains present until the player has spoken to the relevant character at **Camel Lot Fried Chicken** and the Chicken Quest has formally activated.

At that point:

- the ship leaves
- the gangplank disappears with it
- the clipboard crewman and unloading crew leave
- the Eastern Dock becomes a quiet/mostly empty dock screen
- some crates, barrels or other harmless dock clutter may remain

A future puzzle/object may later be added to the post-ship Eastern Dock, but none is currently canonical.

### Main Dock

**Purpose:** Navigation and scale. No puzzle is required here.

The Main Dock connects EAST to the Eastern Dock and WEST to the Western Dock. Travelling NORTH leads inland towards the Southern Gate.

The dock reaches shore, transitioning from timber to sand/grass. A worn dirt path leads inland through trees/woodland. The distant upper parts of Castle Kamalot should be visible beyond or above the trees, deliberately far away so the player feels the physical scale of the journey and kingdom.

This screen should remain comparatively quiet and uncluttered. Its job is to provide atmosphere, orientation and distance rather than gameplay complexity.

#### Travel interlude to Southern Gate

Moving NORTH from the Main Dock should trigger a short travel interlude rather than an instantaneous room change. Presentation uses a parchment/manuscript-style full-screen card explaining that the player follows the woodland path for roughly twenty minutes before reaching the castle gate. The normal room interface is hidden during the interlude and the player continues by tapping/clicking or pressing Enter. The Southern Gate is then revealed.

Current interlude prose:

> You leave the docks behind and follow the well-worn path inland. For the next twenty minutes, woodland closes around you as the cries of the gulls fade into the distance. At last, the trees thin and the Southern Gate of Castle Kamalot rises ahead.

### Western Dock

**Purpose:** Fisherman location and later puzzle setup.

Before the Chicken Quest activates, the Western Dock has no fisherman and may simply be a quiet part of the dock.

Once the Chicken Quest activates, a fisherman appears in a consistent location at the end of the Western Dock. He is struggling to catch fish. He can be spoken to and later participates in the puzzle involving the rotten onions/worms or maggots.

Likely visible elements include the fisherman, fishing rod/line, bucket and normal dock scenery. Exact final art contents will be locked before batch art generation.

The fisherman's comedy should fit Squire Quest's broader nostalgia tone. Character-specific references, parody and wordplay can draw lightly on 1970s/1980s/1990s film, television and pop culture where it naturally lands. Possible fishing/phishing jokes have been discussed but no exact dialogue is canonical yet.

## 4. Southern Gate

**Display name:** `The Southern Gate`

The Southern Gate is the player's first major arrival at Castle Kamalot and should feel noticeably busier than the dock transition screens.

### Visual/world state

- A large castle entrance/portcullis-style gate dominates the scene.
- The kingdom is visibly preparing for the games/festivities.
- Banners, bunting or similar event decoration should make this immediately apparent.
- People, visitors, merchants or workers can be coming and going through the entrance, creating a bustling atmosphere.
- Looking through the open gateway should suggest further activity within and may reveal the **tourist information kiosk** that becomes relevant on the next screen.
- There is no gameplay route EAST or WEST from this screen. The route is fundamentally NORTH/SOUTH. Older source text about dense foliage can be represented visually if useful, but the design need not imply that the player is artificially fenced in by impenetrable vegetation.

### Beggar

A beggar sits off to one side of the gateway rather than directly in the main flow of traffic. Flies buzz around him. He remains distinct from the guard position and will be developed further when his interactions/puzzles are discussed.

### Guard: Biff

One guard is sufficient for the gate. His working name is **Biff**.

Biff has a comic personality inspired by the attitude and limited intelligence of Biff from *Back to the Future*, without simply reproducing copyrighted dialogue. He is not fundamentally hostile to the player, but he initially challenges the player's right to enter and can use a `butthead`-style insult/reference as a light nostalgic nod.

The player explains that they are Sir Arrogant's squire. This should lead to a short comic exchange before Biff allows passage. The player does **not** need to solve a substantial persuasion puzzle simply to enter at this point.

Exact dialogue remains to be written and polished later.

### Legacy source description

The original design-bible wording remains preserved here for reference:

> The Southern Gate to Castle Kamalot is fully open to the NORTH, the gate chains are locked in place with a large padlock. The smell of horse manure coming from the EAST goes so far up your nose you can practically taste it. The ground is covered in straw and rotten vegetable flattened by the vast footfall that this entrance no doubt sees.^To the NORTH is a bustling Town Square full of brightly coloured stalls.

**Known navigation:** NORTH leads into the Town Square.

---

## 5. Town_Sq_S

**Display name:** `The Town Square (South)`

**Description:**

> A market full of fine wares (and some not so fine) from around the globe surrounds you.

Further Town Square design has not yet been locked during the current room-by-room pass.

## 6. Humour and Reference Rules

Squire Quest may use nostalgia, parody, genre references and recognisable cultural echoes, particularly from 1970s, 1980s and 1990s film, television and games.

References should:

- suit the character or situation rather than being scattered randomly
- usually be occasional punches rather than every line being a gag
- remain transformed/parodic rather than simply copying long copyrighted quotes
- preserve each recurring character's own comic identity

Current examples under development include the regulation-obsessed ship crewman, the fisherman, Biff at the Southern Gate and Old Man Emmett at the mill.

## 7. User Interface and Presentation

The graphical text-adventure interface should behave as a fixed game frame rather than an endlessly growing web page.

- The overall page uses a warm aged-paper/parchment colour treatment rather than a plain white background.
- Each room name is displayed above its artwork using a medieval/manuscript-style display font. The first letter is enlarged/decorative in the manner of an illuminated manuscript heading.
- The first letter of each room description also uses an illuminated-manuscript treatment with a larger contrasting initial.
- Room artwork sits in a consistent-height framed area with a restrained medieval dark-wood/gold border supplied by the interface rather than baked into individual image assets.
- Artwork must never be stretched. Different source aspect ratios may be contained inside the consistent frame while preserving their proportions.
- The upper room-name/artwork area remains visible while playing.
- The text/history/parser area below is a separate flexible pane occupying the remaining viewport height. It is visually styled as a parchment scroll with mottled paper and rolled-looking top/bottom edges. Command history scrolls inside that pane rather than pushing the artwork off-screen.
- The command input remains at the bottom of the text pane.
- Room artwork uses a roughly half-second fade transition during room changes so transitions feel deliberate without slowing play.
- The desktop game frame is deliberately wider than the initial prototype while continuing to scale responsively on phones and smaller displays.
- The main `Squire Quest I: The Dragon Slayer` branding appears on the opening title presentation rather than remaining permanently above every room.
- The opening presentation identifies **Chapter 1: Gimme Gimme Gimme Fried Chicken!** and continues by tap/click or Enter.
- Travel/cutscene interludes may temporarily replace the normal room interface with a full-screen parchment/manuscript presentation and require a tap/click or Enter to continue.
- A simulated retro disk-drive loading sound is a possible future polish feature, but no sound asset or behaviour is currently locked.

### Development cache policy

While the game is under active development, every fresh page load must assume that local game assets may have changed. The browser build therefore appends a unique per-load cache-busting token to local game JavaScript, CSS and room artwork URLs. This is intentionally development-oriented behaviour so artwork and interface changes appear without users having to clear their browser cache manually. It can be removed or replaced with normal versioned caching for a production release.

## 8. Content Preservation Rules

Room identifiers and display names are separate concepts. Internal identifiers should remain stable unless a deliberate migration is agreed.

Original wording should be treated as authored game content. Spelling, grammar or phrasing that appears unusual may be intentional or may require an explicit editorial decision. Do not automatically rewrite room prose during unrelated code changes.

Direction names written in capitals, such as `NORTH` and `EAST`, are part of the text-adventure presentation and should be preserved unless the design is deliberately changed.

The `^` appearing in source room text should be treated as meaningful legacy formatting until its intended rendering behaviour has been formally decided and implemented.

## 9. AI / ChatGPT Development Protocol

For every AI-assisted development task in this repository:

- Read `README.md` before proposing or applying project changes.
- Check whether the requested change affects established design-bible material.
- Prefer the smallest change that fulfils the request without collateral changes.
- Never invent a replacement design decision when an established rule is unclear.
- Preserve backwards compatibility with established room IDs and game data where reasonably possible.
- When a new decision becomes canonical, update the relevant section of this README in the same branch/commit or explicitly explain why it has not been updated.
- Commit messages should describe the actual change rather than vague labels such as `updates`.

## 10. Living Design Bible

This README is intended to evolve alongside Squire Quest. New confirmed material should be added under appropriate sections, including:

- rooms and navigation
- objects and inventory
- characters and dialogue
- puzzles and solutions
- parser / command behaviour
- game-state rules
- UI and presentation rules
- humour, writing and tone rules
- technical architecture decisions that future development must preserve

**Do not treat speculative discussion as canonical.** Only decisions that Adam explicitly confirms or locks in should be promoted into the design bible.

## 11. Current Status

Repository initialised on 25 August 2026. Opening design pass locks the Eastern Dock, Main Dock, Western Dock and first-pass Southern Gate presentation/state logic. The first graphical QuestJS prototype is published through GitHub Pages. The parchment fixed-frame interface, room-title treatment, Chapter 1 title presentation, artwork fades, Main Dock-to-Southern Gate travel interlude and development cache-busting behaviour are now locked. Town Square and later rooms remain to be reviewed room-by-room.
