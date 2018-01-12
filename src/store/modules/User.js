import * as types from "../mutation-types.js";
//初始化状态
var uinfo = sessionStorage.getItem("boc_userInfo");
let state;
if (uinfo) {
    var userInfo = JSON.parse(uinfo);
    state = {
        logState: 'login',
        userName: userInfo.userName,
        loginTime: userInfo.loginTime,
    };
} else {
    state = {
        logState: 'none',
        userName: "",
        loginTime: '',
    };
}
const getters = {
    loginUser: state => state.userName,
    loginTime: state => state.loginTime
}
const mutations = {
    [types.USER_LOGIN](state) {
        state.logState = "login";
    },
    [types.SET_USERINFO](state, userName) {
        state.userName = userName;
        state.loginTime = new Date();
    }
}
const actions = {
    login({ commit, state }, { userName }) {
        commit(types.USER_LOGIN);
        commit(types.SET_USERINFO, userName);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}