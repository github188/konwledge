<template>
    <div class="content">
        <div class="m-top-info">
            <el-row class="m-main-box">
                <el-col :span="6"><el-input v-model="userParam.keyWord" placeholder="请输入内容"></el-input></el-col>
                <el-col :span="18"><el-button style="margin:0 10px" type="primary" @click="getUserAll()">检索</el-button></el-col>
            </el-row>

        </div>
        <div class="user-info m-main-box">
            <el-row :gutter="40" style="max-height:'550px'; overflow-y: auto">
                <el-col :span="6" class="item-card" :key="index" v-for="(item , index ) in userDataArr">
                    <span class="mark">{{returnUserTypeName(item.roleName)}}</span>
                     <el-card :body-style="{padding: '15px 30px'}">
                        <div class="title">
                            <div class="avator">
                                <div class="img-box">
                                    <img src="../assets/manage/user.png" alt="">
                                </div>
                            </div>
                            <div class="user-name">
                                <div><span>姓名: </span> <span>{{item.userName}}</span> </div>
                                <div class="text-blue"><span>账号: </span> <span>{{item.userAccount}}</span> </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card :body-style="{padding: '10px 30px'}">
                        <div class="other">
                            <p><span>电话: </span><span>{{item.telephone}}</span></p>
                            <p><span>单位: </span><span>{{item.org}}</span></p>
                            <p><span>创建日期: </span><span>{{ tools.timeFormat(item.createTime)}}</span></p>
                        </div>
                        <div class="control">
                            <el-row class="mouse-out"><i class="el-icon-more"></i></el-row>
                            <el-row class="mouse-in" :gutter="20">
                                <el-col :span="6"><span><i class="el-icon-document"></i>日志</span></el-col>
                                <el-col :span="6"><span @click="updateUser(item)"><i class="el-icon-edit"></i>修改</span></el-col>
                                <el-col :span="6"><span @click="deleteUser(item)"><i class="el-icon-delete"></i>刪除</span></el-col>
                                <el-col :span="6"><span @click="resetPsd(item)"><i class="iconfont icon-reset-passwd"></i>重置</span></el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="add-operating">
                <div class="add-box" @click="addUser()">
                    <i class="el-icon-plus"></i>
                    <span>新增</span>
                </div>
            </div>
        </div>
        <!-- 对话框 -->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal = "false"
            center
            >
            <formbase style="width:80%; margin:0 auto;" ref="formParam" labelWidth="120px" :rules="rules" :formData="formParam" :formGroups="formGroups"></formbase>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="submitForm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import formbase from '../components/common/formbase/formbase';
export default {
    components: {
        formbase
    },
    data() {
        return {
            userParam: {
                keyWord: '',
                userId: ''
            },
            userDataArr: [],
            mockData: [
                {
                    userName: '米尔纳',
                    userAccount: 'mrsNar',
                    telephone: '13723654854',
                    orgName: '利物浦',
                    registerDate: '1537855279000',
                    userType: '1'
                },
                {
                    userName: '德尔夫',
                    userAccount: 'derf',
                    telephone: '13732564815',
                    orgName: '曼城',
                    registerDate: '1537855279000',
                    userType: '2'
                },
                {
                    userName: '米尔纳',
                    userAccount: 'mrsNar',
                    telephone: '13723654854',
                    orgName: '利物浦',
                    registerDate: '1537855279000',
                    userType: '1'
                },
                {
                    userName: '德尔夫',
                    userAccount: 'derf',
                    telephone: '13732564815',
                    orgName: '曼城',
                    registerDate: '1537855279000',
                    userType: '2'
                }
            ],
            formParam: {
                userAccount: '',
                userPassword: '',
                userName: '',
                userIdentfy: '',
                telephone: '',
                roleId: '',
                org: ''
            },
            rules: {
                userAccount: [
                     {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 12,
                        message: '长度为 6 到 12 位'
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
                ],
                userName: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[\u4e00-\u9fa5]+$/,
                        message: '姓名必须为中文'
                    }
                ],
                userIdentfy: [
                    {
                        required: true,
                        message: '请输入身份证',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^([\w]{15})$|^([\w]{18})$/,
                        message: '请输入正确的身份证号'
                    }
                ],
                telephone: [
                    {
                        pattern: /^[0-9][0-9]{10}$/,
                        message: '请输入正确的手机号'
                    }
                ],
                roleId: [
                    {
                        required: true,
                        message: '请选择角色',
                        trigger: ['change' ,'blur']
                    }
                ],
                org: [
                    {
                        required: true,
                        message: '请输入单位名称',
                        trigger: 'blur'
                    }
                ]
            },
            formGroups: [
                {
                    key: 'userAccount',
                    label: '账号',
                    placeholder: '请输入账号',
                    input: true
                },
                {
                    key: 'userPassword',
                    label: '密码',
                    type: 'password',
                    placeholder: '请输入密码',
                    input: true
                },
                {
                    key: 'userName',
                    label: '姓名',
                    placeholder: '用户名必须为中文',
                    input: true
                },
                {
                    key: 'userIdentfy',
                    label: '身份证号',
                    placeholder: '输入15或18个字符',
                    input: true
                },
                {
                    key: 'telephone',
                    label: '电话',
                    input: true
                },
                {
                    key: 'roleId',
                    label: '角色',
                    selection: true,
                    options: [],
                    optionKey: 'roleId',
                    optionName: 'roleName'
                },
                {
                    key: 'org',
                    label: '单位',
                    input: true
                }
            ],
            dialogTitle: '',
            controlType: '1',
            dialogVisible: false
        };
    },
    methods: {
        getUserAll() {
            let _this = this;

            this._services.userSearch(this.userParam , { method: 'POST'})
            .then( res => {
                if (parseInt(res.errorCode, 10) === 0 ) {
                    _this.userDataArr = res.data;
                }
             });
        },
        getAllRole() {
            let _this = this;

            this._services.getRole().then( (res) => {
                    if (parseInt( res.errorCode, 10) === 0) {
                        _this.formGroups[5].options = res.data;
                    }
                });
        },
        addUserReq() {
            let _this = this;

            this._services.userAdd(this.formParam)
            .then((res) => {
                if (parseInt( res.errorCode, 10) === 0) {
                    _this.tools.message('新增成功' , 'success');
                } else {
                    _this.tools.message(res.message , 'error');
                }
            });
        },
        updateUserReq() {
            let _this = this;

            this._services.userUpdate(this.formParam)
            .then((res) => {
                if (parseInt( res.errorCode, 10) === 0) {
                    _this.tools.message('更新成功' , 'success');
                } else {
                    _this.tools.message(res.message , 'error');
                }
            });
        },
        deleteUserReq(id) {
            let _this = this;

            this._services.userDelete({userId: id })
            .then( (res) => {
                if (parseInt( res.errorCode, 10) === 0) {
                   _this.tools.message('更新成功' , 'success');
                   _this.getUserAll();
                } else {
                    _this.tools.message(res.message , 'error');
                }
            });
        },
        returnUserTypeName(name) {
            let text = '';

            text = name.slice(0,1);
            return text;
        },
        submitForm() {
            let _this = this;

            if (this.$refs['formParam']) {
                this.$refs['formParam'].formValidate.validate((valid) => {
                    if (valid) {
                        console.log(valid);
                        if (_this.controlType === '1') {
                            _this.addUserReq();
                        } else if ( _this.controlType === '2') {
                            _this.updateUserReq();
                        }
                        _this.getUserAll();
                        _this.dialogVisible = true;
                    }
                });
            }
        },
        updateDiaLogTitle() {
            if (this.controlType === '1') {
                this.dialogTitle = '新增';
            } else if (this.controlType === '2') {
                this.dialogTitle = '更新';
            }
            this.dialogVisible = true;
        },
        addUser() {
            this.controlType = '1';
            this.updateDiaLogTitle();
        },
        updateUser(userInfo) {
            this.controlType = '2';
            this.updateDiaLogTitle();
            this.formParam = userInfo;
            this.formGroups[1].input = false;
        },
        deleteUser(item) {
            let _this = this;

            this.$confirm(
                '<div>确认要删除用户<br>账号:' + item.userAccount + '姓名: ' + item.userName + '</div>'
                ,
                '删除用户',
                {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true,
                center: true
            }).then(() => {
                // 成功的操作
                _this.deleteUserReq(item.userId);
            }).catch( ()=> {
                // 失败的操作
            });
        },
        resetPsd(item) {
            let _this = this;

            this._services.resetPsd({userId: item.userId})
            .then((res) => {
                if (parseInt(res.errorCode, 10) === 0) {
                    _this.tools.message('重置成功', 'success');
                } else {
                    _this.tools.message(res.message , 'error');
                }
            });

        }
    },
    mounted() {
        this.getUserAll();
        this.getAllRole();
    }
};
</script>

<style lang="less" scoped>
    .content {
        .search-control {
            padding: 10px 0;
            background: #fff;
            box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.05);
        }
        height: 100%;
        .user-info {
            padding: 50px 60px;
            .item-card {
                position: relative;
                margin-bottom: 10px;
                .mark {
                    position: absolute;
                    top: 10px;
                    right: 16px;
                    height: 17px;
                    width: 46px;
                    background: url('../assets/manage/mark.png') no-repeat 0 0;
                    text-align: center;
                    font-size: 12px;
                    line-height: 16px;
                    color: #fff;
                }
                .mouse-out {
                    display: block;
                }
                .mouse-in {
                    display: none;
                }
                &:hover {
                    transition: all 0.2s;
                    transform:translateY(-5px);
                    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
                        box-shadow: 4px 14px 10px 4px rgba(6, 0, 1, 0.05);
                    }
                    .mouse-out {
                        display: none;
                    }
                    .mouse-in {
                        display: block;
                    }
                }
            }
            .el-card {
                border-radius: 6px;
            }
            .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
                box-shadow: 4px 7px 13px 0px rgba(6, 0, 1, 0.05);
            }
            .title {
                .commit-div {
                   float: left;
                }
                .avator {
                    .commit-div;
                    width: 30%;
                    text-align: center;
                    font-size: 24px;
                    height: 100%;
                    .img-box {
                        display: inline-block;
                        margin-top: 15px;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background: #18a5d6;
                        line-height: 40px;
                    }

                }
                .user-name {
                    .commit-div;
                    >div {
                        padding: 5px 0 ;
                        font-size: 16px;
                        font-weight: 550;
                    }
                    width: 70%;
                }
                &::after {
                    content: "";
                    display: block;
                    height: 0;
                    clear: both;
                }
            }
            .other {
                margin-bottom: 20px;
                p {
                    margin: 10px 0;

                }
            }
            .control {
                height: 32px;
                span {
                    cursor: pointer;
                    i {
                        font-size: 12px;
                        font-weight: 550;
                        margin-right: 6px;
                        vertical-align: middle;
                        color: #333c48;
                    }
                    font-size: 14px;
                    color: #7f8fa4;
                }
            }
            .add-operating {
                .add-box {
                    text-align: center;
                    width: 220px;
                    height: 80px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    box-shadow: 4px 7px 13px 0px rgba(6, 0, 1, 0.05);
                    border-radius: 6px;
                    border: dashed 1px #e6eaee;
                    line-height: 80px;
                    cursor: pointer;
                    span {
                        color: #7f8fa4;
                        margin: 0 4px;
                    }
                }
            }
        }
        .text-blue {
            color: #18a5d6;
        }
    }
</style>

