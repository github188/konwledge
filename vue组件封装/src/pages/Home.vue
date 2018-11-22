<template>
  <el-container class="home">
    <el-header class="home-header">
      <router-view name="header"></router-view>
    </el-header>
    <el-container class="home-container">
      <router-view></router-view>
    </el-container>
  </el-container>
</template>


<script>
  export default {
    name: 'Home',
    data () {
      return {

      }
    },
    created () {

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
.home{
  min-height:100vh;
  .home-header{
    background: yellowgreen;
  }
  .home-container{
    background: #0080d1;
  }
  .home-aside{
    background: #1F6B75;
    .box{   
      color:red;
    }
  }
  .home-main{
    background: #4a4a4a;
  }
}

</style>
