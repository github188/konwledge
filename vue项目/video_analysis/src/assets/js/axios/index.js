import axios from 'axios'
import config from './config'
import {Message} from 'element-ui'

export default function $axios (url, params, type = 'GET') {
  return new Promise((resolve, reject) => {
    const instance = axios.create(config)

    //  请求处理
    instance({
      url: url,
      headers: { 'Authorization': 'PHPSESSID=svfm0hedc7ns6ago2f2tpjikn5' },
      method: type.toUpperCase(),
      params: type.toUpperCase() === 'GET' ? params : '',
      data: type.toUpperCase() === 'POST' ? params : ''
    }).then(res => {
      if (!window.handleErrCode) {
        if (!res.data) {
          Message.error('返回的数据为空')
        } else {
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
      reject(error)
    })
  })
}
