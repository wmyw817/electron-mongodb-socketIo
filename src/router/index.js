import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/monitor-list'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/monitor-list',
    name: 'MonitorList',
    component: () => import(/* webpackChunkName: "monitor-list" */ '../views/MonitorList.vue')
  },
  {
    path: '/monitor-single',
    name: 'MonitorSingle',
    component: () => import(/* webpackChunkName: "monitor-single" */ '../views/MonitorSingle.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
