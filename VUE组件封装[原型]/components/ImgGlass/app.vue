<template>
  <div>
    <div class="img-box">
      <img-glass :imgUrl="imgUrl"></img-glass>
    </div>
  </div>
</template>

<script>
  import imgUrl from './test.jpg'
  import imgGlass from './imgGlass.vue'
  export default {
    name: "appTest",
    components: {
      imgGlass
    },
    props: {

    },
    data(){
      return {
        imgUrl: imgUrl,
      }
    },
  }
</script>

<style scoped>
  .img-box{
    width:500px;height:300px;border:1px solid #000;
    margin:50px auto;
  }

</style>