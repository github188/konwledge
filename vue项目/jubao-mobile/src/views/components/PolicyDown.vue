<template>
  <div class="PolicyDown">
      <v-header title="投保单下载" ></v-header>
        <div class="content_box">
          <div class="content">
            <div class="pro_title">根据您填写的投保信息，我们已为您生成专属投保单，有以下两种方式可获得投保单 ：</div>
            <div class="pro_art">
                <div class="art_title">1、将投保单发送至您的邮箱 ：</div>
                <div class="art_ctn ctn1">
                    <input type="text" placeholder="请输入邮箱地址" v-model="email">
                    <div class="art_button" v-touchFeel="{color:'#0fbcf7'}" @click="setEmail()">发送邮件</div>
                </div>
            </div>
            <div class="pro_art">
                <div class="art_title">
                    <p>2、投保单下载链接地址，您可以复制链接地址，</p>
                    <p class="mar_left_40">通过微信或QQ等工具发送到电脑端并打印 。 </p>
                </div>
                <div class="art_ctn ctn2">
                    <div class="art_email">{{ policyUploadUrl }}</div>
                    <button class="art_button" type="button" v-touchFeel="{color:'#0fbcf7'}" v-clipboard:copy="policyUploadUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</button>
                </div>
            </div>
            <div class="pro_foo">
                <span class="foo_s"></span>
                <p v-if="product === 'spb'">注 ：1. 请在<span class="red">签章处盖章</span>；</p>
                <p v-else-if="product === 'ygb'">注 ：1. 请在<span class="red">签章</span>和<span class="red">人员清单处分别盖章</span>；</p>
                <p v-else>注 ：1. 请在<span class="red">签章</span>和<span class="red">车辆清单处分别盖章</span>；</p>
                <p class="pro_foo_padding">2. 请在<span class="red">每页盖骑缝章</span>；</p>
                <p class="pro_foo_padding">
                  3 . 投保单是重要的保险资料，请务必认真阅读，充分了解您的保险权利与义务。如上述两种方式都无法获取投保单，请联系聚保服务热线：<span class="red">40080-59680</span>
                </p>
            </div>
          </div>
          <router-link class="foot_btn" v-touchFeel="{color:'#0fbcf7'}" :to="uploadUrl">上传盖章后的投保单</router-link>
      </div>
  </div>
</template>
<script>
  import { Toast,Indicator } from 'mint-ui';
  import VueClipboard from 'vue-clipboard2'
  import Vue from 'vue'
  Vue.use(VueClipboard)
  import { cmnUserInfo,cmnEmailSend } from 'assets/js/api';
  export default{
      data(){
          return {
              orderId: this.$route.query.orderId , // 订单ID
              product: this.$route.query.product , // 产品类型
              productName: "", // 产品中文名
              email: "",
          }
      },
      computed: {
          // 1、路由来源投保确认页，参数：订单ID -- orderId  产品类型 -- product
          // 2、路由来源未完成订单，参数：订单ID -- orderId  产品类型 -- product  来源订单状态 -- payType
          backUrl(){
              return this.$route.query.orderStatus ? "/" + this.product + "spbOrders?type=unpaid" : '/' + this.product + 'Confirm?orderId=' + this.orderId ;
          },
          // 下一步链接，参数：订单ID -- orderId  产品类型 -- product
          uploadUrl(){
              return '/policyUp?orderId=' + this.orderId + '&product=' + this.product;
          },
          // 订单投保单下载地址
          policyUploadUrl(){
              if(this.product === "spb") {
                  this.productName = "商铺档口火灾保";
                  return this.$store.state.cmnUrl + "/v1/spb/order/spb.pdf?order_id=" + this.orderId;
              }else if(this.product === "ygb"){
                  this.productName = "员工保";
                  return this.$store.state.cmnUrl + "/v1/ygb/order/policyfile?order_id=" + this.orderId;
              }else if(this.product === "hcb"){
                  this.productName = "货车重大事故保";
                  return this.$store.state.cmnUrl + "/v1/hynb/order/hynb.pdf?order_id=" + this.orderId;
              }else if(this.product === "dchynb"){
                this.productName = "定车货运年保";
                return this.$store.state.cmnUrl + "/v1/hynb/order/hynb.pdf?order_id=" + this.orderId;
              }
          }
      },
      created(){
          this.init();
      },
      methods: {
          init(){
              Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
              cmnUserInfo().then( res => {
                  Indicator.close();
                  if(res.err_code ===0){
                      this.email = res.data.email || "";
                  }else {
                      console.log( err.err_msg );
                  }
              })
          },
          setEmail(){
              if(!this.email) {
                  Toast({ message: '请输入您的邮箱', duration: 2000 , position:'bottom'}); return false;
              }else if(!this.$store.state.reg_email.test(this.email)){
                  Toast({ message: '您输入的邮箱格式有误，请确认！', duration: 2000 , position:'bottom'}); return false;
              }
              Indicator.open({text: '邮件发送中...', spinnerType: 'fading-circle'});
              let data = {
                  "receiver": this.email,
                  "subject": "聚保物流保险服务平台"+ this.productName +"专属投保单",
                  "content": "投保单是重要的保险资料，请务必认真阅读，充分了解您的保险权利与义务。然后将您的"+ this.productName +"专属投保单下载并打印，加盖公司公章，将盖章后的投保单拍照照片上传到您的"+ this.productName +"订单。<br><span style='color: red;'>投保单下载地址：</span>" + this.policyUploadUrl+"<br>移动端官网链接：http://www.jubao56.com/m ",
                  "attachment": ""
              };
              cmnEmailSend(data).then( res => {
                  Indicator.close();
                  if(res.err_code === 0){
                      Toast({ message: '投保单已发送到您的邮箱，请注意查收，如未收到邮件请重新核对您的邮箱地址！', duration: 3000 , position:'bottom'});
                  }else {
                      Toast({ message: res.err_msg || '未知错误', duration: 3000 , position:'bottom'});
                  }
              })
          },
          onCopy(e) {
              Toast({ message: '复制成功', duration: 2000 , position:'bottom'});
              console.log("复制链接: ",e.text)
          },
          onError(e){
              Toast({ message: '您当前的浏览器不支持一键复制，请手动复制！', duration: 2000 , position:'bottom'});
          }
      }
  }
</script>
<style lang="scss" scoped>
  .PolicyDown{
    background: #eee;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom:0;
    /*padding-top: pxToRem(90);*/
    .header{
      @include border-1px('bottom');
    }
    .content{
      background: #fff;
      .pro_title{
        font-size: pxToRem(36);
        line-height: pxToRem(48);
        letter-spacing: 0;
        color: #333;
        padding: pxToRem(20) pxToRem(20) pxToRem(20) pxToRem(30);
        @include border-1px('bottom');
      }
      .pro_art{
        @include border-1px('bottom');
        overflow: hidden;
        .art_title{
          margin-left: pxToRem(50);
          line-height: pxToRem(40);
          font-size: pxToRem(30);
          padding: pxToRem(31) 0;
          color: #333;
        }
        .art_ctn{
          padding: 0 pxToRem(100);
          .art_button{
            width: pxToRem(178);
            height: pxToRem(80);
            line-height: pxToRem(80);
            text-align: center;
            background-color: $blue;
            color: #fff;
            border-radius: pxToRem(10);
            margin-bottom: pxToRem(50);
            float: right;
          }
          &.ctn1{
            input{
              display: block;
              width: pxToRem(490);
              height: pxToRem(81);
              border-radius: pxToRem(10);
              border: solid 2px #999;
              font-size: pxToRem(30);
              line-height: pxToRem(81);
              padding: 0 pxToRem(30);
              &::placeholder{
                color: #999;
              }
            }
            .art_button{
              margin-top: pxToRem(29);
            }
          }
          &.ctn2{
            .art_email{
              width: pxToRem(580);
              color: #999;
              word-wrap: break-word;
            }
          }
        }
      }
      .pro_foo{
        padding:pxToRem(43) pxToRem(26) pxToRem(80) pxToRem(80);
        position: relative;
        font-size: pxToRem(24);
        line-height: pxToRem(40);
        letter-spacing: 0;
        color: #666;
        .foo_s{
          position: absolute;
          top:pxToRem(43);
          left: pxToRem(30);
          color: red;
        }
        .red{
          color: red;
        }
        .pro_foo_padding {
          padding-left: pxToRem(54);
        }
      }
    }
    .foot_btn{
      display: block;
      width: 100%;
      height: pxToRem(100);
      line-height: pxToRem(100);
      font-size: pxToRem(40);
      background: $blue;
      color: #fff;
      text-align: center;
    }
    .mar_left_40{
      margin-left: pxToRem(40);
    }
  }

</style>
