import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue3-cookies'
import App from './App'



const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/Home'),
    meta: {title: 'Accueil'}
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./views/User'),
    meta: {title: 'Compte'}
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/Inscription'),
    meta: {title: 'Inscription'}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Connexion'),
    meta: {title: 'Connexion'}
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('./views/Deconnexion'),
    meta: {title: 'Au revoir'}
  },
  {
    path: "/:catchAll(.*)",
    component: () => import('./views/NotFound'),
    meta: {title: 'NotFound'}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});


router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});

export default router

let app =createApp(App);
app.use(VueCookies);
app.use(router).mount('#app')


