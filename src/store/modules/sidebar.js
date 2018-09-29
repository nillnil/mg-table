const sidebar = {
  state: {
    menus: [],
    activeMenu: '1',
    backgroundColor: '#334154',
    textColor: '#BBC6D2',
    activeTextColor: '#579EF8'
  },
  getters: {
    menus: state => state.menus,
    activeMenu: state => state.activeMenu,
    backgroundColor: state => state.backgroundColor,
    textColor: state => state.textColor,
    activeTextColor: state => state.menus
  },
  mutations: {
    ADD_MENU: (state, menu) => {
      if (state.menus.some(v => v.name === menu.name)) return
      state.menus.push({
        index: menu.index,
        name: menu.name,
        title: menu.title,
        icon: menu.icon,
        component: menu.component
      })
    },
    DEL_MENU: (state, name) => {
      for (const [i, v] of state.menus.entries()) {
        if (v.name === name) {
          state.menus.splice(i, 1)
          break
        }
      }
    },
    SET_ACTIVE: (state, activeMenu) => {
      state.activeMenu = activeMenu
    },
    SET_BACKGROUD_COLOR: (state, backgroundColor) => {
      state.backgroundColor = backgroundColor
    },
    SET_TEXT_COLOR: (state, textColor) => {
      state.textColor = textColor
    },
    SET_ACTIVE_TEXT_COLOR: (state, activeTextColor) => {
      state.activeTextColor = activeTextColor
    }
  },
  actions: {
    addMenu: ({ commit }, menu) => {
      commit('ADD_MENU', menu)
    },
    delMenu: ({ commit }, menu) => {
      commit('DEL_MENU', menu)
    },
    setActive: ({ commit }, menu) => {
      commit('SET_ACTIVE', menu)
    },
    setBackgroudColor: ({ commit }, menu) => {
      commit('SET_BACKGROUD_COLOR', menu)
    },
    setTextColor: ({ commit }, menu) => {
      commit('SET_TEXT_COLOR', menu)
    },
    setActiveTextColor: ({ commit }, menu) => {
      commit('SET_ACTIVE_TEXT_COLOR', menu)
    }
  }
}

export default sidebar
