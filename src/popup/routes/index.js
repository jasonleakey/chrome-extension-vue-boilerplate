import Vue from 'vue'
import Router from 'vue-router'

import Demo from '%popup%/views/Demo'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Demo,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
