
let getSquareXY = function(options = {}) {
    let { 
        row,
        column,
        tileSize,
    } = options

    let x = column * tileSize
    let y = row * tileSize

    return [x, y]
}

module.exports = {
    getSquareXY,
} 
