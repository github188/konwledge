<template>
    <div class="operate-log">
        <!-- 头部信息 -->
        <div class="m-top-info">
            <el-row class="page-title m-main-box">
                <el-col :span="4">
                    <i class="iconfont icon-plate-color fz-20"></i>
                    <span>号牌颜色配置</span>
                </el-col>
                <el-col :span="10">
                    <el-form :inline="true">
                        <el-form-item label="厂商">
                            <selectCom :info="vendorArr"></selectCom>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="10" class="align-right">
                    <i class="el-icon-circle-plus m-g-color fz-30 v-a-m pointer"  @click="addConfig()"></i>
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
                    :hasNumber="true"
                    :event="tableEvent"
                >
                </tablebase>
            </div>
        </div>
        <!-- 弹出框 -->
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
                    key: 'plateColorCode',
                    name: '号牌颜色编码'
                },
                {
                    key: 'plateColor',
                    name: '号牌颜色'
                },
                {
                    key: 'sysPlateColorCode',
                    name: '深瞐号牌颜色编码'
                },
                {
                    key: 'sysPlateColor',
                    name: '深瞐号牌颜色描述'
                },
                {
                    key: 'gbPlateColorCode',
                    name: '国标编码'
                },
                {
                    key: 'gbPlateColor',
                    name: '国标颜色'
                },
                {
                    key: 'id',
                    name: '操作',
                    width: '160',
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
            rules: {
                manufacturerCode: [
                    { required: true, message: '请选择厂商', trigger: 'change' }
                ],
                plateColorCode: [
                     { required: true, message: '请输入号牌颜色编码', trigger: 'blur' }
                ],
                plateColor: [
                    { required: true, message: '请输入号牌颜色', trigger: 'blur' }
                ],
                sysPlateColorCode: [
                    { required: true, message: '请选择深瞐号牌颜色', trigger: 'change' }
                ],
                gbPlateColorCode: [
                    { required: true, message: '请选择国标号牌颜色', trigger: 'change' }
                ]
            },
            formParam: {
                manufacturerCode: '',
                plateColorCode: '',
                plateColor: '',
                sysPlateColorCode: null
            },
            formGroups: [
                {
                    key: 'manufacturerCode',
                    label: '厂商',
                    selection: true,
                    options: [
                        {
                            code: 'DH',
                            name: '大华'
                        }
                    ]
                },
                {
                    key: 'plateColorCode',
                    label: '号牌颜色编码',
                    input: true
                },
                {
                    key: 'plateColor',
                    label: '号牌颜色',
                    input: true
                },
                {
                    key: 'sysPlateColorCode',
                    label: '深瞐号牌颜色',
                    selection: true,
                    options: [
                        {
                            code: 0,
                            name: '蓝色'
                        }
                    ]
                },
                {
                    key: 'gbPlateColorCode',
                    label: '深瞐号牌颜色',
                    selection: true,
                    options: [
                        {
                            code: 0,
                            name: '蓝色'
                        }
                    ]
                }
            ],
            dialogTitle: '号牌颜色配置',
            loading: false,
            dialogVisible: false
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
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , plateColorCode: '45' , plateColor: '黄色' , sysPlateColorCode: '01' , sysPlateColor: '蓝牌' , gbPlateColorCode: '000201' , gbPlateColor: '蓝牌' }
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
            this.tools.confirm('确定删除此号牌颜色对应关系', '删除' , { type: ''} )
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


