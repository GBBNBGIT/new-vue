import * as types from "../mutation-types.js";
export default {
    state: {
        tabList: [],
        tabValue: ''
    },
    getters: {
        getTabList: state => state.tabList,
        getTabValue: state => state.tabValue,
    },
    mutations: {
        [types.ADD_TABLIST](state, value) {
            console.log(value);
            var data = {
                'title': value.data.label || value.data.value,
                'name': value.data.id.toString(),
                'content': value.data.url
            };
            let newTabName = data.name + '';
            const tabs = state.tabList;
            let tabflag = false;
            tabs.forEach((tab, index) => {
                if (tab.name === data.name) tabflag = true;
            })
            if (!tabflag) state.tabList.push(data);
            state.tabValue = newTabName;
        },
        [types.REMOVE_TABLIST](state, targetName) {
            let tabs = state.tabList;
            let activeName = state.tabValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            state.tabValue = activeName;
            state.tabList = tabs.filter(tab => tab.name !== targetName);
        },
        [types.SET_TABVALUE](state) {

        }
    },
    actions: {
        addTabList({ commit, state }, data) {
            commit(types.ADD_TABLIST, data);
        },
        removeTabList({ commit, state }, targetName) {
            commit(types.REMOVE_TABLIST, targetName);
        },

    }
}