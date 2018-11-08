
const target = 'http://10.10.29.164'

module.exports = {
  proxy: {
    '/business': {
      target: target, // 接口域名
      changeOrigin: true // 是否跨域
    },
    '/common': {
      target: target, // 接口域名
      changeOrigin: true // 是否跨域
    },
    '/client': {
      target: target, // 接口域名
      changeOrigin: true // 是否跨域
    },
    '/basic': {
      target: target, // 接口域名
      changeOrigin: true // 是否跨域
    }
  }
}
