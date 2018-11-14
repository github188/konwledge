<template>
  <div>
      <div class="bg">
          <div class="switch_orders">
              <router-link class="unpaid tab" :to="'/' + productEnName + 'Orders?type=unpaid'" @click.native="toggle('unpaid')" tag="span">
                  <span :class="{'tab_on': $route.query.type === 'unpaid'}">待付款</span>
              </router-link>
              <router-link class="paid tab"  :to="'/' + productEnName + 'Orders?type=paid'" @click.native="toggle('paid')" tag="span">
                  <span :class="{'tab_on': $route.query.type === 'paid'}">已完成</span>
              </router-link>
          </div>

          <div class="main">
              <!--待付款订单-->
              <div class="unpaidList" v-show="$route.query.type == 'unpaid'">
                  <div v-for="(order, index) in unpaidOrders" class="cell">
                      <p>投保时间: &nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
                      <p>车牌号: &nbsp;&nbsp;&nbsp;&nbsp;头：{{ order.plate_no }} &nbsp;&nbsp;&nbsp;&nbsp; 挂：{{ order.plate_extra_no }}</p>
                      <p>运输线路: &nbsp;{{ order.start_province + order.start_city }} — {{ order.end_province + order.end_city }}</p>
                      <p>保单状态: &nbsp;{{ order.status === 1 ? "待支付" : "" }}</p>
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
                      <p>投保时间: &nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
                      <p>车牌号: &nbsp;&nbsp;&nbsp;&nbsp;头：{{ order.plate_no }} &nbsp;&nbsp;&nbsp;&nbsp; 挂：{{ order.plate_extra_no }}</p>
                      <p>运输线路: &nbsp;{{ order.start_province + order.start_city }} — {{ order.end_province + order.end_city }}</p>
                      <p>保单状态: &nbsp;{{ order.status === 4 ? "保单生效" : "" }}</p>
                      <p class="control">
                          <span @click="showDetail(order)" class="order_detail">查看详情</span>
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
      <BackTop></BackTop>
  </div>
</template>

<script>
  import { Toast, MessageBox,Indicator } from 'mint-ui'
  import { cmnProductList,dchybOrderList,dchybOrderStatus } from '../../assets/js/api'
  import { ordersFunc } from '../mixins';
  import { productData } from 'assets/js/common'
  import BackTop from '../components/BackTop.vue'

  export default {
      props: {
          productEnName: {
              type: String,
              default: 'hwb',
              required: true
          },
          productCnName: {
              type: String,
              default: '货物保',
              required: true
          }
      },
      components: {
        BackTop
      },
      mixins: [ ordersFunc ],
      data(){
          return {
              productId: "",
              getPaidOrdersFunc : dchybOrderList, // 获取已完成订单的api
              unpaidStatus : 1, // 未完成订单的状态码，查询多个可把对应状态码累加
              paidStatus : 4, // 已完成订单的状态码
              cancelOrderFunc : dchybOrderStatus, // 取消本产品订单的api
              cancelOrderStatus : 2, // 取消订单的状态码
          }
      },
      methods: {
          showDetail(order){
            let info = {orderId:order.id,productType:this.productEnName};
            let locationQuery = this.$getStorage("locationQuery");
            if(locationQuery && locationQuery.alias){info.alias=locationQuery.alias}
            window.location.href=this.$setLocationQuery("./vueStatic/paySuccess.html",{...info})
          },
          toPay(order){
              this.$router.push({ name: this.productEnName + 'Confirm', query: { orderId:order.id }})
          },
          // 获取未支付保单数据
          getUnpaidData(type){
              Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
              this.getPaidOrdersFunc({
                  page: this.unpaidPage,
                  rows: 10,
                  status: this.unpaidStatus,
                  product_name: this.productCnName
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
                  product_name: this.productCnName
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
      },
  }
</script>
<style lang="scss" scoped>
  @import '~assets/scss/animate.scss';
  .header2{
    background: #06acf9;
    .header_back{
      .iconfont{
        color:#fff;
      }
      span{

      }
    }
    .title{
      color:#fff;
    }
    .header_right{
      .iconfont{

      }
      span{

      }
    }
  }

  .bg{
    background:#EDEDED;
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
