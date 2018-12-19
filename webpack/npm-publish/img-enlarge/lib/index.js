import FullBg from '../src/imgEnlarge/index'

export default {
    install (Vue, options) {
        Vue.directive('enlarge', {
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
