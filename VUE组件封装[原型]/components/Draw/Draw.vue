<template>
  <div class="draw-box">
    <canvas id="canvas"></canvas>
    <img src="./img/delete.png" id="pic-delete" style="display:none"/>
    <img src="./img/fx.png" id="pic-fx" style="display:none"/>
  </div>
</template>
<script>
  import Draw from './Draw.js'

  export default {
    name: 'Draw',
    props: {
      warningType: {type: Number, default: 2},
      regionType: {type: Number, default: 1},
      originRegion: {
        type: Object, default: () => {
          return {width: 0, height: 0}
        }
      }
    },
    components: {},
    data() {
      return {
        draw: {type: Object, default: null}
      }
    },
    methods: {
      getRegion() {//获取画框的数据
        return this.draw.getRegion();
      },
      clearRegion() {
        this.draw.clearRegion()
      },
      setRegion(boxArr, originRegion) {//设置画框的数据
        this.draw.setRegion(boxArr, originRegion)
      },
      setRegionType(type) {//获取画框的数据
        this.draw.regionType = type;
      },
    },
    mounted() {
      let _this = this
      this.draw = new Draw({
        canvas: document.getElementById('canvas'),
        warningType: _this.warningType, //1:越界线  2：画框
        regionType: _this.regionType //1:检测区域  2 否定区域
      })
    }
  }
</script>

<style scoped>
  .draw-box {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
</style>
