<template>
  <div class="risk">
    <transition name="sign-in">
      <div class="all" v-if="flag">
        <v-header class="header" :title="title" backIcon="icon-cancel" @back="close" :touchFeel="{color:'#aaa'}" :routerLinkMode="false"></v-header>
        <div class="main">
          <div class="content" v-html="html">
            网络不佳，暂无数据~
          </div>
        </div>
        <div class="bottom" @click="next" v-touchFeel><span>我知道了</span></div>
      </div>
    </transition>
  </div>

</template>

<script>
    export default {
        props:{
					productType:{
						type:String
          },
        },
        data() {
            return {
              flag:false,
              title:"",
              html:"",
            }
        },
        created() {

//          document[body || documentElement].onmousewheel=function(){
//            return false;
//          }
        },
        methods: {
          initData({title,html}){
            this.title=title;
            this.html=html;
          },
          open(){
            this.flag=true;
          },
          close(){
            this.flag=false;
          },
					next(){
          	if(this.title.includes('不保货物') && this.productType === 'phb'){
							this.$emit('next')
            }else{
							this.flag=false;
            }
          }
        },
        destroyed(){
//          document[body || documentElement].onmousewheel=function(){
//            return true;
//          }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
.sign-in-enter-active,.sign-in-leave-active{
  transition:all .3s ease
}
.sign-in-enter,.sign-in-leave-to{
  transform : translateX(100%) ;
}

.all{
  position:fixed;left:0;top:0;bottom:0;right:0;overflow-y: scroll;
  z-index: 21;
  background: #fff;
  .header{
    background: #fff;position:fixed;
  }
  .main{
    min-height: 100%;
    _height:100%;
  }
  .content{
    padding:pxToRem(110) pxToRem(20) pxToRem(120);
  }
  .bottom {
    margin-top: pxToRem(-100);
    width: 100%;
    height: pxToRem(100);
    background-color: #06acf9;
    text-align: center;
    line-height: pxToRem(100);
    span {
      font-size: pxToRem(40);
      line-height: pxToRem(36);
      color: #ffffff;
    }
  }
}
</style>
