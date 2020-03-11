import Vue from 'vue'
import VueRouter from 'vue-router'

import Player from '@/views/Player'

import Main from '@/views/Main';

import Home from '@/views/Home'
import Login from '@/views/Login'
import CreateAccount from '@/views/CreateAccount'

import SettingsSeriesList from "@/views/Settings/SettingsSeriesList";
import SettingsSeries from "@/views/Settings/SettingsSeries";
import SettingsEpisode from "@/views/Settings/SettingsEpisode";
import SettingsSources from "@/views/Settings/SettingsSources";
import SettingsRoles from "@/views/Settings/SettingsRoles";
import SettingsUsers from "@/views/Settings/SettingsUsers";

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
                path: 'settings/roles',
                name: 'SettingsRoles',
                component: SettingsRoles
            },
            {
                path: 'settings/users',
                name: 'SettingsUsers',
                component: SettingsUsers
            },
            {
                path: 'settings/seriesList',
                name: 'SettingsSeriesList',
                component: SettingsSeriesList
            },
            {
                path: 'settings/series/:id?',
                name: 'SettingsSeries',
                component: SettingsSeries
            },
            {
                path: 'settings/series/:seriesId/episode/:id?',
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


import auth from '../auth';

router.beforeEach(async (to, from, next) => {
    let authResult = await auth.auth();
    console.log(authResult);
    if (!authResult && to.path !== "/login" && to.path !== "/createAccount") {
        next({path: "/login"});
    } else if (authResult && (to.path === "/login" || to.path === "/createAccount")) {
        next({path: from.path});
    } else { 
        next();
    }
});


export default router
