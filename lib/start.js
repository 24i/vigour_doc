'use strict'

var path = require('path')
var fs = require('vigour-fs-promised')
var processFile = require('./processfile')

/**
 * @id vdoc_start
 * @function start
 * Searches the directory recursively and updates any vdoc sections
 */
module.exports = exports = function start () {
  var jsdocBlocks = {}
  var mdFiles = []
  return walk(this.config.wd.val, processFile(jsdocBlocks, mdFiles))
    .then(() => {
      var len = mdFiles.length
      for (let i = 0; i < len; i += 1) {
        console.log('==========mdFile', mdFiles[i])
      }
      console.log('==========jsdocBlocks', jsdocBlocks)
    })
}

function walk (pth, fn) {
  return fs.statAsync(pth)
    .then((stats) => {
      if (stats.isDirectory()) {
        return fs.readdirAsync(pth)
          .then((items) => {
            var proms = []
            var len = items.length
            for (let i = 0; i < len; i += 1) {
              proms.push(walk(path.join(pth, items[i]), fn))
            }
            return Promise.all(proms)
          })
      } else {
        return fn(pth)
      }
    })
}
