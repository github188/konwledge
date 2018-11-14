<template>
    <div class="home_tab">
        <router-link to="/home" :class="$route.path == '/home'?'active':''" tag="span" v-touchFeel="{color:'#f2f2f2'}">
            <i class="iconfont icon-shouye"></i>
            <p>首页</p>
        </router-link>
        <router-link to="/article" :class="$route.path == '/article'?'active':''" tag="span" v-touchFeel="{color:'#f2f2f2'}">
            <i class="iconfont icon-pindao"></i>
            <p>保险频道</p>
        </router-link>
        <router-link to="/dashboard" :class="$route.path == '/dashboard'?'active':''" tag="span" v-touchFeel="{color:'#f2f2f2'}">
            <i class="iconfont icon-wo"></i>
            <p>我的</p>
        </router-link>
    </div>
</template>

<script>
    export default {
    }

</script>

<style lang="scss" scoped>
  .home_tab{
    height: pxToRem(100);
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      flex: 1;
      display: block;
      text-align: center;
      font-size: pxToRem(28);
      color: #000;
      i{
        font-size: pxToRem(40);
        display: block;
        height: pxToRem(50);
      }
    }
    span.active{
      color: #06acf9;
    }
  }
</style>
