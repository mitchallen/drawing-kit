'use strict';

module.exports.create = function( spec = {} ) {

    let {
        color = 0x000000,
        x = 0,
        y = 0,
        angle = 0,
    } = spec;

    let _down = false,
        _path = [];
        
    return {

        getColor: () => color,
        getPath: () => _path,
        getAngle: () => angle,
        isDown: () => _down,
        down: () => { 
            _down = true;
            return this;
        },
        up: () => { 
            _down = false;
            return this;
        },
        turn: function(a) {
            angle += a;
            return this;
        }
    };
}
