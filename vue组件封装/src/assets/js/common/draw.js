/* eslint-disable */
let $rootScope = {
  getDateStr: function (t, datetime) {
    let tm = t.getMonth() + 1
    if (tm < 10) {
      tm = '0' + tm.toString()
    }
    let day = t.getDate()
    if (day < 10) {
      day = '0' + day.toString()
    }
    let tHour = t.getHours()
    if (tHour < 10) {
      tHour = '0' + tHour.toString()
    }
    let tMinutes = t.getMinutes()
    if (tMinutes < 10) {
      tMinutes = '0' + tMinutes.toString()
    }
    let tSeconds = t.getSeconds()
    if (tSeconds < 10) {
      tSeconds = '0' + tSeconds.toString()
    }
    if (datetime) { return t.getFullYear() + '-' + tm + '-' + day + ' ' + tHour + ':' + tMinutes + ':' + tSeconds } else { return t.getFullYear() + '-' + tm + '-' + day }
  }
}

let endTime = $rootScope.getDateStr(new Date(), 'datetime')
let startTime = endTime.substring(0, 10)
endTime = endTime.substring(0, 10)

let distance = null
let pointArr = []
let canvas = null
let index = 0

let scope = {
  DetectRegion: [],
  videoRegin: {hight: '1280', width: '1920'},
  canvasRegion: {
    width: 0,
    hight: 0
  },
  scaleRatio: {},
  boxArr: [],
  lineArr: [],
  paramCol: {
    warningType: '0',
    adTimeType: 'day',
    channelId: '',
    BeginTime: '',
    EndTime: '',
    Weeks: [1, 2, 3, 4, 5, 6, 7],
    note: '',
    ObjectTypes: [],
    BeginDate: startTime,
    EndDate: endTime,
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
    // let canvasBox = $("#canvas");
    // scope.canvasRegion.width = canvasBox.parent().width();
    // scope.canvasRegion.hight = canvasBox.parent().height();
    // canvasBox[0].setAttribute("width", canvasBox.parent().width());
    // canvasBox[0].setAttribute("height", canvasBox.parent().height());

    let canvasBox = e
    scope.canvasRegion.width = canvasBox.parentElement.offsetWidth
    scope.canvasRegion.hight = canvasBox.parentElement.offsetHeight
    e.setAttribute('width', canvasBox.parentElement.offsetWidth)
    e.setAttribute('height', canvasBox.parentElement.offsetHeight)
  }
}
/**
 *
 * canvas 画框函数
 * @param {any} target
 * @param {any} arr
 */
export const drawLine = function drawLine (target, arr) {
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
export const dottedLinTo = function dottedLinTo (context, sx, sy, ex, ey, length) {
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
export const drawRange = function drawRange (target, arr) {
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
