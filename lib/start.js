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
      return getPackage(this.config.wd.val)
    })
    .then((pkg) => {
      var writes = []
      var len = mdFiles.length
      var nbFound
      for (let i = 0; i < len; i += 1) {
        nbFound = mdFiles[i].found.length
        mdFiles[i].contents = this.clean(mdFiles, i)
        for (let j = 0; j < nbFound; j += 1) {
          if (!this.plugins[mdFiles[i].found[j].plugin]) {
            console.log('WARNING', 'plugin VDOC.' + mdFiles[i].found[j].plugin + " doesn't exist")
          } else {
            mdFiles[i].contents = this.plugins[mdFiles[i].found[j].plugin](mdFiles, i, j, pkg)
          }
        }
        writes.push(fs.writeFileAsync(mdFiles[i].path, mdFiles[i].contents, 'utf8'))
      }
      return Promise.all(writes)
    })
}

function getPackage (pth) {
  // TODO look up the directory structure until we find a package
  // and return fs.readJSONAsync(foundPackage)
  var mockPackage = {
    name: 'vigour-doc',
    repository: {
      url: 'git+https://github.com/vigour-io/doc.git'
    }
  }
  return Promise.resolve(mockPackage)
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
