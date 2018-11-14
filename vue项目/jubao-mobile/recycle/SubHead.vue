<template>
  <div class="header" :style="{background:bgColor}">
      <router-link :to="backUrl || $store.state.backUrl" tag="span" class="back"><i class="iconfont" :class="backIconfont" @click="back" :style="{color:iconColor}"></i></router-link>
      <span :style="{color:titleColor}">{{title}}</span>
      <router-link :to="RLink.url" tag="span" :style="{ visibility: isHidden }">{{RLink.text}}</router-link>
  </div>
</template>

<script>
	export default {
      props:{
          bgColor:{
            type:String,
            default:"#fff"
          },
          iconColor:{
            type:String,
          },
          titleColor:{
            type:String,
          },
          backUrl: { // 左侧返回url
              type: String,
              default:""
          },
          backIconfont:{
            type:String,
            default:"icon-fanhui"
          },
          title: { // 标题
              type: String,
              default: "",
          },
          RLink: {  // 右侧返回text及url
              type: Object,
              default: function(){
                return { text: "", url: "" };
              },
          }
      },
      computed: {
          isHidden(){
            return this.RLink.text && this.RLink.url;
          }
      },
      methods:{
        back(){
          this.$emit("back")
        }
      }
  }
</script>

<style lang="scss" scoped>
  .header{
    position: relative;
    display: flex;
    width: auto;
    height: pxToRem(90);
    span {
      font-size: pxToRem(40);
      &:first-child,&:last-child {
        flex: 1;
      }
      &:nth-child(2) {
        flex: 4;
      }
      .icon-fanhui {
        height: pxToRem(90);
        line-height: pxToRem(90);
        font-size: pxToRem(38);
        min-width: pxToRem(80);
        text-align: left;
      }
    }
  }
</style>
