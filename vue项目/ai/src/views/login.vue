<template>
    <div class="login">
        <div class="title">AI预审分析系统</div>
        <div class="useless"></div>
        <div class="login-box">
            <el-form :model="accountForm" status-icon :rules="rules" ref="accountForm" class="demo-ruleForm">
                <el-form-item prop="userAccount">
                    <el-input type="text" v-model="accountForm.userAccount" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input type="password" v-model="accountForm.userPassword" auto-complete="off" @keyup.enter.native='checkpwd' placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="checkpwd" class="login-btn">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="useless2"></div>
        <div class="copyright">
            Copyright©2016-2018 北京深瞐科技股份有限公司. | All Rights Reserved
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            accountForm: {
                userAccount: '',
                userPassword: ''
            },
            rules: {
                userAccount: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 12,
                        message: '长度为 5 到 12 位'
                    },
                    {
                        pattern: /^[a-zA-Z0-9]+$/,
                        message: '用户名只能数字和字母'
                    }
                ],
                userPassword: [
                    {
                        required: true,
                        message: '请输密码',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 15,
                        message: '长度为 5 到 15 位'
                    },
                    {
                        pattern: /^[0-9a-zA-Z]+$/,
                        message: '只能包含数字和字母'
                    }
                ]
            }
        };
    },
    methods: {

        checkpwd() {
            let _this = this;
            let { userAccount, userPassword } = this.accountForm;

            _this.$refs.accountForm.validate(valid => {
                if (valid) {
                    _this._services.login(
                        {
                            userAccount: userAccount,
                            userPassword: userPassword
                        },
                        {
                            method: 'POST',
                            loading: {
                                msg: '登录中...'
                            }
                        }
                    ).then(
                        (res) => {
                            if (parseInt(res.errorCode, 10) !== 0) {
                                _this.tools.message(res.message, 'error');
                                return;
                            }
                            this.$store.commit('saveUserData', res.data);
                            window.sessionStorage.setItem('access-token', res.data.userAccount);
                            _this.$router.push('/main');
                            _this.tools.message('登录成功!', 'success');
                        }
                    );
                }
            });
        },
        logOut() {
            this._services.logout().then(
                (res) => {
                    if (parseInt(res.errorCode, 10) === 0) {
                        this.isLogin = false;
                    }
                }
            );
        },
        toIndex() {
            this.$router.push('/main');
        },
        isLogin() {
            this._services.isLogin().then((res) => {
                console.log(res);
                if (parseInt(res.errorCode, 10) === 0) {
                    this.$router.push('/main/homepage');
                }
                // this.userName = res.data.userName;
                this.$store.commit('saveUserData', res.data);
            });
        }


    },
    mounted() {
        this.isLogin();
    }

};
</script>


<style  lang='less'>
@maincolor: #40edfe;
.login {
  width: 100%;
  height: 100%;
  background-color: #051626;
  .title {
    position: relative;
    top: 5%;
    background: url("../assets/titlebg.png") no-repeat;
    font-style: oblique;
    font-size: 25px;
    font-family: "微软雅黑";
    color: @maincolor;
    width: 456px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    margin: auto;
    box-shadow: inset 0 0 0 0 #143d53;
  }
  .useless {
    width: 500px;
    height: 60px;
    background: url("../assets/useless.png") no-repeat;
    position: relative;
    top: 10%;
    left: 58%;
    transform: translate(-50%);
  }
  .login-box {
    width: 637px;
    height: 437px;
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    background: url("../assets/loginboxbg.png") no-repeat;
    z-index: 3;
    form {
      width: 350px;
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%, -50%);
      margin-top: 10px;
      .el-input {
        margin-bottom: 20px;
        .el-input__inner {
          border: 1px solid @maincolor;
          background-color: #152341;
          color: @maincolor;
        }
      }
      .login-btn {
        background: url("../assets/loginbtnbg.png");
        width: 146px;
        height: 46px;
        border: 0 none;
        color: @maincolor;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .useless2 {
    width: 1011px;
    height: 34px;
    background: url("../assets/useless2.png") no-repeat;
    position: absolute;
    left: 50%;
    bottom: 8%;
    transform: translate(-50%, -50%);
  }
  .copyright {
    color: #798998;
    width: 600px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
