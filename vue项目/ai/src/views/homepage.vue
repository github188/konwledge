<template>
    <div class="bodybg">
        <el-row class="left-side">
            <!-- 左侧 -->
            <el-col class="leftPart left-side-bg">
                <div class="left-title1">
                    <div class="title-bg-s">预审数据详情</div>
                </div>
                <div class="left-content1">
                    <el-row class="time-row">
                        <el-col :span="8" class="leftPart">
                            <div class="daytime">{{day2}}</div>
                            <div class="conut-num">123214</div>
                            <span class="line"></span>
                        </el-col>
                        <el-col :span="8" class="leftPart">
                            <div class="daytime">{{day2}}</div>
                            <div class="conut-num">123214</div>
                            <span class="line"></span>
                        </el-col>
                        <el-col :span="8" class="leftPart">
                            <div class="daytime">{{day2}}</div>
                            <div class="conut-num">123214</div>
                        </el-col>
                    </el-row>
                    <el-row class="time-row left-block2">
                        <el-col :span="8" class="leftPart square">
                            <div class="title">昨日预审正片</div>
                            <div class="conut-num">{{detailData.yesterday.validCount}}</div>
                        </el-col>
                        <el-col :span="8" class="leftPart left-padding">
                            <div class="leftPart square-right">
                                <div class="title">已节省人力</div>
                                <div class="conut-num">{{detailData.today.mansaverCount}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8" class="leftPart square-right">
                            <div class="title">今日预审正片</div>
                            <div class="conut-num">{{detailData.today.validCount}}</div>
                        </el-col>
                    </el-row>
                    <el-row class="time-row left-block3">
                        <el-col :span="8" class="leftPart square">
                            <div class="title">昨日预审废片</div>
                            <div class="conut-num">{{detailData.yesterday.invalidCount}}</div>
                        </el-col>
                        <el-col :span="8" class="leftPart square-right yijieshengrenli">
                            <div class="title">已节省人力</div>
                            <div class="conut-num">{{detailData.yesterday.mansaverCount}}</div>
                        </el-col>
                        <el-col :span="8" class="leftPart left-padding">
                            <div class="leftPart square-right">
                                <div class="title">今日预审废片</div>
                                <div class="conut-num">{{detailData.today.invalidCount}}</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="left-middle">
                    <el-row class="total-row">
                        <el-col class="total-check" :span="11">
                            <img src="@/assets/pan.png" class="pan-img">
                            <div class="subtitle">昨日预审量</div>
                            <div class="conut-num2">123214</div>
                        </el-col>
                        <el-col class="total-check" :offset="2" :span="11">
                            <img src="@/assets/pan.png" class="pan-img">
                            <div class="subtitle">昨日预审量</div>
                            <div class="conut-num2">123214</div>
                        </el-col>
                    </el-row>
                    <canvas-line ref="svgLine1" class="svg-position1"></canvas-line>
                    <canvas-line ref="svgLine2" class="svg-position2"></canvas-line>
                    <el-row class="total-row total-row-margin">
                        <el-col class="total-check illegal-bar" :span="11">
                            <div class="subtitle2">123400</div>
                            <div class="conut-num count-font-12">昨日违法接入</div>
                        </el-col>
                        <el-col class="total-check illegal-bar" :offset="2" :span="11">
                            <div class="subtitle2">132400</div>
                            <div class="conut-num count-font-12">今日违法接入</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="left-bottom">
                    <div class="line-bar">
                        <div class="line-bar-left">
                            <vEcharts ref="myLine" :id="'myLine'" chartsType='line' :chartsData='linedata' :option='lineOption' />
                        </div>
                        <div class="line-bar-right">
                            <el-row class="btn-group">
                                <el-button type="primary" plain>月</el-button>
                                <el-button type="primary" plain>周</el-button>
                                <el-button type="primary" plain>日</el-button>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-col>
            <!-- 中间 -->
            <el-col class="leftPart mid-side-view">
                <el-row class="mid-side-up">
                    <div class="mid-title1">
                        <div class="title-bg-m">AI预审-审核信息展示</div>
                    </div>
                    <el-col :span="16" class="leftPart mid-content">
                        <div class="left-bar bg-blue">
                            <span class="left-top-bg">
                                <img src="@/assets/deco1.png">
                            </span>
                                <span class="right-top-bg">
                                    <img src="@/assets/deco2.png">
                            </span>
                            <el-row class="row-place" v-for="illegal in illegalArray" :key="illegal.name">
                                <el-col :span="4" class="leftPart">{{illegal.name}}</el-col>
                                <el-col :span="9" class="leftPart">
                                    <span class="black-bar">
                                        <span class="light-bar-left"></span>
                                        <span class="light-bar">AI预审</span>
                                        <span class="light-bar-right"></span>
                                        <span class="data-num">528</span>
                                    </span>
                                </el-col>
                                <el-col :span="9" class="leftPart">
                                    <span class="black-bar">
                                        <span class="light-bar-left2"></span>
                                        <span class="light-bar2">人工预审</span>
                                        <span class="light-bar-right2"></span>
                                        <span class="data-num">528</span>
                                    </span>
                                    <span class="black-bar-right"></span>
                                </el-col>
                                <el-col :span="2" class="leftPart illegal-right-num">2</el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="8" class="leftPart mid-right-side">
                        <div class="left-bar bg-blue">
                            <div class="signal">
                                <img src="@/assets/signal.png" alt="">
                            </div>
                            <div class="progress">
                                <el-progress type="circle" :percentage="75.55" :stroke-width="18" color="#4FE0FF"></el-progress>
                                <div class="conut-num">今日核算准确率</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="mid-side-down">
                    <div class="mid-side-down-title">
                        <div class="title-bg-m">今日路面产生违法行为</div>
                    </div>
                    <el-col :span="15" class="down-content">
                        <el-row class="down-content-row">
                            <el-col class="down-content-col">
                                <vEcharts ref="myPie" :id="'myPie1'" chartsType='pie' :chartsData='piedata1' :option='pieOption1' />
                            </el-col>
                            <el-col class="down-content-col2">
                                <el-row class="down-right-position">
                                    <el-row class="down-right-item" v-for="item in datas" :key="item.id">
                                        <el-col :span="4" class="down-right-item-style1"><div class="point-out" v-bind:style="{ borderColor: item.color}"><div class="point-in" v-bind:style="{backgroundColor: item.color}"></div></div></el-col>
                                        <el-col :span="20"><span class="down-right-item-style2">{{item.name + ":"}}</span>{{item.number}}</el-col>
                                    </el-row>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="9" class="pie-position">
                        <div class="pie-content">
                            <div class="pie-title">今日预审信息展示</div>
                            <div class="bar-height">
                                <vEcharts ref="myBar" :id="'myBar'" chartsType='bar' :chartsData='bardata' :option='barOption' />
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <!-- 右侧 -->
            <el-col class="right-part leftPart">
                <el-row class="right-bg-color">
                    <el-col :span="12" class="right-top1">
                        <div class="right-top1-left">今日上线人数</div>
                        <div class="right-top1-right"><span class="first-char">3</span><span>0</span></div>
                    </el-col>
                    <el-col :span="12" class="right-top1">
                        <div class="right-top1-left">当前坐席</div>
                        <div class="right-top1-right"><span class="first-char">2</span><span>0</span></div>
                    </el-col>
                    <div class="ve-line"></div>
                </el-row>
                <el-row class="right-bg-color right-bg-view2">
                    <el-col :span="12" class="right-bg-align-padding">
                        <el-col :span="8">
                            <img src="@/assets/man-t.png">
                        </el-col>
                        <el-col :span="16" class="font12">今日坐席处理违法量</el-col>
                    </el-col>
                    <el-col :span="12" class="text-center">
                        <div class="font22 color-style2">6528</div>
                    </el-col>
                    <div class="ve-line2"></div>
                </el-row>
                <div class="title-bg-m rengong-title-position">人工处理统计</div>
                <el-row>
                    <el-row class="padding-top-bottom8">
                        <el-col :span="12" class="font12 text-center color-style1">预审正片</el-col>
                        <el-col :span="12" class="font12 text-center color-style1">预审废片</el-col>
                    </el-row>
                    <el-row class="right-bg-color">
                        <el-col :span="12" class="text-center padding-top-bottom">
                            <div class="font12">正片/真实违法</div>
                            <div class="font22 color-style2 top-margin10">{{manAudit.vaildIllegalCount}}</div>
                        </el-col>
                        <el-col :span="12" class="text-center padding-top-bottom">
                            <div class="font12">违法</div>
                            <div class="font22 color-style2 top-margin10">{{manAudit.invaildIllegalCount}}</div>
                        </el-col>
                    </el-row>
                    <el-row class="right-bg-color">
                        <el-col :span="12" class="text-center padding-top-bottom">
                            <div class="font12">前端误报/废片</div>
                            <div class="font22 color-style2 top-margin10">{{manAudit.vaildErrorCount}}</div>
                        </el-col>
                        <el-col :span="12" class="text-center padding-top-bottom">
                            <div class="font12">前端误报/废片</div>
                            <div class="font22 color-style2 top-margin10">{{manAudit.invaildErrorCount}}</div>
                        </el-col>
                    </el-row>
                    <div class="ve-line3"></div>
                </el-row>
                <div class="title-bg-m zuoxi-title-position">当前坐席业务</div>
                <el-row>
                    <el-row class="zuoxi-item">
                        <div class="point-view">
                            <div class="point"></div>
                        </div>
                        <el-row class="blue-font zuoxi-view">
                            <el-row class="padding-top-bottom4">
                                <el-col :span="12">坐席人：王一一</el-col>
                                <el-col :span="12">今日审核量：702</el-col>
                            </el-row>
                            <el-row class="padding-top-bottom4">
                                <span>闯红灯：<span class="white-font padding-right">正片量 230</span></span>
                                <span>废片量：<span class="white-font">4</span></span>
                            </el-row>
                            <el-row class="padding-top-bottom4">
                                <span>违法变道：<span class="white-font padding-right">正片量 230</span><span>废片量：<span class="white-font">4</span></span></span>
                            </el-row>
                            <el-row class="padding-top-bottom4">
                                <span>超速：<span class="white-font padding-right">正片量 230</span><span>废片量：<span class="white-font">4</span></span></span>
                            </el-row>
                        </el-row>
                    </el-row>
                </el-row>

            </el-col>
        </el-row>
    </div>
</template>
<script>
import vEcharts from '../components/utils/echarts';
import canvasLine from '../components/utils/canvasLine';

export default {
    components: {
        vEcharts,
        canvasLine
    },
    data() {
        return {
            day: '',
            day1: '',
            day2: '2018-08-02',
            illegalArray: [],
            piedata1: '',
            pieOption1: '',
            piedata2: '',
            pieOption2: '',
            bardata: '',
            barOption: '',
            linedata: '',
            lineOption: '',
            manAudit: {
                vaildIllegalCount: 0, // 预审正片 违法
                vaildErrorCount: 0, // 预审正片 误报
                invaildIllegalCount: 0, // 预审废片 违法
                invaildErrorCount: 0 // 预审废片 误报
            },
            detailData: {
                statistics: [{
                    illegalDate: "20180910",
                    totalCount: 0
                },
                {
                    illegalDate: "20180911",
                    totalCount: 0
                },
                {
                    illegalDate: "20180911",
                    totalCount: 0
                }],
                today: {
                    auditCount: 0,
                    validCount: 0,
                    invalidCount: 0,
                    mansaverCount: 0
                },
                yesterday: {
                    auditCount: 0,
                    validCount: 0,
                    invalidCount: 0,
                    mansaverCount: 0
                }
            },
            datas: [
                {id: 1, color: '#fe6c6c', number: 12312, name: '压线'},
                {id: 2, color: '#27b5e5', number: 32312, name: '礼让行人'},
                {id: 3, color: '#52c090', number: 42312, name: '不按导向行驶'},
                {id: 4, color: '#5c9cf4', number: 22312, name: '闯红灯'},
                {id: 5, color: '#ffa54d', number: 2312, name: '逆行'}
            ]
        };
    },
    mounted() {
        this.getIllegal();
        this.drawPie();
        this.drawBar();
        this.drawLine();

        const _this = this;

        window.onresize = () => {
            setInterval(() => {
                _this.resizeChart();
            }, 100);
        };
        this.getData();
    },
    methods: {
        getData() {
            this._services.detail(
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
                    this.detailData = res.data;
                }
            );

            this._services.audittrend(
            {
                "period": 1
            }
            ).then(
                (res) => {
                    if (parseInt(res.errorCode, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }
                }
            );

            this._services.index(
            {
                "type": "getTodayRoadIllegal",
            }
            ).then(
                (res) => {
                    if (parseInt(res.errorCode, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }
                }
            );

            this._services.index(
            {
                "type":"getTodayAudit"
            }
            ).then(
                (res) => {
                    if (parseInt(res.errorCode, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }
                }
            );

            this._services.index({
                "type":"getTodayAiAudit"
            }).then(
                (res) => {
                    if (parseInt(res.errorCode, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }
                }
            );

            this._services.index({
                "type":"getManAudit"
            }).then(
                (res) => {
                    if (parseInt(res.errorCode, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }

                    this.manAudit = res.data;
                }
            );

            this._services.waiter({
                "startTime":"1537931410000",
                "endTime":"1537931410000"
            }).then(
                (res) => {
                    if (parseInt(res.errorCode, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }
                }
            );


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
            const bar = this.$refs.myBar;

            if (bar) {
                bar.getCharts().resize();
            }
            const svgLine1 = this.$refs.svgLine1;

            if (svgLine1) {
                svgLine1.resizeLine();
            }
            const svgLine2 = this.$refs.svgLine2;

            if (svgLine2) {
                svgLine2.resizeLine();
            }
        },
        getIllegal() {
            this.illegalArray = [
                {
                    name: '压线'
                },
                {
                    name: '礼让行人'
                },
                {
                    name: '不按导向'
                },
                {
                    name: '闯红灯'
                },
                {
                    name: '逆行'
                }
            ];
        },
        drawPie() {
            this.piedata1 = [
                { value: 335, name: '压线' },
                { value: 310, name: '礼让行人' },
                { value: 234, name: '不按导向行驶' },
                { value: 135, name: '闯红灯' },
                { value: 1548, name: '逆行' }
            ];
            this.pieOption1 = {
                title: {
                    text: '12343',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        color: "white",
                        fontSize: 16
                    }
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    right: 20,
                    top: 60,
                    textStyle: {
                        color: '#53eeff',
                        fontSize: 12
                    }
                },
                color: ['#fe6c6c', '#27b5e5', '#52c090', '#5c9cf4', '#ffa54d'],
                series: [
                    {
                        name: '',
                        center: ['50%', '50%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'outside',
                                formatter: '{b} {d}%'
                            },
                            emphasis: {
                                show: true,
                                fontSize: 4,
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'normal'
                                },
                                position: 'center',
                                formatter: '{b} {d}%'
                            }
                        }
                    }
                ]
            };
        },
        drawBar() {
            this.bardata = [
                {
                    name: '正片',
                    type: 'bar',
                    data: [150, 105, 110, 120, 94]
                },
                {
                    name: '废片',
                    type: 'bar',
                    data: [220, 82, 63, 45, 66]
                }
            ];
            this.barOption = {
                legend: {
                    orient: 'horizontal',
                    left: 70,
                    bottom: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#fffffb'
                    }
                },
                grid: {
                    left: 34,
                    top: 20,
                    bottom: 28,
                    show: false
                },
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: ['压线', '礼让行人', '不按导向', '闯红灯', '逆行'],
                    show: true,
                    axisLabel: {
                        fontSize: 12,
                        formatter: function (value) {
                            return value.split('').join('\n');
                        },
                        color: '#fffffb'
                    },
                    axisLine: { show: false },
                    axisTick: { show: false }
                },
                series: [
                    {
                        center: ['30%', '10%'],
                        barWidth: 10, //固定柱子宽度
                        itemStyle: {
                            normal: {
                                color: '#61ffff',
                                barBorderRadius: 25,
                                barBorderColor: 'transparent',
                                label: {
                                    show: true, //开启显示
                                    position: 'right', //在右侧显示
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
                        barWidth: 10,//固定柱子宽度
                        itemStyle: {
                            normal: {
                                color: '#3698b0',
                                barBorderRadius: 25,
                                barBorderColor: 'transparent',
                                label: {
                                    show: true, //开启显示
                                    position: 'right', //在右侧显示
                                    textStyle: { //数值样式
                                        color: '#57ecfa',
                                        fontSize: 12
                                    }
                                }
                            }
                        }
                    }
                ]
            };
        },
        drawLine() {
            this.linedata = [
                {
                    name: '正片',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '废片',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ];
            this.lineOption = {
                title: {
                    show: true,
                    text: '预审正片/废片趋势',
                    bottom: '4%',
                    left: '40%',
                    textStyle: {
                        color: '#4ad3e2',
                        fontWeight: 'normal',
                        fontSize: 14,
                        align: 'center'
                    }
                },
                legend: {
                    left: '54%',
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: {
                    height: '58%',
                    left: '3%',
                    right: '4%'
                },
                xAxis: {
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
                                color: '#b86425',
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
        }
    }
};
</script>


<style lang="less">
@font-face {
  font-family: "digifacewide"; /*字体名称*/
  src: url("../assets/font/digifacewide.ttf"); /*字体源文件*/
}

.el-progress__text {
    color: white !important;
}

</style>
<style lang="less" scoped>
.bodybg {
    min-width: 1440px;
    min-height: 840px;
    width: 100%;
    height: 100%;
    background-image: url(../assets/indexbg.png);
    background-size: 100% 100%;
    color: #fff;
    .leftPart {
        height: 100%;
    }

    .left-side {
        height: 100%;
        padding: 30px 20px 10px 14px;
    }

    .left-side-bg {
        background-image: url(../assets/outline1.png);
        background-size: 100% 100%;
        width: 31.7%;
    }
    .left-title1 {
        width: 100%;
        height: 7%;
        padding-left: 4%;
    }
    .left-content1 {
        width: 100%;
        height: 30%;
        padding-top: 20px;
        box-sizing: border-box;

        .time-row {
            width: 82%;
            height: 33%;
            margin-left: 10%;
            background-color: #13273c;
            .leftPart {
            // width: 33%;
            text-align: center;
            position: relative;
            .daytime {
                font-family: "digifacewide"; /*字体名称,就是上面定义的名称*/
                font-size: 12px;
                color: #fff;
                margin-top: 14px;
            }
            .line {
                display: inline-block;
                width: 2px;
                height: 80%;
                background: #54616f;
                position: absolute;
                right: 0;
                top: 10px;
            }
            }
            .square {
                background-color: #13273c;
            }
            .square-right {
                background-color: #112236;
            }
        }

        .left-block2 {
            background-color: transparent;
            margin-top: 6px;
        }
        .left-block3 {
            background-color:transparent;
            .yijieshengrenli {
                background-color: #13273C;
                margin-top: 6px;
                height: calc(100% - 6px);
            }
        }

        .left-padding {
            padding-left: 6px;
        }

        .conut-num {
            margin-top: 8px;
            color: #4ad3e2;
            font-size: 14px;
        }
    }

    .left-middle {
        width: 100%;
        height: 24%;
        position: relative;
        padding-top: 42px;

        .conut-num2 {
            margin-top: 8px;
            color: #4ad3e2;
            padding-left: 15%;
            font-size: 18px;
        }

        .svg-position1, .svg-position2 {
            position: absolute;
            top: 4px;
            width: 40%;
            height: 61%;
        }

        .svg-position1 {
            left: 9.5%;
        }
        .svg-position2 {
            right: 8.5%;
        }
    }

    .count-font-12 {
        font-size: 12px;
    }
    .bg-blue {
        background: #112135;
    }
    .title {
        color: #fff;
        font-size: 12px;
        padding-top: 15px;
    }
    .title-bg-s {
        position: relative;
        color: #fff;
        width: 166px;
        height: 48px;
        line-height: 44px;
        text-align: center;
        background-image: url(../assets/title_bg_s.png);
        background-size: 100% 100%;
    }
    .title-bg-m {
        position: relative;
        color: #fff;
        width: 212px;
        height: 48px;
        line-height: 44px;
        text-align: center;
        background-image: url(../assets/title_bg_m.png);
        background-size: 100% 100%;
    }
    .pan-img {
        float: left;
        width: 18%;
        position: relative;
        top: 28%;
        left: 14%;
    }
   
    .total-row {
        width: 82%;
        height: 34%;
        margin-left: 10%;
        position: relative;
        .total-check {
            width: 48%;
            height: 100%;
            border-radius: 4px;
            text-align: center;
            box-shadow: 0px 2px 6px #1e576c;
            background-color: #13273c;
            .subtitle,
            .subtitle2 {
                padding-top: 10px;
            }
            .subtitle {
                font-size: 12px;
            }
            .conut-num {
                margin-top: 6px;
            }
        }
        .total-check:nth-child(2) {
            margin-left: 3%;
        }
        .illegal-bar {
            background-image: url(../assets/illegal_bar.png);
            background-size: 100% 100%;
            background-color: transparent;
            box-shadow: none;
        }
    }
    .total-row-margin {
        margin-top: 42px;
    }

    .left-bottom {
        width: 100%;
        height: 30%;
    }
    .line-bar {
        width: 81%;
        height: 100%;
        margin-left: 10%;
        background-color: #13273c;
        .line-bar-left {
            width: 73%;
            height: 100%;
            float: left;
        }
        .line-bar-right {
            width: 20%;
            height: 100%;
            float: left;
        }
        .btn-group {
            position: relative;
            top: 30px;
            left: 5%;
            .el-button--primary {
                margin-left: 10px;
                margin-top: 30px;
                border-color: #20566d;
                background: #17364c;
                color: #fff;
                height: 24px;
                line-height: 0;
            }
            .el-button--primary:focus {
                border-color: #2f88a2;
                background: #215a73;
                color: #52eaee;
                box-shadow: 0px 3px 6px #1e576c;
            }
            .el-button--primary:hover {
                border-color: #2f88a2;
                background: #215a73;
                color: #52eaee;
                box-shadow: 0px 3px 6px #1e576c;
            }
            .el-button--primary.active {
                border-color: #2f88a2;
                background: #215a73;
                color: #52eaee;
                box-shadow: 0px 3px 6px #1e576c;
            }
        }
    }

    .progress {
        position: relative;
        top: 15%;
        text-align: center;
        .conut-num {
            font-size: 16px;
            margin-top: 10%;
        }
        svg > path:first-of-type {
            stroke: #29384a;
        }
    }

    .mid-side-view {
        width: 49.5%;
        padding: 0 8px 0 9px;
        .mid-right-side {
            height: 84%;
            padding: 3% 6% 2% 0;
        }
    }
    .mid-side-up {
        background-image: url(../assets/outline2.png);
        background-size: 100% 100%;
        width: 100%;
        height: 45%;
        .mid-title1 {
            width: 100%; 
            height: 14%; 
            margin-left: -1.5%
        }
        .mid-content {
            height: 84%;
            padding: 3% 2% 2% 3%;
        }
        .left-bar {
            font-size: 12px;
            height: 100%;
            position: relative;
            .right-top-bg {
                position: absolute;
                top: -0.5%;
                right: 4px;
            }
            .row-place {
                height: 15%;
                .illegal-right-num {
                    text-align: right;
                    padding-right: 8px;
                }
                .leftPart:nth-child(1) {
                    text-align: right;
                }
                .black-bar {
                    display: inline-block;
                    width: 82%;
                    height: 16px;
                    background: #0c1725;
                    margin-left: 16px;
                    .light-bar,
                    .light-bar2 {
                        display: inline-block;
                        height: 16px;
                        line-height: 16px;
                        background-color: #42b8d3;
                        text-align: center;
                        vertical-align: top;
                    }
                    .light-bar {
                        width: 38%;
                    }
                    .light-bar2 {
                        width: 44%;
                        background-color: #31859d;
                    }
                    .light-bar-left,
                    .light-bar-left2 {
                        content: " ";
                        color: transparent;
                        display: inline-block;
                        width: 0;
                        border-top: 8px solid transparent;
                        border-bottom: 8px solid transparent;
                        border-right: 8px solid #42b8d3;
                        border-left: 8px solid transparent;
                        vertical-align: top;
                        margin-left: -16px;
                    }
                    .light-bar-left2 {
                        border-right: 8px solid #31859d;
                    }
                    .light-bar-right,
                    .light-bar-right2 {
                        content: " ";
                        color: transparent;
                        display: inline-block;
                        width: 0;
                        border-top: 8px solid transparent;
                        border-bottom: 8px solid #42b8d3;
                        border-left: 6px solid #42b8d3;
                        border-right: 6px solid transparent;
                    }
                    .light-bar-right2 {
                        border-bottom: 8px solid #31859d;
                        border-left: 6px solid #31859d;
                    }
                    .data-num {
                        display: inline-block;
                        width: 46%;
                        text-align: center;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .black-bar-right {
                    content: "";
                    color: transparent;
                    display: inline-block;
                    width: 0;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid #0c1725;
                    border-left: 6px solid #0c1725;
                    border-right: 6px solid transparent;
                    vertical-align: top;
                }
            }
        }
        .signal {
            position: relative;
            left: 8%;
            top: 2%;
        }

    }
    .mid-side-down {
        background-image: url(../assets/outline3.png);
        background-size: 100% 100%;
        width: 100%;
        height: 49%;
        margin-top: 2%;
        .mid-side-down-title {
            width: 50%;
            height: 14%;
            margin-left: -1.5%;
        }

        .down-content {
            height: calc(100% - 58px);
            padding: 8px 16px 28px 26px;
            .down-content-row {
                height: 100%;
                background-color: #13273c;
            }

            .down-content-col {
                height: 100%;
                width: 66%;
            }

            .down-content-col2 {
                height: 100%;
                width: 34%;
                font-size: 12px;
                position:relative
            }
            .down-right-position {
                position: absolute;
                width: 100%;
                top: calc(50% - 80px);
                .down-right-item {
                    padding: 6px 0;
                }
                .down-right-item-style1 {
                    padding: 4px;
                }
                .down-right-item-style2 {
                    color: #53eeff;
                }
            }
        }

        .pie-position {
            height: calc(100% - 32px);
            padding: 0 16px 28px 0;
            margin-top: -26px;
            .pie-content {
                width: 100%;
                height: 100%;
                background-color: #13273c;
            }
            .bar-height {
                height: calc(100% - 30px);
            }
        }
       
        .title-bg-m > span {
            position: absolute;
            top: 0;
            left: 13%;
        }
    }

    .right-part {
        width: 18.5%;
        padding: 0 1% 0 0px;
        .right-bg-color {
            background-color: #112135;

            .right-top1 {
                text-align: center;
                padding: 10px 0px;

                .right-top1-left{
                    font-size: 12px;
                }
                .right-top1-right {
                    font-size: 18px;
                    color: #55f0fe;
                    margin-top: 8px;

                    .first-char {
                        font-size: 24px;
                    }
                }
            }
        }

        .right-bg-view2 {
            margin-top: 4px;
            padding: 10px 0;
            .right-bg-align-padding {
                text-align: center;
                padding: 0 15px;
                img {
                    vertical-align: middle;
                }
            }
        }

        .rengong-title-position {
            width: 165px;
            margin-left: -2.5%;
        }

        .zuoxi-title-position {
            width: 165px;
            margin-left: -2.5%;
        }
    }

    .point-view {
        width: 12px;
        height: 12px;
        float: left;
        border-radius: 8px;
        background-color: #04152a;
        border: solid 1px #2f89a3;
        margin: 6px 0 0 4px;

        .point {
            width: 6px;
            height: 6px;
            background-color: #4ddbff;
            border-radius: 4px;
            margin: 3px;
        }
    }

    .white-font {
        letter-spacing: 0px;
        color: #fffefd;
    }

    .padding-right {
        padding-right: 4px;
    }

    .blue-font {
        letter-spacing: 0px;
        color: #55f5ff;
    }

    .zuoxi-item {
        background-image: url(../assets/zuoxi_bg.png);
        background-size: 100% 100%;
        font-size: 12px;
        background-repeat: no-repeat;
        padding: 6px 0;

        .zuoxi-view {
            padding: 0px 22px;
        }
    }


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

    .ve-line {
        position: absolute;
        background-color: #54616f;
        width: 2px;
        height: 66px;
        left: 50%;
        top: 4px;
    }

    .ve-line2 {
        position: absolute;
        background-color: #54616f;
        width: 2px;
        height: 44px;
        left: 50%;
        top: 4px;
    }

    .ve-line3 {
        position: absolute;
        background-color: #54616f;
        width: 2px;
        height: 142px;
        left: 50%;
        top: 36px;
    }

    .pie-title {
        text-align: center;
        font-size: 15px;
        color: #53eeff;
        padding: 5px 0;
    }

    .font12 {
        font-size: 12px;
    }
    .font22 {
        font-size: 22px;
    }
    .text-center {
        text-align: center;
    }
    .color-style1 {
        color: #4ccedb;
    }
    .color-style2 {
        color: #55f0fe;
    }
    .padding-top-bottom {
        padding: 10px 0;
    }
    .padding-top-bottom4 {
        padding: 4px 0;
    }
    .padding-top-bottom8 {
        padding: 8px 0;
    }
    .top-margin10 {
        margin-top: 10px;
    }
}
</style>

