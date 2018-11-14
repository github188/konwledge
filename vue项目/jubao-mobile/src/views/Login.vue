<template>
  <div class="login">
      <v-header :goUrl="{path:'/register',query:$route.query}" goText="注册"></v-header>
    <div class="content_box">
      <div class="content">
        <div class="login_title">密码登录</div>
        <div class="enter_box">
          <input class="enter_input" type="text" placeholder="手机号/用户名" v-model.trim="username">
          <input class="enter_input"  type="password" placeholder="请输入密码" v-model.trim="password">
          <p class="remember">
            <label><input type="checkbox" v-model="rememberMe"><span>&nbsp;&nbsp;记住密码</span></label>
          </p>
          <p class="login_btn">
            <input type="button" class="blue_bg" @click="login" value="登录" v-touchFeel>
          </p>
          <p class="other_way">
            <router-link to="/recovery" tag="span" class="forget">忘记密码</router-link>
            <router-link :to="{path:'/smslogin',query:$route.query}" tag="span" class="msg_login blue">验证码登录</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast,Indicator,MessageBox } from 'mint-ui';
  import base64 from 'base-64';
  import { cmnUserLogin } from '../assets/js/api';
  import { cookieName } from "../assets/js/common";
  export default {
      data(){
          return {
              username: "",
              password: "",
              rememberMe: false,
          }
      },
      created(){
          this.readrmbUser();
      },
      methods: {
          login(){
              this.rememberUser(); //记住密码
              let _this = this;
              if(!this.username){
                  Toast({ message: "请输入手机号", duration: 1000, position:'bottom' });
              }else if(!this.$store.state.reg_phone.test(this.username)){
                  Toast({ message: "请输入正确手机号", duration: 1000, position:'bottom' });
              }else if(!this.password){
                  Toast({ message: "请输入密码", duration: 1000, position:'bottom' });
              }else {
                  let data = { "mobile":this.username, "password":this.password };
                  Indicator.open({ text: '加载中...', spinnerType: 'fading-circle' });
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
                          Toast({ message: "密码错误", duration: 1000, position:'bottom' });
                          _this.password = ''
                      }else if(res.err_code === 1010){
                          MessageBox.confirm('此手机号尚未注册！将前往注册').then(action => {
                              _this.$router.push("/register")
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
          // 加密记住用户信息
          rememberUser(){
              if(this.rememberMe){
                  this.setCookie("rmbUser", "true", 30*24 ); //存储一个带 30 天期限的cookie
                  this.setCookie("username", base64.encode(this.username), 30*24);
                  this.setCookie("password", base64.encode(this.password), 30*24);
              }else {
                  this.setCookie("rmbUser", "false", -1 ); //存储一个带 30 天期限的cookie
                  this.setCookie("username", this.username, -1);
                  this.setCookie("password", this.password, -1);
              }
          },
          // 读取选择记住密码的用户信息
          readrmbUser(){
              if(this.getCookie('rmbUser') == 'true'){
                  this.rememberMe = true;
                  this.username = base64.decode(this.getCookie('username'));
                  this.password = base64.decode(this.getCookie('password'));
              }
          },
          // 存cookie
          setCookie(name,value,time){
              let hours = time?time:4;  //单位小时
              let exp = new Date();
              exp.setTime(exp.getTime() + hours*60*60*1000);
              document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/";

          },
          // 读cookie
          getCookie(name){
              let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
              if (arr = document.cookie.match(reg)) {
                  return unescape(arr[2]) ;
              }else {
                  return null ;
              }
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
