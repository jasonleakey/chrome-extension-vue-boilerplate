/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.htmlPage = function (title, filename, chunks, template, minify = false) {
  return new HtmlWebpackPlugin({
    title,
    minify,
    hash: true,
    filename: `./pages/${filename}.html`,
    template: template || `${path.resolve(__dirname, './index.html')}`,
    chunks,
  })
}

exports.cssLoaders = function (options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    }
    return ['vue-style-loader'].concat(loaders)
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options = {}) {
  const output = []
  const loaders = exports.cssLoaders(options)

  // eslint-disable-next-line no-restricted-syntax
  for (const extension in loaders) {
    if ({}.hasOwnProperty.call(loaders, extension)) {
      const loader = loaders[extension]
      output.push({
        test: new RegExp(`\\.${extension}$`),
        use: loader,
      })
    }
  }

  return output
}
