<template>
  <div class="system-layout">
    <el-row :class="$i18n.locale" class="tac menu-list">
      <el-col :class="$i18n.locale" class="home-menu-box">
        <el-menu
          :default-active="$route.path === '/home/systemSetting' ? '/home/systemSetting/ip' : $route.path"
          router
          @open="handleOpen"
          @close="handleClose">
          <!--<el-submenu index="/currentTask">-->
          <!--<template slot="title">-->
          <!--<i class="icon-shishirenwu iconfont"></i>-->
          <!--<span>实时任务</span>-->
          <!--</template>-->
          <!--<el-menu-item index="/currentTask">实时任务</el-menu-item>-->
          <!--</el-submenu>-->
          <el-submenu index="/home/systemSetting/ip">
            <template slot="title">
              <i class="icon-wangluoshezhi iconfont"></i>
              <span>{{ $t('menu.net.name') }}</span>
            </template>
            <el-menu-item index="/home/systemSetting/ip">{{ $t('menu.net.ip') }}</el-menu-item>
            <el-menu-item index="/home/systemSetting/ftp">{{ $t('menu.net.ftp') }}</el-menu-item>
          </el-submenu>
          <el-submenu index="/home/systemSetting/passageway">
            <template slot="title">
              <i class="icon-tongdaoshezhi iconfont"></i>
              <span>{{ $t('menu.passageway.name') }}</span>
            </template>
            <el-menu-item index="/home/systemSetting/passageway">{{ $t('menu.passageway.passageway') }}</el-menu-item>
            <el-menu-item index="/home/systemSetting/roi">{{ $t('menu.passageway.roi') }}</el-menu-item>
          </el-submenu>
          <!--<el-submenu index="4">-->
          <!--<template slot="title">-->
          <!--<i class="icon-yonghuguanli iconfont"></i>-->
          <!--<span>用户管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="/user">用户管理</el-menu-item>-->
          <!--</el-submenu>-->
          <el-submenu index="/home/systemSetting/device">
            <template slot="title">
              <i class="icon-xitongweihu iconfont"></i>
              <span>{{ $t('menu.sysSetting.name') }}</span>
            </template>
            <el-menu-item index="/home/systemSetting/device">{{ $t('menu.sysSetting.device') }}</el-menu-item>
            <el-menu-item index="/home/systemSetting/checkTime">{{ $t('menu.sysSetting.checkTime') }}</el-menu-item>
            <el-menu-item index="/home/systemSetting/homeControl">{{ $t('menu.sysSetting.homeControl') }}</el-menu-item>
            <el-menu-item index="/home/systemSetting/authorize">{{ $t('menu.sysSetting.authorize') }}</el-menu-item>
            <!--<el-menu-item index="/record">系统日志</el-menu-item>-->
            <el-menu-item index="/home/systemSetting/levelUp">{{ $t('menu.sysSetting.levelUp') }}</el-menu-item>
            <el-menu-item index="/home/systemSetting/autoService">{{ $t('menu.sysSetting.autoService') }}</el-menu-item>
            <el-menu-item index="/home/systemSetting/dataUpload">{{ $t('menu.sysSetting.dataUpload') }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <transition name="slide-fade" mode="out-in">
      <router-view class="system-children-router"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentRouter: this.$route.path
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        this.$router.push(key)
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-box-bg{
    position: absolute;
    left:0;top:0;bottom:0;
    width:224px;
    background:#061735;
    z-index: 1
  }
  .system-layout{
    display: flex;
    .menu-list{
      width:224px;
      background: #061735;
    }
    .menu-list.en{
      width: 254px;
    }
    .system-children-router{
      flex:1;
    }
  }
  .tac.el-row{
    .home-menu-box{
      box-sizing: border-box;
      width:224px;
      background:#061735;
      position: relative;
      z-index: 3
    }
    .home-menu-box.en{
       width:254px;
    }
  }
  .el-menu-item.is-active{
    background: #1c2659;
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

.slide-fade-enter-active, .slide-fade-leave-active{
  transition: all 300ms ease;
}
.slide-fade-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>
