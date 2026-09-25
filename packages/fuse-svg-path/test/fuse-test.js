/**
    Module: @mitchallen/fuse-svg-path
      Test: fuse-test
    Author: Mitch Allen
*/

"use strict";

var should = require('should'),
    modulePath = "../index-factory";

describe('fuse method', function() {

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

    it('should return fused path', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 25, y: 35 }
            ]
        };
        let expected = [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 25, y: 35 }
        ];
        var result = obj.fuse(options);
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should fuse reversed path', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 25, y: 35 },
                { op: "L", x: 30, y: 40 }
            ]
        };
        let expected = [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 25, y: 35 }
        ];
        var result = obj.fuse(options);
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should return fused path with middle ops', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y:  5 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 50, y: 55 },
                { op: "L", x: 25, y: 35 }
            ]
        };
        let expected = [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 15, y:  5 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 50, y: 55 },
            { op: "L", x: 25, y: 35 }
        ];
        var result = obj.fuse(options);
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should fuse reversed paths with middle ops', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y:  5 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 25, y: 35 },
                { op: "L", x: 50, y: 55 },
                { op: "L", x: 30, y: 40 }
            ]
        };
        let expected = [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 15, y:  5 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 50, y: 55 },
            { op: "L", x: 25, y: 35 }
        ];
        var result = obj.fuse(options);
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should fuse multiple paths', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 25, y: 35 },
                { op: "M", x: 25, y: 35 },
                { op: "L", x: 60, y: 65 }
            ]
        };
        let expected = [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 25, y: 35 },
            { op: "L", x: 60, y: 65 }
        ];
        var result = obj.fuse(options);
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should fuse multiple reversed paths', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 25, y: 35 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 60, y: 65 },
                { op: "L", x: 25, y: 35 }
            ]
        };
        let expected = [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 25, y: 35 },
            { op: "L", x: 60, y: 65 }
        ];
        var result = obj.fuse(options);
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should fuse several paths', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x:  0, y:  5 },
                { op: "L", x: 10, y: 15 },
                { op: "M", x: 10, y: 15 },
                { op: "L", x: 20, y: 25 },
                { op: "M", x: 20, y: 25 },
                { op: "L", x: 30, y: 35 },
                { op: "M", x: 30, y: 35 },
                { op: "L", x: 40, y: 45 },
                { op: "M", x: 40, y: 45 },
                { op: "L", x: 50, y: 55 },
                { op: "M", x: 50, y: 55 },
                { op: "L", x: 60, y: 65 },
                { op: "M", x: 60, y: 65 },
                { op: "L", x: 70, y: 75 }
            ]
        };
        let expected = [
            { op: "M", x:  0, y:  5 },
            { op: "L", x: 10, y: 15 },
            { op: "L", x: 20, y: 25 },
            { op: "L", x: 30, y: 35 },
            { op: "L", x: 40, y: 45 },
            { op: "L", x: 50, y: 55 },
            { op: "L", x: 60, y: 65 },
            { op: "L", x: 70, y: 75 }
        ];
        var result = obj.fuse(options);
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should fuse several shuffled paths', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
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
        let expected = [
            { op: "M", x:  0, y:  5 },
            { op: "L", x: 10, y: 15 },
            { op: "L", x: 20, y: 25 },
            { op: "L", x: 30, y: 35 },
            { op: "L", x: 40, y: 45 },
            { op: "L", x: 50, y: 55 },
            { op: "L", x: 60, y: 65 },
            { op: "L", x: 70, y: 75 }
        ];
        var result = obj.fuse(options);
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should return full non-fused path', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 40, y: 50 },
                { op: "L", x: 60, y: 70 }
            ]
        };
        let expected = [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 30, y: 40 },
            { op: "M", x: 40, y: 50 },
            { op: "L", x: 60, y: 70 }
        ];
        var result = obj.fuse(options);
        should.exist(result);
        result.should.eql(expected);
        done();
    });

});
