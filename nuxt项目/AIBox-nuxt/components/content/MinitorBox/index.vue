<template>

  <div class="minitor-layer">
    <div class="minitor-top-box">
      <span class="title-text">{{ $t('currentTask.videoTitle') }}</span>
      <div class="select-gallery" @click="channelSelect">{{ $t('currentTask.channelTitle') }} <i class="el-icon-caret-bottom"></i></div>
    </div>

    <div class="minitor-content">
      <i v-show="closeIconShow" class="video-delete icon-quxiao iconfont" @click="closeVideo"></i>
      <div v-show="videoStop" class="video-stop"></div>
      <!--<a id="player" href style="display:block;width:100%;height:100%"></a>-->
      <!--<Player v-show="playerShow" ref="player" :video-url="videoUrl"></Player>-->
      <grind-player v-show="playerShow" ref="grindPlayer" :video-url="videoUrl" width="518" height="292"></grind-player>
      <div class="pass-name">{{ currentChannelName }}</div>

      <div v-loading="channelLoading"
           class="video-channel"
           element-loading-background="rgba(255, 255, 255, 0.5)"
      >
        <panel :flag="flag">
          <!--<el-tree :data="channelData"-->
          <!--:props="channelDefault"-->
          <!--:default-expanded-keys="[10, 2, 3]"-->
          <!--node-key="id"-->
          <!--@node-click="handleNodeClick"-->
          <!--&gt;</el-tree>-->
          <ul class="channe-box">
            <li v-for="(val) in channelData" :key="val.channel" :class="{ 'active':val.channel == currentChn }" @click="chooseChannel(val)">
              {{ (val.channel*1+1) + ' - ' + val.chnname }}
            </li>
          </ul>
        </panel>
      </div>
    </div>
  </div>
</template>

<script>
  import Panel from '~/components/common/panel/Panel.vue'
  import Player from '~/components/content/Player/Player.vue'
  import GrindPlayer from '~/components/content/GrindPlayer/GrindPlayer.vue'

  export default {
    components: {
      Panel, Player, GrindPlayer
    },
    props: {
      channelData: {

      },
      currentChn: {
        type: Number || String
      },
      channelDefault: {
        type: Object,
        default: function () {
          return {
            children: 'children',
            label: 'label'
          }
        }
      },
      videoUrl: {
        type: String
      }
    },
    data () {
      return {
        activeNames: '',
        flag: false,
        closeIconShow: true,
        videoStop: false,
        playerShow: true,
        channelLoading: false
      }
    },
    computed: {
      currentChannelName () {
        if (this.channelData.length == 0) {
          return this.$t('currentTask.channelTip')
        }

        let chn = this.channelData.find(val => val.channel * 1 === this.currentChn * 1)

        // 当系统第一次运行时，current chn 可能不是列表中的有效值。所以要进行判断
        if (chn == undefined) {
          chn = this.channelData[0]
        }

        let name = chn.chnname
        let chnid = chn.channel
        // let idx = this.channelData.findIndex(val => val.channel * 1 === this.currentChn * 1) + 1

        if (name.match(this.$t('currentTask.chaTips'))) {
          return name
        } else {
          return (chnid * 1 + 1) + ' - ' + name
        }
      }
    },
    created () {

    },
    methods: {
      handleChange (item) {

      },
      handleNodeClick (data) {
        this.closeIconShow = true
        console.log(data)
      },
      channelSelect () {
        this.flag = !this.flag
      },
      closeVideo () {
        this.videoStop = true
        this.playerShow = false
        this.closeIconShow = false
      },
      async chooseChannel (item) {
        this.videoStop = false
        this.playerShow = true
        this.closeIconShow = true
        this.channelLoading = true
        let res = await this.$api.setVideoChn({videochn: item.channel}).finally(() => { this.channelLoading = false })
        if (res.code * 1 === 0) {
          this.$emit('changeCurrentChn', item.channel, res.data.rtmpurl)
          this.$message.success(this.$t('currentTask.chaSucTips'))
          this.flag = !this.flag
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $videoStop: '~assets/images/video-stop.png';
  .minitor-layer {
    /*width: 38%;*/
    height: 340px;
    width:520px;
    .minitor-top-box {
      box-sizing: border-box;
      padding-left: 20px;
      line-height: 36px;
      font-size: 18px;
      height: 36px;
      margin-bottom: 10px;
      span.title-text {
        font-weight: 900;
        color: #1eebfc;
      }
      .select-gallery {
        line-height: 36px;
        width: 140px;
        height: 36px;
        border-radius: 4px;
        float: right;
        background: #29b1fb;
        color: #1b1464;
        position: relative;
        text-align: center;
        font-weight: 800;
        cursor: pointer;
      }
    }
    .minitor-content {
      position: relative;
      box-sizing: border-box;
      border: 1px solid #1eb5fc;
      height: calc(100% - 46px);
      background: #333;
      .video-delete {
        position: absolute;
        left: 5px;
        top: 5px;
        color: #1eb5fc;
        font-size: 20px;
        z-index: 5;
        background: #313131;
        &:hover{
          cursor: pointer;
        }
      }
      .video-stop {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 3;
        background-color: #313131;
        background: url($videoStop) no-repeat center center;
      }
      .pass-name {
        position: absolute;
        bottom: 0;
        right: 5%;
        color: #fff0f0;
        font-size: 18px;
      }
      .video-channel {
        box-sizing: border-box;
        position: absolute;
        right: 0;
        top: -1px;
        width: 36%;
        overflow-y: scroll;
        max-height: 100%;
        border: 1px solid #29b1fb;
        border-top: none;
        background: rgba(15, 2, 115, .6);
        z-index: 1000;
        &::-webkit-scrollbar {
          width: 5px;
          background: rgba(15, 2, 115, .6);
        }
        &::-webkit-scrollbar-thumb {
          background: orange;
          border-radius: 5px;
        }
        .channe-box{
          li{
            height:26px;
            line-height:26px;
            font-size:16px;
            color:#29b1fb;
            text-indent: 20px;
            &:hover{
              background:#1eebfc;
              cursor: pointer;
            }
          }
        }
      }
    }

    .el-tree {
      background: none;
      color: #29b1fb;
    }
    .el-tree-node__content:hover {
      background-color: #1eebfc;
    }
  }
</style>
<style lang="scss">
  .minitor-layer {
    .video-channel {
      .el-tree-node__content:hover {
        background-color: #1eebfc;
      }
      .el-tree-node:focus > .el-tree-node__content {
        background-color: #1eebfc;
      }
    }
  }
</style>
