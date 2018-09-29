<template>
  <el-container id="app">
    <el-aside width="200px" style="position: fixed;height: 100%;">
      <side-bar></side-bar>
    </el-aside>
    <el-main style="margin-left: 200px;padding-top: 0;">
      <tabs></tabs>
    </el-main>
  </el-container>
</template>

<script>
import SideBar from './components/side-bar'
import Tabs from './components/tabs'

export default {
  components: {
    SideBar,
    Tabs
  }
}
</script>
<style>
  body {
    margin: 0;
  }

  #app {
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .scrollbar-wrapper {
    overflow-x: hidden!important;
  }
  .scrollbar-wrapper .el-scrollbar__view {
    height: 100%;
  }

  .el-menu {
    height: 100%;
  }

  /* 滚动条 */
  ::-webkit-scrollbar-button {
    display: none;

  }

  ::-webkit-scrollbar-track {
    background-color: #fff;
  }

  ::-webkit-scrollbar-track-piece {
    background: #fff;
  }

  ::-webkit-scrollbar {
    height: 8px;
    width: 6px;
    background: rgba(118,176,243,.3);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    width: 8px;
    min-height: 15px;
    background: rgba(0,0,0,.2);
    border-radius: 5px;
  }
  /* end */
</style>
