'use strict';

const factory = require('..');
const assert = require('assert').strict;

describe('lsystem', function () {
    context('smoke test', function () {
        it('should return object', function (done) {
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            done();
        });
    });
});
