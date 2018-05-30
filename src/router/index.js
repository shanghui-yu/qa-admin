import Vue from 'vue'
import Router from 'vue-router'
// import { isLogin$ } from '@/mixins/index'

import Login from '@/page/Login'
import Redirect from '@/page/Redirect'
import Home from '@/page/Home'
import UserScatter from '@/page/userScatter'
import Ranking from '@/page/ranking'
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
      path: '/UserScatter',
      name: 'UserScatter',
      component: UserScatter
    },
    {
      path: '*',
      name: '404',
      component: Redirect
    },
    {
      path: '/Ranking',
      name: 'Ranking',
      component: Ranking
    }
  ].filter(route => route)
})
