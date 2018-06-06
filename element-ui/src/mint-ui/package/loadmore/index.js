// export { default } from './src/loadmore.vue';

import loadmore from './src/loadmore.vue';

/* istanbul ignore next */
loadmore.install = function(Vue) {
  Vue.component(loadmore.name, loadmore);
};

export default loadmore;

