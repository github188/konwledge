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
    name: "ElTabPane",
    componentName: "ElTabPane",
    props: {
      label: String,
      labelContent: Function,
      name: String,
      closable: Boolean,
      disabled: Boolean
    },
    data() {
      return {
        index: null
      }
    },
    computed:{
      active(){
        return this.$parent.currentName===(this.name || this.index)
      },
      paneName() {
        return this.name || this.index;
      },
      isClosable() {
        return this.closable || this.$parent.closable;
      },
    },
    created() {

    },
    mounted(){
      this.$parent.addPanes(this);
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.$parent.removePanes(this);
    },
    methods: {},
    watch: {
      label() {
        this.$parent.$forceUpdate();
      }
    }

  }
</script>

<style>

</style>
