
let getSquareXY = function(options = {}) {
    let { 
        row,
        column,
        tileSize,
        padding = 0,
    } = options

    let x = column * (tileSize + padding)
    let y = row * (tileSize + padding)

    return [x, y]
}

module.exports = {
    getSquareXY,
} 
