<template>
  <div class="">
    <e-tabs>
      <e-tab-pane label="用户管理">用户管理</e-tab-pane>
      <e-tab-pane label="配置管理">配置管理</e-tab-pane>
      <e-tab-pane label="角色管理">角色管理</e-tab-pane>
      <e-tab-pane label="定时任务补偿定时任务补偿定时任务补偿定时任务补偿">定时任务补偿</e-tab-pane>
    </e-tabs>

  </div>
</template>

<script>
  import ETabs from "../base/el-tabs/el-tabs.vue"
  import ETabPane from "../base/el-tabs/el-tab-pane.vue"
  import "../../element-css/tabs.css"

  export default {
    components:{
      ETabs,ETabPane
    },
    data() {
      return {}
    },
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
