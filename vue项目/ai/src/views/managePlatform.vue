<template>
    <el-container>
        <el-header>
            <el-row class="pc-size">
                <el-col :span="1" class="logo-wrap">
                    <img src="../assets/logo.png" alt="logo">
                </el-col>
                <el-col :span="4" class="title-wrap">
                    AI预审辅助分析系统
                </el-col>
                <el-col :span="18" style="text-align:right;">
                    <ManageMenu />
                </el-col>
                <el-col :span="1" >
                    <router-link to="/main/homepage">
                        <el-tooltip class="item" effect="light" content="首页" placement="left">
                            <img src="../assets/manage/backIndex.png" alt="index" style="vertical-align:middle;">
                        </el-tooltip>
                    </router-link>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import ManageMenu from '../components/manageMenu';
export default {
    components: {
        ManageMenu
    }
};
</script>

<style lang="less" scoped>
.el-container {
  .el-header {
    line-height: 60px;
    overflow: hidden;
    background-color: #0f2744;
    color: #fff;
    padding: 0;
    min-width: 1440px;
    .head-control {
      a {
        img:hover {
          animation: shake 500ms;
        }
      }
    }
  }
  .el-main {
      background-color: #fff;
  }
}
.tab-container {
  padding: 100px 50px;
  .btn-block {
    width: 100%;
    margin: 10px 0;
  }
  .active {
    background: #409eff;
    color: #fff;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-1px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(1px);
  }
}
</style>

