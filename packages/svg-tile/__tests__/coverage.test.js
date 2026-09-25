'use strict';

// Covers the default options and the branches the smoke tests don't reach.
// generate() and generateLegend() write their file asynchronously and signal
// completion only through console.log, so each test waits for that message.

var assert = require('assert');
var fs = require('fs');
var os = require('os');
var path = require('path');

const {
  getSquareXY,
  generate,
  generateLegend,
} = require('..');

const SOURCE = path.join(__dirname, 'input', 'source.svg');

// Run fn and resolve with the logged message once it reports completion
// ("Generated file: ...") or a validation failure ("Must provide ...").
function runAndWait(fn) {
  return new Promise((resolve) => {
    let log = console.log;
    console.log = function (msg) {
      if (typeof msg === 'string' && (msg.startsWith('Generated file:') || msg.startsWith('Must provide'))) {
        console.log = log;
        // let the write stream flush before the caller reads the file
        setTimeout(() => resolve(msg), 20);
      }
    };
    fn();
  });
}

describe('svg-tile coverage', function () {

  let tmp;
  let cwd;

  beforeEach(function () {
    cwd = process.cwd();
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'svg-tile-'));
    fs.copyFileSync(SOURCE, path.join(tmp, 'source.svg'));
  });

  afterEach(function () {
    process.chdir(cwd);
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  context('generate', function () {

    it('should refuse to run without tiles', async function () {
      let msg = await runAndWait(() => generate());
      assert.equal(msg, 'Must provide at least one tile id');
    });

    it('should use the default source, target and layout options', async function () {
      process.chdir(tmp);
      await runAndWait(() => generate({ tiles: [['a1', 'a2'], ['b1', 'b2']] }));
      let svg = fs.readFileSync(path.join(tmp, 'target.svg'), 'utf8');
      assert.ok(svg.includes('width="800" height="600"'), 'default 4x3 board of 200px tiles');
      assert.ok(svg.includes('<g id="board" transform="translate(0,0) scale(1,1)" >'));
      assert.ok(svg.includes('id="C0R0"'));
      assert.ok(!svg.includes('<title>'), 'no title by default');
      assert.ok(svg.includes('<desc>This file was code-generated.</desc>'));
    });

    it('should honor explicit options', async function () {
      let target = path.join(tmp, 'explicit.svg');
      await runAndWait(() => generate({
        sourceFile: SOURCE,
        targetFile: target,
        title: 'tiles',
        desc: '',
        scale: 0.5,
        margin: 10,
        padding: 5,
        tileSize: 100,
        columns: 2,
        rows: 1,
        getXY: getSquareXY,
        getTileSetIndex: () => 0,
        tiles: [['only']],
        rotations: () => 90,
        boardId: 'b',
        generateIds: false,
        precision: 0,
        toolTips: false,
        xmlns: 'urn:test',
      }));
      let svg = fs.readFileSync(target, 'utf8');
      assert.ok(svg.includes('<title>tiles</title>'));
      assert.ok(!svg.includes('<desc>'), 'empty desc is omitted');
      assert.ok(svg.includes('xmlns="urn:test"'));
      assert.ok(svg.includes('<g id="b" transform="translate(10,10) scale(0.5,0.5)" >'));
      assert.ok(svg.includes('href="#only"'));
      assert.ok(svg.includes('rotate(90,50,50)'));
      assert.ok(!svg.includes('id="C0R0"'), 'ids are not generated');
      assert.ok(!svg.includes('<title>C0R0</title>'), 'no tooltips');
    });
  });

  context('generateLegend', function () {

    it('should refuse to run without tiles', async function () {
      let msg = await runAndWait(() => generateLegend());
      assert.equal(msg, 'Must provide at least one tile id');
    });

    it('should use the defaults and stop when it runs out of tiles', async function () {
      process.chdir(tmp);
      await runAndWait(() => generateLegend({ tiles: ['first', 'second'] }));
      let svg = fs.readFileSync(path.join(tmp, 'legend.svg'), 'utf8');
      assert.ok(svg.includes('<title>legend</title>'));
      assert.ok(svg.includes('href="#first"'));
      assert.ok(svg.includes('href="#second"'));
      let board = svg.slice(svg.indexOf('<g id="board"'));
      assert.equal((board.match(/<use /g) || []).length, 2, 'one <use> per tile, not per grid cell');
    });

    it('should honor explicit options', async function () {
      let target = path.join(tmp, 'legend-explicit.svg');
      await runAndWait(() => generateLegend({
        sourceFile: SOURCE,
        targetFile: target,
        title: '',
        desc: '',
        width: 300,
        height: 200,
        tileSize: 100,
        columns: 1,
        rows: 1,
        padding: 0,
        getXY: getSquareXY,
        tiles: ['t'],
        rotations: () => 180,
        boardId: 'legend',
        boardTransform: 'scale(2,2)',
        backgroundColor: 'red',
        generateIds: false,
        precision: 1,
        toolTips: false,
      }));
      let svg = fs.readFileSync(target, 'utf8');
      assert.ok(!svg.includes('<title>'), 'empty title is omitted');
      assert.ok(!svg.includes('<desc>'), 'empty desc is omitted');
      assert.ok(svg.includes('<g id="legend" transform="scale(2,2)" >'));
      assert.ok(svg.includes('fill="red"'));
      assert.ok(svg.includes('rotate(180,50,50)'));
      assert.ok(!svg.includes('id="C0R0"'), 'ids are not generated');
    });
  });
});
