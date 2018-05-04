<template>
  <div>
    <button @click="addTab">addTab</button>
    <el-tabs @tab-click="tabClick" style="height:200px;" closable type="card" @tab-remove="tabRemove">

      <el-tab-pane :label="val.title" v-for="(val,idx) in editableTabs2" :key="val.name">{{val.content}}</el-tab-pane>

      <!--<el-tab-pane label="配置管理">配置管理text</el-tab-pane>-->
      <!--<el-tab-pane label="角色管理">角色管理text</el-tab-pane>-->
      <!--<el-tab-pane label="定时任务补偿"> 定时任务补偿text</el-tab-pane>-->
    </el-tabs>
  </div>

</template>

<script>
  //已开发功能
  //  type :  active-card  border-card card   active-card
  //  tab-position : left right top bottom
  //   icon : 添加iconfont
  export default {
    data() {
      return {
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex:2,
        editableTabsValue2: '2',
      }
    },
    created() {

    },
    methods: {
      tabClick(val,idx) {
//        console.log(idx, "tabClick")
      },
      tabRemove(val,idx){
//        console.log(val,idx)
//        this.editableTabs2.splice(idx,1)
//        console.log(this.editableTabs2)
      },
      addTab(val,idx){
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: `New Tab ${newTabName}`,
          name: newTabName,
          content: `Tab ${newTabName} content`
        });
        this.editableTabsValue2 = newTabName;
      }
    }
  }
</script>

<style lang="scss">

</style>
