import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const total = Mock.mock('@integer(1, 100)')

export default {
  page: config => {
    const params = param2Obj(config.url)
    params.pageSize = params.pageSize || 10
    const num = total / params.pageSize > params.page ? params.pageSize : total % params.pageSize
    const data = []
    for (var i = 0; i < num; i++) {
      data.push({
        id: Mock.mock('@guid'),
        date: Mock.mock('@datetime'),
        name: Mock.mock('@string(3, 8)'),
        address: Mock.mock('@title(10, 50)'),
        email: Mock.mock('@email'),
        logoUrl: Mock.mock('@image("100x100", @color, "logo")')
      })
    }
    return {
      rows: data,
      total,
      message: '获取数据成功',
      code: 200,
      success: true
    }
  }
}
