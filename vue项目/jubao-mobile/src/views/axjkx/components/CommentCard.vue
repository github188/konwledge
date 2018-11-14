<template>
  <div class="commentCard">
    <div class="head">
      <!--<img src="../../../assets/img/userImg.png" alt="">-->
      <span class="name">{{data.nickname}}</span>
    </div>
    <div class="date">
      <span>{{dateChange(data.updated_at)}}</span>
      <span>计划一</span>
    </div>
    <div class="comment" v-html="data.content"></div>
    <div class="reply" v-if="data.reply">
      <span>{{data.reply_nickname}}回复：</span><span v-html="data.reply"></span>
    </div>
  </div>
</template>
<script>
	import {dateFtt} from '../../../assets/js/dateFtt'
  export default {
  	props:['data'],
    methods:{
			dateChange(dateStr){
				return dateFtt("yyyy-MM-dd hh:mm:ss",new Date(dateStr));
			},
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .commentCard{
    margin: pxToRem(30) pxToRem(30) 0;
    padding: pxToRem(20);
    border-radius: pxToRem(10);
    background: #fff;
    .head{
      display: flex;
      align-items: center;
      height: pxToRem(50);
      font-size: pxToRem(30);
      .name{
        margin-left: pxToRem(5);
      }
    }
    .date{
      font-size: pxToRem(24);
      color: #999;
      height: pxToRem(50);
      line-height: pxToRem(50);
      span:last-child{
        margin-left: pxToRem(50);
      }
    }
    .comment{
      font-size: pxToRem(24);
      line-height: pxToRem(32);
      word-wrap:break-word;
      word-break:break-all;
      text-align: justify;
      letter-spacing: 1px;
    }
    .reply{
      position: relative;
      background: #eee;
      margin: pxToRem(30) 0 pxToRem(20);
      border-radius: pxToRem(20);
      padding: pxToRem(25) pxToRem(30);
      text-align: justify;
      font-size: pxToRem(24);
      word-wrap:break-word;
      word-break:break-all;
      &:before{
        position: absolute;
        top: pxToRem(-20);
        left: pxToRem(25);
        content: '';
        border-left: pxToRem(10) solid transparent;
        border-right: pxToRem(10) solid transparent;
        border-bottom: pxToRem(20) solid #eee;
      }
    }
  }
</style>