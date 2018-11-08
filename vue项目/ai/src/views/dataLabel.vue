<template>
    <div class="data-import">
        <div class="pretrial-top">
            <div class="pretrial-top-content">
                <div class="pretrial-top-left fl">
                    <i class="icon-dwbz- iconfont icon-img"></i>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane :label="`点位标注总数：${totalCount}`" name="all"></el-tab-pane>
                        <el-tab-pane :label="`已标注：${successCount}`" name="success"></el-tab-pane>
                        <el-tab-pane :label="`未标注：${failCount}`" name="fail"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="pretrial-top-right fr">
                    <i class="icon-delete el-icon-download fr pointer"></i>
                    <div class="download-box fr pointer">
                        <i class="el-icon-download" @click="deleteBatch"></i>
                        <span @click="downloadImage">预审分析</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="import-content-wrapper">
            <el-table v-loading="loading" ref="multipleTable" :data="tableData"
                      element-loading-spinner="el-icon-loading"
                      stripe
                      element-loading-background="rgba(255, 255, 255, 0.5)" height="608" tooltip-effect="dark"
                      class="element-reset-table"
                      style="width:100%;border: 1px solid #e6eaee;border-radius: 3px;" @selection-change="handleSelectionChange">
                <el-table-column prop="checked" type="selection" width="40">
                </el-table-column>
                <el-table-column label="序号" width="32">
                    <template slot-scope="scope">
                        {{ scope.$index+1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="manufacturerName" label="厂商" width="40">
                </el-table-column>
                <el-table-column prop="deviceId" label="设备ID" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="deviceCode" label="路口编码" width="56" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="roadName" label="路口名称" width="140" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="carPlateNumber" label="车牌号" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="号牌颜色" width="65" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.carColorCode | carplateColorFilter}}
                    </template>
                </el-table-column>
                <el-table-column label="违法行为" width="65" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.illegalCode | illegalBehaviorFilter}}
                    </template>
                </el-table-column>
                <el-table-column prop="illegalCode" label="厂商违法代码" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="carDirectName" label="过车方向" width="70" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="carWayCode" label="车道号" width="50" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="carImg1Url" label="图片url1" width="110" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="carImg2Url" label="图片url1" width="110" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="carImg3Url" label="图片url1" width="110" show-overflow-tooltip>
                </el-table-column>
                <el-table-column width="30">
                    <template slot-scope="scope">
                        <i v-if="scope.row.status == '1'" class="el-icon-success"></i>
                        <i v-else class="el-icon-refresh"></i>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :pager-count="5" :total="total"
                               layout="prev, pager, next, total, jumper" @current-change="handleCurrentChange">
                </el-pagination>
                <!--<div class="extra-box">-->
                <!--<button class="btn-label pointer" @click="dataSign">数据标注</button>-->
                <!--<button class="btn-download pointer" @click="downloadImage">下载图片</button>-->
                <!--</div>-->
            </div>
        </div>

        <!--历史记录-->
        <v-dialog ref="dialog" d-type="box">
            <el-table v-loading="loading" :data="historyData" element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(255, 255, 255, 0.5)" height="608" tooltip-effect="dark"
                      style="width: 100%">
                <el-table-column label="序号" width="40">
                    <template slot-scope="scope">
                        {{ scope.$index+1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="fileName" label="文件名" width="50">
                </el-table-column>
                <el-table-column prop="uploadTime" label="上传时间" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="downloadFlow" label="下载量" width="56" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="downloadSuccess" label="下载成功" width="140" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="downloadFail" label="下载失败" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="labeled" label="已标注" width="65" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="noLabeled" label="未标注" width="65" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mainCount" label="正片量" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="othersCount" label="废片量" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="状态" width="100" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span class="search-detail">查看详情</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination :current-page.sync="currentPage2" :page-size="pageSize2" :pager-count="5" :total="total"
                               layout="prev, pager, next, total, jumper" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </v-dialog>

        <v-dialog ref="dialogDownload" d-type="box" title="违法图片下载">
            <div class="progress-wrapper">
                <div class="progress-box">
                    <div class="progress-top progress-line">
                        <span>正在下载</span>
                        <span>312/500</span>
                    </div>
                    <el-progress :text-inside="true"
                                 :stroke-width="18"
                                 :percentage="(progress.success+progress.fail)*100/progress.total"
                                 class="progress-line">
                    </el-progress>
                    <p class="progress-line">下载图片：</p>
                    <p class="progress-line">下载总数：{{progress.total}}</p>
                    <p class="progress-line">下载成功：{{progress.success}}</p>
                    <p class="progress-line last-line">下载失败：{{progress.fail}}</p>
                    <p class="progress-confirm-box">
                        <el-button class="progress-confirm" @click="pregressConfirm">确定</el-button>
                    </p>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
    import directory from '../common/dataCustom';

    export default {
        name: 'DataImport',
        data() {
            return {
                taskId: 1, // 任务id
                executorType: 1, // 执行任务类型 : 1图片下载2数据标注；3未标注违法数据导出4违法数据预审分析
                illegalBehaviorInfo: directory.illegalBehaviorInfo, // 违法行为数据字典
                carplateColorInfo: directory.carplateColorInfo,
                input4: '',
                form: {
                    region: ''
                },
                loading: false,
                tableData: [],
                historyData: [],
                multipleSelection: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                currentPage2: 1,
                pageSize2: 10,
                progress: {
                    total: 500,
                    success: 300,
                    fail: 50
                },
                activeName: 'all',
                totalCount: '',
                successCount: '',
                failCount: ''
            };
        },
        created() {
            this._initTableData();
        },
        filters: {
            illegalBehaviorFilter(illegalCode) {
                let res = directory.illegalBehaviorInfo.find(item=>{
                    return item.code === illegalCode;
                });
                if (!res || !res.name) {
                    return '未知违法行为';
                } else {
                    return res.name;
                }
            },
            carplateColorFilter(val) {
                return directory.carplateColorInfo.find(item=>{
                    return item.code * 1 === val * 1;
                }).name;
            }
        },
        methods: {
            handleClick(tab, event) {
                switch (this.activeName) {
                    case 'all' : break;
                    case 'success' : break;
                    case 'fail' : break;
                    default: console.log('代码错误');
                }
                console.log(tab, event);
                this._initTableData();
            },
            async _initTableData() {
                this.loading = true;
                // let res = await this._services.getLabelpageList({taskId: this.taskId, start: (this.currentPage-1) * this.pageSize, rows: this.pageSize});
                // if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                // this.tableData = res.data.illegalData;
                // this.totalCount = res.data.totalCount;
                // this.successCount = res.data.successCount;
                // this.failCount = res.data.failCount;

                setTimeout(() => {
                    this.tableData = [{
                        'id': 1,
                        'taskId': 1,
                        'manufacturerCode': 'DH',
                        'manufacturerName': '厂商名称',
                        'roadName': '中山八路路口',
                        'srcDeviceCode': '1247415$14$1',
                        'deviceId': 1,
                        'deviceCode': '11247415$14$1',
                        'carPlateNumber': '鄂A888888',
                        'carPlateType': 1,
                        'carPlateTypeName': '小汽车',
                        'plateColorCode': 1,
                        'plateColorName': '白色',
                        'carSpeed': 90,
                        'minSpeed': 60,
                        'maxSpeed': 80,
                        'carKindCode': '1',
                        'carKindName': '车辆类型名称',
                        'carColorCode': '2',
                        'carColorName': '车辆颜色名称',
                        'carDirect': '2',
                        'carDirectName': '行车方向名称',
                        'carWayCode': 1,
                        'carWayName': '车道号名称',
                        'illegalCode': 1111,
                        'illegalName': '违法代码名称',
                        'snapshotTime': '1490334941000',
                        'combinedPicUrl': 'http://127.0.0.1:80/combinedPicUrl.jpg',
                        'combinedPicId': '123456789',
                        'carNumPicUrl': 'http://127.0.0.1:80/carNumPic.jpg',
                        'carNumPicId': '123456789',
                        'carImg1Url': 'http://127.0.0.1:80/carImg1Url.jpg',
                        'carImg1Id': '123456789',
                        'carImg2Url': 'http://127.0.0.1:80/carImg2Url.jpg',
                        'carImg2Id': '123456789',
                        'carImg3Url': 'http://127.0.0.1:80/carImg3Url.jpg',
                        'carImg3Id': '123456789',
                        'carImg4Url': 'http://127.0.0.1:80/carImg4Url.jpg',
                        'carImg4Id': '123456789',
                        'carImg5Url': 'http://127.0.0.1:80/carImg5Url.jpg',
                        'carImg5Id': '123456789',
                        'imageStatus': 1,
                        'lableStatus': 1,
                        'recogCheckStatus': 1,
                        'recogCheckTime': '1487653525112',
                        'checkStatus': 3,
                        'checkTime': '1487653625112',
                        'mistakeType': 1,
                        'createTime': '1487652525112'
                    }];
                    this.totalCount = 100;
                    this.successCount = 80;
                    this.failCount = 20;

                    this.historyData = [
                        {
                            fileName: '测试0912',
                            uploadTime: '2018/9/12 19:20',
                            downloadFlow: '500',
                            downloadSuccess: '470',
                            downloadFail: '30',
                            labeled: '400',
                            noLabeled: '70',
                            mainCount: '0',
                            othersCount: '0'
                        }

                    ];
                    this.total = 34;
                    this.loading = false;
                }, 1000);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange() {
                this._initTableData();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            async downloadImage() {
                this.$refs.dialogDownload.open();
                let res = this._services.taskExecutorAdd({taskId: this.taskId, executorType: 4});

                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                let executorId = res.data.executorId;

                this._getExecutorTask(executorId);
            },
            async _getExecutorTask(executorId) {
                let res = await this._services.taskExecutorGet({executorId: executorId});
                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}

                // 执行状态。0执行中，1执行完成，2执行失败
                switch (res.data.status) {
                    case 0 :
                        setTimeout(() => {
                            this._getExecutorTask();
                        },2000);
                        break;
                    case 1 :
                        this.$message.warning(res.message || '执行完成')
                        this.$refs.dialogDownload.close();
                        break;
                    case 2 :
                        this.$message.warning(res.message || '执行失败');
                        break;
                }

            },
            pregressConfirm() {
                this.$refs.dialogDownload.close();
            },
            deleteBatch() {
                console.log(this.multipleSelection);
            }
        }
    };
</script>

<style lang="less" scoped>
    @fontGrayC: #8c9aad;
    .black {
        color: #000;
    }

    .r10 {
        margin-right: 10px;
    }

    .fr {
        float: right;
    }

    .el-icon-success {
        color: #5fb870;
    }

    .el-icon-error {
        color: red;
    }


    .pretrial-top {
        background: #fff;
        text-align: center;
        margin-bottom: 40px;
        border-bottom: 1px solid #dcdfe6;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        overflow: hidden;
        text-align: center;
        .pretrial-top-content{
            display: inline-block;
            text-align: left;
            width:1200px;
            vertical-align: middle
        }
    }

    .data-import {
        box-sizing: border-box;
        min-width: 1440px;
        text-align: center;
        .import-content-wrapper {
            display: inline-block;
            width: 1200px;
            text-align: left;
        }
        .table-top {
            overflow: hidden;
            margin-bottom: 30px;
            .data-upload {
                width: 230px;
                .el-input-group__append {
                    width: 36px;
                }
            }
            .uploadBtn {
                display: inline-block;
                width: 60px;
                height: 30px;
                margin-right: 20px;
                color: #fff;
                line-height: 30px;
                font-size: 14px;
                border-radius: 5px;
                .el-button {
                    background: #18a5d6;
                }
            }
            .history-data {
                color: #18a5d6;
                font-size: 12px;
                &:hover {
                    cursor: pointer;
                }
            }
            .table-top-center {
                display: inline-block;
                color: @fontGrayC;
                font-size: 12px;
            }
            .table-top-right {
                width: 200px;
                float: right;
                .el-select {
                    display: inline-block;
                    width: 110px;
                    margin-right: 30px;
                    vertical-align: middle;
                }
                .icon-box {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    color: #fff;
                    background: #5fb870;
                    border-radius: 50%;
                    line-height: 32px;
                    text-align: center;
                    vertical-align: middle;
                }
            }
        }
        .el-form {
            .el-form-item {
                margin-bottom: 0;
            }
        }
    }

    .pagination-box {
        overflow: hidden;
        height: 50px;
        position: relative;
        button {
            height: 30px;
            width: 80px;
            border: 1px solid #61b4ca;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            float: right;
            margin-top: 20px;
        }
        .btn-download {
            border-color: #61b4ca;
            background: #18a5d6;
            color: #fff;
            margin-right: 35px;
        }
        .btn-label {
            border-color: #d8d9e2;
            color: #333333;
        }
        /*.extra-box {*/
        /*position: absolute;*/
        /*right: 0;*/
        /*top: 0;*/
        /*}*/
    }

    .progress-wrapper {
        width: 670px;
        height: 310px;
        text-align: center;
        .progress-box {
            display: inline-block;
            text-align: left;
            width: 250px;
            font-size: 14px;
            .progress-top {
                overflow: hidden;
            }
            .progress-line {
                margin-bottom: 10px;
            }
            .last-line {
                margin-bottom: 30px;
            }
            .progress-confirm-box {
                text-align: center;
                .progress-confirm {
                    width: 130px;
                }
            }
        }
    }
    .el-icon-refresh{
        color:red;
        font-weight: bold;
    }
</style>
<style lang="less">
    .data-import {
        box-sizing: border-box;
        .table-top {
            .data-upload {
                input {
                    height: 32px;
                }
                .el-input-group__append {
                }
            }
            .el-select {
                .el-input--suffix {
                    line-height: 32px;
                    .el-input__inner {
                        height: 32px;
                        font-size: 12px;
                    }
                    .el-input__icon {
                        line-height: 32px;
                    }
                }
            }
        }
        .search-detail {
            color: #18a5d6;
        }
        .dialog-wrapper {
            .el-table {
                padding: 0 20px;
            }
        }
        .dialog-wrapper .d-body .content {
            max-height: 700px !important;
        }
        .el-form {
            .el-form-item__content {
                line-height: 32px;
            }
        }
        .el-table {
            .cell {
                text-align: center;
                font-size: 12px;
                padding: 0 4px;
            }
            td {
                padding: 10px 0;
            }
        }
        .pretrial-top-left{
            .icon-img{
                padding-top:18px;
                padding-right:22px;
                font-size:32px;
                vertical-align: middle;
                margin-left:-32-22px;
            }
            .el-tabs__header{
                margin-bottom:1px;
            }
            .el-tabs--top{
                display: inline-block;
                padding-top:20px;
                vertical-align: middle;
            }
            .el-tabs__nav-wrap::after{
                content: none;
            }
            .el-tabs__item{
                font-size:14px;
                color:#7f8fa4;
            }
            .el-tabs__item.is-active{
                color:#2b333e;
            }
            .el-tabs__active-bar{
                background: #2b333e;
            }
        }
        .pretrial-top-right{
            padding-top:15px;
            .download-box{
                box-sizing: border-box;
                width:100px;
                height:32px;
                margin-right:30px;
                background: #18a5d6;
                color:#fff;
                font-size:12px;
                line-height: 30px;
                border:1px solid #3da9c5;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
                text-align: center;
                .el-icon-download{
                    font-size:16px;
                }
            }
            .icon-delete{
                box-sizing: border-box;
                width:32px;height:32px;background: #5fb870;
                border:1px solid #47ad5a;
                text-align: center;
                line-height: 30px;font-size:17px;
                border-radius: 50%;
                color:#fff;
            }
        }
        // element hover tr样式修改
        .el-table--enable-row-hover .el-table__body tr:hover>td{
            background-color: #e3f6fb !important;
            &:first-child{
                border-left:4px solid #18a5d6;
                border-radius: 4px 0 0 4px;
            }
        }
        // element hover tr样式修改
        .el-table--striped .el-table__body tr.el-table__row--striped td{
            background: #f9f9f9;
        }
    }
</style>
