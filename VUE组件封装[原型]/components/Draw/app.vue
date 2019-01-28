<template>
  <div class="app">
    <draw ref="draw"></draw>
    <button @click="getRegion">getRegion</button>
    <button @click="clearRegion">clearRegion</button>
    <button @click="setRegion">setRegion</button>
    <p>区域Region: {{region}}</p>
    <p>区域数量： {{region.length}}</p>
  </div>
</template>

<script>
  import Draw from './Draw.vue'

  export default {
    name: "app.vue",
    components: {
      Draw
    },
    data() {
      return {
        region: []
      }
    },
    mounted() {
      this.region = this.$refs.draw.getRegion()
    },
    methods: {
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
  .app {
    width: 500px;
    height: 500px;
    background-color: #2a2a2a;
  }
</style>