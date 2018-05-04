import Vue from 'vue'
import Router from 'vue-router'
// import { isLogin$ } from '@/mixins/index'

import Login from '@/page/Login'
import Redirect from '@/page/Redirect'
import Home from '@/page/Home'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: '404',
      component: Redirect
    }
  ].filter(route => route)
})
