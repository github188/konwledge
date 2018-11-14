<template>
  <input class="count_down blue_bg" type="button" @click="getSmsCode" :class="{className,glay:disable}" :disabled="disable" :value="btnTxt">
</template>

<script>
  import { cmnSmsSend } from "../../assets/js/api"
  import { Toast } from 'mint-ui';
  export default {
      props:{
          className:{  // 可选、传入class
              type:String,
              default:""
          },
          mobile:{ // 必选、传入手机号
              type:String,
              required: true
          },
          captchaId:{  // 图形验证码地址参数
              type:String,
              default:""
          },
          captchaCode:{  // 图形验证码
              type:String,
              default:""
          },
          type:{ // 字段说明： 1 验证手机号; 2 验证短信验证码和手机号;
              type:Number,
              default:""
          },
      },
      data(){
          return {
              btnTxt: "获取验证码",
              count: 60,
              disable: false,
          }
      },
      methods:{
          getSmsCode(){
              let self = this;
              if(this.regJudge()){
                  let data = null;
                  if(this.type === 1){
                      data = {'mobile': this.mobile}
                  }else{
                      data = {'mobile': this.mobile,'captcha_id':this.captchaId,'captcha_code':this.captchaCode};
                  }
                  this.disable = true;
                  cmnSmsSend(data).then((res)=>{
                      if(res.err_code !== 0){
                          self.$emit("errEvent",res);
                          self.disable = false;
                      }else{
                          Toast({ message: '短信验证码发送成功,请在60秒内输入', duration: 2000 , position:'bottom'});
                          self.btnTxt = "获取验证码(" + self.count + ")";
                          let timer = null ;
                          timer = setInterval(() => {
                              self.count--;
                              if(self.count === 0){
                                  self.btnTxt = "获取验证码";
                                  clearInterval(timer);
                                  self.disable = false;
                                  self.count = 60;
                              }else{
                                  self.btnTxt = "获取验证码(" + self.count + ")";
                              }
                          },1000)
                      }
                  })
              }
          },
          regJudge(){
              if(!this.mobile){
                  Toast({ message: '请输入手机号', duration: 2000 , position:'bottom'});
                  return false;
              }else if(!this.$store.state.reg_phone.test(this.mobile)){
                  Toast({ message: '请输入正确手机号', duration: 2000 , position:'bottom'});
                  return false;
              }else if(!this.captchaCode && this.type === 2){
                  Toast({ message: '请输入图形验证码!', duration: 2000 , position:'bottom'});
                  return false;
              }else{
                  return true;
              }
          },
      }
  }
</script>

<style lang="scss" scoped>
  .count_down{
      position: absolute;
      top: pxToRem(10);
      right: 0;
      width: pxToRem(220);
      height: pxToRem(70);
      font-size:pxToRem(30);
      border-radius: pxToRem(10);
  }
  .glay{
    background: #ccc;
  }
</style>
