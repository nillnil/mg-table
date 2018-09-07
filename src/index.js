import mgtable from './packages/table'

mgtable.install = function(Vue) {
  Vue.component(mgtable.name, mgtable)
}

export default mgtable
