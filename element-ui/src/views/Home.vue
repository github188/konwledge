<template>
  <div class="home">
    home
    <span ref="s">asfsdfsdfsdf</span>
    <t>
      测试信息
      <span slot="header">测试header</span>
    </t>

    <div>
      <span class="iconfont icon-close box"></span>
    </div>
  </div>
</template>

<script>
import t from "./1.vue"
  export default {
    components:{
      t
    },
    data (){
      return {

      }
    },
    methods: {

    },
    created(){

    },
    mounted(){
      this.$refs.s.style.display="none"
    }
  }
</script>

<style lang="scss" scoped>
.box{
  width:0px;
}
</style>
