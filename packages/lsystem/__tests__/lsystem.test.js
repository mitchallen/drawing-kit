'use strict';

const factory = require('..');
const penTurtleFactory = require('@mitchallen/pen-turtle');
const svgFactory = require("@mitchallen/pen-svg");
const assert = require('assert').strict;

describe('lsystem', function () {
    context('smoke test', function () {
        it('should return object', function (done) {
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            done();
        });
        context('turtle property', function () {
            it('should have turtle property', function (done) {
                let lsys = factory.create();
                assert.ok(lsys, 'lsys should not be null');
                assert.ok(lsys.turtle, 'lsys.turtle should not be null');
                done();
            });
        });
        context('distance property', function () {
            it('should have distance property', function (done) {
                let TEST_DEFAULT_DISTANCE = 1;
                let lsys = factory.create();
                assert.ok(lsys, 'lsys should not be null');
                assert.ok(lsys.distance, 'lsys.distance should not be null');
                assert.equal(lsys.distance, TEST_DEFAULT_DISTANCE, 'lsys.distance default not expected')
                done();
            });
        });
        context('depth property', function () {
            it('should have depth property', function (done) {
                let TEST_DEFAULT_DEPTH = 1;
                let lsys = factory.create();
                assert.ok(lsys, 'lsys should not be null');
                assert.ok(lsys.depth, 'lsys.depth should not be null');
                assert.equal(lsys.depth, TEST_DEFAULT_DEPTH, 'lsys.depth default not expected')
                done();
            });
        });
        context('depthRatio property', function () {
            it('should have depthRatio property', function (done) {
                let TEST_DEFAULT_DEPTH_RATIO = 1.0;
                let lsys = factory.create();
                assert.ok(lsys, 'lsys should not be null');
                assert.ok(lsys.depthRatio, 'lsys.depthRatio should not be null');
                assert.equal(lsys.depthRatio, TEST_DEFAULT_DEPTH_RATIO, 'lsys.depthRatio default not expected')
                done();
            });
        });
        context('angle property', function () {
            it('should have angle property', function (done) {
                let TEST_DEFAULT_ANGLE = 0;
                let lsys = factory.create();
                assert.ok(lsys, 'lsys should not be null');
                assert.equal(lsys.angle, TEST_DEFAULT_ANGLE, 'lsys.angle default not expected')
                done();
            });
        });
        context('axiom property', function () {
            it('should have axiom property', function (done) {
                let TEST_DEFAULT_AXIOM = "";
                let lsys = factory.create();
                assert.ok(lsys, 'lsys should not be null');
                assert.equal(lsys.axiom, TEST_DEFAULT_AXIOM, 'lsys.axiom default not expected')
                done();
            });
        });
        context('addRule method', function () {
            it('should have addRule method', function (done) {
                let lsys = factory.create();
                assert.ok(lsys, 'lsys should not be null');
                assert.ok(lsys.addRule, 'lsys.addRule method should not be null');
                done();
            });
        });
        context('run method', function () {
            it('should have run method', function (done) {
                let lsys = factory.create();
                assert.ok(lsys, 'lsys should not be null');
                assert.ok(lsys.run, 'lsys.run method should not be null');
                done();
            });
        });
    });

    context('write to svg', function () {
        it('should create koch.island', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({
                color: 0x000000,
                width: 1,
            });
            // turtle.home();
            // setup lsystem
            lsys.turtle = turtle;
            lsys.distance = 4;
            lsys.depth = 4;
            lsys.angle = 60;
            lsys.addRule("F", "F-F++F-F");
            lsys.axiom = "F++F++F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0x000000,
                        fill: 0xFF0000,
                        width: 1,
                        transform: {
                            scale: { x: 2.0, y: 2.0 },
                            translate: { x: 140, y: 400 },
                        }
                    });
            let file = 'kock-island'
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
        it('should create sierpinski.gasket', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({
                color: 0x000000,
                width: 1,
            });
            // turtle.home();
            // setup lsystem
            lsys.turtle = turtle;
            lsys.distance = 12;
            lsys.depth = 5;
            lsys.angle = 60;
            lsys
                .addRule("F", "F--F--F--GG")
                .addRule("G", "GG")
                .axiom = "F--F--F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0x000000,
                        fill: 0xFF0000,
                        width: 1,
                        transform: {
                            scale: { x: 2.0, y: 2.0 },
                            translate: { x: 400, y: 400 },
                        }
                    });
            let file = 'sierpinski-gasket'
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
        it('should create penrose.snowflake', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({
                color: 0x000000,
                width: 1,
            });
            // turtle.home();
            // setup lsystem
            lsys.turtle = turtle;
            lsys.distance = 5;
            lsys.depth = 4;
            lsys.angle = 18;
            lsys
                .addRule("F", "F4-F4-F10-F++F4-F")
                .axiom = "F4-F4-F4-F4-F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0x000000,
                        fill: 0xFF0000,
                        width: 1,
                        transform: {
                            scale: { x: 2.0, y: 2.0 },
                            translate: { x: 400, y: 400 },
                        }
                    });
            let file = 'penrose-snowflake'
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
        it('should create dragon.curve', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({
                color: 0x000000,
                width: 1,
            });
            // turtle.home();
            // setup lsystem
            lsys.turtle = turtle;
            lsys.distance = 7;
            lsys.depth = 10;
            lsys.angle = 45;
            lsys
                .addRule("F", "[+F][+G--G4-F]")
                .addRule("G", "-G++G-")
                .axiom = "F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0xFF0000,
                        fill: 0xFF0000,
                        width: 1,
                        transform: {
                            scale: { x: 2.5, y: 2.5 },
                            translate: { x: 150, y: 300 },
                        }
                    });
            let file = 'dragon-curve'
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
    });
});
