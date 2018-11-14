<template>
  <div>
    <v-header title="投保成功" :backShow="false" :goText="'完成'" :goUrl="'/home'" :touchFeel="{color:'#0facf7'}" className="header"></v-header>
    <div class="content">
      <div class="msg">
        <img src="../../assets/img/axjkx/success.png" alt="">
        <p class="title">出单成功!</p>
        <p class="tip">您的保单已付款成功，您的保单已生成</p>
        <p class="tip">您可以查看/下载<a :href="baodanHref" target="_blank">电子保单</a></p>
        <p class="tip">或在<router-link :to="{path:'/AxjkxDetail',query:{orderId}}">保单详情</router-link>页查看保单详情</p>
      </div>
      <div class="btn" @click="again">为家人再买一单</div>
    </div>
  </div>
</template>
<script>
  import {jkxAnxinPolicy} from '../../assets/js/api';
	import {wwwCheck} from '../../assets/js/common';
  export default {
  	data(){
  		return {
  			orderId:this.$route.query.orderId*1,
      }
    },
    computed:{
			baodanHref(){
				return wwwCheck()?'https://www.jubao56.com/v1/jkx/anxin/policy?order_id='+this.orderId:'http://test.jubao56.com/v1/jkx/anxin/policy?order_id='+this.orderId;
      }
    },
    methods:{
			again(){
				this.$router.push({path:'/axjkxCreate'});
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .header{
    @include border-1px('bottom')
  }
  .content{
    position: absolute;
    top:pxToRem(90);
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    .msg{
      margin: pxToRem(100) 0;
      text-align: center;
      img{
        width: pxToRem(180);
        height: pxToRem(180);
      }
      .title{
        font-size: pxToRem(36);
        margin: pxToRem(20) 0 pxToRem(40);
      }
      .tip{
        font-size: pxToRem(30);
        line-height: pxToRem(40);
        a{
          color: $blue;
        }
      }
    }
    .btn{
      width: 80%;
      height: pxToRem(90);
      line-height: pxToRem(90);
      background: $blue;
      color: #fff;
      text-align: center;
      font-size: pxToRem(36);
      border-radius: pxToRem(10);
      margin: 0 auto pxToRem(120);
    }
  }
</style>