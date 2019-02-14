<template>
  <div class="img-r-g img-glass img-rect-comp" @mousemove="handleMousemove($event)" @mousewheel="handleMousewheel($event)" ref="imgContainer">
    <img :src="imgInfo.url" alt="" ref="mainImg">
    <!--<div class="img-replace" @mousemove="handleMousemove($event)" @mousewheel="handleMousewheel($event)"></div>-->
    <div class="glass-box" :style="{width:mirrorWidth+'px',height:mirrorHeight+'px'}">
      <img :src="imgInfo.url" alt="" ref="mirrorImg" :style="{transformOriginX: mx+'px',transformOriginY: my+'px',transform: 'scale('+zoomTimes+')'}">
    </div>
    <i v-for="(item,idx) in scaleRect"
       :style="{position: 'absolute',left: item[0]+'px',top:item[1]+'px',width:item[2]+'px',height:item[3]+'px'}"
       @click="switchRecognize(idx)"
       :class="ctnRecognize === idx ? 'i-active': ''"
       class="img-rect">
    </i>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "imgGlass",
    props: {
      imgInfo: {require: true}
    },
    data(){
      return {
        mirrorWidth: 0, // 放大镜宽度
        mirrorHeight: 0,   // 放大镜高度
        mx: 0,  // 放大の中心点 x
        my: 0,  // 放大の中心点 y
        zoomTimes: 15,
        /**画区域相关参数**/
        scaleRect: [], // 显示时使用的rect
        ctnRecognize: 0,
      }
    },
    watch: {
      imgInfo(nVal, oVal){
        const img = this.$refs.mainImg
        if(img){
          img.onload = ()=>{
            this.tranRect(nVal, img)
          }
        } else {
          this.$nextTick(t=>{
            img.onload = ()=>{
              this.tranRect(nVal, img)
            }
          })
        }
      }
    },
    mounted(){

    },
    methods: {
      handleMousemove(e) {
        const {pageX, pageY} = e;
        let imgContainer = this.$refs.imgContainer.getBoundingClientRect()
        let offsetX = pageX - imgContainer.x
        let offsetY = pageY - imgContainer.y

        const mainImg = this.$refs.mainImg;// 主展示图片，最大的那张

        if (!mainImg) {
          return;
        }
        const naturalPro = mainImg.naturalWidth / mainImg.naturalHeight;// 原始图片宽高比例
        const currentPro = mainImg.width / mainImg.height;// 主展示图片比例

        if (isNaN(naturalPro)) {
          return;
        }
        this.mirrorWidth = 400;// 放大的区域宽度
        this.mirrorHeight = 400 / naturalPro;// 放大的区域高度

        const mirrorImg = this.$refs.mirrorImg;// 放大区域

        if (currentPro > naturalPro) {
          const overWidth = (mainImg.width - mainImg.height * naturalPro) / 2;// 图片居中导致两边留白，此处去除左右留白之影响。
          const scaleX = (mirrorImg.width) / (mainImg.height * naturalPro); // 主展示图片与放大区域的宽度比例
          const scaleY = (mirrorImg.height) / mainImg.height;// 主展示图片与放大区域的高度比例

          this.mx = (offsetX - overWidth) * scaleX;// 放大之中心点X
          this.my = (offsetY) * scaleY;// 放大之中心点Y
        } else {
          const overHeight = (mainImg.height - mainImg.width / naturalPro) / 2;// 图片居中导致两边留白，此处去除上下留白之影响。
          const scaleX = (mirrorImg.width) / (mainImg.width); // 主展示图片与放大区域的宽度比例
          const scaleY = (mirrorImg.height) / (mainImg.width / naturalPro);// 主展示图片与放大区域的高度比例

          this.mx = (offsetX) * scaleX;// 放大之中心点X
          this.my = (offsetY - overHeight) * scaleY;// 放大之中心点Y
        }
      },
      handleMousewheel(e) {
        const {wheelDelta} = e;
        // wheelDelta 正代表向上滚动，负代表向下滚动
        // 放大倍数为1~35倍

        if (wheelDelta > 0) {
          this.zoomTimes *= 1.5;
        } else if (wheelDelta < 0 && this.zoomTimes > 1) {
          this.zoomTimes *= 0.5;
        }
        if (this.zoomTimes > 35) {
          this.zoomTimes = 35;
        } else if (this.zoomTimes < 1) {
          this.zoomTimes = 1;
        }
      },
      /*画区域相关函数 start*/
      tranRect(imgInfo, img){
        // 功能：转换rect数组,设置 scaleRect
        let {rect} = imgInfo
        if(rect.length===0){
          this.scaleRect = rect
        }else{
          let {width,height,originWidth,originHeight} = this.getOriginSize(img);
          let scaleRect = rect.map(val => {
            return val.map((item,idx)=>{
              if(idx===0 || idx === 2){
                return (item/originWidth)*width
              } else{
                return (item/originHeight)*height
              }
            })
          });
          this.scaleRect = scaleRect
        }
      },
      getOriginSize(target){
        let width =  target.offsetWidth;
        let height =  target.offsetHeight;
        target.style.width = 'auto';
        target.style.height = 'auto';
        let originWidth = target.offsetWidth;
        let originHeight = target.offsetHeight;
        target.style.width = width+ 'px';
        target.style.height = height + 'px';
        return {
          width,height,originWidth,originHeight
        };
      },
      switchRecognize(idx){
        this.ctnRecognize = idx
        this.$emit('switchRecognize', idx)
      },
      setRecoginze(idx){
        this.ctnRecognize = idx
      }
      /*画区域相关函数 end*/
    }
  }
</script>

<style scoped>
  .img-r-g{
    position: relative;
    width:100%;height:100%;
  }
  .img-glass img{
    width:100%;height:100%;
  }
  .img-replace{
    position: absolute;
    left:0;top:0;right:0;bottom:0;
    opacity: 0;
    z-index:10;
  }

  .glass-box {
    overflow: hidden;
  }

  .glass-box img {
    width: 100%;
    height: 100%;
  }
</style>
<style scoped>
  .img-rect-comp {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .img-rect-comp i.img-rect{
    border:1px solid blue;
  }
  .img-rect-comp i.img-rect.i-active{
    border-color:red;
    background-color: rgba(255,255,255, .5)
  }
  .img-rect-comp img {
    width: 100%;
    height: 100%;
  }
</style>