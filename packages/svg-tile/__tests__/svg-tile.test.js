'use strict';

var assert = require('assert');

const factory = require('..');
const {
  getSquareXY,
  generate,
} = require("@mitchallen/svg-tile");

describe('svg-tile', function () {
  context('smoke test', function () {
    it('should return generate', function (done) {
      assert.ok(generate, 'gemerate should not be null');
      done();
    });
    it('should return getSquareXY', function (done) {
      assert.ok(getSquareXY, 'getSquare should not be null');
      done();
    });

    it('generate should square grid svg', function (done) {
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
      done();
    });
  })
})

