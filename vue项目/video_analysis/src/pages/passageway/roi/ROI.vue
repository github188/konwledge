<template>
  <fill-content ref="fillContent" title="ROI区域设置" class-name="roi">
    <div class="fl device-box">
      <div class="device-chose">
        <el-form ref="form" :model="form" label-width="">
          <el-form-item label="通道选择：">
            <el-select v-model="form.area" placeholder="">
              <el-option v-for="(val) in form.list" :label="val.label" :value="form.value" :key="val.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="video-canvas-box">
        <player ref="player" :video-url="videoUrl">

        </player>
        <draw-frame ref="drawFrame"
                    :draw-frame-load="drawFrameLoad"
                    :video-region="videoRegion"
                    @reginUpdate="reginUpdate"

        >

        </draw-frame>
      </div>
    </div>
    <div class="fr target-size-box">
      <h3 class="f14">
        识别目标大小
      </h3>
      <div class="target-input last">
        <p class="target-input-content">
          <span class="label f14">识别目标最小尺寸：</span><br>
          <input v-model="minWidth" type="text">
          <span class="x">x</span>
          <input v-model="minHeight" type="text">
          <span class="f14 px">(px)</span>
          <el-checkbox v-model="checked">显示最小尺寸</el-checkbox>
        </p>
        <p class="control">
          <el-button type="primary" icon="icon-fuhao-huizhi iconfont" @click="drawCanvas">绘制区域</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="clearCanvas">清除绘制</el-button>
        </p>
      </div>

      <p class="save-box">
        <el-button type="primary" @click="saveData">保存</el-button>
      </p>
    </div>
  </fill-content>
</template>

<script>
  import DrawFrame from '@/components/content/DrawFrame/DrawFrame.vue'
  import Player from '@/components/content/Player/Player.vue'

  export default {
    name: 'ROI',
    components: {
      DrawFrame, Player
    },
    data () {
      return {
        form: {
          area: 'camera 01',
          list: []
        },
        checked: false,
        minWidth: '100',
        minHeight: '100',
        videoUrl: '',
        videoRegion: {
          width: '',
          height: '',
          pt: []
        },
        drawRegionData: []
      }
    },
    mounted () {
      this.$refs.fillContent.loading()
      this._initChannelData().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() }) // 获取通道列表
      this._initVideoOthers() // 获取视频信息
      this._initVideoData() // 获取视频宽高等
    },
    methods: {
      async _initChannelData () {
        let res = await this.$api.channelData()
        this.form.list = res.data
      },
      async _initVideoOthers () {
        let res = await this.$api.roiVideoGet()
        this.videoUrl = res.data.url
        console.log(res.data.url)
      },
      async _initVideoData () {
        let res = await this.$api.getRoi()
        console.log(res.data, '_initVideoData')
        // 由于远处请求的速度 （一般而言） 是慢于页面组件渲染速度的，所以此时videoArea已经获取到了
        this.videoRegion = res.data
      },
      async saveData () {
        this.$refs.fillContent.loading()
        let res = await this.$api.setRoi({
          width: this.minWidth,
          height: this.minHeight,
          pt: this.drawRegionData
        }).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message || '保存信息成功')
      },
      handleClick () {
        this.$refs.dropdown.show()
      },
      drawCanvas () {
        this.$refs.drawFrame.open()
      },
      clearCanvas () {
        this.$refs.drawFrame.clearCanvas()
        this.$refs.drawFrame.close()
      },
      drawFrameLoad () {
        this.$refs.drawFrame.close()
      },
      reginUpdate (val) {
        this.drawRegionData.push(val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color: #b0b0b0;
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
          background: none;
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
