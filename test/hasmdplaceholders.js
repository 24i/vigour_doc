'use strict'

var test = require('tape')
var hasMdPlaceholders = require('../lib/hasmdplaceholders')

var randomChars = 'liu#asd gL*IU_SH{[DG\nJ098q7\t345)(*&@%ˆ¨©º•§'
var testCases = [
  [randomChars, false],
  [randomChars + '<!-- VDO' + randomChars + ' -->' + randomChars, false],
  [randomChars + '<!-- VDOC.' + randomChars + ' -->' + randomChars, true],
  [randomChars + '<!--VDOC.' + randomChars + '-->' + randomChars, true],
  [randomChars + '<!--\tVDOC.' + randomChars + '\t-->' + randomChars, true],
  [randomChars + '<!--\nVDOC.' + randomChars + '\n-->' + randomChars, true]
]
var len = testCases.length

test('hasMdPlaceholders', function (t) {
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    t.equals(hasMdPlaceholders(testCases[i][0]),
      testCases[i][1],
      'hasMdPlaceholders(\'' + testCases[i][0] + '\') === ' + testCases[i][1])
  }
})
