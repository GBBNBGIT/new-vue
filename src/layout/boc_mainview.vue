<template>
  <div>
    <el-tabs v-model="TabsValue" type="card" closable  @edit="handleTabsEdit" @tab-click="handleclick">
      <el-tab-pane :key="item.name" v-for="(item, index) in Tabs" :label="item.title" :name="item.name" :url="item.content">
        <!-- <router-view/> -->
        <templateview :url="item.content"></templateview>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type=text/ecmascript-6>
import { Tab } from './../components/common/tab.js'
import * as view from './../components/index.js'
export default {
  data() {
    return {
      TabsValue: '',
      Tabs: [],
      tabIndex: 0,
    }
  },
  methods: {
    handleclick(tabdata) {
      if (tabdata.label&&tabdata.name) {
        var data = {
          'value':tabdata.label,
          'id':tabdata.name
        }
         Tab.$emit('selectTab', data);
      }
    },
    handleTabsEdit(targetName, action, data = {}) {
      if (action === 'add') {
        let newTabName = data.name + '';
        const tabs = this.Tabs;
        let tabflag = false
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            this.TabsValue = targetName;
            tabflag = true;
          }
        })
        if (!tabflag) {
          this.Tabs.push(data);
          this.TabsValue = newTabName;
        }
      }
      if (action === 'remove') {
        let tabs = this.Tabs;
        let activeName = this.TabsValue;
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
        this.TabsValue = activeName;
        this.Tabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  },
  mounted: function() {
    var _this = this;
    Tab.$on('tabs', function(value) {
      var data = {
        'title': value.label || value.value,
        'name': value.id.toString(),
        'content': value.url
      };
      _this.handleTabsEdit(data.name, 'add', data);
    })
  },
  computed: {
    loginUser() {
      return this.$store.getters.loginUser
    },
    loginTime() {
      return this.$store.getters.loginTime
    }
  },
  created() {
    console.log(this.$store.getters.loginUser);
    console.log(this.$store.state);
  },
  components: {
    'templateview': {
      props: {
        url: {
          type: String,
          required: true
        }
      },
      render(createElement) {
        return createElement(view[this.url])
      }
    }
  }
};
</script>

<style>

</style>
