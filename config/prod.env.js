const merge = require('webpack-merge')
const baseEnv = require('./index')

module.exports = merge(baseEnv, {
  NODE_ENV: '"production"',
})
