/**
    Module: @mitchallen/fuse-svg-path
      Test: fuse-test
    Author: Mitch Allen
*/

"use strict";

var should = require('should'),
    modulePath = "../index-factory";

describe('removeDupes method', function() {

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

    it('should remove dupes', function(done) {
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
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    
    it('should remove multiple dupes in a series', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
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
        should.exist(result);
        result.should.eql(expected);
        done();
    });
    

    it('should only remove dupes in current path segment', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
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
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should not remove dupe if segment length would be one', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
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
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should not remove dupe if segment length would be one', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
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
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should not remove dupe if segment length would be one', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
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
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should not change single point segments', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
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
        should.exist(result);
        result.should.eql(expected);
        done();
    });

    it('should not change single point segments even if they match', function(done) {
        var obj = _factory.create({});
        should.exist(obj);
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
        should.exist(result);
        result.should.eql(expected);
        done();
    });

});
