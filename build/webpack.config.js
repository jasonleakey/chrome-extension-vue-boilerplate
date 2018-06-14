/* eslint-disable prefer-destructuring */
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const requireFromString = require('require-from-string')

const htmlPage = require('./utils').htmlPage
const vueLoaderConfig = require('./vue-loader.conf')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'
const config = isProduction
  ? require('../config/prod.env')
  : require('../config/dev.env')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function createLintingRule() {
  return {
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
      formatter: eslintFriendlyFormatter,
      emitWarning: !config.dev.showEslintErrorsInOverlay,
    },
  }
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    background: ['babel-polyfill', './src/background'],
    content: ['babel-polyfill', './src/content-scripts'],
    popup: ['babel-polyfill', './src/popup'],

  },
  output: {
    path: config.build.distRoot,
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[name].js?[hash]',
    publicPath: '/',
    library: '[name]',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '%popup%': resolve('src/popup'),
      '%static%': resolve('static'),
    },
    symlinks: false,
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    htmlPage('CometLeads', 'popup', ['popup']),
    htmlPage('background', 'background', ['background'], path.resolve(__dirname, './index-no-devtool.html')),
    new CopyWebpackPlugin([
      {
        from: './src/manifest.js',
        to: path.join(config.build.distRoot, 'manifest.json'),
        transform(content) {
          return JSON.stringify(requireFromString(content.toString()))
        },
      },
      {
        // avoid copying the 'static' folder itself
        context: path.resolve(__dirname, '../static'),
        from: '**/*',
        ignore: isProduction ? ['*-dev*'] : [], // ignores any development resources in production
      },
    ]),
    new VueLoaderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
