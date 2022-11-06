'use strict';

var assert = require('assert');

const factory = require('..');

describe('pen-turtle', function () {
  context('smoke test', function () {
    it('should return object', function (done) {
      let pen = factory();
      assert.deepEqual(pen,{});
      done();
    });
  });
});