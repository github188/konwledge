<template>
  <div class="template">
    快速原型开发 <span>好牛逼</span>
    <!--数字滚动组件-->
    <div class="num-rolling components">
      <num-roll :num="num"></num-roll>
      <br>
      <num-roll :num="num" type="title"></num-roll>
      <button @click="addNum">addNum</button>
      <button @click="removeNum">removeNum</button>
    </div>

    <!--画框组件-->
    <div class="draw components">
      <draw ref="draw"></draw>
      <button @click="getRegion">getRegion</button>
      <button @click="clearRegion">clearRegion</button>
      <button @click="setRegion">setRegion</button>
      <p>区域Region: {{region}}</p>
      <p>区域数量： {{region.length}}</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: "appMain",
    data() {
      return {
        num: 0,
        region: []
      }
    },
    computed: {
      numList() {
        let {num} = this
        return String(num).split('')
      }
    },
    methods: {
      addNum() {
        // this.num = '8'
        this.num = this.num + 1234567
      },
      removeNum() {
        this.num--;
      },
      getRegion() {
        let region = this.$refs.draw.getRegion()
        this.region = region
      },
      clearRegion() {
        this.$refs.draw.clearRegion()
      },
      setRegion() {
        let boxArr = [
          [[147, 230], [358, 166], [284, 345], [148, 230]],
          [[78, 347], [178, 337], [118, 412], [79, 347]]
        ]
        let originRegion = {width: 1920, height: 1080}
        this.$refs.draw.setRegion(boxArr, originRegion)
      }
    }
  }
</script>

<style scoped>
  .template {
    color: red;
  }
  .components{
    width: 500px;
    height: 300px;
    border: 1px solid #000;
    margin: 5px;
  }

</style>
