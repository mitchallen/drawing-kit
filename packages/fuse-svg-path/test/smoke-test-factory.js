/**
    Module: @mitchallen/fuse-svg-path
      Test: smoke-test-factory
    Author: Mitch Allen
*/

"use strict";

var should = require('should'),
    modulePath = "../index-factory";

describe('module factory smoke test', function() {

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

    it('module should exist', function(done) {
        should.exist(_factory);
        done();
    })

    it('create method with no spec should return null', function(done) {
        var obj = _factory.create();
        should.not.exist(obj);
        done();
    });

    it('create method with spec should return object', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        done();
    });

    it('health method should return ok', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        obj.health().should.eql("OK");
        done();
    });

    it('fuse method should return fused path', function(done) {
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


    it('removeDupes method should remove dupes', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
                { op: "L", x: 25, y: 35 }
            ]
        };
        let expected = [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 25, y: 35 }
        ];
        var fused = obj.fuse(options);
        var result = obj.removeDupes( { path: fused } );
        should.exist(result);
        result.should.eql(expected);
        done();
    });

});
