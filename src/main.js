import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import axios from "axios"

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

import avatars from "./assets/avatars.json";
Vue.prototype.$avatars = avatars;



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
