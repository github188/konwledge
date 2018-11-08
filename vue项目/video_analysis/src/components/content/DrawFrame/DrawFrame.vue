<template>
  <div v-show="show" class="draw-frame-box">
    <div class="canvas-box">
      <canvas id="canvas" ref="canvas" @click="handleCanvasClick"
              @dblclick.native="handleCanvasDbClick(item.id)"></canvas>
      <transition name="fade-in">
        <div v-show="drawRect" id="clear-draw-rect" @click="clearCanvas"><img src="./delete.png"/></div>
      </transition>
    </div>
  </div>
</template>

<script>
  // import $ from 'jquery'

  let distance = null
  let pointArr = []
  let canvas = null
  let index = 0

  let scope = {
    DetectRegion: [],
    videoRegion: {hight: '1280', width: '1920'},
    canvasRegion: {
      width: 0,
      height: 0
    },
    scaleRatio: {},
    boxArr: [],
    lineArr: [],
    paramCol: {
      warningType: '0',
      adTimeType: 'day',
      channelId: '',
      note: '',
      ObjectTypes: [],
      IntrusionRegions: []
    },
    /**
     * 维护设备的时候显示画的框
     * @param {*} arr
     */
    displayFrame: function (arr) {
      drawRange(canvas, arr)
    },
    /**
     * 维护设备的时候显示画的线
     * @param {*} arr
     */
    displayLine: function (arr) {
      drawLine(canvas, arr)
    },
    /**
     *  获取点位放缩比例
     * @param {*} canvasRegion
     * @param {*} videoRegion
     */
    pointForParam: function (canvasRegion, videoRegion) {
      let scaleRatio = {}
      scaleRatio['x'] = (Number(videoRegion.width) / Number(canvasRegion.width)).toFixed(5)
      scaleRatio['y'] = (Number(videoRegion.height) / Number(canvasRegion.height)).toFixed(5)
      return scaleRatio
    },
    /**
     * 保存放大
     * @param {any} arr
     * @param {any} scaleRatio
     */
    scalepoint: function (arr, scaleRatio) {
      arr.forEach(function (v, i) {
        v[0] = Math.round(v[0] * scaleRatio.x)
        v[1] = Math.round(v[1] * scaleRatio.y)
      })
      return arr
    },
    /**
     * 回显缩小
     *
     * @param {any} arr
     * @param {any} scaleRatio
     */
    scalepoint2: function (arr, scaleRatio) {
      arr.forEach(function (v, i) {
        v[0] = Math.round(v[0] / scaleRatio.x)
        v[1] = Math.round(v[1] / scaleRatio.y)
      })
      return arr
    },
    /**
     * 设置canvas 区域大小
     */
    setCanvasRegion: function (e) {
      let canvasBox = e
      scope.canvasRegion.width = canvasBox.parentElement.offsetWidth
      scope.canvasRegion.height = canvasBox.parentElement.offsetHeight
      e.setAttribute('width', canvasBox.parentElement.offsetWidth)
      e.setAttribute('height', canvasBox.parentElement.offsetHeight)
    }
  }

  export default {
    name: 'DrawFrame',
    props: {
      drawFrameLoad: {type: Function, default: function () {}},
      videoRegion: {type: Object, default: function () { return {height: '1280', width: '1920'} }}
    },
    data () {
      return {
        drawRect: false,
        show: true,

        videoInfo: {
          width: '',
          height: ''
        }
      }
    },
    mounted () {
      scope.setCanvasRegion(this.$refs.canvas)
      canvas = this.$refs.canvas
      setTimeout(() => {
        this.drawFrameLoad()
      }, 200)
    },
    methods: {
      open () {
        this.show = true
      },
      close () {
        this.show = false
      },
      // canvas上的点击事件
      handleCanvasClick (e) {
        if (scope.lineArr.length >= 3 || scope.boxArr.length >= 3) {
          this.$message({
            message: '最多设置3条布控区域',
            type: 'warning'
          })
          return
        }

        index++
        let x = e.offsetX
        let y = e.offsetY

        if (scope.paramCol.warningType * 1 === 1) {
          pointArr.push([x, y])
          if (pointArr.length >= 3) {
            // pointArr.pop();
            scope.lineArr.push(pointArr)
            drawLine(canvas, pointArr)
            pointArr = []
            this.drawRect = true
          } else {
            drawLine(canvas, pointArr)
            this.drawRect = false
          }
        } else {
          let arr = [...pointArr]
          arr.push([x, y])
          let xD = Math.abs(arr[0][0] - arr[arr.length - 1][0])
          let yD = Math.abs(arr[0][1] - arr[arr.length - 1][1])
          distance = Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2))
          if (distance < 6 && index > 3) {
            this.connectLine()
          } else {
            pointArr.push([x, y])
            drawLine(canvas, pointArr)
            this.drawRect = false
          }
        }
      },
      handleCanvasDbClick () {
        if (index > 3) {
          this.connectLine()
        }
      },
      connectLine () {
        pointArr.push(pointArr[0])
        pointArr.pop()
        scope.boxArr.push(pointArr)
        drawRange(canvas, pointArr)
        index = 0
        scope.drawabled = false
        scope.DetectRegion = [...pointArr]
        // 获取比例 转换点坐标
        scope.scaleRatio = scope.pointForParam(scope.canvasRegion, this.videoRegion)
        let postData = scope.scalepoint(scope.DetectRegion, scope.scaleRatio)
        this.$emit('reginUpdate', postData)
        pointArr = []
        this.drawRect = true
      },
      clearRect () {
        pointArr = []
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        scope.DetectRegion = []
        this.drawRect = true
      },
      clearCanvas () {
        scope.boxArr = []
        scope.lineArr = []
        this.clearRect()
      },
      handleDrawRectDelet () {

      }
    }
  }

  /**
   *
   * canvas 画框函数
   * @param {any} target
   * @param {any} arr
   */
  function drawLine (target, arr) {
    let xD = Math.abs(arr[0][0] - arr[arr.length - 1][0])
    let yD = Math.abs(arr[0][1] - arr[arr.length - 1][1])
    distance = Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2))
    let ctx = target.getContext('2d')
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    for (let i = 0; i < arr.length - 1; i++) {
      if (scope.paramCol.warningType * 1 === 1 && i === 1) {
        dottedLinTo(ctx, arr[i][0], arr[i][1], arr[i + 1][0], arr[i + 1][1], 5)
      } else {
        // 画线
        ctx.beginPath()
        ctx.strokeStyle = '#1c7dfa'
        ctx.moveTo(arr[i][0], arr[i][1])
        ctx.lineTo(arr[i + 1][0], arr[i + 1][1])
        ctx.stroke()
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (scope.paramCol.warningType * 1 === 1 && i === 2) {
        // 创建image对象
        let imgObj = new Image()
        imgObj.src = '../../img/fx.png'
        // 待图片加载完后，将其显示在canvas上
        imgObj.onload = function () {
          ctx.drawImage(this, arr[2][0] - 14, arr[2][1] - 14)// this即是imgObj,保持图片的原始大小：470*480
        }
      } else {
        // 画圆
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.arc(arr[i][0], arr[i][1], 4, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
      }
    }
  }

  /* 绘制虚线：
   * context 绘制画布环境对象
   * sx 开始位置 - X坐标
   * sy 开始位置 - Y坐标
   * ex 结束位置 - X坐标
   * ey 结束位置 - Y坐标
   * length 虚线的单位长度
   * */
  function dottedLinTo (context, sx, sy, ex, ey, length) {
    let w = ex - sx // 获取线条的水平宽度
    let h = ey - sy // 获取线条的垂直高度
    let l = Math.sqrt(w * w + h * h) // 获取线条的长度
    let index = Math.floor(l / length) // 获取虚线的个数
    // 画线
    context.beginPath()
    context.strokeStyle = '#1c7dfa'
    for (let i = 0; i < index; i++) {
      if (i % 2 === 0) {
        context.moveTo(sx + w / index * i, sy + h / index * i)
      } else {
        context.lineTo(sx + w / index * i, sy + h / index * i)
      }
    }
    context.stroke()
  }

  /**
   *
   * 画范围
   * @param {any} target
   * @param {any} arr
   */
  function drawRange (target, arr) {
    let ctx = target.getContext('2d')
    // ctx.clearRect(0, 0, target.width, target.height);
    ctx.lineWidth = 1
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.strokeStyle = '#fb5533'
    ctx.fillStyle = 'rgba(243,81,48, 0.68)'
    ctx.moveTo(arr[0][0], arr[0][1])
    for (let i = 1; i < arr.length; i++) {
      // 画线
      ctx.lineTo(arr[i][0], arr[i][1])
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
</script>

<style lang="scss" scoped>
  .draw-frame-box {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 1px solid #d4d4d4;
    background: white;
    .canvas-box {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      #canvas {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.1);
        display: inline-block;
        vertical-align: baseline;
        box-sizing: border-box;
      }
      #clear-draw-rect {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        top: 5px;
        cursor: pointer;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
