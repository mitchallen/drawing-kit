'use strict';

var assert = require('assert');

const factory = require('..');
const svgFactory = require("@mitchallen/pen-svg")

describe('pen-turtle', function () {
  context('smoke test', function () {
    it('should return object', function (done) {
      let pen = factory.create();
      assert.ok(pen, 'pen should not be null');
      done();
    });
    it('should have color method', function (done) {
      let TEST_DEFAULT_COLOR = 0x000000;
      let pen = factory.create();
      let color = pen.color();
      assert.equal(color, TEST_DEFAULT_COLOR, 'default getColor method return not what expected');
      done();
    });
    it('getColor method should return color', function (done) {
      let TEST_COLOR = 0xFF0000;
      let pen = factory.create({
        color: TEST_COLOR,
      });
      let color = pen.color();
      assert.equal(color, TEST_COLOR, 'color method did not returne expected');
      done();
    });
    it('should have path method', function (done) {
      let TEST_DEFAULT_PATH = [];
      let pen = factory.create();
      let path = pen.path();
      assert.deepEqual(path, TEST_DEFAULT_PATH, 'default path method return not what expected');
      done();
    });
    context('heading method', function () {
      it('should have heading method', function (done) {
        let TEST_DEFAULT_HEADING = 0;
        let pen = factory.create();
        let heading = pen.heading();
        assert.equal(heading, TEST_DEFAULT_HEADING, 'default heading method return not what expected');
        done();
      });
      it('create should normalize heading', function (done) {
        let list = [
          { input: 0, expected: 0 },
          { input: 1, expected: 1 },
          { input: 359, expected: 359 },
          { input: 360, expected: 0 },
          { input: 361, expected: 1 },
          { input: -1, expected: 359 },
        ];
        for( let el of list ) {
          // console.log(el);
          let pen = factory.create({
            heading: el.input,
          });
          let heading = pen.heading();
          assert.equal(heading, el.expected, 'default heading method return not what expected');
        }
        done();
      });
      it('turn should normalize heading', function (done) {
        let list = [
          { input: 0, expected: 0 },
          { input: 1, expected: 1 },
          { input: 359, expected: 359 },
          { input: 360, expected: 0 },
          { input: 361, expected: 1 },
          { input: -1, expected: 359 },
        ];
        for( let el of list ) {
          // console.log(el);
          let pen = factory.create({});
          pen.turn( el.input )
          let heading = pen.heading();
          assert.equal(heading, el.expected, 'default heading method return not what expected');
        }
        done();
      });
    });
    context('turn method', function () {
      it('should have turn method', function (done) {
        let TEST_ANGLE = 30;
        let pen = factory.create();
        pen.turn(TEST_ANGLE)
        let heading = pen.heading();
        let expected = TEST_ANGLE;
        assert.equal(heading, expected, 'turn heading not what expected');
        done();
      });
      it('turn method should increment heading', function (done) {
        let TEST_ANGLE_1 = 30;
        let TEST_ANGLE_2 = 15;
        let pen = factory.create();
        pen
          .turn(TEST_ANGLE_1)
          .turn(TEST_ANGLE_2);
        let heading = pen.heading();
        let expected = (TEST_ANGLE_1 + TEST_ANGLE_2);
        assert.equal(heading, expected, 'turn heading not what expected');
        done();
      });
    });
    context('left method', function () {
      it('should have left method', function (done) {
        let TEST_ANGLE = 30;
        let pen = factory.create();
        pen.left(TEST_ANGLE)
        let heading = pen.heading();
        let expected = TEST_ANGLE;
        assert.equal(heading, expected, 'left angle not what expected');
        done();
      });
      it('left method should decrement angle', function (done) {
        let TEST_ANGLE_1 = 30;
        let TEST_ANGLE_2 = 15;
        let pen = factory.create();
        pen
          .left(TEST_ANGLE_1)
          .left(TEST_ANGLE_2);
        let heading = pen.heading();
        let expected = TEST_ANGLE_1 + TEST_ANGLE_2;
        assert.equal(heading, heading, 'left angle not what expected');
        done();
      });
    });
    context('right method', function () {
      it('should have right method', function (done) {
        let TEST_ANGLE = 30;
        let pen = factory.create();
        pen.right(TEST_ANGLE)
        let heading = pen.heading();
        let expected = (360 - TEST_ANGLE);
        assert.equal(heading, expected, 'right angle not what expected');
        done();
      });
      it('right method should decrement angle', function (done) {
        let TEST_ANGLE_1 = 30;
        let TEST_ANGLE_2 = 15;
        let pen = factory.create();
        pen
          .right(TEST_ANGLE_1)
          .right(TEST_ANGLE_2);
        let heading = pen.heading();
        let expected = 360 - (TEST_ANGLE_1 + TEST_ANGLE_2);
        assert.equal(heading, expected, 'right angle not what expected');
        done();
      });
    });
    it('should have isDown method', function (done) {
      let TEST_DEFAULT_IS_DOWN = false;
      let pen = factory.create();
      let flag = pen.isDown();
      assert.equal(flag, TEST_DEFAULT_IS_DOWN, 'default isDown method return not what expected');
      done();
    });
    it('should have down method', function (done) {
      let pen = factory.create();
      pen.down();
      let flag = pen.isDown();
      assert.equal(flag, true, 'down method should cause isDown to be true');
      done();
    });
    it('should have up method', function (done) {
      let pen = factory.create();
      pen.up();
      let flag = pen.isDown();
      assert.equal(flag, false, 'up method should cause isDown to be false');
      done();
    });
    context('forward method', function () {
      it('should have forward method', function (done) {
        let TEST_DISTANCE = 50;
        let EXPECTED_PATH = [{ op: 'M', x: 0, y: (0 - TEST_DISTANCE) }]
        let pen = factory.create();
        pen.forward(TEST_DISTANCE);
        let path = pen.path();
        assert.deepEqual(path, EXPECTED_PATH, 'path after forward not what expected');
        done();
      });
      it('forward method should increment distance when pen up', function (done) {
        let TEST_DISTANCE_1 = 50;
        let TEST_DISTANCE_2 = 25;
        let EXPECTED_PATH = [
          { op: 'M', x: 0, y: (0 - TEST_DISTANCE_1) },
          { op: 'M', x: 0, y: (0 - (TEST_DISTANCE_1 + TEST_DISTANCE_2)) },
        ]
        let pen = factory.create();
        pen
          .forward(TEST_DISTANCE_1)
          .forward(TEST_DISTANCE_2);
        let path = pen.path();
        assert.deepEqual(path, EXPECTED_PATH, 'path after forward not what expected');
        done();
      });
      it('forward method should increment distance when pen down', function (done) {
        let TEST_DISTANCE_1 = 50;
        let TEST_DISTANCE_2 = 25;
        let EXPECTED_PATH = [
          { op: 'M', x: 0, y: (0 - TEST_DISTANCE_1) },
          { op: 'L', x: 0, y: (0 - (TEST_DISTANCE_1 + TEST_DISTANCE_2)) },
        ]
        let pen = factory.create();
        pen
          .forward(TEST_DISTANCE_1)
          .down()
          .forward(TEST_DISTANCE_2);
        let path = pen.path();
        assert.deepEqual(path, EXPECTED_PATH, 'path after forward not what expected');
        done();
      });
    });
    it('writeSVG should write svg for a multiple pens', done => {
      let width = 1024,
        height = 1024;
      let cx = 1024 / 2,
        cy = 1024 / 2;
      let writer = svgFactory.create({});
      assert.ok(writer);

      let pen1 = factory.create({
        x: cx * 1.5,
        y: cy * 1.5,
        color: 0xFF0000,    // red pen
        width: 4,           // pen width 
        alpha: 0.8          // pen alpha value
      });

      let pen2 = factory.create({
        x: cx * 0.5,
        y: cy * 0.5,
        color: 0x0000FF,    // blue pen
        width: 4,           // pen width 
        alpha: 0.8          // pen alpha value
      });

      let pen3 = factory.create({
        x: cx,
        y: cy,
        color: 0x000000,    // pen color
        width: 4,           // pen width 
        alpha: 0.8          // pen alpha value
      });

      let d1 = width / 4;

      pen1.down();
      for (let i = 0; i < 12; i++) {
        pen1
          .forward(d1)
          .turn(165)
      }

      let d2 = width / 5;

      pen2
        .down()
      for (let i = 0; i < 5; i++) {
        pen2
          .forward(d2)
          .turn(145)
      }

      // to show heading at start
      pen3
        .down()
        .forward(height / 4)
        .right(45)
        .forward(height / 8)
        .left(45)
        .forward(height / 16);


      writer
        .addPen(pen1)
        .addPen(pen2)
        .addPen(pen3);

      let svg = writer.writeSVG({
        width,
        height,
        filename: "__tests__/output/write-test.svg"
      });
      // console.log("SVG: \n", svg);
      done();
    });
  });
});