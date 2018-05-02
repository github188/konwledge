<template>
  <el-tabs>
    <el-tab-pane :isActive="true" label="用户管理头部">用户管理text</el-tab-pane>
    <el-tab-pane :isActive="false" label="配置管理头部">配置管理text</el-tab-pane>
    <el-tab-pane :isActive="false" label="角色管理头部">角色管理text</el-tab-pane>
    <el-tab-pane :isActive="false" label="定时任务补偿头部">定时任务补偿text</el-tab-pane>
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
    methods: {}
  }
</script>

<style lang="scss">

</style>
