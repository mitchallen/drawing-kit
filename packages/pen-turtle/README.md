@mitchallen/pen-turtle
==
Turtle pen drawing tool
--
<p>

<a href="https://npmjs.org/package/@mitchallen/pen-turtle">
    <img src="https://img.shields.io/github/actions/workflow/status/mitchallen/drawing-kit/check.yaml" alt="Build">
</a>

<a href="https://npmjs.org/package/@mitchallen/pen-turtle">
    <img src="http://img.shields.io/npm/dt/@mitchallen/pen-turtle.svg?style=flat-square" alt="Downloads">
</a>

  <a href="https://npmjs.org/package/@mitchallen/pen-turtle">
    <img src="http://img.shields.io/npm/v/@mitchallen/pen-turtle.svg?style=flat-square" alt="Version">
  </a>
  
  <a href="https://npmjs.org/package/@mitchallen/pen-turtle">
    <img src="https://img.shields.io/github/license/mitchallen/drawing-kit.svg">
  </a>
  
</p>

* * *

## Installation

```sh
$ npm init
$ npm install @mitchallen/pen-turtle --save
```

* * *

## Usage

```js
const factory = require('@mitchallen/pen-turtle');
const svgFactory = require("@mitchallen/pen-svg")

let width = 1024,
    height = 1024,
    cx = width / 2,
    cy = height / 2,
    writer = svgFactory.create({})

// create a pen

let pen1 = factory.create({
    x: cx * 1.5,
    y: cy * 1.5,
    color: 0xFF0000,    // red pen
    width: 4,           // pen width 
    alpha: 0.8          // pen alpha value
});

// create another pen

let pen2 = factory.create({
    x: cx * 0.5,
    y: cy * 0.5,
    color: 0x0000FF,    // blue pen
    width: 4,           // pen width 
    alpha: 0.8          // pen alpha value
});

let d1 = width / 4;

// put the pen down, move and turn multiple times

pen1.down();
for (let i = 0; i < 12; i++) {
    pen1
        .forward(d1)
        .turn(165)
}

let d2 = width / 5;

// put the other pen down, move and turn multiple times

pen2
    .down()
for (let i = 0; i < 5; i++) {
    pen2
        .forward(d2)
        .turn(145)
}

// add the pens to the writer

writer
    .addPen(pen1)
    .addPen(pen2)

// generate an svg and write it to a file

filename = "demo-pen-turtle.svg";

let svg = writer.writeSVG({
    width,
    height,
    filename,
});

// print the SVG markup to the screen

console.log(svg)

console.log(`\n\nOpen ${filename} in your favorite drawing program or browser.\n\n`)

```

## Documentation

* [PEN-TURTLE-DOC.md](https://github.com/mitchallen/drawing-kit/blob/main/packages/pen-turtle/PEN-TURTLE-DOC.md)
