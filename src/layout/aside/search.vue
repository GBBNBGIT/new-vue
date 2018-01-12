<template>
    <div class="input">
        <el-autocomplete popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch" placeholder="请输入内容">
            <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick">
            </i>
            <template slot-scope="props">
                <div class="name" @click="handleSelectClick(props.item)">{{ props.item.value }}</div>
                <!-- <el-tree empty-text="未检索到数据！" ref="searchtree" :data="props.item.data" :props="defaultProps" @node-click="handleSelectClick">
                                                    </el-tree> -->
            </template>
        </el-autocomplete>
    </div>
</template>
<script>
import { Tab } from './../../components/common/tab.js'
export default {
    data() {
        return {
            state: '',
        };
    },
    props: ['Data'],
    methods: {
        //输入框方法
        querySearch(queryString, cb) {
            var restaurants = this.$props.Data;
            var results = queryString ? this.filterData(restaurants, queryString) : [];
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        handleSelectClick(queryString) {
            this.$emit('key', queryString);
            if (queryString.url) {
                Tab.$emit('tabs', queryString);
                //此处使用的VUEX添加TAB数据
                this.$store.dispatch('addTabList', {
                     data:queryString
                })
            }
        },
        handleIconClick(ev) {
            //清空输入框中的数据
            this.state = ''
        },
        //筛选出查询的树节点,按列输出
        filterData(data, value) {
            if (value.trim()) {
                var newdata = [];
                data.forEach(function(element) {
                    if (element.label.indexOf(value) > -1) {
                        newdata.push({
                            "value": element.label,
                            "id": element.id,
                            "url": element.url || ''
                        });
                    }
                    if (element.children && element.children.length) {
                        var itemdata = this.filterData(element.children, value)
                        if (itemdata.length) {
                            newdata = newdata.concat(itemdata);
                        }
                    }
                }, this);
                return newdata;
            }
        }
    }
}
</script>
