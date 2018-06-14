/* eslint-disable import/extensions,import/no-unresolved,import/no-extraneous-dependencies */
import path from 'path'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import { DefinePlugin } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import merge from 'webpack-merge'
import baseWebpackConfig from './webpack.config'
import config from '../config'
import { styleLoaders } from './utils'

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const resolve = dir => path.join(__dirname, '..', dir)

const pathsToClean = [
  'dist',
]

const cleanOptions = {
  root: resolve('/'),
}

export default merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    // uglify js
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true,
    }),

    new DefinePlugin({
      'process.env': env,
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new DefinePlugin({
      'console.log': () => {},
      'console.info': () => {},
      'console.warn': () => {},
      'console.error': () => {},
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ],
  module: {
    rules: styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
})

