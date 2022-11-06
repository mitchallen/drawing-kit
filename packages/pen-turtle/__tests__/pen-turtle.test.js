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
    it('should have getColor method', function (done) {
      let TEST_DEFAULT_COLOR = 0x000000;
      let pen = factory.create();
      let color = pen.getColor();
      assert.equal(color, TEST_DEFAULT_COLOR, 'default getColor method return not what expected');
      done();
    });
    it('getColor method should return color', function (done) {
      let TEST_COLOR = 0xFF0000;
      let pen = factory.create({
        color: TEST_COLOR,
      });
      let color = pen.getColor();
      assert.equal(color, TEST_COLOR, 'getColor method did not returne expected');
      done();
    });
    it('should have getPath method', function (done) {
      let TEST_DEFAULT_PATH = [];
      let pen = factory.create();
      let path = pen.getPath();
      assert.deepEqual(path, TEST_DEFAULT_PATH, 'default getPath method return not what expected');
      done();
    });
    it('should have getAngle method', function (done) {
      let TEST_DEFAULT_ANGLE = 0;
      let pen = factory.create();
      let angle = pen.getAngle();
      assert.equal(angle, TEST_DEFAULT_ANGLE, 'default getAngle method return not what expected');
      done();
    });
    it('should have turn method', function (done) {
      let TEST_ANGLE = 30;
      let pen = factory.create();
      pen.turn(TEST_ANGLE)
      let angle = pen.getAngle();
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
      let angle = pen.getAngle();
      let total = TEST_ANGLE_1 + TEST_ANGLE_2;
      assert.equal(angle, total, 'turn angle not what expected');
      done();
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
  });
});