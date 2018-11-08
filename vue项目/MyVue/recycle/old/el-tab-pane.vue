<template>
  <div role="tabpanel"
       class="el-tab-pane"
       :id="`pane-${paneName}`"
       :aria-labelledby="`tab-${paneName}`"
       v-show="active"
       :aria-hidden="!active"
       >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      label: {type: String, require: true},
    },
    data() {
      return {
        paneName:0,
      }
    },
    computed:{
      active(){
        return this.$parent.currentName===this.paneName
      }
    },
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
