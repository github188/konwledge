<template>
  <a id="player" ref="player">
    视频加载中。。。
  </a>
</template>

<script>
  /* eslint-disable */
  window.config = function () {
    return {
      config: {
        fullInteractive: true, //是否开启交互功能
        delay: 0, //延迟加载视频，单位：毫秒
        timeFrequency: 100, //计算当前播放时间和加载量的时间频率，单位：毫秒
        autoLoad: true, //视频是否自动加载
        loadNext: 0, //多段视频预加载的段数，设置成0则全部加载
        definition: true, //是否使用清晰度组件
        smartRemove: true, //是否使用智能清理，使用该功能则在多段时当前播放段之前的段都会被清除出内存，减少对内存的使用
        bufferTime: window.delay || 300, //缓存区的长度，单位：毫秒,不要小于10
        click: false, //是否支持屏幕单击暂停
        doubleClick: true, //是否支持屏幕双击全屏
        doubleClickInterval: 200, //判断双击的标准，即二次单击间隔的时间差之内判断为是双击，单位：毫秒
        keyDown: {
          space: true, //是否启用空格键切换播放/暂停
          left: true, //是否启用左方向键快退
          right: true, //是否启用右方向键快进
          up: true, //是否支持上方向键增加音量
          down: true //是否支持下方向键减少音量
        },
        timeJump: 10, //快进快退时的秒数
        volumeJump: 0.1, //音量调整的数量，大于0小于1的小数
        timeScheduleAdjust: 1, //是否可调节调节栏,0不启用，1是启用，2是只能前进（向右拖动），3是只能后退，4是只能前进但能回到第一次拖动时的位置，5是看过的地方可以随意拖动
        previewDefaultLoad: true, //预览图片是否默认加载，优点是鼠标第一次经过进度条即可显示预览图片
        promptSpotTime: false, //提示点文字是否在前面加上对应时间
        buttonMode: {
          player: false, //鼠标在播放器上是否显示可点击形态
          controlBar: false, //鼠标在控制栏上是否显示可点击形态
          timeSchedule: true, //鼠标在时间进度条上是否显示可点击形态
          volumeSchedule: true //鼠标在音量调节栏上是否显示可点击形态
        },
        liveAndVod: { //直播+点播=回播功能
          open: false, //是否开启，开启该功能需要设置flashvars里live=true
          vodTime: 2, //可以回看的整点数
          start: 'start' //回看请求参数
        },
        errorNum: 3000, //错误重连次数
        playCorrect: true, //是否需要错误修正，这是针对rtmp的
        timeCorrect: true, //http视频播放时间错误纠正，有些因为视频格式的问题导致视频没有实际播放结束视频文件就返回了stop命令
        m3u8Definition: { //m3u8自动清晰度时按关键字来进行判断
          //tags:['200k','110k','400k','600k','1000k']
        },
        m3u8MaxBufferLength: 30, //m3u8每次缓冲时间，单位：秒数
        split: ',', //当视频地址采用字符形式并且需要使用逗号或其它符号来切割数组里定义
        timeStamp: '', //一个地址，用来请求当前时间戳，用于播放器内部时间效准
        addCallback: 'adPlay,adPause,playOrPause,videoPlay,videoPause,videoMute,videoEscMute,videoClear,changeVolume,fastBack,fastNext,videoSeek,newVideo,getMetaDate,videoRotation,videoBrightness,videoContrast,videoSaturation,videoHue,videoZoom,videoProportion,videoError,addListener,removeListener,addElement,getElement,deleteElement,animate,animateResume,animatePause,deleteAnimate,changeConfig,getConfig,openUrl,fullScreen,quitFullScreen,switchFull,screenshot,custom,changeControlBarShow,getCurrentSrc'
        //需要支持的事件
      }
    };
  }
  window.ckPlayerService = null;
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
        player: null,
        ckPlayerService: null,
        videoInfo: {
          width: 0,
          height: 0
        }
      }
    },
    watch: {
      videoUrl (newValue, oldValue) {
        console.log(newValue, "视频地址")
        var ckPlayerService = null;
        ckPlayerService = function (id, url, live) {
          var videoObject = {
            container: ('#' + id), //容器的ID或className
            variable: 'player',//播放函数名称
            loaded: 'loadedHandler',
            flashplayer: false,
            autoplay: true,
            poster: 'material/poster.jpg',//封面图片
            video: url,
            live: live,
            config:'config'
          };
          var player = new ckplayer(videoObject);
        }
        ckPlayerService('player', newValue, true)
      }
    },
    mounted () {
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
