<template>
  <div role="tabpanel" aria-hidden="true" id="pane-1" slot="pane-1" aria-labelledby="tab-1" class="el-tab-pane"
       style="display: none;">配置管理
  </div>
</template>

<script>
  export default {
    props:{
      label:{type:String,require:true},
      slotNum:{type:String,require:true},
      isActive:{type:Boolean,require:true},
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
