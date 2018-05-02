<template>
    <div class="el-tabs el-tabs--top el-tabs--border-card">
      <div class="el-tabs__header is-top">
        <div class="el-tabs__nav-wrap is-top">
          <div class="el-tabs__nav-scroll">
            <div role="tablist" class="el-tabs__nav" style="transform: translateX(0px);">
              <div :id="'tab-'+idx" :aria-controls="'pane-'+idx" role="tab" :aria-selected="val.selected" :tabindex="idx"
                   class="el-tabs__item is-top" :class="{'is-active':val.isActive}"  v-for="(val,idx) in paneList">{{val.label}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="el-tabs__content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              paneList:[]
            }
        },
        created() {

        },
        methods: {}
    }
</script>

<style>
  .el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .el-tabs--border-card > .el-tabs__header {
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    margin: 0;
  }

  .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 15px;
  }

  .el-tabs--border-card > .el-tabs__content {
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

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #409eff;
    background-color: #fff;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
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
