import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about:sources:pathSubs',
    name: 'about',
    component: About,
    props: {
        sources: 'SiliconValleyS01E01.mkv',
        pathSubs: 'SiliconValleyS01E01.json'
    }
},
  {
      path: '/login',
      name: 'login',
      component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
