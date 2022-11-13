'use strict';

module.exports.create = function (spec = {}) {

    let {
        x = 0,
        y = 0,
        heading = 0,
        color = 0x000000,
        fill = 0xFFFFFF,
        width = 1,
        precision = 2,
        homeX = x,
        homeY = y,
        homeHeading = heading,
        down = false,
        path = [],
    } = spec;

    let stack = [];

    let normalizeDegrees = function (h) {
        let n = h % 360;
        if (n < 0) {
            n += 360;
        }
        // console.log(`normalized: ${n}`)
        return n;
    };

    heading = normalizeDegrees(heading);

    return {

        export: function () {
            return {
                x,
                y,
                heading,
                color,
                fill,
                width,
                precision,
                homeX,
                homeY,
                homeHeading,
                down,
                path,
            }
        },

        color: () => color,
        fill: () => fill,
        width: () => width,
        path: () => path,
        x: () => x,
        y: () => y,
        heading: () => heading,
        isDown: () => down,
        push: function() {
            stack.push({
                x,
                y,
                heading,
                down,
            });
            return this;
        },
        isStackEmpty: () => !stack.length, 
        pop: function() {
            if( stack.length ) {
                let el = stack.pop();
                x = el.x;
                y = el.y;
                heading = el.heading;
                down = el.down;
            }
            // move to the new position
            path.push({ op: "M", x, y });
            return this;
        },
        down: function () {
            down = true;
            return this;
        },
        up: function () {
            down = false;
            return this;
        },
        turn: function (a) {
            heading = normalizeDegrees(heading + a)
            return this;
        },
        left: function (a) {
            return this.turn(a)
        },
        right: function (a) {
            return this.turn(-a)
        },
        forward: function (n) {
            let op = down ? "L" : "M";
            if (path.length === 0 && op != "M") {
                // Insert starting point
                path.push({ op: "M", x, y });
            }
            x += +(n * Math.sin(Math.PI / 180 * (heading + 180))).toFixed(precision);
            y += +(n * Math.cos(Math.PI / 180 * (heading + 180))).toFixed(precision);
            path.push({ op, x, y });
            return this;
        },
        home: function () {
            x = homeX;
            y = homeY;
            heading = homeHeading;
            let op = down ? "L" : "M";
            path.push({ op, x, y });
            return this;
        }
    };
}
