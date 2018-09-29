import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_URL || '',
  timeout: 5000
})

service.interceptors.response.use(
  response => response,
  error => {
    console.error('error' + error)
    if (error.message.indexOf('timeout') !== -1) {
      // 超时
      MessageBox.confirm('网络不是很稳定，请重新刷新页面', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        console.info(this)
        console.info(window)
        location.reload()
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
