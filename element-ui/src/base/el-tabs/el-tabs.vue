<template>
  <div class="el-tabs el-tabs--top" :style="currentStyle.tabs" :class="currentClass.tabs">
    <div class="el-tabs__header is-top" :style="currentStyle.header">
      <div class="el-tabs__nav-wrap is-top">
        <div class="el-tabs__nav-scroll">
          <div role="tablist" class="el-tabs__nav" style="transform: translateX(0px);" :style="currentStyle.tablist" ref="bar">
            <div class="el-tabs__active-bar is-top" :style="currentStyle.bar"></div>
            <div
              class="el-tabs__item is-top"
              role="tab"
              :style="currentStyle.item"
              v-for="(val,idx) in paneList"
              @click="switchPane(idx)"
              :id="`tab-${idx}`"
              :aria-controls="`pane-${idx}`"
              :aria-selected="val.selected"
              :class="{'is-active':currentName===idx}">
              {{val.label}}
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
  const styleDefault = "border-card";
  export default {
    props:{
      type:String,
    },
    data() {
      return {
        paneList: [],
        currentName: 0,
        currentStyle:{},
        currentClass:{}
      }
    },
    created(){
      this._initStyle(this.type)
    },
    mounted() {
      this.paneList = this.$children.map((val, idx) => {
        val.paneName = idx;
        return {
          active: val.active,
          label: val.label
        }
      });
    },
    methods: {
      switchPane(idx) {
        this.currentName = idx;

        debugger;
        this.$refs.bar.style.transform=`translateX(${idx*96}px);`;
        console.log(this.$refs.bar.style.transform,"this.$refs.bar.style")
        console.log(`translateX(${idx*96}px);`)
        debugger;
        this.$emit("tab-click",idx)
      },
      _initStyle(type=styleDefault){
        switch (type){
          case "border-card" :
            this.currentClass={
              tabs:"el-tabs--border-card"
            }
            this.currentStyle={
              header:"background-color:#f5f7fa",
            };
            break;
          case "card" :
            this.currentStyle={
              header:"border-bottom: 1px solid #e4e7ed;",
              tablist:"border-bottom: none;" +
              "border-radius: 4px 4px 0 0;" +
              "border: 1px solid #e4e7ed;",
              item:"border-left:1px solid #e4e7ed;",
            };
            break;
          case "active-card" :
            this.currentStyle={
              bar:`width: 56px; transform: translateX(0px);`
            }
            break;
        }
      }

    }
  }
</script>

<style>
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #fff;
  }

  .el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .el-tabs--border-card > .el-tabs__header {
    /*background-color: #f5f7fa;*/
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

  .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: #409eff;
  }

  .el-tabs__item:hover {
    color: #409eff;
    cursor: pointer;
  }


  .el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #409eff;
    z-index: 1;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
  }
</style>
