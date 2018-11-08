<template>
    <el-row class="illegal-state" style="height:100%;">
        <el-col class="left-part left-view">
            <div class="left-view-top">
                <div style="height: 100%; position: relative;">
                    <div class="left-top-center">
                        <div class="timer-center">~</div>
                    </div>
                    <div class="date-picker1">
                        <el-date-picker v-model="bgtime" size="small" type="datetime" :clearable="false" style="width: 100%;"></el-date-picker>
                    </div>
                    <div class="date-picker2">
                        <el-date-picker v-model="edtime" size="small" type="datetime" :clearable="false" style="width: 100%;"></el-date-picker>
                    </div>
                </div>
            </div>
            <el-row class="left-view-bottom">
                <div class="title-bg-m title-bg-postion1">违法实况</div>
                <div class="bar">
                    <div style="height: 92%; width: 100%;">
                        <vEcharts ref="myLine" :id="'myLine'" chartsType='line' :chartsData='linedata' :option='lineOption' />
                    </div>
                </div>
            </el-row>
        </el-col>
        <el-col class="center-view">
            <el-row class="center-view-top">
                <div class="title-bg-m title-bg-postion2">违法车辆类型</div>
                <el-row class="content">
                    <el-col style="height: 100%; width: 62.5%; background-color: #13273c;position: relative;">
                        <vEcharts ref="myPie" :id="'myPie'" chartsType='pie' :chartsData='piedata' :option='pieOption' />
                        <div class="center-icon1"></div>
                        <div class="center-icon2"></div>
                    </el-col>
                    <el-col style="height: 100%; width: calc(37.5% - 10px); background-color: #13273c;float: right;font-size: 12px;position: relative;">
                        <el-row style="width: 180px; position:absolute;left:calc(50% - 90px);top:calc(50% - 80px);">
                            <el-row style="padding: 6px 0;" v-for="item in datas" :key="item.id">
                                <el-col :span="4" style="padding: 4px;"><div class="point-out" v-bind:style="{ borderColor: item.color}"><div class="point-in" v-bind:style="{backgroundColor: item.color}"></div></div></el-col>
                                <el-col :span="20"><span style="color: #53eeff;">{{item.name + ":"}}</span>{{item.number}}</el-col>
                            </el-row>
                        </el-row>
                    </el-col>
                </el-row>
            </el-row>
            <div style="width:100%;height:50%;">
                <el-row class="content2">
                    <div class="title-bg-m title-bg-postion3">点位预审废片排行</div>
                    <el-row class="table-title">
                        <el-col :span="10">接入量</el-col>
                        <el-col :span="8">预审正片</el-col>
                        <el-col :span="6">预审废片</el-col>
                    </el-row>
                    <el-row>
                        <table class="my-table">
                            <tr>
                                <td class="first"><div class="first-title">1</div></td>
                                <td class="second">朝阳大街东区1号西路东向西</td>
                                <td class="third">1234555</td>
                                <td class="fourth">234555</td>
                                <td class="fifth">1000000</td>
                            </tr>
                            <tr>
                                <td class="first"><div class="first-title">2</div></td>
                                <td class="second">朝阳大街东区1号西路东向西</td>
                                <td class="third">1234555</td>
                                <td class="fourth">234555</td>
                                <td class="fifth">1000000</td>
                            </tr>
                            <tr>
                                <td class="first"><div class="first-title">3</div></td>
                                <td class="second">朝阳大街东区1号西路东向西</td>
                                <td class="third">1234555</td>
                                <td class="fourth">234555</td>
                                <td class="fifth">1000000</td>
                            </tr>
                            <tr>
                                <td class="first"><div class="first-title">4</div></td>
                                <td class="second">朝阳大街东区1号西路东向西</td>
                                <td class="third">1234555</td>
                                <td class="fourth">234555</td>
                                <td class="fifth">1000000</td>
                            </tr>
                            <tr>
                                <td class="first"><div class="first-title">5</div></td>
                                <td class="second">朝阳大街东区1号西路东向西</td>
                                <td class="third">1234555</td>
                                <td class="fourth">234555</td>
                                <td class="fifth">1000000</td>
                            </tr>
                            <tr>
                                <td class="first"><div class="first-title">6</div></td>
                                <td class="second">朝阳大街东区1号西路东向西</td>
                                <td class="third">1234555</td>
                                <td class="fourth">234555</td>
                                <td class="fifth">1000000</td>
                            </tr>
                            <tr>
                                <td class="first"><div class="first-title">7</div></td>
                                <td class="second">朝阳大街东区1号西路东向西</td>
                                <td class="third">1234555</td>
                                <td class="fourth">234555</td>
                                <td class="fifth">1000000</td>
                            </tr>
                        </table>
                    </el-row>
                    <div class="pagination-box">
                        <el-pagination :current-page.sync="currentPage2" :page-size="pageSize2" :pager-count="5" :total="total" layout="prev, pager, next, total, jumper" @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </el-row>
            </div>
        </el-col>
        <el-col style="width: 22%;height: 100%;padding: 0 3% 0 1%;">
            <div style="height:30%; padding-top: 8%;">
                <div class="title-bg-m">违法数据</div>
                <el-row style="background-color: #112135; margin-top: 4px;padding: 4% 0;">
                    <el-col :span="12" style="text-align: center; padding: 0 15px;">
                        <el-row>
                            <img style="vertical-align: -webkit-baseline-middle;" src="@/assets/zhengpian.png">
                        </el-row>
                        <el-row style="font-size: 16px; margin-top: 4px;">正片上报</el-row>
                    </el-col>
                    <el-col :span="12" style="text-align: center; height: 52px; line-height: 52px;">
                        <div style="font-size: 24px;color: #55f0fe;">6528</div>
                    </el-col>
                    <div class="ve-line"></div>
                </el-row>
                <el-row style="background-color: #112135; margin-top: 6px;padding: 4% 0;">
                    <el-col :span="12" style="text-align: center; padding: 0 15px;">
                        <el-row>
                            <img style="vertical-align: -webkit-baseline-middle;" src="@/assets/feipian.png">
                        </el-row>
                        <el-row style="font-size: 16px;margin-top: 4px;">废片上报</el-row>
                    </el-col>
                    <el-col :span="12" style="text-align: center; height: 52px; line-height: 52px;">
                        <div style="font-size: 24px;color: #55f0fe;">6528</div>
                    </el-col>
                    <div class="ve-line"></div>
                </el-row>
            </div>
            <el-row style="height: 60%; background-color: #112135; border-radius: 10px; padding: 10px;">
                <div class="title-bg-t title-bg-t-position">违法数据分类</div>
                <vEcharts ref="myBar1" :id="'myBar1'" chartsType='bar' :chartsData='bardata1' :option='barOption1' />
            </el-row>
        </el-col>

    </el-row>

</template>
<script>
import vEcharts from '../components/utils/echarts';

const todayStart = new Date().getTime() - (new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000);

export default {
    components: {
        vEcharts
    },
    data() {
        return {
            currentPage2: 1,
            pageSize2: 24,
            total: 50,
            bgtime: new Date(),
            edtime: new Date(),
            dateRange: [todayStart, todayStart * 1 + 86400000],
            timeRange: [todayStart, todayStart * 1 + 86400000],
            paramCol: {
                libId: [],
                name: '',
                idNumber: '',
                sortKey: 'createTime',
                sortType: 'desc',
                start: 0,
                rows: 10
            },
            faceLibArr: [],
            searchData: [],
            totalNum: 0,
            loading: false,
            piedata: '',
            pieOption: '',
            linedata: '',
            lineOption: '',
            bardata1: '',
            barOption1: '',
            datas: [
                {id: 1, color: '#fe6c6c', number: 12312, name: '轿车'},
                {id: 2, color: '#27b5e5', number: 32312, name: '小型货车'},
                {id: 3, color: '#52c090', number: 42312, name: '大型货车'},
                {id: 4, color: '#5c9cf4', number: 22312, name: '小型客车'},
                {id: 5, color: '#ffa54d', number: 2312, name: '大型客车'}
            ]
        };
    },
    mounted() {
        this.drawPie();
        this.drawBar();
        const _this = this;

        window.onresize = ()=>{
            setInterval(() => {
                _this.resizeChart();
            }, 100);
        };
        this.getData();
    },
    beforeDestroy() {
        window.onresize = null;
    },
    methods: {


        getData() {
            this._services.illegalCount(
            {
                "startTime":"1537931410000",
                "endTime":"1537931410000"
            }
            ).then(
                (res) => {
                    if (parseInt(res.errorCode, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }
                }
            );
        },
        handleCurrentChange() {

        },
        resizeChart() {
            const line = this.$refs.myLine;

            if (line) {
                line.getCharts().resize();
            }
            const pie = this.$refs.myPie;

            if (pie) {
                pie.getCharts().resize();
            }
            const bar = this.$refs.myBar1;

            if (bar) {
                bar.getCharts().resize();
            }
        },
        drawPie() {
            this.piedata = [
                { value: 335, name: '轿车' },
                { value: 310, name: '小型货车' },
                { value: 234, name: '大型货车' },
                { value: 135, name: '小型客车' },
                { value: 1548, name: '大型客车' }
            ];
            this.pieOption = {
                title: {
                    text: '12343',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        color: 'white',
                        fontSize: 16
                    }
                },
                legend: {
                    show: false
                },
                color: ['#fe6c6c', '#27b5e5', '#52c090', '#5c9cf4', '#ffa54d'],
                series: [
                    {
                        center: ['50%', '50%']
                    }
                ]
            };
        },
        drawBar() {
            this.linedata = [
                {
                    name: '接入量',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '预审量',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ];
            this.lineOption = {
                title: {
                    show: false
                },
                legend: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: {
                    height: '80%',
                    left: '3%',
                    right: '4%'
                },
                xAxis: {
                    data: ['1', '2', '3', '4', '5', '6', '7'],
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    name: '次数',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#203347',
                            width: 2
                        }
                    }
                },
                series: [
                    {
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    {
                        itemStyle: {
                            normal: {
                                color: '#2ec7c9',
                                lineStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    }
                ]
            };
            this.bardata1 = [
                {
                    name: '审核正片',
                    type: 'bar',
                    data: [165, 170, 30, 112, 34]
                },
                {
                    name: '预审正片',
                    type: 'bar',
                    data: [150, 105, 110, 87, 96]
                },
                {
                    name: '接入量',
                    type: 'bar',
                    data: [220, 82, 63, 83, 62]
                }
            ];
            this.barOption1 = {
                legend: {
                    orient: 'horizontal',
                    top: 20,
                    textStyle: {
                        color: '#7e8e9d'
                    }
                },
                grid: {
                    left: 40,
                    top: 80
                },
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: [ '逆行', '不按导向', '压线', '礼让行人', '闯红灯'],
                    axisLabel: {
                        formatter: function (value) {
                            return value.split('').join('\n');
                        },
                        color: '#fffffb',
                        fontSize: 12
                    },
                    axisLine: { show: false },
                    axisTick: { show: false }
                },
                series: [
                    {
                        center: ['30%', '10%'],
                        barWidth: 15, //固定柱子宽度
                        itemStyle: {
                            normal: {
                                color: '#42b8d3',
                                borderColor: '#49cae8',
                                borderWidth: 1,
                                label: {
                                    show: true, //开启显示
                                    position: 'insideRight', //在右侧显示
                                    textStyle: { //数值样式
                                        color: '#fffffb',
                                        fontSize: 12
                                    }
                                }
                            }
                        }
                    },
                    {
                        center: ['30%', '10%'],
                        barWidth: 15,//固定柱子宽度
                        itemStyle: {
                            normal: {
                                color: '#1b5169',
                                borderColor: '#2c7596',
                                borderWidth: 1,
                                label: {
                                    show: true, //开启显示
                                    position: 'insideRight', //在右侧显示
                                    textStyle: { //数值样式
                                        color: '#57ecfa',
                                        fontSize: 12
                                    }
                                }
                            }
                        }
                    },
                    {
                        center: ['30%', '10%'],
                        barWidth: 15,//固定柱子宽度
                        itemStyle: {
                            normal: {
                                color: '#0c1725',
                                borderColor: '#20344d',
                                borderWidth: 1,
                                label: {
                                    show: true, //开启显示
                                    position: 'insideRight', //在右侧显示
                                    textStyle: { //数值样式
                                        color: '#fffffb',
                                        fontSize: 12
                                    }
                                }
                            }
                        }
                    }
                ]
            };
        }
    }
};
</script>


<style lang="less">

.illegal-state {

    min-width: 1440px;
    min-height: 840px;
    width: 100%;
    height: 100%;
    background-image: url(../assets/bg.png);
    background-size: 100% 100%;
    color:#fff;

    .point-out {
        width: 7px;
        height: 7px;
        border: solid 1px #fe6c6c;
        border-radius: 6px;
    }

    .point-in {
        width: 5px;
        height: 5px;
        border-radius: 3px;
        background-color:#fe6c6c;
        margin: 1px;
    }


    .pagination-box .el-pagination {
        padding-top: 10px;
    }

    .date-picker1 {
        position: absolute;
        left: 5%;
        top: 27%;
        width: 192px;
        background-image: url(../assets/time-picker-bg.png);
        background-size: 100% 100%;
    }

    .date-picker2 {
        position: absolute;
        right: 5%;
        bottom: 27%;
        width: 192px;
        background-image: url(../assets/time-picker-bg.png);
        background-size: 100% 100%;
    }

    .left-top-center {
        background-image: url(../assets/keji.png);
        width: 150px;
        height: 150px;
        background-size: 100% 100%;
        position: absolute;
        left: calc(50% - 75px);
        top: calc(50% - 75px);
        .timer-center {
            font-size: 24px;
            color: #53eeff;
            left: calc(50% - 10px);
            top: calc(50% - 10px);
            position: absolute;
            width: 20px;
            height: 20px;
            line-height: 20px;
        }
    }

    .table-title {
        width: 55.5%;
        position: absolute;
        top: 37px;
        right: 5%;
        text-align: center;
        color: #53eeff;
        font-size: 15px;
    }

    .my-table {
        border-collapse: collapse;
        font-size: 13px;
        color: #fcfeff;
        text-align: center;
        width: 100%;

        .first {
            .first-title {
                width: 16px;
                height: 16px;
                border: solid 1px #7e8e9d;
                color: #fcfeff;
                border-radius: 8px;
                text-align: center;
                line-height: 16px;
                font-size: 13px;
                display: inline-block;
            }
            width: 10%;
        }

        .second {
            width: 30%;
            border-bottom: 1px solid #1f5870;
            border-right: 1px solid #1f5870;
        }

        .third {
            width: 25%;
            border-bottom: 1px solid #1f5870;
        }

        .fourth {
            width: 20%;
            border-bottom: 1px solid #1f5870;
        }

        .fifth {
            width: 15%;
            border-bottom: 1px solid #1f5870;
        }

        td {
            height: 34px;
        }
    }

    .title-bg-postion1 {
        position: absolute;
        left: 30px;
        top: -6px;
    }

    .title-bg-postion2 {
        position: absolute;
        left: -8px;
        top: 34px;
    }

    .title-bg-postion3 {
        position: absolute;
        left: -8px;
        top: -3px;
    }

    .title-bg-m {
        color: #fff;
        width: 165px;
        height: 48px;
        line-height: 44px;
        text-align: center;
        background-image: url(../assets/title_bg_m.png);
        background-size: 100% 100%;
    }

    .title-bg-t {
        color: #fff;
        width: 120px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        text-align: center;
        background-image: url(../assets/wfsj_bg.png);
        background-size: 100% 100%;
    }

    .title-bg-t-position {
        position: absolute;
        left: 0px;
        top: -18px;
    }

    .left-view {
        width: 27%;
    }

    .left-view-top {
        height: 32%;
        .el-input__inner {
            border: 0;
            background: none;
            color: white !important;
        }
    }

    .left-view-bottom {
        padding: 0 6px 8px 14px;
        height: 68%;
        .bar {
            height: calc(100% - 92px);
            background-image: url(../assets/ill-outline1.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            padding: 80px 10% 0px 10%;
        }
    }

    .center-view {
        width: 51%;
        height: 100%;
    }

    .center-view-top {
        width: 100%;
        height: 50%;
        padding: 38px 0 0 0;
        .content {
            background-image: url(../assets/ill-outline2.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            height: 96%;
            padding: 70px 4% 20px 2%;
        }
    }

    .content2 {
        height: 89%;
        background-image: url(../assets/ill-outline3.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 74px 5% 0 2%;
    }

    .center-icon1 {
        background-image: url(../assets/deco1.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 53px;
        height: 53px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .center-icon2 {
        background-image: url(../assets/deco2.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 167px;
	    height: 7px;
        position: absolute;
        top: 4px;
        right: 5px;
    }


    .items {
        margin-bottom: 20px;
        .image-wrap {
            width: 100%;
            height: 150px;
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
    }

    .ve-line {
        position: absolute;
        background-color: #54616f;
        width: 2px;
        height: 68px;
        left: 50%;
        top: 3px;
    }

     .ve-line2 {
        position: absolute;
        background-color: #54616f;
        width: 2px;
        height: 142px;
        left: 50%;
        top: 36px;
    }
}

</style>

