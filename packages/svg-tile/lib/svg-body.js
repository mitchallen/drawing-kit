/**
 * Author: Mitch Allen
 */

// Return the markup inside the first <svg> element of an SVG document,
// exactly as written in the source.
//
// This replaces cheerio, which was only used for this one lookup and pulled
// in a large dependency tree (undici among it). Comments, CDATA sections,
// processing instructions and the DOCTYPE are skipped while scanning, so an
// "<svg" inside one of them is not mistaken for a tag, and nested <svg>
// elements are matched by depth. Returns '' when there is no <svg> element;
// an unclosed <svg> yields everything after its start tag. Throws on
// non-string input (e.g. a source file that failed to read), as cheerio did.

const SKIP = [
    ['<!--', '-->'],
    ['<![CDATA[', ']]>'],
    ['<?', '?>'],
]

const TAG_NAME = /^<(\/?)([A-Za-z_][\w.:-]*)/

// Index just past the '>' that closes the tag opening at `start`, ignoring
// any '>' inside a quoted attribute value. Returns -1 if it never closes.
function tagEnd(markup, start) {
    let quote = null
    for (let i = start + 1; i < markup.length; i++) {
        let c = markup[i]
        if (quote) {
            if (c === quote) quote = null
        } else if (c === '"' || c === "'") {
            quote = c
        } else if (c === '>') {
            return i + 1
        }
    }
    return -1
}

// Index just past the DOCTYPE opening at `start`, including an internal
// subset ("[ ... ]"), whose declarations contain '>' of their own.
function doctypeEnd(markup, start) {
    let end = markup.indexOf('>', start)
    let open = markup.indexOf('[', start)
    if (open !== -1 && (end === -1 || open < end)) {
        let close = markup.indexOf(']', open)
        end = close === -1 ? -1 : markup.indexOf('>', close)
    }
    return end === -1 ? -1 : end + 1
}

function svgBody(markup) {
    if (typeof markup !== 'string') {
        throw new TypeError('svgBody() expects a string')
    }
    let depth = 0
    let bodyStart = -1
    let i = markup.indexOf('<')
    while (i !== -1) {
        let next = -1
        let skip = SKIP.find(([open]) => markup.startsWith(open, i))
        if (skip) {
            let close = markup.indexOf(skip[1], i + skip[0].length)
            next = close === -1 ? -1 : close + skip[1].length
        } else if (markup.startsWith('<!', i)) {
            next = doctypeEnd(markup, i)
        } else {
            let match = TAG_NAME.exec(markup.slice(i, i + 64))
            next = tagEnd(markup, i)
            if (match && match[2] === 'svg' && next !== -1) {
                let closing = match[1] === '/'
                let selfClosing = !closing && markup[next - 2] === '/'
                if (closing) {
                    if (depth > 0 && --depth === 0) {
                        return markup.slice(bodyStart, i)
                    }
                } else if (depth === 0 && selfClosing) {
                    return ''
                } else if (!selfClosing) {
                    if (depth++ === 0) {
                        bodyStart = next
                    }
                }
            }
        }
        if (next === -1) {
            break
        }
        i = markup.indexOf('<', next)
    }
    return bodyStart === -1 ? '' : markup.slice(bodyStart)
}

module.exports = {
    svgBody,
}
