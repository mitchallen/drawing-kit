/**
    Module: @mitchallen/demand
      Test: smoke-test
    Author: Mitch Allen
*/

"use strict";

var demand = require('../index'),
    should = require('should');

describe('demand module', function() {

    it('notNull should throw an error if object is null', function(done) {

        var trigger = function() {
            demand.notNull(null,"This should throw an error.");
        };

        should.throws(trigger);

        done();
    });

    it('notNull should not throw an error if object exists', function(done) {

        var obj = {};

        demand.notNull(obj,"This should NOT throw an error.");
   
        done();
    });

    it('notNull should not throw an error if object equals zero (0)', function(done) {

        var value = 0;

        demand.notNull(value,"This should NOT throw an error.");
   
        done();
    });

    it('notError should throw an exception if error object exists', function(done) {

        var trigger = function() {
            var err = new Error("This should throw an error.");
            demand.notError(err);
        };

        should.throws(trigger);

        done();
    });

    it('notError should throw an error if error object is null', function(done) {

        demand.notError(null);

        done();
    });

});