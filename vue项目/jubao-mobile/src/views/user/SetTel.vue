<template>
  <div class="setTel">
      <v-header title="我的手机号"></v-header>
      <div class="content_box">
        <div class="content">
          <div class="tel_box">
            <p class="red"><i class="iconfont icon-duigou blue"></i> 您的手机号:</p>
            <div>{{mobile}}</div>
          </div>
          <div class="tel_box">
            <div class="newMobile enter_box">
              <input type="number" placeholder="新手机号" v-model.trim="newMobile" @blur="testTel">
            </div>
            <div class="sms_code enter_box">
              <input type="text" maxlength="6" placeholder="验证码" v-model.trim="sms_code">
              <CountDown :type="1" :mobile="newMobile" />
            </div>
            <div class="btn_box blue_bg">
              <input class="but" type="submit" value="提 交" v-touchFeel="{color:'#0fbcf7'}" @click="fixMobile()">
            </div>
          </div>
        </div>
        <p class="copyright">©保险服务平台</p>
      </div>
  </div>
</template>

<script>
  import CountDown from '../components/Countdown.vue'
  import { cmnUserUpdate,cmnUserInfo } from 'assets/js/api';
  import { Toast, MessageBox, Indicator } from 'mint-ui';
  export default {
      components: { CountDown },
      data() {
          return {
              sms_code: '', // 验证码
              mobile: '', // 用户手机号
              newMobile: '', // 新手机号
          }
      },
      created() {
          Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
          cmnUserInfo().then((res)=>{
              Indicator.close();
              if(res.err_code === 0){
                  this.mobile = res.data.mobile;
                  this.id = res.data.id;
              }
          }).catch((err)=>{ console.log("cmnUserInfo",err) })
      },
      methods: {
          // 验证手机号
          testTel(){
              if(!this.$store.state.reg_phone.test(this.newMobile)){
                  Toast({ message: '请输入正确的手机号', duration: 1000 , position:'bottom'});
                  return false;
              }
          },
          // 变更手机号
          fixMobile() {
              if(!this.newMobile){
                  Toast({ message: '请输入手机号！', duration: 1000 , position:'bottom'}); return false;
              }else if(!this.sms_code){
                  Toast({ message: '请输入手机验证码！', duration: 1000 , position:'bottom'}); return false;
              }else{
                  Indicator.open({text: '正在修改...', spinnerType: 'fading-circle'});
                  let data =  { id: this.id, mobile: this.newMobile, sms_code: this.sms_code };
                  cmnUserUpdate(data).then((res)=>{
                      Indicator.close();
                      if(res.err_code === 0){
                          Toast({ message: '修改成功', duration: 1000 , position:'bottom'}); this.$router.push('/dashboard');
                      }else if(res.err_code === 1006){
                          Toast({ message: '短信验证码错误', duration: 1000 , position:'bottom'});
                      }else if(res.err_code === 1007){
                          Toast({ message: '用户已存在', duration: 1000 , position:'bottom'});
                      }else{
                          Toast({ message: res.err_msg || '未知错误', duration: 1000 , position:'bottom'});
                      }
                  }).catch((err)=>{ console.log("cmnUserUpdate",err) })
              }
          }
      }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/user/setTel.scss';
  .content_box{
    background:#fff;bottom: 0;
  }
  .content{
    height: auto !important;
    min-height: 100%;
  }
  .tel_box .btn_box{
    margin-bottom: pxToRem(160) !important;
  }
</style>
