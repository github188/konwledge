<template>
    <div>
        <div class="m-top-info">
            <div class="page-title m-main-box">
                <i class="iconfont icon-person-index fz-20"></i>
                <span>个人首页</span>
            </div>
        </div>
        <div class="m-main-box main-box">
            <div class="info-box">
                <el-form :label-position="labelPosition" label-width="80px" :model="userInfo">
                    <el-form-item label="警号/工号">
                        <el-input v-model="userInfo.userAccount" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="userInfo.userName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="userInfo.telephone" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="身份证">
                        <el-input v-model="userInfo.userIdentfy" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-input v-model="userInfo.roleName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="单位">
                        <el-input v-model="userInfo.org" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="edit-p">
                        <el-button type="primary"  @click="dialogVisible = true">更改密码</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog
                    title="更改密码"
                    :visible.sync="dialogVisible"
                    width="20%"
                    top="30vh"
                    center
                    :close-on-click-modal="false"
                    >
                    <el-form :label-position="labelPosition" :rules="rules" ref="passWdInfo"  label-width="80px" :model="passWdInfo">
                        <el-form-item label="旧密码" prop="oldPsd">
                            <el-input v-model="passWdInfo.oldPsd"  type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPsd">
                            <el-input v-model="passWdInfo.newPsd" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="再次确认" prop="comfrimPsd">
                            <el-input v-model="passWdInfo.comfrimPsd" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary"  @click="submitForm('passWdInfo')">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
         let validatePassWd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.passWdInfo.comfrimPsd !== '') {
                    this.$refs.passWdInfo.validateField('comfrimPsd');
                }
                callback();
            }
        };
        let validateCheckPassWd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passWdInfo.newPsd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            dialogVisible: false,
            labelPosition: 'right',
            currentUser: {},
            userInfo: {
                userAccount: '',
                userName: '',
                roleName: '',
                userIdentfy: '',
                org: '',
                telephone: ''
            },
            passWdInfo: {
                oldPsd: '',
                newPsd: '',
                comfrimPsd: ''
            },
            rules: {
                oldPsd: [
                     { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
                newPsd: [
                     { validator: validatePassWd, trigger: 'blur' }
                ],
                comfrimPsd: [
                     { validator: validateCheckPassWd, trigger: 'blur' }
                ]
            }

        };
    },
    methods: {
        // 更新密码
        submitForm(formName) {
            let _this = this;

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const param = {
                        type: 'updateLoginPassword',
                        userId: _this.currentUser.userId ? _this.currentUser.userId : 1,
                        oldUserPassword: _this.passWdInfo.oldPsd,
                        userPassword: _this.passWdInfo.newPsd
                    };

                    this._services.updatePasswd(param)
                    .then(res => {
                        if ( parseInt(res.errorCode, 10) === 0 ) {
                            this.dialogVisible = false;
                            this.tools.message('修改密码成功' , 'success');
                        } else {
                            this.tools.message(res.message , 'error');
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getOnlineUser() {
            this._services.getUser({userId: this.currentUser.userId})
            .then(
                res => {
                    if (parseInt(res.errorCode, 10) === 0) {
                        if (res.data.length) {
                            this.userInfo = res.data[0];
                        }
                    }
                }
            );
        }
    },
    mounted() {
        this.currentUser = this.$store.getters.userData;
        console.log(this.currentUser);
        this.getOnlineUser();
    }
};
</script>

<style lang="less">
.main-box {
    background: #fff;
    margin-top: 40px;
    height: 600px;
     .info-box {
         padding-top: 80px;
         margin: 0 auto;
         width: 500px;
    }
}
.edit-p {
    text-align: center;
    button {
    background: #18a5d6;
    }
    .el-button:focus, .el-button:hover {
    background: #18a5d6;
    }
}
</style>

