<template>
    <div class="feature-configure">
        <div class="configure-label">本车道违法涉及：<span>1.闯红灯</span><span>2.变道</span><span>3.压线</span><span>4.占道</span>
            <span class="fr copy" @click="copyDeviceInfo">
                        <i class="el-icon-tickets"></i>复制到其他设备</span>
        </div>
        <ul class="config-ul-box">
            <li v-for="item in dCopy.configOptions" :key="item.id">
                <span class="label">{{item.label}}</span>
                <span @click="configureDelete(label.id)" class="delete">删除</span>
            </li>
            <li>
                <el-select v-model="dCopy.roadway" placeholder="请选择违法行为" size="small" class="d-copy-select">
                    <el-option
                            v-for="item in dCopy.roadwayOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button size="small" class="save-btn">保存</el-button>
            </li>
        </ul>

        <!--<el-table-->
                <!--:data="configList"-->
                <!--stripe-->
                <!--height="144"-->
                <!--:show-header="false"-->
                <!--style="width: 100%">-->
            <!--<el-table-column-->
                    <!--prop="type"-->
                    <!--label="类型"-->
                    <!--width="450">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--label="操作"-->
            <!--&gt;-->
                <!--<template slot-scope="scope">-->
                    <!--<span class="operation-text" @click="configureDelete(scope.row)">删除</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</el-table>-->
        <!--<div class="configure-add" @click="configAdd">-->
            <!--<i class="el-icon-plus"></i><span>新增</span>-->
        <!--</div>-->

        <!--<v-dialog ref="config" title="功能配置" d-type="confirm" @confirm="configConfirm">-->
            <!--<div class="config-content">-->
                <!--<el-select v-model="config.value" placeholder="请选择违法行为">-->
                    <!--<el-option-->
                            <!--v-for="item in config.options"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</div>-->
        <!--</v-dialog>-->

    </div>
</template>

<script>
    export default {
        name: 'FeatureConfig',
        props: {
            configList: {type: Array, require: true},
            channelCode: {require: true}
        },
        data() {
            return {
                config: {
                    value: '',
                    options: [{
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }]
                },
                dCopy: {
                    roadway: '1',
                    configOptions: [
                        {label: '1.压线', id: '1'},
                        {label: '2.变道', id: '2'},
                        {label: '3.闯红灯', id: '3'},
                        {label: '4.不按导向形式', id: '4'},
                        {label: '5.不礼让行人', id: '5'}
                    ],
                    roadwayOptions: [
                        {value: '1', label: '1车道', url: 'http://h1.ioliu.cn/bing/CalidrisCanutus_EN-AU8947402764_1920x1080.jpg'},
                        {value: '2', label: '2车道', url: 'http://h1.ioliu.cn/bing/BlackBrowed_EN-AU10938591456_1920x1080.jpg'},
                        {value: '3', label: '3车道', url: 'http://h1.ioliu.cn/bing/RoundBales_EN-AU8640987726_1920x1080.jpg'},
                        {value: '4', label: '4车道', url: 'http://h1.ioliu.cn/bing/HighlandTige_EN-AU12082780452_1920x1080.jpg'}
                    ]
                }
            };
        },
        methods: {
            copyDeviceInfo() {
                this.$refs.copyDevice.open();
            },
            configureDelete(row) {
                this.$confirm(`即将删除功能${ row.type},是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {});
            },
            configAdd() {
                this.$refs.config.open();
            },
            configConfirm() {
                console.log('configConfirm');
            },
            copyConfirm() {
                this.$refs.copyDevice.loading();
                setTimeout(()=>{
                    this.$refs.copyDevice.closeLoading();
                    this.$refs.copyDevice.close();
                },1000);
                console.log('copyConfirm');
            }
        }
    };
</script>

<style lang="less" scoped>
    .feature-configure {
        text-align: left;
        .config-ul-box{
            overflow: hidden;
            li{
                width:50%;
                height:40px;
                float: left;
                line-height: 40px;
                font-size:16px;
                &:hover{
                    background: #e3f6fb;
                    .label{
                        border-left:4px solid #18a5d6;
                        border-radius: 4px 0 0 4px;
                    }
                }
                .label{
                    display: inline-block;
                    width:318px;
                    height:100%;
                    padding-left:75px;
                    color:#333c48;
                }
                .delete{
                    color:#7f8fa4;
                    font-size:12px;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .d-copy-select{
                    margin-left:68px;
                    margin-right:22px;
                }
                .save-btn{
                    background: #18a5d6;
                    color:#fff;
                }
            }
            li:nth-of-type(4n+1 ){
                background: #f9f9f9;
            }
            li:nth-of-type(4n+3){
                background: #fff;
            }
            li:nth-of-type(4n+2){
                background: #fff;
            }
            li:nth-of-type(4n+4){
                background: #f9f9f9;
            }
        }
        .el-table{
            margin-bottom: 8px;
        }
        .configure-label {
            height: 32px;
            line-height: 32px;
            color: #7f8fa4;
            text-indent: 25px;
            font-size: 12px;
            overflow: hidden;
            .copy{
                &:hover{
                    cursor: pointer;
                    color:#18a5d6;
                }
            }
            i{
                margin:0 5px;
            }
            span{
                margin:0 6px;
            }
        }
        .operation-text {
            color: #7f8fa4;
            margin: 0 5px;
            &:hover {
                cursor: pointer;
            }
        }
        .configure-add {
            height: 44px;
            border: 2px dashed #e6eaee;
            line-height: 40px;
            color: #333c48;
            font-size: 14px;
            text-align: center;
            font-weight: bold;
            background: #fff;
            &:hover {
                cursor: pointer;
                background: #f9f9f9;
            }
            i {
                margin-right: 5px;
            }
        }
    }

    .config-content{
        padding:26px;
    }

    .copy-device-content{
        padding: 32px 40px;
        .detail-box{
            display: inline-block;
            width:600px;
            border: 1px solid #e6eaee;
            .detail-box-title{
                padding:0 18px;
                font-size:14px;
                line-height:32px;
                color:#060e1e;
                border-radius: 2px;
                span{
                    margin-right:24px;
                }
                span:last-child{
                    margin-right:0;
                }
            }
            .dialog-img{
                text-align: center;
                img{
                    height:316px;
                    vertical-align: middle;
                }
            }
        }
        .detail-box-left{
            margin-right:6px;
        }
        .device-top-wrapper{
            margin-bottom:10px;
        }
        .device-bottom-wrapper{
            margin-bottom:40px;
            .config-box-left{
                margin-right:6px;
            }
            .config-box{
                display: inline-block;
                vertical-align: top;
                width:600px;
                border: 1px solid #e6eaee;
                .config-box-title{
                    line-height:40px;
                    font-size:14px;
                    color:#7f8fa4;
                    padding-left:25px;
                    background: #f5f8fa;
                    border-bottom:1px solid #e6eaee;
                    i{
                        margin:0 2px;
                        color:#18a5d6;
                    }
                    .el-select{
                        width:230px;
                        margin-left:100px;
                    }
                }
                .config-box-title.c{
                    color:#333c48
                }
                .li{
                    line-height:40px;
                    font-size:14px;
                    height:40px;
                    text-indent: 120px;
                    color:#333c48;
                }
                .li:nth-of-type(odd){
                    background: #f9f9f9;
                }
                .li:nth-of-type(even){
                    background: #fff;
                }
                .li.c{
                    color:#7f8fa4;
                }

            }
        }
    }
</style>
