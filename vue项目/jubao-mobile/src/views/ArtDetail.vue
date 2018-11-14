<template>
  <div class="ArticleDetail">
    <v-header title="文章详情"></v-header>
    <div class="content_box">
      <div ref="scroll" class="content">
        <div class="main">
          <div class="jm_title">
            <h1>{{art.title}}</h1>
            <span>更新时间：{{artTime}}</span>
          </div>
          <div v-html="art.body" class="jm_con"></div>
          <div class="but_list">
            <a @click="toPrev" href="javascript:;">上一篇文章</a>
            <router-link class="back" to="/article">返回列表</router-link>
            <a @click="toNext" href="javascript:;">下一篇文章</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {Indicator, Toast} from 'mint-ui';
  import {cmnArticleInfo, cmnArticleRead} from 'assets/js/api'

  export default {
    data() {
      return {
        artId: "",//文章id
        art: "",//文章
        artTime: "",
        prev: "",//上一篇id
        next: "",//下一篇id
        list: "",//老周解密所有文章
        menuId: "",//二级目录id,
      }
    },
    methods: {
      getInfo() {
        Indicator.open();
        cmnArticleInfo(this.artId).then(res => {
          Indicator.close();
          if (res.err_code == 0) {
            this.art = res.data;
            this.artTime = res.data.updated_at.substr(0, 19).replace(/T/, ' ');
            this.prev = res.prev_article_id;
            this.next = res.next_article_id;
            this.$refs.scroll.scrollTop=0;
          } else {
            Toast('出错了！');
          }
        }).catch((err) => {
          Indicator.close();
          console.log("cmnArticleInfo", err)
        })
      },
      toPrev() {
        if (this.prev == 0) {
          Toast('没有更多了');
        } else {
          this.artId = this.prev;
          this.$router.push('/artDetail/' + this.artId);
          this.getInfo();
        }
      },
      toNext() {
        if (this.next == 0) {
          Toast('没有更多了');
        } else {
          this.artId = this.next;
          this.$router.push('/artDetail/' + this.next);
          this.getInfo();
        }
      }
    },
    created() {
      this.artId = this.$route.params.artId;
      this.getInfo();
    },
    //样式初始化及销毁，解决后台上传图片和iframe过大的问题
    mounted() {
      let oBody = document.getElementsByTagName('body')[0];
      let style = document.createElement('style');
      style.className = 'resetClass';
      style.innerHTML = 'iframe,img{ max-width:100% !important;  height: auto; }';
      oBody.appendChild(style)
    },
    destroyed(){
      let style = document.getElementsByClassName('resetClass')[0];
      style.remove();
    }
  }
</script>

<style lang="scss" scoped>
  .content_box{
    bottom:0;background: #fff;
  }
  .ArticleDetail{
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*overflow-y: scroll;*/
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    .header{
      @include border-1px('bottom');
    }
    .main{
      padding: pxToRem(14) pxToRem(28);
      .jm_title{
        font-size: pxToRem(28);
        text-align: center;
        h1{
          font-weight: 400;
          font-size: pxToRem(52);
          margin-bottom: pxToRem(10);
        }
        margin-bottom: pxToRem(20);
      }
      .but_list{
        display: flex;
        justify-content: space-around;
        a{
          display: block;
          width: pxToRem(200);
          height: pxToRem(80);
          line-height: pxToRem(80);
          text-align: center;
          border: 1px solid #ccc;
          color: #333;
          border-radius: pxToRem(5);
          &.back{
            width: pxToRem(160);
            background: #a6becc;
            color: #fff;
          }
        }
      }
    }
  }
</style>
