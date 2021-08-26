import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/OrderQuery.vue')
  },
  {
    path: '/scene',
    name: 'Scene',
    component: () => import('@/views/Scene.vue')
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('@/views/DiyEditor.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/NewDemo.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
