<template>
    <el-container>
        <el-container>

            <el-header>
                <div :style="{width:wid,margin:'auto',transition:'500ms linear'}">
                    <el-col :span="1" class="logo-wrap">
                        <img src="../assets/logo.png" alt="logo">
                    </el-col>
                    <el-col :span="4" class="title-wrap">
                        AI预审辅助分析系统
                    </el-col>
                    <el-col :span="15" style="text-align:right;">
                        <Menu>
                        </Menu>
                    </el-col>

                    <el-col :span="4" class="head-control">
                        <el-col :span="3" class="platform-manage">
                            <router-link to="/managePlatform/personalIndex">
                                <el-tooltip class="item" effect="light" content="平台管理" placement="left">
                                    <img src="../assets/icon/manage.png" alt="">
                                </el-tooltip>
                            </router-link>
                        </el-col>
                        <el-col :span="17" class="hc-one">
                            <el-col :span="6">
                                <img src="../assets/userhead.png">
                            </el-col>
                            <el-col :span="16">
                                {{userName}}
                            </el-col>
                        </el-col>
                        <el-col :span="4" class="hc-three">
                            <div @click="logOut">
                            </div>
                        </el-col>
                    </el-col>
                </div>
            </el-header>
            <el-main>
                <transition name="slide-fade" mode="out-in">
                    <router-view />
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import Menu from '../components/menu';
export default {
    components: {
        Menu
    },
    data() {
        return {
            userName: '深瞐科技',
            wid: '100%'
        };
    },
    methods: {
        logOut() {
            this.$confirm('确认退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this._services.logout().then((res) => {
                    if (parseInt(res.errorCode, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }
                    window.sessionStorage.removeItem('access-token');
                    this.$router.push('/login');
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        isLogin() {
            this._services.isLogin().then((res) => {
                if (parseInt(res.errorCode, 10) === 403) {
                    this.$router.push('/login');
                }
                // this.userName = res.data.userName;
                this.$store.commit('saveUserData', res.data);
            });
        }


    },
    updated() {
        let pageName = this.$route.path;

        this.wid = pageName.includes('homepage') || pageName.includes('illegalState') ? '100%' : '1440px';
    },
    computed: {
    }
};
</script>


<style lang="less">
.el-container {
  height: 100%;
  .el-header {
    line-height: 60px;
    overflow: hidden;
    background-color: #0f2744;
    color: #fff;
    padding: 0;
    font-family: "黑体";
    .platform-manage {
      a {
        cursor: pointer;
        // font-size: 25px;
        // line-height: 60px;
        display: inline-block;
        width: 18px;
        height: 18px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
          &:hover {
            transform: rotateZ(60deg);
            transition: 1s;
            //   transform-origin: center center;
          }
        }
      }
    }
  }

  .el-main {
    height: 100%;
    padding: 0;
    background-color: #fff;
  }

  .logo-wrap {
    text-align: center;
    img {
      vertical-align: middle;
    }
  }
  .title-wrap {
    color: #fff;
    font-size: 22px;
  }
  .head-control {
    background-image: url("../assets/topmenu-texture.png");
    background-size: 100% 100%;
    .hc-one {
      img {
        vertical-align: middle;
      }
    }
    .hc-three {
      text-align: center;
      height: 100%;
      div {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-top: 20px;
        background-image: url("../assets/logout.png");
        background-size: 100% 100%;
        cursor: pointer;
        &:hover {
          background-image: url("../assets/logoutred.png");
        }
      }
    }
  }
}

.slide-fade-enter-active {
  transition: all 300ms ease;
}
.slide-fade-leave-active {
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

