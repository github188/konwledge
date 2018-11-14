<template>
    <div class="pay_password2" >
      <transition name="keyboard">
        <div class="zcb_pay" v-show="$store.state.payPasswordShow">
          <div class="content">
            <h3>请输入您的支付密码</h3>
            <div class="input_word">
              <label for="payment_password">支付密码</label>
              <input type="password" id="payment_password" maxlength="30" v-model="payPassword">
            </div>
            <p class="botton_wrap">
              <button type="button" class="pay_button" @touchstart="buttonTouchStart" @touchend="buttonTouchEnd" @click="pay">支&nbsp;&nbsp;付</button>
            </p>
          </div>
        </div>
      </transition>

      <div class="full_bg" v-show="$store.state.payPasswordShow" @click="close"></div>
    </div>
</template>

<script>
  import {Toast,Indicator } from "mint-ui"
  import { zcbOrderPay} from '../src/assets/js/api';
    export default {
        props:{
          orderId:{type:Number},
          couponId:{type:Number},
        },
        data() {
            return {
              payPassword:"",//支付密码
              buttonColor:"",//临时记录touchStart时的button颜色
              mouseDownColor:"#0089ed",
            }
        },
        created() {

        },
        methods: {
          close(){
            this.$store.state.payPasswordShow=false;
            this.passwordList=[];
          },
          buttonTouchStart(e){
            this.buttonColor=e.target.style.background;
            e.target.style.background=this.mouseDownColor;
          },
          buttonTouchEnd(e){
            e.target.style.background=this.buttonColor;
          },
          pay(){
            if (!this.$store.state.reg_pwd.test(this.payPassword)) {
              Toast({message: "密码格式不正确", position: 'bottom'});
            }else{

            }
          }
        }
    }
</script>

<style lang="scss" scoped>

  .zcb_pay{
    position: fixed;bottom:pxToRem(400);left:0;
    z-index:20;
    background: rgba(0,0,0,.2);
    width:100%;
    display: flex;justify-content: center;align-items: center;
    overflow: hidden;
    .content{
      flex: 1;
      /*height:pxToRem(320);*/
      margin:pxToRem(30);
      background: #fff;
      padding:0 pxToRem(40);
      h3{
        height: pxToRem(120);  line-height: pxToRem(120);
        text-align: center;
        font-size: pxToRem(32);
        color: #333;
      }
      .input_word{
        height:pxToRem(120);
        @include border-1px('bottom');
        label{
          padding:0 pxToRem(14);
        }
        input{
          height:pxToRem(80);
        }
      }
      p.botton_wrap{
        display: flex;justify-content: center;
        button.pay_button{
          background: #06acf9;color:#fff;font-size:pxToRem(30);
          margin:pxToRem(30);
          width:pxToRem(380);height:pxToRem(90);
          border-radius: pxToRem(5);
          box-shadow:pxToRem(2) pxToRem(2) pxToRem(2) pxToRem(2) #0089ed;
        }
      }
    }
  }

  input{
    position: relative;
    z-index: 99;
    color: #313b4b;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    background: url("../src/assets/img/inputBg.jpg") repeat-x 50%;
    text-indent: pxToRem(20);
  }
  .full_bg{
    position: fixed;left:0;top:0;bottom:0;right:0;background: rgba(0,0,0,.2);
    z-index:10;
  }
  .keyboard-enter-active, .keyboard-leave-active {
    transition: all .3s ease
  }
  .keyboard-enter, .keyboard-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    /*transform: translateY(pxToRem(760));*/
    transform: translateX(pxToRem(375*2));
  }
</style>
