<template>
  <el-tabs>
    <el-tab-pane label="用户管理" slot="tab-0" slotNum="0" :isActive="true"></el-tab-pane>

    <el-tab-pane label="配置管理" slot="tab-1" slotNum="1"></el-tab-pane>
    <!--<el-tab-pane label="角色管理" slot="tab-2" slotNum="2"></el-tab-pane>-->
    <!--<el-tab-pane label="定时任务补偿" slot="tab-3" slotNum="3"></el-tab-pane>-->

    <span slot="pane-0">测试内容</span>
    <div role="tabpanel" id="pane-0" slot="pane-0" aria-labelledby="tab-0" class="el-tab-pane" style="">用户管理</div>
    <div role="tabpanel" aria-hidden="true" id="pane-1" slot="pane-1" aria-labelledby="tab-1" class="el-tab-pane"
         style="display: none;">配置管理
    </div>
    <!--<div role="tabpanel" aria-hidden="true" id="pane-2" slot="pane-2" aria-labelledby="tab-2" class="el-tab-pane"-->
         <!--style="display: none;">角色管理-->
    <!--</div>-->
    <!--<div role="tabpanel" aria-hidden="true" id="pane-3" slot="pane-3" aria-labelledby="tab-3" class="el-tab-pane"-->
         <!--style="display: none;">定时任务补偿-->
    <!--</div>-->
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
      return {}
    },
    created() {
      console.log("created")
    },
    methods: {}
  }
</script>

<style lang="scss">

</style>
