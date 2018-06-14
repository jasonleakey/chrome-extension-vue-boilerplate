import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ChromeExtensionReloader from 'webpack-chrome-extension-reloader'
import merge from 'webpack-merge'
import { DefinePlugin } from 'webpack'
import baseWebpackConfig from './webpack.config'
import config from '../config'
import { styleLoaders } from './utils'

export default merge(baseWebpackConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  module: {
    rules: styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true,
    }),
  },
  watch: true,
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new ChromeExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'content',
        background: 'background',
      },
    }),
  ],
})
