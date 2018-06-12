<template>
  <loadmore-copy :topMethod="topMethod" :bottomMethod="bottomMethod">
    <ul>
      <li v-for="item in list">{{ item.text }}</li>
    </ul>
  </loadmore-copy>
</template>

<script>
  import LoadmoreCopy from "./LoadmoreCopy.vue"

  export default {
    components:{
      LoadmoreCopy
    },
    data() {
      return {
        topDropped: false,
        bottomDropped: false,
        list: [
          {id: 0, text: "测试0"}, {id: 1, text: "测试1"}, {id: 2, text: "测试2"}, {id: 3, text: "测试3"}, {
            id: 4,
            text: "测试4"
          }, {id: 0, text: "测试0"}, {id: 1, text: "测试1"}, {id: 2, text: "测试2"}, {id: 3, text: "测试3"}, {
            id: 4,
            text: "测试4"
          }
        ],
      }
    },
    created() {

    },
    methods: {
      topMethod(){

      },
      bottomMethod(){

      }
    }
  }
</script>

<style>
  * {
    backface-visibility: hidden;
  }

  body, html {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
</style>
<style lang="scss" scoped>
  .mint2-loadmore {
    overflow: hidden;
  }

  .mint2-loadmore-content {

  }
</style>
<style lang="scss" scoped>
  ul {
    li {
      height: 60px;
      background: yellowgreen;
      margin-bottom: 10px;
    }
  }
</style>
