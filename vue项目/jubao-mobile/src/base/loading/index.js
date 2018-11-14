import MyLoading from './loading.vue'
const Loading = {
  install: function (Vue) {
    let Loading = Vue.extend(MyLoading);
    let tpl = new Loading().$mount();
    document.body.appendChild(tpl.$el);
    Vue.prototype.$Loading = {
      open:tpl.open,
      loadImg:tpl.loadImg,
      close:tpl.close
    }
  }
}
export default Loading
