<template>
  <div class="child">
    child
    {{message}}{{active}}
    <p>{{childData}}</p>
    <ain></ain>
  </div>
</template>

<script>
  import ain from "./in.vue"
  export default {
    components:{
      ain
    },
    props:{
      childData:String || Number
    },
    data() {
      return {
        message:"aa"
      }
    },
    computed:{
      active(){
        return this.rootTabs.tabPosition
      }
    },
    inject: ["rootTabs"],
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
