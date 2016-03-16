'use strict'

var test = require('tape')
var getJsdocBlocks = require('../lib/getjsdocblocks')

var id1 = 'thisistheid'
var block1 = `/**
 * @id ${id1}
 */`
var expected1 = {}
expected1[id1] = block1

var randomChars = 'SDFGH@#$%^&*˚∆ß2345678ßå∑øˆ'
var block2 = `/**
 * @id ${randomChars}
 * @function whatever ${randomChars}
 * Yeah ${randomChars}
 * @params {Boom} ${randomChars} - booms
 */`
var expected2 = {}
expected2[randomChars] = block2

var testCases = [
  [ block1, expected1 ],
  [ block2, expected2 ]
]

var len = testCases.length

test('getJsdocBlocks', function (t) {
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    t.deepEqual(getJsdocBlocks(testCases[i][0]),
      testCases[i][1],
      'getJsdocBlocks(\'' + testCases[i][0] + '\') === ' + JSON.stringify(testCases[i][1]))
  }
})
