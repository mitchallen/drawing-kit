let factory = require("@mitchallen/svg-tile")

let {
  generate,
  getSquareXY,
} = factory;

generate({
    sourceFile: './input/source.svg',
    targetFile: './output/square-tiles.svg',
    toolTips: true,
    width: 550,
    height: 550,
    tileSize: 200,
    columns: 10,
    rows: 10,
    getXY: getSquareXY,
    tiles: [
      ['tile1A', 'tile1B'],
      ['tile2A', 'tile2B'],
    ],
    boardTransform: `translate(25,25) scale(0.25, 0.25)`,
    backgroundColor: 'black',
  })