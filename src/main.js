// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import "./common/eleme.js";
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
Vue.config.productionTip = false;

import "./common/filters.js";

import App from './App';
import Login from "./pages/login.vue";
require('./../mock/mock.js')
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render(c) {
        var userName = sessionStorage.getItem("boc_userInfo");
        if (userName) {
            return c(App);
        } else {
            return c(Login);
        }
    }
});