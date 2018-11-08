<template>
  <div class="mint2-loadmore">
    <div class="mint2-loadmore-content" :class="{ 'is-dropped': topDropped || bottomDropped}">
      <slot name="top">
        <div class="mint2-loadmore-top" v-if="topMethod">
          <spinner v-if="topStatus === 'loading'" class="mint2-loadmore-spinner" :size="20" type="fading-circle"></spinner>
          <span class="mint2-loadmore-text">{{ topText }}</span>
        </div>
      </slot>
      <slot></slot>
      <slot name="bottom">
        <div class="mint2-loadmore-bottom" v-if="bottomMethod">
          <spinner v-if="bottomStatus === 'loading'" class="mint-loadmore-spinner" :size="20" type="fading-circle"></spinner>
          <span class="mint2-loadmore-text">{{ bottomText }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  import spinner from '../../../mint-ui/package/spinner/src/spinner/fading-circle.vue';
  export default {
    components:{
      spinner
    },
    props:{
      topMethod:{
        type:Function
      },
      bottomMethod:{
        type:Function
      },
      topPullText: {
        type: String,
        default: '下拉刷新'
      },
    },
    data() {
      return {
        topDropped: false,
        bottomDropped: false,
        topStatus:"loading",
        bottomStatus:"loading",
        topText:"",
        bottomText:"",
        scrollEventTarget:"",
        list: [
          {id: 0, text: "测试0"}, {id: 1, text: "测试1"}, {id: 2, text: "测试2"}, {id: 3, text: "测试3"}, {
            id: 4,
            text: "测试4"
          }, {id: 0, text: "测试0"}, {id: 1, text: "测试1"}, {id: 2, text: "测试2"}, {id: 3, text: "测试3"}, {
            id: 4,
            text: "测试4"
          }
        ],
      }
    },
    created() {
      console.log(this.topMethod,"test")
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.topStatus = 'pull';
        this.bottomStatus = 'pull';
        this.topText = this.topPullText;
        this.scrollEventTarget = this.getScrollEventTarget(this.$el);
        if (typeof this.bottomMethod === 'function') {
          this.fillContainer();
          this.bindTouchEvents();
        }
        if (typeof this.topMethod === 'function') {
          this.bindTouchEvents();
        }
      },

      getScrollEventTarget(element) {
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
          }
          currentNode = currentNode.parentNode;
        }
        return window;
      },
    }
  }
</script>

<style>
  * {
    backface-visibility: hidden;
  }

  body, html {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
</style>
<style lang="scss" scoped>
  .mint2-loadmore {
    overflow: hidden;
  }

  .mint2-loadmore-content {

  }

  .mint2-loadmore-top, .mint2-loadmore-bottom {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .mint2-loadmore-top {
    margin-top: -50px;
  }
  .mint2-loadmore-bottom {
    margin-bottom: -50px;
  }
</style>
<style lang="scss" scoped>
  ul {
    li {
      height: 60px;
      background: yellowgreen;
      margin-bottom: 10px;
    }
  }
</style>
