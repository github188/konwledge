<template>
  <div style="margin:50px auto">
    <div class="img-box">
      <img-r-g :imgInfo="imgInfo" ref="imgRG"></img-r-g>
    </div>
  </div>
</template>

<script>
  import ImgRG from './ImgRG'
  import imgUrl from './test.jpg'
  export default {
    name: "appTest",
    components: {
      ImgRG
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
      // this.$refs.imgRG.setRecoginze(0)
      this.imgInfo = {url, rect}
    },
  }
</script>

<style scoped>
  .img-box{
    width:500px;height:300px;border:1px solid #000;
    margin:50px auto;
  }
</style>