<template>
    <div class="search">
        <!-- <div class="input">
                            <el-autocomplete popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch" placeholder="请输入内容">
                                <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick">
                                </i>
                                <template slot-scope="props">
                                    <el-tree empty-text="未检索到数据！" ref="searchtree" :data="props.item.data" :props="defaultProps" @node-click="handleSelectClick">
                                    </el-tree>
                                </template>
                            </el-autocomplete>
                        </div> -->
        <search :Data="data" v-on:key="getKey" v-on:value="getValue"></search>
        <el-tree :data="alldata" node-key="id" ref="tree" :default-expanded-keys="key" :props="defaultProps" @node-click="handleNodeClick">
        </el-tree>
    </div>
</template>
<script>
import URL from './../components/common/url.vue'
import api from './../axios/api.js'
import Search from './aside/search.vue'
var deepCloneArr = (arr) => {

}
export default {
    data() {
        return {
            key: [],
            alldata: [],
            data: [],
            // state: '',
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
        getKey(key) {
            this.key = key;
        },
        getValue(value) {
            var _this = this;
            setTimeout(function() {
                _this.filterNode(_this.$refs.tree.$children, value, _this.key[0]);
            }, 100)
        },
        /*//输入框方法
        querySearch(queryString, cb) {
            var restaurants = this.data;
            var results = [{ "data": (queryString ? this.filterData(restaurants, queryString) : restaurants) }];
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        handleSelectClick(queryString, value, node) {
            if (this.selectnode.style) {
                this.selectnode.style = "";
            }
            if (!queryString.children && queryString.url) {
                var key = [];
                key.push(queryString.id);
                this.key = key
                //此处将搜索中的选择项设置为csscolor
                // node.$el.style.color = csscolor
                // this.selectnode = node.$el;
                this.$router.push(queryString.url)
                //打开设置选中项为输入框值
                // this.state = queryString.label
                // this.filterNode(this.$refs.tree.$children, queryString.label);
            }

        },
        handleIconClick(ev) {
            // console.log(ev);
            //清空输入框中的数据
            this.state = ''
        },*/
        //树方法
        handleNodeClick(data, value, node) {
            if (this.selectnode.style) {
                this.selectnode.style = "";
            }
            if (!data.children && data.url) {
                node.$el.style.color = this.csscolor
                this.selectnode = node.$el;
                this.$router.push(data.url)
            }
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
                    this.filterNode(element.$children, value,key);
                }
                else {
                    if (element.$el.innerText == value&&element.node.key == key) {
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

        //深拷贝，
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


