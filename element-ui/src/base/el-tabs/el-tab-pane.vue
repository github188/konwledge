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
  let index = 0 ;
  export default {
    props: {
      label: {type: String, require: true},
      icon:{type:String,default:""}
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
    mounted(){
      this.paneName=index;
      this.$parent.addPane({
        label:this.label,
        icon:this.icon,
        active:this.active,
        index:index,
      });
      index++;
    },
    methods: {}
  }
</script>

<style>

</style>
