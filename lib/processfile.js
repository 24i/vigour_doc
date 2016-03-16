'use strict'

var fs = require('vigour-fs-promised')
var hasMdPlaceholders = require('./hasmdplaceholders')
var getJsdocBlocks = require('./getjsdocblocks')

module.exports = exports = function (jsdocBlocks, mdFiles) {
  return function (pth) {
    var end = pth.slice(-3)
    if (end === '.md') {
      return fs.readFileAsync(pth, 'utf8')
        .then((contents) => {
          if (hasMdPlaceholders(contents)) {
            mdFiles.push(pth)
          }
        })
    }
    if (end === '.js') {
      return fs.readFileAsync(pth, 'utf8')
        .then((contents) => {
          var blocks = getJsdocBlocks(contents)
          for (let key in blocks) {
            if (jsdocBlocks[key]) {
              let error = new Error('ID used twice')
              error.files = [jsdocBlocks[key].file, pth]
              error.id = key
              throw error
            } else {
              jsdocBlocks[key] = blocks[key]
            }
          }
        })
    }
  }
}
