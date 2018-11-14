<template>
  <div class="hcbConfirm">
    <v-header :title="title"></v-header>
    <div class="content_box">
      <div class="content">
        <ul class="order_list">
          <li><span class="label">投保人</span><input type="text" id="insPerson" disabled  v-model="insPerson"/></li>
          <li><span class="label">被保险人</span><input type="text" id="insedPerson" disabled  v-model="insedPerson"/></li>
          <li><span class="label">车辆数目</span>{{truckList.length}}</li>
          <div class="car" v-for="(item,index) in truckList" :key="index">
            <li>投保车辆 {{NumberToChinese(index+1)}}</li>
            <li><span class="label">责任限额</span>{{item.coverage/10000}}万</li>
            <li><span class="label">{{item.truck_type == 1 ? '头车牌号' : '车牌号'}}</span>{{item.plate_no}}</li>
            <li v-if="item.plate_extra_no"><span class="label">挂车牌号</span>{{item.plate_extra_no}}</li>
          </div>
          <Invoice :edit="false" :invoiceData="invoiceData" :addressData="addressData"></Invoice>
        </ul>
      </div>
      <div class="confirm_bottom">
        <div class="money">
          <div>保费合计</div>
          <div><span class="red">{{(allPrice / 100).toFixed(2)}}</span>元</div>
        </div>
        <div class="foot" v-if="orderStatus == 2">
          <router-link :to="{path:'/hcbCreate',query:{orderId:orderId}}" class="btn" >返回并修改</router-link>
          <a @click="open" class="btn bg_blue" >确认并支付</a>
        </div>
        <div class="foot" v-if="orderStatus == 1">
          <router-link :to="{path:'/hcbCreate',query:{orderId:orderId}}" class="btn" >返回并修改</router-link>
          <router-link :to="{path:'/policyDown',query:{orderId:orderId,product:'hcb'}}" class="btn bg_blue" >下载投保单</router-link>
        </div>
        <router-link tag="div" class="foot one" :to="{path:'/hcbCreate'}" v-if="orderStatus == 8 || orderStatus == 16">
          继续投保
        </router-link>
      </div>
    </div>
    <Pay ref="pay" v-if="orderStatus == 2" :productType="'hcb'" :orderId="$route.query.orderId" :backOrderLink="'/hcbOrders?type=unpaid'" :cancelLink="'/hcbOrders?type=unpaid'">
    </Pay>
  </div>
</template>
<script>
  import Pay from "../components/Pay.vue"
  import {hynbDetail} from '../mixins/hynbDetail'
  export default {
    components:{
      Pay
    },
    mixins:[hynbDetail],
    data(){
      return{
        orderStatus:this.$route.query.orderStatus,
      }
    },
    computed:{
      title(){
        switch (this.orderStatus*1){
          case 1 : return '待上传盖章后的投保单'; break;
          case 2 : return '待支付'; break;
          case 8 : return '已付款待生效'; break;
          case 16 : return '已生效'; break;
          default : return '投保信息确认'; break;
        }
      }
    },
    methods:{
      open(){
        this.$refs.pay.open()
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/ygb/ygbCommon";
  @import "../../assets/scss/hcb/hcbConfirm";
  .content_box {
    bottom:0 !important;
    .content {
      min-height: 100%;
      height: auto !important;
      background: #eee;
      .order_list{
        padding-bottom: pxToRem(190);
      }
    }
    .confirm_bottom{
      margin-top: pxToRem(-190);
    }
  }
  .foot.one{
    background: $blue;
    text-align: center;
    line-height: pxToRem(100);
    font-size: pxToRem(40);
    color: #fff;
  }
</style>
