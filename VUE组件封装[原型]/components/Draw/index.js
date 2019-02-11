import Component from "./Draw.vue";
export const Draw = {
  install:function (Vue) {
    Vue.component(Component.name, Component);
  }
};
