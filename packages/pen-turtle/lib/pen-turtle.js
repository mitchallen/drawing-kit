'use strict';

/**
 * A factory for creating pen-turtles
 * @module factory
 */

/**
 * Create and return new pen-turtle 
 * @module factory
 * @kind function
 * @name create
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
     * @module pen-turtle
     */

    return {

        /**
         * Export
         * @module pen-turtle
         * @kind function
         * @name export
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
         * @module pen-turtle
         * @kind function
         * @name color
         * @returns {number} 
         */
        color: () => color,

        /**
         * Returns the fill color as a hex value
         * @module pen-turtle
         * @kind function
         * @name fill
         * @returns {number} 
         */
        fill: () => fill,

        /**
         * Returns the width of the pen
         * @module pen-turtle
         * @kind function
         * @name width
         * @returns {number} 
         */
        width: () => width,

        /**
         * Returns the drawing path as an array of commands
         * @module pen-turtle
         * @kind function
         * @name path
         * @returns {array} 
         */
        path: () => path,

        /**
         * Returns the x-coordinate of the pen
         * @module pen-turtle
         * @kind function
         * @name x
         * @returns {number} 
         */
        x: () => x,

        /**
         * Returns the y-coordinate of the pen
         * @module pen-turtle
         * @kind function
         * @name y
         * @returns {number} 
         */
        y: () => y,

        /**
         * Returns the heading of the pen-turtle
         * @module pen-turtle
         * @kind function
         * @name heading
         * @returns {number} 
         */
        heading: () => heading,

        /**
         * Returns true if the pen is down
         * @module pen-turtle
         * @kind function
         * @name isDown
         * @returns {boolean} 
         */
        isDown: () => down,

        /**
         * Push x, y, head and down state to stack
         * @module pen-turtle
         * @kind function
         * @name push
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
         * @module pen-turtle
         * @kind function
         * @name isStackEmpty
         * @returns {boolean} 
         */
        isStackEmpty: () => !stack.length, 

        /**
         * Pops x, y, head and down off stack and moves to x, y
         * @module pen-turtle
         * @kind function
         * @name pop
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
          * @module pen-turtle
         * @kind function
         * @name down
         * @returns {object} return this for chaining
         */
        down: function () {
            down = true;
            return this;
        },

        /**
         * Put the pen up (disables drawing)
         * @module pen-turtle
         * @kind function
         * @name up
         * @returns {object} return this for chaining
         */
        up: function () {
            down = false;
            return this;
        },

        /**
         * Turn the turtle 
         * @module pen-turtle
         * @kind function
         * @name turn
         * @param {number} degrees to turn
         * @returns {object} return this for chaining
         */
        turn: function (a) {
            heading = normalizeDegrees(heading + a)
            return this;
        },

        /**
         * Turn the turtle to the left
         * @module pen-turtle
         * @kind function
         * @name left
         * @param {number} degrees to turn
         * @returns {object} return this for chaining
         */
        left: function (a) {
            return this.turn(a)
        },

        /**
         * Turn the turtle to the right 
         * @module pen-turtle
         * @kind function
         * @name right
         * @param {number} degrees to turn
         * @returns {object} return this for chaining
         */
        right: function (a) {
            return this.turn(-a)
        },

        /**
         * Move the turtle forward 
         * @module pen-turtle
         * @kind function
         * @name forward
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
         * @module pen-turtle
         * @kind function
         * @name home
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
