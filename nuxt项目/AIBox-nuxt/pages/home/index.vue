<template>
  <div
       v-loading="loading"
       class="loading-box current-page"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <div class="top-layer">
      <!--实时监控-->
      <minitor-box
      :channel-data="channelData"
      :channel-default="channelDefault"
      :video-url="videoUrl"
      :current-chn="currentChn"
      @changeCurrentChn="changeCurrentChn"
      >
      </minitor-box>
      <!--表格部分-->
      <chart-box :car-data="chartData"></chart-box>
    </div>

    <!--车辆/行人/人脸识别列表-->
    <reco-tab>
      <reco-item v-if="layout.passerby" :item-list="itemList" :title="$product==='structured' ? $t('currentTask.passerbyTitle'):$t('currentTask.oneLevelPasserby')" sign="passerby"></reco-item>
      <reco-item v-if="layout.car" :item-list="vehicleList" :title="$product==='structured' ?$t('currentTask.carTitle'):$t('currentTask.oneLevelCar')" sign="car"></reco-item>
      <reco-item v-if="layout.face" :title="$product==='structured' ?$t('currentTask.faceTitle'):$t('currentTask.oneLevelface')" sign="face"></reco-item>
    </reco-tab>
  </div>
</template>

<script>
  import RecoTab from '~/components/content/Recotab/index.vue'
  import RecoItem from '~/components/content/RecoItem/index.vue'
  import MinitorBox from '~/components/content/MinitorBox/index.vue'
  import ChartBox from '~/components/content/ChartBox/index.vue'

  const recogTypeList = [
    '未知',
    '行人',
    '自行车',
    '摩托车',
    '小汽车',
    '三轮车',
    '巴士',
    '面包车',
    '卡车'
  ]

  export default {
    components: {
        RecoTab,
        RecoItem, 
        MinitorBox,
        ChartBox
    },
    data () {
      return {
        loading: false,
        itemList: [],
        vehicleList: [],
        chartData: [
          {'code': 1, 'type': this.$t('currentTask.chart.passerby'), 'count': 0, 'sort': '5'},
          {'code': 2, 'type': this.$t('currentTask.chart.bike'), 'count': 0},
          {'code': 3, 'type': this.$t('currentTask.chart.motorbike'), 'count': 0, 'sort': '1'},
          {'code': 4, 'type': this.$t('currentTask.chart.car'), 'count': 0, 'sort': '2'},
          {'code': 5, 'type': this.$t('currentTask.chart.tricycle'), 'count': 0, 'sort': '4'},
          {'code': 6, 'type': this.$t('currentTask.chart.bus'), 'count': 0},
          {'code': 7, 'type': this.$t('currentTask.chart.minibus'), 'count': 0, 'sort': '3'},
          {'code': 8, 'type': this.$t('currentTask.chart.truck'), 'count': 0}
        ],
        channelData: [{channel: -1, chnname: `${this.$t('currentTask.chart.chaTips')}...`}],
        channelDefault: {},
        videoUrl: '',
        videoUrlSource: '',
        currentChnName: '',
        currentChn: -1,
        layout: {
          car: true,
          face: true,
          passerby: true
        },
        ws: null
      }
    },
    mounted () {
      this._getLayoutInfo() // 获取首页显示参数【显示哪几个模块】
      this._setChannelData() // 初始化渠道列表数据
      this._initWebsocket()
    },
    beforeDestroy () {
      this.ws.close()
    },
    methods: {
      // 连接源生的websocket
      _initWebsocket () {
        var ws_uri = 'ws://' + location.hostname + ':8001'
        this.ws = new WebSocket(ws_uri)

        this.ws.onmessage = (res) => {
          // console.log('websocket接收到后台推送消息')
          // console.log(JSON.parse(res.data))
          let result = JSON.parse(res.data)
          if (result.cmd == 'addObject') { this._analyze_json_packet_addObject(result) } else { this._analyze_json_packet(result) }
          /* let Bike = result.detail.Bikes[0]
          let person = Bike.Persons[0].Recognize
          //console.log(timeFormat)
          this.vehicleList.unshift({
            car: '摩托车',
            sex: person.Sex.TopList[0].Name,
            ageGroup: person.Age.TopList[0].Name,
            age: '35',
            time: Bike.Timestamp,
            img: 'data:image/jpeg;base64,' + result.imageDatas[Bike.ImageId]
          }) */
        }
        this.ws.onerror = (err) => {
          console.log(err)
          // this.$alert(this.$t('socket.error'), this.$t('socket.tipsTitle'), {
          //   confirmButtonText: this.$t('socket.confirm'),
          //   callback: action => {
          //     this._initWebsocket()
          //   }
          // })
        }
        this.ws.onopen = () => {
          // console.log('websocket打开')
          // 链接成功之后再发送请求
          this.ws.send('data')
        }
        this.ws.onclose = function () {
          // console.log('websocket关闭')
        }
      },
      async _getLayoutInfo () {
        let res = await this.$api.homeControl()
        this.layout = res.data
      },
      sort_chan_name (x, y) {
        if (x.channel > y.channel) {
          return 1
        } else if (x.channel < y.channel) {
          return -1
        } else {
          return 0
        }
      },
      async _setChannelData () {
        this.loading = true
        let res = await this.$api.channelData().finally(() => {
          this.loading = false
        })
        this.currentChn = res.data.videochn * 1
        this.videoUrlSource = res.data.rtmpurl
        this.videoUrl = res.data.rtmpurl

        // 排序列表，因为显示时需要1, 2, 3... 这样的结果
        res.data.names.sort(this.sort_chan_name)
        this.channelData = res.data.names
        let chnItem = res.data.names.find(val => val.channel === res.data.videochn)
        this.currentChnName = chnItem.chnname || ''
      },
      _setChartData (changelist) {
        let copyChatData = this.$copy(this.chartData)
        changelist.forEach(item => {
          copyChatData.find(val => val.code === item.code).count += item.count
        })
        this.chartData = copyChatData
      },
      // 分析数据1
      _analyze_json_packet (json_data) {
        var result
    
        if (!json_data.detail) {
          console.log('Error! semo_ws_on_msg: json_data.ImageResults is NULL!')
          return
        }
        if (json_data.detail) {
          // console.log('当前一个通道')
          if (json_data.detail.Vehicles.length != 0) {
            result = this._process_vehicles(json_data.detail.Vehicles, json_data.imageDatas, json_data.detail.VideoChannel)
          }
          if (json_data.detail.Pedestrains.length != 0) {
            result = this._process_pedestrain(json_data.detail.Pedestrains, json_data.imageDatas, json_data.detail.VideoChannel)
          }
          if (json_data.detail.Bikes.length != 0) {
            result = this._process_bikes(json_data.detail.Bikes, json_data.imageDatas, json_data.detail.VideoChannel)
          }
        }
      },
      // 分析数据2
      _analyze_json_packet_addObject (json_data) {
        var result
        if (json_data.object == 'vehicle') {
          result = this._process_vehicle_addObject(json_data)
        } else if (json_data.object == 'pedestrain') {
          result = this._process_pedestrain_addObject(json_data)
        } else if (json_data.object == 'bike') {
          result = this._process_bike_addObject(json_data)
        }
      },
      changeCurrentChn (val, rtspurl) {
        this.currentChn = val
        this.videoUrl = rtspurl
      },
      // bikes解析
      _process_bikes (Bikes, imageDatas, channel) {
        let changelist = [
          {code: 1, count: 0},
          {code: 2, count: 0},
          {code: 3, count: 0},
          {code: 4, count: 0},
          {code: 5, count: 0},
          {code: 6, count: 0},
          {code: 7, count: 0},
          {code: 8, count: 0}
        ]
        let itemList = []
        for (var i_Bike = 0; i_Bike < Bikes.length; i_Bike++) {
          var Bike = Bikes[i_Bike]
          var BikeType = Bike.Type

          var Persons = Bike.Persons
          for (var i_person = 0; i_person < Persons.length; i_person++) {
            var Person = Persons[i_person]
            var Recognize = Person.Recognize

            var Age = Recognize.Age // 年龄
            if (Age) {
              var age = Age.TopList[0].Name
            } else {
              var age = '---'
            }

            var BottomColor = Recognize.BottomColor // 下身颜色
            if (BottomColor) {
              var bottomColor = BottomColor.TopList[0].Name
            } else {
              var bottomColor = '---'
            }

            var BottomType = Recognize.BottomType // 下身服装
            if (BottomType) {
              var bottomType = BottomType.TopList[0].Name
            } else {
              var bottomType = '---'
            }

            var Sex = Recognize.Sex // 性别
            if (Sex) {
              var sex = Sex.TopList[0].Name
            } else {
              var sex = '---'
            }

            var UpperColor = Recognize.UpperColor // 上身颜色
            if (UpperColor) {
              var upperColor = UpperColor.TopList[0].Name
            } else {
              var upperColor = '---'
            }

            var UpperType = Recognize.UpperType // 上身服装
            if (UpperType) {
              var upperType = UpperType.TopList[0].Name
            } else {
              var upperType = '---'
            }

            var BikeTypeName = this.get_recog_type_name(Bike.Type)
            // console.log('id ' + Bike.ImageId)
            if (!Bike.ImageId) {
              alert('no Bike id')
            }
            if (channel * 1 === this.currentChn * 1) {
              changelist.find(item => item.code === BikeType).count += 1

              console.log(Person,'Person')
              debugger
              itemList.unshift({
                car: BikeTypeName,
                sex: sex,
                ageGroup: age,
                age: upperType,
                time: bottomType,
                channel: channel,
                timeFormat: this.$dateTransform(new Date(Bike.Timestamp), 'yyyy-MM-dd hh:mm:ss'),
                img: 'data:image/jpeg;base64,' + imageDatas[Bike.ImageId]
              })
            }
          }
        }
        this.itemList = itemList
        itemList = null
        this._setChartData(changelist)
      },

      // vehicle解析
      _process_vehicles (Vehicles, imageDatas, channel, timeFormat) {
        let changelist = [
          {code: 1, count: 0},
          {code: 2, count: 0},
          {code: 3, count: 0},
          {code: 4, count: 0},
          {code: 5, count: 0},
          {code: 6, count: 0},
          {code: 7, count: 0},
          {code: 8, count: 0}
        ]
        let vehicleList = []
        for (var i_car = 0; i_car < Vehicles.length; i_car++) {
          var Vehicle = Vehicles[i_car] // 车辆数组的第i个对象
          // console.log(Vehicle, '车辆数组的第i个对象')

          var Recognize = Vehicle.Recognize // 识别对象

          var Brand = Recognize.Brand // 三段式信息
          if (Brand) {
            var BrandCode = Brand.Code
            if (Brand.TopList) {
              var BrandName = Brand.TopList[0].Name
            }
          } else {
            var BrandCode = ''
            var BrandName = '---'
          }

          if (Recognize.Color) {
            var Color = Recognize.Color // 颜色
            var ColorName = Color.TopList[0].Name
          } else {
            var Color = '---' // 颜色
            var ColorName = '---'
          }

          var Plate = Recognize.Plate // 车牌对象
          // "Plate":{"Code":0,"Color":{"Code":"2","Name":"蓝","Score":97},"Flag":1,"Licence":"桂K71116","Message":"ok","Score":88,"Type":2}
          if (Plate) {
            var PlateColor = Plate.Color // 车牌颜色
            if (PlateColor) {
              var PlateColorName = PlateColor.Name
            }
            var PlateFlag = Plate.Flag // 车牌识别类型 单牌 无牌
            var Licence = Plate.Licence // 车牌号
            var PlateType = Plate.Type // 车牌类型 军牌 黄牌 武警
          } else {
            var Licence = '---'
          }

          var VehicleType = Recognize.Type // 车辆类型
          if (VehicleType) {
            var vehicleType = VehicleType.TopList[0].Name
          } else {
            var vehicleType = 'Invail'
            // return 0;
          }

          var vehicleTypeName = this.get_recog_type_name(Vehicle.Type)

          console.log('id ' + Vehicle.ImageId)
          if (!Vehicle.ImageId) {
            alert('no Vehicle id')
          }
          if (channel * 1 === this.currentChn * 1) {
            changelist.find(item => item.code === Vehicle.Type).count += 1
            vehicleList.unshift({
              car: vehicleTypeName,
              Licence: Licence,
              BrandName: BrandName,
              ColorName: ColorName,
              channel: channel,
              timeFormat: this.$dateTransform(new Date(Vehicle.Timestamp), 'yyyy-MM-dd hh:mm:ss'),
              img: 'data:image/jpeg;base64,' + imageDatas[Vehicle.ImageId]
            })
          }
        }
        this.vehicleList = vehicleList
        vehicleList = null
        this._setChartData(changelist)
      },

      _process_pedestrain (Pedestrains, imageDatas, channel) {
        let changelist = [
          {code: 1, count: 0},
          {code: 2, count: 0},
          {code: 3, count: 0},
          {code: 4, count: 0},
          {code: 5, count: 0},
          {code: 6, count: 0},
          {code: 7, count: 0},
          {code: 8, count: 0}
        ]
        let itemList = []
        for (var i_ped = 0; i_ped < Pedestrains.length; i_ped++) {
          var Pedestrain = Pedestrains[i_ped]

          console.log(Pedestrain.ImageId)

          var Recognize = Pedestrain.Recognize // 识别对象

          var Age = Recognize.Age // 年龄
          // "Age":{"Code":0,"Message":"ok","TopList":[{"Code":"3","Name":"中年","Score":62}]}
          if (Age) {
            var age = Age.TopList[0].Name
          } else {
            var age = '---'
          }

          var BottomColor = Recognize.BottomColor // 下身颜色
          // "BottomColor":{"Code":0,"Message":"ok","TopList":[{"Code":"7","Name":"黑","Score":95}]}
          if (BottomColor) {
            var bottomColor = BottomColor.TopList[0].Name
          } else {
            var bottomColor = '---'
          }

          var BottomType = Recognize.BottomType // 下身服装
          // "BottomType":{"Code":0,"Message":"ok","TopList":[{"Code":"1","Name":"长裤","Score":95}]}
          if (BottomType) {
            var bottomType = BottomType.TopList[0].Name
          } else {
            var bottomType = '---'
          }

          var Sex = Recognize.Sex // 性别
          // "Sex":{"Code":0,"Message":"ok","TopList":[{"Code":"2","Name":"女","Score":95}]}
          if (Sex) {
            var sex = Sex.TopList[0].Name
          } else {
            var sex = '---'
          }

          var UpperColor = Recognize.UpperColor // 上身颜色
          // "UpperColor":{"Code":0,"Message":"ok","TopList":[{"Code":"2","Name":"白","Score":31}]}
          if (UpperColor) {
            var upperColor = UpperColor.TopList[0].Name
          } else {
            var upperColor = '---'
          }

          var UpperType = Recognize.UpperType // 上身服装
          // "UpperType":{"Code":0,"Message":"ok","TopList":[{"Code":"1","Name":"长袖","Score":95}]}}
          if (UpperType) {
            var upperType = UpperType.TopList[0].Name
          } else {
            var upperType = '---'
          }

          var PedestrainType = this.get_recog_type_name(Pedestrain.Type)

          console.log('id ' + Pedestrain.ImageId)
          if (!Pedestrain.ImageId) {
            alert('no Pedestrain id')
          }
          if (channel * 1 === this.currentChn * 1) {
            changelist.find(item => item.code === Pedestrain.Type).count += 1
            itemList.unshift({
              car: PedestrainType,
              sex: sex,
              ageGroup: age,
              age: upperType,
              time: bottomType,
              channel: channel,
              timeFormat: this.$dateTransform(new Date(Pedestrain.Timestamp), 'yyyy-MM-dd hh:mm:ss'),
              img: 'data:image/jpeg;base64,' + imageDatas[Pedestrain.ImageId]
            })
          }
        }
        this.itemList = itemList
        itemList = null
        this._setChartData(changelist)
      },
      _process_vehicle_addObject (json_data) {
        let changelist = [
          {code: 1, count: 0},
          {code: 2, count: 0},
          {code: 3, count: 0},
          {code: 4, count: 0},
          {code: 5, count: 0},
          {code: 6, count: 0},
          {code: 7, count: 0},
          {code: 8, count: 0}
        ]
        let vehicleList = []
        var channel = json_data.basic.channelID
        var property = json_data.property
        var vehicleTypeName = this.get_recog_type_name(property.type)
        var Licence = property.carPlateNumber // 车牌号
        var BrandName = property.carStyleName
        var ColorName = property.carColorName
        var snapImageData = json_data.snapImageData

        if (channel * 1 === this.currentChn * 1) {
          changelist.find(item => item.code === property.type).count += 1
          vehicleList.unshift({
            car: vehicleTypeName,
            Licence: Licence,
            BrandName: BrandName,
            ColorName: ColorName,
            channel: channel,
            img: 'data:image/jpeg;base64,' + snapImageData
          })
        }
        this.vehicleList = vehicleList
        vehicleList = null
        this._setChartData(changelist)
      },
      _process_pedestrain_addObject (json_data) {
        let changelist = [
          {code: 1, count: 0},
          {code: 2, count: 0},
          {code: 3, count: 0},
          {code: 4, count: 0},
          {code: 5, count: 0},
          {code: 6, count: 0},
          {code: 7, count: 0},
          {code: 8, count: 0}
        ]
        let itemList = []
        var channel = json_data.basic.channelID
        var property = json_data.property
        var PedestrainType = this.get_recog_type_name(property.type)
        var sex = property.sexName
        var age = property.ageName
        var upperType = property.upperName
        var bottomType = property.bottomName
        var snapImageData = json_data.snapImageData

        if (channel * 1 === this.currentChn * 1) {
          changelist.find(item => item.code === property.type).count += 1
          itemList.unshift({
            car: PedestrainType,
            sex: sex,
            ageGroup: age,
            age: upperType,
            time: bottomType,
            channel: channel,
            img: 'data:image/jpeg;base64,' + snapImageData
          })
        }

        this.itemList = itemList
        itemList = null
        this._setChartData(changelist)
      },
      _process_bike_addObject (json_data) {
        let changelist = [
          {code: 1, count: 0},
          {code: 2, count: 0},
          {code: 3, count: 0},
          {code: 4, count: 0},
          {code: 5, count: 0},
          {code: 6, count: 0},
          {code: 7, count: 0},
          {code: 8, count: 0}
        ]
        let itemList = []
        var channel = json_data.basic.channelID
        var property = json_data.property
        var BikeTypeName = this.get_recog_type_name(property.type)
        var sex = property.sexName
        var age = property.ageName
        var upperType = property.upperName
        var bottomType = property.bottomName
        var snapImageData = json_data.snapImageData

        if (channel * 1 === this.currentChn * 1) {
          changelist.find(item => item.code === property.type).count += 1
          itemList.unshift({
            car: BikeTypeName,
            sex: sex,
            ageGroup: age,
            age: upperType,
            time: bottomType,
            channel: channel,
            img: 'data:image/jpeg;base64,' + snapImageData
          })
        }
        this.itemList = itemList
        itemList = null
        this._setChartData(changelist)
      },

      get_recog_type_name (Type) {
        if (Type >= recogTypeList.length) {
          return ''
        } else {
          return recogTypeList[Type]
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  $bigBg: '~assets/images/big_bg.png';
  $recognitionTitleBg: '~assets/images/recognition_title_bg.png';

  .current-page {
    background: url($bigBg);
    padding-left: 30px;
    min-width: 1228px;
    flex: 1;
  }

  .top-layer {
    position: relative;
    overflow: hidden;
    height: 340px;
    width: 100%;
    margin-bottom: 10px;
    padding-top: 10px;
    >>> .minitor-layer {
      float: left;
    }
    .chart-layer {
      float: left;
      margin-left: 10px;
    }
  }

  .recognition-wrapper {
    .recognition-blank {
      height: 25px;
      position: relative;
      &:after {
        position: absolute;
        content: ' ';
        top: 50%;
        left: 0;
        width: 100%;
        margin-left: 56px;
        border: 1px dashed #5f6bf5;
      }
      &:last-child {
        display: none;
      }
    }
  }

</style>
