'use strict';

/**
 * A factory for creating pen-turtles
 * @namespace factory
 */

/**
 * Create and return new pen-turtle 
 * @memberof factory
 * @param options {object} options 
 * @return {object} 
 */
let create = function (spec = {}) {

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

    /**
     * Turtle graphics-like pen tool
     * @namespace pen-turtle
     */

    return {

        /**
         * Export
         * @memberof pen-turtle
         * @returns {object}
         */
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

        /**
         * Returns the pen color as a hex value
         * @memberof pen-turtle
         * @returns {number} 
         */
        color: () => color,

        /**
         * Returns the fill color as a hex value
         * @memberof pen-turtle
         * @returns {number} 
         */
        fill: () => fill,

        /**
         * Returns the width of the pen
         * @memberof pen-turtle
         * @returns {number} 
         */
        width: () => width,

        /**
         * Returns the drawing path as an array of commands
         * @memberof pen-turtle
         * @returns {array} 
         */
        path: () => path,

        /**
         * Returns the x-coordinate of the pen
         * @memberof pen-turtle
         * @returns {number} 
         */
        x: () => x,

        /**
         * Returns the y-coordinate of the pen
         * @memberof pen-turtle
         * @returns {number} 
         */
        y: () => y,

        /**
         * Returns the heading of the pen-turtle
         * @memberof pen-turtle
         * @returns {number} 
         */
        heading: () => heading,

        /**
         * Returns true if the pen is down
         * @memberof pen-turtle
         * @returns {boolean} 
         */
        isDown: () => down,

        /**
         * Push x, y, head and down state to stack
         * @memberof pen-turtle
         * @returns {object} return this for chaining
         */
        push: function() {
            stack.push({
                x,
                y,
                heading,
                down,
            });
            return this;
        },

        /**
         * Returns true if stack empty
         * @memberof pen-turtle
         * @returns {boolean} 
         */
        isStackEmpty: () => !stack.length, 

        /**
         * Pops x, y, head and down off stack and moves to x, y
         * @memberof pen-turtle
         * @returns {object} return this for chaining
         */
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

        /**
         * Put the pen down (enables drawing)
         * @memberof pen-turtle
         * @returns {object} return this for chaining
         */
        down: function () {
            down = true;
            return this;
        },

        /**
         * Put the pen up (disables drawing)
         * @memberof pen-turtle
         * @returns {object} return this for chaining
         */
        up: function () {
            down = false;
            return this;
        },

        /**
         * Turn the turtle 
         * @memberof pen-turtle
         * @param {number} degrees to turn
         * @returns {object} return this for chaining
         */
        turn: function (a) {
            heading = normalizeDegrees(heading + a)
            return this;
        },

        /**
         * Turn the turtle to the left
         * @memberof pen-turtle
         * @param {number} degrees to turn
         * @returns {object} return this for chaining
         */
        left: function (a) {
            return this.turn(a)
        },

        /**
         * Turn the turtle to the right 
         * @memberof pen-turtle
         * @param {number} degrees to turn
         * @returns {object} return this for chaining
         */
        right: function (a) {
            return this.turn(-a)
        },

        /**
         * Move the turtle forward 
         * @memberof pen-turtle
         * @param {number} distance to move
         * @returns {object} return this for chaining
         */
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

        /**
         * Move the turtle to the home position 
         * @memberof pen-turtle
         * @returns {object} return this for chaining
         */
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

module.exports.create = create
