import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex);

import modulePlayer from "./vuex/modulePlayer.js";
import moduleApp from "./vuex/moduleApp.js";
export const store = new Vuex.Store({
    modules: {
        app: moduleApp,
        player: modulePlayer
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
