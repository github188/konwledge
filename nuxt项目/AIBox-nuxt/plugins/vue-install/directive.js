import {getStyle} from '../../assets/js/common'
import {Message} from 'element-ui'
import FullBg from '../../components/common/imglarge/index.js'

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
              if (!val.req.test(checkedInput.value)) {
                if (val.failCallback) {
                  val.failCallback()
                } else {
                  Message(val.failMsg) // 这里定义一个默认的提示形式，暂时没时间定义 用alert代替一下
                }
              }
              return val.req.test(checkedInput.value)
            })
            if (!result) {
              checkedInput.style.borderColor = '#f56c6c'
            } else {
              checkedInput.style.borderColor = oldAttr.borderColor
            }
          })
        }
      }
    }),
    Vue.directive('imglarge', {
      bind: function (el, binding, vnode) {
        if (el.nodeType == 1 && el.tagName === 'IMG') {
          let {src} = el
          el.addEventListener('click', (e)=>{
            // 生成一个容器，和遮罩
            let originElement = e.target
            let {left, top, width, height} = originElement.getBoundingClientRect()
            FullBg({
              originWidth: width,
              originHeight: height,
              originLeft: left,
              originTop: top,
              src
            })
          })
        }
      }
    })
  }
}
