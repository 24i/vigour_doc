'use strict'

module.exports = exports = function (str) {
  return str.match(exports.placeholderRE) !== null
}

exports.placeholderRE = /<!--\s*VDOC\.[\s\S]+(?=-->)-->/
