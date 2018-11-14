<template>
  <div class="zcb_orders">
    <v-header title="我的保单" :touchFeel="{color:'#0facf7'}"></v-header>
    <div class="content_box">
      <div class="content orders_container">
        <div class="switch_orders">
          <router-link class="unpaid tab" to="/axjkxOrders?type=unpaid" @click.native="toggle('unpaid')" tag="span">
            <span :class="{'tab_on': $route.query.type === 'unpaid'}">待付款</span>
          </router-link>
          <router-link class="paid tab"  to="/axjkxOrders?type=paid" @click.native="toggle('paid')" tag="span">
            <span :class="{'tab_on': $route.query.type === 'paid'}">已完成</span>
          </router-link>
        </div>
        <div class="main">
          <!--待付款订单-->
          <div class="unpaidList" v-show="$route.query.type == 'unpaid'">
            <div v-for="(order, index) in unpaidOrders" class="cell">
              <p>订单号: {{order.seq_no}}</p>
              <p>被保险人: {{order.beneficiary[0].name}}</p>
              <p>创建时间: {{dateChange(order.created_at)}}</p>
              <p>保费金额: {{(order.price/100).toFixed(2)}}元</p>
              <p class="control">
                <span @click='cancelOrder(order.id, index)' class="cancel">取消</span>
                <span @click="showDetail(order)" class="pay">去付款</span>
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
              <p>订单号: {{order.seq_no}}</p>
              <p>被保险人: {{order.beneficiary[0].name}}</p>
              <p>创建时间: {{dateChange(order.created_at)}}</p>
              <p>保费金额: {{(order.price/100).toFixed(2)}}元</p>
              <p class="control">
                <span class="order_detail" @click="toComment(order)">评价</span>
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
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
	import { Toast, MessageBox,Indicator } from 'mint-ui'
	import { jkxOrderList,jkxOrderStatus} from '../../assets/js/api'
	import { ordersFunc } from '../mixins';
	import BackTop from '../components/BackTop.vue'
	import {setLocationQuery} from "../../libs/js/LocationTransform"
  import {dateFtt} from '../../assets/js/dateFtt'
	
	export default {
		mixins: [ ordersFunc ],
		components: {
			BackTop
		},
		data(){
			return {
				getPaidOrdersFunc : jkxOrderList, // 获取订单列表的api
				unpaidStatus : 1, // 未完成订单的状态码，查询多个可把对应状态码累加
				paidStatus : 4, // 已完成订单的状态码
				cancelOrderFunc : jkxOrderStatus, // 取消本产品订单的api
				cancelOrderStatus : 2, // 取消订单的状态码
				product_name:'安享一生癌症医疗险',
			}
		},
		methods: {
			// 获取未支付保单数据
			getUnpaidData(type){
				Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
				this.getPaidOrdersFunc({
					product_name:this.product_name,
					page: this.unpaidPage,
					rows: 10,
					status: this.unpaidStatus,
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
					product_name:this.product_name,
					page: this.paidPage,
					rows: 10,
					status: this.paidStatus,
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
				this.$router.push({ name: 'axjkxDetail', query: {orderId:order.id }})
			},
			toComment(order){
				this.$router.push({ name: 'comment', query: {product_id:order.product_id,price_id:order.price_id,product_name:this.product_name}})
      },
			dateChange(dateStr){
				return dateFtt("yyyy-MM-dd hh:mm:ss",new Date(dateStr));
      },
		},
		
	}
</script>
<style lang="scss" type="text/scss" scoped>
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
