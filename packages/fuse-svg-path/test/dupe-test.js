/**
    Module: @mitchallen/fuse-svg-path
      Test: fuse-test
    Author: Mitch Allen
*/

"use strict";

const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
var assert = require('node:assert/strict'),
    modulePath = "../index-factory";

describe('removeDupes method', function() {

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

    it('should remove dupes', function() {
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
                { op: "L", x: 25, y: 35 },
                { op: "M", x: 50, y: 55 },
                { op: "L", x: 50, y: 55 },
                { op: "L", x: 60, y: 65 }
            ]
        };
        let expected = [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 25, y: 35 },
            { op: "M", x: 50, y: 55 },
            { op: "L", x: 60, y: 65 }
        ];
        var fused = obj.fuse(options);
        var result = obj.removeDupes( { path: fused } );
        assert.ok(result != null);
        assert.deepStrictEqual(result, expected);
    });

    
    it('should remove multiple dupes in a series', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 10, y: 20 },
                { op: "L", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
                { op: "L", x: 25, y: 35 },
                { op: "L", x: 25, y: 35 },
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
    

    it('should only remove dupes in current path segment', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y: 15 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 15, y: 15 },
                { op: "L", x: 50, y: 60 },
            ]
        };
        let expected = [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y: 15 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 15, y: 15 },
                { op: "L", x: 50, y: 60 },
        ];
        var fused = obj.fuse(options);
        var result = obj.removeDupes( { path: fused } );
        assert.ok(result != null);
        assert.deepStrictEqual(result, expected);
    });

    it('should not remove dupe if segment length would be one', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y: 15 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
            ]
        };
        let expected = [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y: 15 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
        ];
        var fused = obj.fuse(options);
        var result = obj.removeDupes( { path: fused } );
        assert.ok(result != null);
        assert.deepStrictEqual(result, expected);
    });

    it('should not remove dupe if segment length would be one', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y: 15 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
            ]
        };
        let expected = [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y: 15 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
        ];
        var fused = obj.fuse(options);
        var result = obj.removeDupes( { path: fused } );
        assert.ok(result != null);
        assert.deepStrictEqual(result, expected);
    });

    it('should not remove dupe if segment length would be one', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y: 15 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
            ]
        };
        let expected = [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 15, y: 15 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 30, y: 40 },
        ];
        var fused = obj.fuse(options);
        var result = obj.removeDupes( { path: fused } );
        assert.ok(result != null);
        assert.deepStrictEqual(result, expected);
    });

    it('should not change single point segments', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "M", x: 30, y: 40 }
            ]
        };
        let expected = [
                { op: "M", x: 10, y: 20 },
                { op: "M", x: 30, y: 40 }
        ];
        var fused = obj.fuse(options);
        var result = obj.removeDupes( { path: fused } );
        assert.ok(result != null);
        assert.deepStrictEqual(result, expected);
    });

    it('should not change single point segments even if they match', function() {
        var obj = _factory.create({});
        assert.ok(obj != null);
        let options = {
            verbose: false,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "M", x: 10, y: 20 }
            ]
        };
        let expected = [
                { op: "M", x: 10, y: 20 },
                { op: "M", x: 10, y: 20 }
        ];
        // Note that if fuse was called first, it would combine them.
        var result = obj.removeDupes( options );
        assert.ok(result != null);
        assert.deepStrictEqual(result, expected);
    });

});
