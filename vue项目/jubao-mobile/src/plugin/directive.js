/**
 * Created by pc-20170420 on 2017/10/19.
 */
import {wwwCheck} from "../assets/js/common"
import {touchFeel} from "../views/mixins/index";

export let directive={};
directive.install = function (Vue, options) {
  // 2. 添加全局资源
  Vue.directive('testNone', {
    bind: function (el, binding, vnode) {
      if(!wwwCheck()){
        el.style.display="none"
      }
    }
  });
  Vue.directive('wwwNone', {
    bind: function (el, binding, vnode,oldVnode) {
      if(wwwCheck()){
        el.style.display="none"
      }
    }
  });
  Vue.directive('touchFeel', {
    bind: function (el, binding, vnode) {
      let bg=el.style.background;
      let textColor= el.style.color;
      binding.value= binding.value || {};
      binding.value.color=binding.value.color || "#0089ed";
      // console.log(el,binding.value)
      el.addEventListener("touchstart",function () {
        el.style.background=binding.value.color;
        el.style.color=binding.value.textColor || textColor;
      })
      el.addEventListener("touchmove",function () {
        el.style.background=bg;
        el.style.color=textColor;
      })
      el.addEventListener("touchend",function () {
        el.style.background=bg;
        el.style.color=textColor;
      })
    }
  });
};
// exports.vuePlugin=vuePlugin;
