<template>
    <div class="spb_orders">
      <v-header title="我的保单" :touchFeel="{color:'#0facf7'}" class="blue_header"></v-header>
      <div class="content_box">
        <div class="content orders_container">
          <div class="tab">
            <router-link class="unpaid tab" to="/spbOrders?type=unpaid" @click.native="toggle('unpaid')" tag="div">
              <span :class="{'tab_on': $route.query.type === 'unpaid'}">未生效保单</span>
            </router-link>
            <router-link class="paid tab"  to="/spbOrders?type=paid" @click.native="toggle('paid')" tag="div">
              <span :class="{'tab_on': $route.query.type === 'paid'}">已生效保单</span>
            </router-link>
          </div>
          <div class="unpaidList" v-show="$route.query.type == 'unpaid'">
            <div class="order_box" v-for="(order, index) in unpaidOrders" :key="index">
              <p>投保时间: &nbsp;&nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
              <p>被投保人: &nbsp;&nbsp;{{ order.beneficiary }}</p>
              <p>寄送地址: &nbsp;&nbsp;{{ order.deliver_address }}</p>
              <p>保单状态: &nbsp;&nbsp;{{ order | transStatus }}</p>
              <p class="control">
                <span @click='cancelOrder(order.id, index)' class="cancel">取消</span>
                <router-link class="pay" :to="detail(order)" tag="span">{{ order.handle }}</router-link>
              </p>
            </div>
            <div class="look_more" >
              <span class="more" v-if="unpaidOrders.length < unpaidTotal">
                <i class="iconfont icon-loading loading_more"></i>上拉加载
              </span>
              <span class="more" v-else>无更多数据</span>
            </div>
          </div>
          <div class="paidList" v-show="$route.query.type == 'paid'">
            <div class="order_box" v-for="(order, index) in paidOrders" :key="index">
              <p>投保时间: &nbsp;&nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
              <p>被投保人: &nbsp;&nbsp;{{ order.beneficiary }}</p>
              <p>寄送地址: &nbsp;&nbsp;{{ order.deliver_address }}</p>
              <p>保单状态: &nbsp;&nbsp;{{ order | transStatus }}</p>
              <p class="control">
                <router-link class="pay" :to="detail(order)" tag="span">{{ order.handle }}</router-link>
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
  import BackTop from '../components/BackTop.vue'
  import { ordersFunc } from '../mixins';
  import { spbOrderList,spbOrderStatus } from "../../assets/js/api";
	export default {
	    components: {
        BackTop
      },
      mixins: [ ordersFunc ],
      data(){
          return {
              getPaidOrdersFunc : spbOrderList, // 获取已完成订单的api
              unpaidStatus : 239, // 未完成订单的状态码，查询多个可把对应状态码累加
              paidStatus : 256, // 已完成订单的状态码
              cancelOrderFunc : spbOrderStatus, // 取消本产品订单的api
              cancelOrderStatus : 16, // 取消订单的状态码
          }
      },
      methods: {
          detail(order){
              switch(order.status) {
                  case 1: return '/spbCreate?orderId='+ order.id; break;
                  case 2: return '/policyDown?orderId=' + order.id + '&product=spb&orderStatus=' + order.status; break;
                  case 4:case 8: case 32: case 64:case 128:case 256:case 512:case 1024:case 2048: return '/spbOrderDetails?orderId='+ order.id + '&orderStatus=' + order.status ; break;
              }
          }
      },
      filters:{
          transStatus(order){
              switch(order.status){
                  case 1: order.handle = "上传资料";return '待上传资料'; break;
                  case 2: order.handle = "上传投保单";return '待上传投保单'; break;
                  case 4: order.handle = "查看详情";return '待审核'; break;
                  case 8: order.handle = "去付款";return '待付款'; break;
                  case 32: order.handle = "查看详情";return '已上传支付凭证，待审核'; break;
                  case 64: order.handle = "查看详情";return '支付凭证审核失败'; break;
                  case 128: order.handle = "查看详情";return '已确认支付，待出单'; break;
                  case 256: order.handle = "查看详情";return '保单生效'; break;
                  case 512: order.handle = "查看详情";return '订单已过期'; break;
                  case 1024: order.handle = "查看详情";return '理赔中'; break;
                  case 2048: order.handle = "查看详情";return '理赔完成'; break;
              }
          }
      },
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/spb/spbOrders.scss';
  @import '~assets/scss/animate.scss';
  .blue_header { background: #06acf9; color: #fff;}
  .content_box{
    bottom:0;
  }
</style>
