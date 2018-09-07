<template>
  <div
    v-loading="loading"
    :element-loading-text="loadingText"
    :class="customStyle ? 'custom-table' : ''">
    <el-table
      ref="elTable"
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName || 'default-row'"
      :header-row-class-style="headerRowClassStyle"
      :row-key="rowKey"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"

      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click="cellClick"
      @cell-dblclick="cellDblclick"
      @row-click="rowClick"
      @row-contextmenu="rowContextmenu"
      @row-dblclick="rowDblclick"
      @header-click="headerClick"
      @header-contextmenu="headerContextmenu"
      @sort-change="sortChange"
      @filter-change="filterChange"
      @current-change="currentChange"
      @header-dragend="headerDragend"
      @expand-change="expandChange">

      <!-- 操作按钮列 -->
      <el-table-column
        v-if="(operate.show || true) && operate.buttons.length"
        :class-name="operate.className"
        :align="operate.align || columnsProps.align || 'center'"
        :label="operate.label || '操作'"
        :width="operate.width || columnsProps.width"
        :min-width="operate.minWidth || columnsProps.minWidth"
        :fixed="operate.fixed"
        :style="operate.style">
        <template slot-scope="scope">
          <span v-for="(btn, index) in operate.buttons" :key="index">
            <el-button
              v-if="operateBtnIsShow(btn.show, scope.row, scope)"
              :size="btn.size || 'mini'"
              :plain="btn.plain || (btn.plain !== false && true)"
              :type="btn.type"
              @click="btn.click(scope.row, scope)">{{ btn.text }}</el-button>
          </span>
        </template>
      </el-table-column>
      <!-- end -->

      <template v-for="(column, index) in columns">
        <!-- 普通列 -->
        <el-table-column
          v-if="!column.template"
          :key="index"
          :type="column.type"
          :index="column.index"
          :column-key="column.columnKey"
          :label="column.label"
          :property="column.property"
          :prop="column.prop"
          :width="column.width || columnsProps.width"
          :min-width="column.minWidth || columnsProps.minWidth"
          :fixed="column.fixed"
          :render-header="column.renderHeader"
          :sortable="column.sortable || (column.sortable !== false && columnsProps.sortable) || false"
          :sort-method="column.sortMethod"
          :sort-by="column.sortBy"
          :sort-orders="column.sortOrders"
          :resizable="column.resizable || (column.resizable !== false && columnsProps.resizable) || true"
          :formatter="column.formatter"
          :show-overflow-tooltip="column.showOverflowTooltip || (column.showOverflowTooltip !== false && columnsProps.showOverflowTooltip) || false"
          :align="column.align || columnsProps.align"
          :header-align="column.headerAlign || columnsProps.headerAlign"
          :class-name="column.className"
          :label-class-name="column.labelClassName"
          :selectable="column.selectable"
          :reserve-selection="column.reserveSelection"
          :filters="column.filters"
          :filter-placement="column.filterPlacement"
          :filter-multiple="column.filterMultiple || (column.filterMultiple !== false && columnsProps.filterMultiple) || true"
          :filter-method="column.filterMethod"
          :filtered-value="column.filteredValue"
          :style="column.style"/>
        <!-- end -->

        <!-- 使用tempalte的列 -->
        <el-table-column
          v-if="column.template"
          :key="index"
          :type="column.type"
          :index="column.index"
          :column-key="column.columnKey"
          :label="column.label"
          :property="column.property"
          :prop="column.prop"
          :width="column.width || columnsProps.width"
          :min-width="column.minWidth || columnsProps.minWidth"
          :fixed="column.fixed"
          :render-header="column.renderHeader"
          :sortable="column.sortable || (column.sortable !== false && columnsProps.sortable) || false"
          :sort-method="column.sortMethod"
          :sort-by="column.sortBy"
          :sort-orders="column.sortOrders"
          :resizable="column.resizable || (column.resizable !== false && columnsProps.resizable) || true"
          :formatter="column.formatter"
          :show-overflow-tooltip="column.showOverflowTooltip || (column.showOverflowTooltip !== false && columnsProps.showOverflowTooltip) || false"
          :align="column.align || columnsProps.align"
          :header-align="column.headerAlign || columnsProps.headerAlign"
          :class-name="column.className"
          :label-class-name="column.labelClassName"
          :selectable="column.selectable"
          :reserve-selection="column.reserveSelection"
          :filters="column.filters"
          :filter-placement="column.filterPlacement"
          :filter-multiple="column.filterMultiple || (column.filterMultiple !== false && columnsProps.filterMultiple) || true"
          :filter-method="column.filterMethod"
          :filtered-value="column.filteredValue"
          :style="column.style">
          <template v-if="column.template" slot-scope="scope">
            <slot :name="column.prop" :scope="scope" :row="scope.row"/>
          </template>
        </el-table-column>
        <!-- end -->
      </template>
    </el-table>
    <div v-if="pagination" class="page-block">
      <el-pagination
        ref="elPagination"
        :class="pageClass"
        :small="pageSmall"
        :background="pageBackground"
        :pager-count="pagerCount"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="pageTotal"
        :popper-class="popperClass"
        :prev-text="prevText"
        :next-text="nextText"
        :disabled="pageDisabled"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"/>
    </div>
  </div>
</template>
<script>
import ElTable from 'element-ui/lib/table'
import ElTableColumn from 'element-ui/lib/table-column'

export default {
  name: 'MgTable',
  components: {
    ElTable,
    ElTableColumn
  },
  props: {
    /* el-table 默认属性 */
    // 表格数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    // 表格高度
    height: [String, Number],
    // 表格最大高度
    maxHeight: [String, Number],
    // 表格最大高度
    stripe: {
      type: Boolean,
      default: false
    },
    // 是否有边框
    border: {
      type: Boolean,
      default: true
    },
    // 表格尺寸，medium / small / mini
    size: String,
    // 是否自适应
    fit: {
      type: Boolean,
      default: true
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 是否高亮选中的行
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    // 当前行的 key，只写属性
    currentRowKey: [String, Number],
    // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    rowClassName: [String, Function],
    // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
    rowStyle: [String, Function],
    // 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
    cellClassName: [String, Function],
    // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
    cellStyle: [String, Function],
    // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
    headerRowClassName: [String, Function],
    // 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
    headerRowClassStyle: [String, Function],
    // 行数据的 Key，用来优化 Table 的渲染；
    // 在使用 reserve-selection 功能的情况下，该属性是必填的。
    // 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
    rowKey: [String, Function],
    // 空数据时显示的文本内容
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
    expandRowKeys: Array,
    // 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
    // order: ascending, descending
    // 如果只指定了prop, 没有指定order, 则默认顺序是ascending
    defaultSort: Object,
    // tooltip effect 属性, dark/light
    tooltipEffect: String,
    // 是否在表尾显示合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    // 合计行第一列的文本, 合计
    sumText: {
      type: String,
      default: '合计'
    },
    // 自定义的合计计算方法
    summaryMethod: Function,
    // 合并行或列的计算方法
    spanMethod: Function,
    // 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    /* end */

    /* 自定义属性 */

    // 是否使用默认的样式
    customStyle: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    columns: Array,
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
    // 加载层文字
    loadingText: {
      type: String,
      default: '加载中'
    },
    // 列配置, 同el-table-column配置
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
      type: Boolean,
      default: true
    },
    // 默认每页数量，默认10
    defaultSize: {
      type: Number,
      default: 10
    },
    // 分页class
    pageClass: String,
    // 是否使用小型分页样式
    pageSmall: {
      type: Boolean,
      default: false
    },
    // 是否为分页按钮添加背景色
    pageBackground: {
      type: Boolean,
      default: false
    },
    // 页码按钮的数量，当总页数超过该值时会折叠
    pagerCount: {
      type: Number,
      default: 7
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    },
    // 每页显示个数选择器的下拉框类名
    popperClass: String,
    // 替代图标显示的上一页文字
    prevText: String,
    // 替代图标显示的下一页文字
    nextText: String,
    // 是否禁用
    pageDisabled: {
      type: Boolean,
      default: false
    }
    /* end */
  },
  data() {
    return {
      tableData: [],
      pageSize: this.defaultSize,
      currentPage: 1,
      pageTotal: 0
    }
  },
  watch: {
    data(val) {
      this.tableData = val
    },
    total(val) {
      this.pageTotal = val
    },
    defaultSize(val) {
      this.pageSize = val
    }
  },
  methods: {
    /* el-table 默认事件 */
    select(selection, row) {
      this.$emit('select', selection, row)
    },
    selectAll(selection) {
      this.$emit('select-all', selection)
    },
    selectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    cellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    cellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    cellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    cellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    rowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    rowContextmenu(row, event) {
      this.$emit('row-contextmenu', row, event)
    },
    rowDblclick(row, event) {
      this.$emit('row-dblclick', row, event)
    },
    headerClick(column, event) {
      this.$emit('header-click', column, event)
    },
    headerContextmenu(column, event) {
      this.$emit('header-contextmenu', column, event)
    },
    sortChange({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order })
    },
    filterChange(filters) {
      this.$emit('filter-change', filters)
    },
    currentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    headerDragend(newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event)
    },
    expandChange(row, expandedRows) {
      this.$emit('expand-change', row, expandedRows)
    },
    /* end */

    /* el-table 默认方法 */
    clearSelection() {
      this.$refs['elTable'].clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs['elTable'].toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      this.$refs['elTable'].toggleAllSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs['elTable'].toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this.$refs['elTable'].setCurrentRow(row)
    },
    clearSort() {
      this.$refs['elTable'].clearSort()
    },
    clearFilter() {
      this.$refs['elTable'].clearFilter()
    },
    doLayout() {
      this.$refs['elTable'].doLayout()
    },
    sort(params) {
      this.$refs['elTable'].sort(params)
    },
    /* end */

    /* 分页相关方法 */
    handleSizeChange(val) {
      this.pageSize = val
      this.$emit('load', this.pageSize, this.currentPage)
      this.$emit('size-change', val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('load', this.pageSize, this.currentPage)
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
      this.$emit('load', pageSize || this.pageSize, currentPage || this.currentPage)
    },
    // 返回表格对象
    getTable() {
      return this.$refs['elTable']
    },
    // 返回表格数据
    getTableData() {
      return this.tableData
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
  .custom-table >>> .el-table th {
    background-color: #f5f7fa;
    color: #606266;
  }
  .page-block {
    margin-top: 20px;
    padding: 5px 15px;
    border: 1px solid #ebeef5;
    height: 32px;
  }
</style>
