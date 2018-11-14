<template>
    <div class="zcb_success">
      <v-header title="保单详情" goText="完成" goUrl="/"></v-header>
      <div class="header_repeat"></div>
      <div class="content">
        <div class="order_img_box">
          <img src="../../assets/img/zcb/zcb5.jpg" class="order_img"/>
          <a class="policy_order">查看电子保单</a>
        </div>
        <p class="title">装车清单</p>
        <p class="bewrite">若遇险情，以您上传的装车清单附件作为赔偿依据。</p>
        <ul class="file_list">
          <li><span class="name">image.jpg</span><a class="download">下载</a></li>
        </ul>
      </div>

      <div class="bottom">
        一键分享给客户
      </div>
    </div>
</template>

<script>

    export default {

        data() {
            return {}
        },
        created() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
  .header{
    @include border-1px('bottom');
    a:nth-of-type(2){
      font-size:pxToRem(32)
    }
  }

  .content{
    padding:pxToRem(20);
    color:#333;
    .order_img_box{
      display: inline-block;
      position: relative;
      img.order_img{
        width:pxToRem(710);height:pxToRem(944);
        border: pxToRem(4) solid #999999;
      }
      a.policy_order{
        font-size:pxToRem(36);background: $blue;color:#fff;
        width: pxToRem(284);  height: pxToRem(60);
        border-radius: pxToRem(6);
        position: absolute;
        bottom:pxToRem(37);  left: 50%;
        transform: translateX(-50%);
        text-align: center;
      }
    }
    p.title{
      font-size:pxToRem(30);
    }
    p.bewrite{
      font-size:pxToRem(22);
    }
    ul.file_list{
      margin-top:pxToRem(10);
      li{
        span.name{

        }
        a.download{
          color:$blue;margin-left:pxToRem(44);
        }
      }
    }
  }
  .bottom{
    width:100%;height:pxToRem(100);
    text-align: center;line-height:pxToRem(100);
    position: fixed;left:0;bottom:0;
    background: $blue;color:#fff;font-size:pxToRem(40)
  }
</style>
