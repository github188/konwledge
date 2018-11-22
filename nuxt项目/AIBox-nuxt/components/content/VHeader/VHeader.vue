<template>
  <div v-loading.fullscreen.lock="fullscreenLoading"
       class="v-header-page header"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.3)">
    <div class="logo"></div>
    <div :class="[$i18n.locale, $product]" class="title f22"></div>
    <ul class="product-list">
      <li :class="{'current-router': currentRouter === '/home' || currentRouter === '/'}" @click="handleSwitch('/home')"><i class="iconfont icon-shishirenwu-"></i><span>{{ $t('vHeader.currentTask') }}</span></li>
      <li :class="{'current-router': currentRouter !== '/home' && currentRouter !== '/'}" @click="handleSwitch('/home/systemSetting/ip')"><i class="iconfont icon-xitongshezhi-"></i><span>{{ $t('vHeader.systemSetting') }}</span></li>
    </ul>
    <div class="setting-box fr">
      <!-- <div class="about ib" @click="displayVersion(versionInfo)">
        <span class="icon-guanyuwomen iconfont f18"></span>
        <span class="f16 about-text">{{ $t('vHeader.about') }}</span>
      </div>
      -->
      <!--<div class="user-info ib">-->
        <!--<span class="image-box ib"></span>-->
        <!--<span class="ib user-name f14">{{ nickname }}</span>-->
        <!--<span class="iconfont el-icon-arrow-down ib"></span>-->
      <!--</div>-->
      <!-- <div class="sign-out ib icon-ai240 iconfont f18" @click="signOut"></div> -->
      <el-button round @click="signOut">{{ $t('vHeader.exit') }}</el-button>
    </div>
    <div class="language fr">
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
  </div>
</template>

<script>
  import zhLogoText from '~/assets/images/inner_title.png'
  import eLogoText from '~/assets/images/e_title.png'
  import {_rePaint} from '~/assets/js/mixins/index'

  export default {
    mixins: [_rePaint],
    props: {
      title: {
        type: String,
        require: true
      }
    },
    data () {
      return {
        nickname: 'Administor',
        versionInfo: {
          version: '',
          tips: ''
        },
        currentRouter: this.$route.path,
        fullscreenLoading: false,
        zhLogoText,
        eLogoText
      }
    },
    created () {
      // console.log(this.$product)
      // this._getUserInfo()
      // console.log(this.currentRouter)
    },
    methods: {
      async handleCommand (command) {
        this.fullscreenLoading = true
        let res = await this.$api.setLanguage({ type: command === 'zh' ? '1' : '2' }).finally(() => {
          this.fullscreenLoading = false
        })
        this.$store.state.language = this.$i18n.locale = command
        this.$message.success(res.message)
        this._rePaint()
      },
      async _getUserInfo () {
        // let res = await this.$api.cmnUserInfo()
        // this.nickname = res.data.name
        // this.versionInfo = res.data.version
        this.nickname = 'root'
        this.versionInfo = 'v1.0'
      },
      signOut () {
        this.$cookie.clear('seemmo')
        this.$router.push('/')
        // this.$alert(this.$t('vHeader.confirmTips'), this.$t('confirm.title'), {
        //   confirmButtonText: this.$t('confirm.confirm'),
        //   callback: action => {
        //     this.$cookie.clear('seemmo')
        //     this.$router.push('/login')
        //   }
        // })
      },
      displayVersion (versionInfo) {
        this.$alert(versionInfo.version + versionInfo.tips, this.$t('vHeader.version'), {
          confirmButtonText: this.$t('confirm.confirm')
        })
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleSwitch (type) {
        this.currentRouter = type
        this.$router.push(type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $logo:'~assets/images/logo.png';

  $logoText: '~assets/images/inner_title.png';
  $enLogoText:'~assets/images/e_title.png';
  $targetLogoText: '~assets/images/inner_title1.png';
  $targetEnLogoText:'~assets/images/e_title1.png';  

  .language{
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
    .el-dropdown{
      width:82px;
      color: #000;
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
  .ib{
    display: inline-block;
    vertical-align: middle;
  }
  ul.product-list{
    display: inline-block;
    margin-left:60px;
    vertical-align: middle;
    li{
      display: inline-block;
      box-sizing: border-box;
      vertical-align: middle;
      margin-right:20px;
      position: relative;
      &:hover{
        cursor: pointer;
        color:#3987d9;
      }
      i.iconfont{
        margin:0 6px;
      }
    }
  }
  .header{
    overflow: hidden;
    position: relative;
    /*min-width: 1140px;*/
    width:100%;
    z-index:10;
    height:76px;
    background: #fff;
    line-height:76px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    .logo{
      display: inline-block;
      vertical-align: middle;
      margin:0 34px 0 16px;
      width:40px;
      height:40px;
      background: url($logo) no-repeat center/contain;
    }
    .title{
      display: inline-block;
      vertical-align: middle;
      height:40px;
      width:242px;
      font-family: AdobeHeitiStd-Regular;
      color: #041637;
      background: url($logoText) no-repeat center/contain;
    }
    .title.structured.zh{
      background: url($logoText) no-repeat center/contain;
    }
    .title.structured.en{
      width:368px;
      background: url($enLogoText) no-repeat center/contain;
    }
    .title.target.zh{
      background: url($targetLogoText) no-repeat center/contain;
    }
    .title.target.en{
      width:368px;
      background: url($targetEnLogoText) no-repeat center/contain;
    }

    .setting-box{
      height:76px;
      span{
        display: inline-block;
      }
      .about{
        margin-right:26px;
        line-height: 76px;
        &:hover{
          cursor: pointer;
          color:#06acf9;
          .about-text{
            color:#06acf9;
          }
        }
        .iconfont{
          line-height: 76px;
        }
        .about-text{
          color:#0e1d3a;
        }
      }
      .user-info{
        margin-right:34px;
        &:hover{
          cursor: pointer;
          color:#06acf9;
        }
        .image-box{
          width:50px;
          height:50px;
          margin-right:6px;
          border-radius: 50%;
          background-image: linear-gradient(-22deg,
            #073c8b 35%,
            #0080d1 100%),
          linear-gradient(
              #0f8ed8,
              #0f8ed8);
          background-blend-mode: normal,
          normal;
        }
        .user-name{
          margin-right:6px;
        }
      }
      .sign-out{
        margin-right:24px;
        &:hover{
          cursor: pointer;
          color:red;
        }
      }
    }
    .current-router{
      color:#3987d9;
      &:after{
        content: '';
        position: absolute;
        left:0;right:0;bottom:1px;
        height:2px;
        background: #3987d9;
      }
    }
  }
</style>
