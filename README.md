<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://www.dungeonpress.com">
    <img src="public/icon.svg" alt="Dungeon Press Icon" width="80" height="80">
  </a>

<h3 align="center">Dungeon Press</h3>

  <p align="center">
    Dungeon Press is a markdown powered static site generator for Dungeons & Dragons.
    <br />
    <br />
    <a href="https://demo.dungeonpress.com">View Demo</a>
    ·
    <a href="https://github.com/twocatmoon/dungeon-press/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/twocatmoon/dungeon-press/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-dungeon-press">About Dungeon Press</a>
      <ul>
        <li><a href="#markdown">Powered by Markdown</a></li>
        <li><a href="#notes-and-highlights">Notes and Highlights</a></li>
        <li><a href="#procedural-content">Procedural Content</a></li>
        <li><a href="#adjustable-difficulty">Adjustable Difficulty</a></li>
        <li><a href="#publishing-features">Publishing Features</a></li>
        <li><a href="#customization">Customization</a></li>
        <li><a href="#dark-mode">Dark Mode</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#markdown-reference">Markdown Reference</a></li>
    <li><a href="#html-template-strings">HTML Template Strings</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About Dungeon Press

[![Product Name Screen Shot][product-screenshot]](https://www.dungeonpress.com)

Dungeon Press is a static site generator that leverages the simplicity and flexibility of Markdown to create interactive tabletop adventures with a clean, minimalistic design. It's designed to cater to both creators and players by offering advanced formatting features, dynamic content adjustment, and easy publishing options.

### Powered by Markdown

Dungeon Press utilizes GitHub flavored markdown, enhancing it with features to support advanced formatting such as dialogues, dice rolls, difficulty checks, ability scores, and more.

Details about your adventure, such as the author, description, and version are configured through a self-contained, frontmatter style YAML configuration, making your adventure setup straightforward and customizable.

### Notes and Highlights

The platform enables users to highlight text sections, bookmark them, and annotate with notes or general observations. It supports saving checkbox states, with all data stored in the browser's local storage, making it easy to pick up right where you left off.

### Procedural Content

Dungeon Press introduces procedural content generation through randomized tables based on a seed. Creators can set a default seed for their adventure or allow players to choose one, adding a unique twist to each playthrough.

### Adjustable Difficulty

Adjust the challenge level of your adventure with scalable difficulty checks, ability scores, dice rolls, and values across three difficulty settings: casual, intended, and difficult. This feature adjusts values and modifiers to ensure a balanced experience for all players.

### Publishing Features

With Dungeon Press, publishing your adventure is a breeze. It builds a fully responsive static HTML bundle compatible with any HTTP server, with SEO friendliness through meta tags and structured LD+JSON data. Mobile, tablet, and desktop devices are all supported. Media and other files included in the `/public` directory are automatically included with the exported bundle.

### Customization

Configure external links, social media profiles, titles, hero images, and more through `dungeonpress.config.js`. Themes can be easily adjusted using CSS variables contained in `style.css`, and the `index.html` file can be altered to add things like Google Analytics tags.

### Dark Mode

Dungeon Press supports both light and dark modes through media queries and CSS variables.

### Built With

- Vite
- React
- Marked



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

To run this project you'll need the following software installed:
- [git v2.39+](https://git-scm.com/downloads)
- [Node.js v20.12](https://nodejs.org/en/download)

### Installation

1. Create a copy of this project by using the "Use this template" feature on GitHub, or by forking this repository
2. Clone your copy of the repo `git clone https://github.com/<your-username>/<your-app>.git`
3. Install required dependencies with `npm install`
4. Run the project with `npm run dev`
5. Open `adventure.md` and get to work!

Your adventure will now be available at http://localhost:5173. Any changes made to `adventure.md` will automatically be reflected in the browser.

Additional customization can be found in `dungeonpress.config.js`. If you'd like to adjust the look, colors, fonts, and other theme related styles can be adjusted via CSS variables in `style.css`.

To build an HTML bundle suitable for publishing, run `npm run build` and the output will be generated in the `dist` directory.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN REFERENCE -->
## Markdown Reference

Dungeon Press supports most features of [GitHub flavoured Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), while adding many of its own to support the features need to write an organized and dynamic tabletop adventure.

Here is a list of the additional features that Dungeon Press introduces.

#### A Note About Difficulty Modifiers

Some features scale with difficulty. These features can be scaled by either a static modifier, or a percentage by appending the value with a `%`. Values can be scaled either up or down, and the direction can be inverted by appending the value with a `~`.

These are the available difficulties and their modfiers/percentages:
- Casual (-2/x0.66)
- Intended (0/x1.00)
- Difficult (+2/x1.33)

### Ability Scores

_Ability scores are scaled with difficulty._

Creates an ability score table with modifiers.

```
Format:
||<STR>,<DEX>,<CON>,<INT>,<WIS>,<CHA>||

Example:
||12,15,12,3,12,6||
||17,15,15,3,12,7||%~
```

### Description List

Indented description list item with a bolded inline heading.

_Hint: try using quotes with description lists to build dialog options._

```
Format:
:: <HEADING> :: <DESCRIPTION>

Example:
:: What Does Spritzel Look Like? :: "He's a white-furred otter with a brown patch above his right eye, and he wears a pearl earring."
```

### Collapsable Details

Collapsable block of content with a heading.

**Parameters**
- `open` when present, the block will be open by default

```
Format:
[[ <HEADING> [parameters]
Lorem ipsum dolor sit amet.
]]

Example:
[[ Actions open
:: Bite. :: *Melee Weapon Attack:* #+5 to hit, reach 5 ft., one target. *Hit:* 2d6+3% piercing damage. If the target is a creature, it must succeed on a dc13|strength saving throw or be knocked prone.
]]
```

### Details Blocks

Stylized blocks intended to convey supplementary or important information to the players and dungeon master. 

**Parameters**
- `narrative` blocks are meant to be read aloud to the players
- `info` blocks are for information intended for only the dungeon master
- `thing` blocks can be used to create NPCs, items, spells, locations, etc.

```
Format:
{{ [parameters]
Lorem ipsum dolor sit amet.
}}

Example:
{{ narrative
Travel is incredibly difficult in the deep snow. A bitter wind cuts through your clothing, and ice crystals riding the strong breeze sting your eyes.
}}
```

### Dialog

Stylized text useful for distinguishing dialog and speech.

```
Format:
"Lorem ipsum dolor sit amet."

Example:
:: What Does Spritzel Look Like? :: "He's a white-furred otter with a brown patch above his right eye, and he wears a pearl earring."
```

### Dice Rolls

_Dice rolls are scaled with difficulty._

Shortcuts for creating dice rolls, with averages automatically included.

```
Format:
<NUMBER>d<NUMBER>[+/-]<NUMBER>

Examples:
1d2
1d4+2
1d6-4
1d8+6%~
```

### Difficulty Checks

_Difficulty checks are scaled with difficulty._

Shortcuts for creating difficulty checks.

```
Format:
dc<NUMBER>|<SKILL OR ABILITY>

Examples:
dc10
dc|perception
dc13|strength
dc10|nature|animal_handling
dc10%~
```

### Dynamic Values

Static values that scale with difficulty.

_Hint: values that start with ## are still stylized, but are not scaled with difficulty._

```
Format:
#+<NUMBER>
#-<NUMBER>
##<NUMBER>

Examples:
#+3
#-4
##5
#+6%~
```

### Inline Checkboxes

Inline checkboxes will retain their checked state, stored in the browser's local storage.

### Table of Contents

Heading levels between 1 and 3 will automatically be added to the table of contents. These headings can also be externally linked to via fragment identifiers.

```
# Heading 1
## Heading 2
### Heading 3
```

### Table Features

As we all know, a good adventure always has a few tables. Dungeon Press adds two special table features to help you generate content efficiently.

#### Roll Tables

You can create a roll table by prefixing the first column heading with `d<NUMBER>`. Roll tables will automatically generate a column for the number value of the roll result.

```
Format:
| d<NUMBER> <HEADING> |
|---------------------|
| Item 1              |
| item 2              |
| etc...              |

Example:
| d4 Treasure Chest Contents |
|----------------------------|
| 100 gp                     |
| +1 Dagger                  |
| Potion of Healing x 5      |
| Just a rock                |
```

#### Random Tables

Random tables take this a step further. Replace the `d` with an `r` and Dungeon Press will randomly pick a number of rows from the table equal to the number of outcomes possible given the dice. 

Create more rows than there are outcomes to make random pools of content. Rows are picked based on a random seed which can be configured by the author or overridden by the player in the UI.

```
Format:
| r<NUMBER> <HEADING> |
|---------------------|
| Item 1              |
| item 2              |
| etc...              |

Example:
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
```

Only 4 of 8 items from the example table will be visible on the page!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- HTML TEMPLATE STRINGS -->
## HTML Template Strings

The values in the YAML configuration of your adventure (your adventure's "attributes") are made available to `index.html`. Use the format `{{attribute.<KEY>}}` to access these values inside of `index.html`.



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Apache 2.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

hello@twocatmoon.com

Project Link: [https://github.com/twocatmoon/dungeon-press](https://github.com/twocatmoon/dungeon-press)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/twocatmoon/dungeon-press.svg?style=for-the-badge
[contributors-url]: https://github.com/twocatmoon/dungeon-press/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/twocatmoon/dungeon-press.svg?style=for-the-badge
[forks-url]: https://github.com/twocatmoon/dungeon-press/network/members
[stars-shield]: https://img.shields.io/github/stars/twocatmoon/dungeon-press.svg?style=for-the-badge
[stars-url]: https://github.com/twocatmoon/dungeon-press/stargazers
[issues-shield]: https://img.shields.io/github/issues/twocatmoon/dungeon-press.svg?style=for-the-badge
[issues-url]: https://github.com/twocatmoon/dungeon-press/issues
[license-shield]: https://img.shields.io/github/license/twocatmoon/dungeon-press.svg?style=for-the-badge
[license-url]: https://github.com/twocatmoon/dungeon-press/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: public/images/hero.webp
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
