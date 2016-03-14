'use strict'

var Config = require('vigour-config')

function Docs (_config) {
  if (!(_config instanceof Config)) {
    this.config = new Config(_config)
  }
  console.log('CONFIG', this.config.serialize())
}

Docs.prototype.start = require('./start')
