<template>
  <div class="Home">
    <v-header title="嵌入式视频结构化分析器"></v-header>
    <div :class="['/', '/currentTask'].indexOf($route.path) !== -1 ? 'bg-black' : 'others'" class="main">
      <div class="menu-box-bg"></div>
      <el-row class="tac">
        <el-col class="home-menu-box">
          <el-menu
            :default-active="$route.path"
            router
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="icon-shishirenwu iconfont"></i>
                <span>实时任务</span>
              </template>
              <el-menu-item index="/currentTask">实时任务</el-menu-item>
              <!--<el-menu-item index="/test">测试页面</el-menu-item>-->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="icon-wangluoshezhi iconfont"></i>
                <span>网络设置</span>
              </template>
              <el-menu-item index="/ip">IP设置</el-menu-item>
              <el-menu-item index="/ftp">FTP设置</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="icon-tongdaoshezhi iconfont"></i>
                <span>通道设置</span>
              </template>
              <el-menu-item index="/passageway">通道设置</el-menu-item>
              <el-menu-item index="/roi">ROI区域设置</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="icon-yonghuguanli iconfont"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user">用户管理</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="icon-xitongweihu iconfont"></i>
                <span>系统维护</span>
              </template>
              <el-menu-item index="/device">设备操作</el-menu-item>
              <el-menu-item index="/checkTime">设备校时</el-menu-item>
              <el-menu-item index="/homeControl">首页显示</el-menu-item>
              <el-menu-item index="/authorize">授权管理</el-menu-item>
              <el-menu-item index="/record">系统日志</el-menu-item>
              <el-menu-item index="/levelUp">系统升级</el-menu-item>
              <el-menu-item index="/autoService">自动维护</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <router-view></router-view>
      </el-row>
    </div>
  </div>
</template>

<script>
  import VHeader from '@/components/content/VHeader/VHeader.vue'
  export default {
    name: 'Home',
    components: {
      VHeader
    },
    data () {
      return {
        currentRouter: this.$route.path
      }
    },
    created () {

    },
    methods: {
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bg:'~@/assets/images/big_bg.png';
  .Home{
    .main{
      position: relative;
      .menu-box-bg{
        position: absolute;
        left:0;top:0;bottom:0;
        width:224px;
        background:#061735;
        z-index: 1
      }
      .tac.el-row{
        .home-menu-box{
          box-sizing: border-box;
          width:224px;
          background:#061735;
          position: relative;
          z-index: 3
        }
      }
    }
    .main.bg-black{
      background: url( $bg );
    }
    .el-menu-item.is-active{
      background: #1c2659;
    }
  }
</style>
<style lang="scss">
  $activeColor:#1c2659;
  $fontColor:#fff;

  .home-menu-box{
    ul.el-menu{
      background: #061735;
      color:#fff;
      border:none;
      li.el-menu-item{
        padding-left:80px !important;
        i,span{
          color:$fontColor;
        }
        .el-submenu__title:hover{
          background: $activeColor;
        }
      }
      li.el-submenu{
        .el-submenu__title{
          i.el-icon-location,span{
            color:$fontColor;
          }
          i:first-child{
            margin-right: 30px;
          }
        }
      }
    }
  }

  .home-menu-box{
    .el-menu-item:focus, .el-menu-item:hover{
      background: $activeColor;
    }
    .el-submenu__title:hover{
      background: $activeColor;
    }
    .el-menu-item{
      color:#fff;
    }
  }

</style>
