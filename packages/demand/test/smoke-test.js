/**
    Module: @mitchallen/demand
      Test: smoke-test
    Author: Mitch Allen
*/

"use strict";

const { describe, it } = require('node:test');
var demand = require('../index'),
    assert = require('node:assert/strict');

describe('demand module', function() {

    it('notNull should throw an error if object is null', function() {

        var trigger = function() {
            demand.notNull(null,"This should throw an error.");
        };

        assert.throws(trigger);

    });

    it('notNull should not throw an error if object exists', function() {

        var obj = {};

        demand.notNull(obj,"This should NOT throw an error.");
   
    });

    it('notNull should not throw an error if object equals zero (0)', function() {

        var value = 0;

        demand.notNull(value,"This should NOT throw an error.");
   
    });

    it('notError should throw an exception if error object exists', function() {

        var trigger = function() {
            var err = new Error("This should throw an error.");
            demand.notError(err);
        };

        assert.throws(trigger);

    });

    it('notError should throw an error if error object is null', function() {

        demand.notError(null);

    });

});