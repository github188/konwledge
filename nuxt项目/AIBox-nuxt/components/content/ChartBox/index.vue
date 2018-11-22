<template>
  <div class="chart-layer">
    <div class="chart-top">
      <span>{{ $t( 'currentTask.chart.title' ) }}</span>
      <div class="chart-top-right"></div>
    </div>
    <div class="flex-box">
      <div id="chart-bar" ref="chartBar"></div>
    <div class="list-layer">
      <div class="info">
        <ul>
          <li class="xingren">
            <i class="iconfont icon-hangren"></i><span>{{ $t( 'currentTask.chart.passerby' ) }}</span>
            <div>{{ carDataFilter[0].count }}</div>
          </li>
          <li class="jiaoche">
            <i class="iconfont icon-jiaoche"></i><span>{{ $t( 'currentTask.chart.car' ) }}</span>
            <div>{{ carDataFilter[3].count }}</div>
          </li>
          <li class="mianbaoche">
            <i class="iconfont icon-mianbaoche"></i><span>{{ $t( 'currentTask.chart.minibus' ) }}</span>
            <div>{{ carDataFilter[6].count }}</div>
          </li>
          <li class="kache">
            <i class="iconfont icon-qiache"></i><span>{{ $t( 'currentTask.chart.truck' ) }}</span>
            <div>{{ carDataFilter[7].count }}</div>
          </li>
          <li class="dakeche">
            <i class="iconfont icon-dakeche"></i><span>{{ $t( 'currentTask.chart.bus' ) }}</span>
            <div>{{ carDataFilter[5].count }}</div>
          </li>
          <li class="motuoche">
            <i class="iconfont icon-motuoche"></i><span>{{ $t( 'currentTask.chart.motorbike' ) }}</span>
            <div>{{ carDataFilter[2].count }}</div>
          </li>
          <li class="sanlunche">
            <i class="iconfont icon-sanlunche"></i><span>{{ $t( 'currentTask.chart.tricycle' ) }}</span>
            <div>{{ carDataFilter[4].count }}</div>
          </li>
          <li class="zixingche">
            <i class="iconfont icon-zihangche"></i><span>{{ $t( 'currentTask.chart.bike' ) }}</span>
            <div>{{ carDataFilter[1].count }}</div>
          </li>
        </ul>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
  /* eslint-disable */
  let fn = null // window.onresize 的监听函数
  // let myChart = null // 作为echart实力化对象

  // const pageArr = [
  //   {'code': 1, 'type': '行人', 'count': 0, 'sort': '5'},
  //   {'code': 2, 'type': '自行车', 'count': 0},
  //   {'code': 3, 'type': '摩托车', 'count': 0, 'sort': '1'},
  //   {'code': 4, 'type': '轿车', 'count': 0, 'sort': '2'},
  //   {'code': 5, 'type': '三轮车', 'count': 0, 'sort': '4'},
  //   {'code': 6, 'type': '大客车', 'count': 0},
  //   {'code': 7, 'type': '面包车', 'count': 0, 'sort': '3'},
  //   {'code': 8, 'type': '卡车', 'count': 0}
  // ]

  export default {
    props: {
      carData: {
        type:Array,
        require: true
      }
    },
    data () {
      return {
        myChart: null   // 作为echart实力化对象
      }
    },
    computed :{
      carDataFilter () {
        if (this.carData.length === 0) {
          return [
            {'code': 1, 'type': this.$t( 'currentTask.chart.passerby' ), 'count': 0, 'sort': '5'},
            {'code': 2, 'type': this.$t( 'currentTask.chart.bike' ), 'count': 0},
            {'code': 3, 'type': this.$t( 'currentTask.chart.motorbike' ), 'count': 0, 'sort': '1'},
            {'code': 4, 'type': this.$t( 'currentTask.chart.car' ), 'count': 0, 'sort': '2'},
            {'code': 5, 'type': this.$t( 'currentTask.chart.tricycle' ), 'count': 0, 'sort': '4'},
            {'code': 6, 'type': this.$t( 'currentTask.chart.bus' ), 'count': 0},
            {'code': 7, 'type': this.$t( 'currentTask.chart.minibus' ), 'count': 0, 'sort': '3'},
            {'code': 8, 'type': this.$t( 'currentTask.chart.truck' ), 'count': 0}
          ]
        }else{
          return this.carData.sort((a,b)=>{
            return a.code-b.code
          })
        }
      }
    },
    watch : {
      carData (newVal, oldVal) {
        this.setChartData(this.carDataFilter)
      },
      '$store.state.language' (newVal,oldVal) {
        this.setChartData(this.carDataFilter)
      }
    },
    created() {

    },
    mounted() {
      // this.$importScript('/static/echarts/echarts.min.js')
        this.ininChart()
    },
    beforeDestroy() {
      window.removeEventListener('resize', fn)
    },
    methods: {
      async _getStatistic() {

      },
      ininChart() {
        console.log('initChart------------')
        let passerby = this.$t( 'currentTask.chart.passerby' )
        let car = this.$t( 'currentTask.chart.car' )
        let minibus = this.$t( 'currentTask.chart.minibus' )
        let truck = this.$t( 'currentTask.chart.truck' )
        let bus = this.$t( 'currentTask.chart.bus' )
        let motorbike = this.$t( 'currentTask.chart.motorbike' )
        let tricycle = this.$t( 'currentTask.chart.tricycle' )
        let bike = this.$t( 'currentTask.chart.bike' )
        let fontSize = 16

        let option = {
          backgroundColor: '#171159',
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0%',
            right: '1%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [
                {value: passerby, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
                {value: car, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
                {value: minibus, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
                {value: truck, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
                {value: bus, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
                {value: motorbike, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
                {value: tricycle, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
                {value: bike, textStyle: {fontSize: fontSize, color: '#29b2fa'}}
              ],
              axisTick: {
                alignWithLabel: true,
                interval: 0,
                length: 0
              },
              axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                  color: '#2033b6',
                  width: '2',
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 10
                }
              },
              axisLabel: {
                margin: 20
              }
            }
          ],
          yAxis: [
            {
              position: 'right',
              type: 'value',
              axisTick: {
                inside: true,
                length: 0
              },
              axisLine: {
                show: false,
                onZero: true,
                lineStyle: {
                  color: '#29b2fa'
                }
              },
              splitNumber: 2
            }
          ],
          series: [
            {
              type: 'bar',
              barWidth: '50%',
              itemStyle: {
                normal: {
                  shadowBlur: 4,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  opacity: 0.6
                }
              },
              data: [
                {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#27ace4'
                        },
                        {
                          offset: 1,
                          color: '#171461'
                        }
                      ])
                    }
                  }
                },
                {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#27ace4'
                        },
                        {
                          offset: 1,
                          color: '#171461'
                        }
                      ])
                    }
                  }
                },
                {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#27ace4'
                        },
                        {
                          offset: 1,
                          color: '#171461'
                        }
                      ])
                    }
                  }
                },
                {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#27ace4'

                        },
                        {
                          offset: 1,
                          color: '#171461'
                        }
                      ])
                    }
                  }
                },
                {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#27ace4'
                        },
                        {
                          offset: 1,
                          color: '#171461'
                        }
                      ])
                    }
                  }
                },
                {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#27ace4'
                        },
                        {
                          offset: 1,
                          color: '#171461'
                        }
                      ])
                    }
                  }
                },
                {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#27ace4'
                        },
                        {
                          offset: 1,
                          color: '#171461'
                        }
                      ])
                    }
                  }
                },
                {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#27ace4'
                        },
                        {
                          offset: 1,
                          color: '#171461'
                        }
                      ])
                    }
                  }
                }
              ]
            }
          ]
        }
        this.myChart = echarts.init(this.$refs.chartBar)
        option.series[0].data = [
          {
            value: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#27ace4'
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#27ace4'
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#27ace4'
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#27ace4'

                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#27ace4'
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#27ace4'
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#27ace4'
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#27ace4'
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          }
        ]
        option.xAxis = [
          {
            type: 'category',
            data: [
              {value: passerby, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
              {value: car, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
              {value: minibus, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
              {value: truck, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
              {value: bus, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
              {value: motorbike, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
              {value: tricycle, textStyle: {fontSize: fontSize, color: '#29b2fa'}},
              {value: bike, textStyle: {fontSize: fontSize, color: '#29b2fa'}}
            ],
            axisTick: {
              alignWithLabel: true,
              interval: 0,
              length: 0
            },
            axisLine: {
              show: true,
              onZero: true,
              lineStyle: {
                color: '#2033b6',
                width: '2',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
              }
            },
            axisLabel: {
              margin: 20
            }
          }
        ]
        this.myChart.setOption(option)

        fn =  () => {
          this.myChart.resize()
        }
        window.addEventListener('resize', fn)
      },
      setChartData(statistic) {
        let passerby = this.$t( 'currentTask.chart.passerby' )
        let car = this.$t( 'currentTask.chart.car' )
        let minibus = this.$t( 'currentTask.chart.minibus' )
        let truck = this.$t( 'currentTask.chart.truck' )
        let bus = this.$t( 'currentTask.chart.bus' )
        let motorbike = this.$t( 'currentTask.chart.motorbike' )
        let tricycle = this.$t( 'currentTask.chart.tricycle' )
        let bike = this.$t( 'currentTask.chart.bike' )
        let fontSize = 16
        let option = this.myChart.getOption()
        option.series[0].data = [
          {
            value: statistic[0].count,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: showColor(statistic[0].sort)
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: statistic[3].count,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: showColor(statistic[3].sort)
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: statistic[6].count,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: showColor(statistic[6].sort)
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: statistic[7].count,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: showColor(statistic[7].sort)

                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: statistic[5].count,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: showColor(statistic[5].sort)
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: statistic[2].count,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: showColor(statistic[2].sort)
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: statistic[4].count,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: showColor(statistic[4].sort)
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          },
          {
            value: statistic[1].count,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: showColor(statistic[1].sort)
                  },
                  {
                    offset: 1,
                    color: '#171461'
                  }
                ])
              }
            }
          }
        ]
        option.xAxis = [
          {
            type: 'category',
            data: [
              {value: passerby, textStyle: {fontSize: fontSize, color: showColor(statistic[0].sort)}},
              {value: car, textStyle: {fontSize: fontSize, color: showColor(statistic[3].sort)}},
              {value: minibus, textStyle: {fontSize: fontSize, color: showColor(statistic[6].sort)}},
              {value: truck, textStyle: {fontSize: fontSize, color: showColor(statistic[7].sort)}},
              {value: bus, textStyle: {fontSize: fontSize, color: showColor(statistic[5].sort)}},
              {value: motorbike, textStyle: {fontSize: fontSize, color: showColor(statistic[2].sort)}},
              {value: tricycle, textStyle: {fontSize: fontSize, color: showColor(statistic[4].sort)}},
              {value: bike, textStyle: {fontSize: fontSize, color: showColor(statistic[1].sort)}}
            ],
            axisTick: {
              alignWithLabel: true,
              interval: 0,
              length: 0
            },
            axisLine: {
              show: true,
              onZero: true,
              lineStyle: {
                color: '#2033b6',
                width: '2',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
              }
            },
            axisLabel: {
              margin: 20
            }
          }
        ]
        this.myChart.setOption(option, true)
      },
      initDemo() {
        this.myChart = echarts.init(this.$refs.chartBar)
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [{
              value: 5,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#27ace4'
                    },
                    {
                      offset: 1,
                      color: '#171461'
                    }
                  ])
                }
              }
            }, 20, 36, 10, 10, 20]
          }]
        }

        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option)
      }
    }
  }

  function showColor(sort) {
    if (sort == 1) {
      return '#f7941f'
    } else if (sort == 2) {
      return '#fdee23'
    } else if (sort == 3) {
      return '#8dc73f'
    } else {
      return '#27ace4'
    }
  }

</script>

<style lang="scss" scoped>
  $chartTopLeft: '~assets/images/chart_top_left.png';
  $chartTopRight: '~assets/images/chart_top_right.png';
  .chart-layer {
    width: calc(100% - 14px - 520px);
    height: 100%;
    .chart-top {
      position: relative;
      font-size: 17px;
      height: 48px;
      line-height: 48px;
      color: #1eebfc;
      padding-left: 100px;
      background: url($chartTopLeft) no-repeat -2px -2px;
      background-color: #171159;
      margin-bottom: 2px;
      font-weight: 900 !important;
      .chart-top-right {
        position: absolute;
        top: 0;
        right: 0;
        width: 350px;
        height: 100%;
        background: url($chartTopRight) no-repeat 2px -2px;
        transition: all 1s;
      }
    }
    .flex-box{
      display: flex;
      height: calc(100% - 50px);
    }
    #chart-bar {
      flex:65;
      // width: 65%;
      height: calc(100% );
      float: left;
      min-width: 710px;
    }
    .list-layer {
      float: right;
      flex:35;
      // width: 35%;
      height: calc(100% );
      .info {
        box-sizing: border-box;
        height: calc(100%);
        border: 1px solid #1eb5fc;
        background: #171159;
        border-left: 0;
        width: 100%;
        ul {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 10px;
          padding-top: 0;
          li {
            height: 12.5%;
            position: relative;
            color: rgb(39, 172, 228);
            div {
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
              width: 120px;
              font-size: 30px;
              text-align: right;
            }
            i {
              position: absolute;
              left: 0;
              top: 4px;
              height: 100%;
              width: 40px;
              font-size: 24px;
              text-align: center;
            }
            span {
              position: absolute;
              left: 60px;
              top: 6px;
              height: 100%;
              font-size: 18px;
              line-height: 100%;
            }
            div {
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
              width: 120px;
              font-size: 30px;
              text-align: right;
            }
          }
          li.jiaoche {
            color: rgb(247, 148, 31);
          }
          li.mianbaoche {
            color: rgb(141, 199, 63);
          }
          li.motuoche {
            color: rgb(253, 238, 35);
          }
        }
      }
    }
  }

</style>
