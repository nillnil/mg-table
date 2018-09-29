const tabsView = {
  state: {
    tabs: [],
    type: null,
    tabPosition: 'top',
    activeTab: ''
  },
  getters: {
    tabs: state => state.tabs.tabs,
    type: state => state.tabs.type,
    tabPosition: state => state.tabs.tabPosition,
    activeTab: state => state.tabs.activeTab
  },
  mutations: {
    ADD_TAB: (state, tab) => {
      if (state.tabs.some(v => v.name === tab.name)) return
      state.tabs.push({
        label: tab.label,
        name: tab.name,
        content: tab.content
      })
    },
    DEL_TAB: (state, name) => {
      for (const [i, v] of state.tabs.entries()) {
        if (v.name === name) {
          state.tabs.splice(i, 1)
          break
        }
      }
    },
    SET_ACTIVE_TAB: (state, activeTab) => {
      state.activeTab = activeTab
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_TAB_POSITION: (state, tabPosition) => {
      state.tabPosition = tabPosition
    }
  },
  actions: {
    addTab({ commit }, tab) {
      commit('ADD_TAB', tab)
      commit('SET_ACTIVE_TAB', tab.name)
    },
    delTab({ commit }, tab) {
      commit('DEL_TAB', tab)
    },
    setActiveTab({ commit }, activeTab) {
      commit('SET_ACTIVE_TAB', activeTab)
    },
    setType({ commit }, type) {
      commit('SET_TYPE', type)
    },
    setTabPosition({ commit }, tabPosition) {
      commit('SET_TAB_POSITION', tabPosition)
    }
  }
}

export default tabsView
