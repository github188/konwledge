<template>
  <div class="limit-coverage">
    <span class="label">赔偿限额</span>
    <span class="coverage br" :class="value===1500000?'bechose':''" @click="$emit('input',1500000)">150万</span>
    <span class="coverage" :class="value===500000?'bechose':''" @click="$emit('input',500000)">50万</span>
  </div>
</template>

<script>
  export default {
    props:{
      value:Number
    },
    data() {
      return {

      }
    },
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .label {
    display: inline-block;
    width: 1.35rem;
    margin-right: .1rem;
  }
  span.coverage{
    font-size:pxToRem(30);padding:0 pxToRem(20);
    border:1px solid #666666;border-radius: pxToRem(8);
  }
  span.bechose{
    border-color:#06acf9;
  }
  span.br{
    margin-right:pxToRem(50);margin-left: pxToRem(20);
  }
</style>
