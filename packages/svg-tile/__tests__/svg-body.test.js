'use strict';

const { describe, it } = require('node:test');
// svgBody() replaced cheerio's $("svg").first().html(). These cases pin the
// markup it must skip over and the malformed input it must tolerate.

var assert = require('assert');
var fs = require('fs');
var path = require('path');

const { svgBody } = require('../lib/svg-body.js');

describe('svgBody', function () {

  it('should return the inner markup of the svg element verbatim', function () {
    assert.equal(
      svgBody('<svg viewBox="0 0 1 1">\n  <rect  width="1" />\n</svg>'),
      '\n  <rect  width="1" />\n');
  });

  it('should read the test source file', function () {
    let source = fs.readFileSync(path.join(__dirname, 'input', 'source.svg'), 'utf8');
    let body = svgBody(source);
    assert.ok(body.startsWith('\n<style>'));
    assert.ok(body.includes('<g id="base1">'));
    assert.ok(!body.includes('</svg>'));
  });

  it('should match a nested svg element by depth', function () {
    assert.equal(
      svgBody('<svg a="1"><g><svg x="2"><rect/></svg><svg/></g></svg><svg>later</svg>'),
      '<g><svg x="2"><rect/></svg><svg/></g>');
  });

  it('should only use the first svg element', function () {
    assert.equal(svgBody('<svg>one</svg><svg>two</svg>'), 'one');
  });

  it('should return an empty string for a self-closing svg element', function () {
    assert.equal(svgBody('<svg />'), '');
  });

  it('should return an empty string when there is no svg element', function () {
    assert.equal(svgBody(''), '');
    assert.equal(svgBody('<g><svgfoo/></g>'), '');
    assert.equal(svgBody('</svg>'), '', 'a stray end tag is ignored');
  });

  it('should skip comments, CDATA and processing instructions', function () {
    assert.equal(
      svgBody('<?xml version="1.0"?><!-- <svg>no</svg> --><svg><![CDATA[</svg>]]><?pi </svg>?></svg>'),
      '<![CDATA[</svg>]]><?pi </svg>?>');
  });

  it('should skip a DOCTYPE with or without an internal subset', function () {
    assert.equal(svgBody('<!DOCTYPE svg><svg>a</svg>'), 'a');
    assert.equal(svgBody('<!DOCTYPE svg [<!ENTITY x "<svg>">]><svg>b</svg>'), 'b');
  });

  it('should ignore a > inside a quoted attribute value', function () {
    assert.equal(svgBody(`<svg title="a>b" data-x='c>d'><c/></svg>`), '<c/>');
  });

  it('should return the rest of the input for an unclosed svg element', function () {
    assert.equal(svgBody('<svg><g>open'), '<g>open');
  });

  it('should stop at markup that never closes', function () {
    assert.equal(svgBody('<svg>x<!-- never closed'), 'x<!-- never closed');
    assert.equal(svgBody('<!DOCTYPE never closed <svg>x</svg>'), '');
    assert.equal(svgBody('<!DOCTYPE svg [ never closed <svg>x</svg>'), '');
    assert.equal(svgBody('<!DOCTYPE svg [ ] never closed'), '');
    assert.equal(svgBody('<svg title="never closed>x</svg>'), '');
  });

  it('should throw when the input is not a string', function () {
    assert.throws(() => svgBody(undefined), TypeError);
  });
});
