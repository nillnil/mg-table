<template>
  <mg-table
    v-loading="listLoading"
    ref="table"
    :table-columns="columns"
    :data="data"
    :operate="operate"
    :columns-props="columnsProps"
    :pagination="pagination"
    highlight-header
    highlight-current-row
    border
    element-loading-text="加载中"
    @row-click="selectRow"
    @load="load">
    <mg-table-column prop="date" label="日期" width="180"></mg-table-column>
    <template slot-scope="scope" slot="logoUrl">
      <div style="text-align: center;line-height: 0;">
        <img :src="scope.row.logoUrl">
      </div>
    </template>
  </mg-table>
</template>

<script>
import MgTable from '../../packages/table'
import MgTableColumn from '../../packages/table-column'

export default {
  name: 'BaseTable',
  components: {
    MgTable,
    MgTableColumn
  },
  data() {
    return {
      filter: {
        page: 1,
        pageSize: 10
      },
      listLoading: false,
      data: [],
      pagination: {
        total: 0,
        pageSizes: [10, 20, 50, 100],
        defaultSize: 10
      },
      columnsProps: {
        minWidth: 150
      },
      columns: [
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址', showOverflowTooltip: true },
        { prop: 'email', label: 'Email', showOverflowTooltip: true },
        { prop: 'logoUrl', label: 'logo', width: 120, align: 'center', template: true }
      ],
      operate: {
        width: 150,
        fixed: true,
        buttons: [{
          text: '修改',
          plain: true,
          type: 'primary',
          show: true,
          click: (row, e) => {
            this.handleUpdate(row, e)
          }
        }, {
          text: '删除',
          type: 'danger',
          show: (row) => {
            // 可根据row里的值是否显示按钮
            return true
          },
          click: (row, e) => {
            this.handleDelete(row, e)
          }
        }]
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load(pageSize, currentPage) {
      this.listLoading = true
      if (this.pagination) {
        this.filter.page = currentPage || 1
        this.filter.pageSize = pageSize || 10
      }

      const response = await this.$get('/mgTable/page', {
        pageSize: this.filter.pageSize,
        page: this.filter.page
      })

      if (response.data.success) {
        this.data = response.data.rows
        this.pagination.total = response.data.total
        this.data.forEach(d => {
          d.saleStatus = d.saleStatus + ''
          d.fitmentFlay = d.fitmentFlay + ''
        })
      }
      this.listLoading = false
    },
    selectRow(row) {
      console.log('点击的行：', row)
      this.$notifyInfo('点击行')
    },
    handleUpdate(row, e) {
      e.stopPropagation()
      e.preventDefault()
      console.log('修改的行：', row)
      this.$notifySuccess('修改成功')
    },
    handleDelete(row, e) {
      e.stopPropagation()
      e.preventDefault()
      console.log('删除的行：', row)
      this.$notifySuccess('删除成功')
    }
  }
}
</script>
