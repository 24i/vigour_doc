'use strict'

var path = require('path')
var fs = require('vigour-fs-promised')
var _template = require('lodash.template')
var templateDir = path.join(__dirname, 'templates')

module.exports = exports = function (options) {
  var proms = []
  for (let key in options) {
    if (key !== 'tmpDir') {
      options[key].tmpDir = options.tmpDir
      proms.push(exports.prepFile(key, options[key]))
    }
  }
  return Promise.all(proms).catch((reason) => {
    console.error(':(', reason)
  })
}

exports.teardown = function () {
  var removes = []
  var len = arguments.length
  for (let i = 0; i < len; i += 1) {
    removes.push(fs.removeAsync(arguments[i]))
  }
  return Promise.all(removes)
}

exports.prepFile = function (fileName, options) {
  return fs.readFileAsync(path.join(templateDir, fileName + '.template'), 'utf8')
    .then((contents) => {
      var template = _template(contents)
      var newContents = template(options)
      var filePath = path.join(options.tmpDir,
          (options.extraDir ? options.extraDir : ''),
          fileName)
      return fs.writeFileAsync(filePath,
        newContents,
        { mkdirp: true, encoding: 'utf8' })
    })
}
