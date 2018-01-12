<template>
  <el-container>
    <el-header>
      <boc-header></boc-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <boc-aside></boc-aside>
      </el-aside>
      <el-main>
        <!-- <div id="app">
          <img src="./assets/logo.png">
        </div> -->
        <boc-main-view></boc-main-view>
      </el-main>
    </el-container>
    <el-footer>
      <boc-footer></boc-footer>
    </el-footer>
  </el-container>
</template>

<script>
import BocAside from "./layout/boc_aside.vue";
import BocFooter from "./layout/boc_footer.vue";
import BocHeader from "./layout/boc_header.vue";
import BocMainView from "./layout/boc_mainview.vue";
export default {
  name: "app",
  components: {
    BocAside,
    BocFooter,
    BocHeader,
    BocMainView
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #D3DCE6; */
  background-color: #E9EEF3;
  padding: 10px;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #E9EEF3; */
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
