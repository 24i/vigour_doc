'use strict'

var path = require('path')
var fs = require('vigour-fs-promised')
var processFile = require('./processfile')

/**
 * @id vdoc_start
 * @function start
 * Searches the directory recursively and updates any vdoc sections
 */
module.exports = exports = function () {
  var jsdocBlocks = {}
  var mdFile = []
  return walk(this.config.wd.val, processFile(jsdocBlocks, mdFile))
}

function walk (pth, fn) {
  return fs.statAsync(pth)
    .then((stats) => {
      if (stats.isDirectory()) {
        // console.log('reading dir', pth)
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
        // console.log('calling fn(\'' + pth + '\')')
        return fn(pth)
      }
    })
}
