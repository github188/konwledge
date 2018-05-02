<template>
  <div role="tabpanel"
       class="el-tab-pane"
       :id="'pane-'+slotNum"
       :aria-labelledby="'tab-'+slotNum"
       :style="{'display':isActive?'block':'none'}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      label: {type: String, require: true},
      slotNum: {type: Number, require: true},
      isActive: {type: Boolean, default:false},
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

</style>
