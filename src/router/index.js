import Vue from 'vue'
import VueRouter from 'vue-router'

import Player from '@/views/Player'

import Main from '@/views/Main';

import Home from '@/views/Home'
import Login from '@/views/Login'
import CreateAccount from '@/views/CreateAccount'

import AdminSeries from "@/views/AdminSeries";
import AdminSeriesEdit from "@/views/AdminSeriesEdit";
import AdminEpisodeEdit from "@/views/AdminEpisodeEdit";
import AdminSources from "@/views/AdminSources";

Vue.use(VueRouter)

const routes = [

    {
        path: '/player',
        name: 'player',
        component: Player
    },
    {
        path: '/',
        name: 'main',
        component: Main,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home,
            },
            {
                path: '/login',
                name: 'login',
                component: Login
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
            },
            {
                path: '/adminSources',
                name: 'adminSources',
                component: AdminSources
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
