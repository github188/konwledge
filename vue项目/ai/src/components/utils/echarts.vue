<template>
    <span>
        <div :id=id style="width:100%; height:100%;"></div>
    </span>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件

require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

// const todayStart = new Date().getTime() - (new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000);

export default {
    components: {},
    props: {
        chartsType: '',
        chartsData: '',
        option: '',
        id: ''
    },
    data() {
        return {};
    },
    watch: {
        chartsData() {
            switch (this.chartsType) {
                case 'pie':
                    this.drawPie(this.id, this.chartsData, this.option);
                    break;
                case 'bar':
                    this.drawBar(this.id, this.chartsData, this.option);
                    break;
                case 'line':
                    this.drawLine(this.id, this.chartsData, this.option);
                    break;
                default:
                    this.drawPie(this.id, this.chartsData, this.option);
                    break;
            }
        }
    },
    mounted() { },
    methods: {
        getCharts() {
            return echarts.getInstanceByDom(document.getElementById(this.id));
        },
        drawPie(id, chartsData, option) {
            // 基于准备好的dom，初始化echarts实例
            let mychart = echarts.init(document.getElementById(id));
            // 绘制图表

            mychart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    icon: 'circle',
                    // type: 'scroll',
                    orient: 'vertical',
                    right: 0,
                    top: 100
                    // bottom: 20,
                    // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['30%', '50%'],
                        // center: ['60%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'outside',
                                formatter: '{b} {d}%'
                            },
                            emphasis: {
                                show: true,
                                fontSize: 6,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                },
                                position: 'center',
                                formatter: '{b} {d}%'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: chartsData
                    }
                ]
            });
            if (option) {
                mychart.setOption(option);
            }
        },
        drawBar(id, chartsData, option) {
            // 基于准备好的dom，初始化echarts实例
            let mychart = echarts.init(document.getElementById(id));
            // 绘制图表

            mychart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    icon: 'square'
                },
                grid: {
                    left: 100
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: chartsData
            });
            if (option) {
                mychart.setOption(option);
            }
        },
        drawLine(id, chartsData, option) {
            // 基于准备好的dom，初始化echarts实例
            let mychart = echarts.init(document.getElementById(id));
            // 绘制图表

            mychart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value'
                },
                series: chartsData
            });
            if (option) {
                mychart.setOption(option);
            }
        }
    }
};
</script>


<style lang="less">
.left-part,
.right-part {
  height: 100%;
}
.left-part {
  .sea-item {
    margin-bottom: 20px;
  }
}
.right-part {
  padding: 0 20px;
  height: 100%;

  .bottom-part {
    padding: 10px;
    text-align: left;
    line-height: 25px;
    font-size: 14px;
  }
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
</style>

