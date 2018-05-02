<template>
  <el-tabs @tab-click="tabClick" type="active-card">
    <el-tab-pane label="用户管理">用户管理text</el-tab-pane>
    <el-tab-pane label="配置管理">配置管理text</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理text</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿text</el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    created() {

    },
    methods: {
      tabClick(idx){
        console.log(idx,"tabClick")
      }
    }
  }
</script>

<style lang="scss">

</style>
