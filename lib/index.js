'use strict'

var Config = require('vigour-config')

module.exports = exports = Doc

function Doc (_config) {
  if (!(_config instanceof Config)) {
    this.config = new Config(_config)
  }
  if (!this.config.wd.val) {
    this.config.set({
      wd: process.cwd()
    })
  }
  console.log('CONFIG', this.config.serialize())
}

Doc.prototype.start = require('./start')

Doc.prototype.mdCommentStart = `
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN \`vdoc\` TO UPDATE -->`

Doc.prototype.mdCommentEnd = `
<!-- VDOC END -->`

// Plugins

Doc.prototype.plugins = {
  jsdoc: require('./plugins/jsdoc'),
  badges: require('./plugins/badges')
}
