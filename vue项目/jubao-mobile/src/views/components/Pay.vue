<template>
    <div class="pay">
      <transition name="pay">
        <div class="all" v-show="flag">
          <!--<div class="header">在线支付</div>-->
          <v-header title="在线支付" backIcon="icon-cancel" :backUrl="cancelLink"></v-header>
          <div class="header_repeat"></div>
          <div class="content">
            <ul>
              <li class="title">选择支付方式：</li>
              <li @click="payType=2"><i class="iconfont icon-zhifubao"></i><span class="txt">支付宝</span><i class="iconfont radio" :class="payType===2?'icon-duigou':'icon-yuan'"></i></li>
              <li @click="payType=1"><i class="iconfont icon-weixin"></i><span class="txt">微信</span><i class="iconfont radio" :class="payType===1?'icon-duigou':'icon-yuan'"></i></li>
            </ul>
          </div>
          <div class="bottom" @click="confrimPay" v-touchFeel>
            确认支付{{price | showPrice}}
          </div>
        </div>
      </transition>

      <Dialog :successBtn="'支付完成'"
              :successClose="false"
              title=""
              ref="baofu"
              @success="baofuFinish"
      >
        <div class="pay_body">
          <div>
            <p class="pay_title" v-show="payType == 1">微信二维码</p>
            <p class="pay_title" v-show="payType == 2">支付宝二维码</p>
            <p>{{time}}</p>
          </div>
          <div class='QR'>
            <img v-if="erweima_url" :src='erweima_url'>
            <div v-else class="err_msg">二维码请求失败</div>
          </div>
          <p>温馨提示</p>
          <p>此二维码将在2小时后失效，请尽快支付</p>
          <div class="tip" v-if="payType == 1">
            <p>因微信支付未开放“长按二维码识别支付”接口，请您使用另一部手机的微信扫码完成支付</p>
            <!--<p style='font-weight: bold;text-align: left;'>【方案一】：请将付款二维码截屏 → 进入个人微信首页 → 右上角“+” → “扫一扫” → 点击右上角“从相册选取二维码” → 选取付款二维码截图 → 立即支付"</p>
            <p style='font-weight: bold;text-align: left;'>【方案一】：请使用另一部手机扫码完成支付</p>-->
          </div>
          <div class="tip" v-if="payType == 2">
            <p>请您使用“支付宝>扫一扫”功能完成支付，具体操作方式如下：</p>
            <p class="bold">【方案一】：请将付款二维码截屏 → 打开支付宝 → “扫一扫” → 点击右上角“相册” → 选取付款二维码截图 → 立即支付</p>
            <p class="bold">【方案二】：请使用另一部手机扫码完成支付</p>
          </div>
        </div>
      </Dialog>

      <transition name="fade">
        <div class="bg" @click="close" v-show="flag"></div>
      </transition>

    </div>
</template>

<script>
  import QRious from 'qrious';
  import Dialog from 'base/dialog/Dialog';
  import {Toast,Indicator,MessageBox} from "mint-ui"
  import {cmnBaofuPayurl,cmnBaoFinish} from "../../assets/js/api"
  import {showData} from "../mixins/index.js"
  import {nameToType,nameToAjax} from "../../assets/js/common"

  //页面需要传参 orderId,productType,
  export default {
    props:{
      productType:{
        type:String,
      },
      orderId:{},
      backOrderLink:{},
      cancelLink:{}
    },
    components:{
      Dialog
    },
    data() {
      return {
        payType:null, //1微信支付，2支付宝支付
        price:"",
        erweima_url:'',
        time:'',
        flag:false,
      }
    },
    created() {
      this.init();
    },
    mixins:[showData],
    methods: {
      init(){
        Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
        //nameToAjax => zcbOrderInfo || ygbOrderInfo || spbOrderInfo || phbOrderInfo || hynbOrderInfo
        nameToAjax(this.productType).info(this.orderId).then((res)=>{
          console.log(res)
          Indicator.close();
          if(res.err_code === 0){
            let data = res.data || res.order;
            this.price = data.discount?data.price-data.discount:data.price;
          }else{
            Toast({message:res.err_msg||'未知错误！',position:'bottom'})
          }
        })

      },
      confrimPay(){
        if(!this.payType){Toast({message: "请选择一种支付方式", position: 'bottom'});return ;}
        Indicator.open({text: '处理中...', spinnerType: 'fading-circle'});
        cmnBaofuPayurl({
          "amount":this.price*1 ,
          "order_id": this.orderId*1,
          "pay_type": this.payType,
          "product_type":nameToType(this.productType),
          "additional_info":this.productType
        }).then(res=>{
          Indicator.close();
          if(res.err_code == 0) {
            let now = new Date();
            this.time = now.toLocaleDateString() + ' ' + now.toTimeString().slice(0, 8);
            console.log(QRious)
            let qr = new QRious({
              value: res.pay_url,
              background: 'white',
              //backgroundAlpha: 0.8,
              foreground: 'black',
              //foregroundAlpha: 0.8,
              level: 'H',
              padding: 0,
              size: this.payType===1?160:180,
            });
            this.erweima_url = qr.toDataURL();
            this.$refs.baofu.open();
          }else{
            Toast({message:res.err_msg||'未知错误！',position:'bottom'})
          }
        }).catch((err)=>{Indicator.close();})
      },
      baofuFinish(){
        cmnBaoFinish({
          amount: this.price*1,
          order_id: this.orderId*1,
          product_type: nameToType(this.productType),
          additional_info: this.productType,
        }).then((res)=>{
          if(res.err_code == 1109){
            this.$refs.baofu.close();
            MessageBox.alert('支付成功！').then(action=>{
              if(this.productType === 'ygbOrder' || this.productType === 'spb' || this.productType === 'hcb' || this.productType === 'dchynb') {
                this.$router.push(this.backOrderLink);
              }

              if(this.productType === 'hwb' || this.productType === 'llb' || this.productType === 'phb'){
                let info = {orderId:this.$route.query.orderId,productType:"dchyb"};
                let locationQuery = this.$getStorage("locationQuery");
                if(locationQuery && locationQuery.alias){info.alias=locationQuery.alias}
                window.location.href=this.$setLocationQuery("./vueStatic/paySuccess.html",{...info})
//                window.location.href="./vueStatic/paySuccess.html?orderId="+this.$route.query.orderId+"&productType=dchyb";
              }
            })
          }else if(res.err_code == 1116){
            Toast({message:'您还未支付此订单，也可能是网络延时，请稍后再试，如有疑问请联系客服',position:'bottom'})
          }else if(res.err_code == 1103){
            Toast({message:'未找到该订单的信息，如有疑问请联系客服',position:'bottom'})
          }else{
            Toast({message:res.err_msg||'未知错误',position:'bottom'})
          }
        })
      },
      open(){
        this.flag=true;
      },
      close(){
        this.flag=false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pay-enter-active, .pay-leave-active {
    transition: all .3s ease
  }
  .pay-enter, .pay-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    transform: translateY(pxToRem(760));
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity:0;
  }

.pay{
  .header{
    position: absolute;
  }
}


  .bg{
    position: fixed;left:0;top:0;bottom:0;right:0;background: rgba(0,0,0,.2);
    z-index:25;
  }
  .all{
    position: fixed;left:0;bottom:0;z-index: 28;
    width:100%;height:pxToRem(760);background: #fff;
  }


    .content{
      background: #fff;
      ul{
        li{
          height:pxToRem(110);
          @include border-1px('bottom');
          padding:0 pxToRem(20);overflow: hidden;
          display: flex;align-items: center;justify-content: space-between;
          span.txt{
            flex:1; font-size: pxToRem(30);margin-left:pxToRem(36);
          }
          i{
            margin-left:pxToRem(10);
            &.radio{
              position: relative;
              width:pxToRem(32);height:pxToRem(34);
              input[type=radio]{
                position: absolute;left:0;top:0;
                width:100%;height:100%;opacity: 0;
              }
            }
            &.icon-zhifubao{
              font-size:pxToRem(56);color:#3399ff;
            }
            &.icon-weixin{
              font-size:pxToRem(70);color:#33cc00;
            }
          }
        }
        li.title{
          font-size:pxToRem(36);
        }
      }
    }
    .pay_body{
      padding: pxToRem(60) pxToRem(20) pxToRem(20);
      font-size: pxToRem(28);
      text-align: center;
      .pay_title{
        font-size: pxToRem(32);
        font-weight: bold;
        margin-bottom: pxToRem(10);
      }
      .QR{
        font-size: 0;
        img{
          margin: 0 auto;
        }
        .err_msg{
          font-size: pxToRem(28);
          line-height: pxToRem(200);
          height: pxToRem(200);
        }
      }
      &>p{color: #666}
      .tip{
        text-align: left;
        text-indent: 2em;
        line-height: pxToRem(45);
        .bold{
          text-indent: 0;
          font-weight: bold;
        }
      }
    }
    .bottom{
      width:100%;height:pxToRem(100);
      line-height:pxToRem(100);text-align: center;
      position: absolute;left:0;bottom:0;
      background: #06abfa;color:#fff;font-size:pxToRem(40);
    }


</style>
