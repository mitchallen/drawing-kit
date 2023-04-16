'use strict';

const penTurtleFactory = require("@mitchallen/pen-turtle");

/**
 * A factory for creating lsystem generators
 * @namespace factory
 */

/**
 * Create and return new lsystem generator
 * @memberof factory
 * @param options {object} options 
 * @param options.turtle {object} pen-turtle to use for drawing 
 * @param options.distance {number} distance 
 * @param options.depth {number} depth
 * @param options.depthRatio {number} depthRatio
 * @param options.angle {number} angle
 * @param options.rule {array} rule
 * @param options.axiom {string} initial rule to start 
 * @return {object} 
 * @example <caption>Init and set later</caption>
 * const factory = require('@mitchallen/lsystem');
 * let lsys = factory.create();
 * // setup turtle
 * let turtle = penTurtleFactory.create({
 *     color: 0x000000,
 *     width: 1,
 * });
 * // setup lsystem
 * lsys.turtle = turtle;
 * lsys.distance = 4;
 * lsys.depth = 4;
 * lsys.angle = 60;
 * lsys.addRule("F", "F-F++F-F");
 * lsys.axiom = "F++F++F";
 * lsys.run();
 * @example <caption>Init with values</caption>
 * let width = 1024,
 * height = 1024;
 * let writer = svgFactory.create({});
 * // setup turtle
 * let turtle = penTurtleFactory.create({
 *     color: 0x000000,
 *     width: 1,
 * });
 * // init via factory:
 * let lsys = factory.create({
 *      turtle,
 *      distance: 4,
 *      depth: 4,
 *      angle: 60,
 *      rule: {
 *          "F": "F-F++F-F"
 *      },
 *      axiom: "F++F++F",
 * });
 * lsys.run();
 */
let create = function (options = {}) {

    let {
        turtle = penTurtleFactory.create(),
        distance = 1,
        depth = 1,
        depthRatio = 1.0,
        angle = 0,
        rule = [],
        axiom = "",
    } = options;

    /**
     * Lsystem generator
     * @namespace lsystem
     */
    let lsystem = {
        /**
         * pen-turtle to use for drawing
         * @memberof lsystem
         * @instance
         */
        turtle,

        /**
         * distance
         * @memberof lsystem
         * @instance
         * @type {number}
         */
        distance,

        /**
         * depth
         * @memberof lsystem
         * @instance
         * @type {number}
         */
        depth,

        /**
         * depth ratio
         * @memberof lsystem
         * @instance
         * @type {number}
         */
        depthRatio,

        /**
         * angle
         * @memberof lsystem
         * @instance
         * @type {number}
         */
        angle,

        /**
         * axiom
         * @memberof lsystem
         * @instance
         * @type {string}
         */
        axiom,

        /**
         * Add rule
         * @memberof lsystem
         * @instance
         * @param name {string} the name of the rule
         * @param r {string} the rule
         * @return {object} return this object for chaining
         */
        addRule: function (name, r) {
            rule[name] = r;
            return this;
        },
        lsys: function (currDepth, str) {
            if (currDepth < 0) return;
            let iFactor = 1.0;

            for (let i = 0; i < str.length; i++) {

                let iTurn = 1;
                let ch = str.charAt(i);
                let szNum = "";

                while (ch >= "0" && ch <= "9") {
                    szNum += ch;
                    iTurn = parseInt(szNum);
                    ch = str.charAt(++i);
                }

                switch (ch) {
                    case '|':
                        this.turtle.down();
                        iFactor = 1 / Math.pow(this.depthRatio, currDepth);
                        this.turtle.forward(this.distance * iFactor);
                        break;
                    case 'F':
                    case 'G':
                        if (rule[ch] == null || currDepth == 0) {
                            if (ch == "F") this.turtle.down();
                            if (ch == "G") this.turtle.up();
                            this.turtle.forward(this.distance);
                        } else {
                            this.lsys(currDepth - 1, rule[ch]);
                        }
                        break;
                    case '+':
                        this.turtle.turn(0 - this.angle * iTurn);
                        break;
                    case '-':
                        this.turtle.turn(this.angle * iTurn);
                        break;
                    case '[':
                        this.turtle.push();
                        break;
                    case ']':
                        this.turtle.pop();
                        break;
                    default:
                        if( rule[ ch ] == null || currDepth == 0 ) {
                            break;
                        } else {
                            this.lsys( currDepth - 1, rule[ ch ] );
                        }
                        break;
                }
            }
        },

        /**
         * Run and build the lsystem
         * @memberof lsystem
         * @instance
         * @return {object} return this object for chaining
         */
        run: function () {
            this.lsys(this.depth, this.axiom);
            return this;
        }
    };

    return Object.seal(lsystem)

}

module.exports.create = create

