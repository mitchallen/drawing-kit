/**
    Module: @mitchallen/fuse-svg-path
      Test: smoke-test-factory
    Author: Mitch Allen
*/

"use strict";

const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
var assert = require('node:assert/strict'),
    modulePath = "../index-factory";

describe('module factory smoke test', function() {

    var _factory = null;

    before(function() {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
    });

    after(function() {
        // Call after all tests
    });

    beforeEach(function() {
        // Call before each test
    });

    afterEach(function() {
        // Call after eeach test
    });

    it('module should exist', function() {
        assert.ok(_factory != null);
    })

    it('create method with no spec should return null', function() {
        var obj = _factory.create();
        assert.ok(obj == null);
    });

    it('create method with spec should return object', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
    });

    it('health method should return ok', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
        assert.deepStrictEqual(obj.health(), "OK");
    });

    it('fuse method should return fused path', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
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
        assert.ok(result != null);
        assert.deepStrictEqual(result, expected);
    });


    it('removeDupes method should remove dupes', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
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
        assert.ok(result != null);
        assert.deepStrictEqual(result, expected);
    });

});
