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
**Style:** Classic text-adventure logic with deliberately comic fantasy writing, sensory room descriptions and irreverent humour.

The game should retain the personality of the original material rather than sanitising it into generic fantasy prose.

## 3. Room Design Bible

### Dock

**Display name:** `The Dock`

**Description:**

> You stand on an old creaky wooden dock. The sound of waves crashing against it combined the strong smell of seaweed overwhelms your senses. The boat you arrived on has long since disappeared from the horizon. Looking NORTH you see the what you assume to be the Southern Gates of Castle Kamalot.

**Movement / cant_go:**

> All direction except NORTH would have you fall in to the water. Given this is just the start of your quest that would be a someone embarrassing end.

**Known navigation:** NORTH leads towards the Southern Gate.

---

### Southern_Gate

**Display name:** `The Southern Gate`

**Description:**

> The Southern Gate to Castle Kamalot is fully open to the NORTH, the gate chains are locked in place with a large padlock. The smell of horse manure coming from the EAST goes so far up your nose you can practically taste it. The ground is covered in straw and rotten vegetable flattened by the vast footfall that this entrance no doubt sees.^To the NORTH is a bustling Town Square full of brightly coloured stalls.

**Known navigation:** NORTH leads into the Town Square. The description establishes something horse-related to the EAST.

---

### Town_Sq_S

**Display name:** `The Town Square (South)`

**Description:**

> A market full of fine wares (and some not so fine) from around the globe surrounds you.

## 4. Content Preservation Rules

Room identifiers and display names are separate concepts. Internal identifiers such as `Southern_Gate` and `Town_Sq_S` should remain stable unless a deliberate migration is agreed.

Original wording should be treated as authored game content. Spelling, grammar or phrasing that appears unusual may be intentional or may require an explicit editorial decision. Do not automatically rewrite room prose during unrelated code changes.

Direction names written in capitals, such as `NORTH` and `EAST`, are part of the text-adventure presentation and should be preserved unless the design is deliberately changed.

The `^` appearing in source room text should be treated as meaningful legacy formatting until its intended rendering behaviour has been formally decided and implemented.

## 5. AI / ChatGPT Development Protocol

For every AI-assisted development task in this repository:

- Read `README.md` before proposing or applying project changes.
- Check whether the requested change affects established design-bible material.
- Prefer the smallest change that fulfils the request without collateral changes.
- Never invent a replacement design decision when an established rule is unclear.
- Preserve backwards compatibility with established room IDs and game data where reasonably possible.
- When a new decision becomes canonical, update the relevant section of this README in the same branch/commit or explicitly explain why it has not been updated.
- Commit messages should describe the actual change rather than vague labels such as `updates`.

## 6. Living Design Bible

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

## 7. Current Status

Repository initialised on 25 August 2026. This README contains the Squire Quest design material currently established in the project conversation and provides the baseline contract for future AI-assisted work.

As additional sections of the original *Dragons Slayer Design Bible* are recovered or supplied, they should be incorporated here without silently changing their authored meaning.
