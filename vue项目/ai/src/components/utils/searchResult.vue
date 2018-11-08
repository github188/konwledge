<template>
    <div style="height:100%;position:relative;">
        <el-row class="tool-box" v-show="totalNum>0&&SearchResultOpt.check">
            <el-checkbox v-model="allCheck" @change="handleCheckAllChange">全选</el-checkbox>
        </el-row>
        <el-row class="item-wrap">
            <el-checkbox-group v-model="checkedItems" @change="handleCheckedChange">
                <el-col class="items" :span="5" v-for="(item,index) in searchData" :key="item.code"
                        :offset="index%4==0?0:1">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <el-checkbox :key="item.code" :label="item.code" class="item-checkbox" v-show="SearchResultOpt.check"></el-checkbox>
                        <span class="wait-check" v-show="SearchResultOpt.waitCheck">
                            <span class="wait-check-left"></span>
                            <span class="wait-check-word">待初审</span>
                        </span>
                        <div class="image-wrap">
                            <img :src="item.imageUrl|imageUrl">
                        </div>
                        <div class="bottom-part">
                            <p class="attr-item" v-show="SearchResultOpt.carNum">号牌号码:<b class="car-card">{{item.srcCarPlateNumber}}</b><span class="realize"  v-show="SearchResultOpt.carNum2">二次识别:<b class="car-card">{{item.carPlateNumber}}</b></span></p>
                            <p class="attr-item" v-show="SearchResultOpt.illegalBehavior">违法行为：{{item.illegalCode}}</p>
                            <p class="attr-item" v-show="SearchResultOpt.checkResult">审核结果：{{item.checkType}}</p>
                            <p class="attr-item" v-show="SearchResultOpt.carType">车辆款型：{{item.carStyle}}</p>
                            <p class="attr-item" v-show="SearchResultOpt.carColor">车辆颜色：{{item.carColorCode}}</p>
                            <p class="attr-item" v-show="SearchResultOpt.passTime">过车时间：{{timeFormat(item.snapshotTime,'dateTime')}}</p>
                            <p class="attr-item" v-show="SearchResultOpt.passPlace">通行点位：{{item.deviceId}}</p>
                            <p  @click="moreInfo(item)" class="more-info" v-show="SearchResultOpt.moreInfo">...</p>
                        </div>
                    </el-card>
                </el-col>
            </el-checkbox-group>
        </el-row>
        <el-row v-show="totalNum>0" class="pagenation">
            <!-- <el-pagination background layout="prev, pager, next, total, jumper" :total="totalNum"
                           @current-change="handlePageChange">
            </el-pagination> -->
            <div class="pagination-box">
                <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :pager-count="5" :total="totalNum" layout="prev, pager, next, total, jumper" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        props: ['searchData', 'totalNum', 'SearchResultOpt'],
        data() {
            return {
                pageSize: 24,
                currentPage: 1,
                allCheck: false,
                checkedItems: [] //所有勾选的Id集合
            };
        },
        watch: {
            searchData(newVal) {
                let flag = true;

                newVal.map(i => {
                    flag = this.checkedItems.includes(i.faceId);
                });
                this.allCheck = flag;
            }
        },
        filters: {
            imageUrl(val) {
                if (!val) {
                    return;
                }
                val = val.toString();
                // return 'http://' + location.host + '/client/get_face.php?faceId=' + val;
                return val;
            }
        },
        methods: {
            timeFormat(val, type) {
                return this.tools.timeFormat(val, type);
            },
            handlePageChange(currentPage) {
                this.$emit('getCurrentPage', currentPage);
            },
            handleCheckAllChange(val) {
                if (val) {
                    this.searchData.map(i => {
                        if (!this.checkedItems.includes(i.code)) {
                            this.checkedItems.push(i.code);
                        }
                    });
                } else {
                    this.searchData.map(i => {
                        let idx = this.checkedItems.indexOf(i.code);

                        this.checkedItems.splice(idx, 1);
                    });
                }
            },
            handleCheckedChange(value) {
                let checkedCount = value.length;

                this.allCheck = checkedCount === this.searchData.length;
            },
            moreInfo(row) {
                //第一个参数名为调用的方法名，第二个参数为需要传递的参数
                this.$emit('moreInfo',row);
            }
        }
    };
</script>
<style lang="less">
    .item-wrap {
        height: 100%;
        overflow: auto;
        .items{
            margin-top: 20px;
            position: relative;
            font-size: 12px;
            .image-wrap {
                width: 100%;
                height: 140px;
                img {
                object-fit: cover;
                width: 100%;
                height: 100%;
                }
            }
            .bottom-part{
                height: 195px;
                box-sizing: border-box;
                .realize{
                    margin-left: 5px;
                }
                .car-card{
                    display: inline-block;
                    width: 66px;
                    height: 18px;
                    line-height: 18px;
                    background-color: #74c5f0;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: normal;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: text-bottom;
                }
            }
            .attr-item {
                font-size: 12px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 25px;
            }
            .more-info{
                float: right;
                height: 15px;
                line-height: 0;
                cursor: pointer;
                font-size: 20px;
                font-weight: 600;
                margin-right: 5px;
            }
            .item-checkbox {
                position: absolute;
                margin-left: 10px;
                margin-top: 5px;
            }
            .el-checkbox__label {
                display: none;
            }
            .wait-check{
                position: absolute;
                top: 14px;
                right: 0;
                .wait-check-left{
                    content: " ";
                    color: transparent;
                    display: inline-block;
                    width: 0;
                    border-top: 10px solid #ff9f22;
                    border-bottom: 8px solid #ff9f22;
                    border-right: 3px solid #ff9f22;
                    border-left: 6px solid transparent;
                    vertical-align: top;
                };
                .wait-check-word{
                    display: inline-block;
                    width: 60px;
                    height: 16px;
                    line-height: 16px;
                    background-color: #ff9f22;
                    border: solid 1px #ff9305;
                    border-left: 0;
                    text-align: center;
                    color: #fff;
                    font-size: 12px;
                }
            }
        }
        .items:nth-child(1),.items:nth-child(2),.items:nth-child(3),.items:nth-child(4){
            margin-top: 0;
        }
        .items:hover{
            // cursor: pointer;
            box-shadow: 2px 2px 5px rgba(0, 101, 239, 0.14);
        }
    }
    .pagenation {
        // position: absolute;
        // bottom: 10%;
        // left: 50%;
        // transform: translateX(-50%);
    }

    .tool-box {
        margin-bottom: 20px;
    }
</style>
