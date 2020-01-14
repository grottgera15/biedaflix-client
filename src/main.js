import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex);

const store = new Vuex.Store({
    state: { 
        count: 0,
        sourceDestination: null
    },
    mutations: {
        increment (state) {
            state.count++;
        }
    }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
