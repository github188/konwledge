<template>
  <ul>
    <li class="item"><span class="label">寄送地址</span></li>
    <li class="it-address" @click="toAddress">
      <div>
        <span>收件人：{{addressData.send_name || '暂无'}}</span>
        <span>{{addressData.send_moblie}}</span>
      </div>
      <p>详细地址：{{addressData.send_address || '暂无'}}</p>
      <i v-if="isEdit" class="iconfont icon-right f40"></i>
    </li>
  </ul>
</template>
<script>
  export default {
    props:{
      isEdit:{type:Boolean,default:true},
      addressData:{type:Object,require:true}
    },
    methods:{
      toAddress(){
        this.$emit('toAddress')
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/list";
  .it-address{
    position: relative;
    height: pxToRem(160) !important;
    font-size: pxToRem(26);
    line-height: pxToRem(26);
    background: #fff;
    div,p{
      padding: 0 pxToRem(77) 0 pxToRem(90);
    }
    div{
      display: flex;
      justify-content: space-between;
      padding-top: pxToRem(45);
      padding-bottom: pxToRem(20);
    }
    p{
      line-height: pxToRem(28);
    }
    i{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: pxToRem(20);
    }
  }
</style>
