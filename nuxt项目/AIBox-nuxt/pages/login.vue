<template>
  <div v-loading="loading"
       class="login"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="language">
      <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ $t('language') }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="title">
        <span class="logo"></span>
        <span>{{ $t('login.title') }}</span>
    </div>
    
    <div class="login-wrapper">
      <div class="fr form-box">
        <p class="tips f14">{{ $t('login.tips') }}</p>
        <p class="f30 form-title">{{ $t('login.formTitle') }}</p>
        <div class="form-input-box">
          <el-input 
          v-model.trim="username" 
v-reg="[{req:reg.username, failCallback: usernameCallback}]"
          :placeholder="$t('login.usernameHolder')" 
          class="f20" 
          suffix-icon="iconfont icon-yonghuming" 
          maxlength="30"></el-input>
        </div>
        <div class="form-input-box">
          <el-input 
          v-reg="[{req:reg.password, failCallback: passwordCallback}]"
                    v-model.trim="password" :placeholder="$t('login.passwordHolder')" class="f20"
                    suffix-icon="iconfont icon-mima" maxlength="30" type="password"
                    @keyup.enter.native="login"
          ></el-input>
        </div>
        <p class="remember-box">
          <el-checkbox v-model="remember">{{ $t('login.passwordRemember') }}</el-checkbox>
        </p>
        <p class="login-box">
          <el-button type="primary" @click="login">{{ $t('login.loginBtn') }}</el-button>
        </p>
      </div>
    </div>
    <div class="copyright f12">
      {{ $t('login.copyright') }}
    </div>
  </div>
</template>

<script>
import Reg from '~/assets/js/reg'
  import {_rePaint} from '~/assets/js/mixins/index'

export default {
    name: 'Login',
      mixins: [_rePaint],
    data () {
      return {
        loading: false,
        username: '',
        password: '',
        remember: '',
        reg: Reg
      }
    },
    mounted () {
      // this.$i18n.locale = 'en'
      let remembername = this.$cookie.get('rememberName')
      let rememberPassword = this.$cookie.get('rememberPassword')
      this.remember = this.$cookie.get('remember') === 'true'

      if (remembername) {
        this.username = remembername
      }
      if (this.remember && rememberPassword) {
        this.password = rememberPassword
      }
      
      // alert(0)
      // console.log(timeFormat)
      // alert(1)
      // console.log(timeFormat(new Date(),'yyyy-MM-dd hh-mm-ss') , "timeformat")
    },
    methods: {
      async handleCommand (command) {
        this.loading = true
        let res = await this.$api.setLanguage({ type: command === 'zh' ? '1' : '2' }).finally(() => {
          this.loading = false
        })
        this.$store.state.language = this.$i18n.locale = command
        this.$message.success(res.message)
        this._rePaint()
      },
      usernameCallback () {
        this.$message.warning(this.$t('reg.username'))
      },
      passwordCallback () {
        this.$message.warning(this.$t('reg.password'))
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
        this.$router.push(this.$route.query.redirect || '/home')
      }
    }
  }
</script>

<style lang="scss" scoped>
  $family:"YouYuan";
  $loginBg1: '~assets/images/login_bg1.png';
  $loginBg2: '~assets/images/login_bg2.png';
  $logo2: '~assets/images/logo2.png';

  .language{
    position: absolute;
    right:4vw;
    top:4vh;
    .el-dropdown{
      width:82px;
      color: #fff;
      span{
        display: inline-block;
        width: 100%;
        text-align: center;
      }
      &:hover{
        cursor: pointer;
      }
    }
  }
.login{
  @include fill-all;
  min-height:660px;
  overflow: hidden;
  background: url($loginBg1) no-repeat center/cover;

  .title{
    margin-top:12.5vh;
    margin-bottom: 8.75vh;
    height:42px;
    font-size:42px;
    line-height:42px;
    text-align: center;
    color:#fff;
    font-family: $family;
    .logo{
      background: url($logo2) no-repeat center;
      width:150px;
      padding:0 20px;
      /*border-right:2px solid #fff;*/
      position:relative;
      &:after{
        content: '';
        background: #fff;
        width:2px;
        position:absolute;
        right:0;
        top:4px;
        bottom:4px;
      }
    }
    span{
      display: inline-block;
      vertical-align: middle;
      height:42px;
    }
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
            input:-webkit-autofill{
              -webkit-box-shadow: 0 0 0px 1000px #0080d1 inset;
              border: 1px solid rgba(255,255,255,.5)!important;
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
