/**
 * 表格的属性、事件是跟分页合并在一起，所以在绑定表格的时候需要把分页相关的属性跟事件排除，
 * 而其中一些属性表格和分页同名，如layout等，如果同时mixins会冲突，所以将分页的属性全部放入到pagination中
 */
export default {
  // 分页属性
  props: [
    'pagination'
  ],
  // 分页事件
  events: [
    'load',
    'size-change',
    'sizeChange',
    'current-change',
    'currentChange',
    'prev-click',
    'prevClick',
    'prev-click',
    'prevClick'
  ],
  // 默认布局
  defaultLayout: 'total, sizes, prev, pager, next, jumper'
}
