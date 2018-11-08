<template>
  <div v-loading="loading"
       class="login"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="title">
      嵌入式视频结构化分析器
    </div>
    <div class="login-wrapper">
      <div class="fr form-box">
        <p class="tips f12">推荐使用1440*900分辨率</p>
        <p class="f26 form-title">用户登陆</p>
        <p class="form-input-box">
          <el-input v-reg="[{req:reg.username, failCallback: usernameCallback}]" v-model.trim="username" placeholder="请输入用户名" suffix-icon="iconfont icon-yonghuming" maxlength="30"></el-input>
        </p>
        <p class="form-input-box">
          <el-input v-reg="[{req:reg.password, failCallback: passwordCallback}]" v-model.trim="password" placeholder="请输入密码"
                    suffix-icon="iconfont icon-mima" maxlength="30" type="password"
                    @keyup.enter.native="login"
          ></el-input>
        </p>
        <p class="remember-box">
          <el-checkbox v-model="remember">记住密码</el-checkbox>
        </p>
        <p class="login-box">
          <el-button type="primary" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </p>
      </div>
    </div>
    <div class="copyright f12">
      Copyright&nbsp;@&nbsp;北京深瞐科技有限公司&nbsp;&nbsp;版权所有
    </div>
  </div>
</template>

<script>
  import Reg from '@/assets/js/reg'
  export default {
    name: 'Login',
    data () {
      return {
        loading: false,
        username: '',
        password: '',
        remember: '',
        reg: Reg
      }
    },
    created () {
      let remembername = this.$cookie.get('rememberName')
      let rememberPassword = this.$cookie.get('rememberPassword')
      this.remember = this.$cookie.get('remember') === 'true'

      if (remembername) {
        this.username = remembername
      }
      if (this.remember && rememberPassword) {
        this.password = rememberPassword
      }
    },
    methods: {
      usernameCallback () {
        this.$message.warning('用户名格式不正确，（4到16位，由字母，数字，下划线，减号组成）')
      },
      passwordCallback () {
        this.$message.warning('密码格式不正确，（请输入4到16位，由字母，数字，下划线，减号组成）')
      },
      async login () {
        if (!Reg.username.test(this.username)) { this.usernameCallback(); return }
        if (!Reg.password.test(this.password)) { this.passwordCallback(); return }
        this.$cookie.set('remember', this.remember) // 记下【记住密码】的勾选状态
        this.$cookie.set('rememberName', this.username) // 自动填充最近一次登录的账号名

        if (this.remember) {
          this.$cookie.set('rememberPassword', this.password)
        }

        this.loading = true
        let res = await this.$api.cmnUserLogin({
          user: this.username,
          pass: this.password
        }).finally(() => { this.loading = false })
        this.$cookie.set('seemmo', res.data.token)
        this.$router.push(this.$route.query.redirect || '/')
      }
    }
  }
</script>

<style lang="scss" scoped>
  $family:"YouYuan";
  $loginBg1: '~@/assets/images/login_bg1.png';
  $loginBg2: '~@/assets/images/login_bg2.png';

.login{
  @include fill-all;
  overflow: hidden;
  background: url($loginBg1) no-repeat center/cover;

  .title{
    margin-top:100px;
    margin-bottom: 70px;
    height:42px;
    font-size:42px;
    line-height:42px;
    text-align: center;
    color:#fff;
    font-family: $family;
  }
  .login-wrapper{
    height:446px;
    width:828px;
    margin:0 auto;
    border-radius: 16px;
    background: #0080d1;
    color:#fff;
    background: url($loginBg2) no-repeat center/cover;
    .form-box{
      height:100%;
      padding-right:48px;
      overflow: hidden;
      .tips{
        width:290px;
        height:34px;
        border:1px dashed rgba(255,255,255,.5);
        margin-top:32px;
        margin-bottom: 44px;
        line-height:34px;
        text-align: center;
      }
      .form-title{
        height:26px;
        line-height:26px;
        text-align: center;
        font-family: $family;
        margin-bottom: 40px;
      }
      .form-input-box{
        margin-bottom: 10px;
        border-radius: 10px;
        .el-input{
          input{

          }
        }
      }
      .remember-box{
        overflow: hidden;
        margin-bottom: 18px;
      }
    }
  }

  .copyright{
    position: absolute;
    left:0;
    bottom:8px;
    width:100%;
    text-align: center;
    color:rgba(255,255,255,.5);
  }
}
</style>
<style lang="scss">
  $loginBtnBg:'~@/assets/images/loginbtn_bg.png';
  .login{
    .login-wrapper{
      .form-box{
        .form-input-box{
          .el-input{
            background: none;
            input{
              height:50px;
              @include input-font-color(#fff);
              border-color:rgba(255,255,255,.5);
              background: #0080d1;
            }
            .iconfont{
              font-size:30px;
              color:#75b1f9
            }
            .el-input__suffix{
              top:10px;
              right:15px;
            }
          }
        }
        .remember-box{
          .el-checkbox{
            float: right;
          }
          .el-checkbox__inner{
            background: #234495;
          }
          .el-checkbox__label{
            color:#fff;
            font-size:12px;
          }
        }
        .login-box{
          button{
            width:100%;
            height:50px;
            border-radius: 10px;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
            background: url($loginBtnBg) no-repeat center/cover;
            span{
              color:#25499f;
              font-size: 18px;
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .v-header-page{

    .login-box{
      .el-button{

      }
    }
  }
</style>
