import {setStorage,getStorage,removeStorage} from "../libs/js/SessionStorage";
import {setLocationQuery,getLocationQuery} from "../libs/js/LocationTransform";

export default {
  install(Vue,option){
    Vue.prototype.$getStorage= getStorage;
    Vue.prototype.$setStorage= setStorage;
    Vue.prototype.$removeStorage= removeStorage;
    Vue.prototype.$setLocationQuery= setLocationQuery;
    Vue.prototype.$getLocationQuery= getLocationQuery;
  }
}
