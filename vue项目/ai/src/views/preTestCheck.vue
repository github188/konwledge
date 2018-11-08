<template>
    <div class="illegal-wrap3">
        <el-col :span="5" class="left-part">
            <el-row class="search-condition">
                <el-row class="sc-title">
                    <el-col :span="16" class="st-left">
                        <span>
                            测试结果审核
                            <el-badge :is-dot="isDataShow" class="item">
                                <span v-show="!isDataShow">＞＞</span>
                                <span v-show="isDataShow" @click="isDataShow=false" class="back"> ＜＜</span>
                            </el-badge>
                        </span>
                    </el-col>
                    <el-col :span="8" class="st-right">
                        <transition name="slide-fade" mode="out-in">
                            <el-tooltip class="item" effect="dark" content="重置" placement="top" v-if="!isDataShow">
                                <img src="../assets/reset22.png" alt="reset" @click="reset()" style="cursor:pointer;">
                            </el-tooltip>
                                <el-button v-else size="mini" class="batch-passed" @click="reviewPass('mutiple')">批量通过</el-button>
                        </transition>
                    </el-col>
                </el-row>
                <transition name="slide-fade" mode="out-in">
                    <SearchCondition @getConditions="getConditions" v-if="!isDataShow" ref="seaCon" :taskName="'违法测试001'" />
                    <el-row class="search-result" v-else>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="allCheck" @change="handleallCheckChange" class="check-all">全选</el-checkbox>
                        <div class="sr-items">
                            <transition-group name="list">
                                <el-card v-for="(i,idx) in searchData" :key="i.id" class="sr-item" shadow="always" :class="itemActiveIndex===idx?'item-actived':'nothing'">
                                    <span @click="checkItem(i.id,idx)">
                                        <el-checkbox-group v-model="checkedItems" @change="handleCheckedChange">
                                            <el-checkbox :label="i.id" :key="i.id">
                                            </el-checkbox>
                                        </el-checkbox-group>
                                        <el-col :span="6">
                                            <div class="car-wrap">
                                                <img src="@/assets/car.png" alt="car">
                                            </div>
                                        </el-col>
                                        <el-col :span="18">
                                            <el-row class="si-carplate">
                                                {{i.carPlateNumber}}
                                            </el-row>
                                            <el-row class="si-info">
                                                {{i.illegalName}}
                                            </el-row>
                                            <el-row class="si-info">
                                                {{i.deviceId}}
                                            </el-row>
                                            <el-row class="si-info">
                                                {{i.snapshotTime}}
                                            </el-row>
                                            <div class="si-status">
                                                {{i.checkTypeCode}}
                                            </div>
                                        </el-col>
                                    </span>
                                </el-card>
                            </transition-group>
                        </div>
                        <el-pagination small layout="prev,pager,next" :total="120" class="pagenation" @current-change="getSearchResult">
                        </el-pagination>
                    </el-row>
                </transition>
            </el-row>

        </el-col>
        <transition name="slide-fade" mode="out-in">
            <!-- currentData&&isDataShow -->
            <el-col :span="19" style="padding:20px;" class="right-part" v-if="currentData&&isDataShow" key="notEmpty">
                <el-row style="width:100%;height:60%;">
                    <SwiperImg ref="swiperImg" :imgList="imgList" />
                </el-row>
                <el-row class="rp-bottom">
                    <el-col :span="1" class="rb-title2">数据信息</el-col>
                    <el-col :span="22" class="rb-info" :offset="1">
                        <el-row>
                            <el-col :span="6">
                                <!-- 00 -->
                                <el-col :span="6" class="rp-info">车辆号牌:</el-col>
                                <el-col :span="7">
                                    <el-select v-model="currentData.carPlateNumber1" size="small" placeholder=" ">
                                        <el-option v-for="item in licensePlateAbbrev" :key="item.name" :label="item.name" :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="10">
                                    <el-input size="small" v-model="currentData.carPlateNumber2"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col :span="6" class="rp-info">号牌种类:</el-col>
                                <el-col :span="17" class="rp-value">
                                    <el-select v-model="currentData.carPlateType" size="small">
                                        <el-option v-for="item in carPlateTypeArr" :key="item.code" :label="item.name" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col :span="6" class="rp-info">车辆颜色:</el-col>
                                <el-col :span="17" class="rp-value">
                                    <el-select v-model="currentData.carColorCode" size="small">
                                        <el-option v-for="item in colorInfo" :key="item.code" :label="item.name" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-col>

                            </el-col>
                            <el-col :span="6">
                                <!-- 00 -->
                                <el-col :span="6" class="rp-info">特种车辆:</el-col>
                                <el-col :span="17" class="rp-value">
                                    <el-select v-model="currentData.b" size="small">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>

                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-col :span="6" class="rp-info">违法编号:</el-col>
                                <el-col :span="17" class="rp-value">{{currentData.illegalCode}}</el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col :span="6" class="rp-info">违法行为:</el-col>
                                <el-col :span="17" class="rp-value">
                                    <el-select v-model="currentData.illegalCode" size="small">
                                        <el-option v-for="item in illegalBehaviorInfo" :key="item.code" :label="item.name" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <!-- 00 -->

                                <el-col :span="6" class="rp-info">违法分类:</el-col>
                                <el-col :span="17" class="rp-value">
                                    <!-- <el-select v-model="currentData.b" size="small">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select> -->
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <!-- 00 -->
                                <el-col :span="6" class="rp-info">红灯时间:</el-col>
                                <el-col :span="17" class="rp-value">{{currentData.illegalCode}}
                                    <!-- <el-select v-model="currentData.b" size="small">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select> -->
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-col :span="6" class="rp-info">违法时间:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{timeFormat(currentData.snapshotTime,'dateTime')}}
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col :span="6" class="rp-info">违法地点:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.roadName}}
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col :span="6" class="rp-info">车速:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.carSpeed}}
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col :span="6" class="rp-info">限速:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.minSpeed}}~{{currentData.maxSpeed}}
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <!-- 00 -->

                                <el-col :span="6" class="rp-info">车辆品牌:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.vehicleBrands}}
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col :span="6" class="rp-info">车辆类型:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.carKindName}}
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <!-- 00 -->

                                <el-col :span="6" class="rp-info">使用性质:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.useProperty}}
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <!-- 00 -->

                                <el-col :span="6" class="rp-info">道路类型:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.roadType}}
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row style="border-bottom:1px dashed #F3F5F8">
                            <el-col :span=" 6 ">
                                <!-- 00 -->

                                <el-col :span="6" class="rp-info ">管辖区县:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.controlArea}}
                                </el-col>
                            </el-col>
                            <el-col :span="6 ">
                                <!-- 00 -->

                                <el-col :span="6" class="rp-info ">车主姓名:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.ownerName}}
                                </el-col>
                            </el-col>
                            <el-col :span="6 ">
                                <!-- 00 -->

                                <el-col :span="6" class="rp-info ">载重量:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{currentData.weight}}
                                </el-col>
                            </el-col>
                            <el-col :span="6 ">
                                <el-col :span="6" class="rp-info ">录入时间:</el-col>
                                <el-col :span="17" class="rp-value">
                                    {{timeFormat(currentData.createTime,'dateTime')}}
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row class="buttons">
                            <el-button @click="reviewPass('single')">审核通过</el-button>
                            <el-button @click="isMistake = true">误报</el-button>
                            <!-- <el-button>套牌</el-button> -->
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
            <!-- !currentData||!isDataShow -->
            <el-col :span="19" v-else class="empty-wrap" key="empty">
                <img src="@/assets/empty.png" alt="empty">
            </el-col>

        </transition>

        <el-dialog title="误报" :visible.sync="isMistake" width="25%" center>
            <div class="mistake-wrap">
                <el-row>
                    <el-checkbox v-model="checked3" label="1.车牌不清晰" border></el-checkbox>
                    <el-checkbox v-model="checked4" label="" border>2.树叶遮挡&nbsp;&nbsp;&nbsp;</el-checkbox>
                </el-row>
                <el-row>
                    <el-checkbox v-model="checked4" label="" border>3.光线暗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
                    <el-checkbox v-model="checked4" label="4.无违法行为" border></el-checkbox>
                </el-row>
                <el-row>
                    <el-checkbox v-model="checked4" label="" border>5.修路影响&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="isMistake = false" style="background-color:rgb(24, 165, 214)">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import SearchCondition from '@/components/searchCondition';
import SwiperImg from '@/components/swiperImg';
import { colorInfo, carplateColorInfo, illegalBehaviorInfo } from '@/common/dataCustom.js';


export default {
    components: {
        SearchCondition,
        SwiperImg
    },
    data() {
        return {
            colorInfo,
            carplateColorInfo,
            illegalBehaviorInfo,
            dotVisabled: false,
            checked3: false,
            checked4: false,
            isMistake: false,
            isDataShow: false,
            checkedItems: [],
            isIndeterminate: false,
            allCheck: false,
            itemActiveIndex: 0,
            currentData: '',
            searchData: [],
            pageOption: {
                start: 0,
                rows: 24
            },
            imgList: [
                'http://h1.ioliu.cn/bing/CalidrisCanutus_EN-AU8947402764_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/BlackBrowed_EN-AU10938591456_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/RoundBales_EN-AU8640987726_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/ManedWolf_EN-AU10289320790_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/HighlandTige_EN-AU12082780452_1920x1080.jpg'
            ],
            options: [{
                value: '选项1',
                label: '黄'
            }, {
                value: '选项2',
                label: '双'
            }, {
                value: '选项3',
                label: '蚵'
            }, {
                value: '选项4',
                label: '龙'
            }, {
                value: '选项5',
                label: '北'
            }],
            carPlateTypeArr: [
                {
                    name: '小汽车',
                    code: 1
                }
            ],
            licensePlateAbbrev: [
                {
                    name: '京'
                },
                {
                    name: '津'

                },
                {
                    name: '鄂'

                },
                {
                    name: '冀'

                }
            ],
            value: ''
        };
    },
    filters: {
        imageUrl(val) {
            if (!val) {
                return;
            }
            val = val.toString();
            return 'http://' + location.host + '/client/get_image.php?faceId=' + val;
        }
    },
    mounted() {
    },
    methods: {
        handleCheckedChange(value) {
            let checkedCount = value.length;

            this.allCheck = checkedCount === this.searchData.length;
            console.log(value);
        },
        handleallCheckChange(val) {
            console.log(val);
            if (val) {
                this.searchData.map(i => {
                    if (!this.checkedItems.includes(i.id)) {
                        this.checkedItems.push(i.id);
                    }
                });
            } else {
                this.searchData.map(i => {
                    let idx = this.checkedItems.indexOf(i.id);

                    this.checkedItems.splice(idx, 1);
                });
            }
        },


        getConditions(conditions) {


            // this.isDataShow = data.length !== 0;


            let { checkStatus, illegalCode } = conditions;
            let taskId = this.$route.params.taskId;


            this.seaOptions = { taskId, checkStatus, illegalCode };
            this.getSearchResult(1);

        },
        getSearchResult(page) {
            console.log(page);
            this.pageOption.start = (page - 1) * this.pageOption.rows;
            // let params = { ...this.seaOptions, ...this.pageOption };

            // this._services.getCheckResult(params).then(res => {
            //     if (parseInt(res.errorCode, 10) !== 0) {
            //         this.tools.message(res.message, 'error');
            //         return;
            //     }
            //     this.searchData = res.data;
            //     this.currentData = res.data[0];
            //     setTimeout(() => {
            //         this.$refs.swiperImg.initSwiper();
            //     }, 500);

            //     this.isDataShow = res.data.length !== 0;
            // });
            this.searchData = [{
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
            this.searchData.map(item => {
                item.carPlateNumber1 = item.carPlateNumber.substring(0, 1);
                item.carPlateNumber2 = item.carPlateNumber.substring(1, item.carPlateNumber.length - 1);

            });
            this.currentData = this.searchData[0];
            this.isDataShow = this.searchData.length !== 0;
            setTimeout(() => {
                this.$refs.swiperImg.initSwiper();
            }, 500);

        },
        checkItem(id, itemActiveIndex) {
            this.itemActiveIndex = itemActiveIndex;
            // let idx = this.checkedItems.indexOf(id);

            // if (idx === -1) {
            //     this.checkedItems.push(id);
            // } else {
            //     this.checkedItems.splice(idx, 1);
            // }
            // this.allCheck = this.checkedItems.length === this.searchData.length;
            this.currentData = this.searchData.filter(i => i.id === id)[0];
        },
        reset() {
            this.$refs.seaCon.reset();
        },
        reviewPass(type) {
            if (type === 'mutiple' && this.checkedItems.length === 0) {
                this.tools.message('未勾选任何项目');
                return;
            }

            this.searchData = type === 'mutiple' ? this.searchData.filter(i => !this.checkedItems.includes(i.id)) : this.searchData.filter(i => i.id !== this.currentData.id);
            this.checkedItems = [];
            this.allCheck = false;
            this.currentData = this.searchData[0];
            this.itemActiveIndex = 0;
        },
        timeFormat(val, type) {
            return this.tools.timeFormat(val, type);
        }
    }
};
</script>

<style lang="less" scoped>
.illegal-wrap3 {
  width: 1440px;
  height: 100%;
  margin: auto;
  overflow: hidden;
  .left-part {
    background-color: #fff;
    height: 100%;
    padding: 20px 5px 10px 15px;
    overflow-y: scroll;
    .search-condition {
      height: calc(100% - 80px);
      .sc-title {
        line-height: 30px;
        color: #000;
        font-size: 17px;
        font-weight: bold;
        font-family: "微软雅黑";
        .st-left {
          .back {
            cursor: pointer;
          }
        }
        .st-right {
          text-align: right;
          i {
            cursor: pointer;
          }

          .batch-passed:hover {
            background-color: #18a5d6;
            color: #fff;
          }
        }
      }
    }
  }
  .search-result {
    height: 100%;

    .check-all {
      margin-bottom: 10px;
    }
    .sr-items {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .car-wrap {
        width: 45px;
        height: 45px;
        line-height: 30px;
        border-radius: 50%;
        text-align: center;
        background: #18a5d6;
        margin-top: 20px;
        img {
          width: 60%;
          height: 60%;
          margin-top: 7px;
        }
      }
      .si-carplate {
        color: #000;
        line-height: 20px;
        font-size: 16px;
        font-family: "微软雅黑";
      }
      .si-info {
        color: #8493a7;
        font-size: 12px;
        line-height: 18px;
      }
      .si-status {
        width: 75px;
        height: 18px;
        background-color: #ff9f22;
        position: absolute;
        right: 0;
        top: 10px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        line-height: 17px;
        &::before {
          content: " ";
          color: transparent;
          display: inline-block;
          width: 0;
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;
          border-left: 9px solid #fff;
          border-right: 9px solid transparent;
          vertical-align: middle;
          position: absolute;
          left: 0;
        }
      }

      .sr-item {
        position: relative;
        background-color: #fff;
        margin-bottom: 10px;
        display: block;
        transition: 800ms;
      }
      .item-actived {
        border: 1px solid #18a5d6;
        background-color: #f3fafd;
      }
    }
  }
  .right-part {
    height: 100%;

    .rp-bottom {
      background-color: #fff;
      height: 40%;
      .rb-title2 {
        writing-mode: vertical-lr;
        letter-spacing: 12px;
        text-align: center;
        line-height: 50px;
        background-image: url("../assets/illegaltitlebg.png");
        background-size: 100% 100%;
        height: 100%;
        color: #fff;
      }
      .rb-info {
        height: 100%;
        padding-top: 1%;
        > .el-row {
          height: 16%;
        }
        .rp-info {
          font-size: 13px;
          color: #8191a5;
          line-height: 32px;
        }
        .rp-value {
          font-size: 15px;
          color: #000;
          line-height: 32px;
          font-family: "微软雅黑";
        }
        .buttons {
          margin-top: 8px;
          text-align: center;
          .el-button:hover,
          .el-button:focus {
            background-color: #18a5d6;
            color: #fff;
          }
        }
      }
    }
  }
  .empty-wrap {
    width: 79%;
    height: 100%;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.mistake-wrap {
  text-align: center;
  .el-row {
    margin-bottom: 20px;
  }
}
.el-dialog {
  width: 400px;
}
</style>

<style lang="less">
.list-leave-active {
  position: absolute !important;
  width: 85%;
}
.list-enter {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 300ms ease;
}
.slide-fade-leave-active {
  transition: all 300ms ease;
}
.slide-fade-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.search-result {
  .check-all {
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #18a5d6;
    }
    .el-checkbox__inner {
      &::after {
        transition: none;
      }
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      overflow: hidden;
      background-color: transparent;
      &::after {
        border: 21px solid #18a5d6;
        left: -5px;
      }
    }
  }
  .sr-items {
    .el-checkbox__label {
      display: none;
    }
    .el-checkbox-group {
      position: absolute;
      right: 0;
      bottom: -2px;
    }
    .el-card {
      padding: 12px;
      .el-card__body {
        padding: 0;
      }
    }
    .sr-item {
      .el-checkbox__inner {
        border-top: 10px solid transparent;
        border-right: 10px solid #ebeef5;
        border-bottom: 10px solid #ebeef5;
        border-left: 10px solid transparent;
        background: transparent;
        transition: none;
        &::after {
          content: none;
        }
      }
      .el-checkbox__input.is-checked .el-checkbox__inner {
        border-top: 10px solid transparent;
        border-right: 10px solid #18a5d6;
        border-bottom: 10px solid #18a5d6;
        border-left: 10px solid transparent;
        &::after {
          content: none;
        }
      }
    }
  }
}
</style>
