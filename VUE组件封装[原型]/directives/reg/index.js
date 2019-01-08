import {getStyle} from '../../assets/js/common'
import {Message} from 'element-ui'

export default {
    install (Vue, options) {
        // 指定v-reg="{req: /^****$/, failMsg: '验证不通过时的提示信息', failCallback: function}"
        Vue.directive('reg', {
            bind: function (el, binding, vnode) {
                let checkedInput = el.querySelector('input')
                let oldAttr = {
                    borderColor: getStyle(checkedInput, 'borderColor')
                }
                if (binding.value instanceof Array) {
                    checkedInput.addEventListener('blur', () => {
                        let result = binding.value.every((val, idx) => {
                            if (!val.req) { console.log('%c attribute reg is required !', 'color:red'); return false }
                            if (!val.failMsg && !val.failCallback) { console.log('%c attribute failMsg or failCallback is required !', 'color:red'); return false }
                            if(!val.failCallback){ return }
                            if (!val.req.test(checkedInput.value)) {
                                    val.failCallback()
                            }
                            return val.req.test(checkedInput.value)
                        })
                        if (!result) {
                            checkedInput.style.borderColor = '#f56c6c'
                        } else {
                            checkedInput.style.borderColor = oldAttr.borderColor
                        }
                    })
                } else {
                    console.log('%c binding.value must be a Array !', 'color:red')
                }
            }
        })
    }
}
