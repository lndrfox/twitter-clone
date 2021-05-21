import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue3-cookies'
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
    path: '/register',
    name: 'register',
    component: () => import('./views/Inscription')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Connexion')
  },
  {
	path: "/:catchAll(.*)",
	component: () => import('./views/NotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

export default router

let app =createApp(App);
app.use(VueCookies);
app.use(router).mount('#app')


