/**
    Module: @mitchallen/fuse-svg-path
      Test: coverage-test
    Author: Mitch Allen
*/

"use strict";

var should = require('should'),
    modulePath = "../index-factory";

describe('argument guards and verbose output', function() {

    var _factory = null;
    var _error = console.error;
    var _log = console.log;
    var _logged = [];

    before(function(done) {
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
        done();
    });

    beforeEach(function(done) {
        // Keep the expected error and verbose output out of the test report.
        _logged = [];
        console.error = function() { _logged.push(Array.from(arguments).join(" ")); };
        console.log = function() { _logged.push(Array.from(arguments).join(" ")); };
        done();
    });

    afterEach(function(done) {
        console.error = _error;
        console.log = _log;
        done();
    });

    it('package method should return the package name', function(done) {
        _factory.create({}).package().should.eql("@mitchallen/fuse-svg-path");
        done();
    });

    it('fuse with no options should return null', function(done) {
        should.not.exist(_factory.create({}).fuse());
        done();
    });

    it('fuse with no path should return null', function(done) {
        should.not.exist(_factory.create({}).fuse({}));
        done();
    });

    it('segmentList with no options should return null', function(done) {
        should.not.exist(_factory.create({}).segmentList());
        done();
    });

    it('segmentList with no path should return null', function(done) {
        should.not.exist(_factory.create({}).segmentList({}));
        done();
    });

    it('segmentList with an unsupported op after the first record should return null', function(done) {
        var result = _factory.create({}).segmentList({
            path: [
                { op: "M", x: 0, y: 0 },
                { op: "C", x: 10, y: 10 },
            ]
        });
        should.not.exist(result);
        done();
    });

    it('removeDupes with no options should return null', function(done) {
        should.not.exist(_factory.create({}).removeDupes());
        done();
    });

    it('removeDupes with no path should return null', function(done) {
        should.not.exist(_factory.create({}).removeDupes({}));
        done();
    });

    it('removeDupes with an invalid path should return null', function(done) {
        should.not.exist(_factory.create({}).removeDupes({ path: [ { op: "L", x: 1, y: 1 } ] }));
        done();
    });

    it('fuse with verbose set should log the path lists and still fuse', function(done) {
        var result = _factory.create({}).fuse({
            verbose: true,
            path: [
                { op: "M", x: 10, y: 20 },
                { op: "L", x: 30, y: 40 },
                { op: "M", x: 30, y: 40 },
                { op: "L", x: 50, y: 60 },
            ]
        });
        result.should.eql([
            { op: "M", x: 10, y: 20 },
            { op: "L", x: 30, y: 40 },
            { op: "L", x: 50, y: 60 },
        ]);
        _logged.join("\n").should.containEql("*** ORIGINAL PATH LIST");
        _logged.join("\n").should.containEql("*** FUSED PATH LIST");
        done();
    });
});
