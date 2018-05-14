// import ElTabs from "./tabs.vue"
import ElTabs from "../demo/tabs.vue"
import ElTabPane from "../demo/tab-pane.vue"
// ElTabs.install=function (Vue) {
//   Vue.component(ElTabs.name,ElTabs)
// }

export default {
  install:function (Vue) {
    Vue.component(ElTabs.name,ElTabs)
    Vue.component(ElTabPane.name,ElTabPane)
  }
}
