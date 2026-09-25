@mitchallen/pen-turtle
==
Turtle pen drawing tool
--
<p>
  <a href="https://github.com/mitchallen/drawing-kit/actions/workflows/check.yaml">
    <img src="https://img.shields.io/github/actions/workflow/status/mitchallen/drawing-kit/check.yaml" alt="Build">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/actions/workflows/check.yaml?query=branch%3Amain">
    <img src="https://img.shields.io/badge/coverage-100%25-brightgreen" alt="Coverage: 100%">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/pkgs/npm/pen-turtle">
    <img src="https://img.shields.io/github/package-json/v/mitchallen/drawing-kit?filename=packages%2Fpen-turtle%2Fpackage.json&label=GitHub%20Packages" alt="Version">
  </a>

  <a href="https://github.com/mitchallen/drawing-kit/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/mitchallen/drawing-kit.svg" alt="License">
  </a>

  <br />

</p>

* * *

## Installation

As of __0.33.1__ this package is published to __GitHub Packages__, not the public npm
registry. Version __0.33.0__ and earlier remain on npmjs.org and are no longer
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
$ npm install @mitchallen/pen-turtle
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

