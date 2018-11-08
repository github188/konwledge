import Vue from 'vue'
const choceScss = false ;

//引入样式
import "./css/icon.css"
if(!choceScss){
  require("./css/tabs.css");
  require("./css/tab-pane.css");
  require("./css/scrollbar.css");
}else{
  require("./scss/reset.scss");
  require("./scss/tabs.scss");
  require("./scss/tab-pane.scss");
  require("./scss/scrollbar.scss");
}
// import "./css/icon.css"
// import "./css/tabs.css"
// import "./css/tab-pane.css"
// import "./css/scrollbar.css"
import {ElTabs,ElPane} from "./packages/index"

Vue.use(ElTabs);
Vue.use(ElPane);




