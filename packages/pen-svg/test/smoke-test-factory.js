/**
    Module: @mitchallen/pen-svg
      Test: smoke-test-factory
    Author: Mitch Allen
*/

"use strict";

const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
let Chance = require('chance');
let chance = new Chance();

let assert = require('node:assert/strict'),
    penFactory = require("@mitchallen/pen-v2"),
    modulePath = "../index-factory";

describe('module factory smoke test', () => {

    var _factory = null;

    before(() => {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
    });

    after(() => {
        // Call after all tests
    });

    beforeEach(() => {
        // Call before each test
    });

    afterEach(() => {
        // Call after eeach test
    });

    it('module should exist', () => {
        assert.ok(_factory != null);
    })

    it('create method with no spec should return null', () => {
        let obj = _factory.create();
        assert.ok(obj == null);
    });

    it('create method with spec should return object', () => {
        let obj = _factory.create({});
        assert.ok(obj != null);
    });

    it('health method should return ok', () => {
        let obj = _factory.create({});
        assert.ok(obj != null);
        assert.deepStrictEqual(obj.health(), "OK");
    });

    it('package method should return the package name', () => {
        let obj = _factory.create({});
        assert.deepStrictEqual(obj.package(), "@mitchallen/pen-svg");
    });

    it('getSVG with null options should return null', () => {
        let obj = _factory.create({});
        assert.ok(obj.getSVG(null) == null);
    });

    it('getSVG should skip pens with an empty path', () => {
        let obj = _factory.create({});
        obj.addPen(penFactory.create({ color: 0xFF0000 }));
        let svg = obj.getSVG({});
        assert.ok(!svg.includes('<path'));
    });

    it('getSVG should ignore unknown transform keys', () => {
        let obj = _factory.create({});
        let pen = penFactory.create({ color: 0x00FF00 });
        pen.up().goto({ x: 1, y: 2 }).down().goto({ x: 3, y: 4 });
        obj.addPen(pen, { transform: { bogus: { x: 1 }, skewY: { angle: 5 } } });
        let svg = obj.getSVG({});
        assert.ok(svg.includes('transform="skewY(5)"'));
        assert.ok(!svg.includes('bogus'));
    });

    it('getSVG should return svg for a pen', () => {
        let obj = _factory.create({});
        assert.ok(obj != null);

        let pen = penFactory.create({
            color: 0xFF0000,    // red pen
            width: 2,           // pen width 
            alpha: 0.8          // pen alpha value
        });

        pen.up()
            .goto({ x: 10, y: 15 })   // MoveTo 
            .down()
            .goto({ x: 20, y: 25 })   // LineTo 
            .goto({ x: 30, y: 35 })   // LineTo 
            .goto({ x: 40, y: 45 })   // LineTo 
            .up()
            .goto({ x: 50, y: 55 })   // MoveTo 
            .down()
            .goto({ x: 60, y: 65 });   // LineTo 

        obj.addPen(pen);

        let svg = obj.getSVG({});
        // console.log("SVG: \n", svg);
    });

    it('getSVG should return svg for a multiple pens', () => {
        let obj = _factory.create({});
        assert.ok(obj != null);

        let pen1 = penFactory.create({
            color: 0xFF0000,    // red pen
            width: 2,           // pen width 
            alpha: 0.8          // pen alpha value
        });

        let pen2 = penFactory.create({
            color: 0x0000FF,    // blue pen
            width: 4,           // pen width 
            alpha: 0.8          // pen alpha value
        });

        pen1.up()
            .goto({ x: 10, y: 15 })   // MoveTo 
            .down()
            .goto({ x: 20, y: 25 })  // LineTo 
            .goto({ x: 30, y: 35 });  // LineTo 

        pen2.up()
            .goto({ x: 40, y: 45 })   // LineTo 
            .down()
            .goto({ x: 50, y: 55 })   // MoveTo 
            .goto({ x: 60, y: 65 });   // LineTo 

        obj.addPen(pen1)
            .addPen(pen2);

        let svg = obj.getSVG({});
        // console.log("SVG: \n", svg);
    });

    describe('module factory smoke test', () => {

        it('writeSVG should write svg for a multiple pens', () => {
            let obj = _factory.create({});
            assert.ok(obj != null);

            let pen1 = penFactory.create({
                color: 0xFF0000,    // red pen
                width: 2,           // pen width 
                alpha: 0.8          // pen alpha value
            });

            let pen2 = penFactory.create({
                color: 0x0000FF,    // blue pen
                width: 4,           // pen width 
                alpha: 0.8          // pen alpha value
            });

            pen1.up()
                .goto({ x: 10, y: 15 })   // MoveTo 
                .down()
                .goto({ x: 20, y: 25 })   // LineTo 
                .goto({ x: 30, y: 35 });   // LineTo 

            pen2.up()
                .goto({ x: 40, y: 45 })   // LineTo 
                .down()
                .goto({ x: 50, y: 55 })   // MoveTo 
                .goto({ x: 60, y: 65 });   // LineTo 

            obj.addPen(pen1)
                .addPen(pen2);

            let svg = obj.writeSVG({ filename: "test/output/write-test.svg" });
            // console.log("SVG: \n", svg);
        });

        // random

        it('writeSVG should write random svg', () => {
            let obj = _factory.create({});
            assert.ok(obj != null);

            let pen = penFactory.create({
                color: 0xFF0000,    // red pen
                width: 2,           // pen width 
                alpha: 0.8          // pen alpha value
            });

            let xSize = 1024;
            let ySize = 1024;
            let padding = 50;
            let cursor = { x: xSize / 2, y: ySize / 2 };
            let distance = 100;
            let limit = 200;

            pen.up()
                .goto(cursor)
                .down();

            for (let i = 0; i < limit; i++) {
                let c1 = cursor;
                c1.x += chance.integer({ min: -distance, max: distance });
                c1.y += chance.integer({ min: -distance, max: distance });
                if (
                    c1.x > padding
                    && c1.x < (xSize - padding)
                    && c1.y > padding
                    && c1.y < (ySize - padding)
                ) {
                    cursor = c1;
                    pen.goto(cursor);
                }
            }

            obj
                .addPen(pen)
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        width: 5,
                        transform: {
                            translate: {
                                x: 50,
                                y: 50
                            }
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x0000FF,
                        fill: 0x00FF00,
                        transform: {
                            translate: {
                                x: 100,
                                y: 100
                            },
                            scale: {
                                x: 0.5,
                                y: 0.5
                            },
                        }
                    })

            let svg = obj.writeSVG({
                width: 1024,
                height: 1024,
                filename: "test/output/random-test.svg"
            });
            // console.log("SVG: \n", svg);
        });

        it('writeSVG should respect transform order', () => {
            let obj = _factory.create({});
            assert.ok(obj != null);

            let pen = penFactory.create({
                color: 0xFF0000,    // red pen
                width: 2,           // pen width 
                alpha: 0.8          // pen alpha value
            });

            let xSize = 1024;
            let ySize = 1024;
            let padding = 50;
            let cursor = { x: 0, y: 0 };
            let distance = 100;
            let limit = 5;

            let path = [
                { x: cursor.x - 50, y: cursor.y - 50 },
                { x: cursor.x + 50, y: cursor.y - 50 },
                { x: cursor.x + 0, y: cursor.y + 50 },
                cursor,
            ];

            pen.up()
                .goto(cursor)
                .down();

            for (let point of path) {
                pen.goto(point);
            }

            obj
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0x00FFFF,
                        transform: {
                            translate: {
                                x: xSize / 2,
                                y: ySize / 2
                            },
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0x00FF00,
                        transform: {
                            rotate: {
                                angle: 30,
                            },
                            translate: {
                                x: xSize / 2,
                                y: ySize / 2
                            },
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0xFF00FF,
                        transform: {
                            rotate: {
                                angle: 60,
                                x: xSize / 2,
                                y: ySize / 2
                            },
                            translate: {
                                x: xSize / 2,
                                y: ySize / 2
                            },
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0xFFFF00,
                        transform: {
                            rotate: {
                                angle: 60,
                                x: xSize * 0.75,
                                y: ySize * 0.25
                            },
                            translate: {
                                x: xSize / 2,
                                y: ySize / 2
                            },
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0x00FF00,
                        transform: {
                            translate: {
                                x: xSize / 2,
                                y: ySize / 2
                            },
                            rotate: {
                                angle: 30,
                            },
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0xFF0000,
                        transform: {
                            translate: {
                                x: xSize / 3,
                                y: ySize / 3
                            },
                            scale: {
                                x: 2.0,
                                y: 2.0
                            },
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0x0000FF,
                        transform: {
                            scale: {
                                x: 2.0,
                                y: 2.0
                            },
                            translate: {
                                x: xSize / 3,
                                y: ySize / 3
                            },
                            rotate: {
                                angle: 180,
                            },
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0xCCCCCC,
                        transform: {
                            translate: {
                                x: xSize * 0.2,
                                y: ySize / 6
                            }
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0xCCCCCC,
                        transform: {
                            translate: {
                                x: xSize * 0.4,
                                y: ySize / 6
                            },
                            skewX: {
                                angle: 30,
                            },
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0xCCCCCC,
                        transform: {
                            translate: {
                                x: xSize * 0.6,
                                y: ySize / 6
                            },
                            skewY: {
                                angle: 30,
                            },
                        }
                    })
                .addPen(
                    pen,
                    {
                        color: 0x000000,
                        fill: 0xCCCCCC,
                        transform: {
                            translate: {
                                x: xSize * 0.8,
                                y: ySize / 6
                            },
                            skewX: {
                                angle: 30,
                            },
                            skewY: {
                                angle: 30,
                            },
                        }
                    })

            let svg = obj.writeSVG({
                width: 1024,
                height: 1024,
                filename: "test/output/transform-test.svg"
            });
            // console.log("SVG: \n", svg);
        });

    });

});
