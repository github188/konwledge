<template>
  <div class="phb_confirm all">
    <v-header title="投保信息确认"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order_list">
          <li><span class="label">投保人</span><span v-text="policyholder"></span></li>
          <li><span class="label">被保险人</span><span v-text="beneficiary"></span></li>
          <li><span class="label">货物名称</span><span v-text="cargoName"></span></li>
          <li><span class="label">数量包装</span><span v-text="quantity"></span></li>

          <li><span class="label">始发地</span><span v-text="startProvince+startCity"></span></li>
          <li><span class="label">目的地</span><span v-text="endProvince+endCity"></span></li>
          <li><span class="label">头车牌号</span><span v-text="plateNo"> </span></li>
          <li><span class="label">挂车牌号</span><span v-text="plateExtraNo"></span></li>
          <li class="block2"><span class="label">运单号</span><span v-text="trackNo"></span></li>
          <li><span class="label">保险金额</span><span v-text="coverage/10000"></span><span class="fr price_unit">万元</span></li>
          <li class="block2">
            <div class="inline inline_box1">
              <span class="label">保险费率</span><span class="red">{{rate | showRate}}</span>
            </div>
            <div class="inline">
              <span class="label">最低保费</span><span class="red">{{minPremium }}元</span>
            </div>

          </li>
          <li class="price_count_all">
            <span>保费合计:</span>
            <span class="orange fr dchyb_price">{{price | showPrice}}</span>
          </li>
        </ul>
      </div>
      <div class="bottom_content">
        <div class="left_confirm msg_box" v-touchFeel="{color:'#f2f2f2'}" @click="back">返回并修改</div>
        <div class="right msg_box" @click="confirmToPay" v-touchFeel>确认并继续</div>
      </div>
    </div>


    <Pay ref="pay"
          :productType="productType" :orderId="$route.query.orderId" :backOrderLink="backOrderLink" :cancelLink="cancelLink">
    </Pay>
  </div>
</template>

<script>
  import {dchybConfirm} from "../mixins/dchyb"
  export default {
    data() {
      return {
        productType:"phb",
        backRouter:"/phbCreate",
        backOrderLink:"/phbOrders?type=paid",
        cancelLink:"/phbOrders?type=unpaid",
      }
    },
    mixins:[dchybConfirm],
    created() {

    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/create";
  .price_unit{
    margin-right:pxToRem(40);
  }
</style>
