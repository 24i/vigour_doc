'use strict'

var test = require('tape')
var setup = require('./setup')
var commentFactory = require('./commentfactory')
var idOne = 'whatever'
var idTwo = 'whatever-else'
var badges = '<!-- VDOC.badges travis({"branch":"master"}), standard, npm -->'
var jsdocsOne = '<!-- VDOC.jsdoc ' + idOne + ' -->'
var jsdocsTwo = '<!-- VDOC.jsdoc ' + idTwo + ' -->'
setup({
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
  }
}).then(() => {
  test('vdoc', function (t) {
    t.plan(1)
    t.equals(true, true, 'mock assertion to test setup and teardown')
  })
  test.onFinish(setup.teardown())
})
