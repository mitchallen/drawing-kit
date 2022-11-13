'use strict';

var assert = require('assert');

const factory = require('..');
const svgFactory = require("@mitchallen/pen-svg");

describe('pen-turtle', function () {
  context('smoke test', function () {
    it('should return object', function (done) {
      let pen = factory.create();
      assert.ok(pen, 'pen should not be null');
      done();
    });
    it('should have color method', function (done) {
      let TEST_DEFAULT_COLOR = 0x000000,
        pen = factory.create(),
        color = pen.color();
      assert.equal(color, TEST_DEFAULT_COLOR, 'default getColor method return not what expected');
      done();
    });
    it('getColor method should return color', function (done) {
      let TEST_COLOR = 0xFF0000,
        pen = factory.create({
          color: TEST_COLOR,
        });
      let color = pen.color();
      assert.equal(color, TEST_COLOR, 'color method did not returne expected');
      done();
    });
    it('should have path method', function (done) {
      let TEST_DEFAULT_PATH = [],
        pen = factory.create(),
        path = pen.path();
      assert.deepEqual(path, TEST_DEFAULT_PATH, 'default path method return not what expected');
      done();
    });
    context('x method', function () {
      it('should have x method', function (done) {
        let TEST_DEFAULT_X = 0,
          pen = factory.create(),
          x = pen.x();
        assert.equal(x, TEST_DEFAULT_X, 'default x method return not what expected');
        done();
      });
      it('should return create parameter', function (done) {
        let TEST_X = 25,
          pen = factory.create({
            x: TEST_X,
          }),
          x = pen.x();
        assert.equal(x, TEST_X, 'x method should return create parameter');
        done();
      });
      it('should change after move', function (done) {
        let TEST_X = 25,
          pen = factory.create();
        pen
          .right(90)
          .forward(TEST_X);
        let x = pen.x();
        assert.equal(x, TEST_X, 'x method not what expected');
        done();
      });
    });
    context('y method', function () {
      it('should have y method', function (done) {
        let TEST_DEFAULT_Y = 0,
          pen = factory.create(),
          y = pen.y();
        assert.equal(y, TEST_DEFAULT_Y, 'default y method return not what expected');
        done();
      });
      it('should return create parameter', function (done) {
        let TEST_Y = 25,
          pen = factory.create({
            y: TEST_Y,
          }),
          y = pen.y();
        assert.equal(y, TEST_Y, 'y method should return create parameter');
        done();
      });
      it('should change after move', function (done) {
        let TEST_Y = 25,
          pen = factory.create();
        pen
          .forward(TEST_Y);
        let y = pen.y(),
          expected = 0 - TEST_Y;
        assert.equal(y, expected, 'y method not what expeted');
        done();
      });
    });
    context('heading method', function () {
      it('should have heading method', function (done) {
        let TEST_DEFAULT_HEADING = 0,
          pen = factory.create(),
          heading = pen.heading();
        assert.equal(heading, TEST_DEFAULT_HEADING, 'default heading method return not what expected');
        done();
      });
      it('create should normalize heading', function (done) {
        let list = [
          { input: 0, expected: 0 },
          { input: 1, expected: 1 },
          { input: 359, expected: 359 },
          { input: 360, expected: 0 },
          { input: 361, expected: 1 },
          { input: -1, expected: 359 },
        ];
        for (let el of list) {
          // console.log(el);
          let pen = factory.create({
            heading: el.input,
          });
          let heading = pen.heading();
          assert.equal(heading, el.expected, 'default heading method return not what expected');
        }
        done();
      });
      it('turn should normalize heading', function (done) {
        let list = [
          { input: 0, expected: 0 },
          { input: 1, expected: 1 },
          { input: 359, expected: 359 },
          { input: 360, expected: 0 },
          { input: 361, expected: 1 },
          { input: -1, expected: 359 },
        ];
        for (let el of list) {
          // console.log(el);
          let pen = factory.create({});
          pen.turn(el.input)
          let heading = pen.heading();
          assert.equal(heading, el.expected, 'default heading method return not what expected');
        }
        done();
      });
    });

    context('stack', function () {
      context('push', function () {
        it('should have push method', function (done) {
          let pen = factory.create();
          assert.ok(pen.push, 'push method not found');
          pen.push();
          done();
        });
      });
      context('pop', function () {
        it('should have pop method', function (done) {
          let pen = factory.create();
          assert.ok(pen.pop, 'pop method not found');
          pen.push();
          pen.pop()
          done();
        });
        it('should do nothing if no push first', function (done) {
          let pen = factory.create();
          assert.ok(pen.pop, 'pop method not found');
          pen.pop()
          done();
        });
        it('should restore position if not moved', function (done) {
          let TEST_X = 30,
              TEST_Y = 45,
              TEST_HEADING = 60,
              TEST_DOWN = false;
          let pen = factory.create({
            x: TEST_X,
            y: TEST_Y,
            heading: TEST_HEADING,
            down: TEST_DOWN,
          });
          assert.ok(pen.pop, 'pop method not found');
          pen
            .push()
            .pop();
          assert.equal(pen.x(), TEST_X, 'x not what expected after pop');
          assert.equal(pen.y(), TEST_Y, 'y not what expected after pop');
          assert.equal(pen.heading(), TEST_HEADING, 'heading not what expected after pop');
          assert.equal(pen.isDown(), TEST_DOWN, 'isDown not what expected after pop');
          done();
        });
        it('should restore position if moved', function (done) {
          let TEST_X = 30,
              TEST_Y = 45,
              TEST_HEADING = 60,
              TEST_DOWN = false;
          let pen = factory.create({
            x: TEST_X,
            y: TEST_Y,
            heading: TEST_HEADING,
            down: TEST_DOWN,
          });
          assert.ok(pen.pop, 'pop method not found');
          pen
            .push()
            .turn(60)
            .forward(20)
            .pop();
          assert.equal(pen.x(), TEST_X, 'x not what expected after pop');
          assert.equal(pen.y(), TEST_Y, 'y not what expected after pop');
          assert.equal(pen.heading(), TEST_HEADING, 'heading not what expected after pop');
          assert.equal(pen.isDown(), TEST_DOWN, 'isDown not what expected after pop');
          done();
        });
      })
      context('isStackEmtpty', function () {
        it('should have isStackEmtpty method', function (done) {
          let TEST_DEFAULT = true;
          let pen = factory.create();
          assert.ok(pen.isStackEmpty, 'isStackEmtpy method not found');
          assert.equal(pen.isStackEmpty(), TEST_DEFAULT,'default isStackEmpty not what expected' );
          done();
        });
        it('should be false after push', function (done) {
          let TEST_EXPECTED = false;
          let pen = factory.create();
          assert.ok(pen.isStackEmpty, 'isStackEmtpy method not found');
          pen.push();
          assert.equal(pen.isStackEmpty(), TEST_EXPECTED,'isStackEmpty should be false after push' );
          done();
        });
        it('should be true after push pop balance', function (done) {
          let TEST_EXPECTED = true;
          let pen = factory.create();
          assert.ok(pen.isStackEmpty, 'isStackEmtpy method not found');
          pen.push();
          pen.pop();
          assert.equal(pen.isStackEmpty(), TEST_EXPECTED,'isStackEmpty should be true after push pop' );
          done();
        });
        it('should be true after unbalanced pop', function (done) {
          let TEST_EXPECTED = true;
          let pen = factory.create();
          assert.ok(pen.isStackEmpty, 'isStackEmtpy method not found');
          pen.pop();
          assert.equal(pen.isStackEmpty(), TEST_EXPECTED,'isStackEmpty should be true after push pop' );
          done();
        });
      });

    });

    context('home method', function () {
      it('should have home method', function (done) {
        let TEST_DEFAULT_X = 0,
          TEST_DEFAULT_Y = 0,
          TEST_DEFAULT_HEADING = 0,
          pen = factory.create();
        pen.home();
        let x = pen.x(),
          y = pen.y(),
          heading = pen.heading();
        assert.equal(x, TEST_DEFAULT_X, 'home method should reset x');
        assert.equal(y, TEST_DEFAULT_Y, 'home method should reset y');
        assert.equal(heading, TEST_DEFAULT_HEADING, 'home method should reset heading');
        done();
      });
      it('should reset to create parameters', function (done) {
        let TEST_X = 20,
          TEST_Y = 25,
          TEST_HEADING = 30,
          pen = factory.create({
            x: TEST_X,
            y: TEST_Y,
            heading: TEST_HEADING,
          });
        pen.home();
        let x = pen.x(),
          y = pen.y(),
          heading = pen.heading();
        assert.equal(x, TEST_X, 'home method should reset x to create parameter');
        assert.equal(y, TEST_Y, 'home method should reset y to create parameter');
        assert.equal(heading, TEST_HEADING, 'home method should reset heading to create parameter');
        done();
      });
      it('should reset heading after moving', function (done) {
        let TEST_DEFAULT_X = 0,
          TEST_DEFAULT_Y = 0,
          TEST_DEFAULT_HEADING = 0,
          pen = factory.create();
        pen
          .forward(100)
          .right(30)
          .left(60)
          .home();
        let x = pen.x(),
          y = pen.y(),
          heading = pen.heading();
        assert.equal(x, TEST_DEFAULT_X, 'home method should reset x');
        assert.equal(y, TEST_DEFAULT_Y, 'home method should reset y');
        assert.equal(heading, TEST_DEFAULT_HEADING, 'home method should reset heading');
        done();
      });
      it('should reset heading to create parameter after moving', function (done) {
        let TEST_X = 20,
          TEST_Y = 25,
          TEST_HEADING = 30,
          pen = factory.create({
            x: TEST_X,
            y: TEST_Y,
            heading: TEST_HEADING,
          });
        pen
          .forward(100)
          .right(30)
          .left(60)
          .home();
        let x = pen.x(),
          y = pen.y(),
          heading = pen.heading();
        assert.equal(x, TEST_X, 'home method should reset x to create parameter');
        assert.equal(y, TEST_Y, 'home method should reset y to create parameter');
        assert.equal(heading, TEST_HEADING, 'home method should reset heading to create parameter');
        done();
      });
    });
    context('turn method', function () {
      it('should have turn method', function (done) {
        let TEST_ANGLE = 30,
          pen = factory.create();
        pen.turn(TEST_ANGLE)
        let heading = pen.heading(),
          expected = TEST_ANGLE;
        assert.equal(heading, expected, 'turn heading not what expected');
        done();
      });
      it('turn method should increment heading', function (done) {
        let TEST_ANGLE_1 = 30,
          TEST_ANGLE_2 = 15,
          pen = factory.create();
        pen
          .turn(TEST_ANGLE_1)
          .turn(TEST_ANGLE_2);
        let heading = pen.heading(),
          expected = (TEST_ANGLE_1 + TEST_ANGLE_2);
        assert.equal(heading, expected, 'turn heading not what expected');
        done();
      });
    });
    context('left method', function () {
      it('should have left method', function (done) {
        let TEST_ANGLE = 30,
          pen = factory.create();
        pen.left(TEST_ANGLE)
        let heading = pen.heading(),
          expected = TEST_ANGLE;
        assert.equal(heading, expected, 'left angle not what expected');
        done();
      });
      it('left method should decrement angle', function (done) {
        let TEST_ANGLE_1 = 30,
          TEST_ANGLE_2 = 15,
          pen = factory.create();
        pen
          .left(TEST_ANGLE_1)
          .left(TEST_ANGLE_2);
        let heading = pen.heading(),
          expected = TEST_ANGLE_1 + TEST_ANGLE_2;
        assert.equal(heading, expected, 'left angle not what expected');
        done();
      });
    });
    context('right method', function () {
      it('should have right method', function (done) {
        let TEST_ANGLE = 30,
          pen = factory.create();
        pen.right(TEST_ANGLE)
        let heading = pen.heading(),
          expected = (360 - TEST_ANGLE);
        assert.equal(heading, expected, 'right angle not what expected');
        done();
      });
      it('right method should decrement angle', function (done) {
        let TEST_ANGLE_1 = 30,
          TEST_ANGLE_2 = 15,
          pen = factory.create();
        pen
          .right(TEST_ANGLE_1)
          .right(TEST_ANGLE_2);
        let heading = pen.heading(),
          expected = 360 - (TEST_ANGLE_1 + TEST_ANGLE_2);
        assert.equal(heading, expected, 'right angle not what expected');
        done();
      });
    });
    it('should have isDown method', function (done) {
      let TEST_DEFAULT_IS_DOWN = false,
        pen = factory.create(),
        flag = pen.isDown();
      assert.equal(flag, TEST_DEFAULT_IS_DOWN, 'default isDown method return not what expected');
      done();
    });
    it('should have down method', function (done) {
      let pen = factory.create();
      pen.down();
      let flag = pen.isDown();
      assert.equal(flag, true, 'down method should cause isDown to be true');
      done();
    });
    it('should have up method', function (done) {
      let pen = factory.create();
      pen.up();
      let flag = pen.isDown();
      assert.equal(flag, false, 'up method should cause isDown to be false');
      done();
    });
    context('forward method', function () {
      it('should have forward method', function (done) {
        let TEST_DISTANCE = 50,
          EXPECTED_PATH = [{ op: 'M', x: 0, y: (0 - TEST_DISTANCE) }],
          pen = factory.create();
        pen.forward(TEST_DISTANCE);
        let path = pen.path();
        assert.deepEqual(path, EXPECTED_PATH, 'path after forward not what expected');
        done();
      });
      it('forward method should increment distance when pen up', function (done) {
        let TEST_DISTANCE_1 = 50,
          TEST_DISTANCE_2 = 25,
          EXPECTED_PATH = [
            { op: 'M', x: 0, y: (0 - TEST_DISTANCE_1) },
            { op: 'M', x: 0, y: (0 - (TEST_DISTANCE_1 + TEST_DISTANCE_2)) },
          ],
          pen = factory.create();
        pen
          .forward(TEST_DISTANCE_1)
          .forward(TEST_DISTANCE_2);
        let path = pen.path();
        assert.deepEqual(path, EXPECTED_PATH, 'path after forward not what expected');
        done();
      });
      it('forward method should increment distance when pen down', function (done) {
        let TEST_DISTANCE_1 = 50,
          TEST_DISTANCE_2 = 25,
          EXPECTED_PATH = [
            { op: 'M', x: 0, y: (0 - TEST_DISTANCE_1) },
            { op: 'L', x: 0, y: (0 - (TEST_DISTANCE_1 + TEST_DISTANCE_2)) },
          ],
          pen = factory.create();
        pen
          .forward(TEST_DISTANCE_1)
          .down()
          .forward(TEST_DISTANCE_2);
        let path = pen.path();
        assert.deepEqual(path, EXPECTED_PATH, 'path after forward not what expected');
        done();
      });
    });
    context('export method', function () {
      it('should have export method', function (done) {
        let TEST_SETTINGS = {
          x: 20,
          y: 30,
          heading: 45,
          color: 0xFF0000,
          fill: 0x00FFFF,
          width: 2,
          precision: 3,
          homeX: 25,
          homeY: 35,
          homeHeading: 60,
          down: true,
          path: [],
        };
        let pen = factory.create(TEST_SETTINGS);
        let obj = pen.export();
        assert.deepEqual(obj, TEST_SETTINGS, 'export method return not what expected');
        done();
      });
      it('export values should reflect move', function (done) {
        let TEST_EXPECTED = {
          x: 0,
          y: -10,
          heading: 60,
          color: 0x000000,
          fill: 0xFFFFFF,
          width: 1,
          precision: 2,
          homeX: 0,
          homeY: 0,
          homeHeading: 0,
          down: true,
          path: [
            { op: "M", x: 0, y: 0 },
            { op: "L", x: 0, y: -10 },
          ],
        };
        let pen = factory.create();
        pen
          .down()
          .forward(10)
          .turn(60);
        let obj = pen.export();
        assert.deepEqual(obj, TEST_EXPECTED, 'export method return not what expected');
        done();
      });
    });
    it('writeSVG should write svg for a multiple pens', done => {
      let width = 1024,
        height = 1024,
        cx = width / 2,
        cy = height / 2,
        writer = svgFactory.create({});

      assert.ok(writer);

      let pen1 = factory.create({
        x: cx * 1.5,
        y: cy * 1.5,
        color: 0xFF0000,    // red pen
        width: 4,           // pen width 
        alpha: 0.8          // pen alpha value
      });

      let pen2 = factory.create({
        x: cx * 0.5,
        y: cy * 0.5,
        color: 0x0000FF,    // blue pen
        width: 4,           // pen width 
        alpha: 0.8          // pen alpha value
      });

      let pen3 = factory.create({
        x: cx,
        y: cy,
        color: 0x000000,    // pen color
        width: 4,           // pen width 
        alpha: 0.8          // pen alpha value
      });

      let pen4 = factory.create({
        x: cx * 0.75,
        y: cy * 0.75,
        color: 0x800020,    // pen color
        width: 4,           // pen width 
        alpha: 0.8          // pen alpha value
      });

      let d1 = width / 4;

      pen1.down();
      for (let i = 0; i < 12; i++) {
        pen1
          .forward(d1)
          .turn(165)
      }

      let d2 = width / 5;

      pen2
        .down()
      for (let i = 0; i < 5; i++) {
        pen2
          .forward(d2)
          .turn(145)
      }

      // to show heading at start and home
      pen3
        .down()
        .forward(height / 4)
        .right(45)
        .forward(height / 8)
        .left(45)
        .forward(height / 16)
        .home();

      // to show heading at start and home
      pen4
        .down()
        .forward(height / 4)
        .home()
        .right(45)
        .forward(height / 8)
        .home()
        .left(45)
        .forward(height / 16)
        .home();

      let pen5 = factory.create({ ...pen4.export(), color: 0xFF0000 });

      writer
        .addPen(pen1)
        .addPen(pen2)
        .addPen(pen3)
        .addPen(pen4)
        .addPen(pen5,
          {
            color: 0xFF00FF,
            fill: 0x00FFFF,
            width: 10,
            transform: {
              translate: { x: 200, y: 400 },
              scale: { x: 0.5, y: 0.5 }
            }
          }
        )
        .addPen(pen5,
          {
            color: 0xFF0000,
            fill: 0x00FFFF,
            width: 10,
            transform: {
              rotate: { angle: 15 },
              translate: { x: 200, y: 400 },
              scale: { x: 0.5, y: 0.5 },
            }
          }
        )
        .addPen(pen5,
          {
            color: 0x0000FF,
            fill: 0x00FFFF,
            width: 10,
            transform: {
              translate: { x: 200, y: 400 },
              scale: { x: 0.5, y: 0.5 },
              rotate: { angle: 15 },
            }
          }
        );

      let svg = writer.writeSVG({
        width,
        height,
        filename: "__tests__/output/write-test.svg"
      });
      // console.log("SVG: \n", svg);
      done();
    });
  });
});