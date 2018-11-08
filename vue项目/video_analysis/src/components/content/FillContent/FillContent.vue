<template>
  <div class="FillContent">
    <div v-if="title" class="title f14">
      {{ title }}
    </div>
    <div v-loading="contentLoading" :class="[className,{'bg':closeBg}]"
         class="content"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(255, 255, 255, 0.5)">
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FillContent',
    props: {
      title: {
        type: String
      },
      className: {
        type: String
      },
      closeBg: {
        default: true
      }
    },
    data () {
      return {
        contentLoading: false
      }
    },
    methods: {
      loading () {
        this.contentLoading = true
      },
      closeLoading () {
        this.contentLoading = false
      }
    }
  }
</script>

<style lang="scss" scoped>
.FillContent{
  padding-left:224+24px;
  min-width:1140+248px;
  min-height:790px;
  box-sizing: border-box;
  padding-top:76px;
  margin-top:-76px;
  .title{
    height:60px;
    line-height:60px;
  }
  .content{
    box-sizing: border-box;
    overflow: hidden;
    min-height:730px;
    .main{
      /*width:912px;*/
      margin:0 auto;
    }
  }
  .bg{
    border:2px solid #ebebeb;
    background: #fff;
  }
}
</style>
