<template>
    <div class="illegal-wrap2">
        <el-col :span="5" class="left-part">
            <el-row class="search-condition">
                <el-row class="sc-title">
                    <el-col :span="12" class="st-left">
                        <span @click="isDataShow=false">
                            违法复核
                            <span v-show="!isDataShow">＞＞</span>
                            <span v-show="isDataShow"> ＜＜</span>
                        </span>
                    </el-col>
                    <el-col :span="12" class="st-right">
                        <el-tooltip class="item" effect="dark" content="重置" placement="top">
                            <i v-show="!isDataShow" class="el-icon-refresh" @click="reset()"></i>
                        </el-tooltip>
                        <el-button v-show="isDataShow" size="mini" class="batch-passed" @click="reviewPass('mutiple')">批量通过</el-button>
                    </el-col>
                </el-row>
                <SearchCondition @getSearchData="getSearchData" v-show="!isDataShow" ref="seaCon" :dataStatusInfo="dataStatusInfo" />
            </el-row>
            <el-row class="search-result" v-show="isDataShow">
                <el-checkbox :indeterminate="isIndeterminate" v-model="allCheck" @change="handleallCheckChange" class="check-all">全选</el-checkbox>
                <div class="sr-items">
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
                                    {{i.carplateNum}}
                                </el-row>
                                <el-row class="si-info">
                                    {{i.illegalAction}}
                                </el-row>
                                <el-row class="si-info">
                                    {{i.place}}
                                </el-row>
                                <el-row class="si-info">
                                    {{i.time}}
                                </el-row>
                                <div class="si-status">
                                    {{i.status}}
                                </div>
                            </el-col>
                        </span>
                    </el-card>
                </div>
                <el-pagination small layout="prev,pager,next" :total="120" class="pagenation">
                </el-pagination>
            </el-row>
        </el-col>
        <el-col :span="19" style="padding:20px;" class="right-part" v-show="currentData">
            <el-row style="width:100%;height:60%;">

                <SwiperImg ref="swiperImg" :imgList="imgList" />
            </el-row>
            <el-row class="rp-bottom">
                <el-col :span="1" class="rb-title2">数据信息</el-col>
                <el-col :span="22" class="rb-info" :offset="1">
                    <el-row>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">车辆号牌:</el-col>
                            <el-col :span="6">
                                <el-select v-model="currentData.a" size="small" placeholder=" ">
                                    <el-option v-for="item in licensePlateAbbrev" :key="item.name" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="9">
                                <el-input size="small" v-model="currentData.a2"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">号牌种类:</el-col>
                            <el-col :span="15">
                                <el-select v-model="currentData.b" size="small">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">车辆颜色:</el-col>
                            <el-col :span="15">
                                <el-select v-model="currentData.b" size="small">
                                    <el-option v-for="item in colorInfo" :key="item.code" :label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-col>

                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">特种车辆:</el-col>
                            <el-col :span="15">
                                <el-select v-model="currentData.b" size="small">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>

                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">违法编号:</el-col>
                            <el-col :span="15">{{currentData.illegalCode}}</el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">违法行为:</el-col>
                            <el-col :span="15">{{currentData.illegalBehavior}}</el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">违法分类:</el-col>
                            <el-col :span="15">
                                <el-select v-model="currentData.b" size="small">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">红灯时间:</el-col>
                            <el-col :span="15">
                                <el-select v-model="currentData.b" size="small">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">违法时间:</el-col>
                            <el-col :span="15">
                                {{currentData.illegalTime}}
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">违法地点:</el-col>
                            <el-col :span="15">
                                {{currentData.illegalPlace}}
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">车速:</el-col>
                            <el-col :span="15">
                                {{currentData.speed}}
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">限速:</el-col>
                            <el-col :span="15">
                                {{currentData.speedLimit}}
                            </el-col>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">车辆品牌:</el-col>
                            <el-col :span="15">
                                {{currentData.vehicleBrands}}
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">车辆类型:</el-col>
                            <el-col :span="15">
                                {{currentData.vehicleKind}}
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">使用性质:</el-col>
                            <el-col :span="15">
                                {{currentData.useProperty}}
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="8" class="rp-info">道路类型:</el-col>
                            <el-col :span="15">
                                {{currentData.roadType}}
                            </el-col>
                        </el-col>
                    </el-row>
                    <el-row style="border-bottom:1px dashed #F3F5F8">
                        <el-col :span=" 6 ">
                            <el-col :span="8 " class="rp-info ">管辖区县:</el-col>
                            <el-col :span="15 ">
                                {{currentData.controlArea}}
                            </el-col>
                        </el-col>
                        <el-col :span="6 ">
                            <el-col :span="8 " class="rp-info ">车主姓名:</el-col>
                            <el-col :span="15 ">
                                {{currentData.ownerName}}
                            </el-col>
                        </el-col>
                        <el-col :span="6 ">
                            <el-col :span="8 " class="rp-info ">载重量:</el-col>
                            <el-col :span="15 ">
                                {{currentData.weight}}
                            </el-col>
                        </el-col>
                        <el-col :span="6 ">
                            <el-col :span="8 " class="rp-info ">录入时间:</el-col>
                            <el-col :span="15 ">
                                {{currentData.createTime}}
                            </el-col>
                        </el-col>
                    </el-row>
                    <el-row class="buttons">
                        <el-button @click="reviewPass('single')">审核通过</el-button>
                        <el-button @click="isMistake = true">误报</el-button>
                        <el-button>套牌</el-button>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>

        <el-col :span="19" v-show="!currentData" class="empty-wrap">
            <img src="@/assets/empty.png" alt="empty">
        </el-col>

        <el-dialog title="误报" :visible.sync="isMistake">
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
                <el-button type="primary" @click="isMistake = false">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import SearchCondition from '@/components/searchCondition';
import SwiperImg from '@/components/swiperImg';
import { colorInfo, carplateColorInfo } from '@/common/dataCustom.js';


export default {
    components: {
        SearchCondition,
        SwiperImg
    },
    data() {
        return {
            colorInfo,
            carplateColorInfo,
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
            imgList: [
                'http://h1.ioliu.cn/bing/CalidrisCanutus_EN-AU8947402764_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/BlackBrowed_EN-AU10938591456_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/RoundBales_EN-AU8640987726_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/ManedWolf_EN-AU10289320790_1920x1080.jpg',
                'http://h1.ioliu.cn/bing/HighlandTige_EN-AU12082780452_1920x1080.jpg'
            ],
            dataStatusInfo: [
                {
                    name: '初审正片',
                    code: 3
                },
                {
                    name: '初审废片',
                    code: 4
                },
                {
                    name: '初审套牌',
                    code: 5
                }
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
            licensePlateAbbrev: [
                {
                    name: '京'

                },
                {
                    name: '津'

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


        getSearchData(data) {
            this.searchData = data;
            this.currentData = data[0];
            setTimeout(() => {
                this.$refs.swiperImg.initSwiper();
            }, 300);

            this.isDataShow = data.length !== 0;
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
            console.log(this.currentData);
        },
        reset() {
            this.$refs.seaCon.reset();
        },
        reviewPass(type) {
            this.searchData = type === 'mutiple' ? this.searchData.filter(i => !this.checkedItems.includes(i.id)) : this.searchData.filter(i => i.id !== this.currentData.id);
            this.checkedItems = [];
            this.currentData = this.searchData[0];
            this.itemActiveIndex = 0;

            console.log(this.currentData);
            console.log(this.searchData);
        }
    }
};
</script>

<style lang="less" >
.illegal-wrap2 {
  width: 1440px;
  height: 100%;
  margin: auto;

  .left-part {
    background-color: #fff;
    height: 100%;
    padding: 20px 20px 10px;
    .search-condition {
      .sc-title {
        line-height: 30px;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        font-family: "微软雅黑";
        .st-left {
          cursor: pointer;
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
    height: calc(100% - 80px);
    .check-all {
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

    .check-all {
      margin-bottom: 10px;
    }
    .sr-items {
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
        line-height: 25px;
        font-size: 18px;
      }
      .si-info {
        color: #8493a7;
        font-size: 13px;
        line-height: 20px;
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
        line-height: 19px;
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
          margin-left: -8px;
          margin-top: -3px;
        }
      }
      .el-checkbox__label {
        display: none;
      }
      .el-checkbox-group {
        position: absolute;
        right: 0;
        bottom: -2px;
      }
      .el-card {
        padding: 15px;
        .el-card__body {
          padding: 0;
        }
      }
      .sr-item {
        position: relative;
        background-color: #fff;
        margin-bottom: 10px;
        .el-checkbox__inner {
          //   width: 0;
          //   height: 0;
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
          //   width: 0;
          //   height: 0;
          border-top: 10px solid transparent;
          border-right: 10px solid #18a5d6;
          border-bottom: 10px solid #18a5d6;
          border-left: 10px solid transparent;
          &::after {
            content: none;
          }
        }
      }
      .item-actived {
        border: 1px solid #18a5d6;
        background-color: #f3fafd;
      }
    }
  }
  .right-part {
    height: 100%;
    #swiper {
      width: 100%;
      height: 100%;
      .swiper-slide {
        background: #fff;
        img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }
      .swiper-button-prev {
        width: 40px;
        height: 40px;
        background-image: url("../assets/up.png");
        background-size: 100%;
      }
      .swiper-button-next {
        width: 40px;
        height: 40px;
        background-image: url("../assets/down.png");
        background-size: 100%;
      }
    }
    .tab-tool {
      height: 100%;
      display: flex;
      flex-direction: column;
      list-style: none;
      justify-content: space-between;
      li {
        width: 100%;
        height: 19%;
        border: 2px solid transparent;
        border-radius: 2px;
        box-sizing: border-box;

        img {
          height: 100%;
          width: 100%;
        }
      }
      .img-actived {
        border: 2px solid #18a5d6;
      }
    }
    .rp-bottom {
      background-color: #fff;
      height: 40%;
      .rb-title2 {
        writing-mode: vertical-lr;
        letter-spacing: 5px;
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
          color: #8191a5;
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
  .el-row {
    margin-bottom: 20px;
  }
}
.el-dialog {
  width: 400px;
}
</style>
