<template>
  <div class="header header2" :class="className">
    <router-link :to="backUrl || $store.state.backUrl" tag="span" class="header_back" @click.native="back" v-touchFeel="touchFeel" v-if="routerLinkMode">
      <i class="iconfont" :class="backIcon" v-if="backShow"></i>
      <span>{{backText}}</span>
    </router-link>
    <!--如果没有输入backUrl，则不能为router-link-->
    <span class="header_back" @click="back" v-touchFeel="touchFeel" v-else>
      <i class="iconfont" :class="backIcon" v-if="backShow"></i>
      <span>{{backText}}</span>
    </span>

    <span class="header_center title">{{title}}</span>

    <router-link :to="goUrl" tag="span" class="header_right" v-touchFeel="touchFeel" v-if="goUrl">
      <i class="iconfont" :class="goIcon" @click="go" v-if="goShow"></i>
      <span>{{goText}}</span>
    </router-link>
    <!--如果没有输入goUrl，则不存在为router-link标签-->
    <span class="header_right" v-if="!goUrl && !goTouchFlag">
      <i class="iconfont" :class="goIcon" @click="go" v-if="goShow"></i>
      <span>{{goText}}</span>
    </span>

    <span class="header_right" v-touchFeel="touchFeel" v-if="!goUrl && goTouchFlag">
      <i class="iconfont" :class="goIcon" @click="go" v-if="goShow"></i>
      <span>{{goText}}</span>
    </span>
  </div>
</template>

<script>
  //class名header2是单独作为空的class名。用处为：方便使用者添加样式
  export default {
    props: {
      className:{type:String,default:""},
      routerLinkMode:{type:Boolean, default:true},
      backUrl:{default:""},   //返回的路由地址，eg: /dashboard
      backIcon:{type:String, default:"icon-fanhui"},//返回按钮对应的图标，默认为 < 图标
      backText:{type:String, default:""}, //返回按钮对应的文本；一般会在文本和图标中二选一
      backShow:{type:Boolean, default:true},//是否显示返回图标；默认为显示，也可以适应没有返回图标的情况

      goUrl:{type:String, default:""}, //右侧的路由地址，eg: /dashboard
      goIcon:{type:String, default:""},//右侧按钮对应的图标，默认没有图标
      goText:{type:String, default:""}, //右侧按钮对应的文本；一般会在文本和图标中二选一
      goShow:{type:Boolean, default:false},//是否显示右侧图标；默认为显示，也可以适应没有右侧图标的情况
      title: {type: String, default: ""},//header的中心部分的标题文本
      touchFeel:{type:Object,default:function () {  //点击背景变色功能；结合自身封装的指令才能正常运行；由于需求问题，暂时没有单独设置back和go的touchFeel，可以根据需求修改组件
        return {color:"#f2f2f2"}
      }},
      goTouchFlag:{type:Boolean, default:false}
    },
    methods: {
      back() {
        this.$emit("back")
      },
      go(){
        this.$emit("go")
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @mixin flex-center($type:'center') {
    display: flex;
    align-items: center;
    @if $type=='center'{
      justify-content: center;
    }@else if($type=='between'){
      justify-content: space-between;
    }
  }

  .header {
    @include flex-center('between');
    height: pxToRem(90);width:100%;
    .title{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    span{
      font-size:pxToRem(40);height:100%;
      &.header_back{
        flex:1;display: flex;justify-content: center;align-items: center;
        .iconfont{
          height: pxToRem(90);
          line-height: pxToRem(90);
          font-size: pxToRem(38);
          min-width: pxToRem(80);
        }
      }
      &.header_center{
        flex: 4;
      }
      &.header_right{
        flex:1;display: flex;justify-content: center;align-items: center;
      }
    }
  }

</style>
