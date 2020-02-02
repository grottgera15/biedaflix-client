import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Registration from '@/views/Registration'
import Player from '@/views/Player'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'home',
        component: Home
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
