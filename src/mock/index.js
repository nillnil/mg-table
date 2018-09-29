import Mock from 'mockjs'
import tableApi from './table'

Mock.mock(/mgTable\/page/, 'get', tableApi.page)

export default Mock
