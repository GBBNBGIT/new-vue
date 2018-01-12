<template>
    <div class="search">
        <!-- <search :Data="data" v-on:key="getKey" v-on:value="getValue"></search> -->
        <search :Data="data" v-on:key="getKey"></search>
        <el-tree accordion :data="alldata" node-key="id" ref="tree" :default-expanded-keys="key" :props="defaultProps" @node-click="handleNodeClick">
        </el-tree>
    </div>
</template>
<script>
import URL from './../components/common/url.vue'
import api from './../axios/api.js'
import Search from './aside/search.vue'
import { Tab } from './../components/common/tab.js'
export default {
    data() {
        return {
            key: [],
            alldata: [],
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            selectnode: {},
            csscolor: 'blue'
        };
    },
    created() {
        this.getTreeData();
    },
    methods: {
        //获取子组件search传递的参数key(打开树)的方法
        getKey(key) {
            this.handleSelectkey(key);
        },
        //树方法
        handleNodeClick(data, value, node) {
            if (this.selectnode.style) {
                this.selectnode.style = "";
            }
            if (!data.children && data.url) {
                node.$el.style.color = this.csscolor
                this.selectnode = node.$el;
                // this.$router.push(data.url);
                Tab.$emit('tabs', data);
                //此处使用的VUEX添加TAB数据
                this.$store.dispatch('addTabList', {
                     data:queryString
                })
            }
        },
        //对获取到的数据进行样式修改
        handleSelectkey(data) {
            var _this = this;
            var activeId = [];
            activeId.push(data.id);
            _this.key = activeId;
            setTimeout(function() {
                _this.filterNode(_this.$refs.tree.$children, data.value, data.id);
            }, 100)
        },
        getTreeData() {
            // 通过API获取到mock数据
            const url = `${URL.HTTP + URL.SERVER_PATH}:${URL.PORT}/api/tree`
            api.get(url)
                .then(res => {
                    this.alldata = res.data;
                    this.deepExtend(res.data, this.data)
                });
            //正常的数据请求方式
            // this.$http.get(url).then(
            //     res => {
            //         if (res.status == 200 && res.statusText == "OK") {
            //             console.log(res);
            //             // this.alldata = res.data.data;
            //         }
            //     },
            //     res => {

            //     }
            // )

        },
        //筛选出查询的树节点，以树的形式输出
        filterData(data, value) {
            if (value.trim()) {
                var newdata = [];
                data.forEach(function(element) {
                    if (element.label.indexOf(value) > -1) {
                        newdata.push(element);
                    }
                    else if (element.children && element.children.length) {
                        var itemdata = this.filterData(element.children, value)
                        if (itemdata.length) {
                            element.children = itemdata;
                            newdata.push(element);
                        }
                    }
                }, this);
                return newdata;
            }
        },
        //同过搜素中查询树中对应的节点，添加颜色
        filterNode(data, value, key) {
            data.forEach(function(element) {
                if (element.$children && element.$children.length > 0) {
                    this.filterNode(element.$children, value, key);
                }
                else {
                    if (element.$el.innerText == value && element.node.key == key) {
                        if (this.selectnode.style) {
                            this.selectnode.style = "";
                        }
                        element.$el.style.color = this.csscolor
                        this.selectnode = element.$el;
                        // this.selectnodes.push(element.$el);
                    }
                }
            }, this)
        },

        //深拷贝，source 原对象 target 目标对象
        deepExtend(source, target) {
            for (var key in source) {
                if (Object.prototype.toString.apply(source[key]) === '[object Object]') {
                    target[key] = {}
                    this.deepExtend(source[key], target[key])
                } else if (Object.prototype.toString.apply(source[key]) === '[object Array]') {
                    target[key] = []
                    this.deepExtend(source[key], target[key])
                } else {
                    target[key] = source[key]
                }
            }
        }

    },
    mounted: function() {
        var _this = this;
        Tab.$on('selectTab', function(value) {
            _this.handleSelectkey(value);
        })
    },
    components: {
        search: Search
    }
}
</script>
<style scoped>
.search {
    line-height: 20px;
}
</style>


