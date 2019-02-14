<template>
  <div style="width:500px;height:300px;border:1px solid #000;">
    <img-rect :imgInfo="imgInfo" ref="imgRect" @switchRecognize="switchRecognize"></img-rect>
  </div>
</template>

<script>
  import ImgRect from './ImgRect.vue'
  import imgUrl from './test.jpg'
  export default {
    name: "App",
    components: {
      ImgRect
    },
    data(){
      return {
        imgInfo:{
          url: '',        // 图片的url地址
          rect: []      // 画框区域的参数
        }
      }
    },
    mounted(){
      let rect = [
        ["516", "889", "61", "69"],
        ["385", "640", "57", "70"],
        ["399", "748", "62", "80"],
        ["908", "772", "50", "59"]
      ]
      let url = imgUrl
      this.$refs.imgRect.setRecoginze(0)
      this._setImgRect(url, rect)
    },
    methods: {
      _setImgRect(url, rect) {
        this.imgInfo = {
          url: url,        // 图片的url地址
          rect: rect      // 画框区域的参数
        }
      },
      switchRecognize(idx){
        console.log(idx)
      }
    }
  }
</script>

<style scoped>

</style>