<template>
    <div class="operate-log">
        <div class="m-top-info">
            <el-row class="page-title m-main-box">
                <el-col :span="4">
                    <i class="iconfont icon-company-info-config fz-20"></i>
                    <span>厂商信息维护</span>
                </el-col>
                <el-col :span="20" class="align-right">
                    <i class="el-icon-circle-plus m-g-color fz-30 v-a-m pointer" @click="addConfig()"></i>
                </el-col>
            </el-row>
        </div>
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
         <!-- 弹框 -->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal = "false"
            center
            >
            <formbase ref="formParam" style="width:80%; margin:0 auto;" labelWidth="130px" :rules="rules" :formData="formParam" :formGroups="formGroups"></formbase>
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
            param: {
                vendor: ''
            },
            tableData: [],
            tableKey: [
                {
                    key: 'companyCode',
                    name: '厂商编码'
                },
                {
                    key: 'companyName',
                    name: '厂商名称'
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
                companyCode: [
                    { required: true, message: '请输入厂商编码', trigger: 'change' }
                ],
                companyName: [
                     { required: true, message: '请输入厂商名称', trigger: 'blur' }
                ]
            },
            formParam: {
                companyCode: '',
                companyName: ''
            },
            formGroups: [
                {
                    key: 'companyCode',
                    label: '厂商编码',
                   input: true
                },
                {
                    key: 'companyName',
                    label: '厂商名称',
                    input: true
                }
            ],
            dialogTitle: '厂商信息维护',
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
                    {id: '1' , companyCode: 'DH' , companyName: '宇视' }
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
            this.tools.confirm('确定删除此厂商对应关系', '删除' , { type: ''} )
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


