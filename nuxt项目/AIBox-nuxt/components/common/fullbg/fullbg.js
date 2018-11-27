import Vue from 'vue'
import bg from './fullbg.vue'

let FullBgConstructor = Vue.extend(bg)

let instance;

const FullBg = function(options){
    options = options || {}
    instance = new FullBgConstructor({
        data: options
    })
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    instance.dom = instance.vm.$el

    return instance.vm
}

export default FullBg