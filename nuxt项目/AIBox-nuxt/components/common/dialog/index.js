import dialog from './dialog.vue'
const Dialog = {
  install: function (Vue) {
    Vue.component('VDialog', dialog)
  }
}
export default Dialog
