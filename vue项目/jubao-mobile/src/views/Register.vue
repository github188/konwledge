<template>
  <div class="register">
      <v-header title="注册" ></v-header>
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
          <p>
            <label class="agree">
                  <span @click="agreeTerms=!agreeTerms">
                      <i class="iconfont icon-duigou" v-if="agreeTerms"></i>
                      <i v-if="!agreeTerms" class="iconfont icon-yuan"></i>
                      我已阅读并同意
                  </span>
              <!--<router-link to="/protocol" class="blue" tag="span">聚保平台服务协议</router-link>-->
              <span class="blue" @click="getAgreements">平台服务协议</span>
            </label>
          </p>
          <p class="login_btn">
            <input type="button" class="blue_bg" v-touchFeel="{color:'#0fbcf7'}" @click="register" value="提交">
          </p>
        </div>
        <router-view style="z-index: 1000"></router-view>
      </div>
    </div>
      <Risk :title="agreementContent.title" ref="agreement" :html="agreementContent.content"></Risk>
  </div>
</template>

<script>
  import { checkPassWord,countdownFunc } from './mixins/index'
  import CountDown from './components/Countdown.vue'
  import { Toast,Indicator,MessageBox } from 'mint-ui';
  import { cookieName } from "../assets/js/common";
  import Risk from "./components/Risk.vue"
  import { cmnUserRegister,cmnCaptchaNew ,cmnAgreementList } from '../assets/js/api';
  export default {
      components: { CountDown ,Risk},
      mixins: [ checkPassWord,countdownFunc ],
      data(){
          return {
              mobile: "",
              smsCode: "", // 短信验证码
              agreeTerms: false,
              agreementContent:"",
          }
      },
      created(){
          this.getCaptcha();
      },
      methods: {
          getAgreements(e){
            Indicator.open({text: '协议加载中...', spinnerType: 'fading-circle'});
            cmnAgreementList().then(res=>{
              Indicator.close();
              console.log(res,"协议列表");
              this.$refs.agreement.open();
              this.agreementContent = res.data[0];
            })
          },
          register(){
              let _this = this;
              if(!this.mobile){
                  Toast({ message: "请输入手机号！", duration: 1000, position:'bottom' }); return false;
              }else if(!this.$store.state.reg_phone.test(this.mobile)){
                  Toast({ message: "请输入正确手机号", duration: 1000, position:'bottom' }); return false;
              }else if(!this.smsCode){
                  Toast({ message: "请输入手机验证码！", duration: 1000, position:'bottom' }); return false;
              }else if(!this.testPass() || !this.reTestPass()){
                  return false;
              }else if(!this.password){
                  Toast({ message: "请输入密码！", duration: 1000, position:'bottom' }); return false;
              }else if(!this.checkPass){
                  Toast({ message: "请确认密码！", duration: 1000, position:'bottom' }); return false;
              }else if(!this.agreeTerms){
                  Toast({ message: "请阅读并接受聚保物流平台服务协议！", duration: 1000, position:'bottom' });
              }else {
                  let data = {'mobile':this.mobile,'sms_code':this.smsCode,'password':this.password} ;
                let query = this.$getStorage("locationQuery");
                if(query && query.alias){
                  data.alias = query.alias
                }
                  cmnUserRegister(data).then((res)=>{
                      if(res.err_code === 0){
                          Toast({ message: "注册成功", duration: 1000, position:'bottom' });
                          _this.setCookie(cookieName,res.data.access_token);
                          _this.$store.state.isLogin = true;
                          if(_this.$route.query.productType){
                            _this.$router.push('/'+_this.$route.query.productType+'Create');
                          }else{
                            _this.$router.push("/dashboard")
                          }
                      }else if(res.err_code === 1006){
                          Toast({ message: "短信验证码错误！", duration: 1000, position:'bottom' });
                      }else if(res.err_code === 1007){
                          Toast({ message: "用户已注册！", duration: 1000, position:'bottom' });
                      } else {
                          Toast({ message: res.err_msg || "未知错误", duration: 1000, position:'bottom' });
                      }
                  })
              }
          },
          setCookie(name,value){
              let hours = 4;  //单位小时
              let exp = new Date();
              exp.setTime(exp.getTime() + hours*60*60*1000);
              document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/";
          },
      }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/user/register';
  .content_box{
    bottom:0;background: #fff;
  }
</style>
