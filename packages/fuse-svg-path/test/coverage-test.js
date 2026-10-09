/**
    Module: @mitchallen/fuse-svg-path
      Test: coverage-test
    Author: Mitch Allen
*/

"use strict";

const { describe, it, before, beforeEach, afterEach } = require('node:test');
var assert = require('node:assert/strict'),
    modulePath = "../index-factory";

describe('argument guards and verbose output', function() {

    var _factory = null;
    var _error = console.error;
    var _log = console.log;
    var _logged = [];

    before(function() {
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
    });

    beforeEach(function() {
        // Keep the expected error and verbose output out of the test report.
        _logged = [];
        console.error = function() { _logged.push(Array.from(arguments).join(" ")); };
        console.log = function() { _logged.push(Array.from(arguments).join(" ")); };
    });

    afterEach(function() {
        console.error = _error;
        console.log = _log;
    });

    it('package method should return the package name', function() {
        assert.deepStrictEqual(_factory.create({}).package(), "@mitchallen/fuse-svg-path");
    });

    it('fuse with no options should return null', function() {
        assert.ok(_factory.create({}).fuse() == null);
    });

    it('fuse with no path should return null', function() {
        assert.ok(_factory.create({}).fuse({}) == null);
    });

    it('segmentList with no options should return null', function() {
        assert.ok(_factory.create({}).segmentList() == null);
    });

    it('segmentList with no path should return null', function() {
        assert.ok(_factory.create({}).segmentList({}) == null);
    });

    it('segmentList with an unsupported op after the first record should return null', function() {
        var result = _factory.create({}).segmentList({
            path: [
                { op: "M", x: 0, y: 0 },
                { op: "C", x: 10, y: 10 },
            ]
        });
        assert.ok(result == null);
    });

    it('removeDupes with no options should return null', function() {
        assert.ok(_factory.create({}).removeDupes() == null);
    });

    it('removeDupes with no path should return null', function() {
        assert.ok(_factory.create({}).removeDupes({}) == null);
    });

    it('removeDupes with an invalid path should return null', function() {
        assert.ok((_factory.create({}).removeDupes({ path: [ { op: "L", x: 1, y: 1 } ] })) == null);
    });

    it('fuse with verbose set should log the path lists and still fuse', function() {
        var result = _factory.create({}).fuse({
            verbose: true,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 50, y: 60 },
            ]
        });
        assert.deepStrictEqual(result, [
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 50, y: 60 },
        ]);
        assert.ok(_logged.join("\n").includes("*** ORIGINAL PATH LIST"));
        assert.ok(_logged.join("\n").includes("*** FUSED PATH LIST"));
    });
});
