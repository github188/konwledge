<template>
<div class="test-result">
    <el-row class="result-body">
        <div class="center-view height-fix">
            <el-row class="height-fix">
                <el-col :span="5" class="left-part select-bar" style="margin-right: 1px;box-sizing: border-box;width: 20%;">
                    <el-row class="page-sub-title">
                        <el-col :span="24" style="font-size:14px;font-weight:550;margin-left:20px;">违法测试001>></el-col>
                    </el-row>
                    <div class="result-bar">
                        <span class="result-img img-task"></span>
                        <el-row class="result-content">
                            <el-col :span="24" class="result-title result-row">分析任务条目</el-col>
                            <el-col :span="24" class="result-num result-row">{{statisticalResults.totalCount}}</el-col>
                            <el-row class="result-row">
                                <el-col :span="8">预审正片</el-col>
                                <el-col :span="8">预审废片</el-col>
                                <el-col :span="8">预审异常</el-col>
                            </el-row>
                            <el-row class="result-row">
                                <el-col :span="8" class="result-num result-title">{{statisticalResults.recogCheck[0][0]}}</el-col>
                                <el-col :span="8" class="result-num num-gray">{{statisticalResults.recogCheck[1][1]}}</el-col>
                                <el-col :span="8" class="result-num num-orange">{{statisticalResults.recogCheck[2][2]}}</el-col>
                            </el-row>
                        </el-row>
                    </div>
                    <div class="result-bar">
                        <span class="result-img img-right"></span>
                        <el-row class="result-content">
                            <el-col :span="24" class="result-title result-row">预审正片审核</el-col>
                            <el-col :span="24" class="result-num result-row">{{this.statisticalResults.normalCheck.correctPercent.toFixed(0) + '%'}}</el-col>
                            <el-row class="result-row">
                                <el-col :span="8">预审量</el-col>
                                <el-col :span="8">正确数</el-col>
                                <el-col :span="8">误报数</el-col>
                            </el-row>
                            <el-row class="result-row">
                                <el-col :span="8" class="result-num num-gray">{{statisticalResults.normalCheck.totalCount}}</el-col>
                                <el-col :span="8" class="result-num result-title">{{statisticalResults.normalCheck.correctCount}}</el-col>
                                <el-col :span="8" class="result-num num-orange">{{statisticalResults.normalCheck.mistakeCount}}</el-col>
                            </el-row>
                        </el-row>
                    </div>
                    <div class="result-bar">
                        <span class="result-img img-useless"></span>
                        <el-row class="result-content">
                            <el-col :span="24" class="result-title result-row">预审废片审核</el-col>
                            <el-col :span="24" class="result-num result-row">{{statisticalResults.errorCheck.correctPercent.toFixed(0) + '%'}}</el-col>
                            <el-row class="result-row">
                                <el-col :span="8">预审量</el-col>
                                <el-col :span="8">正确数</el-col>
                                <el-col :span="8">误报数</el-col>
                            </el-row>
                            <el-row class="result-row">
                                <el-col :span="8" class="result-num num-gray">{{statisticalResults.errorCheck.totalCount}}</el-col>
                                <el-col :span="8" class="result-num result-title">{{statisticalResults.errorCheck.correctCount}}</el-col>
                                <el-col :span="8" class="result-num num-orange">{{statisticalResults.errorCheck.mistakeCount}}</el-col>
                            </el-row>
                        </el-row>
                    </div>
                    <div class="result-bar">
                        <span class="result-img img-illegal"></span>
                        <el-row class="result-content result-list">
                            <div v-for="illegal in statisticalResults.illegalStatistics" :key="illegal.illegalCode">
                                <el-row class="result-row">
                                    <el-col :span="6" class="result-title">{{illegal.illegalCodeName}}</el-col>
                                    <el-col :span="6">预审量</el-col>
                                    <el-col :span="6">审核量</el-col>
                                    <el-col :span="6">正确数</el-col>
                                </el-row>
                                <el-row class="result-row illegal-num-row">
                                    <el-col :span="6" class="result-num">{{illegal.correctPercent.toFixed(0) + '%'}}</el-col>
                                    <el-col :span="6" class="result-num">{{illegal.recogCheckCount}}</el-col>
                                    <el-col :span="6" class="result-num">{{illegal.checkCount}}</el-col>
                                    <el-col :span="6" class="result-num result-title">{{illegal.correctCount}}</el-col>
                                </el-row>
                            </div>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="19" class="right-part table-style">
                    <el-row style="height:62px;line-height:62px;background:#fff;">
                        <span class="search-result-count">
                            <span v-for="(item, index) of tabList" :class="{ 'active': selected==index,'tab-pane':true}" @click="changeView(index)" :key="item.code">{{item.title}}</span>
                        </span>
                        <span class="search-result-total">预审结果: {{illegalData.totalNum}} 个</span>
                        <div style="float: right;margin-right: 20px;">
                            <el-button type="primary" size="small" @click="jumpToCheck">预审结果审核</el-button>
                        </div>
                    </el-row>
                    <el-row class="table-list">
                        <SearchResult :searchData="illegalData.illegalData" :SearchResultOpt="SearchResultOpt" v-on:getCurrentPage="getList" v-on:moreInfo="popDetail" :totalNum="totalNum" @search="search" v-loading="loading" element-loading-text="正在查询..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" />
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </el-row>
</div>
</template>
<script>
import SearchResult from '../components/utils/searchResult';
import cityCars from '@/assets/city_cars.jpg';

export default {
    components: {
        SearchResult
    },
    data() {
        return {
            pageSize2: 24,
            currentPage2: 1,
            total: 0,
            tabList: [{
                code: 0,
                title: '正片'
            }, {
                code: 1,
                title: '废片'
            }, {
                code: 2,
                title: '预审异常'
            }],
            selected: '0',
            paramCol: {
                illegalBehavior: '',
                illegalPlace: '',
                sexCode: '',
                libId: '',
                sortKey: 'createTime',
                sortType: 'desc',
                start: 0,
                rows: 10
            },
            faceLibArr: [],
            illegalData: {},
            totalNum: 8,
            loading: false,
            sexCode: '',
            detailVisible: false,
            statisticalResults: {},
            SearchResultOpt: {
                check: false,
                waitCheck: false,
                moreInfo: false,
                carNum: true,
                carNum2: true,
                illegalBehavior: true,
                carType: true,
                carColor: true,
                checkResult: false,
                passTime: false,
                passPlace: true
            }
        };
    },
    filters: {},
    mounted() {
        this.getStatist();
        this.getList();
    },
    created() {
    },
    methods: {
        jumpToCheck() {
            this.$router.push({
                path: 'perTestCheck',
                name: '预审测试审核',
                params: {
                    key: 'key'
                }
            });
        },
        async _initTableData() {

        },
        changeView(index) {
            this.selected = index;
        },
        changeItem() {
            console.log(this.paramCol);
        },
        getStatist() {
            // this._services.getFaceLib({ type: 'get', copy: 1 }).then(
            //     (res) => {
            //         if (parseInt(res.code, 10) !== 0) {
            //             this.tools.message(res.message, 'error');
            //             return;
            //         }
            //         this.faceLibArr = res.data;
            //     }
            // );
            this.statisticalResults = {
                'taskId': 1,
                'totalCount': 80,
                'recogCheck': [
                    {
                        '0': 100
                    },
                    {
                        '1': 200
                    },
                    {
                        '2': 700
                    }
                ],
                'normalCheck': {
                    'totalCount': 100,
                    'correctCount': 99,
                    'mistakeCount': 1,
                    'correctPercent': 99
                },
                'errorCheck': {
                    'totalCount': 50,
                    'correctCount': 49,
                    'mistakeCount': 1,
                    'correctPercent': 98
                },
                'illegalStatistics': [
                    {
                        'illegalCode': 1,
                        'illegalCodeName': '闯红灯',
                        'recogCheckCount': 123,
                        'checkCount': 100,
                        'correctCount': 90,
                        'correctPercent': 90
                    },
                    {
                        'illegalCode': 2,
                        'illegalCodeName': '压线',
                        'recogCheckCount': 123,
                        'checkCount': 100,
                        'correctCount': 90,
                        'correctPercent': 90
                    },
                    {
                        'illegalCode': 3,
                        'illegalCodeName': '不按导向',
                        'recogCheckCount': 123,
                        'checkCount': 100,
                        'correctCount': 90,
                        'correctPercent': 90
                    },
                    {
                        'illegalCode': 4,
                        'illegalCodeName': '违章停车',
                        'recogCheckCount': 123,
                        'checkCount': 100,
                        'correctCount': 90,
                        'correctPercent': 90
                    },
                    {
                        'illegalCode': 5,
                        'illegalCodeName': '占公交道',
                        'recogCheckCount': 123,
                        'checkCount': 100,
                        'correctCount': 90,
                        'correctPercent': 90
                    }
                ]
            };
        },
        getList(currentPage) {
            // this.loading = true;
            this.illegalData = {};
            if (currentPage) {
                this.paramCol.pages = currentPage;
                this.paramCol.start = (currentPage - 1) * this.paramCol.rows;
            }
            if (this.paramCol.libId.length === 0) {
                let lib = [];

                this.faceLibArr.map(item => {
                    lib.push(item.libId);
                });
                this.paramCol.libId = lib;
            }
            this.illegalData = {
                "taskId": 1,
                "totalCount": 80,
                "illegalData": [{
                    "id": 1,
                    "taskId": 1,
                    "manufacturerCode": "DH",
                    "manufacturerName": "厂商名称",
                    "roadName":"中山八路路口",
                    "srcDeviceCode": "1247415$14$1",
                    "deviceId": "11247415$14$1",
                    "carNum": "鄂A888888",
                    "sysCarNumType": 1,
                    "sysCarNumTypeName": "小汽车",
                    "sysCarNumColor": 1,
                    "sysCarNumColorName": "白色",
                    "carSpeed": 90,
                    "minSpeed": 60,
                    "maxSpeed": 80,
                    "sysCarType": "1",
                    "sysCarTypeName": "车辆类型名称",
                    "sysCarColor": "2",
                    "sysCarColorName": "车辆颜色名称",
                    "sysCarDirect": "2",
                    "sysCarDirectName": "行车方向名称",
                    "sysCarWayCode": 1,
                    "sysCarWayCodeName": "车道号名称",
                    "gbIllegalCode": 1111,
                    "gbIllegalCodeName": "国标违法代码名称",
                    "illegalCode": 1111,
                    "illegalCodeName": "平台违法代码",
                    "snapshotTime": "1490334941000",
                    "combinedPicUrl": "http://127.0.0.1:80/combinedPicUrl.jpg",
                    "combinedPicId": "123456789",
                    "carNumPicUrl": "http://127.0.0.1:80/carNumPic.jpg",
                    "carNumPicId": "123456789",
                    "carImg1Url": "http://127.0.0.1:80/carImg1Url.jpg",
                    "carImg1Id": "123456789",
                    "carImg2Url": "http://127.0.0.1:80/carImg2Url.jpg",
                    "carImg2Id": "123456789",
                    "carImg3Url": "http://127.0.0.1:80/carImg3Url.jpg",
                    "carImg3Id": "123456789",
                    "carImg4Url": "http://127.0.0.1:80/carImg4Url.jpg",
                    "carImg4Id": "123456789",
                    "carImg5Url": "http://127.0.0.1:80/carImg5Url.jpg",
                    "carImg5Id": "123456789",
                    "imageStatus":1,
                    "lableStatus":1,
                    "recogCheckStatus":1,
                    "recogCheckTime":"1487653525112",
                    "checkStatus":3,
                    "checkTime":"1487653625112",
                    "mistakeType":1,
                    "createTime":"1487652525112"
                }]
            };
            this.illegalData.illegalData = [
                {
                    'code': '0',
                    'srcCarPlateNumber': '鄂A12321',
                    'carPlateNumber': '鄂A12321',
                    'plateColorCode': 2,
                    'carStyle': 'JEEP-牧马人-2017',
                    'carColorCode': 2,
                    'illegalCode': 7,
                    'checkType': 2,
                    'snapshotTime': 1537931410000,
                    'deviceId': 111,
                    'address': '石庵鲁与东大街路西口-自东向西',
                    'imageUrl': cityCars
                }, {
                    'code': '1',
                    'srcCarPlateNumber': '鄂A12321',
                    'carPlateNumber': '鄂A12321',
                    'plateColorCode': 2,
                    'carStyle': 'JEEP-牧马人-2017',
                    'carColorCode': 2,
                    'illegalCode': 7,
                    'checkType': 2,
                    'snapshotTime': 1537931410000,
                    'deviceId': 111,
                    'address': '石庵鲁与东大街路西口-自东向西',
                    'imageUrl': cityCars
                }, {
                    'code': '2',
                    'srcCarPlateNumber': '鄂A12321',
                    'carPlateNumber': '鄂A12321',
                    'plateColorCode': 2,
                    'carStyle': 'JEEP-牧马人-2017',
                    'carColorCode': 2,
                    'illegalCode': 7,
                    'checkType': 2,
                    'snapshotTime': 1537931410000,
                    'deviceId': 111,
                    'address': '石庵鲁与东大街路西口-自东向西',
                    'imageUrl': cityCars
                }, {
                    'code': '3',
                    'srcCarPlateNumber': '鄂A12321',
                    'carPlateNumber': '鄂A12321',
                    'plateColorCode': 2,
                    'carStyle': 'JEEP-牧马人-2017',
                    'carColorCode': 2,
                    'illegalCode': 7,
                    'checkType': 2,
                    'snapshotTime': 1537931410000,
                    'deviceId': 111,
                    'address': '石庵鲁与东大街路西口-自东向西',
                    'imageUrl': cityCars
                }, {
                    'code': '4',
                    'srcCarPlateNumber': '鄂A12321',
                    'carPlateNumber': '鄂A12321',
                    'plateColorCode': 2,
                    'carStyle': 'JEEP-牧马人-2017',
                    'carColorCode': 2,
                    'illegalCode': 7,
                    'checkType': 2,
                    'snapshotTime': 1537931410000,
                    'deviceId': 111,
                    'address': '石庵鲁与东大街路西口-自东向西',
                    'imageUrl': cityCars
                }, {
                    'code': '5',
                    'srcCarPlateNumber': '鄂A12321',
                    'carPlateNumber': '鄂A12321',
                    'plateColorCode': 2,
                    'carStyle': 'JEEP-牧马人-2017',
                    'carColorCode': 2,
                    'illegalCode': 7,
                    'checkType': 2,
                    'snapshotTime': 1537931410000,
                    'deviceId': 111,
                    'address': '石庵鲁与东大街路西口-自东向西',
                    'imageUrl': cityCars
                }, {
                    'code': '6',
                    'srcCarPlateNumber': '鄂A12321',
                    'carPlateNumber': '鄂A12321',
                    'plateColorCode': 2,
                    'carStyle': 'JEEP-牧马人-2017',
                    'carColorCode': 2,
                    'illegalCode': 7,
                    'checkType': 2,
                    'snapshotTime': 1537931410000,
                    'deviceId': 111,
                    'address': '石庵鲁与东大街路西口-自东向西',
                    'imageUrl': cityCars
                }, {
                    'code': '7',
                    'srcCarPlateNumber': '鄂A12321',
                    'carPlateNumber': '鄂A12321',
                    'plateColorCode': 2,
                    'carStyle': 'JEEP-牧马人-2017',
                    'carColorCode': 2,
                    'illegalCode': 7,
                    'checkType': 2,
                    'snapshotTime': 1537931410000,
                    'deviceId': 111,
                    'address': '石庵鲁与东大街路西口-自东向西',
                    'imageUrl': cityCars
                }, {
                    'code': '8',
                    'srcCarPlateNumber': '鄂A12321',
                    'carPlateNumber': '鄂A12321',
                    'plateColorCode': 2,
                    'carStyle': 'JEEP-牧马人-2017',
                    'carColorCode': 2,
                    'illegalCode': 7,
                    'checkType': 2,
                    'snapshotTime': 1537931410000,
                    'deviceId': 111,
                    'address': '石庵鲁与东大街路西口-自东向西',
                    'imageUrl': cityCars
                }
            ];
            // this._services.searchFace(
            //     { ...this.paramCol, libId: this.paramCol.libId.toString() }
            // ).then((res) => {
            //     this.loading = false;
            //     if (parseInt(res.code, 10) !== 0) {
            //         this.tools.message(res.message, 'error');
            //         return;
            //     }
            //     if (res.data.length === 0) {
            //         this.tools.message('暂无数据', 'info');
            //         return;
            //     }
            //     this.pagenationShow = true;
            //     this.totalNum = res.totalNum;
            //     this.searchData = res.data;
            // });
        }
    }
};
</script>


<style lang="less">
.clearfix:before,.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.test-result{
    .result-body {
        background-color: #f6f6f6;
        width: 1440px;
        height: 840px;
        overflow: auto;
        margin: 0 auto;
        .search-result-count {
            display: inline-block;
            font-size: 12.8px;
            letter-spacing: 0px;
            color: #6a6a6a;
            position: relative;
            .tab-pane{
                display: inline-block;
                margin-left: 30px;
                margin-right: 30px;
                text-align: center;
                color: #7f8fa4;
                height: 62px;
                box-sizing: border-box;
                cursor: pointer;
            }
            .tab-pane.active{
                color: #1c1f26;
                font-weight: 550;
                border-bottom: 3px solid #1c1f26;
            }
        }
        .search-card{
            margin-left: 2%;
            width: 23.5%;
            margin-top: 10px;
            .time {
                font-size: 13px;
                color: #999;
            }
            .bottom {
                margin-top: 13px;
                line-height: 12px;
            }
            .button {
                padding: 0;
                float: right;
            }
            .image {
                width: 100%;
                display: block;
            }
        }
        .search-card:nth-child(4n+1){
            margin-left: 0;
        }
        .search-card:nth-child(1),.search-card:nth-child(2),.search-card:nth-child(3),.search-card:nth-child(4){
            margin-top: 0;
        }

        .width-fix {
            width: 100% !important;
        }

        .height-fix {
            height: 100%;
        }

        .center-view {
            width: 1440px;
            margin: 0 auto;
            overflow: auto;
            padding: 0;
        }

        .left-part,
        .right-part {
            height: 100%;
        }

        .left-part {
            background-color: white;
            padding: 30px 10px 0 10px;
        }

        .page-sub-title {
            color: #333c48;
            padding-bottom: 20px;
        }

        .select-bar{
            box-shadow: 2px 2px 2px rgba(6, 0, 1, 0.05);
            font-size: 12px;
            .result-bar{
                background-color: #ffffff;
                box-shadow: 5px 8px 13px 0px
                    rgba(6, 0, 1, 0.05);
                border: solid 1px #e6eaee;
                position: relative;
                margin-bottom: 10px;
                .result-img{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 74px;
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    background-image: url(../assets/result_task.png);
                    background-size: 100% 100%;
                }
                .img-right{
                    background-image: url(../assets/result_right.png);
                }
                .img-useless{
                    background-image: url(../assets/result_useless.png);
                }
                .img-illegal{
                    background-image: url(../assets/result_illegal.png);
                }
                .result-content{
                    margin:5px 0px 8px 20px;
                    .result-row{
                        height: 22px;
                        line-height: 22px;
                        color: #7f8fa4;
                    }
                    .illegal-num-row{
                        margin-bottom: 20px;
                    }
                    .result-num{
                        font-size: 16px;
                        color: #1c1f26;
                        font-weight: 550;
                    }
                    .result-title{
                        color: #18a5d6;
                        font-weight: 550;
                    }
                    .num-gray{
                        color: #7f8fa4;
                    }
                    .num-orange{
                        color: #ff9f22;
                    }
                }
                .result-content.result-list{
                    margin-top: 45px;
                    height: 320px;
                    overflow-y: auto;
                }
                .result-content.result-list::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 0;     /*高宽分别对应横竖滚动条的尺寸*/
                }
            }
        }
        .table-style{
            height: 100%;
            background-color: #f2f6f7;
            .search-result-total{
                margin-left: 19%;
                font-size: 14px;
            }
            .table-list{
                padding: 20px 20px 0;
                height: 726px;
                .items{
                    width: 23.1%;
                    .bottom-part {
                        padding: 10px 6px;
                        text-align: left;
                        line-height: 25px;
                        font-size: 14px;
                    }
                }
                .items.el-col-offset-1{
                    margin-left: 2.5%;
                }
            }

        }

        .el-form--label-top .el-form-item__label {
            padding-bottom: 0px;
        }

        .el-form-item--small.el-form-item {
            margin-bottom: 2px;
        }
    }
}
</style>
