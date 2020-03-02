import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import CreateAccount from '@/views/CreateAccount'
import Player from '@/views/Player'

import AdminSeries from "@/views/AdminSeries";
import AdminSeriesEdit from "@/views/AdminSeriesEdit";
import AdminEpisodeEdit from "@/views/AdminEpisodeEdit";

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
        path: '/createAccount',
        name: 'createAccount',
        component: CreateAccount
    },
    {
        path: '/adminSeries',
        name: 'adminSeries',
        component: AdminSeries
    }, 
    {
        path: '/adminSeriesEdit',
        name: 'adminSeriesEdit',
        component: AdminSeriesEdit
    },
    {
        path: '/adminEpisodeEdit',
        name: 'adminEpisodeEdit',
        component: AdminEpisodeEdit
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
