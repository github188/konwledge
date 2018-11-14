<template>
  <div class="spb_confirm">
      <v-header title="投保资料确认" :backUrl="backUrl"></v-header>
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
                  <div class="spb_order_title spb_cell" v-touchFeel="{color:'#f1f1f1'}" @click="toggleShop(index)">
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
              <div><span class="red">{{ (price / 100).toFixed(2) }} </span>元</div>
          </div>
          <div class="next">
              <router-link :to="modifyUrl" v-touchFeel="{color:'#f2f2f2'}">返回并修改</router-link>
              <router-link :to="nextUrl" v-touchFeel="{color:'#0fbcf7'}" class="blue_bg">下一步</router-link>
          </div>
      </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { spbOrderInfo,spbOrderStatus } from 'assets/js/api';
  import {invoiceConfirm} from '../mixins/invoice'
  import Invoice from 'views/components/Invoice'
  export default {
      components:{
        Invoice
      },
      mixins:[invoiceConfirm],
      data(){
          return {
              orderId: this.$route.query.orderId, // 订单id
              policyholder: "", // 投保人
              beneficiary: "", // 被保险人(公司)
              deliver_address: "", // 保单寄送地址
              price: "",
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
          }
      },
      computed: {
          modifyUrl(){ // 返回修改链接，参数：订单id orderId
              return '/spbCreate?orderId=' + this.orderId;
          },
          nextUrl(){ // 下一步链接，参数：订单ID -- orderId  产品类型 -- product
              return '/policyDown?orderId=' + this.orderId + '&product=spb';
          },
      },
      created(){
          this.getOrderInfo();
      },
      methods: {
          getOrderInfo(){
              Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
              spbOrderInfo(this.orderId).then( res => {
                  Indicator.close();
                  if(res.err_code === 0){
                      let tempArr = ["policyholder","beneficiary","deliver_address","price"];
                      tempArr.forEach( item => this[item] = res.data[item] );
                      this.shops = res.data.shops.map( L => {
                          L.toggle = "display"
                          return L;
                      });
                      this.setData(res);
                      //  status为1则改为2
                      res.data.status === 1 && spbOrderStatus({order_id: this.orderId*1, status: 2}).catch(err=>{})
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
      }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/spb/spbConfirm.scss";
</style>
