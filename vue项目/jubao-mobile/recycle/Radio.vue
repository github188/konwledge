<template>
  <div style="display: inline-block">
    <span class="radio_wrap radio_bechose">
      <span class="txt" :class="model===bindValue?'radio_bechose':''">{{text}}</span>
      <input type="radio" v-model="model" :value="bindValue"/>
    </span>
  </div>

</template>

<script>
    export default {
        props:{
          bindValue:{
            type:String,
          },
          value:{
            type:String,
          },
          text:{
            type:String,
          },
        },
        data() {
            return {

            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
  .radio_wrap{
    display: inline-block;overflow: hidden;
    width:pxToRem(120);height:pxToRem(50);
    border:pxToRem(2) solid #666666;
    margin-right: pxToRem(20);border-radius: pxToRem(8);
    position: relative;
    .txt{
      display: block;
      width:100%;height:pxToRem(50);line-height: pxToRem(50);
      text-align: center;font-size:pxToRem(30);
    }
    .radio_bechose{
      color:#06acf9;border-color: #06acf9 !important;
    }
    input[type=radio]{
      position: absolute;left:0;top:0;
      width:pxToRem(240);height:pxToRem(100);
      opacity: 0;
    }
  }
</style>
