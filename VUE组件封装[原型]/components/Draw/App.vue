<template>
  <div class="app">
    <draw ref="draw"></draw>
    <div>
      <select v-model="regionSize">
        <option :value="{width: 1920, height: 1080}">宽1920高1080</option>
      </select>
      {{regionSize}}
    </div>
    <button @click="getRegion">getRegion</button>
    <button @click="clearRegion">clearRegion</button>
    <button @click="setRegion">setRegion</button>
    <p>页面区域Region: {{region}}</p>
    <p>原始区域Region: {{originRegion}}</p>
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
        region: [],
        originRegion: [],
        regionSize: {width: 1920, height: 1080}
      }
    },
    mounted() {
      this.region = this.$refs.draw.getRegion()
    },
    methods: {
      getRegion() {
        let region = this.$refs.draw.getRegion()
        this.region = region
        this.originRegion = this.$refs.draw.getRegion(this.regionSize)
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