@mitchallen/lsystem
==
L-System Generator
--
<p>
  <a href="https://github.com/mitchallen/drawing-kit/actions/workflows/check.yaml">
    <img src="https://img.shields.io/github/actions/workflow/status/mitchallen/drawing-kit/check.yaml" alt="Build">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/actions/workflows/check.yaml?query=branch%3Amain">
    <img src="https://img.shields.io/badge/coverage-100%25-brightgreen" alt="Coverage: 100%">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/pkgs/npm/lsystem">
    <img src="https://img.shields.io/github/package-json/v/mitchallen/drawing-kit?filename=packages%2Flsystem%2Fpackage.json&label=GitHub%20Packages" alt="Version">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/mitchallen/drawing-kit.svg" alt="License">
  </a>

  <br />

</p>

* * *

## Installation

As of __0.25.9__ this package is published to __GitHub Packages__, not the public npm
registry. Version __0.25.8__ and earlier remain on npmjs.org and are no longer
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
$ npm install @mitchallen/lsystem
```

* * *

<img src="https://raw.githubusercontent.com/mitchallen/drawing-kit/main/packages/lsystem/__tests__/output/kock-island.svg" />

* * *

## Usage

```js
const factory = require('@mitchallen/lsystem');
const penTurtleFactory = require('@mitchallen/pen-turtle');
const svgFactory = require("@mitchallen/pen-svg")

function kochIsland() {
    let width = 1024,
        height = 1024;
    let writer = svgFactory.create({});
    let lsys = factory.create();
    // setup turtle
    let turtle = penTurtleFactory.create({
        color: 0x000000,
        width: 1,
    });
    // setup lsystem
    // add pen turtle to lsystem
    lsys.turtle = turtle;
    // define lsystem
    lsys.distance = 4;
    lsys.depth = 4;
    lsys.angle = 60;
    lsys.addRule("F", "F-F++F-F");
    lsys.axiom = "F++F++F";
    lsys.run();
    // write to svg
    writer
        .addPen(lsys.turtle,
            {
                color: 0x000000,
                fill: 0xFF0000,
                width: 1,
                transform: {
                    scale: { x: 2.0, y: 2.0 },
                    translate: { x: 140, y: 400 },
                }
            });
    let filename = 'koch-island.svg'
    let svg = writer.writeSVG({
        width,
        height,
        filename,
    });

    // print the SVG markup to the screen

    console.log(svg)

    console.log(`\n\nOpen ${filename} in your drawing program or browser.\n\n`)

}

kochIsland()

```

## Documentation

* [LSYSTEM-DOC.md](https://github.com/mitchallen/drawing-kit/blob/main/packages/lsystem/LSYSTEM-DOC.md)

