<template>
  <el-tabs @tab-click="tabClick" style="height:200px;" closable type="card" @tab-remove="tabRemove">
    <el-tab-pane label="用户管理" icon="icon-pause">
      用户管理text
    </el-tab-pane>
    <el-tab-pane label="配置管理">配置管理text</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理text</el-tab-pane>
    <el-tab-pane label="定时任务补偿"> 定时任务补偿text</el-tab-pane>
  </el-tabs>
</template>

<script>
  //已开发功能
  //  type :  active-card  border-card card   active-card
  //  tab-position : left right top bottom
  //   icon : 添加iconfont
  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {
      tabClick(val,idx) {
        console.log(idx, "tabClick")
      },
      tabRemove(val,idx){
        console.log(val,idx)
      }
    }
  }
</script>

<style lang="scss">

</style>
