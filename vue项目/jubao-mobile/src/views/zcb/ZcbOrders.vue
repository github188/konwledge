<template>
<div class="zcb_orders">
  <v-header title="我的保单" :touchFeel="{color:'#0facf7'}"></v-header>
  <div class="content_box">
    <div class="content orders_container">
      <div class="switch_orders">
        <router-link class="unpaid tab" to="/zcbOrders?type=unpaid" @click.native="toggle('unpaid')" tag="span">
          <span :class="{'tab_on': $route.query.type === 'unpaid'}">待付款</span>
        </router-link>
        <router-link class="paid tab"  to="/zcbOrders?type=paid" @click.native="toggle('paid')" tag="span">
          <span :class="{'tab_on': $route.query.type === 'paid'}">已完成</span>
        </router-link>
      </div>
      <div class="main">
        <!--待付款订单-->
        <div class="unpaidList" v-show="$route.query.type == 'unpaid'">
          <div v-for="(order, index) in unpaidOrders" class="cell">
            <div v-if="order.is_trial" class="tip">试用单</div>
            <p>投保时间: &nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
            <p>车牌号: &nbsp;&nbsp;&nbsp;&nbsp;头：{{ order.plate_no }} &nbsp;&nbsp;&nbsp;&nbsp; 挂：{{ order.plate_extra_no }}</p>
            <p>运输线路: &nbsp;{{ order.start_province + order.start_city }} — {{ order.end_province + order.end_city }}</p>
            <p class="control">
              <span @click='cancelOrder(order.id, index)' class="cancel">取消</span>
              <span @click="toPay(order)" class="pay">去付款</span>
            </p>
          </div>

          <div class="look_more" >
            <span class="more" v-if="unpaidOrders.length < unpaidTotal">
                <i class="iconfont icon-loading loading_more"></i>上拉加载
              </span>
            <span class="more" v-else>无更多数据</span>
          </div>
        </div>

        <!--已付款订单-->
        <div class="paidList" v-show="$route.query.type == 'paid'">
          <div v-for="(order, index) in paidOrders" class="cell">
            <div v-if="order.is_trial" class="tip">试用单</div>
            <p>投保时间: &nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
            <p>车牌号: &nbsp;&nbsp;&nbsp;&nbsp;头：{{ order.plate_no }} &nbsp;&nbsp;&nbsp;&nbsp; 挂：{{ order.plate_extra_no }}</p>
            <p>运输线路: &nbsp;{{ order.start_province + order.start_city }} — {{ order.end_province + order.end_city }}</p>
            <p class="control">
              <span @click="showDetail(order)" class="order_detail">查看详情</span>
              <!--<span @click="repay(order.id)" class="order_detail">再次投保</span>-->
            </p>
          </div>

          <div class="look_more">
            <span class="more" v-if="paidOrders.length < paidTotal">
              <i class="iconfont icon-loading loading_more"></i>上拉加载
            </span>
            <span class="more" v-else>无更多数据</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BackTop></BackTop>
</div>
</template>

<script>
import { Toast, MessageBox,Indicator } from 'mint-ui'
import { zcbOrderList,zcbOrderStatus ,zcbOrderInfo,zcbOrderSave} from '../../assets/js/api'
import { ordersFunc } from '../mixins';
import BackTop from '../components/BackTop.vue'
import {setLocationQuery} from "../../libs/js/LocationTransform"

export default {
    mixins: [ ordersFunc ],
    components: {
      BackTop
    },
    data(){
        return {
            getPaidOrdersFunc : zcbOrderList, // 获取已完成订单的api
            unpaidStatus : 1, // 未完成订单的状态码，查询多个可把对应状态码累加
            paidStatus : 4, // 已完成订单的状态码
            cancelOrderFunc : zcbOrderStatus, // 取消本产品订单的api
            cancelOrderStatus : 2, // 取消订单的状态码
        }
    },
    methods: {
        repay(orderId){
          Indicator.open({text: '订单信息查询中...', spinnerType: 'fading-circle'});
          zcbOrderInfo(orderId).then(res=>{
            Indicator.close();
            if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
            Indicator.open({text: '新订单创建中...', spinnerType: 'fading-circle'});
            return zcbOrderSave(this.resetOrderData(res.data))
          }).then(res=>{
            Indicator.close();
            if(!res){return ;}
            if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
            this.$router.push({path:"/zcbConfirm",query:{orderId:res.data.id,status:1}})
          })
        },
        // 获取未支付保单数据
        getUnpaidData(type){
          Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
          this.getPaidOrdersFunc({
            platform_type:1,
            page: this.unpaidPage,
            rows: 10,
            status: this.unpaidStatus,
            is_trial: false
          }).then((res)=>{
            Indicator.close();
            if(res.err_code !==0 ){ MessageBox( "提示",res.err_msg );return ;}
            let unpaidLoadOrders = res.rows;
            if(type === "init"){
              this.unpaidOrders= unpaidLoadOrders;
            }else {
              this.unpaidOrders= this.unpaidOrders.concat(unpaidLoadOrders);
            }
            this.unpaidTotal = res.total;
          })
        },
        // 获取已完成保单数据
        getPaidData(type){
          Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
          this.getPaidOrdersFunc({
            page: this.paidPage,
            rows: 10,
            status: this.paidStatus,
            is_trial: false
          }).then((res)=>{
            Indicator.close();
            if(res.err_code !==0 ){ MessageBox("提示",res.err_msg);return ;}
            let paidLoadOrders = res.rows;
            if(type === "init"){
              this.paidOrders= paidLoadOrders;
            }else {
              this.paidOrders= this.paidOrders.concat(paidLoadOrders);
            }
            this.paidTotal = res.total;
          })
        },
        showDetail(order){
          let info = {orderId:order.id,productType:"zcb"};
          let locationQuery = this.$getStorage("locationQuery");
          if(locationQuery && locationQuery.alias){info.alias=locationQuery.alias}
          window.location.href=this.$setLocationQuery("./vueStatic/paySuccess.html",{...info})
//          window.location.href="./vueStatic/paySuccess.html?orderId="+order.id+"&productType=zcb";
        },
        toPay(order){
//          this.$router.push({ name: 'zcbCreate', query: { status:(order.is_trial ? 0 : 1)+'_' +  order.id }})
          this.$router.push({ name: 'zcbConfirm', query: { status:(order.is_trial ? 0 : 1),orderId:order.id }})
        },
        resetOrderData(data){
          let saveData= {
            "id": 0,
            "policyholder":data.policyholder,
            "beneficiary":data.beneficiary,
            "plate_no": data.plate_no,
            'plate_extra_no': data.plate_extra_no,
            "start_province": data.start_province,
            "start_city": data.start_city,
            "end_province": data.end_province,
            "end_city": data.end_city,
            "coverage": data.coverage * 1,
            "cargos": data.cargos.map(L=>{L.id=0;return L})
          }
          return saveData
        },
    },

}
</script>
<style lang="scss" scoped>
  @import '~assets/scss/animate.scss';
  .mint-swipe{
    height:pxToRem(400);
  }
  .header2{
    background: #00a0e9;
    color: #fff;
  }
  /*.bg{*/
    /*background:#EDEDED;*/
  /*}*/
  .content_box{
    background: #EDEDED;bottom:0;
  }
  .switch_orders{
    background: #fff;
    height:pxToRem(80);margin-bottom:pxToRem(10);
    display: flex;justify-content: space-between;align-items: center;
    span.tab{
      flex: 1;height:100%;display: flex;justify-content: center;align-items: center;
      span{
        font-size:pxToRem(40);
        padding: pxToRem(14) pxToRem(40);
      }
      span.tab_on{
        color: #0FACF7;border-bottom: 2px solid #0facf7;
      }
    }
  }
  .main{
    .cell{
      background: #fff;
      margin-bottom: 10px;
      padding:pxToRem(20) pxToRem(40);
      p{
        line-height:pxToRem(44)
      }
      p.control{
        text-align:right;
        margin:pxToRem(30) 0 pxToRem(10);
        span{
          padding: pxToRem(6) pxToRem(20);
          border-radius: pxToRem(50)
        }
        span.cancel{
          border:1px solid rgb(234, 234, 234);
        }
        span.pay{
          border: 1px solid #0facf7;color:#0facf7;
        }
        span.order_detail{
          border: 1px solid #0facf7;color:#0facf7;
        }
      }
    }
    .look_more{
      margin-top:pxToRem(20);text-align: center;
      span.more{
        display: block;
        width: 100%;
        height: pxToRem(90);
        line-height:  pxToRem(90);
        border-radius: pxToRem(3);
        cursor: pointer;
        color: #3a495c;
        font-size: pxToRem(28);
        background: #fff;
      }
    }
  }
</style>
