'use strict'

module.exports = exports = function (str) {
  var matches = str.match(exports.re)
  if (matches === null) {
    return {}
  } else {
    let obj = {}
    obj[matches[3]] = matches[0]
    return obj
  }
  console.log('matches', matches)
  return {}
}

exports.re = /\/\*\*(([\s\S][^/\*\*])?)\*\s*@id\s+(.+?)\n([\s\S]+?)\*\//
