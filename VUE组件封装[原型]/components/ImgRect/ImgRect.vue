<template>
  <div class="img-rect-comp">
    <i v-for="(item,idx) in scaleRect"
       :style="{position: 'absolute',left: item[0]+'px',top:item[1]+'px',width:item[2]+'px',height:item[3]+'px'}"
       @click="switchRecognize(idx)"
       :class="ctnRecognize === idx ? 'i-active': ''"
       class="img-rect">
    </i>
    <img :src="imgInfo.url" alt="图片加载失败" ref="img">
  </div>
</template>

<script>
  /**
   * 数据形式示例
   * rect : [
   *    [200,300,160,160]  横/纵坐标，宽高
   * ]
   */

  export default {
    name: "ImgRect",
    props: {
      imgInfo: {
        type: Object,
        default: () => {
          return {
            url: '',        // 图片的url地址
            rect: []      // 画框区域的参数
          }
        }
      }
    },
    data(){
      return {
        scaleRect: [], // 显示时使用的rect
        ctnRecognize: 0
      }
    },
    watch: {
      imgInfo(nVal, oVal){
        const img = this.$refs.img
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
    computed: {

    },
    methods: {
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
    }
  }
</script>

<style scoped>
  .img-rect-comp {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .img-rect-comp i.img-rect{
    border:1px solid blue;
  }
  .img-rect-comp i.img-rect.i-active{
    border-color:red
  }
  .img-rect-comp img {
    width: 100%;
    height: 100%;
  }
</style>