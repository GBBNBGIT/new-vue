import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import User from "./modules/User.js";
import Navtab from "./modules/Navtab.js"

export default new Vuex.Store({
    modules: {
        User,
        Navtab
    }
});