import axios from 'axios'
import config from './config'
import {Message} from 'element-ui'
import {cookie} from '../common'

export default function $axios (url, params, type = 'GET') {
  return new Promise((resolve, reject) => {
    const instance = axios.create(config)

    // // response 拦截器
    // instance.interceptors.response.use(
    //   response => {
    //     let data
    //     // IE9时response.data是undefined，因此需要使用response.request.res
    //     if (response.data === undefined) {
    //       data = JSON.parse(response.request.responseText)
    //     } else {
    //       data = response.data
    //     }
    //     return data
    //   },
    //   err => {
    //     if (err && err.response) {
    //       switch (err.response.status) {
    //       case 400:
    //         err.message = '请求错误'
    //         break
    //       case 401:
    //         err.message = '未授权，请登录'
    //         break
    //       case 403:
    //         err.message = '拒绝访问'
    //         break
    //       case 404:
    //         err.message = `请求地址出错: ${err.response.config.url}`
    //         break
    //       case 408:
    //         err.message = '请求超时'
    //         break
    //       case 500:
    //         err.message = '服务器内部错误'
    //         break
    //       case 501:
    //         err.message = '服务未实现'
    //         break
    //       case 502:
    //         err.message = '网关错误'
    //         break
    //       case 503:
    //         err.message = '服务不可用'
    //         break
    //       case 504:
    //         err.message = '网关超时'
    //         break
    //       case 505:
    //         err.message = 'HTTP版本不受支持'
    //         break
    //       default:
    //       }
    //     }
    //     console.error(err)
    //     return Promise.reject(err) // 返回接口返回的错误信息
    //   }
    // )

    //  请求处理
    instance({
      url: url,
      headers: {'Authorization': cookie.get('seemmo')},
      method: type.toUpperCase(),
      params: type.toUpperCase() === 'GET' ? params : '',
      data: type.toUpperCase() === 'POST' ? params : ''
    }).then(res => {
      if (!window.handleErrCode) {
        if (!res.data) {
          Message.error('返回的数据为空')
        } else {
          console.log('xing133: res.data.code=' + res.data.code)
          console.log('xing133: res.data.message=' + res.data.message)

          if (res.data.code == 0) {  // eslint-disable-line
            resolve(res.data)
          } else {
            Message.error(res.data.message)
            reject(res.data)
          }
        }
      } else {
        resolve(res.data)
      }
      return false
    }).catch(error => {
      Message.error(error.message)
      reject(error)
    })
  })
}
