<template>
  <el-tabs
    v-model="activeTab"
    :type="type"
    :tab-position="tabPosition"
    class="tabs"
    closable
    @tab-click="selectTab"
    @tab-remove="removeTab">
    <el-tab-pane v-for="(tab, index) in tabs" :key="'tab_' + index" :label="tab.label" :name="tab.name">
      <component :is="tab.content"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Tabs',
  data() {
    return {
      activeTab: null
    }
  },
  computed: {
    ...mapState({
      tabs: state => state.tabsView.tabs,
      type: state => state.tabsView.type,
      tabPosition: state => state.tabsView.tabPosition,
      storeActiveTab: state => state.tabsView.activeTab
    })
  },
  watch: {
    storeActiveTab(val) {
      this.activeTab = val
    }
  },
  methods: {
    selectTab(tab) {
      this.activeTab = tab.label
      this.$store.dispatch('setActiveTab', tab.label)
    },
    removeTab(targetName) {
      const tabs = this.tabs
      let activeName = this.activeTab
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.$store.dispatch('delTab', targetName)
      this.activeTab = activeName
    }
  }
}
</script>
<style scope>
  .tabs >>> .el-tabs__item {
    padding-left: 8px;
  }
  .tabs > .el-tabs__header {
    padding-top: 10px;
    position: fixed;
    margin: 0;
    top: 0;
    z-index: 100;
    background-color: #fff;
    width: calc(100% - 240px);
  }
  .tabs > .el-tabs__content {
    z-index: 10;
    padding-top: 75px;
  }
</style>
