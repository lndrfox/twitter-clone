import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./views/User.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;

createApp(Home).use(router).mount('#app')
