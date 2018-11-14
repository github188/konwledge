<template>
  <div class="register recovery">
      <v-header title="重置密码"></v-header>
    <div class="content_box">
      <div class="content">
        <div class="enter_box">
          <p>
            <label class="enter_input_box">
              <span>手机号</span>
              <input class="enter_input" type="text" v-model.trim="mobile">
            </label>
          </p>
          <p>
            <label class="enter_input_box">
              <span>图形验证码</span>
              <input class="enter_input"  type="text" v-model.trim="captchaCode">
            </label>
            <img :src="captchaUrl" @click="getCaptcha" class="captcha">
          </p>
          <p>
            <label class="enter_input_box">
              <span>短信验证码</span>
              <input class="enter_input"  type="text" v-model.trim="smsCode">
            </label>
            <CountDown
              :type="2"
              :mobile="mobile"
              :captchaId="captcha"
              :captchaCode="captchaCode"
              @errEvent="smsError">
            </CountDown>
          </p>
          <p>
            <label class="enter_input_box">
              <span>设置密码</span>
              <input class="enter_input" @blur="testPass()"  placeholder="6-16位必须包含数字和字母" type="password" v-model.trim="password">
            </label>
          </p>
          <p>
            <label class="enter_input_box">
              <span>确认密码</span>
              <input class="enter_input" @blur="reTestPass()" type="password" v-model.trim="checkPass">
            </label>
          </p>
          <p class="login_btn">
            <input type="button" class="blue_bg" v-touchFeel="{color:'#0fbcf7'}" @click="recovery" value="提交">
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { checkPassWord,countdownFunc } from '../mixins'
  import CountDown from '../components/Countdown.vue'
  import base64 from 'base-64';
  import { Toast,Indicator,MessageBox } from 'mint-ui';
  import { cmnUserRecover,cmnUserInfo,cmnCaptchaNew,getToken } from '../../assets/js/api';
  import { getCookie } from '../../assets/js/common';
  export default {
      components: { CountDown },
      mixins: [ checkPassWord,countdownFunc ],
      data(){
          return {
              mobile: "",
              smsCode: "",
              agree: false,
          }
      },
      created(){
          if(getToken()){
              cmnUserInfo().then(res=>{
                  if(res.err_code === 0){
                    this.mobile = res.data.mobile;
                  }
              }).catch((err)=>{ console.log("cmnUserInfo",err) })
          }else if(getCookie('rmbUser') == 'true'){
              this.mobile = base64.decode(getCookie('username'));
          }
          this.getCaptcha();
      },
      methods: {
          recovery(){
              let _this = this;
              if(!this.mobile){
                  Toast({ message: "请输入手机号", duration: 1000 , position:'bottom'});
              }else if(!this.$store.state.reg_phone.test(this.mobile)){
                  Toast({ message: "请输入正确手机号", duration: 1000 , position:'bottom'});
              }else if(!this.smsCode){
                  Toast({ message: "请输入验证码", duration: 1000 , position:'bottom'});
              }else if(!this.testPass() || !this.reTestPass()){
                return false;
              }else {
                  let data = { "mobile":this.mobile, "sms_code":this.smsCode, "login_password": this.checkPass};
                  Indicator.open({ text: '正在修改...', spinnerType: 'fading-circle' });
                  cmnUserRecover(data).then(res=>{
                      Indicator.close();
                      if(res.err_code === 0){
                          Toast({ message: "修改成功！", duration: 1000 , position:'bottom'}); _this.$router.push("/login");
                      }else if(res.err_code === 1004){
                          Toast({ message: "验证码错误", duration: 1000 , position:'bottom'}); _this.password = ''
                      }else if(res.err_code === 1010){
                          MessageBox.confirm('此手机号尚未注册！将前往注册').then(action => {
                              _this.$router.push("/register")
                          });
                      }else {
                          Toast({ message: res.err_msg || '未知错误', duration: 1000 , position:'bottom'});
                      }
                  })
              }
          }
      }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/user/register';
  .content_box{
    background:#fff;bottom:0;
  }
  .recovery{
    overflow: hidden;
  }
</style>
