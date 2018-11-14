<template>
  <div class="plate-no">
    <label class="label" for="plate_no">头车牌号</label>
    <input type="text" id="plate_no" class="placeholder" placeholder="必填" :value="value" @input="$emit('input',$event.target.value)"/>
    <span :class="plateNoCheck?'green ':'red '" class="plateNoTip" v-show="plateNoTipShow">{{plateNoTip}}</span>
  </div>
</template>

<script>
  export default {
    props:{
      value:{type:String,require:true}
    },
    data() {
      return {
        plateExtraNo:"",
        plateNoTip:"",        //车牌号提示信息txt文本
        plateNoTipShow:false,
      }
    },
    watch:{
      plateNo:{
        handler(newValue, oldValue) {
          console.log(newValue,"aaa")
        },
        deep: true
      }
    },
    computed:{
      plateNoCheck(){
        if(this.value!==""){
          this.plateNoTipShow=true
        }
        let flag= false;
        if (!this.value) {
          this.plateNoTip = "此处不能为空";flag= false;
        } else if (!this.$store.state.plateNoReg.test(this.value)) {
          this.plateNoTip = "格式不正确";flag= false;
        } else {
          this.plateNoTip = "格式正确";flag= true;
        }
        this.$emit("isPassing",flag);
        return flag;
      },
    },
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
.label{
  display: inline-block;
  width: 1.35rem;
  margin-right: .1rem;
}
.placeholder{

}
  .plateNoTip{
    font-size: .26rem;
  }
input.placeholder::-webkit-input-placeholder { /* WebKit browsers */
  font-size:    pxToRem(26);text-indent: pxToRem(10);
}
input.placeholder::-webkit-input-placeholder { /* WebKit browsers */
  font-size:     pxToRem(26);text-indent: pxToRem(10);
}
input.placeholder:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  font-size:   pxToRem(26);text-indent: pxToRem(10);
}
input.placeholder::-moz-placeholder { /* Mozilla Firefox 19+ */
  font-size:   pxToRem(26);text-indent: pxToRem(10);
}
input.placeholder:-ms-input-placeholder { /* Internet Explorer 10+ */
  font-size:    pxToRem(26);text-indent: pxToRem(10);
}
</style>
