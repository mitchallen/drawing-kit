@mitchallen/lsystem
==
L-System Generator
--
<p>
  <a href="https://npmjs.org/package/@mitchallen/lsystem">
    <img src="https://img.shields.io/github/actions/workflow/status/mitchallen/drawing-kit/check.yaml" alt="Build">
  </a>

  <a href="https://npmjs.org/package/@mitchallen/lsystem">
    <img src="http://img.shields.io/npm/dt/@mitchallen/lsystem.svg?style=flat-square" alt="Downloads">
  </a>

  <a href="https://npmjs.org/package/@mitchallen/lsystem">
    <img src="http://img.shields.io/npm/v/@mitchallen/lsystem.svg?style=flat-square" alt="Version">
  </a>
  
  <a href="https://npmjs.org/package/@mitchallen/lsystem">
    <img src="https://img.shields.io/github/license/mitchallen/drawing-kit.svg">
  </a>

  <br />
  
</p>

* * *

## Installation

```sh
$ npm init
$ npm install @mitchallen/lsystem --save
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

