<template>
  <div class="video-wrap" v-loading="videoLoading">
    <el-button type="primary" icon="el-icon-check" circle class="channel-button" @click="isChannelListShow=!isChannelListShow"></el-button>
    <div class="channel-wrap" v-show="isChannelListShow">
      <el-tree class="filter-tree" @node-click="handleNodeClick" :data="channelList" :props="defaultProps" default-expand-all ref="channelTree" style="background:rgba(0,0,0,0.7);color:#fff;">
      </el-tree>
    </div>
    <video-player class="vjs-custom-skin" :options="playerOptions" @play="onPlayerPlay($event)" @waiting="onPlayerWaiting($event)">
    </video-player>
  </div>
</template>

<script>
// video-player官网文档api例子都有：https://surmon-china.github.io/vue-video-player/
import 'video.js/dist/video-js.css';
import 'videojs-flash';
import { videoPlayer } from 'vue-video-player';

export default {
  components: {
    videoPlayer
  },
  props: ['channelList'],
  data() {
    return {
      playerOptions: {
        height: '360',
        muted: true,
        sources: [{
          type: 'rtmp/mp4',
          src: ''
        }],
        techOrder: ['flash'],
        autoplay: true,
        controls: true
        // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg'
      },
      videoLoading: false,
      defaultProps: {
        children: 'children',
        label: 'channelName'
      },
      isChannelListShow: false
    };
  },
  watch: {
    channelList(newVal, oldVal) {
      if (oldVal.length === 0 && newVal.length > 0) {
        newVal.map(i => {
          if (i.statusCode === 1 && !this.playerOptions.sources[0].src) {
            this.playerOptions.sources[0].src = i.rtmpAddress;
            return;
          }
        });
      }
    }

  },
  methods: {
    onPlayerPlay(player) {
      this.videoLoading = false;
      this.isChannelListShow = false;
      console.log('player play!', player);
    },
    onPlayerPause(player) {
      console.log('player pause!', player);
    },
    onPlayerEnded(player) {
      console.log('player ended!', player);
    },
    onPlayerLoadeddata(player) {
      console.log('player Loadeddata!', player);
    },
    onPlayerWaiting(player) {
      this.videoLoading = true;
      console.log('player Waiting!', player);
    },
    onPlayerPlaying(player) {
      console.log('player Playing!', player);
    },
    onPlayerTimeupdate(player) {
      console.log('player Timeupdate!', player.currentTime());
    },
    onPlayerCanplay(player) {
      console.log('player Canplay!', player);
    },
    onPlayerCanplaythrough(player) {
      console.log('player Canplaythrough!', player);
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState);
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log('example player 1 readied', player);
      player.currentTime(10);
      console.log('example 01: the player is readied', player);
    },
    handleNodeClick(data) {
      console.log(data);
      if (parseInt(data.statusCode, 10) !== 1) {
        this.tools.message('通道未开启!');
        return;
      }
      this.playerOptions.sources[0].src = data.rtmpAddress;
    }
  }
};
</script>

<style lang='less'>
.video-wrap {
  position: relative;
  width: 500px;
  .video-js .vjs-big-play-button {
    width: 50px;
    height: 50px;
    line-height: 45px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  .channel-button {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
  .channel-wrap {
    top: 40px;
    width: 170px;
    // height: 100%;
    border-radius: 10px;
    position: absolute;
    z-index: 2;
    > div {
      border-radius: 20px;
      overflow: hidden;
    }
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: #5393ff;
  }
  .el-tree-node__content:hover {
    background-color: #5393ff;
  }
}

.hide-channel-list {
  transition: 500ms linear;
  display: none;
}
</style>
