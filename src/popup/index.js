/* eslint-disable import/extensions */

import Vue from 'vue'

import './plugins/bootstrap'

import App from './App'
import router from './routes'
import store from './store'

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
