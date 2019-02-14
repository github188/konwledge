export default class Editor {
  constructor ({
                 canvas,
                 warningType,
                 regionType
               }) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.warningType = warningType
    this.regionType = regionType

    this.DetectRegion = []
    // this.drawabled = false;
    this.canvasRegion = {
      width: 0,
      height: 0
    }
    this.scaleRatio = {}
    this.distance = null
    this.pointArr = []
    this.boxArr = []
    this.lineArr = []
    this.currentPoint = []
    this.index = 0

    this.onClick = this.onClick.bind(this)
    this.ondbclick = this.ondbclick.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)

    this.canvas.onclick = this.onClick
    this.canvas.ondblclick = this.ondbclick
    this.canvas.onmousemove = this.onMouseMove

    this.setCanvasRegion()
  }

  onClick (e) {
    var x = e.offsetX
    var y = e.offsetY
    this.currentPoint = [x, y]
    // 如果点击了删除
    var deleteNum = this.PointInDelete(this.currentPoint, this.boxArr)
    if (deleteNum) {
      this.boxArr.splice(deleteNum - 1, 1)
      this.clearRect()
      for (var j = 0; j < this.boxArr.length; j++) {
        this.displayFrame(this.boxArr[j])
      }
      return
    }
    // 如果点击了区域
    if (this.PointInPolyArr(this.currentPoint, this.boxArr) && this.warningType == 2) {
      this.clearRect()
      for (var j = 0; j < this.boxArr.length; j++) {
        this.displayFrame(this.boxArr[j])
      }
    } else {
      this.index++
      if (this.warningType == 1) { // 画越界线
        this.pointArr.push([x, y])
        if (this.pointArr.length >= 3) {
          // pointArr.pop();
          this.boxArr.push(this.pointArr)
          this.drawLine(this.canvas, this.pointArr)
          this.pointArr = []
        } else {
          this.drawLine(this.canvas, this.pointArr)
        }
      } else { // 画多边形
        var arr = Object.assign([], this.pointArr, true)
        arr.push([x, y])
        var xD = Math.abs(arr[0][0] - arr[arr.length - 1][0])
        var yD = Math.abs(arr[0][1] - arr[arr.length - 1][1])
        this.distance = Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2))
        if (this.distance < 6 && this.index > 3) {
          this.connectLine()
        } else {
          this.pointArr.push([x, y])
          this.clearRect()
          this.drawLine(this.canvas, this.pointArr)
          for (var i = 0; i < this.boxArr.length; i++) {
            this.displayFrame(this.boxArr[i])
          }
        }
      }
    }
    console.log(this)
    console.log(e)
    console.log(this.onmousemove)
    // e.target.onmousemove = function
  }

  onMouseMove (e) {
    if (!this.pointArr || this.pointArr.length <= 0) {
      return
    }
    ;
    var x = e.offsetX
    var y = e.offsetY
    this.pointArr.push([x, y])
    this.clearRect()
    for (var i = 0; i < this.boxArr.length; i++) {
      this.displayFrame(this.boxArr[i])
    }
    this.drawLine(this.canvas, this.pointArr, true)
    // console.log(pointArr);
    // drawLine(canvas, pointArr);
    this.pointArr.pop()
  }

  // 闭合多边形执行函数
  connectLine () {
    var arr = Object.assign([], this.pointArr[0])
    // 这里设置第一个点做显示那种类型的多边形，回显多边形时要用
    if (this.regionType == 1) {
      arr[0] = arr[0] + 1
    }
    if (this.regionType == 2) {
      arr[0] = arr[0] + 2
    }
    if (this.regionType == 3) {
      arr[0] = arr[0] + 3
    }
    this.pointArr.push(arr)
    this.boxArr.push(this.pointArr)
    console.log(this.boxArr)
    this.drawLine(this.canvas, this.pointArr)
    this.drawRange(this.canvas, this.pointArr)
    this.index = 0
    this.drawabled = false
    // this.DetectRegion = Object.assign([], this.pointArr);
    // 获取比例 转换点坐标
    // this.scaleRatio = this.getScaleRatio(this.canvasRegion, this.videoRegin);
    // this.scalepoint(this.DetectRegion, this.scaleRatio);
    this.pointArr = []
  }

  // 判断当前点击的点是否在删除按钮上,返回点击的多边形下标,参数:点数组,多边形数组
  PointInDelete (currentPoint, boxArr) {
    if (!currentPoint || currentPoint.length <= 0) {
      return
    }
    var arr = []
    var cha = 20
    for (var i = 0; i < boxArr.length; i++) {
      arr.push([[boxArr[i][0][0] - cha, boxArr[i][0][1] - cha], [boxArr[i][0][0] + cha, boxArr[i][0][1] - cha], [boxArr[i][0][0] + cha, boxArr[i][0][1] + cha], [boxArr[i][0][0] - cha, boxArr[i][0][1] + cha]])
    }
    return this.PointInPolyArr(currentPoint, arr)
  }

  // 判断当前点击的点是否在多个多边形里,返回点击的多边形下标,参数:点数组,多边形数组
  PointInPolyArr (currentPoint, boxArr) {
    if (!currentPoint || currentPoint.length <= 0) {
      return
    }
    var flag = 0
    for (var i = 1; i <= boxArr.length; i++) {
      if (flag) {
        break
      }
      if ((boxArr.length > 0 && this.PointInPoly(currentPoint, boxArr[i - 1]))) {
        flag = i
      }
    }
    return flag
  }

  // 计算一个点是否在单个多边形里,参数:点数组,多边形数组
  PointInPoly (pt, poly) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
      ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1])) &&
      (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) &&
      (c = !c)
    }
    return c
  }

  ondbclick (e) {
    if (this.index > 3) {
      this.currentPoint = []
      // 因为双击会多添加一个点，因此要删除一个
      this.pointArr.splice(this.pointArr.length - 2, 1)
      this.connectLine()
    }
  }

  /**
   * 清除画框
   */
  clearRect () {
    // pointArr = [];
    var ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.DetectRegion = []
  }
  /* 绘制虚线：
  * context 绘制画布环境对象
  * sx 开始位置 - X坐标
  * sy 开始位置 - Y坐标
  * ex 结束位置 - X坐标
  * ey 结束位置 - Y坐标
  * length 虚线的单位长度
  * */
  dottedLinTo (context, sx, sy, ex, ey, length) {
    var w = ex - sx // 获取线条的水平宽度
    var h = ey - sy // 获取线条的垂直高度
    var l = Math.sqrt(w * w + h * h) // 获取线条的长度
    var index = Math.floor(l / length) // 获取虚线的个数
    // 画线
    context.beginPath()
    context.strokeStyle = '#1c7dfa'
    for (var i = 0; i < index; i++) {
      if (i % 2 == 0) {
        context.moveTo(sx + w / index * i, sy + h / index * i)
      } else {
        context.lineTo(sx + w / index * i, sy + h / index * i)
      }
    }
    context.stroke()
  }

  /**
   *
   * canvas 画框函数
   * @param {any} target
   * @param {any} arr
   */
  drawLine (target, arr, isMouseMove) {
    if (!arr || arr.length <= 0) {
      return
    }
    var xD = Math.abs(arr[0][0] - arr[arr.length - 1][0])
    var yD = Math.abs(arr[0][1] - arr[arr.length - 1][1])
    this.distance = Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2))
    var ctx = target.getContext('2d')
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    var dashLen = 5// 虚线的单位长度
    for (var i = 0; i < arr.length - 1; i++) {
      if (this.warningType == 1 && i == 1) {
        this.dottedLinTo(ctx, arr[i][0], arr[i][1], arr[i + 1][0], arr[i + 1][1], dashLen)
      } else {
        // 画线
        ctx.beginPath()
        ctx.strokeStyle = '#1c7dfa'
        ctx.moveTo(arr[i][0], arr[i][1])
        ctx.lineTo(arr[i + 1][0], arr[i + 1][1])
        ctx.stroke()
      }
    }
    for (var i = 0; i < arr.length; i++) {
      if (this.warningType == 1 && i == 2) {
        // 创建image对象
        var img = document.getElementById('pic-fx')
        // 待图片加载完后，将其显示在canvas上
        ctx.drawImage(img, arr[2][0] - 14, arr[2][1] - 14)// this即是imgObj,保持图片的原始大小：470*480
      } else if (this.warningType == 2 && this.distance <= 6 && i > 2 && !isMouseMove) {
        // 创建image对象
        var img = document.getElementById('pic-delete')
        // var imgObj = new Image();
        // imgObj.src = "../../img/delete2.png";
        // //待图片加载完后，将其显示在canvas上
        // imgObj.onload = function () {
        ctx.drawImage(img, arr[0][0] - 12, arr[0][1] - 12)// this即是imgObj,保持图片的原始大小：470*480
        // }
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

  /**
   *
   * 画范围
   * @param {any} target
   * @param {any} arr
   */
  drawRange (target, arr) {
    var ctx = target.getContext('2d')
    // ctx.clearRect(0, 0, target.width, target.height);
    ctx.lineWidth = 1
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.strokeStyle = '#fb5533'
    if (!this.regionType) {
      if (this.PointInPoly(this.currentPoint, arr)) {
        ctx.fillStyle = 'rgba(243,81,48, 0.8)'
      } else {
        ctx.fillStyle = 'rgba(243,81,48, 0.6)'
      }
    } else if (arr[arr.length - 1][0] - arr[0][0] == 0 || arr[arr.length - 1][0] - arr[0][0] == 1) {
      if (this.PointInPoly(this.currentPoint, arr)) {
        ctx.fillStyle = 'rgba(0,128,0, 0.8)'
      } else {
        ctx.fillStyle = 'rgba(0,128,0, 0.6)'
      }
    } else if (arr[arr.length - 1][0] - arr[0][0] == 2) {
      if (this.PointInPoly(this.currentPoint, arr)) {
        ctx.fillStyle = 'rgba(243,81,48, 0.8)'
      } else {
        ctx.fillStyle = 'rgba(243,81,48, 0.6)'
      }
    } else if (arr[arr.length - 1][0] - arr[0][0] == 3) {
      if (this.PointInPoly(this.currentPoint, arr)) {
        ctx.fillStyle = 'rgba(255,255,0, 0.8)'
      } else {
        ctx.fillStyle = 'rgba(255,255,0, 0.6)'
      }
    }
    ctx.moveTo(arr[0][0], arr[0][1])
    for (var i = 1; i < arr.length; i++) {
      // 画线
      ctx.lineTo(arr[i][0], arr[i][1])
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  /**
   * 维护设备的时候显示画的框 --- 显示单个框数组对应的区域
   * @param {*} arr
   */
  displayFrame (arr) {
    this.drawLine(this.canvas, arr)
    if (this.warningType == '2') {
      this.drawRange(this.canvas, arr)
    }
  }

  /**
   * 维护设备的时候显示画的线
   * @param {*} arr
   */
  displayLine (arr) {
    this.drawLine(this.canvas, arr)
  }

  /**
   * 设置canvas 区域大小
   */
  setCanvasRegion () {
    this.canvasRegion.width = this.canvas.parentElement.offsetWidth
    this.canvasRegion.height = this.canvas.parentElement.offsetHeight
    this.canvas.setAttribute('width', this.canvasRegion.width)
    this.canvas.setAttribute('height', this.canvasRegion.height)
  }


  /**
   *  获取点位放缩比例
   * @param {*} canvasRegion
   * @param {*} originReion
   */
  getScaleRatio (originReion) {
    let canvasRegion = {
      width: this.canvas.parentElement.offsetWidth,
      height: this.canvas.parentElement.offsetHeight
    }
    return {
      x: (Number(originReion.width) / Number(canvasRegion.width)).toFixed(5),
      y: (Number(originReion.height) / Number(canvasRegion.height)).toFixed(5)
    }
  }

  /**
   * 将页面区域数组缩放为（视频/图片上的）原始区域数组
   * @param canvasArr 页面区域canvas画框数组
   * @param originReion 缩放比例
   * @returns {*} （视频/图片上的）原始区域数组
   */
  getOriginRegion (canvasArr, originReion) {
    let scaleRatio = this.getScaleRatio(originReion)
    return canvasArr.map(val => {
      return val.map(item => {
        return [Math.round(item[0] * scaleRatio.x), Math.round(item[1] * scaleRatio.y)]
        // val[0] = Math.round(val[0] * scaleRatio.x)
        // val[1] = Math.round(val[1] * scaleRatio.y)
      })
    })

    // return canvasArr
  }

  /**
   * 将（视频/图片上的）原始区域数组设置为canvas显示区域数组
   * @param originArr 原始区域数组
   * @param originSize  原始区域的宽高对象 eg: {width: 1920, height: 1080}
   * @returns {*} canvas显示区域数组
   */
  getCanvasRegion (originArr, originSize) {
    let scaleRatio = this.getScaleRatio(originSize)
    let arr = originArr.map(item => {
      return item.map(val => {
        let baseArr = []
        baseArr[0] = Math.round(val[0] / scaleRatio.x)
        baseArr[1] =  Math.round(val[1] / scaleRatio.y)
        return baseArr
      })
    })
    return arr
  }

  // 以下为提供给外部调用的方法
  /**
   * 获取画框的数据: 带参数则返回缩放后的区域数组；否则返回实际区域数组
   * ps： 判断是否需要缩放取决于设置区域的时候是否有挂originSize
   * @returns {Array|*}
   */
  getRegion (originSize) {
    return originSize ? this.getOriginRegion(this.boxArr, originSize) : this.boxArr
  }

  /**
   * 清除画框区域
   */
  clearRegion () {
    this.boxArr = []
    this.lineArr = []
    this.clearRect()
  }

  /**
   * 设置画框区域：传originSize时，自动将（视频/图片上的）原始区域数组缩放为canvas区域数组再设置canvas区域；否则直接设置canvas区域
   * @param originArr （视频/图片上的）原始区域数组
   * @param originSize  原始区域的宽高对象 eg: {width: 1920, height: 1080}
   */
  setRegion (originArr, originSize) { // 设置画框区域和数据
    if (originArr.length === 0) { return }
    this.boxArr = originSize ? this.getCanvasRegion(originArr, originSize) : originArr
    this.boxArr.forEach(val => {
      this.displayFrame(val)
    })
  }
}
