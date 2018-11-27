import {getStyle} from '../../assets/js/common'
import {Message} from 'element-ui'
import FullBg from '../../components/common/fullbg/fullbg.js'

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
          console.log('img标签')
          let {src} = el
          el.addEventListener('click', (e)=>{
            // 阻止事件冒泡
            // let e = e || window.event;
            // e.stopPropagation()

            // 生成一个容器，和遮罩
            console.log(1)
            FullBg({
              src: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2608382548,659077296&fm=173&app=25&f=JPEG?w=218&h=146&s=99206697681317C2D2B2E0B50300704A'
            })
            console.log(2)
          })
        }
      }
    })
  }
}