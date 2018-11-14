<template>
  <div class="hcbConfirm">
    <v-header title="投保信息确认"></v-header>
    <div class="content_box">
      <div class="content">
        <ul class="order_list">
          <li><span class="label">投保人</span><input type="text" id="insPerson" disabled  v-model="insPerson"/></li>
          <li><span class="label">被保险人</span><input type="text" id="insedPerson" disabled  v-model="insedPerson"/></li>
          <li><span class="label">车辆数目</span>{{truckList.length}}</li>
          <div class="car" v-for="(item,index) in truckList" :key="index">
            <li>投保车辆 {{NumberToChinese(index+1)}}</li>
            <li><span class="label">赔偿限额</span>{{item.coverage/10000}}万</li>
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
        <div class="next">
          <router-link :to="{path:'/dchynbCreate',query:{orderId:orderId}}" v-touchFeel="{color:'#f2f2f2'}">返回并修改</router-link>
          <router-link :to="{path:'/policyDown',query:{orderId:orderId,product:'dchynb'}}" v-touchFeel="{color:'#0fbcf7'}" class="blue_bg">下一步</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {hynbDetail} from '../mixins/hynbDetail.js'
  export default {
    mixins:[hynbDetail]
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
</style>
