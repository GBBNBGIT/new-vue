import Vue from "vue";
import Moment from "moment";
Vue.filter("datetimeFilter", function(value) {
    return Moment(value).format("YYYY-MM-DD HH:mm:ss");
});