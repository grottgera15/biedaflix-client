import Vue from 'vue'
import VueRouter from 'vue-router'

import Player from '@/views/Player'

import Main from '@/views/Main';

import Home from '@/views/Home'
import Login from '@/views/Login'
import CreateAccount from '@/views/CreateAccount'

import SettingsSeries from "@/views/Settings/SettingsSeries";
import SettingsSerie from "@/views/Settings/SettingsSerie";
import SettingsEpisode from "@/views/Settings/SettingsEpisode";
import SettingsSources from "@/views/Settings/SettingsSources";

Vue.use(VueRouter)

const routes = [

    {
        path: '/player',
        name: 'player',
        component: Player
    },
    {
        path: '/',
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
                path: 'settings/series',
                name: 'SettingsSeries',
                component: SettingsSeries
            },
            {
                path: 'settings/serie',
                name: 'SettingsSerie',
                component: SettingsSerie
            },
            {
                path: 'settings/episode',
                name: 'SettingsEpisode',
                component: SettingsEpisode
            },
            {
                path: 'settings/sources',
                name: 'SettingsSources',
                component: SettingsSources
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
