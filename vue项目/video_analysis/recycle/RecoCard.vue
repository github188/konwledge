<template>
  <transition v-if="show" name="fade-in-left">
    <div class="card">
      <div class="pic">
        <img src="../../assets/images/test1.jpg" alt="">
      </div>
      <div class="content">
        <div class="main-text"><i class="iconfont icon-motuoche"></i><span>{{ info.car }}</span></div>
        <div class="feature"><i class="iconfont icon-xingbie"></i><span></span><span>{{ info.sex }}</span></div>
        <div class="feature"><i class="iconfont icon-nianling"></i><span></span><span>{{ info.age }}</span></div>
        <div class="feature"><i class="iconfont icon-tongdao"></i><span></span><span>{{ info.channel }}</span></div>
        <div class="feature"><i class="iconfont icon-shijian"></i><span></span><span>{{ info.time }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'RecoCard',
    props: {
      info: {
        car: '',
        sex: '',
        age: '',
        channel: '',
        time: ''
      }
    },
    data () {
      return {
        show: false
      }
    },
    created () {
      this.show = true
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    display: inline-block;
    box-sizing: border-box;
    height: 100%;
    width: calc((100% - 60px) / 6);
    margin: 0 6px;
    border: 2px solid #20ebfc;
    .pic {
      float: left;
      width: 41%;
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .content {
      box-sizing: border-box;
      color: #21b5fd;
      height: 100%;
      padding-left: 6px;
      float: left;
      width: 59%;
      .main-text {
        box-sizing: border-box;
        background: -webkit-gradient(linear,0 50%,100% 50%,from(rgba(42,63,218,1)), to(rgba(42,63,218,.0)));
        padding: 5px 0px;
        height: 24%;
        line-height: 1;
        i{
          font-size: 26px;
          vertical-align: middle;
        }
        span{
          font-size: 16px;
          margin-left: 10px;
          color: #20ebfc;
        }
      }
      .feature {
        box-sizing: border-box;
        line-height: 1;
        padding: 4px 0px;
        height: 14%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #20ebfc;
        i{
          font-size: 18px;
          margin-right: 5px;
        }
      }
    }
  }

  .fade-in-left-enter-active, .fade-in-left-leave-active{
    transition: all 1s;
  }

  .fade-in-left-enter, .fade-in-left-leave-to{
    width:0;
    transform: scale(0);
    transform-origin: 0 0;
    opacity: 0;
  }
</style>
