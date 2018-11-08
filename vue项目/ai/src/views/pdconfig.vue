<template>
    <div class="operate-log">
        <!-- 头部信息 -->
        <div class="m-top-info">
            <el-row class="page-title m-main-box">
                <el-col :span="4">
                    <i class="iconfont icon-pass-path fz-20"></i>
                    <span>过车方向配置</span>
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
                    key: 'vehicleDirectionCode',
                    name: '过车方向编码'
                },
                {
                    key: 'vehicleDirectionDetail',
                    name: '过车方向描述'
                },
                {
                    key: 'sysVehicleDirectionCode',
                    name: '深瞐过车方向编码'
                },
                {
                    key: 'sysVahicleDirectionDetail',
                    name: '深瞐过车方向描述'
                },
                {
                    key: 'gbVahicleDirectionCode',
                    name: '国标编码'
                },
                {
                    key: 'gbVahicleDirectionDetail',
                    name: '国标方向'
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
                vehicleDirectionCode: [
                     { required: true, message: '请输入过车方向编码', trigger: 'blur' }
                ],
                vehicleDirectionDetail: [
                    { required: true, message: '请输入过车方向描述', trigger: 'blur' }
                ],
                sysVehicleDirectionCode: [
                    { required: true, message: '请选择深瞐过车方向', trigger: 'change' }
                ]
            },
            formParam: {
                manufacturerCode: '',
                vehicleDirectionCode: '',
                vehicleDirectionDetail: '',
                sysVehicleDirectionCode: null
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
                    key: 'vehicleDirectionCode',
                    label: '过车方向编码',
                    input: true
                },
                {
                    key: 'vehicleDirectionDetail',
                    label: '过车方向描述',
                    input: true
                },
                {
                    key: 'sysVehicleDirectionCode',
                    label: '深瞐过车方向',
                    selection: true,
                    options: [
                        {
                            code: 0,
                            name: '自东向西'
                        }
                    ]
                }
            ],
            dialogTitle: '过车方向配置',
            dialogVisible: false,
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
                    {id: '1' , manufacturerCode: 'DH' , manufacturerName: '宇视' , vehicleDirectionCode: '1' , vehicleDirectionDetail: '自东向西' , sysVehicleDirectionCode: '01' , sysVahicleDirectionDetail: '东向西' , gbVahicleDirectionCode: '0212' , gbVahicleDirectionDetail: '东向西' }
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
            this.tools.confirm('确定删除此过车方向对应关系', '删除' , { type: ''} )
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


