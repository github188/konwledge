<template>
  <div class="zcb_confirm">
    <v-header title="投保信息确认"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order_list zcb_order_list">
          <li><span class="label">投保人</span><span>{{order.policyholder}}</span></li>
          <li><span class="label">被保险人</span><span>{{order.beneficiary}}</span></li>
          <li><span class="label">{{order.plate_extra_no?'头车牌号':'车牌号'}}</span><span>{{order.plate_no}}</span></li>
          <li v-if="order.plate_extra_no"><span class="label">挂车牌号</span><span>{{order.plate_extra_no}}</span></li>
          <li><span class="label">始发地</span><span>{{order.start_province + order.start_city || ''}}</span></li>
          <li><span class="label">目的地</span><span>{{order.end_province + order.end_city || ''}}</span></li>
          <li class="block2"><span class="label">责任限额</span><span>{{(order.coverage/10000)}}万元</span></li>
          <li class="upload_title zcb_create" v-if="imgList.length>0"><span>装车清单图片</span></li>
          <li class="block2 zcb_create upload_box" v-if="imgList.length>0">
            <div class="img_boxs">
              <!--<li :style="background(val)" v-for="(val,idx) in imgList" :key="idx"></li>-->
              <PhotoShow  v-for="(val,idx) in imgList" :key="idx" :url="val"></PhotoShow>
            </div>
          </li>
          <li><span class="label">保费合计:</span><span class="rg"><span class="red">{{order.price ? (order.price/100).toFixed(2) : '0.00'}} </span>元</span></li>
        </ul>
      </div>
      <div class="bottom_content">
        <router-link tag="div" :to="{path:'zxbCreate',query:{orderId}}" class="left_confirm msg_box"  v-touchFeel="{color:'#f2f2f2'}">返回并修改</router-link>
        <div class="right msg_box" @click="next">确认并支付</div>
      </div>
    </div>

    <Dialog ref="payPassword" title="请输入您的支付密码"
            @success="pay"
            @cancel="payPassword=''"
            :successClose="false"
    >
      <div class="step">
        <label class="label"><span>支付密码：</span>
          <input type="password" v-model="payPassword" placeholder="请输入支付密码" maxlength="30">
        </label>
      </div>
    </Dialog>
    <SetPayPassword ref="setPayPassword" :beUsed="true"></SetPayPassword>
  </div>
</template>

<script>
  import {MessageBox, Indicator, Toast} from 'mint-ui';
  import { zxbOrderInfo, zxbOrderPay, cmnUserInfo } from '../../assets/js/api';
  import {showBg} from "../mixins/index.js"
  import Dialog from '../../base/dialog/Dialog';
  import SetPayPassword from "../components/SetPayPassword.vue"
  import PhotoShow from '../components/PhotoShow.vue'


  export default {
    components:{
      Dialog,SetPayPassword,PhotoShow
    },
    data() {
      return {
        order:{},
        payPassword:''
      }
    },
    created() {
      this.orderId = this.$route.query.orderId;
      this.init();
    },
    mounted(){
      this.$refs.setPayPassword.close();
    },
    computed: {
      imgList(){
        return this.order.cargos ? this.order.cargos.map(item => item.file_url) : [];
      }
    },
    methods: {
      async init(){
        Indicator.open();
        try{
          let res = await zxbOrderInfo(this.orderId);
          Indicator.close();
          if(res.err_code !== 0){Toast({message: res.err_msg || "未知错误", position: 'bottom'});return}
          this.order = res.data;
        }catch (e){
          Indicator.close();
        }
      },
      async next(){
        let res = await cmnUserInfo();
        if(res.err_code !== 0){Toast({message: res.err_msg || "未知错误", position: 'bottom'});return}
        if(!res.data.pay_password){ //不存在支付密码
          this.$refs.setPayPassword.open();//打开设置支付密码框
          Toast({message: '请设置支付密码', duration: 1000, position: 'bottom'});
        }else{
          this.$refs.payPassword.open();
        }
      },
      async pay(){
        if (!this.$store.state.reg_pwd.test(this.payPassword)) {Toast({message: "密码格式不正确", position: 'bottom'});return;}
        Indicator.open();
        try{
          let res = await zxbOrderPay({order_id:this.orderId*1,pay_password:this.payPassword});
          Indicator.close();
          if(res.err_code === 1011){
            MessageBox.confirm('账户余额不足,是否充值?').then(action => {
              this.$refs.payPassword.close();
              this.payPassword="";
              this.$router.push({path:'/zxbDescription',query:{orderId:this.orderId}});
            })
          }
          if(res.err_code !== 0){Toast({message: res.err_msg || "未知错误", position: 'bottom'});return}
          MessageBox.alert("支付成功", "提示").then(action => {
            let info = {orderId:this.orderId,productType:"zxb"};
            let locationQuery = this.$getStorage("locationQuery");
            if(locationQuery && locationQuery.alias){info.alias=locationQuery.alias}
            window.location.href=this.$setLocationQuery("./vueStatic/paySuccess.html",{...info})
//            window.location.href="./vueStatic/paySuccess.html?orderId="+this.orderId+"&productType=zxb";
          })
        }catch (e){
          Indicator.close();
        }
      },
      background(url) {
        if(url.includes("xlsx") || url.includes("xls")){
          url = "http://test.jubao56.com/res/2018/02/09/16/4615934/excelSampleOnly.jpg";
        }
        return {
          backgroundImage: 'url("' + url.replace(/\\/g, "/").replace(/\s/g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29") + '")',
          backgroundSize:'contain',
          backgroundRepeat:'no-repeat',
          backgroundPosition:'center'
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/create";
  .main .order_list{
    padding-bottom: pxToRem(100+10);
  }
  .no_coupon_text{
    font-size:pxToRem(26);color:#aaa;text-decoration: line-through;
  }

  .img_list{
    width:pxToRem(140);height:pxToRem(140);border:1px solid #b1b1b1;
    margin:pxToRem(10);
  }
  ul.zcb_order_list{
    li{
      height:pxToRem(90);
      &.manualList {
        height: auto;
      }
    }
  }
  li.upload_box{
    height:auto;
    .img_boxs{
      display: flex;flex-wrap: wrap;
      justify-content: space-between;
      padding:0 pxToRem(50) pxToRem(50) pxToRem(50);
    }
  }
  .rg{
    float: right;
    margin-right: pxToRem(30);
  }
  .red{color: red !important;}
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
</style>
