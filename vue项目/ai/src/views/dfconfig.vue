<template>
    <div class="operate-log">
        <div class="m-top-info">
            <el-row class="page-title m-main-box">
                <el-col :span="4">
                    <i class="iconfont icon-device-maintain fz-20"></i>
                    <span>设备备案维护</span>
                </el-col>
                <el-col :span="4">
                    <el-input  placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button style="margin:0 10px" type="primary">检索</el-button>
                </el-col>
                <el-col :span="12" class="align-right">
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
                <!-- 分页 -->
                <div class="pagination-box">
                <el-pagination :current-page.sync="pageParam.currentPage" :page-size="pageParam.pageSize" :pager-count="5" :total="pageParam.total"
                            layout="prev, pager, next, total, jumper" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
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
            vendorArr: [
                {
                    code: '1',
                    name: '深瞐'
                }
            ],
            param: {
                vendor: ''
            },
            pageParam: {
                currentPage: 0,
                pageSize: 10,
                total: 0
            },
            tableData: [],
            tableKey: [
                {
                    key: 'deviceCode',
                    name: '设备编码'
                },
                {
                    key: 'wfsbbh',
                    name: '备案编号'
                },
                {
                    key: 'illegalArea',
                    name: '违法地行政规划'
                },
                {
                    key: 'illegalLocal',
                    name: '违法地点'
                },
                {
                    key: 'roadCode',
                    name: '路段编号'
                },
                {
                    key: 'localMeter',
                    name: '地点米数'
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
            },
            formParam: {
                deviceCode: '',
                wfsbbh: '',
                illegalArea: '',
                roadCode: '',
                localMeter: ''
            },
            formGroups: [
                {
                    key: 'deviceCode',
                    label: '设备编码',
                    input: true
                },
                {
                    key: 'wfsbbh',
                    label: '设备编号',
                    input: true
                },
                {
                    key: 'illegalArea',
                    label: '违法地行政区划',
                    input: true
                },
                {
                    key: 'illegalLocal',
                    label: '违法地点',
                    input: true
                },
                {
                    key: 'roadCode',
                    label: '道路编码',
                    input: true
                },
                {
                    key: 'localMeter',
                    label: '地点米数',
                    input: true
                }

            ],
            rules: {
                deviceCode: [
                    { required: true, message: '请输入设备编码', trigger: 'blur' }
                ],
                wfsbbh: [
                     { required: true, message: '请输入设备编号', trigger: 'blur' },
                     { pattern: /^[0-9]{18}$/, message: '请输入18位数字' , trigger: ['change' , 'blur'] }
                ],
                illegalArea: [
                    { required: true, message: '请输入违法地行政区划', trigger: 'blur' },
                    { pattern: /^[0-9]{6}$/, message: '请输入6位数字' , trigger: ['change' , 'blur'] }
                ],
                illegalLocal: [
                    { required: true, message: '请输入违法地点', trigger: 'blur' },
                    { pattern: /^[0-9]{5}$/, message: '请输入5位数字' , trigger: ['change' , 'blur'] }
                ],
                roadCode: [
                    { required: true, message: '请输入路段编码', trigger: 'blur' },
                    { pattern: /^[0-9]{4}$/, message: '请输入4位数字' , trigger: ['change' , 'blur'] }
                ],
                localMeter: [
                    { required: true, message: '请输入地点米数', trigger: 'blur' },
                    { pattern: /^[0-9]{3}$/, message: '请输入3位数字' , trigger: ['change' , 'blur'] }
                ]
            },
            dialogTitle: '设备备案维护',
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
                    {id: '1' , deviceCode: '134054561' , wfsbbh: '5415646164' , illegalArea: '345611' , illegalLocal: '57414', roadCode: '341341' , localMeter: '6546167' }
                ];
                this.pageParam.pageSize = 1;
                this.pageParam.total = 20;
                this.pageParam.currentPage = 1;
                this.loading = false;
            },1000);
        },
        handleCurrentChange(v) {
            console.log(v);
        },
        btnUpdate(row , index ) {
            console.log(row , index);
            this.dialogVisible = true;
        },
        btnDelete(row , index ) {
            console.log(row , index);
            this.tools.confirm('确定删除此设备备案对应关系', '删除' , { type: ''} )
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


