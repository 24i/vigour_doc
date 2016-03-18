'use strict'

var fs = require('vigour-fs-promised')
var getMdPlaceholders = require('./getmdplaceholders')
var getJsdocBlocks = require('./getjsdocblocks')

module.exports = exports = function processFile (jsdocBlocks, mdFiles) {
  return function (pth) {
    var end = pth.slice(-3)
    if (end === '.md') {
      return fs.readFileAsync(pth, 'utf8')
        .then((contents) => {
          if (getMdPlaceholders(contents)) {
            mdFiles.push({
              path: pth,
              contents: contents
            })
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
