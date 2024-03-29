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
            let turtle = penTurtleFactory.create({});
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
        it('should create koch.island factory init', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            // setup turtle
            let turtle = penTurtleFactory.create({});
            // init via factory:
            let lsys = factory.create({
                turtle,
                distance: 4,
                depth: 4,
                angle: 60,
                rule: {
                    "F": "F-F++F-F"
                },
                axiom: "F++F++F",
            });
            assert.ok(lsys, 'lsys should not be null');
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0x000000,
                        fill: 0x00FF00,
                        width: 1,
                        transform: {
                            scale: { x: 2.0, y: 2.0 },
                            translate: { x: 140, y: 400 },
                        }
                    });
            let file = 'kock-island-2'
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
            let turtle = penTurtleFactory.create({});
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
            let turtle = penTurtleFactory.create({});
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
        it('should create two.ys', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({});
            // setup lsystem
            lsys.turtle = turtle;
            lsys.turtle.up();   // start with penup
            lsys.distance = 2;
            lsys.depth = 9;
            lsys.depthRatio = 0.65; // depth ratio
            lsys.angle = 45;
            lsys
                .addRule("F", "|[+F][-F]")
                .axiom = "[F]4-F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0xFF0000,
                        width: 1,
                        transform: {
                            scale: { x: 2.5, y: 2.5 },
                            translate: { x: 150, y: 200 },
                        }
                    });
            let file = 'two-ys'
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
        it('should create big.h', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({});
            // setup lsystem
            lsys.turtle = turtle;
            lsys.turtle.up();   // start with penup
            lsys.distance = 2;
            lsys.depth = 10;
            lsys.depthRatio = 0.65; // depth ratio
            lsys.angle = 90;
            lsys
                .addRule("F", "|[+F][-F]")
                .axiom = "[F]--F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0xFF0000,
                        width: 1,
                        transform: {
                            scale: { x: 2.5, y: 2.5 },
                            translate: { x: 150, y: 200 },
                        }
                    });
            let file = 'big-h'
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
        it('should create bent.big.h', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({});
            // setup lsystem
            lsys.turtle = turtle;
            lsys.turtle.up();   // start with penup
            lsys.distance = 2;
            lsys.depth = 10;
            lsys.depthRatio = 0.65; // depth ratio
            lsys.angle = 80;
            lsys
                .addRule("F", "|[+F][-F]")
                .axiom = "[F]--F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0xFF0000,
                        width: 1,
                        transform: {
                            scale: { x: 2.5, y: 2.5 },
                            translate: { x: 200, y: 190 },
                        }
                    });
            let file = 'bent-big-h'
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
        it('should create twig', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({});
            // setup lsystem
            lsys.turtle = turtle;
            lsys.turtle.up();   // start with penup
            lsys.distance = 3;
            lsys.depth = 7;
            lsys.depthRatio = 0.5; // depth ratio
            lsys.angle = 20;
            lsys
                .addRule("F", "|[-F][+F]")
                .axiom = "F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0x013220,
                        width: 1,
                        transform: {
                            scale: { x: 2.5, y: 2.5 },
                            translate: { x: 150, y: 400 },
                        }
                    });
            let file = 'twig';
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
        it('should create tree.1', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({});
            // setup lsystem
            lsys.turtle = turtle;
            lsys.turtle.up();   // start with penup
            lsys.distance = 4;
            lsys.depth = 5;
            lsys.depthRatio = 0.5; // depth ratio
            lsys.angle = 20;
            lsys
                .addRule("F", "|[3-F][3+F]|[--F][++F]|F")
                .axiom = "F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0x013220,
                        width: 1,
                        transform: {
                            scale: { x: 2.5, y: 2.5 },
                            translate: { x: 200, y: 400 },
                        }
                    });
            let file = 'tree-1';
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
        it('should create bush.1', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({});
            // setup lsystem
            lsys.turtle = turtle;
            lsys.turtle.up();   // start with penup
            lsys.distance = 7;
            lsys.depth = 4;
            lsys.depthRatio = 0.5; // depth ratio
            lsys.angle = 25;
            lsys
                .addRule("F", "FF+[+F-F-F]-[-F+F+F]")
                .axiom = "F";
            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0x013220,
                        width: 1,
                        transform: {
                            scale: { x: 2.5, y: 2.5 },
                            translate: { x: 200, y: 400 },
                        }
                    });
            let file = 'bush-1';
            let svg = writer.writeSVG({
                width,
                height,
                filename: `__tests__/output/${file}.svg`
            });
            assert.ok(svg);
            done();
        });
        it('should create penrose.tile', function (done) {
            let width = 1024,
                height = 1024;
            let writer = svgFactory.create({});
            let lsys = factory.create();
            assert.ok(lsys, 'lsys should not be null');
            // setup turtle
            let turtle = penTurtleFactory.create({});
            // setup lsystem
            lsys.turtle = turtle;
            lsys.turtle.up();   // start with penup
            lsys.distance = 25;
            lsys.depth = 4;
            lsys.depthRatio = 0.5; // depth ratio
            lsys.angle = 36;

            lsys
                .addRule( "W", "YF++ZF4-XF[-YF4-WF]++" )
                .addRule( "X", "+YF--ZF[3-WF--XF]+" )
                .addRule( "Y", "-WF++XF[+++YF++ZF]-" )
                .addRule( "Z", "--YF++++WF[+ZF++++XF]--XF" )
                .addRule( "F", "" ) // Important!  Or get diff results.
                .axiom = "[X]++[X]++[X]++[X]++[X]";

            lsys.run();
            // write to svg
            writer
                .addPen(lsys.turtle,
                    {
                        color: 0x013220,
                        width: 1,
                        transform: {
                            scale: { x: 2.5, y: 2.5 },
                            translate: { x: 200, y: 200 },
                        }
                    });
            let file = 'penrose-tile';
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
