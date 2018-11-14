<template>
  <div class="set_pay_pass" v-if="flag">
    <v-header title="设置支付密码" @back="back" :routerLinkMode="false"></v-header>
    <div class="content_box">
      <div class="content">
        <div class="pay_pass_box">
          <div class="sms_code">
            <input type="text" maxlength="6" placeholder="验证码" v-model.trim="sms_code">
            <CountDown :type="1" :mobile="mobile"></CountDown>
          </div>
          <div class="password">
            <input type="password" placeholder="新密码 6-16位，建议数字、字母、符号组合" v-model.trim="password" @blur="testPass()">
            <input type="password" placeholder="确认密码" v-model.trim="checkPass" @blur="reTestPass()">
          </div>
          <div class="btn_box">
            <input class="btn blue_bg" type="submit" v-touchFeel="{color:'#0fbcf7'}" value="提 交"
                   @click="fixPayPassword">
          </div>
        </div>
      </div>
      <p class="copyright">©聚保平台</p>
    </div>
  </div>
</template>

<script>
  import {checkPassWord} from '../mixins/index';
  import CountDown from './Countdown.vue'
  import {Toast, Indicator, MessageBox} from 'mint-ui';
  import {cmnUserUpdate, cmnUserInfo} from '../../assets/js/api';

  export default {
    props: {
      beUsed: {
        type: Boolean,
        default: false
      }
    },
    components: {CountDown},
    mixins: [checkPassWord],
    data() {
      return {
        id: '', // 用户Id
        mobile: '', // 用户手机号
        sms_code: '', // 验证码
        flag: true,
      }
    },
    created() {
      cmnUserInfo().then(res => {
        if (res.err_code === 0) {
          this.mobile = res.data.mobile;
          this.id = res.data.id;
        }
      }).catch((err) => {
        console.log("cmnUserInfo", err)
      })
    },
    methods: {
      fixPayPassword() {
        if (!this.mobile) {
          Toast({message: '请输入手机号！', duration: 1000, position: 'bottom'});
          return false;
        } else if (!this.sms_code) {
          Toast({message: '请输入手机验证码！', duration: 1000, position: 'bottom'});
          return false;
        } else if (!this.testPass() || !this.reTestPass()) {
          return false;
        } else if (!this.password) {
          Toast({message: '请输入密码！', duration: 1000, position: 'bottom'});
          return false;
        } else if (!this.checkPass) {
          Toast({message: '请确认密码！', duration: 1000, position: 'bottom'});
          return false;
        } else {
          Indicator.open({text: '正在设置...', spinnerType: 'fading-circle'});
          let data = {id: this.id, mobile: this.mobile, pay_password: this.password, sms_code: this.sms_code}
          cmnUserUpdate(data).then(res => {
            Indicator.close();
            if (res.err_code === 0) {
              Toast({message: '操作成功', duration: 1000, position: 'bottom'});
              if (this.beUsed) {
                this.close();
              } else {
                this.$router.push('/dashboard');
              }

            } else if (res.err_code === 1006) {
              Toast({message: '短信验证码错误', duration: 1000, position: 'bottom'});
            } else {
              Toast({message: res.err_msg || '未知错误', duration: 1000, position: 'bottom'});
            }
          }).catch((err) => {
            console.log("cmnUserUpdate", err)
          })
        }
      },
      back() {
        if (this.beUsed) {
          this.close()
        } else {
          this.$router.push("/setting")
        }
      },
      open() {
        this.flag = true;
      },
      close() {
        this.flag = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/user/setPayPassword';

  .set_pay_pass {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    .content_box{
      bottom: 0;
    }
    .content{
      height: auto !important;
      min-height: 100%;
    }
    .pay_pass_box{
      margin-bottom: pxToRem(160) !important;
    }
  }
</style>
