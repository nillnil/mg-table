import MgTable from './packages/table'

MgTable.install = function(Vue) {
  Vue.component(MgTable.name, MgTable)
}

export default MgTable
