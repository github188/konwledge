<template>
  <div class="AddSubtract">
    <i class="iconfont icon-jian" @click.stop="num<=0?num=0:num--"></i>
    <div>{{num}}</div>
    <i class="iconfont icon-jia" @click.stop="num++"></i>
  </div>
</template>
<script>
  export default {
    props:{
      value:{
        type:Number,
        default:0
      }
    },
    data(){
      return{
        num:this.value
      }
    },
    watch:{
      num(val){
        this.$emit('input',val)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .AddSubtract{
    width: pxToRem(280);
    display: flex;
    justify-content: space-between;
    align-items: center;
    i{
      display: block;
      font-size: pxToRem(50);
      color: #333;
    }
    div{
      width: pxToRem(120);
      height: pxToRem(30);
      border: 1px solid #666;
      margin: 0 pxToRem(20);
      text-align: center;
      font-size: pxToRem(24);
      line-height: pxToRem(30);
    }
  }
</style>
