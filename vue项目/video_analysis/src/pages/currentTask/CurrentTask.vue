<template>
  <div class="current-page">
    <div v-loading="loading"
         class="loading-box"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <!--实时监控和表格部分-->
      <div class="top-layer">
        <minitor-box :channel-data="channelData" :channel-default="channelDefault"></minitor-box>
        <chart-box :car-data="carData"></chart-box>
      </div>

      <!--车辆/行人/人脸识别列表-->
      <reco-tab>
        <reco-item :item-list="itemList" title="行人识别"></reco-item>
        <reco-item title="车辆识别"></reco-item>
        <reco-item title="人脸识别"></reco-item>
      </reco-tab>
    </div>

  </div>
</template>

<script>
  import RecoTab from './RecoTab'
  import RecoItem from './RecoItem'
  import MinitorBox from './MinitorBox'
  import ChartBox from './ChartBox'
  import timeFormat from 'date-string-transform'

  export default {
    name: 'CurrentTask',
    components: {
      RecoTab, RecoItem, MinitorBox, ChartBox
    },
    data () {
      return {
        loading: false,
        itemList: [],
        carData: [],
        channelData: [],
        channelDefault: {}
      }
    },
    mounted () {
      this._setChannelData() // 初始化渠道列表数据
      this._initWebsocket()
      this._setChartData()
    },
    methods: {
      // 连接源生的websocket
      _initWebsocket () {
        var ws = new WebSocket('ws://10.10.29.164:3000/ws')
        ws.onmessage = (res) => {
          console.log('websocket接收到后台推送消息')
          console.log(JSON.parse(res.data))
          let result = JSON.parse(res.data)
          let Bike = result.detail.Bikes[0]
          let person = Bike.Persons[0].Recognize
          console.log(timeFormat)
          this.itemList.unshift({
            car: '摩托车',
            sex: person.Sex.TopList[0].Name,
            ageGroup: person.Age.TopList[0].Name,
            age: '35',
            time: Bike.Timestamp,
            img: 'data:image/jpeg;base64,' + result.imageDatas[Bike.ImageId]
          })
        }
        ws.onerror = function (err) {
          console.log('websocket报错')
          console.log(err)
        }
        ws.onopen = function () {
          console.log('websocket打开')
          // 链接成功之后再发送请求
          ws.send('data')
        }
        ws.onclose = function () {
          console.log('websocket关闭')
        }
      },
      async _setChannelData () {
        this.loading = true
        let res = await this.$api.channelData().finally(() => { this.loading = false })
        console.log(res, '_setChannelData')
        this.channelData = res.data
      },
      // 用计时器模拟数据变化
      _setChartData () {
        let count = 0
        let timer = null
        timer = setInterval(() => {
          this.carData = [
            {'code': '1', 'type': '行人', 'count': 46 + count, 'sort': '5'},
            {'code': '2', 'type': '自行车', 'count': 22 + count},
            {'code': '3', 'type': '轿车', 'count': 284 + count, 'sort': '2'},
            {'code': '4', 'type': '摩托车', 'count': 465 + count, 'sort': '1'},
            {'code': '5', 'type': '大客车', 'count': 92 + count},
            {'code': '6', 'type': '三轮车', 'count': 5 + count, 'sort': '4'},
            {'code': '7', 'type': '面包车', 'count': 184 + count, 'sort': '3'},
            {'code': '8', 'type': '卡车', 'count': 3 + count}
          ]
          count = count + 10
          if (count > 100) {
            clearInterval(timer)
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bigBg: '~@/assets/images/big_bg.png';
  $recognitionTitleBg: '~@/assets/images/recognition_title_bg.png';

  .current-page {
    background: url($bigBg);
    padding-left: 248px;
    min-width: 1228px;
  }

  .top-layer {
    position: relative;
    overflow: hidden;
    height: 340px;
    width: 100%;
    margin-bottom: 10px;
    padding-top: 10px;
    > > > .minitor-layer {
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
