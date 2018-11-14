<template>
  <div class="pay">
    <transition name="pay">
      <div class="all" v-show="flag">
        <v-header title="在线支付" backIcon="icon-cancel" :backUrl="cancelLink"></v-header>
        <div class="header_repeat"></div>
        <div class="content">
          <ul>
            <li class="title">选择支付方式：</li>
            <li @click="payType=2"><i class="iconfont icon-zhifubao"></i><span class="txt">支付宝</span><i class="iconfont radio" :class="payType===2?'icon-duigou':'icon-yuan'"></i></li>
            <li @click="payType=7"><i class="iconfont icon-weixin"></i><span class="txt">微信</span><i class="iconfont radio" :class="payType===7?'icon-duigou':'icon-yuan'"></i></li>
          </ul>
        </div>
        <div class="bottom" @click="confrimPay" v-touchFeel>
          确认支付{{price}}
        </div>
      </div>
    </transition>
    
    <transition name="fade">
      <div class="bg" @click="close" v-show="flag"></div>
    </transition>
  
  </div>
</template>

<script>

	import {Toast,Indicator,MessageBox} from "mint-ui"
 
	//页面需要传参 orderId,productType,
	export default {
		props:{
			orderId:{},
			cancelLink:{}
		},
		data() {
			return {
				payType:null,
				price:"",
				flag:false,
			}
		},
		methods: {
			confrimPay(){
			  this.$emit('choice',this.payType);
			},
			open(){
				this.flag=true;
			},
			close(){
				this.flag=false;
			}
		},
    beforeDestory(){
			this.flag=false;
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
  .pay-enter-active, .pay-leave-active {
    transition: all .3s ease
  }
  .pay-enter, .pay-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    transform: translateY(pxToRem(760));
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity:0;
  }
  
  .pay{
    .header{
      position: absolute;
    }
  }
  
  
  .bg{
    position: fixed;left:0;top:0;bottom:0;right:0;background: rgba(0,0,0,.2);
    z-index:25;
  }
  .all{
    position: fixed;left:0;bottom:0;z-index: 28;
    width:100%;height:pxToRem(760);background: #fff;
  }
  
  
  .content{
    background: #fff;
    ul{
      li{
        height:pxToRem(110);
        @include border-1px('bottom');
        padding:0 pxToRem(20);overflow: hidden;
        display: flex;align-items: center;justify-content: space-between;
        span.txt{
          flex:1; font-size: pxToRem(30);margin-left:pxToRem(36);
        }
        i{
          margin-left:pxToRem(10);
          &.radio{
            position: relative;
            width:pxToRem(32);height:pxToRem(34);
            input[type=radio]{
              position: absolute;left:0;top:0;
              width:100%;height:100%;opacity: 0;
            }
          }
          &.icon-zhifubao{
            font-size:pxToRem(56);color:#3399ff;
          }
          &.icon-weixin{
            font-size:pxToRem(70);color:#33cc00;
          }
        }
      }
      li.title{
        font-size:pxToRem(36);
      }
    }
  }
  .bottom{
    width:100%;height:pxToRem(100);
    line-height:pxToRem(100);text-align: center;
    position: absolute;left:0;bottom:0;
    background: #06abfa;color:#fff;font-size:pxToRem(40);
  }


</style>
