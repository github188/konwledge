<template>
  <div class="Recharge">
    <Dialog title="预交保费"
            ref='step1'
            @success="deposit"
            @cancel="closeRecharge"
    >
      <div class="step">
        <label class="label"><span>预交金额(元)：</span>
          <input type="number"  v-model="amount" placeholder="请输入金额" maxlength="30">
        </label>
        <p class="zcb_recharge_tips">温馨提示:为保证您的投保体验,新用户首次充值建议2000元以上</p>
      </div>
    </Dialog>
    <Dialog title="预交"
            ref='step2'
            :showCancelBtn="false"
            @success="deposit_jump"
    >
      <div class="step">
        <p class="mes">您的预交金额为 {{amount}} 元，您需要前往太平保险公司完成预交操作。</p>
      </div>
    </Dialog>
    <Dialog title="预交"
            ref='step3'
            :showCancelBtn="false"
            :successBtn="'已完成支付'"
            :successClose="false"
            @success="deposit_success"
    >
      <div class="step">
        <p class="mes">请在新打开的支付页面进行支付，支付完成前不要关闭此页面。</p>
        <p class="mes">预交成功后请使用账户余额前往个人中心--待付款订单完成支付！</p>
      </div>
    </Dialog>
    <!--宝付支付，应急支付-->
    <Dialog title="微信支付"
            ref='weixin'
            :showCancelBtn="false"
            :successBtn="'已完成支付'"
            :successClose="false"
            @success="checkYingJi"
    >
      <div class="step">
        <div class="weixinQR">
          <img
            :src="weixin_url"
            height="200"
            width="200"
          />
        </div>
        <!--1、请将付款二维码截屏，然后使用微信扫一扫功能中的从相册选择截屏照片支付；或者使用另一个微信来扫描此二维码支付；-->
        <p style="text-align: left; font-size: 12px;">1、请使用另一个微信来扫描此二维码支付；</p>
        <p style="text-align: left; font-size: 12px;word-break:break-all;">
          2、可到电脑端浏览器中打开网址：www.jubao56.com，然后登陆个人中心-整车保个人中心，使用预交功能进行充值；</p>
      </div>
    </Dialog>
  </div>
</template>
<script>
  import {Toast, Indicator} from 'mint-ui';
  import Dialog from 'base/dialog/Dialog';
  import {zcbDepositInfo,zxbDepositInfo, cmnBaofuPayurl, cmnBaoFinish, getToken} from 'assets/js/api';
  import QRious from 'qrious'
  import axios from 'axios'

  export default {
    components: {
      Dialog
    },
    props: {
      type: {
        type: String,
        required: true
      },
      insuranceType: {//1 ---- 太平；2----大地
        type: Number,
        required: false
      },
      hyxUserId: {
        type: Number,
        required: false
      }
    },
    created() {
      switch (this.type) {
        case "phb" :
          this.depositNewUrl = this.$store.state.hyxUrl + "/v1/phb/deposit/new";
          this.payCheckAjax = hyxDepositInfo;
          break;
        case "zcb" :
          this.depositNewUrl = this.$store.state.zcbUrl + "/v1/zcb/deposit/new";
          this.payCheckAjax = zcbDepositInfo;
          break;
      }
    },
    mounted(){
      //检测是否是微信
      this.isWx();
    },
    data() {
      return {
        step: 1,
        amount: '',
        payType: 1,
        payUrl: "",//跳转支付链接
        redirect_url: this.$store.state.redirectUrl,//充值成功后回调链接
        orderId: '',//充值订单id
        weixin_url: '',
        additional_info: String(Date.parse(new Date()) + Math.floor(Math.random() * 89) + 10), // 宝付唯一标识
      }
    },
    methods: {
      isWx(){
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          this.payType = 1;
        } else {
          this.payType = 2;
        }
      },
      open() {
        this.$refs.step1.open()
      },
      closeRecharge(){
        this.amount = ''
      },
      deposit() {
        //验证用户输入信息是否有误
        if (!this.checkInput()) return;
        //hyx大地用户，调用保付充值
        if(this.type==="phb" && this.insuranceType===2){
          this.emergent(this.hyxUserId);
          return
        }
        //打开loading
        Indicator.open({
          text: '请稍候...',
          spinnerType: 'fading-circle'
        });
        //发送创建充值订单请求
        let data = {'type': this.payType, redirect_url: this.redirect_url, "amount": this.amount * 1};
        if(this.type==="phb" && this.insuranceType===1)data.hyx_user_id=this.hyxUserId;
        console.log(this.type,this.depositNewUrl)
        axios({
          method: 'POST',
          url: this.depositNewUrl,
          headers: {'Authorization': 'Bearer ' + getToken()},
          data: data,
          timeout: 10000
        }).then((res) => {
          //关闭loading
          Indicator.close();
          if(!res.data){
            //太平失败，触发应急支付,保付支付
            this.emergent();
          } else if (res.data.err_code == 0) {
            this.$refs.step2.open();
            this.orderId = res.data.data.id;
            this.payUrl = res.data.data.pay_url;
          } else if (res.data.err_code == 1014) {
            Toast({message: '尊敬的客户：非常抱歉，您的账户暂时无法投保"整车保"，建议您选择其他险种，详询聚保服务热线: 40080-59680'})
          } else if (res.data.err_code == 1200) {
            Toast({message: '您尚未设置公司名称！'})
          } else {
            Toast({message: res.data.err_msg || '未知错误'})
          }
        }).catch((err) => {
          //关闭loading
          Indicator.close();
          console.log(11);
          //太平失败，触发应急支付,保付支付
          this.emergent();
        });
      },
      deposit_jump() {
        window.open(this.payUrl);
        this.$refs.step3.open();
      },
      deposit_success() {
        this.payCheckAjax(this.orderId).then((res) => {
          if (res.err_code !== 0) {
            Toast({message: res.err_msg || '未知错误'});
            return;
          }
//          this.amount = res.data.amount/100;
          switch (res.data.status) {
            case 1 :Toast("订单未支付");break;
            case 2 :Toast("订单已支付");this.$emit("refreshAmount", res.data.amount);this.$refs.step3.close();break;
            case 3 :Toast("订单支付失败");break;
            case 4 :Toast("订单已过期");break;
          }
        })
      },
      emergent() {
        let data = {amount: this.amount * 100, pay_type: 1, product_type: 1, additional_info: this.additional_info}
        cmnBaofuPayurl(data).then((res) => {
          if (res.err_code == 0) {
            let qr = new QRious({
              value: res.pay_url,
              background: 'white',
              //backgroundAlpha: 0.8,
              foreground: 'black',
              //foregroundAlpha: 0.8,
              level: 'H',
              padding: 25,
              size: 200,
            });
            this.weixin_url = qr.toDataURL();
            this.$refs.weixin.open();
          } else {
            Toast(res.err_msg || '未知错误')
          }
        })
      },
      checkYingJi() {
        let data = {
          amount: Number(this.amount * 100),
          product_type: 1,
          additional_info: this.additional_info
        };
        cmnBaoFinish(data).then((res) => {
          if (res.err_code == 1109) {
            this.$refs.weixin.close();
            this.$emit("refreshAmount", this.amount)
            Toast('充值成功')
          } else if (res.err_code == 1103) {
            Toast('未找到充值记录')
          } else if (res.err_code == 1116) {
            Toast('充值未完成')
          }
        })
      },
      checkInput() {
        if (this.amount < 1 || !Number.isInteger(this.amount*1)) {
          Toast({message: '请输入正确的充值金额',position:'bottom'});
          this.amount = '';
          return false;
        } else if(this.amount>0 && this.amount<1){
          this.emergent();
          return false;
        } else {
          return true;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .Recharge {
    .step {
      position: relative;
      min-height: pxToRem(80);
      font-size: pxToRem(24);
      padding: pxToRem(20) pxToRem(50);
      .label {
        width: 100%;
        height: pxToRem(160);
        margin: auto auto;
        display: flex;
        justify-content: center;
        align-items: center;
        input {
          display: block;
          /*width:pxToRem(220);*/
          height: pxToRem(60);
          padding: 0 pxToRem(10);
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
      .mes {
        text-align: center;
      }
      .weixinQR {
        img {
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
 .zcb_recharge_tips{
   font-size:pxToRem(12);
   color:blue;
 }
</style>
