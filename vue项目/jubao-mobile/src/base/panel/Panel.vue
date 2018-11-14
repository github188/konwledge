<template>
  <div ref="panel" class="panel">
    <slot></slot>
  </div>
</template>
<script>
  const elTransition = '0.3s height ease-in-out';
  export default {
    props:{
      flag:{required:true},
      change:{}
    },
    mounted(){
      this.$refs.panel.style.transition = 'height .3s';
      this.$refs.panel.style.webkitTransition = 'height .3s';
      this.$refs.panel.style.mozTransition = 'height .3s';
      this.$refs.panel.style.overflow = 'hidden';
      this.$watch('flag',(newVal)=>{
        if (!newVal) {
          this.$refs.panel.style.height = '0px';
        } else {
          this.changeH();
        }
      },{immediate: true});
      this.$watch('change',(newVal)=>{
        if(newVal && this.flag){
          this.changeH();
        }
      },{deep:true})
    },
    methods:{
      changeH(){
        let oldHeight = this.$refs.panel.getBoundingClientRect().height;
        this.$refs.panel.style.height = 'auto';
        let height = this.$refs.panel.getBoundingClientRect().height;
        this.$refs.panel.style.height = oldHeight + 'px';
        let f = document.body.offsetHeight; //触发过渡
        this.$refs.panel.style.height = height + 'px';
      }
    }
  }
</script>

<style>
  .panel{
    overflow: hidden;
  }
</style>
