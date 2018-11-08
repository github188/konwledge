<template>
  <div class="wrapper" :class="className">
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      className:String
    },
    data() {
      return {}
    },
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: $gray;
    .main {
      height: 100%;
      overflow: hidden;
      position: relative;
    }
  }


</style>
