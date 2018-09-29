<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%;">
    <el-menu
      background-color="#334154"
      text-color="#BBC6D2"
      active-text-color="#579EF8"
      default-active="1">
      <el-menu-item
        v-for="(menu, index) in menus"
        :key="'menu_' + index"
        :index="menu.index"
        @click="clickMenu(menu)">
        <i :class="menu.icon || 'el-icon-menu'"></i>
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import Tables from '../tables'
import { mapState } from 'vuex'

export default {
  name: 'SideBar',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      menus: state => state.sidebar.menus
    })
  },
  mounted() {
    Tables.tables.forEach((table, index) => {
      this.$store.dispatch('addMenu', {
        index: (index + 1) + '',
        name: table.title,
        title: table.title,
        icon: table.icon,
        component: table.component
      })
    })
    this.clickMenu(this.menus[0])

    // for (var i = 2; i < 20; i++) {
    //   this.$store.dispatch('addMenu', {
    //     index: i + '',
    //     name: '基础表格' + i,
    //     title: '基础表格' + i,
    //     icon: 'el-icon-menu',
    //     component: this.menus[0].component
    //   })
    // }
  },
  methods: {
    clickMenu(menu) {
      this.$store.dispatch('addTab', {
        label: menu.title,
        name: menu.title,
        content: menu.component
      })
    }
  }
}
</script>
