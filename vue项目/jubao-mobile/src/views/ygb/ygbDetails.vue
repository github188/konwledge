<template>
  <div class="YgbConfirm">
    <v-header :title="ygbOrderStatus.statusGetMsg(status*1)"></v-header>
    <div class="content_box">
      <div class="content">
        <ul class="order_list">
          <li><span class="label">投保人</span><input type="text" id="insPerson" disabled placeholder="请填写投保人名称" v-model="insPerson"/></li>
          <li><span class="label">被保险人</span><input type="text" id="insedPerson" disabled placeholder="请填写被保险人名称" v-model="insedPerson"/></li>
          <li><span class="label">公司地址</span><span>{{province}} {{city}} {{district}}</span></li>
          <li>{{address}}</li>
          <li><span class="label">保障方案</span><span>{{caseTypeName}}</span></li>
          <li @click="manListShow=!manListShow">
            <span class="label">参保人员</span>
            <i class="iconfont icon-right lr" :class="{rotate:manListShow}"></i>
          </li>
          <Panel class="panel" :flag="manListShow" :change="driverList.concat(clerkList)">
            <li>现场操作 {{driverNum}}人</li>
            <li v-for="(item,index) in driverList"><span class="label">{{item.name}}</span><span class="center">{{item.idcard}}</span></li>
            <li>非现场操作 {{clerkNum}}人</li>
            <li v-for="(item,index) in clerkList"><span class="label">{{item.name}}</span><span class="center">{{item.idcard}}</span></li>
          </Panel>
          <Invoice :edit="false" :invoiceData="invoiceData" :addressData="addressData"></Invoice>
          <li class="bao mar_top_20"><span class="label">保费合计：</span><span class="lr yellow">￥{{(price/100).toFixed(2)}}</span></li>
        </ul>
      </div>
      <div class="foot" v-if="status == ygbOrderStatus.msgGetStatus('待支付')">
        <router-link :to="{path:'/ygbCreate',query:{orderId:orderId}}" class="btn" >返回并修改</router-link>
        <a @click="open" class="btn bg_blue" >确认并支付</a>
      </div>
      <div class="foot" v-if="status == ygbOrderStatus.msgGetStatus('待上传盖章后的投保单')">
        <router-link :to="{path:'/ygbCreate',query:{orderId:orderId}}" class="btn" >返回并修改</router-link>
        <router-link :to="{path:'/policyDown',query:{orderId:orderId,product:'ygb'}}" class="btn bg_blue" >下载投保单</router-link>
      </div>
      <div class="foot one" v-if="status == ygbOrderStatus.msgGetStatus('已支付,待出单')">
        <router-link :to="{path:'/ygbCreate'}" class="bg_blue">继续投保</router-link>
      </div>
    </div>

    <Pay ref="pay"
          :productType="'ygbOrder'" :orderId="$route.query.orderId" :backOrderLink="'/ygbOrders?type=unpaid'">
    </Pay>
  </div>
</template>
<script>
  import Pay from "../components/Pay.vue"
  import Panel from 'base/panel/Panel'
  import { ygbOrderInfo } from 'assets/js/api'
  import { Toast,Indicator } from 'mint-ui';
  import { ygbOrderStatus } from 'assets/js/ygbStatus'
  import {invoiceConfirm} from '../mixins/invoice'
  import Invoice from 'views/components/Invoice'

  export default {
    components:{
      Panel,
      Pay,
      Invoice
    },
    mixins:[invoiceConfirm],
    data(){
      return{
        insPerson:'',//投保人
        insedPerson:'',//被投保人
        province:'',//省
        city:'',//市
        district:'',//区
        address:'',//街道
        caseTypeName:'',//方案名称
        driverNum:0,//现场操作人数
        clerkNum:0,//非现场操作人数
        driverList:[],//现场操作列表
        clerkList:[],//非现场操作列表
        price:0,//保费
        manListShow:true, //切换flag
        orderId : this.$route.query.orderId,
        status : this.$route.query.status,
        ygbOrderStatus
      }
    },
    created(){
      this.init();
    },
    methods:{
      init(){
        Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
        ygbOrderInfo(this.orderId).then((res)=>{
          Indicator.close();
          console.log(res)
          if(res.err_code===0){
            this.insPerson = res.order.company_name;
            this.insedPerson = res.order.company_name;
            this.province = res.order.province;
            this.city = res.order.city;
            this.district = res.order.district;
            this.address = res.order.address;
            this.caseTypeName = res.order.product_name.replace('员工保','');
            this.driverNum = res.order.driver_number;
            this.clerkNum = res.order.clerk_number;
            this.price = res.order.price;
            res.order.employee_list.forEach((item)=>{
              if(item.type === 1){
                this.driverList.push(item)
              }else if(item.type === 2){
                this.clerkList.push(item)
              }
            });
						this.setData(res);
          }else{
            Toast({message:res[1].err_msg || '未知错误',position:'bottom'})
          }
        }).catch(()=>{
          Indicator.close();
        })
      },
      back(){
        this.$router.push({path:'/ygbCreate',query:{orderId:this.orderId}})
      },
      open(){
        this.$refs.pay.open()
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/ygb/ygbCommon";
  @import "../../assets/scss/ygb/ygbConfirm";

  .foot.one{
    background: $blue;
    text-align: center;
    line-height: pxToRem(100);
    font-size: pxToRem(40);
    color: #fff;
    .bg_blue{
      color: #fff;
    }
  }
  .bao .label{
    width: pxToRem(250) !important;
  }
</style>
