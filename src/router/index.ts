import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import demo from '../views/demo.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/demo'
  },
  {
    path: '/demo',
    name: 'demo',
    component: demo
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
