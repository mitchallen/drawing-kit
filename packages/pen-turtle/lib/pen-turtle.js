'use strict';

module.exports.create = function( spec = {} ) {

    let {
        color = 0x000000,
    } = spec;

    let _down = false,
        _path = [];
        
    return {

        getColor: () => color,
        getPath: () => _path,
        isDown: () => _down,
        down: () => { 
            _down = true;
            return this;
        },
        up: () => { 
            _down = false;
            return this;
        },
    };
}
