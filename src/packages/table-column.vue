<template>
  <el-table-column
    v-bind="_props"
    v-on="$listeners">
  </el-table-column>
</template>

<script>
import ElTableColumn from 'element-ui/lib/table-column'

export default {
  name: 'MgTableColumn',
  mixins: [ElTableColumn]
}
</script>
