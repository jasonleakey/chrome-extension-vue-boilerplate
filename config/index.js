const path = require('path')

module.exports = {
  dev: {
    useEslint: true,
    cssSourceMap: true,
    cacheBusting: true,
    devtool: 'cheap-module-eval-source-map',
  },

  build: {
    distRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    productionSourceMap: true,
    devtool: 'source-map',
  },
}
