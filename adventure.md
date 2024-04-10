---
title: Dungeon Press Adventure
titleShort: Dungeon Press Adventure
tagline: An adventure created with Dungeon Press
description: An adventure created with Dungeon Press
summary: >
    Dungeon Press is a static site generator that leverages the simplicity and flexibility of Markdown to create interactive tabletop adventures with a clean, minimalistic design. It's designed to cater to both creators and players by offering advanced formatting features, dynamic content adjustment, and easy publishing options.
version: 1.0.0
author: Two-Cat Moon
authorLink: https://www.dungeonpress.com
tags: dnd5e, adventure
created: 2024-01-01
modified: 2024-01-01
seed: dungeonpress
credits:
    - name: Jordan Ranson
      role: Developer & Designer
      link: https://www.jordanranson.com
---

# Welcome to Dungeon Press

Thank you for embarking on an adventure with Dungeon Press, where your creativity brings to life tales of courage, mystery, and magic. Whether you're a seasoned dungeon master or a newcomer to tabletop storytelling, this guide is your first step towards crafting memorable experiences for your players. 

## Getting Started
:: **Familiarize yourself with Markdown syntax** :: Dungeon Press utilizes Markdown for all adventure creation. A quick guide is provided under the <a href="#markdown-features">Markdown Features</a> section.
:: **Explore example blocks** :: Check out the pre-defined blocks like 'thing', 'narrative', and 'info' to understand how to structure your adventure's content.
:: **Customize your adventure** :: Use the dynamic content features, such as dice rolls and difficulty checks, to tailor challenges to your players' levels.
:: **Preview your adventure** :: Utilize Dungeon Press's live preview feature to see how your adventure will appear to players and make real-time adjustments.
:: **Publish and share** :: Once satisfied, follow the steps in the [readme](https://github.com/twocatmoon/dungeon-press/blob/trunk/README.md) to share your creation with the world or with your gaming group.

Remember, the essence of Dungeon Press is to make adventure creation as fun as the adventures themselves. Happy creating!

# Typography

## Table of Contents

Heading levels between 1 and 3 will automatically be added to the table of contents. These headings can also be externally linked to via fragment identifiers.

## Examples

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus neque vel turpis ultricies ornare. **This sentence is bold.** Pellentesque neque orci, tincidunt convallis magna eu, pharetra gravida arcu. Etiam non metus vel lorem pretium scelerisque. 

"This sentence is dialog." Nullam tristique arcu ante, ut interdum justo viverra id. Suspendisse nec nisl vel mauris pulvinar ultrices. 

## Heading Level 2
##### Tagline or Subheader
Pellentesque neque orci, tincidunt convallis magna eu, pharetra gravida arcu. Etiam non metus vel lorem pretium scelerisque. [This sentence is a link](https://www.dungeonpress.com). Nullam tristique arcu ante, ut interdum justo viverra id. Suspendisse nec nisl vel mauris pulvinar ultrices. 

### Heading Level 3
Nunc convallis, nibh eu eleifend commodo, nisl metus sodales dui, quis tincidunt felis sem et nisi. Nullam eu metus sapien. <a href="#typography">This sentence links internally</a>. Donec eu velit orci. Fusce quis lorem vitae urna tempus condimentum. Cras elementum dui fermentum enim fringilla facilisis. 

---

#### Heading Level 4
Proin vulputate leo lorem, non finibus leo condimentum in. Aliquam tortor mi, congue nec luctus eget, vulputate quis arcu. 

## Example Media

![Alt text](/images/map.webp "Map")

# Markdown Features

## Ability Scores

_Ability scores are scaled with difficulty._

Creates an ability score table with modifiers.

||12,15,12,3,12,6||

---

||17,15,15,3,12,7||%~

## Description List

Indented description list item with a bolded inline heading.

_Hint: try using quotes with description lists to build dialog options._

:: Prologue—Avalanche. :: An avalanche threatens the characters, but they're led to safety by an odd muskrat. They then meet Mother Tusk who briefs them on four tasks she'd like them to undertake in return for saving their lives during the avalanche.
:: Unsure Footing. :: Mother Tusk asks the characters to rescue one of her children, an awakened otter named Spritzel, who's been spying on Easthaven. The characters quickly find Spritzel, and some of his otter friends, fleeing from a pack of wolves.
:: What Does Spritzel Look Like? :: "He's a white-furred otter with a brown patch above his right eye, and he wears a pearl earring."

## Collapsable Details

Collapsable block of content with a heading.

**Parameters**
- 'open' when present, the block will be open by default

[[ Actions open
:: Bite. :: *Melee Weapon Attack:* #+5 to hit, reach 5 ft., one target. *Hit:* 2d6+3% piercing damage. If the target is a creature, it must succeed on a dc13|strength saving throw or be knocked prone.
]]

## Details Blocks

Stylized blocks intended to convey supplementary or important information to the players and dungeon master. 

**Parameters**
- 'narrative' blocks are meant to be read aloud to the players
- 'info' blocks are for information intended for only the dungeon master
- 'thing' blocks can be used to create NPCs, items, spells, locations, etc.

{{ narrative
Travel is incredibly difficult in the deep snow. A bitter wind cuts through your clothing, and ice crystals riding the strong breeze sting your eyes.
}}

{{ info
#### Lightning in Icewind Dale
Unless otherwise noted in the adventure, daytime hours
provide dim light outdoors, while the nighttime hours are
dark. The permanent dusk of Auril's curse makes the promise
of sunlight seem a teasing possibility, but the sun never
breaks the horizon.
}}

{{ thing
### Spritzel (SPRIT-zell)

The awakened otter likes to wear jewelry and generally
make a spectacle of himself.

:: What They Want. :: To brave danger and find shiny things.
:: Irrepressible. :: As an awakened animal, Spritzel knows he's going to die. He doesn't want to die any time soon, but he wants to die spectacularly and for a good cause.
}}

## Dialog

Stylized text useful for distinguishing dialog and speech.

"He's a white-furred otter with a brown patch above his right eye, and he wears a pearl earring."

## Dice Rolls

_Dice rolls are scaled with difficulty._

Shortcuts for creating dice rolls, with averages automatically included.

- 1d2
- 1d4+2
- 1d6-4
- 1d8+6%~

## Difficulty Checks

_Difficulty checks are scaled with difficulty._

Shortcuts for creating difficulty checks.

- dc10
- dc|perception
- dc13|strength
- dc10|nature|animal_handling
- dc10%~

## Dynamic Values

Static values that scale with difficulty.

_Hint: values that start with two #s are still stylized, but are not scaled with difficulty._

- +3
- #-4
- ##5
- #+6%~

## Inline Checkboxes

Inline checkboxes will retain their checked state, stored in the browser's local storage.

- [ ] I stay checked when you refresh the page

## Tables

Dungeon Press adds two special table features to help you generate content efficiently.

### Roll Tables

You can create a roll table by prefixing the first column heading with 'd<NUMBER>'. Roll tables will automatically generate a column for the number value of the roll result.

| d4 Treasure Chest Contents |
|----------------------------|
| 100 gp                     |
| +1 Dagger                  |
| Potion of Healing x 5      |
| Just a rock                |

### Random Tables

Random tables take this a step further. Replace the 'd' with an 'r' and Dungeon Press will randomly pick a number of rows from the table equal to the number of outcomes possible given the dice. 

Create more rows than there are outcomes to make random pools of content. Rows are picked based on a random seed which can be configured by the author or overridden by the player in the UI.

| r4 Treasure Chest Contents |
|----------------------------|
| 100 gp                     |
| +1 Dagger                  |
| Potion of Healing x 5      |
| Just a rock                |
| Sack full of beans         |
| Empty bottle               |
| Chipped emerald            |
| A miniature horse saddle   |

# Example Blocks

{{ thing

### Mother Tusk

Mother Tusk was awakened by a powerful goliath druid
to act as a companion and confidant. The druid became
corrupted, and Mother Tusk saw what he was doing to do
to the animals in her care. She led the animals to safety,
and she's been trying to protect them for the last several
months.

:: What They Want. :: To keep her charges safe.
:: Caring, but Ruthless. :: Mother Tusk cares more for her animals than for humans, and she'll happily put humans at risk for her family.

}}

{{ thing

### Dire Wolf
##### Large beast, unaligned

---

- **Armor Class** 14 (natural armor)
- **Hit Points** 5d10+10%
- **Speed** 50 ft.

---

||17,15,15,3,12,7||

---

- **Skills** Perception #+3, Stealth #+4
- **Senses** passive Perception ##13
- **Languages** —
- **Challenge** 1 (200 XP)

---

:: Keen Hearing and Smell. :: The wolf has advantage on dc|perception checks that rely on hearing or smell.
:: Pack Tactics. :: The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn't incapacitated.

[[ Actions open
:: Bite. :: *Melee Weapon Attack:* #+5 to hit, reach 5 ft., one target. *Hit:* 2d6+3% piercing damage. If the target is a creature, it must succeed on a dc13|strength saving throw or be knocked prone.
]]

}}

{{ thing

### Boots of False Tracks
##### Wondrous item, common

These comfortable, fur-lined boots are embroidered with
gaudy, but worthless, gems.

Only humanoids can wear these boots. While wearing the
boots, you can choose to have them leave tracks like those
of another kind of humanoid of your size.

*Xanathar's Guide to Everything, p. 136*

}}
