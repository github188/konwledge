<template>
  <div>
    <button @click="addTab">addTab</button>
    <el-tabs @tab-click="tabClick" style="height:200px;" closable type="active-card" @tab-remove="tabRemove" tab-position="top">

      <el-tab-pane :label="val.title" v-for="(val,idx) in editableTabs2" :key="val.name">{{val.content}}</el-tab-pane>

    </el-tabs>
  </div>

</template>

<script>
  //已开发功能
  //  type :  active-card  border-card card   active-card
  //  tab-position : left right top bottom
  //   icon : 添加iconfont
  //  closable : 可添加和关闭
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
