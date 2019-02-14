<template>
  <div>
    <div class="img-box">
      <img src="./test.png" alt="" v-imglarge>
    </div>
  </div>
</template>

<script>
  import vue from 'vue'
  import imglarge from './index'
  vue.use(imglarge)

  export default {
    name: "appTest"
  }
</script>

<style scoped>
.img-box{
  width:100px;
  height:50px;
  border:1px solid #000;
}
.img-box img{
  width:100%;height:100%;
}

</style>