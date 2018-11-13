import {cookie, deepCopy, flashChecker} from '../../assets/js/common'
import api from '../../assets/js/api'

export default {
  install (Vue, options) {
    Vue.prototype.$cookie = cookie
    Vue.prototype.$copy = deepCopy
    Vue.prototype.$api = api
    Vue.prototype.$flashChecker = flashChecker
  }
}
