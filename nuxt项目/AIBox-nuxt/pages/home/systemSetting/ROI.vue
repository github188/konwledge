<template>
  <fill-content ref="fillContent" :title="$t('menu.passageway.roi')" class-name="roi">
    <div class="fl device-box">
      <div class="device-chose">
        <span class="channel-label"> {{ $t('roi.chnlabel') }}：</span>
        <el-select v-model="channel" :placeholder="$t('roi.holder')" class="channel-select" @change="chooseChannel">
          <el-option
            v-for="item in chnOptions"
            :key="item.channel"
            :label="(item.channel*1+1) + ' - ' + item.chnname"
            :value="item.channel">
          </el-option>
        </el-select>
      </div>
      <div class="video-canvas-box">
        <!--<player ref="player" :video-url="videoUrl"></player>-->
        <grind-player ref="grindPlayer" :video-url="videoUrl" width="600" height="450"></grind-player>
        <draw-frame ref="drawFrame"
                    :draw-frame-load="drawFrameLoad"
                    :video-region="videoRegion"
                    @reginUpdate="reginUpdate"
        ></draw-frame>
      </div>
    </div>
    <div class="fl target-size-box">
      <h3 class="f14">
        {{ $t('roi.roiBoxTips') }}
      </h3>

    <el-select v-model="recogSizeType" :placeholder="$t('roi.holder')" @change="chooseRecogSizeType">
        <el-option
          v-for="item in recogSizeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <div class="target-input last">
        <p v-if="isShowCustomSize" class="target-input-content">
          <span class="label f14">{{ $t('roi.minSize') }}：</span><br>
          <input v-model="minWidth" type="text">
          <span class="x">x</span>
          <input v-model="minHeight" type="text">
          <span class="f14 px">(px)</span>
          <!-- <el-checkbox v-model="checked">显示最小尺寸</el-checkbox> -->
        </p>
        <p class="control">
          <el-button type="primary" icon="icon-fuhao-huizhi iconfont" @click="drawCanvas">{{ $t('roi.drawSec') }}</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="clearCanvas">{{ $t('roi.clearDraw') }}</el-button>
        </p>
      </div>

      <p class="save-box">
        <el-button type="primary" @click="saveData">{{ $t('roi.save') }}</el-button>
      </p>
    </div>
  </fill-content>
</template>

<script>
  import DrawFrame from '@/components/content/DrawFrame/DrawFrame.vue'
  import Player from '@/components/content/Player/Player.vue'
  import GrindPlayer from '@/components/content/GrindPlayer/GrindPlayer.vue'

  export default {
    name: 'ROI',
    components: {
      DrawFrame, Player, GrindPlayer
    },
    data () {
      return {
        form: {
          area: '',
          list: []
        },
        chnOptions: [
          {chnname: 'aaa', channel: 0},
          {chnname: 'bbb', channel: 1}
        ],
        isShowCustomSize: false,
        recogSizeOptions: [
          {label: this.$t('roi.default'), value: 'default'},
          {label: this.$t('roi.custom'), value: 'customize'}
        ],
        channel: 1,
        recogSizeType: 'default',
        checked: false,
        minWidth: '0',
        minHeight: '0',
        videoUrl: '',
        videoRegion: {
          videowidth: '',
          videoheight: '',
          region: []
        },
        drawRegionData: []
        // drawFrameFlag: true // 绘制区域本身不显示，第一次点击【绘制区域】按钮后，显示，并且无法消失；drawFrameFlag
      }
    },
    mounted () {
      // this.drawFrameFlag = this.$flashChecker()
      this.$refs.fillContent.loading()
      this._initChannelData().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() }) // 获取通道列表
      this._initRoiData() // 获取视频宽高等
    },
    methods: {
      sort_chan_name (x, y) {
        if (x.channel > y.channel) {
          return 1
        } else if (x.channel < y.channel) {
          return -1
        } else {
          return 0
        }
      },
      async _initChannelData () {
        let res = await this.$api.channelData()
        this.chnOptions = res.data.names.sort(this.sort_chan_name)
        // this.channel = ''
        this.channel = res.data.videochn
      },
      async _initRoiData (videochn) {
        let res = await this.$api.getRoi({videochn: videochn})
        console.log(res.data, '_initRoiData')
        // 由于远处请求的速度 （一般而言） 是慢于页面组件渲染速度的，所以此时videoArea已经获取到了
        this.videoRegion = res.data
        this.minWidth = res.data.minwidth
        this.minHeight = res.data.minheight
        this.videoUrl = res.data.rtmpurl
        if (res.data.region.length > 0 && this.$flashChecker()) {
          this.$refs.drawFrame.open()
        }
      },
      async saveData () {
        // if (!this.checkInfo()) { return }
        this.$refs.fillContent.loading()
        let res = await this.$api.setRoi({
          videochn: this.channel,
          minwidth: this.minWidth,
          minheight: this.minHeight,
          region: this.drawRegionData
        }).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message)
      },
      async chooseChannel (item) {
        this.$refs.fillContent.loading()
        this.clearCanvas()
        this._initRoiData(this.channel).finally(() => { this.$refs.fillContent.closeLoading() })
      },
      chooseRecogSizeType (item) {
        this.recogSizeType = item

        if (item == 'default') {
          this.isShowCustomSize = false
        } else {
          this.isShowCustomSize = true
        }
      },
      checkInfo () {
        let tips = ''
        if (this.channel === '') {
          tips = '请选择通道'
        } else if (this.drawRegionData.length === 0) {
          tips = '请选择绘制区域'
        } else if (!this.minWidth || !this.minHeight) {
          tips = '请选择最小尺寸'
        }
        if (tips !== '') {
          this.$message.warning(tips)
          return false
        } else {
          return true
        }
      },
      handleClick () {
        this.$refs.dropdown.show()
      },
      drawCanvas () {
        // this.drawFrameFlag = true
        this.$refs.drawFrame.open()
      },
      clearCanvas () {
        this.drawRegionData = []
        this.$refs.drawFrame.clearCanvas()
        // this.$refs.drawFrame.close()
      },
      drawFrameLoad () { // 组件初次加载的时候执行，默认关闭
        this.$refs.drawFrame.close()
        // this.drawFrameFlag = false
      },
      reginUpdate (val) {
        this.drawRegionData.push(val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color: #b0b0b0;
  #video{
    width:500px;
    height:500px;
    margin:50px auto;
    float: left;
    background: #a5a5a5;
  }
  .channel-label{
    height:40px;
    line-height: 40px;
    color: #a8a8a8;
    padding-right: 20px;
    font-size:14px;
  }
  .target-input {
    border-bottom: 1px solid #e6e6e6;
    padding-top: 30px;
    .label {
      display: inline-block;
      color: $color;
      padding-bottom: 20px;
    }
    .target-input-content {
      margin-bottom: 24px;
      input {
        width: 66px;
        height: 36px;
        background: #fff;
        text-align: center;
        border: 1px solid #e8e8e8;
      }
      .x {
        padding: 0 8px;
      }
      .px {
        padding: 0 20px 0 12px;
      }
    }
    .control {
      .el-button--primary:hover {
        color:#000;
      }
      padding-bottom: 26px;
      button:first-child {
        background: #fdfdfd;
      }
      button:last-child {
        background: #e46264;
        color: #fff;
        border-color: #e46264;
      }
    }
  }

  .content {
    box-sizing: border-box;
    border: 2px solid #ebebeb;
    overflow: hidden;
    background: #fff;
    min-height: 730px;
    .device-box {
      width: 600px;
      padding: 40px 0 0 40px;
      .device-chose {
        margin-bottom: 40px;
        h3 {
          display: inline-block;
          height: 42px;
          margin-right: 20px;
          line-height: 42px;
          color: #b0b0b0;
        }
      }
      .video-canvas-box {
        width: 600px;
        height: 450px;
        background: $testColor;
        position: relative;
        > > > .draw-frame-box {
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(0,0,0,0);
        }
      }

    }
    .target-size-box {
      width: 456px;
      padding: 92px 22px 0 22px;
      h3 {
        height: 84px;
        line-height: 84px;
      }
      > .target-input:nth-of-type(1) {
        padding-top: 0;
      }
      > .target-input.last {
        border-bottom: none;
        margin-bottom: 80px;
      }
      .save-box {
        text-align: center;
        button {
          width: 100px;
          height: 36px;
          background: #1f84d4;
          color: #fff;
          border-color: #1f84d4;
        }
      }
    }
  }

  ul.el-dropdown-menu {
    li.el-dropdown-menu__item {
      width: 260px;
    }
  }

</style>
<style lang="scss">
  .roi {
    .main{
      min-width:1145px;
    }
    .el-button--primary {
      background: #f6f6f6;
      border-color: #e9e9e9;
      color: #000;
    }
    .el-dropdown {
      width: 300px;
      border: 1px solid #e8e8e8;
      border-radius: 2px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #f6f6f6;
      span {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .device-chose {
      form.el-form {
        .el-form-item__label {
          color: #a8a8a8;
          padding-right: 20px;
        }
      }
    }

    .el-checkbox__label {
      font-size: 12px;
      color: #b0b0b0;

    }

    .target-input {
      .control {
        .el-button {
          i {
            margin-right: 8px;
          }
          span {
            font-size: 14px;
          }
          &:hover {
            /*color:#0080d1 !important;*/
          }
        }
      }
    }
  }
</style>
