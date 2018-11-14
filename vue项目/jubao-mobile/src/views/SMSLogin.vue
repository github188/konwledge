<template>
  <div class="login">
      <v-header :backUrl="{path:'/login',query:$route.query}" goText="注册" :goUrl="{path:'/register',query:$route.query}"></v-header>
    <div class="content_box">
      <div class="content">
        <div class="login_title">手机验证登录</div>
        <div class="enter_box">
          <label>
            <span>+86</span>
            <input class="enter_input" type="text" placeholder="请输入手机号" v-model.trim="mobile">
          </label>
          <label>
            <span>验证码</span>
            <input class="enter_input" type="text" placeholder="请输入验证码" v-model.trim="smsCode">
            <CountDown :type="1" :mobile="mobile" />
          </label>
          <p class="login_btn">
            <input type="button" class="blue_bg" v-touchFeel="{color:'#0fbcf7'}" @click="login" value="登录">
          </p>
          <p class="other_way">
            <router-link :to="{path:'/login',query:$route.query}" tag="span" class="blue">密码登录</router-link>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import CountDown from './components/Countdown.vue'
  import { Toast,Indicator,MessageBox } from 'mint-ui';
  import { cmnUserLogin } from '../assets/js/api';
  import { cookieName } from "../assets/js/common";
  export default {
      components: { CountDown },
      data(){
          return {
              mobile: "", // 手机号
              smsCode: "", // 短信验证码
              RLink: {
                text: "注册",
                url: "/register"
              }
          }
      },
      methods: {
          login(){
              let _this = this;
              if(!this.mobile){
                  Toast({ message: "请输入手机号", duration: 1000, position:'bottom' });
              }else if(!this.$store.state.reg_phone.test(this.mobile)){
                  Toast({ message: "请输入正确手机号", duration: 1000, position:'bottom' });
              }else if(!this.smsCode){
                  Toast({ message: "请输入验证码", duration: 1000, position:'bottom' });
              }else {
                  let data = { "mobile":this.mobile, "sms_code":this.smsCode };
                  Indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
                  cmnUserLogin(data).then(res=>{
                      Indicator.close();
                      if(res.err_code === 0){
                          if(res.data.role_id &1){ ////有普通用户的权限才允许登陆        [ 1 11 111 1111  ]
                            _this.setCookie( cookieName ,res.data.access_token);
														if(_this.$route.query.productType){
															_this.$router.push('/'+_this.$route.query.productType+'Create');
														}else{
															_this.$router.push("/dashboard")
														}
                          }else{
                            Toast({ message: "您的账户没有普通用户的权限，请联系管理员40080-59680！",  position:'bottom' })
                          }
                      }else if(res.err_code === 1004){
                          Toast({ message: "验证码错误", duration: 1000, position:'bottom' });
                          _this.smsCode = ''
                      }else if(res.err_code === 1010){
                          MessageBox.confirm('此手机号尚未注册！将前往注册').then(action => {
                              _this.$router.push({path:'/register',query:this.$route.query})
                          });
                      }else if(res.err_code === 1014){
                          MessageBox({
                              title: '提示',
                              message: '您的账户已被锁定，请联系管理员40080-59680！',
                              showCancelButton: true
                          })
                      }else {
                          Toast({ message: res.err_msg || "未知错误", duration: 1000, position:'bottom' });
                      }
                  })
              }
          },
          setCookie(name,value){
              let hours = 4;  //单位小时
              let exp = new Date();
              exp.setTime(exp.getTime() + hours*60*60*1000);
              document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+ ";path=/";
          },
      }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/user/login.scss';
  .content_box{
    bottom:0;background: #fff;
  }
</style>
