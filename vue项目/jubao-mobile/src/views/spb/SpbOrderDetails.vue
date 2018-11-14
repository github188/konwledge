<template>
  <div class="spb_confirm">
      <v-header :title="title"></v-header>
      <div class="spb_cell">
          <div class="enter_title">投保人</div>
          <div class="enter_input">
              <input type="text" :value="policyholder" disabled>
          </div>
      </div>
      <div class="spb_cell">
          <div class="enter_title">被保险人</div>
          <div class="enter_input">
              <input type="text" :value="beneficiary" disabled>
          </div>
      </div>
      <div class="spb_cell">
          <div class="enter_title">档口数量</div>
          <div class="enter_input">
              <input type="text" :value="shops.length" disabled>
          </div>
      </div>
      <div class="spb_orders">
          <div class="spb_order_box" v-for="(item,index) in shops" :key="index">
              <div class="spb_order">
                  <div class="spb_order_title spb_cell" v-touchFeel="{color:'#f2f2f2'}" @click="toggleShop(index)">
                      <div>商铺档口{{ index + 1 }}</div>
                      <div class="icon">
                          <i class="iconfont icon-jiantou" v-if="item.toggle === 'display'"></i>
                          <i class="iconfont icon-right" v-if="item.toggle === 'hide'"></i>
                      </div>
                  </div>
                  <div class="spb_orderDetail" :ref="'shop'+index">
                      <div class="spb_cell">
                          <div class="enter_title">保障方案</div>
                          <div class="enter_input">
                              <input type="text" disabled :value="'保险金额:' + item.coverage/10000 + '万 保费:' + item.price/100 + '元'">
                          </div>
                      </div>
                      <div class="spb_cell">
                          <div class="enter_title">档口地址</div>
                          <div class="enter_input">
                              <input type="text" disabled :value="item.province + item.city + item.district">
                          </div>
                      </div>
                      <div class="spb_order">
                          <div class="spb_cell">
                              <div class="enter_title">详细地址</div>
                              <div class="enter_input">
                                  <input type="text" class="only_input" disabled :value="item.address">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <Invoice :edit="false" :invoiceData="invoiceData" :addressData="addressData"></Invoice>
      </div>
      <div class="confirm_bottom">
          <div class="money">
              <div>保费合计</div>
              <div><span class="red">{{ ((price - discount) / 100).toFixed(2) }} </span>元</div>
          </div>
          <div class="next" v-if="this.$route.query.orderStatus == 256">
              <router-link to="/spbCreate" class="blue_bg"  v-touchFeel="{color:'#0fbcf7'}">我要加保</router-link>
          </div>
          <div class="next" v-if="this.$route.query.orderStatus == 8">
              <input type="button" class="blue_bg pay_btn" v-touchFeel="{color:'#0fbcf7'}" value="确认并支付" @click="confirmToPay">
          </div>
      </div>
      <Pay ref="pay"
            :productType="productType" :orderId="$route.query.orderId" :backOrderLink="backOrderLink">
      </Pay>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { spbOrderInfo } from 'assets/js/api';
  import Pay from "../components/Pay.vue"
  import {invoiceConfirm} from '../mixins/invoice'
  import Invoice from 'views/components/Invoice'
  export default {
      components:{ Pay,Invoice },
      mixins:[invoiceConfirm],
      data(){
          return {
              orderId: this.$route.query.orderId, // 订单id
              policyholder: "", // 投保人
              beneficiary: "", // 被保险人(公司)
              deliver_address: "", // 保单寄送地址
              price: "",
              discount: "",
              shops: [
                  {
                      "coverage": 1000000,
                      "price": 120000,
                      "province": '',
                      "city": '',
                      "district": '',
                      "address": "",
                      "toggle": "display" // 档口显示隐藏
                  },
              ],
              backUrl: "", // header返回链接
              title: "", // header标题
              productType: "spb",
              backOrderLink: "/spbOrders?type=unpaid",
          }
      },
      created(){
          this.getOrderInfo();
          switch(this.$route.query.orderStatus*1){
              case 4: this.title = "投保资料待审核"; break;
              case 32: this.title = "已上传支付凭证，待审核"; break;
              case 64: this.title = "支付凭证审核失败"; break;
              case 128: this.title = "订单已支付，待出单"; break;
              case (256 || 512 || 1024 || 2048) : this.title = "保单详情"; break;
              default: this.title = "投保信息确认"; break;
          }
      },
      methods: {
          getOrderInfo(){
              Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
              spbOrderInfo(this.orderId).then( res => {
                  Indicator.close();
                  if(res.err_code === 0){
                      let tempArr = ["policyholder","beneficiary","deliver_address","price","discount"];
                      tempArr.forEach( item => this[item] = res.data[item] );
                      this.shops = res.data.shops.map( L => {
                          L.toggle = "display"
                          return L;
                      });
                      this.setData(res);
                  }
              })
          },
          // 商铺显示隐藏
          toggleShop(index){
              let display = this.$refs["shop"+index][0].style.display;
              if(display === "none") {
                  this.$refs["shop"+index][0].style.display = "block";
                  this.shops[index].toggle = 'display';
              }else {
                  this.$refs["shop"+index][0].style.display = "none";
                  this.shops[index].toggle = 'hide';
              }
          },
          confirmToPay(){
              this.$refs.pay.open()
          },
      }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/spb/spbConfirm.scss";
  .pay_btn{ width: 100%;font-size: pxToRem(36); }
</style>
