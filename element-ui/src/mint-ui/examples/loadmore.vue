<template>
  <div class="">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="item in list">{{ item.text }}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[
          {id:0,text:"测试0"},{id:1,text:"测试1"},{id:2,text:"测试2"},{id:3,text:"测试3"},{id:4,text:"测试4"},{id:0,text:"测试0"},{id:1,text:"测试1"},{id:2,text:"测试2"},{id:3,text:"测试3"},{id:4,text:"测试4"},
        ],
        allLoaded:false
      }
    },
    created() {

    },
    methods: {
      loadTop(){
        console.log("loadTop");
        console.log(this.allLoaded );
        setTimeout(()=>{
          this.$refs.loadmore.onTopLoaded();
        },2000)
      },
      loadBottom(){
        console.log("loadBottom");
        setTimeout(()=>{
          this.allLoaded = true;
          this.$refs.loadmore.onBottomLoaded();
        },2000)
//        this.allLoaded = true;// 若数据已全部获取完毕
      }
    }
  }
</script>

<style lang="scss" scoped>
ul{
  li{
    height:60px;background: yellowgreen;margin-bottom: 10px;
  }
}
</style>
