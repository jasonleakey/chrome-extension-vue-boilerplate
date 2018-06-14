import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`)

export default new Vuex.Store({
  modules: {
  },
  strict: process.env.NODE_ENV === 'development',
})
