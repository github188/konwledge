<template>
    <div class="operate-log">
        <!-- 头部信息 -->
        <div class="m-top-info">
            <el-row class="page-title m-main-box">
                <el-col :span="4">
                    <i class="iconfont icon-illegal-access fz-20"></i>
                    <span>违法行为接入配置</span>
                </el-col>
                <el-col :span="10">
                    <el-form :inline="true">
                        <el-form-item label="厂商">
                            <selectCom :info="vendorArr"></selectCom>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="10" class="align-right">
                    <i class="el-icon-circle-plus m-g-color fz-30 v-a-m pointer" @click="addConfig()"></i>
                </el-col>
            </el-row>
        </div>
        <!-- 列表区域 -->
        <div class="table-layout">
            <div class="m-main-box">
                <tablebase
                    :tableData="tableData"
                    :loading="loading"
                    :tableKey="tableKey"
                    :hasSelection="true"
                    :hasNumber="true"
                    :event="tableEvent"
                >
                </tablebase>
            </div>
        </div>
        <!-- 弹框 -->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal = "false"
            center
            >
            <formbase ref="formParam" style="width:80%; margin:0 auto;" labelWidth="120px" :rules="rules" :formData="formParam" :formGroups="formGroups"></formbase>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="submitForm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import selectCom from '../components/utils/selectCom';
import tablebase from '../components/common/tablebase/tablebase';
import formbase from '../components/common/formbase/formbase';
export default {
    components: {
        selectCom,
        tablebase,
        formbase
    },
    data() {
        return {
            vendorArr: [
                {
                    code: '1',
                    name: '深瞐'
                }
            ],
            param: {
                vendor: ''
            },
            tableData: [],
            tableKey: [
                {
                    key: 'manufacturerCode',
                    name: '厂商编码'
                },
                {
                    key: 'manufacturerName',
                    name: '厂商名称'
                },
                {
                    key: 'srcIllegalCode',
                    name: '厂商违法编码'
                },
                {
                    key: 'illageName',
                    name: '违法名称'
                },
                {
                    key: 'sysIllegalCode',
                    name: '深瞐违法编码'
                },
                {
                    key: 'id',
                    name: '操作',
                    operations: [
                        {
                            type: '',
                            label: '修改',
                            func: this.btnUpdate
                        },
                        {
                            type: 'danger',
                            label: '删除',
                            func: this.btnDelete
                        }
                    ]
                }
            ],
            tableEvent: {
                select: function (selection , row) {
                    console.log(selection , row);
                }
            },
            formParam: {
                manufacturerCode: '',
                srcIllegalCode: '',
                illegalName: '',
                sysIllegalCode: null
            },
            formGroups: [
                {
                    key: 'manufacturerCode',
                    label: '厂商编码',
                    selection: true,
                    options: [
                        {
                            code: 'DH',
                            name: '大华'
                        }
                    ]
                },
                {
                    key: 'srcIllegalCode',
                    label: '厂商违法编码',
                    input: true
                },
                {
                    key: 'illegalName',
                    label: '厂商违法名称',
                    input: true
                },
                {
                    key: 'sysIllegalCode',
                    label: '深瞐违法编码',
                    selection: true,
                    options: [
                        {
                            code: 0,
                            name: '闯红灯'
                        }
                    ]
                }

            ],
            rules: {
                manufacturerCode: [
                    { required: true, message: '请选择厂商', trigger: 'change' }
                ],
                srcIllegalCode: [
                     { required: true, message: '请输入厂商违法编码', trigger: 'blur' }
                ],
                illegalName: [
                    { required: true, message: '请输入厂商违法名称', trigger: 'blur' }
                ],
                sysIllegalCode: [
                    { required: true, message: '请选择深瞐违法编码', trigger: 'change' }
                ]
            },
            dialogVisible: false,
            dialogTitle: '违法行为配置',
            loading: false
        };
    },
    mounted() {
            this._initTableData();
    },
    methods: {
        _initTableData() {
            this.loading = true;
            setTimeout(() => {
                this.tableData = [
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' },
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , srcIllegalCode: '45' , sysIllegalCode: '01' , illageName: '不按车道行驶' }
                ];
                this.loading = false;
            },1000);
        },
        btnUpdate(row , index ) {
            console.log(row , index);
            this.dialogVisible = true;
        },
        btnDelete(row , index ) {
            console.log(row , index);
            this.tools.confirm('确定删除此违法对象关系', '删除' , { type: ''} )
            .then( ()=> {
                console.log(11);
            })
            .catch( ()=>{
                console.log(222);
            });
        },
        addConfig() {
            this.dialogVisible = true;
        },
        submitForm() {
            if (this.$refs['formParam']) {
                this.$refs['formParam'].formValidate.validate((valid) => {
                    if (valid) {
                        console.log(valid);
                    }
                });
            }
        }
    }
};
</script>

<style lang="less">
.table-layout {
    padding: 40px 0 0 0;
    .m-main-box {
        text-align: center;
        .el-table th {
            text-align: center;
        }
    }
}

</style>


