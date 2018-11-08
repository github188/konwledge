<template>
  <div class="reco-tab">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'RecoTab'
  }
</script>

<style lang="scss" scoped>
  $bigBg: '~@/assets/images/big_bg.png';
  .reco-tab {
    padding: 20px 0;
    background: url($bigBg);
  }
</style>
<style lang="scss">
  .reco-tab{
    .reco-item:last-child{
      .reco-blank{
        display: none;
      }
    }
  }
</style>
