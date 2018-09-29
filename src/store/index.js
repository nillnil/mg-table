import Vue from 'vue'
import Vuex from 'vuex'
import tabsView from './modules/tabsView'
import sidebar from './modules/sidebar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sidebar,
    tabsView
  }
})

export default store
