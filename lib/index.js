'use strict'

var Config = require('vigour-config')

function Doc (_config) {
  if (!(_config instanceof Config)) {
    this.config = new Config(_config)
  }
  console.log('CONFIG', this.config.serialize())
}

Doc.prototype.start = require('./start')
