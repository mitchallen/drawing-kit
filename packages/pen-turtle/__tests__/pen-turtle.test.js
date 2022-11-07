'use strict';

var assert = require('assert');

const factory = require('..');

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
    it('should have angle method', function (done) {
      let TEST_DEFAULT_ANGLE = 0;
      let pen = factory.create();
      let angle = pen.angle();
      assert.equal(angle, TEST_DEFAULT_ANGLE, 'default angle method return not what expected');
      done();
    });
    context('turn method', function () {
      it('should have turn method', function (done) {
        let TEST_ANGLE = 30;
        let pen = factory.create();
        pen.turn(TEST_ANGLE)
        let angle = pen.angle();
        assert.equal(angle, TEST_ANGLE, 'turn angle not what expected');
        done();
      });
      it('turn method should increment angle', function (done) {
        let TEST_ANGLE_1 = 30;
        let TEST_ANGLE_2 = 15;
        let pen = factory.create();
        pen
          .turn(TEST_ANGLE_1)
          .turn(TEST_ANGLE_2);
        let angle = pen.angle();
        let total = TEST_ANGLE_1 + TEST_ANGLE_2;
        assert.equal(angle, total, 'turn angle not what expected');
        done();
      });
    });
    context('left method', function () {
      it('should have left method', function (done) {
        let TEST_ANGLE = 30;
        let pen = factory.create();
        pen.left(TEST_ANGLE)
        let angle = pen.angle();
        let expected = 0 - TEST_ANGLE;
        assert.equal(angle, expected, 'left angle not what expected');
        done();
      });
      it('left method should decrement angle', function (done) {
        let TEST_ANGLE_1 = 30;
        let TEST_ANGLE_2 = 15;
        let pen = factory.create();
        pen
          .left(TEST_ANGLE_1)
          .left(TEST_ANGLE_2);
        let angle = pen.angle();
        let total = 0 - (TEST_ANGLE_1 + TEST_ANGLE_2);
        assert.equal(angle, total, 'left angle not what expected');
        done();
      });
    });
    context('right method', function () {
      it('should have right method', function (done) {
        let TEST_ANGLE = 30;
        let pen = factory.create();
        pen.right(TEST_ANGLE)
        let angle = pen.angle();
        let expected = TEST_ANGLE;
        assert.equal(angle, expected, 'right angle not what expected');
        done();
      });
      it('right method should decrement angle', function (done) {
        let TEST_ANGLE_1 = 30;
        let TEST_ANGLE_2 = 15;
        let pen = factory.create();
        pen
          .right(TEST_ANGLE_1)
          .right(TEST_ANGLE_2);
        let angle = pen.angle();
        let total = (TEST_ANGLE_1 + TEST_ANGLE_2);
        assert.equal(angle, total, 'right angle not what expected');
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
        let EXPECTED_PATH = [{ op: 'M', x: 0, y: TEST_DISTANCE }]
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
          { op: 'M', x: 0, y: TEST_DISTANCE_1 },
          { op: 'M', x: 0, y: TEST_DISTANCE_1 + TEST_DISTANCE_2 },
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
          { op: 'M', x: 0, y: TEST_DISTANCE_1 },
          { op: 'L', x: 0, y: TEST_DISTANCE_1 + TEST_DISTANCE_2 },
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
  });
});