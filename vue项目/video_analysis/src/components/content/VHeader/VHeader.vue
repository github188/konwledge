<template>
  <div class="v-header-page header">
    <div class="logo"></div>
    <div class="title f22"></div>
    <div class="setting-box fr">
      <div class="about ib" @click="displayVersion(versionInfo)">
        <span class="icon-guanyuwomen iconfont f18"></span>
        <span class="f16 about-text">关于</span>
      </div>
      <div class="user-info ib">
        <span class="image-box ib"></span>
        <span class="ib user-name f14">{{ nickname }}</span>
        <span class="iconfont el-icon-arrow-down ib"></span>
      </div>
      <div class="sign-out ib icon-ai240 iconfont f18" @click="signOut"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'VHeader',
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
        }
      }
    },
    created () {
      // this._getUserInfo()
    },
    methods: {
      async _getUserInfo () {
        let res = await this.$api.cmnUserInfo()
        this.nickname = res.data.name
        this.versionInfo = res.data.version
      },
      signOut () {
        this.$alert('确定要退出吗', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$cookie.clear('seemmo')
            this.$message({
              type: 'success',
              message: `退出成功`
            })
            this.$router.push('/login')
          }
        })
      },
      displayVersion (versionInfo) {
        this.$alert(versionInfo.version + versionInfo.tips, '系统版本', {
          confirmButtonText: '确定'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $logo:'~@/assets/images/logo.png';
  $logoText: '~@/assets/images/inner_title.png';

  .ib{
    display: inline-block;
    vertical-align: middle;
  }
  .header{
    overflow: hidden;
    position: relative;
    min-width: 1140+248px;
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
    .setting-box{
      height:76px;
      span{
        display: inline-block;
      }
      .about{
        margin-right:46px;
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
  }
</style>
