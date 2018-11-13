<template>
  <div id="GrindPlayer">
    <a v-if="runFlashBox" href="http://www.adobe.com/go/getflashplayer" class="player-image-box">
      <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player">
    </a>
  </div>
</template>

<script>
  /* eslint-disable */
  // import swfobject from './swfobject'
  export default {
    name: 'GrindPlayer',
    props: {
      videoUrl: {
        type: String
      },
      width: {type: String || Number, require: true},
      height: {type: String || Number, require: true},
    },
    data () {
      return {
        runFlashBox: false
      }
    },
    watch: {
      videoUrl (newVal, oldVal) {
        this._initGrindPlayer(newVal)
      }
    },
    mounted () {
      this.runFlashBox = !this.$flashChecker()
    },
    methods: {
      _initGrindPlayer (videoUrl) {
        window.player = null;
        window.jsbridge = function jsbridge(playerId, event, data) {
          if (window.player == null) {
            window.player = document.getElementById(playerId);
          }
          switch(event) {
            case "onJavaScriptBridgeCreated":
              listStreams(teststreams,"streamlist");
              break;
            case "timeChange":
            case "timeupdate":
            case "progress":
              break;
            default:
              console.log(event, data);
          }
        }
        var parameters = {
          src: videoUrl,
          autoPlay: "true",
          verbose: true,
          controlBarAutoHide: "true",
          controlBarPosition: "bottom",
          poster: "images/poster.png",
          javascriptCallbackFunction: "jsbridge",
          plugin_hls: "./static/plugin/GrindPlayer/flashlsOSMF.swf",
          hls_minbufferlength: -1,
          hls_maxbufferlength: 30,
          hls_lowbufferlength: 3,
          hls_seekmode: "KEYFRAME",
          hls_startfromlevel: -1,
          hls_seekfromlevel: -1,
          hls_live_flushurlcache: false,
          hls_info: true,
          hls_debug: false,
          hls_debug2: false,
          hls_warn: true,
          hls_error: true,
          hls_fragmentloadmaxretry : -1,
          hls_manifestloadmaxretry : -1,
          hls_capleveltostage : false,
          hls_maxlevelcappingmode : "downscale"
        };
        function getwmodeValue (wmodeValue, parameters) {
          var wmodeOptions = ["direct", "opaque", "transparent", "window"];
          if (parameters.hasOwnProperty("wmode")) {
            if (wmodeOptions.indexOf(parameters.wmode) >= 0) {
              return parameters.wmode
            } else {
              return wmodeValue
            }
            delete parameters.wmode;
          } else {
            return wmodeValue
          }
        }
        swfobject.embedSWF(
          "./static/plugin/GrindPlayer/GrindPlayer.swf"
          , "GrindPlayer"
          , parseInt(this.width)
          , parseInt(this.height)
          , "10.1.0"
          , "expressInstall.swf"
          , parameters
          , {
            allowFullScreen: "true",
            wmode: getwmodeValue ("direct", parameters),
            autostart: "true"
          }
          , {
            name: "GrindPlayer"
          }
        );
      }
    }
  }

</script>

<style lang="scss" scoped>
  #GrindPlayer{
    position: relative;
    width:100%;
    height:100%;
    min-height:50px;
    .player-image-box{
      position: absolute;
      left:0;top:0;right:0;bottom:0;
      background: #000;
      text-align: center;
      &:after{
        display: inline-block;
        content: '';
        height:100%;
        width:0;
        vertical-align: middle;
      }
      img{
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
