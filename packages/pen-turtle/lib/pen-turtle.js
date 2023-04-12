'use strict';

/**
 * A factory for creating pen-turtles
 * @namespace factory
 */

/**
 * Create and return new pen-turtle 
 * @memberof factory
 * @param options {object} options 
 * @param options.x {number} initial x-coordinate of turtle
 * @param options.y {number} initial y-coordinate of turtle
 * @param options.heading {number} initial heading of turtle
 * @param options.color {number} hex color value of line drawn
 * @param options.fill {number} hex fill color value
 * @param options.width {number} width of line drawn
 * @param options.precision {number} floating point precision of numbers stored in path
 * @param options.homeX {number} home x-coordinate for turtle
 * @param options.homeY {number} home y-coordinate for turtle
 * @param options.homeHeading {number} home heading for turtle
 * @param options.down {boolean} initial state of pen being up (false) or down true 
 * @param options.path {array} initial path
 * @param options.constrain {function} given x, y, returns true if okay to set new x, y
 * @return {object} 
 * @example <caption>init with defaults</caption>
 * const factory = require('@mitchallen/pen-turtle');
 * let p1 = factory.create();
 * let p2 = factory.create();
 * @example <caption>init with values</caption>
 * let width = 1024,
 *     height = 1024,
 *     cx = width / 2,
 *     cy = height / 2,
 * let constrain = function( tx, ty ) {
 *      // only draw if within margin
 *      let margin = 10.0
 *      return( tx >= margin && ty >= margin && tx <= (width - margin) && ty <= (height - margin))
 * }
 * let pen1 = factory.create({
 *      x: cx * 1.5,
 *      y: cy * 1.5,
 *      color: 0xFF0000,    // red pen
 *      width: 4,           // pen width 
 *      alpha: 0.8,         // pen alpha value
 *      constrain,  // assign constrain function
 * });
 */
let create = function (options = {}) {

    let {
        x = 0,
        y = 0,
        heading = 0,
        color = 0x000000,
        // fill = 0xFFFFFF,
        fill = undefined,
        width = 1,
        precision = 2,
        homeX = x,
        homeY = y,
        homeHeading = heading,
        down = false,
        path = [],
        constrain = (tx, ty) => true,
    } = options;

    let stack = [];

    let normalizeDegrees = function (h) {
        let n = h % 360;
        if (n < 0) {
            n += 360;
        }
        return n;
    };

    heading = normalizeDegrees(heading);

    /**
     * Turtle graphics-like pen tool
     * @namespace pen-turtle
     */
    let penTurtle = {

        /**
         * Export
         * @memberof pen-turtle
         * @instance
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
         * @instance
         * @returns {number} 
         */
        color: () => color,

        /**
         * Returns the fill color as a hex value
         * @memberof pen-turtle
         * @instance
         * @returns {number} 
         */
        fill: () => fill,

        /**
         * Returns the width of the pen
         * @memberof pen-turtle
         * @instance
         * @returns {number} 
         */
        width: () => width,

        /**
         * Returns the drawing path as an array of commands
         * @memberof pen-turtle
         * @instance
         * @returns {array} 
         */
        path: () => path,

        /**
         * Returns the x-coordinate of the pen
         * @memberof pen-turtle
         * @instance
         * @returns {number} 
         */
        x: () => x,

        /**
         * Returns the y-coordinate of the pen
         * @memberof pen-turtle
         * @instance
         * @returns {number} 
         */
        y: () => y,

        /**
         * Returns the heading of the pen-turtle
         * @memberof pen-turtle
         * @instance
         * @returns {number} 
         */
        heading: () => heading,

        /**
         * Returns true if the pen is down
         * @memberof pen-turtle
         * @instance
         * @returns {boolean} 
         */
        isDown: () => down,

        /**
         * Push x, y, head and down state to stack
         * @memberof pen-turtle
         * @instance
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
         * @instance
         * @returns {boolean} 
         */
        isStackEmpty: () => !stack.length, 

        /**
         * Pops x, y, head and down off stack and moves to x, y
         * @memberof pen-turtle
         * @instance
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
         * @instance
         * @returns {object} return this for chaining
         */
        down: function () {
            down = true;
            return this;
        },

        /**
         * Put the pen up (disables drawing)
         * @memberof pen-turtle
         * @instance
         * @returns {object} return this for chaining
         */
        up: function () {
            down = false;
            return this;
        },

        /**
         * Turn the turtle 
         * @memberof pen-turtle
         * @instance
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
         * @instance
         * @param {number} degrees to turn
         * @returns {object} return this for chaining
         */
        left: function (a) {
            return this.turn(a)
        },

        /**
         * Turn the turtle to the right 
         * @memberof pen-turtle
         * @instance
         * @param {number} degrees to turn
         * @returns {object} return this for chaining
         */
        right: function (a) {
            return this.turn(-a)
        },

        /**
         * Move the turtle forward 
         * @memberof pen-turtle
         * @instance
         * @param {number} distance to move
         * @returns {object} return this for chaining
         */
        forward: function (n) {
            let op = down ? "L" : "M";
            if (path.length === 0 && op != "M") {
                // Insert starting point
                path.push({ op: "M", x, y });
            }
            let targetX = x + n * Math.sin(Math.PI / 180 * (heading + 180));
            let targetY = y + n * Math.cos(Math.PI / 180 * (heading + 180));
            let drawOK = constrain(targetX, targetY)
            if( drawOK ) {
                x = targetX
                y = targetY
                x = +x.toFixed(precision)
                y = +y.toFixed(precision)
                path.push({ op, x, y });
            }
            return this;
        },

        /**
         * Move the turtle to the home position 
         * @memberof pen-turtle
         * @instance
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

    return Object.seal(penTurtle)
}

module.exports.create = create
