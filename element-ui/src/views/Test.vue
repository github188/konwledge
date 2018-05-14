<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <p style="height:50px;border:1px solid #000;"></p>
    <parent></parent>
  </div>
</template>

<script>
  import parent from "./test/parent.vue"
  export default {
    components:{
      parent
    },
    data() {
      return {

      }
    },
    computed:{

    },
    created() {

    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>
