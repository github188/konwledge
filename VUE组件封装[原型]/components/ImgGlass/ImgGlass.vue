<template>
  <div class="img-glass">
    <img :src="imgUrl" alt="" ref="mainImg" @mousemove="handleMousemove($event)" @mousewheel="handleMousewheel($event)">
    <!--<div class="img-replace" @mousemove="handleMousemove($event)" @mousewheel="handleMousewheel($event)"></div>-->
    <div class="glass-box" :style="{width:mirrorWidth+'px',height:mirrorHeight+'px'}">
      <img :src="imgUrl" alt="" ref="mirrorImg" :style="{transformOriginX: mx+'px',transformOriginY: my+'px',transform: 'scale('+zoomTimes+')'}">
    </div>
  </div>
</template>

<script>
  export default {
    name: "imgGlass",
    props: {
      imgUrl: {require: true}
    },
    data(){
      return {
        mirrorWidth: 0,
        mirrorHeight: 0,
        mx: 0,
        my: 0,
        zoomTimes: 15,
      }
    },
    methods: {
      handleMousemove(e) {
        const {offsetX, offsetY} = e;
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
    }
  }
</script>

<style scoped>
  .img-glass {
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