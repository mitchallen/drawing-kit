'use strict';

const penTurtleFactory = require("@mitchallen/pen-turtle");

module.exports.create = function (spec = {}) {

    let {
        turtle = penTurtleFactory.create(),
        distance = 1,
        depth = 1,
        depthRatio = 1.0,
        angle = 0,
        rule = [],
        axiom = "",
    } = spec;

    return Object.seal({
        turtle,
        distance,
        depth,
        depthRatio,
        angle,
        axiom,
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
                        this.turtle.penDown();
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
                        throw new Error("brackets not supported yet");
                        // pushTurtle(this.turtle);
                        break;
                    case ']':
                        throw new Error("brackets not supported yet");
                        // this.turtle.copyTurtle(popTurtle());
                        break;
                    default:
                        if( this.rule[ ch ] == null || currDepth == 0 ) {
                            break;
                        } else {
                            this.lsys( currDepth - 1, this.rule[ ch ] );
                        }
                        break;
                }

            }
        },
        run: function () {
            this.lsys(this.depth, this.axiom);
            return this;
        }
    });

}
