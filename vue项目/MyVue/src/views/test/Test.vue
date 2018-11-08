<template>
  <div>
    <!--<el-tabs type="border-card">-->
      <!--<el-tab-pane label="用户管理">用户管理</el-tab-pane>-->
      <!--<el-tab-pane label="配置管理">配置管理</el-tab-pane>-->
      <!--<el-tab-pane label="角色管理">角色管理</el-tab-pane>-->
      <!--<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
    <!--</el-tabs>-->
    <p style="height:50px;border:1px solid #000;">
      {{testMsg}}
    </p>
    <ul>
      <li v-for="(val,idx) in list" :class="{'red':flag}">{{val.text+`----${idx}`}}</li>
    </ul>
    <button @click="add">点击改变list</button> <br/>
    <button @click="flag=!flag">点击直接改变flag</button>

  </div>
</template>

<script>

  export default {
    components:{

    },
    data() {
      return {
        list: [
          {link: "/test", text: "测试页面"},
          {link: "/tabs", text: "tabs标签页"},
          {link:"/checkbox",text:"checkbox三级选项"},
          {link:"/loadmore",text:"loadmore（H5）"},
          {link:"/LoadmoreCopy",text:"LoadmoreCopy"},
        ],
        flag:false,
      }
    },
    computed:{
      testMsg(){
        if(!this.flag){return ;}
        if(this.list.length>5){
          this.flag=true;
          console.log("长度大于5了")
          return "长度大于5了"
        }
      }
    },
    created() {

    },
    methods: {
      add(){
        this.list.push({link:"/LoadmoreCopy222",text:"LoadmoreCopy222"},)
      }
    }
  }
</script>

<style lang="scss">
.red{
  color:red;
}
</style>
