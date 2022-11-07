'use strict';

module.exports.create = function( spec = {} ) {

    let {
        x = 0,
        y = 0,
        angle = 0,
        color = 0x000000,
        fill = 0xFFFFFF,
        width = 2,
    } = spec;

    let _down = false,
        _path = [];
        
    return {

        color: () => color,
        fill: () => fill,
        path: () => _path,
        angle: () => angle,
        isDown: () => _down,
        down: function() { 
            _down = true;
            return this;
        },
        up: function () { 
            _down = false;
            return this;
        },
        turn: function(a) {
            angle += a;
            return this;
        },
        left: function(a) {
            return this.turn(-a)
        },
        right: function(a) {
            return this.turn(a)
        },
        forward: function(n) {
            x += n * Math.sin( Math.PI / 180 * angle );
            y += n * Math.cos( Math.PI / 180 * angle );
            let op = _down ? "L" : "M";
            if(_path.length === 0 && op != "M" ) {
                // Insert starting point
                _path.push( { op: "M", x: 0, y: 0 } );
            }
            _path.push( { op, x, y } );
            return this;
        }
    };
}
