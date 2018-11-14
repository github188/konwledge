<template>
  <div class="password_pay_wrap">
    <transition name="keyboard">
      <div class="password_pay"  v-show="$store.state.payPasswordShow">
        <div class="title">
          <i class="iconfont icon-cancel" @click="close"></i><h3>请输入支付密码</h3>
        </div>
        <div class="input_password">
          <div class="password_box">
            <span class="cell border_right_cell"><i class="iconfont icon-circle" v-show="passwordList[0]!==undefined"></i></span>
            <span class="cell border_right_cell"><i class="iconfont icon-circle" v-show="passwordList[1]!==undefined"></i></span>
            <span class="cell border_right_cell"><i class="iconfont icon-circle" v-show="passwordList[2]!==undefined"></i></span>
            <span class="cell border_right_cell"><i class="iconfont icon-circle" v-show="passwordList[3]!==undefined"></i></span>
            <span class="cell border_right_cell"><i class="iconfont icon-circle" v-show="passwordList[4]!==undefined"></i></span>
            <span class="cell"><i class="iconfont icon-circle" v-show="passwordList[5]!==undefined"></i></span>
          </div>
        </div>
        <div class="easy_keyboard">
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">1</span>
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">2</span>
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">3</span>
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">4</span>
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">5</span>
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">6</span>
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">7</span>
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">8</span>
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">9</span>
          <span @touchstart="inputBlank" @touchend ="backColor" @click="inputFinish" style="background: #e2e7ed" class="finish">完成</span>
          <span @touchstart="inputPassWord" @touchend ="backColor" style="background: #fff">0</span>
          <span @touchstart="deletePassWord" @touchend ="backColor" style="background: #e2e7ed;"><i class="iconfont icon-jianpanshanchu"></i></span>
        </div>
      </div>
    </transition>

    <div class="bg" v-show="$store.state.payPasswordShow" @click="close"></div>
  </div>
</template>

<script>
  import {MessageBox} from "mint-ui"
    export default {
        props:{

        },
        data() {
            return {
              passwordList:[],
              keyboardCellColor:"",
            }
        },
        created() {

        },
        mounted(){

        },
        methods: {
          inputBlank(e){
            this.keyboardCellColor=e.target.style.background;
            e.target.style.background="#ccc";
          },
          inputPassWord(e){
            this.keyboardCellColor=e.target.style.background;
            e.target.style.background="#ccc";
            if(this.passwordList.length<6){
              this.passwordList.push(e.target.innerText);
            }
          },
          deletePassWord(e){
            this.passwordList.pop();
            this.keyboardCellColor=e.target.style.background;
            e.target.style.background="#ccc";
          },
          inputFinish(e){
            e.target.style.background=this.keyboardCellColor;
            if(this.passwordList.length!==6){
              MessageBox('提示', '密码必须为6位数');
            }else{

            }
          },
          backColor(e){
            e.target.style.background=this.keyboardCellColor;
          },
          close(){
            this.$store.state.payPasswordShow=false;
            this.passwordList=[];
          },
        }
    }
</script>

<style lang="scss" scoped>
.password_pay{
  position: fixed;left:0;bottom:0;z-index: 20;
  width:100%;height:pxToRem(760);background: #fff;
  .title{
    position: relative;
    text-align: center;font-size:pxToRem(40);height:pxToRem(40+28+28);line-height:pxToRem(40+28+28);
    @include border-1px('bottom');
    i{
      position: absolute;left:pxToRem(20);top:0;color:#9d9d9d;
    }
    h3{font-size:pxToRem(40);}
  }
  .input_password{
    padding: pxToRem(30) pxToRem(45);
    display: flex;justify-content: center;
    .password_box{
      width:pxToRem(660);height:pxToRem(90);
      display: flex;justify-content: space-between;
      border:1px solid #ccc;
      border-radius: pxToRem(5);overflow: hidden;
      span.cell{
        flex: 1;float:left;height:100%;
        background: #fff;
        display: flex; justify-content: center;align-items: center;
        i.icon-circle{
          font-size: pxToRem(20);color:#999999;
        }
      }
      .border_right_cell{
        @include border-1px('right');
      }
    }

  }
  .easy_keyboard{
    width:100%;height:pxToRem(440);
    position: absolute;bottom:0;left:0;
    display: flex;flex-wrap: wrap;
    border-top:1px solid #f0f0f0;
    span{
      box-sizing: border-box;
      width:pxToRem(250);height:pxToRem(110);display: block;
      text-align: center;line-height:pxToRem(110);font-size:pxToRem(48);
      border-right:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;
      color:#424242;
      i.iconfont{
        font-size:pxToRem(48);
      }
    }
    span.finish{
      font-size:pxToRem(40)
    }
  }
}
  .bg{
    position: fixed;left:0;top:0;bottom:0;right:0;background: rgba(0,0,0,.2);
    z-index:10;
  }

  .keyboard-enter-active, .keyboard-leave-active {
    transition: all .3s ease
  }
  .keyboard-enter, .keyboard-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    transform: translateY(pxToRem(760));
  }
</style>
