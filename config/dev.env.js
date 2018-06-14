/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const path = require('path')
const baseEnv = require('./index')

module.exports = merge(baseEnv, {
  NODE_ENV: '"development"',
  build: {
    distRoot: path.resolve(__dirname, '../dev'),
  },
})
