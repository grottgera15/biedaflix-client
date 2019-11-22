import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import About from '../views/About.vue'
import Player from '../views/Player.vue'

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
    },
    {
        path: '/player',
        name: 'player',
        component: Player
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
