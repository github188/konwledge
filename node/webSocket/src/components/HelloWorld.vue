<template>
  <div class="process" >
    <progress max="100" :value="progressValue"></progress>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueSocketio from 'vue-socket.io'
  Vue.use(VueSocketio, 'ws://localhost:8081') // 注意和本地服务器地址及端口一致

  export default {
    data(){
      return{
        progressValue: 0, // 进度值
      }
    },
    //（socket.on）绑定事件放在sockets中
    sockets:{ 
      // 创建连接
      connect(){
          console.log('连接成功啦')
      },
      // 监听自定义progress事件
      progress(res){
        this.progressValue = res;
        console.log('2222',res)
      }
    }
  }
</script>
<style scoped>
  .process { text-align:center; }
</style>