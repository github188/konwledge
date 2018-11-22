export { flashChecker } from './flashChecker';
export {format} from './date-string-transform';
export {importScript} from './script'

export const cookie = {
  set (name, value, time = 4) { // 默认为4小时
    let exp = new Date()
    exp.setTime(exp.getTime() + time * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },
  get (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)') // 正则匹配
    let arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  clear (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    document.cookie = name + '=' + name + ';expires=' + exp.toGMTString() + ';path=/'
  }
}

export const getStyle = (el, attr) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el)[attr]
  } else {
    return el.currentStyle[attr]
  }
}

export const deepCopy = (obj) => {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepCopy(obj[key])
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}
