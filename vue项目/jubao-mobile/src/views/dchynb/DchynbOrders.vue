<template>
  <div class="spb_orders">
    <v-header title="我的保单" :touchFeel="{color:'#0facf7'}" class="blue_header"></v-header>
    <div class="content_box">
      <div class="content orders_container">
        <div class="tab">
          <router-link class="unpaid tab" to="/dchynbOrders?type=unpaid" @click.native="toggle('unpaid')" tag="div">
            <span :class="{'tab_on': $route.query.type === 'unpaid'}">未生效保单</span>
          </router-link>
          <router-link class="paid tab"  to="/dchynbOrders?type=paid" @click.native="toggle('paid')" tag="div">
            <span :class="{'tab_on': $route.query.type === 'paid'}">已生效保单</span>
          </router-link>
        </div>
        <div class="unpaidList" v-show="$route.query.type == 'unpaid'">
          <div class="order_box" v-for="(order, index) in unpaidOrders" :key="index">
            <p>被保险人: &nbsp;&nbsp;{{ order.beneficiary }}</p>
            <p>投保时间: &nbsp;&nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
            <p>保费: &nbsp;&nbsp;{{ (order.price - order.discount) / 100 }}</p>
            <p>保单状态: &nbsp;&nbsp;{{ order | transStatus }}</p>
            <p class="control">
              <span v-if="order.status !== 8"  @click='cancelOrder(order.id, index)' class="cancel">取消</span>
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
            <p>保单号: &nbsp;&nbsp;{{ order.policy_no }}</p>
            <p>被保险人: &nbsp;&nbsp;{{ order.beneficiary }}</p>
            <p>投保时间: &nbsp;&nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
            <p>保费: &nbsp;&nbsp;{{ (order.price - order.discount) / 100 }}</p>
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
  import { hynbOrders } from '../mixins/hynbOrders';
  export default {
    mixins: [hynbOrders],
    data(){
      return {
        product_name: '定车货运年保',
      }
    },
    methods:{
      detail(order){
        return '/dchynbOrderDetails?orderId='+ order.id + '&orderStatus=' + order.status ;
      },
    }
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
