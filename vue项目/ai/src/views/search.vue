<template>
    <el-row class="search-body">
        <div class="center-view height-fix">
            <el-row class="height-fix">
                <el-col :span="5" class="left-part select-bar" style="margin-right: 1px;box-sizing: border-box;width: 20%;">
                    <el-row class="page-sub-title">
                        <el-col :span="12">
                            <span>违法查询>></span>
                        </el-col>
                        <el-col :span="12" style="text-align:right;">
                            <el-tooltip class="item" effect="dark" content="重置" placement="top">
                                <span @click="reset()" style="font-size: 20px; cursor: pointer;">
                                    <img src="@/assets/reset.png" alt="">
                                </span>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :size="labelSize" :inline='true' :show-message="false">
                        <el-form-item label="违法时段" class="width-fix">
                            <el-date-picker v-model="paramCol.startTime" type="datetime" placeholder="开始时间" class="width-fix">
                            </el-date-picker>
                            <el-date-picker style="margin-top: 6px;" class="width-fix" v-model="paramCol.endTime" type="datetime" placeholder="结束时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="违法地点" class="width-fix">
                            <DeviceSelect @getCode="getCode" ref="deviceSelect"/>
                        </el-form-item>
                        <el-form-item label="违法行为" class="width-fix">
                            <el-select v-model="paramCol.illegalCode" placeholder="" @change="changeItem" clearable class="width-fix">
                                <el-option v-for="item in illegalBehaviorInfo" :key="item.code" :label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="违法号牌" class="width-fix">
                            <el-input placeholder="" v-model="paramCol.carPlateNumber" clearable class="width-fix"></el-input>
                        </el-form-item>
                        <el-form-item label="号牌颜色" class="width-fix">
                            <el-select v-model="paramCol.plateColorCode" placeholder="" @change="changeItem" clearable class="width-fix">
                                <el-option v-for="item in sexInfo" :key="item.code" :label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="审核状态" class="width-fix">
                            <el-select v-model="paramCol.checkType" placeholder="" @change="changeItem" clearable class="width-fix">
                                <el-option v-for="item in sexInfo" :key="item.code" :label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上报状态" class="width-fix">
                            <el-select v-model="paramCol.uploadStatus" placeholder="" @change="changeItem" clearable class="width-fix">
                                <el-option v-for="item in sexInfo" :key="item.code" :label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="审核人员" class="width-fix">
                            <el-select v-model="paramCol.checkUser" placeholder="" @change="changeItem" clearable class="width-fix">
                                <el-option v-for="item in sexInfo" :key="item.code" :label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item class="width-fix" style="margin-top:50px;">
                            <el-button class="width-fix" type="primary" @click="search">分析</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="19" class="right-part table-style" v-if="searchData.length !== 0">
                    <el-row style="height:62px;line-height:62px;background:#fff;">
                        <span class="search-result-total">符合条件条件目标 {{totalNum}} 个</span>
                        <div style="float: right;margin-right: 20px;">
                            <span class="icon-btn" style="margin-right:10px;" @click="changeView">
                                <img :src="iconImg">
                            </span>
                            <span class="icon-btn">
                                <img src="@/assets/output.png">
                            </span>
                        </div>
                    </el-row>
                    <el-row class="table-list">
                        <div style="height: 100%;" v-show="isTableStyle">
                            <el-table :data="tableData3" height="100%" stripe :cell-style="rowStyle" size="small" :header-cell-style="rowStyle" style="width: 100%">
                                <el-table-column type="selection" width="40">
                                </el-table-column>
                                <el-table-column type="index" label="序号"></el-table-column>
                                <el-table-column prop="srcCarPlateNumber" align="left" width="88" label="车辆号牌">
                                </el-table-column>
                                <el-table-column prop="carPlateNumber" align="left" width="88" label="二次识别">
                                </el-table-column>
                                <el-table-column prop="plateColorCode" align="center" width="70" label="车牌颜色">
                                </el-table-column>
                                <el-table-column prop="carStyle" align="left" label="车辆款型">
                                </el-table-column>
                                <el-table-column prop="carColorCode" align="left" width="70" label="车辆颜色">
                                </el-table-column>
                                <el-table-column prop="illegalCode" align="left" width="70" label="违法行为">
                                </el-table-column>
                                <el-table-column prop="checkType" align="left" width="70" label="审核状态">
                                </el-table-column>
                                <el-table-column prop="snapshotTime" :formatter="formatterTime" align="left" width="140" sortable label="违法时间">
                                </el-table-column>
                                <el-table-column prop="deviceId" align="left" show-overflow-tooltip label="通行点位">
                                </el-table-column>
                                <el-table-column width="40">
                                    <template slot-scope="scope">
                                        <i class="el-icon-picture" @click="popDetail(scope.$index, scope.row)" style="cursor:pointer;font-size: 16px;"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="pagination-box">
                                <el-pagination :current-page.sync="currentPage2" :page-size="pageSize2" :pager-count="5" :total="total" layout="prev, pager, next, total, jumper" @current-change="handleCurrentChange">
                                </el-pagination>
                            </div>
                        </div>
                        <div style="height: 100%;" v-show="!isTableStyle">
                            <SearchResult :searchData="searchData" :SearchResultOpt="SearchResultOpt" v-on:moreInfo="popDetail" :totalNum="totalNum" @search="search" v-loading="loading" element-loading-text="正在查询..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" />
                        </div>
                    </el-row>


                </el-col>
                <!-- !currentData||!isDataShow -->
                <el-col :span="19" v-else class="empty-wrap" key="empty">
                    <img src="@/assets/empty.png" alt="empty">
                </el-col>
            </el-row>
        </div>
        <el-dialog title="违法信息查看" center width='1100px' :visible.sync="detailVisible">
            <div class="detail-body">
                <div class="line"></div>
                <el-steps class="steps">
                    <el-step v-bind:title="item.title" v-bind:description="item.description" v-for="item in stepsList" :key="item.code"></el-step>
                </el-steps>
                <el-row style="width:90%;height:400px;margin:0 auto;">
                    <SwiperImg ref="swiperImg" :imgList="imgList" />
                </el-row>
                <div class="illegal-bar">
                    <el-row>
                        <el-col class="illegal-title" :span="3">违法号牌</el-col>
                        <el-col class="illegal-content" :span="3">鄂A05V2B</el-col>
                        <el-col class="illegal-title" :span="3">违法行为</el-col>
                        <el-col class="illegal-content" :span="4">闯红灯</el-col>
                        <el-col class="illegal-title" :span="3">车辆款型</el-col>
                        <el-col class="illegal-content" :span="8">JEEP-牧马人-2017</el-col>
                    </el-row>
                    <el-row>
                        <el-col class="illegal-title" :span="3">车辆颜色</el-col>
                        <el-col class="illegal-content" :span="3">黑</el-col>
                        <el-col class="illegal-title" :span="3">违法时间</el-col>
                        <el-col class="illegal-content" :span="4">20180801 12:12:00</el-col>
                        <el-col class="illegal-title" :span="3">违法点位</el-col>
                        <el-col class="illegal-content" :span="8">JEEP-牧马人-2017</el-col>
                    </el-row>
                </div>
            </div>
        </el-dialog>
    </el-row>

</template>
<script>
import SearchResult from '../components/utils/searchResult';
import SwiperImg from '@/components/swiperImg';
import DeviceSelect from '@/components/utils/deviceSelect';
import { illegalPlaceInfo, illegalBehaviorInfo, sexInfo } from '@/common/dataCustom.js';
import iconList from '@/assets/list.png';
import iconCard from '@/assets/card.png';
import cityCars from '@/assets/city_cars.jpg';

const todayStart = new Date().getTime() - (new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000);

export default {
    components: {
        SearchResult,
        SwiperImg,
        DeviceSelect
    },
    data() {
        return {
            sexInfo,
            illegalPlaceInfo,
            illegalBehaviorInfo,
            isTableStyle: true,
            iconImg: iconCard,
            isList: true,
            rowStyle: {
                'font-size': '12px'
            },
            pageSize2: 24,
            currentPage2: 1,
            total: 10,
            tableData3: [
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
            ],
            labelPosition: 'top',
            labelSize: 'small',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            dateRange: [todayStart, todayStart * 1 + 86400000],
            timeRange: [todayStart, todayStart * 1 + 86400000],
            paramCol: {
                illegalCode: '',
                illegalPlace: '',
                deviceId: '',
                checkType: '',
                carPlateNumber: '',
                plateColorCode: '',
                uploadStatus: '',
                checkUser: '',
                libId: '',
                startTime: '',
                endTime: '',
                sortKey: 'createTime',
                sortType: 'desc',
                start: 0,
                rows: 10
            },
            faceLibArr: [],
            searchData: [],
            totalNum: 8,
            loading: false,
            sexCode: '',
            detailVisible: false,
            stepsList: [
                {
                    code: 0,
                    title: '违法抓拍',
                    description: '大华\n20180925 12:09:12'
                },
                {
                    code: 1,
                    title: '违法抓拍',
                    description: '大华\n20180925 12:09:12'
                },
                {
                    code: 2,
                    title: '违法抓拍',
                    description: '大华\n20180925 12:09:12'
                },
                {
                    code: 3,
                    title: '违法抓拍',
                    description: '大华\n20180925 12:09:12'
                },
                {
                    code: 4,
                    title: '违法抓拍',
                    description: '大华\n20180925 12:09:12'
                },
                {
                    code: 5,
                    title: '违法抓拍',
                    description: '大华\n20180925 12:09:12'
                },
                {
                    code: 6,
                    title: '违法抓拍',
                    description: '大华\n20180925 12:09:12'
                }
            ],
            imgList: [
                'http://h1.ioliu.cn/bing/CalidrisCanutus_EN-AU8947402764_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/BlackBrowed_EN-AU10938591456_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/RoundBales_EN-AU8640987726_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/ManedWolf_EN-AU10289320790_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/HighlandTige_EN-AU12082780452_1920x1080.jpg'
            ],
            SearchResultOpt: {
                check: true,
                waitCheck: true,
                moreInfo: true,
                carNum: true,
                carNum2: true,
                illegalBehavior: true,
                carType: true,
                carColor: true,
                checkResult: true,
                passTime: true,
                passPlace: true
            }
        };
    },
    watch: {},
    filters: {},
    mounted() {
        // this.getFaceLib();
    },
    created() {
        this._initTableData();
    },
    methods: {
        async _initTableData() {

        },
        changeView() {
            this.isTableStyle = !this.isTableStyle;
            if (this.isTableStyle) {
                this.iconImg = iconCard;
            } else {
                this.iconImg = iconList;
            }
        },
        handleCurrentChange() {
            this._initTableData();
        },
        formatterTime(row, column, cellValue) {
            return this.tools.timeFormat(cellValue, 'dateTime');
        },
        changeItem() {
            // console.log(row);
        },
        getCode(code, type) {
            this.paramCol[type] = code;
            if (!code) {
                delete this.paramCol[type];
            }
        },
        reset() {
            this.paramCol = {
                illegalCode: '',
                illegalPlace: '',
                deviceId: '',
                checkType: '',
                carPlateNumber: '',
                plateColorCode: '',
                uploadStatus: '',
                checkUser: '',
                libId: '',
                startTime: '',
                endTime: '',
                sortKey: 'createTime',
                sortType: 'desc',
                start: 0,
                rows: 10
            };
            this.$refs.deviceSelect.clear();
        },
        getFaceLib() {
            this._services.getFaceLib({ type: 'get', copy: 1 }).then(
                (res) => {
                    if (parseInt(res.code, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }
                    this.faceLibArr = res.data;
                }
            );
        },
        search(currentPage) {
            // this.loading = true;
            this.paramCol.illegalPlace = this.paramCol.deviceId;
            console.log(this.paramCol);
            this.searchData = [];
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
            this.searchData = this.tableData3;
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
        },
        popDetail(row) {
            console.log(row);
            this.detailVisible = true;
            setTimeout(() => {
                this.$refs.swiperImg.initSwiper();
            }, 300);
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

.search-body {
    background-color: #f6f6f6;
    width: 1440px;
    height: 840px;
    overflow: auto;
    margin: 0 auto;
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
        padding: 30px 30px 0 30px;
    }

    .page-sub-title {
        color: #333c48;
        padding-bottom: 20px;
    }

    .select-bar{
        box-shadow: 2px 2px 2px rgba(6, 0, 1, 0.05);
    }
    .table-style{
        height: 100%;
        background-color: #f2f6f7;
        .search-result-total{
            margin-left: 38%;
            font-size: 14px;
        }
        .icon-btn{
            display: inline-block;
            width: 34px;
            height: 34px;
            line-height: 38px;
            border-radius: 20px;
            text-align: center;
            background-color: #5fb870;
            -webkit-box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.25);
            box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.25);
            border: solid 0px #47ad5a;
            cursor: pointer;
        }
        .table-list{
            padding: 20px 20px 0;
            height: 726px;
            .bottom-part {
                padding: 10px 6px;
                text-align: left;
                line-height: 25px;
                font-size: 14px;
            }
            .items{
                width: 23.1%;
            }
            .items.el-col-offset-1{
                margin-left: 2.5%;
            }
        }
    }
    .empty-wrap{
        text-align: center;
        margin-top: 16%;
    }
    .el-form--label-top .el-form-item__label {
        padding-bottom: 0px;
    }

    .el-form-item--small.el-form-item {
        margin-bottom: 2px;
    }
    // 重置checkbox样式-----start
    .tool-box {
        position: absolute;
        top: -60px;
    }
    // 重置checkbox样式-----end
}
// 重置dialog样式-----start
.el-dialog__body {
    max-height: 640px;
}
.el-dialog--center .el-dialog__body {
    padding: 10px 25px 30px;
}
// 重置dialog样式-----end

.detail-body{
    .line{
        width: 90%;
        height: 2px;
        background: #f0f0f0;
        margin: 0 auto;
    }
    .steps{
        margin-top: 50px;
        margin-left: 5%;
        margin-bottom: 40px;
        width: 94%;
        .el-step__icon.is-text{
            color: #18a5d6;
            border-color: #18a5d6;
        }
        .el-step__title{
            color: #18a5d6;
            font-size: 14px;
            line-height: 38px;
            position: absolute;
            top: -34px;
            left: -10%;
        }
        .el-step__description{
            color: #333c48;
            position: relative;
            top: 15px;
            white-space: pre;
            font-size: 14px;
        }
    }
    #swiper .swiper-slide img{
        object-fit: fill;
    }
    .illegal-bar{
        width: 71.3%;
        margin-left: 5%;
        font-size: 12px;
        .illegal-title{
            height: 40px;
            line-height: 40px;
            background: #f6f6f6;
            text-align: center;
            border:1px solid #e7e8e9;
            border-right: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .illegal-content{
            height: 40px;
            line-height: 40px;
            text-align: center;
            border:1px solid #e7e8e9;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
