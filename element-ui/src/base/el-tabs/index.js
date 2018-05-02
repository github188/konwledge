import elTabs from "./el-tabs.vue"
import elTabPane from "./el-tab-pane.vue"
export default {
  install (Vue) {
    Vue.component("el-tabs",elTabs);
    Vue.component("el-tab-pane",elTabPane);
  }
};

