<template>
  <div
    :class="highlightHeader ? 'table-highlight-header' : ''">
    <!--<div v-show="false" class="el-table__body-wrapper"></div>-->
    <!-- 预留slot -->
    <slot name="prepend"></slot>
    <el-table
      ref="elTable"
      v-bind="binds"
      v-on="listeners">
      <!-- eltable里会找bodyWrapper去添加事件，防止报错 -->
      <div v-show="false" ref="bodyWrapper"></div>

      <slot></slot>

      <!-- 操作列 -->
      <el-table-column
        v-if="operate.buttons.length"
        v-bind="opertaeBinds">
        <template slot-scope="scope">
          <!-- btn里的show控制按钮是否显示，为了不放v-if跟v-for不一起用，采用v-show方式 -->
          <!-- 如果在外面套多一层，如span，div会使按钮原有默认的一些样式失效，而按钮可能是通过row的值来判断显示与否，所以不采用计算属性的方法，所以综合之后采用v-show的方式控制显示与否 -->
          <el-button
            v-for="(btn, index) in operate.buttons"
            v-show="operateBtnIsShow(btn.show, scope.row, scope)"
            :key="'operate_btn_' + index"
            :size="btn.size || 'mini'"
            :plain="btn.plain || (btn.plain !== false && true)"
            :type="btn.type"
            @click="btn.click(scope.row, $event, scope)">{{ btn.text }}</el-button>
        </template>
      </el-table-column>

      <el-table-column
        v-for="(column, index) in tableColumns"
        :key="'mg_table_column_' + index"
        v-bind="columnsBinds[index]">
        <template slot-scope="scope">
          <!-- 普通列 -->
          <template v-if="!column.template">{{ scope.row[column.prop] }}</template>

          <!-- slot列 -->
          <template v-if="column.template">
            <slot :name="column.prop" v-bind="scope"></slot>
          </template>
        </template>
      </el-table-column>

    </el-table>

    <div v-if="pagination" class="page-block">
      <el-pagination
        ref="elPagination"
        v-bind="paginationBinds"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import ElTable from 'element-ui/lib/table'
import ElTableColumn from 'element-ui/lib/table-column'
import ElPagination from 'element-ui/lib/pagination'
import paginations from './paginations'

export default {
  name: 'MgTable',
  components: {
    ElTableColumn,
    ElPagination
  },
  mixins: [ElTable],
  props: {
    /* 自定义属性 */
    // 是否使用高亮表头的样式
    highlightHeader: {
      type: Boolean,
      default: false
    },
    tableColumns: Array,
    // 操作列
    operate: {
      type: Object,
      default: () => {
        return {
          label: '操作',
          width: 100,
          align: 'center',
          // left or right
          fixed: 'left',
          className: '',
          style: {},
          buttons: []
        }
      }
    },
    // 列配置, 同el-table-column配置, 全局配置
    columnsProps: {
      type: Object,
      default: () => {
        return {
          // 默认行宽度
          width: {},
          // 默认行最小宽度
          minWidth: {},
          // 默认行文本位置
          align: null,
          // 是否为超出文本内容提供tooltip
          showOverflowTooltip: false,
          // 是否排序
          sortable: false,
          // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真
          resizable: true,
          // 表头对齐方式，若不设置该项，则使用表格的对齐方式
          headerAlign: null,
          // 数据过滤的选项是否多选
          filterMultiple: true
        }
      }
    },
    // 是否有分页
    pagination: {
      type: [Boolean, Object],
      default: true
    }
  },
  data() {
    return {
      mgData: []
    }
  },
  computed: {
    binds() {
      const binds = { ...this._props }
      // 删除分页属性
      paginations.props.forEach(p => {
        delete binds[p]
      })
      return binds
    },
    listeners() {
      const listeners = { ...this.$listeners }
      // 删除分页事件
      paginations.events.forEach(e => {
        delete listeners[e]
      })
      return listeners
    },
    // 操作列的v-bind
    opertaeBinds() {
      const column = { ...this.operate }
      column.align = column.align || this.columnsProps.align || 'center'
      column.label = column.label || '操作'
      column.width = column.width || this.columnsProps.width
      column.minWidth = column.minWidth || this.columnsProps.minWidth
      return column
    },
    // column每一列的v-bind
    columnsBinds() {
      const array = []
      this.tableColumns.forEach(column => {
        const temp = { ...column }
        column.width = column.width || this.columnsProps.width
        column.minWidth = column.minWidth || this.columnsProps.minWidth
        column.sortable = column.sortable || (column.sortable !== false && this.columnsProps.sortable) || false
        column.resizable = column.resizable || (column.resizable !== false && this.columnsProps.resizable) || true
        column.showOverflowTooltip = column.showOverflowTooltip || (column.showOverflowTooltip !== false && this.columnsProps.showOverflowTooltip) || false
        column.align = column.align || this.columnsProps.align
        column.headerAlign = column.headerAlign || this.columnsProps.headerAlign
        array.push(temp)
      })
      return array
    },
    // 分页的v-bind
    paginationBinds() {
      const pagination = { ...this.pagination }
      if (typeof (pagination) === 'boolean') {
        if (pagination === true) {
          return {
            layout: paginations.defaultLayout
          }
        }
        return {}
      } else if (typeof (pagination) === 'object') {
        pagination.layout = pagination.layout || paginations.defaultLayout
        return pagination
      }
      return {}
    }
  },
  watch: {
    data(val) {
      this.mgData = val
    }
  },
  methods: {
    /* 分页相关方法 */
    handleSizeChange(val) {
      if (this.$listeners['load']) {
        this.$emit('load', val, this.currentPage)
      }
      this.pagination.pageSize = val
      this.$emit('size-change', val)
    },
    handleCurrentChange(val) {
      if (this.$listeners['load']) {
        this.$emit('load', this.pageSize, val)
      }
      this.pagination.currentPage = val
      this.$emit('current-change', val)
    },
    handlePrevClick(val) {
      this.$emit('prev-click', val)
    },
    handleNextClick(val) {
      this.$emit('next-click', val)
    },
    /* end */

    // 加载数据，触发父组件的load方法，修改分页大小，切换分页时会自动触发
    loadData(pageSize, currentPage) {
      if (this.$listeners['load']) {
        this.$emit('load', pageSize || this.pageSize, currentPage || this.currentPage)
      }
    },
    // 返回表格数据
    getTableData() {
      return this.mgData
    },
    // 返回表格数据
    getTable() {
      return this.$refs['elTable']
    },
    // 返回分页对象
    getPagination() {
      return this.$refs['elPagination']
    },
    // 是否显示操作列的按钮
    operateBtnIsShow(show, row, scope) {
      if (typeof (show) === 'boolean') {
        return show
      } else if (typeof (show) === 'function') {
        return show(row, scope)
      }
      return true
    }
  }
}
</script>
<style scoped>
  .table-highlight-header >>> .el-table th {
    background-color: #f5f7fa;
    color: #606266;
  }
  .table-highlight-header >>> .el-table th.gutter{
    display: table-cell!important;
  }
  .page-block {
    margin-top: 20px;
    padding: 5px 15px;
    border: 1px solid #ebeef5;
    height: 32px;
  }
</style>
