import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex);

import modulePlayer from "./vuex/modulePlayer.js";
import moduleApp from "./vuex/moduleApp.js";
import moduleUser from "./vuex/moduleUser";

const store = new Vuex.Store({
    modules: {
        app: moduleApp,
        player: modulePlayer,
        user: moduleUser
    }
})

export default store;