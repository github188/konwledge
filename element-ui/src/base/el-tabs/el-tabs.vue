<template>
  <div class="el-tabs el-tabs--top el-tabs--border-card">
    <div class="el-tabs__header is-top">
      <div class="el-tabs__nav-wrap is-top">
        <div class="el-tabs__nav-scroll">
          <div role="tablist" class="el-tabs__nav" style="transform: translateX(0px);">
            <div id="tab-0" aria-controls="pane-0" role="tab" aria-selected="true" tabindex="0"
                 class="el-tabs__item is-top is-active">用户管理
            </div>
            <div id="tab-1" aria-controls="pane-1" role="tab" tabindex="-1" class="el-tabs__item is-top">
              配置管理
            </div>
            <div id="tab-2" aria-controls="pane-2" role="tab" tabindex="-1" class="el-tabs__item is-top">
              角色管理
            </div>
            <div id="tab-3" aria-controls="pane-3" role="tab" tabindex="-1" class="el-tabs__item is-top">
              定时任务补偿
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="el-tabs__content">
      <div role="tabpanel" id="pane-0" aria-labelledby="tab-0" class="el-tab-pane" style="">用户管理</div>
      <div role="tabpanel" aria-hidden="true" id="pane-1" aria-labelledby="tab-1" class="el-tab-pane"
           style="display: none;">配置管理
      </div>
      <div role="tabpanel" aria-hidden="true" id="pane-2" aria-labelledby="tab-2" class="el-tab-pane"
           style="display: none;">角色管理
      </div>
      <div role="tabpanel" aria-hidden="true" id="pane-3" aria-labelledby="tab-3" class="el-tab-pane"
           style="display: none;">定时任务补偿
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
  .el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .el-tabs--border-card>.el-tabs__header {
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    margin: 0;
  }
  .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 15px;
  }
  .el-tabs--border-card>.el-tabs__content {
    padding: 15px;
  }
  .el-tabs__nav-wrap {
    overflow: hidden;
    margin-bottom: -1px;
    position: relative;
  }
  .el-tabs__nav-scroll {
    overflow: hidden;
  }
  .el-tabs__nav {
    white-space: nowrap;
    position: relative;
    transition: transform .3s;
    float: left;
    z-index: 2;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #409eff;
    background-color: #fff;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    border: 1px solid transparent;
    margin: -1px -1px 0;
    color: #909399;
  }
  .el-tabs__item.is-active {
    color: #409eff;
  }
  .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
  }

  .el-tabs__content {
    overflow: hidden;
    position: relative;
  }
</style>
