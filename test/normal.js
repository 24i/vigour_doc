'use strict'

var path = require('path')
var test = require('tape')
var setup = require('./setup')
var commentFactory = require('./commentfactory')
var expectedCommentFactory = require('./expectedCommentfactory')
var Vdoc = require('../')

var tmpDir = path.join(__dirname, 'tmp')
var expectedTmpDir = path.join(__dirname, 'expected')
var idOne = 'whatever'
var idTwo = 'whatever-else'
var badges = '<!-- VDOC.badges travis({"branch":"master"}), standard, npm -->'
var expectedBadges = badges + Vdoc.prototype.mdCommentStart + `
[![Build Status](https://travis-ci.org/vigour-io/doc.svg?branch=master)](https://travis-ci.org/vigour-io/doc)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-doc.svg)](https://badge.fury.io/js/vigour-doc)` + Vdoc.prototype.mdCommentEnd
var jsdocsOne = '<!-- VDOC.jsdoc ' + idOne + ' -->'
var expectedJsdocsOne = jsdocsOne + Vdoc.prototype.mdCommentStart + expectedCommentFactory('one', idOne) + Vdoc.prototype.mdCommentEnd
var jsdocsTwo = '<!-- VDOC.jsdoc ' + idTwo + ' -->'
var expectedJsdocsTwo = jsdocsTwo + Vdoc.prototype.mdCommentStart + expectedCommentFactory('two', idTwo) + Vdoc.prototype.mdCommentEnd
var options = {
  'README.md': {
    badges: badges,
    jsdocs: jsdocsOne
  },
  'another.md': {
    extraDir: 'sub',
    badges: badges,
    jsdocs: jsdocsTwo
  },
  'one.js': {
    extraDir: 'sub',
    comment: commentFactory('one', idOne)
  },
  'two.js': {
    extraDir: 'sub2',
    comment: commentFactory('two', idTwo)
  },
  tmpDir: tmpDir
}
var expectedOptions = {
  'README.md': {
    badges: expectedBadges,
    jsdocs: expectedJsdocsOne
  },
  'another.md': {
    extraDir: 'sub',
    badges: expectedBadges,
    jsdocs: expectedJsdocsTwo
  },
  'one.js': {
    extraDir: 'sub',
    comment: commentFactory('one', idOne)
  },
  'two.js': {
    extraDir: 'sub2',
    comment: commentFactory('two', idTwo)
  },
  tmpDir: expectedTmpDir
}
setup(options)
  .then(() => {
    return setup(expectedOptions)
  })
  .then(() => {
    test('vdoc', function (t) {
      t.plan(1)
      var vdoc = new Vdoc({ wd: tmpDir })
      vdoc.start().then(() => {
        t.equals(true, true, 'mock assertion to test setup and teardown')
      })
    })
    test.onFinish(setup.teardown(options.tmpDir, expectedOptions.tmpDir))
  })
