'use strict';

const { describe, it } = require('node:test');
var assert = require('assert');

const factory = require('..');
const {
  getSquareXY,
  generate,
  generateLegend,
} = require("@mitchallen/svg-tile");

describe('svg-tile', function () {
  describe('smoke test', function () {
    it('should return generate', function() {
      assert.ok(generate, 'gemerate should not be null');
    });
    it('should return getSquareXY', function() {
      assert.ok(getSquareXY, 'getSquare should not be null');
    });

    it('should generate square grid svg', function() {
      // generate square grid
      generate({
        sourceFile: './__tests__/input/source.svg',
        targetFile: './__tests__/output/square-tiles.svg',
        toolTips: true,
        width: 550,
        height: 550,
        tileSize: 200,
        columns: 10,
        rows: 10,
        getXY: getSquareXY,
        tiles: [
          ['slice1A', 'slice1B'],
          ['slice2A', 'slice2B'],
        ],
        boardTransform: `translate(25,25) scale(0.25, 0.25)`,
        backgroundColor: 'black',
      })
    });
    it('should generate a legend svg', function() {
      // generate legend
      let margin = 25;
      let padding = 30
      let tileSize = 200
      let columns = 2
      let rows = 2
      let width = margin * 2 + tileSize * columns + padding * (columns - 1)
      let height = margin * 2 + tileSize * rows + padding * (rows - 1)
      generateLegend({
        sourceFile: './__tests__/input/source.svg',
        targetFile: './__tests__/output/legend-01.svg',
        toolTips: true,
        width,
        height,
        padding,
        tileSize,
        columns,
        rows,
        getXY: getSquareXY,
        tiles: ['slice1A', 'slice2A', 'slice2B', 'slice1B'],
        boardTransform: `translate(${margin},${margin}) scale(1.0, 1.0)`,
        backgroundColor: 'gray',
      })
    });
    it('should generate square grid svg even even', function() {
      // generate square grid
      generate({
        sourceFile: './__tests__/input/source.svg',
        targetFile: './__tests__/output/even-even-grid.svg',
        toolTips: true,
        tileSize: 200,
        columns: 20,
        rows: 10,
        margin: 50,
        getXY: getSquareXY,
        tiles: [
          ['slice1A', 'slice1B'],
          ['slice2A', 'slice2B'],
        ],
        // boardTransform: `translate(25,25) scale(0.25, 0.25)`,
        backgroundColor: 'black',
      })
    });
    it('should generate square grid svg odd even', function() {
      // generate square grid
      generate({
        sourceFile: './__tests__/input/source.svg',
        targetFile: './__tests__/output/odd-even-grid.svg',
        toolTips: true,
        tileSize: 200,
        columns: 9,
        rows: 10,
        margin: 50,
        getXY: getSquareXY,
        tiles: [
          ['slice1A', 'slice1B'],
          ['slice2A', 'slice2B'],
        ],
        // boardTransform: `translate(25,25) scale(0.25, 0.25)`,
        backgroundColor: 'black',
      })
    });
    it('should generate square grid svg odd odd', function() {
      // generate square grid
      generate({
        sourceFile: './__tests__/input/source.svg',
        targetFile: './__tests__/output/odd-odd-grid.svg',
        toolTips: true,
        tileSize: 200,
        columns: 9,
        rows: 9,
        margin: 50,
        getXY: getSquareXY,
        tiles: [
          ['slice1A', 'slice1B'],
          ['slice2A', 'slice2B'],
        ],
        // boardTransform: `translate(25,25) scale(0.25, 0.25)`,
        backgroundColor: 'black',
      })
    });
    it('should generate square wide padded grid svg', function() {
      // generate square grid
      generate({
        sourceFile: './__tests__/input/source.svg',
        targetFile: './__tests__/output/wide-padded-tile-grid.svg',
        toolTips: true,
        tileSize: 200,
        columns: 20,
        rows: 10,
        margin: 50,
        padding: 50,
        getXY: getSquareXY,
        tiles: [
          ['slice1A', 'slice1B'],
          ['slice2A', 'slice2B'],
        ],
        // boardTransform: `translate(25,25) scale(0.25, 0.25)`,
        backgroundColor: 'red',
      })
    });
  })
})

