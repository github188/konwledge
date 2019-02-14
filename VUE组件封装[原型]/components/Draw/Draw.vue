<template>
  <div class="draw-box">
    <canvas id="canvas"></canvas>
    <img id="pic-delete" src="./img/delete.png" style="display:none"/>
    <img id="pic-fx" src="./img/fx.png" style="display:none"/>
  </div>
</template>
<script>
  import Draw from './Draw'

  export default {
    components: {},
    props: {
      warningType: {type: Number, default: 2},
      regionType: {type: Number, default: 1},
      originRegion: {
        type: Object,
        default: () => {
          return {width: 0, height: 0}
        }
      }
    },
    data () {
      return {
        draw: {type: Object, default: null}
      }
    },
    mounted () {
      let _this = this
      this.draw = new Draw({
        canvas: document.getElementById('canvas'),
        warningType: _this.warningType, // 1:越界线  2：画框
        regionType: _this.regionType // 1:检测区域  2 否定区域
      })
    },
    methods: {
      getRegion (originSize) { // 获取画框的数据
        return this.draw.getRegion(originSize)
      },
      clearRegion () {
        this.draw.clearRegion()
      },
      setRegion (originArr, originRegion) { // 设置画框的数据
        this.draw.setRegion(originArr, originRegion)
      },
      setRegionType (type) { // 获取画框的数据
        this.draw.regionType = type
      }
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
