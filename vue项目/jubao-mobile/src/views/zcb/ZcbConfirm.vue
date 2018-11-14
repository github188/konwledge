<template>
  <div class="zcb_confirm">
    <v-header title="投保信息确认"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order_list zcb_order_list">
          <li><span class="label">投保人</span><span>{{policyholder}}</span></li>
          <li><span class="label">被保险人</span><span>{{beneficiary}}</span></li>
          <li><span class="label">头车牌号</span><span>{{plateNo}}</span></li>
          <li><span class="label">挂车牌号</span><span>{{plateExtraNo}}</span></li>
          <li><span class="label">始发地</span><span>{{startProvince+startCity}}</span></li>
          <li><span class="label">目的地</span><span>{{endProvince+endCity}}</span></li>
          <li class="block2"><span class="label">赔偿限额</span><span>{{coverage | showCoverage}}</span></li>
          <li  v-show="manualInfoList.length">
            <span>手输货物信息</span>
          </li>
          <li class="manualList" v-show="manualInfoList.length">
            <div class="manualList">
              <div class='table'>
                <div class="table_body">
                  <p class='table_line manual_head'>
                    <span class="manual_info1">运单号</span>
                    <span class="manual_info2">始发地</span>
                    <span class="manual_info3">目的地</span>
                    <span class="manual_info4">货物名称</span>
                    <span class="manual_info5">货物数量</span>
                    <span class="manual_info6">计量单位</span>
                  </p>
                  <p class='table_line' v-for="info in manualInfoList">
                    <span class="manual_info1">{{info.track_no}}</span>
                    <span class="manual_info2">{{info.beginning}}</span>
                    <span class="manual_info3">{{info.destination}}</span>
                    <span class="manual_info4">{{info.name}}</span>
                    <span class="manual_info5">{{info.quantity}}</span>
                    <span class="manual_info6">{{info.unit}}</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li class="upload_title zcb_create" v-show="imgList.length"><span>装车清单图片</span></li>
          <li class="block2 zcb_create upload_box" v-show="imgList.length">
            <ul class="img_boxs">
              <!--<li :style="background(val.file_url)" v-for="(val,idx) in imgList" :key="idx" @click="notice"></li>-->
              <PhotoShow v-for="(val,idx) in imgList" :key="idx" :url="val.file_url"></PhotoShow>
            </ul>
          </li>

          <li class="coupon_control_box">
            <span>使用优惠券:</span>
            <mt-switch v-model="couponValue" @change="switchCoupon" v-if="couponRow.length"></mt-switch>
            <span v-else="couponRow.length" class="no_coupon_text">暂无优惠券</span>
          </li>
          <Panel :flag="couponValue">
            <div class="panel_box">
              <li class="coupon_box" v-for="(val,idx) in couponRow">
                <input type="radio" :value="val.id" v-model="couponId" :id="val.id" class="radio">
                <label :for="val.id"> {{val.amount | showCoupon(val.type)}} {{val.type == 1 ? '元红包' : '折优惠券'}}，&nbsp;&nbsp;&nbsp;可抵扣{{val.amount | showCutPrice(val.type, initialPrice)}} 元</label>
              </li>
            </div>
          </Panel>

          <li class="price_count_all">
            <span>保费合计:</span>
            <div class="price_box">
              <span class="orange zcb_price">{{finalPrice | showConfirmPrice}}</span>
              <span class="yuan">元</span>
              <span class="initial_price_box">
            原价<span class="initial_price">{{initialPrice | showPrice}}</span>
          </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom_content">
        <div class="left_confirm msg_box" @click="back" v-touchFeel="{color:'#f2f2f2'}">返回并修改</div>
        <div class="right msg_box" @click="confirmToPay" v-touchFeel>确认并支付</div>
      </div>
    </div>

    <Dialog ref="payPassword" title="请输入您的支付密码"
            @success="pay"
            @cancel="cancel"
            :successClose="false">
      <div class="step">
        <label class="label"><span>支付密码：</span>
          <input type="password" v-model="payPassword" placeholder="请输入支付密码" maxlength="30">
        </label>
      </div>
    </Dialog>
    <Recharge type="zcb" ref="recharge"></Recharge>
    <SetPayPassword ref="setPayPassword" :beUsed="true"></SetPayPassword>
  </div>
</template>

<script>
  import {MessageBox, Indicator, Toast,Switch} from 'mint-ui';
  import {getZcbQuery,listStateCheck,goPageHref} from "../../assets/js/common"
  import { zcbOrderInfo, zcbOrderTryInfo, cmnCouponList, cmnSmsSend, cmnUserUpdate, zcbOrderTryPay, zcbOrderPay, cmnUserInfo, zcbDepositNew, zcbUserInfo} from '../../assets/js/api';
  import {showData,showBg} from "../mixins/index.js"
  import Dialog from '../../base/dialog/Dialog';
  import Recharge from "../components/Recharge.vue"
  import Panel from "../../base/panel/Panel.vue"
  import SetPayPassword from "../components/SetPayPassword.vue"
	import PhotoShow from '../components/PhotoShow.vue'
  import Vue from "vue"
  Vue.component(Switch.name, Switch);

  export default {
    components:{
      Dialog,Recharge,Panel,SetPayPassword,PhotoShow
    },
    data() {
      return {
        policyholder: "",
        beneficiary: "",
        startProvince: "",
        startCity: "",
        endProvince: "",
        endCity: "",
        coverage: "",
        distance: "",
        plateNo:"",
        plateExtraNo:"",
        imgList:[],
        orderStatus:"", //订单状态
        payPassword:"",//
        couponValue:false,
        couponRow:[], //优惠券列表

        coupon: false, //是否选择优惠券
        couponId: "", //选择的优惠券id
        isFormal: false,
        payFlag: false, // 按钮禁用
        balance: 0, //余额
        initialPrice:"",//原本的价格
        manualInfoList:[{id:0,track_no:"111",beginning:"武汉",destination:"上海",name:"猪",quantity:"1",unit:"头"}],
				hasExcel:false,
      }
    },
    beforeRouteEnter(to,from ,next){
      next(vm=> {
        Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
        zcbOrderInfo(vm.$route.query.orderId).then((res) => {
          Indicator.close();
          if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
          vm.setData(res)
        });
        vm.getCouponInfo();//获取优惠券
      })
    },
    created() {

    },
    mounted(){
      this.$refs.setPayPassword.close();
    },
    mixins: [showData,showBg],
    filters:{
      showConfirmPrice(val){
        return (val*1).toFixed(2)
      },
      number(value, status) {
        if (typeof value == 'number') {
          return value.toFixed(status);
        }
      },
      showCoupon(value, type) {//1-现金红包，2-折扣红包
        switch (type * 1) {
          case 1 :
            return (value / 100).toFixed(2);
            break;
          case 2 :
            return value / 1000;
            break;
        }
      },
      showCutPrice(value, type, initialPrice) {
        switch (type * 1) {
          case 1 :
            return (value / 100).toFixed(2);
            break;
          case 2 :
            return ((1 - value / 10000) * (initialPrice/100)).toFixed(2);
            break;
        }
      },
      showDate(value) {
        let day = value.substring(0, value.indexOf("T"));
        let hour = value.substring(value.indexOf("T") + 1, value.indexOf("+"));
        return day + " " + hour;
      }
    },
    computed: {
      finalPrice() {
        if (!this.couponId) {//优惠券value为空
          return (this.initialPrice/100).toFixed(2)
        } else {//优惠券类型不为空
          let priceItem = this.couponRow.filter((item) => {
            return item.id === this.couponId;
          })[0];
          let cutPrice=priceItem.type === 1?priceItem.amount / 100:(this.initialPrice/100) * (1 - priceItem.amount / 10000);
          let payPrice = (this.initialPrice/100 - cutPrice).toFixed(2);
          return payPrice;
        }
      },
      pwd1FlagNew() {
        if (this.judgeFlag) {
          if (!this.$store.state.reg_pwd.test(this.pwd1)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },//设置支付密码，边框提醒功能
      pwd2FlagNew() {
        if (this.judgeFlag) {
          if (!this.$store.state.reg_pwd.test(this.pwd2)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },//设置支付密码，边框提醒功能
      smsInputFlag() {
        if (this.judgeFlag) {
          let req = /^[0-9]{6}$/;
          if (!req.test(this.sms_code)) {
            this.smsTips = "验证码格式不正确";
            this.smsFlag = false;
            return true;
          } else {
            this.smsTips = "";
            this.smsFlag = true;
            return false
          }
        } else {
          return false;
        }
      }
    },
    methods: {
      setData(res){
        console.log("res",res);
        if(res.data.is_trial){Toast({message: "注意：本单为测试单！", position: 'bottom'});}
        this.isTrial=res.data.is_trial;
        this.policyholder = res.data.policyholder; //此处设置为投保人与被保险人相同
        this.beneficiary = res.data.policyholder;
        this.startProvince = res.data.start_province;
        this.startCity = res.data.start_city;
        this.endProvince = res.data.end_province;
        this.endCity = res.data.end_city;
        this.coverage = res.data.coverage;
        this.initialPrice = res.data.price;
        this.distance = res.data.distance;
        this.plateNo = res.data.plate_no;
        this.plateExtraNo = res.data.plate_extra_no;
        this.imgList = res.data.cargos.filter( L => {
          if(!L.beginning && L.file_url){
            if(L.file_url.includes("xlsx") || L.file_url.includes("xls")){
              this.hasExcel = true;
            }
            return L;
          }
        });
        this.manualInfoList = res.data.cargos.filter( L => {
          if(L.beginning){ L.quantity = L.quantity / 100;return L; }
        });
        this.orderStatus=res.data.status
      },
      getCouponInfo(){
        cmnCouponList({product: 2}).then((res) => {
          if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
          this.couponRow=res.rows.filter((val,idx)=>{
            return new Date() < new Date(val.expired_at) && !val.used
          });
        })
      },
      switchCoupon(oldVal){//oldVal参数为点击之前的状态
        this.couponId="";
      },
      back(){
				if(this.hasExcel){Toast({message: "本单部分装车清单文件格式仅支持在PC端查看投保！", position: 'bottom'}); return}
        this.$router.push({path:"/zcbCreate",query:{orderId:this.$route.query.orderId}})
      },
      confirmToPay(){//点击下一步
        if (!listStateCheck(this.orderStatus, 1)) {return;}//订单状态不为1则直接提示
        if(this.hasExcel){Toast({message: "本单部分装车清单文件格式仅支持在PC端查看投保！", position: 'bottom'}); return}
        if(this.isTrial){Toast({message: "本单为测试单,若需要体验请在PC端投保！", position: 'bottom'});return}
        Indicator.open({text: '正在检测账户信息...', spinnerType: 'fading-circle'});
        cmnUserInfo().then((res) => {
          Indicator.close();
          if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
          if (!res.data.pay_password) {//不存在支付密码
            this.$refs.setPayPassword.open();//打开设置支付密码框
            Toast({message: '请设置支付密码', duration: 1000, position: 'bottom'});
          } else { //已设置支付密码
            this.$refs.payPassword.open();//打开输入支付密码框
          }
        })
      },
      pay(){//输入支付密码
        if (!this.$store.state.reg_pwd.test(this.payPassword)) {
          Toast({message: "密码格式不正确", position: 'bottom'});
        }else{
          Indicator.open({text: '正在出单...', spinnerType: 'fading-circle'});
          zcbOrderPay({
            order_id: this.$route.query.orderId*1 ,
            pay_password: this.payPassword ,
            coupon_id: this.couponId*1
          }).then((res) => {
            Indicator.close();
            if(res.err_code === 1011){
              MessageBox.confirm('账户余额不足,是否充值?').then(action => {
                this.$refs.payPassword.close();
                this.payPassword="";
                this.$refs.recharge.open();
              }).catch(res=>{});
              return ;
            }

            if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
            this.$refs.payPassword.close();this.payPassword="";
            MessageBox.alert("支付成功", "提示").then(action => {
              let info = {orderId:this.$route.query.orderId,productType:"zcb"};
              let locationQuery = this.$getStorage("locationQuery");
              if(locationQuery && locationQuery.alias){info.alias=locationQuery.alias}
              window.location.href=this.$setLocationQuery("./vueStatic/paySuccess.html",{...info})
            })
          })
        }
      },
      cancel(){
        this.payPassword=""
      },
//      notice(e){
//        if(e.target.style["background-image"].includes("http://test.jubao56.com/res/2018/02/09/16/4615934/excelSampleOnly.jpg")){
//          Toast({message: "注意：此文件格式仅支持在pc端查看！", position: 'bottom'});
//        };
//      }
    }
  }
</script>

<style lang="scss" scoped>
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
  li.manualList {
    overflow: hidden;
    padding: 0 !important;
    .manual_head{
      background-color: rgba(6, 172, 249, .2);
    }
    .table{
      .table_body{
        overflow-x: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .table_line{
          display: flex;
          width: pxToRem(1450);
          @include border-1px('bottom');
          &>span{
            display: flex;
            min-height: pxToRem(80);
            line-height: pxToRem(40);
            align-items: center;
            justify-content: center;
            text-align: center;
            word-break:break-all;
            @include border-1px('right');
            &:last-child{
              &:after{
                border: none;
              }
            }
          }
          .manual_info1{
            width: pxToRem(300);
          }
          .manual_info2{
            width: pxToRem(250);
          }
          .manual_info3{
            width: pxToRem(250);
          }
          .manual_info4{
            width: pxToRem(200);
          }
          .manual_info5{
            width: pxToRem(200);
          }
          .manual_info6{
            width: pxToRem(150);
          }
        }
      }
    }
  }
  li.upload_box{
    height:auto;
    ul.img_boxs{
      display: flex;flex-wrap: wrap;
      justify-content: space-between;
      padding:0 pxToRem(50) pxToRem(50) pxToRem(50);
      li{
        /*display: inline-block;*/
        width:pxToRem(140);height:pxToRem(140);margin:pxToRem(10);padding:0;
        border:1px solid $borderColor;
      }
    }
  }
  li.price_count_all{
    span.yuan{
      margin-right: pxToRem(30);
    }
  }

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
