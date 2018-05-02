<template>
  <el-tabs>
    <el-tab-pane label="用户管理头部">用户管理text</el-tab-pane>
    <el-tab-pane label="配置管理头部">配置管理text</el-tab-pane>
    <el-tab-pane label="角色管理头部">角色管理text</el-tab-pane>
    <el-tab-pane label="定时任务补偿头部">定时任务补偿text</el-tab-pane>
  </el-tabs>
</template>

<script>
  import elTabs from "./el-tab.vue"
  import elTabPane from "./el-tab-pane.vue"

  export default {
    components:{
      elTabs,elTabPane
    },
    data() {
      return {

      }
    },
    created() {
      console.log("created")
    },
    mounted(){
      let elTabs = this.$children[0];
      let elTabPane = elTabs.$children;
      console.log(elTabs,"elTabs");
      elTabs.paneList = elTabPane.map((val,idx)=>{
        val.isActive=idx===0;
        val.slotNum=idx;
        return {
          isActive:val.isActive,
          label:val.label
        }
      });
    },
    methods: {}
  }
</script>

<style lang="scss">

</style>
