<template>
  <div id="app">
    <Table
      ref="table"
      :loading="listLoading"
      :data="data"
      :total="total"
      :defaultSize="3"
      :columns="columns"
      :columns-props="columnsProps"
      :operate="operate"
      :page-sizes="[3, 10, 20, 50, 100]"
      :pagination="pagination"
      @load="load">
      <template slot-scope="props" slot="operate">
        <el-button size="mini" plain @click="updateStauts(props.row)">状态</el-button>
        <el-button :disabled="props.scope.row.unitNum > 0" size="mini" plain type="danger">删除</el-button>
      </template>
      <template slot-scope="props" slot="price">
        <span>{{ props.row.price }}</span>
      </template>
      <template slot-scope="props" slot="logo">
        <div style="text-align: center;">
          <img :src="props.row.logoUrl" class="image">
        </div>
      </template>
      <template slot-scope="props" slot="deliverDate">
        <span>{{ props.row.deliverDate }}</span>
      </template>
      <template slot-scope="props" slot="isSale">
        <span>{{ isSaleData[props.row.isSale] }}</span>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from './packages/table'

const filterData = {
  '1': '条件1',
  '2': '条件2',
  '3': '条件3'
}

const tableData = [{
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  testFilter: 1
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄',
  testFilter: 3
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄',
  testFilter: 2
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄',
  testFilter: 1
}]

export default {
  components: {
    Table
  },
  data() {
    return {
      filterData,
      filter: {
        page: 1,
        rows: 3
      },
      listLoading: false,
      data: [],
      total: 0,
      pagination: true,
      columnsProps: {
        minWidth: 150
      },
      columns: [
        { prop: 'operate', label: '操作', align: 'center', fixed: 'right', width: 150, template: true },
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址', width: 150, showOverflowTooltip: true },
        { prop: 'logo', label: 'logo', align: 'center', template: true },
        { prop: 'testFilter',
          label: '测试过滤',
          formatter: (row, column, cellValue) => {
            return filterData[cellValue]
          },
          filters: [
            { text: '条件1', value: '1' },
            { text: '条件2', value: '2' },
            { text: '条件3', value: '3' }
          ],
          filterMethod: (value, row) => {
            return row.testFilter === value
          }
        }
      ],
      operate: {
        width: 100,
        fixed: true,
        buttons: [{
          text: '上架',
          type: 'primary',
          plain: false,
          show: (row) => {
            return row.isSale === 0
          },
          click: (row) => {
            this.handleSale(row)
          }
        }, {
          text: '下架',
          type: 'danger',
          show: (row, scope) => {
            return scope.row.isSale === 1
          },
          click: (row) => {
            this.handleSale(row)
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
        this.filter.rows = pageSize || 3
      }
      const response = {
        data: {
          rows: tableData,
          total: 105,
          success: true,
          message: '',
          code: 0
        }
      }
      if (response.data.success) {
        this.data = response.data.rows
        this.total = response.data.total
        this.data.forEach(building => {
          building.saleStatus = building.saleStatus + ''
          building.fitmentFlay = building.fitmentFlay + ''
        })
      }
      this.listLoading = false
    },
    handleSale(row) {
      console.info(row)
    },
    updateStauts(row) {
      console.info(row)
      console.info('修改状态成功')
    }
  }
}
</script>
<style>
  #app {
    width: 80%;
    margin: 20px auto;

    color: #2c3e50;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .image {
    width: 60px;
    height: 60px;
  }

  /* 滚动条 */
  ::-webkit-scrollbar-button {
    display: none;

  }

  ::-webkit-scrollbar-track {
    background-color: #fff;
  }

  ::-webkit-scrollbar-track-piece {
    background: #fff;
  }

  ::-webkit-scrollbar {
    height: 8px;
    width: 6px;
    background: rgba(118,176,243,.3);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    width: 8px;
    min-height: 15px;
    background: rgba(0,0,0,.2);
    border-radius: 5px;
  }
  /* end */
</style>
