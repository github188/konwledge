<template>
  <a id="player" ref="player">
    player
  </a>
</template>

<script>
  // 配置视频控件
  let ckPlayerService = function (id, url, live) {
    let videoObject = {
      container: ('#' + id), // 容器的ID或className
      letiable: 'player', // 播放函数名称
      loaded: loadedHandler,
      flashplayer: true,
      autoplay: true,
      poster: 'material/poster.jpg', // 封面图片
      video: url,
      live: live
    }
    let player = new ckplayer(videoObject) // eslint-disable-line
    function loadedHandler () {
      player.addEventListener('screenshot', screenshotHandler)
    }
    function screenshotHandler (obj) {
      console.log(obj)
    }
  }

  export default {
    name: 'Player',
    props: {
      videoUrl: {
        type: String,
        require: true
      }
    },
    data () {
      return {
        videoInfo: {
          width: 0,
          height: 0
        }
      }
    },
    watch: {
      videoUrl (newValue, oldValue) {
        ckPlayerService('player', newValue, true)
      }
    },
    mounted () {
      ckPlayerService('player', this.videoUrl, true)
    }
  }
</script>

<style lang="scss" scoped>
  #player {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
