<template>
  <div id="app">
    <transition :name="transitionName"
                @before-leave="beforeLeave"
                @after-leave="afterLeave"
                @before-enter="beforeEnter"
                @after-enter="afterEnter">
      <router-view class="router"></router-view>
    </transition>

  </div>
</template>

<script>

  import { getToken,cmnWebupdateList } from "./assets/js/api"
  import {saveLocationInfo,saveProductList} from "./assets/js/SaveToSession"
  import { Toast } from "mint-ui"
  import { routeBack } from '@/router/routeBack'

  export default {
    name: 'app',
    data(){
      return {
        transitionName:""
      }
    },
    created(){
      saveLocationInfo();//保存地址栏信息
      saveProductList();//获取产品列表信息
    },
    mounted(){
      let _this = this;
      if(process.env.NODE_ENV === 'development') return;
      window.addEventListener("popstate", function(e) {
//       alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        if(_this.$route.path === '/login') return;
        _this.$router.push(_this.$store.state.backUrl)
      }, false);
    },
    methods:{
      beforeLeave(el){
        //console.log(el);
        var bg = document.createElement("div");
        bg.className="router_bg";
        el.appendChild(bg);
      },
      afterLeave(el){
//        var bg = el.querySelector(".router_bg");
//        el.removeChild(bg)
      },
      beforeEnter(el){

      },
      afterEnter(el){

      },
//      checkScript(tempArr) {
//        let results = [];
//        let scripts = document.getElementsByTagName("script");
//        for(let i = 0;i < scripts.length;i++){
//          if(scripts[i].src.includes("manifest")) results.push(scripts[i].src.includes(tempArr[0]["manifest"]));
//          if(scripts[i].src.includes("vendor")) results.push(scripts[i].src.includes(tempArr[0]["vendor"]));
//          if(scripts[i].src.includes("app")) results.push(scripts[i].src.includes(tempArr[0]["app"]));
//        }
//        return results.includes(false);
//      },
    },
    watch: {
      '$route': function (to, from) {
        //history添加记录
				if(process.env.NODE_ENV === 'production') pushHistory();
        function pushHistory() {
          var state = {
            title: "title",
            url: "#"
          };
          if(to.path !== '/home')
          window.history.pushState(state, "title", '#'+to.fullPath);
        }
        // 自动回到顶部
        document.body.scrollTop = '0';
        document.documentElement.scrollTop = 0;
        // 记录路由来源和去向以及backUrl
        if(from.path !== '/'){
          this.$store.commit('SETROUTER', {to, from, backUrl: routeBack(to, from)})
        }

        //路由动画
//        console.log(to.meta.level,from.meta.level);
        let toLevel = to.meta.level;
        let fromLevel = from.meta.level;

        if(toLevel>fromLevel){
          this.transitionName = 'slide-left'
        }else if(toLevel<fromLevel){
          this.transitionName = 'slide-right'
        }else {
          this.transitionName = 'default'
        }

        //安卓机禁用过渡动画
        let isAndroid = window.navigator.appVersion.match(/android/gi);
        let isIPhone = window.navigator.appVersion.match(/iphone/gi);
        if(isAndroid)this.transitionName = 'default';

        // 查询代码是否有更新
//        cmnWebupdateList({project: 2}).then( res => {
//            if(res.err_code === 0 && res.rows.length !== 0 && !location.href.includes("localhost")){
//                let tempArr = res.rows.filter( L => L.project === 2);
//                if(this.checkScript(tempArr)){
//                    alert("为提供更好的服务，本网站刚刚进行了更新升级，请清除本地浏览器缓存后再重新进入！详询：027-82203258")
//                }
//            }else{
//                console.log(res);
//            }
//        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*#app{*/
    /*transform-style: preserve-3d;*/
  /*}*/
  .router{
    position: absolute;
    overflow-y: scroll;
    left:0;bottom:0;top:0;right:0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .slide-right-enter-active,.slide-right-leave-active,.slide-left-enter-active{
    transition: transform .3s ;
    -webkit-transition: -webkit-transform .3s ;
  }
  .slide-left-leave-active{
    transition: transform .3s .1s;
    -webkit-transition: -webkit-transform .3s .1s;
  }
  .slide-left-enter,.slide-right-leave-active{
    z-index: 1000000;
    //box-shadow: rgba(0,0,0,.3) pxToRem(-10) 0 pxToRem(5);
  }
  .slide-left-enter-to,.slide-left-leave-to{
    z-index: inherit;
  }

  .slide-right-enter{
    transform: translate(-50%,0);
  }
  .slide-right-enter-to{
    transform: translate(0,0);
  }
  .slide-right-leave{
    transform: translate(0,0);
  }
  .slide-right-leave-to{
    transform: translate(100%,0);
  }


  .slide-left-enter{
    transform: translate(100%,0);
  }
  .slide-left-enter-to{
    transform: translate(0,0);
  }
  .slide-left-leave{
    transform: translate(0,0);
  }
  .slide-left-leave-to{
    transform: translate(-50%,0);
  }
</style>
