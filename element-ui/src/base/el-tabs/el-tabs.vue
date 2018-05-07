<template>
  <div class="el-tabs" :style="currentStyle.tabs" :class="[currentClass.tabs,`el-tabs--${tabPosition}`,`el-tabs--${type}`]">
    <div class="el-tabs__content" v-if="tabPosition==='bottom'">
      <slot></slot>
    </div>
    <div class="el-tabs__header" :style="currentStyle.header" :class="`is-${tabPosition}`">
      <div class="el-tabs__nav-wrap" :class="[currentClass.navWrap,`is-${tabPosition}`]" >
        <div class="el-tabs__nav-scroll">
          <div role="tablist" class="el-tabs__nav" style="transform: translateX(0px);" :style="currentStyle.tablist">
            <div :style="currentStyle.bar" :class="[currentClass.activeBar,`is-${tabPosition}`]" v-if="currentClass.activeBar"></div>
            <div
              :class="['el-tabs__item',`is-${tabPosition}`,{'is-active':currentName===val.paneName,'is-closable':closable}]"
              role="tab"
              ref="item"
              :style="currentStyle.item"
              v-for="(val,idx) in paneList"
              @click="switchPane(val,val.paneName,idx)"
              :id="`tab-${val.paneName}`"
              :aria-controls="`pane-${val.paneName}`"
              :aria-selected="val.selected"
              >
              <span :class="val.icon"></span>
              {{val.label}}
              <span class="icon-close2 iconfont" @click.stop="tabRemove(val,idx)" v-if="closable"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="el-tabs__content" v-if="tabPosition!=='bottom'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const initData = {

  };

  export default {
    props:{
      type:{type:String,default:"border-card"},
      tabPosition:{type:String,default:"top"}
    },
    data() {
      return {
        paneList: [],
        currentName: 0,
        currentStyle:{},
        currentClass:{},
        closable:false,
        tabBlock:true,
      }
    },
    created(){
      if(this.$attrs.closable===""){
        this.closable=true
      }
    },
    mounted() {
      this._initStyle(this.type,this.tabPosition);//根据type不同调整样式
      //this.$nextTick(this._initData());//将回调延迟到下次 DOM 更新循环之后执行  //在nav元素初始化之后，获取nav的宽度之类的数据
    },
    methods: {
      addPane(data){
        this.paneList.push(data)
      },
      switchPane(val,paneName,idx) {
        this.currentName = paneName;
        let flag = ["top","bottom"].indexOf(this.tabPosition)!==-1;
        this.currentStyle.bar=`transform: translate${flag?"X":"Y"}(${idx*(flag?96:40)}px);`;
        this.$emit("tab-click",val,idx)
      },
      _initStyle(type,tabPosition){
        switch (type){
          case "border-card" :
            this.currentClass={
              tabs:"el-tabs--border-card"
            };
            this.currentStyle={
              header:"background-color:#f5f7fa",
            };
            break;
          case "card" :
            this.currentStyle={
              header:"border-bottom: 1px solid #e4e7ed;",
              tablist: "border-radius: 4px 4px 0 0;border: 1px solid #e4e7ed;border-bottom: none;",
              item:"border-left:1px solid #e4e7ed;",
            };
            break;
          case "active-card" :
            this.currentStyle={
              bar:`transform: translateX(0px);`,
            };
            this.currentClass={
              navWrap:`el-tabs--active-nav-wrap el-tabs--active-${this.tabPosition}`,
              activeBar:`el-tabs__active-bar el-tabs__${this.tabPosition}-bar`
            };
            break;
        }
        this.currentStyle.item=`display:${["left","right"].indexOf(tabPosition)!==-1?"block":"inline-block"};`
      },
      positionClass(tabPosition){
        return `bottom:0;${["left"].indexOf(tabPosition)!==-1?"right":"left"}:0;
        ${["top","bottom"].indexOf(tabPosition)!==-1?"width:100%;height:2px;":"height:100%;width:2px;"}`;
      },
      tabRemove(val,idx){
        this.currentName=idx===0?-1:idx===(this.paneList.length-1)?this.paneList[idx-1].paneName:this.paneList[idx+1].paneName;
        let pane = document.getElementById(`pane-${this.paneList[idx].paneName}`);
        pane.parentNode.removeChild(pane);

        this.paneList.splice(idx,1);
        this.$emit("tab-remove",val,idx)
      }
    }
  }
</script>

<style>
  .iconfont {
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
<style>
  .el-tabs--card>.el-tabs__header .el-tabs__item {
    border-bottom: 1px solid transparent;
    border-left: 1px solid #e4e7ed;
    transition: color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom: 1px solid #fff;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item .icon-close2 {
    position: relative;
    font-size: 12px;
    width: 0;
    height: 14px;
    vertical-align: middle;
    line-height: 15px;
    overflow: hidden;
    top: -1px;
    right: -2px;
    transform-origin: 100% 50%;
  }
  .el-tabs__item .icon-close2 {
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    margin-left: 5px;
  }

  .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover .icon-close2 {
    width: 14px;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable .icon-close2 {
    width: 14px;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover {
    padding-left: 13px;
    padding-right: 13px;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable {
    padding-left: 20px;
    padding-right: 20px;
  }

  .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
    border-left: none;
  }
  .el-tabs__item .icon-close2:hover {
    background-color: #c0c4cc;
    color: #fff;
  }
</style>
<style>
  .el-tabs__item .icon-close2:before{
    transform: scale(.9);
    display: inline-block;
  }
  .el-tabs__item .icon-close2 {
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    margin-left: 5px;
  }

  .el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }
  .el-tabs--active-nav-wrap:after {
    content: "";
    position: absolute;
    background-color: #e4e7ed;
    z-index: 1;
  }
  .el-tabs--active-top:after,.el-tabs--active-bottom:after{
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
  }
  .el-tabs--active-left:after{
    right: 0;
    bottom: 0;
    height: 100%;
    width: 2px;
  }
  .el-tabs--active-right:after{
    left: 0;
    bottom: 0;
    height: 100%;
    width: 2px;
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
    background-color: #409eff;
    z-index: 1;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
  }
  .el-tabs__top-bar,.el-tabs__bottom-bar{
    bottom: 0;  left: 20px;  height: 2px;
    width: 56px;
  }
  .el-tabs__left-bar{
    height: 40px;width:2px;right:0;

  }
  .el-tabs__right-bar{
    height: 40px;width:2px;left:0;
  }
  .el-tabs--bottom .el-tabs__header.is-bottom {
    margin-bottom: 0;
    margin-top: 10px;
  }
</style>
<style>
  .el-tabs--left, .el-tabs--right {
    overflow: hidden;
  }
  .el-tabs--left .el-tabs__header.is-left {
    float: left;
    margin-bottom: 0;
    margin-right: 10px;
  }
  .el-tabs--right .el-tabs__header.is-right {
    float: right;
    margin-bottom: 0;
    margin-left: 10px;
  }
</style>
