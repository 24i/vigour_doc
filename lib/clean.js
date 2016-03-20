'use strict'

var Vdoc = require('.')

module.exports = exports = function clean (mdFiles, i) {
  return mdFiles[i].contents.replace(Vdoc.prototype.generatedRE, '')
}
