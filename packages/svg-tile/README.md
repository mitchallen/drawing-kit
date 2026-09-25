@mitchallen/svg-tile
==
SVG Tile Pattern Generator
--
<p>
  <a href="https://github.com/mitchallen/drawing-kit/actions/workflows/check.yaml">
    <img src="https://img.shields.io/github/actions/workflow/status/mitchallen/drawing-kit/check.yaml" alt="Build">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/actions/workflows/check.yaml?query=branch%3Amain">
    <img src="https://img.shields.io/badge/coverage-100%25-brightgreen" alt="Coverage: 100%">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/pkgs/npm/svg-tile">
    <img src="https://img.shields.io/github/package-json/v/mitchallen/drawing-kit?filename=packages%2Fsvg-tile%2Fpackage.json&label=GitHub%20Packages" alt="Version">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/mitchallen/drawing-kit.svg" alt="License">
  </a>

  <br />

</p>

* * *

## Installation

As of __0.12.1__ this package is published to __GitHub Packages__, not the public npm
registry. Version __0.12.0__ and earlier remain on npmjs.org and are no longer
updated there.

Add an `.npmrc` next to your `package.json`:

    @mitchallen:registry=https://npm.pkg.github.com

GitHub Packages requires authentication even for public packages, so you also need a
personal access token with the `read:packages` scope. Keep it in an environment
variable rather than committing it:

    //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

Then:

```sh
$ npm init
$ npm install @mitchallen/svg-tile
```

* * *

<img src="https://raw.githubusercontent.com/mitchallen/drawing-kit/main/examples/svg-tile/tile-101/output/square-tiles.svg" />

### Legend

<img src="https://raw.githubusercontent.com/mitchallen/drawing-kit/main/packages/svg-tile/__tests__/output/legend-01.svg" />

* * *

## Usage

### Step 1. Create a new project

* Create a new project
* Install the package (see instructions above)

### Step 2. Define an input file

Define an input file and save as **./input/source.svg**:

The input file should be an SVG file that contains:
* a **style** section
* a **defs** section which defines all the tiles with ids

For example:

```svg
<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024">
    <style>
        rect.tileBack1 {
            stroke: none;
            fill: black;
        }

        rect.tileBack2 {
            stroke: none;
            fill: white;
        }

        rect.background {
            stroke: none;
            fill: white;
        }

        path.pie1 {
            stroke: none;
            stroke-width: 1;
            fill: white;
            stroke-linecap: butt;
        }

        path.pie2 {
            stroke: none;
            stroke-width: 1;
            fill: black;
            stroke-linecap: butt;
        }
    </style>
    <defs>
        <g id="base1">
            <rect width="200" height="200" class="tileBack1" />
        </g>
        <g id="base2">
            <rect width="200" height="200" class="tileBack2" />
        </g>

        <g id="tile1A">
            <use href="#base1" />
            <path d="M200,100 A 100,100 0,0,0 100,200 L 200,200 Z" class="pie1" />
            <path d="M0,100 A 100,100 0,0,0 100,0 L 0,0 Z" class="pie1" />
        </g>
        <g id="tile2A">
            <use href="#base2" />
            <path d="M200,100 A 100,100 0,0,0 100,200 L 200,200 Z" class="pie2" />
            <path d="M0,100 A 100,100 0,0,0 100,0 L 0,0 Z" class="pie2" />
        </g>
        <g id="tile1B">
            <use href="#tile2A" transform="rotate(90,100,100)" />
        </g>
        <g id="tile2B">
            <use href="#tile1A" transform="rotate(90,100,100)" />
        </g>
    </defs>
</svg>
```

### Step 3. Define a generator file

Define a generator file (index.js), passing in the names of the tiles to the `tiles` property.

The generator will alternate between the two sets of tiles.

```js
let factory = require("@mitchallen/svg-tile")

let {
  generate,
  getSquareXY,
} = factory;

generate({
    sourceFile: './input/source.svg',
    targetFile: './output/square-tiles.svg',
    toolTips: true,
    width: 550,
    height: 550,
    tileSize: 200,
    columns: 10,
    rows: 10,
    getXY: getSquareXY,
    tiles: [
      ['tile1A', 'tile1B'],
      ['tile2A', 'tile2B'],
    ],
    boardTransform: `translate(25,25) scale(0.25, 0.25)`,
    backgroundColor: 'black',
  })
```

### Step 4. Run the file and generate a tiled SVG

Run the file and then open the output file (./output/...)

```sh
node index.js

open ./output/*.svg
```

### Step 5. Use the generateLegend function to generate a tile legend SVG file:

```js
  // generate legend
  let margin = 25;
  let padding = 30
  let tileSize = 200
  let columns = 2
  let rows = 2
  let width = margin * 2 + tileSize * columns + padding * (columns - 1)
  let height = margin * 2 + tileSize * rows + padding * (rows - 1)
  generateLegend({
    sourceFile: './input/source.svg',
    targetFile: './output/legend-01.svg',
    toolTips: true,
    width,
    height,
    padding,
    tileSize,
    columns,
    rows,
    getXY: getSquareXY,
    tiles: ['tile1A', 'tile1B','tile2A', 'tile2B'],
    boardTransform: `translate(${margin},${margin}) scale(1.0, 1.0)`,
    backgroundColor: 'gray',
  })

```



  