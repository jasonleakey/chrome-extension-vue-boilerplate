const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const logoName = isDevelopment ? 'Logo-dev' : 'Logo'
module.exports = {
  manifest_version: 2,
  // TODO: replace this name with your own extension name
  name: 'Chrome Extension Vue Template',
  version: `${process.env.npm_package_version}`,

  description: `${process.env.npm_package_description}`,
  icons: {
    16: `img/${logoName}-16x16.png`,
    24: `img/${logoName}-24x24.png`,
    32: `img/${logoName}-32x32.png`,
    40: `img/${logoName}-40x40.png`,
    48: `img/${logoName}-48x48.png`,
    128: `img/${logoName}-128x128.png`,
  },

  background: {
    page: 'pages/background.html',
    persistent: false,
  },

  // use Vue-devtools standalone to debug the Vue components
  // google analytics CSP included
  content_security_policy: `script-src 'self' ${isDevelopment ? 'http://localhost:8098' : ''} https://www.google-analytics.com 'unsafe-eval'; object-src 'self'; report-uri /csp`,

  browser_action: {
    default_icon: {
      16: `img/${logoName}-16x16.png`,
      24: `img/${logoName}-24x24.png`,
      32: `img/${logoName}-32x32.png`,
    },
    // TODO: replace this name with your own tooltip title
    default_title: 'Chrome Extension Example',
    default_popup: 'pages/popup.html',
  },
  permissions: [
    'activeTab',
    'tabs',
    'storage',
  ],
}
