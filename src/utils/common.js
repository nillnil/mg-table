import fetch from '@/utils/fetch'
import qs from 'qs'

const common = {
  install: function(Vue) {
    Vue.prototype.$get = function(url, params) {
      return fetch({
        url: url,
        method: 'get',
        params
      })
    }

    Vue.prototype.$post = function(url, data) {
      return fetch({
        url,
        method: 'post',
        data: qs.stringify(data)
      })
    }

    Vue.prototype.$notifySuccess = function(message = '成功', title = '提示', duration = 2000) {
      this.$notify.success({
        title: title,
        message: message,
        duration: duration
      })
    }

    Vue.prototype.$notifyError = function(message = '失败', title = '提示', duration = 2000) {
      this.$notify.error({
        title: title,
        message: message,
        duration: duration
      })
    }

    Vue.prototype.$notifyInfo = function(message = '通知', title = '提示', duration = 2000) {
      this.$notify.info({
        title: title,
        message: message,
        duration: duration
      })
    }

    Vue.prototype.$notifyWarning = function(message = '警告', title = '提示', duration = 2000) {
      this.$notify.warning({
        title: title,
        message: message,
        duration: duration
      })
    }
  }
}

export default common
