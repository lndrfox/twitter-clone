import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/Home')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./views/User')
  },
  {
	path: "/:catchAll(.*)",
	component: () => import('./views/NotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active"
})

export default router

createApp(App).use(router).mount('#app')


