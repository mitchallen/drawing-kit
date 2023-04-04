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
 * @return {object} 
 * @example
 * const factory = require('@mitchallen/lsystem');
 * let lsys = factory.create();
 */
let create = function (spec = {}) {

    let {
        turtle = penTurtleFactory.create(),
        distance = 1,
        depth = 1,
        depthRatio = 1.0,
        angle = 0,
        rule = [],
        axiom = "",
    } = spec;

    /**
     * Lsystem generator
     * @namespace lsystem
     */
    return Object.seal({
        /**
         * pen-turtle to use for drawing
         * @memberof lsystem
         */
        turtle,

        /**
         * distance
         * @memberof lsystem
         * @type {number}
         */
        distance,

        /**
         * depth
         * @memberof lsystem
         * @type {number}
         */
        depth,

        /**
         * depth ratio
         * @memberof lsystem
         * @type {number}
         */
        depthRatio,

        /**
         * angle
         * @memberof lsystem
         * @type {number}
         */
        angle,

        /**
         * axiom
         * @memberof lsystem
         * @type {string}
         */
        axiom,

        /**
         * Add rule
         * @memberof lsystem
         * @param name {string} the name of the rule
         * @param r {string} the rule
         * @return {object} return this for chaining
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
         * @return {object} return this for chaining
         */
        run: function () {
            this.lsys(this.depth, this.axiom);
            return this;
        }
    });

}

module.exports.create = create
