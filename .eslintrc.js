module.exports = {
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  rules: {
    semi: ['error', 'never'],
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true}],
    'indent': 'off',
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1
    }],
    'import/extensions': ['error', 'never'],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': ['error', { 'props': false }],
    'import/no-named-as-default': 0,
    'class-methods-use-this': ['off']
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.config.js'
      }
    }
  },
};