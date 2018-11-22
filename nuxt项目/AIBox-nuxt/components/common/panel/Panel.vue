<template>
  <div ref="panel" class="panel">
    <slot></slot>
  </div>
</template>
<script>
  // const elTransition = '0.3s height ease-in-out'
  export default {
    props: {
      flag: {required: true},
      change: {},
      initHeight: {type: String || Number}
    },
    mounted () {
      this.$watch('flag', (newVal) => {
        if (!newVal) {
          this.$refs.panel.style.height = '0px'
          this.$refs.panel.style.opacity = '0'
        } else {
          this.changeH()
        }
      }, {immediate: true})
      this.$watch('change', (newVal) => {
        if (newVal && this.flag) {
          this.changeH()
        }
      }, {deep: true})
    },
    methods: {
      changeH () {
        let oldHeight = this.$refs.panel.getBoundingClientRect().height
        this.$refs.panel.style.height = 'auto'
        let height = 0
        if (this.initHeight) {
          height = parseInt(this.initHeight)
        } else {
          height = this.$refs.panel.getBoundingClientRect().height
        }
        this.$refs.panel.style.height = oldHeight + 'px'
        let f = document.body.offsetHeight; // eslint-disable-line
        this.$refs.panel.style.opacity = height ? '1' : '0'
        this.$refs.panel.style.height = height + 'px'
      }
    }
  }
</script>

<style>
  .panel{
    overflow: hidden;
    opacity: 0;
    transition: height .5s, opacity .5s;
  }
</style>
