import Vue from 'vue'
import VueRouter from 'vue-router'

import Add from './pages/addApp'
import List from './pages/listApp'

const routes = [
  { path: '/add', component: Add },
  { path: '/list', component: List }
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes
})

export default router;