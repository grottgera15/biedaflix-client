import Vue from "vue";

import { store } from "./main.js";
export const PlayerEventBus = new Vue({
    store: store
}
);