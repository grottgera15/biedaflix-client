import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from "axios"

import auth from './auth';

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.prototype.$axios = axios;

import avatars from "./assets/avatars.json";
Vue.prototype.$avatars = avatars;

import modulePlayer from "./vuex/modulePlayer.js";
import moduleApp from "./vuex/moduleApp.js";
// import moduleUser from "./vuex/moduleUser";
export const store = new Vuex.Store({
    modules: {
        app: moduleApp,
        player: modulePlayer
        // user: moduleUser
    }
})

auth.auth();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
