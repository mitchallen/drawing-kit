/**
    Module: @mitchallen/fuse-svg-path
      Test: error-test
    Author: Mitch Allen
*/

"use strict";

var should = require('should'),
    modulePath = "../index-factory";

describe('fuse method error', function() {

    var _factory = null;

    before(function(done) {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
        done();
    });

    after(function(done) {
        // Call after all tests
        done();
    });

    beforeEach(function(done) {
        // Call before each test
        done();
    });

    afterEach(function(done) {
        // Call after eeach test
        done();
    });

    it('with maxSafety set to 1 for complex path should return null', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            maxValve: 1,
            path: [
                { op: "M", x:  0, y:  5 },
                { op: "L", x: 10, y: 15 },
                { op: "M", x: 50, y: 55 },
                { op: "L", x: 60, y: 65 },
                { op: "M", x: 30, y: 35 },
                { op: "L", x: 40, y: 45 },
                { op: "M", x: 40, y: 45 },
                { op: "L", x: 50, y: 55 },
                { op: "M", x: 10, y: 15 },
                { op: "L", x: 20, y: 25 },
                { op: "M", x: 60, y: 65 },
                { op: "L", x: 70, y: 75 },
                { op: "M", x: 20, y: 25 },
                { op: "L", x: 30, y: 35 },
            ]
        };
        var result = obj.fuse(options);
        should.not.exist(result);
        done();
    });

    it('with bad op should return null', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "X", x: 10, y: 20 },
            ]
        };
        var result = obj.fuse(options);
        should.not.exist(result);
        done();
    });

    it('with no op should return null', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { x: 10, y: 20 },
            ]
        };
        var result = obj.fuse(options);
        should.not.exist(result);
        done();
    });

    it('with no x property should return null', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", y: 20 },
            ]
        };
        var result = obj.fuse(options);
        should.not.exist(result);
        done();
    });

    it('with no y property should return null', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10 },
            ]
        };
        var result = obj.fuse(options);
        should.not.exist(result);
        done();
    });

    it('path must start with a move (op = M) record', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "L", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 25, y: 35 }
            ]
        };
        var result = obj.fuse(options);
        should.not.exist(result);
        done();
    });
});
