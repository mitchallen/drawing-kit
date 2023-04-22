
var fs = require('fs'),
    util = require('util');

let { getSquareXY } = require('./get-square-xy.js')

let generateLegend = function(options = {}) {

    let {
        title = 'legend',
        desc = `This file was code-generated.`,
        width = 1024,
        height = 1024,
        tileSize = 200,
        columns = 4,
        rows = 3,
        padding = 20,
        getXY = getSquareXY,
        tiles = [],
        rotations = () => 0,
        boardId = `board`,
        boardTransform = `translate(0,0) scale(1.0, 1.0)`,
        sourceFile = './source.svg',
        targetFile = './legend.svg',
        backgroundColor = 'white',
        generateIds = true,
        precision = 2,
        toolTips = false,
    } = options;

    if (tiles.length == 0) {
        console.log('Must provide at least one tile id')
        return
    }

    let $;

    fs.readFile(sourceFile, "utf8", (err, data) => {
        $ = cheerio.load(data, { xmlMode: true })
        const svgSet = $("svg")
        svgSet.each(function () {
            let svgBody = $(this).html()

            // generate the tile board

            let board = `<g id="${boardId}" transform="${boardTransform}" >\n`
            let radius = tileSize / 2
            let tileIndex = 0;
            for (let column = 0; column < columns; column++) {
                for (let row = 0; row < rows; row++) {
                    let [tx, ty] = getXY({ row, column, ...options})
                    if (tileIndex >= tiles.length) {
                        break;
                    };
                    let href = tiles[tileIndex++]
                    let rotation = rotations()
                    let tileId = `C${column}R${row}`
                    let idAttr = generateIds ? `id="${tileId}"` : ""
                    let transformAttr = `transform="translate(${tx.toFixed(precision)},${ty.toFixed(precision)})`
                    let useAttrs = `${generateIds ? idAttr : ""} href="#${href}" ${transformAttr} rotate(${rotation},${radius},${radius})"`
                    if( toolTips ) {
                        board += `\t<use ${useAttrs} >\n\t\t<title>${tileId}</title>\n\t</use>\n`
                    } else {
                        board += `\t<use ${useAttrs} />\n`
                    }
                    
                }
            }
            board += `</g>\n`

            // generate the svg markup

            let fd = util.format(
                '<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" width="%d" height="%d">\n',
                width, height,
                width, height
            );
            fd += title ? `<title>${title}</title>\n` : ""
            fd += desc ? `<desc>${desc}</desc>\n` : ""
            fd += svgBody
            fd += `<rect id="background" fill="${backgroundColor}" width="${width}" height="${height}" />\n`
            fd += board
            fd += '</svg>';

            // write the file

            var filename = targetFile;
            var stream = fs.createWriteStream(filename);
            stream.write(fd);
            stream.end();
            console.log(`Generated file: ${filename}`)
        })
    })
}

module.exports = {
    generateLegend,
} 
