<template>
  <div class="spb_orders">
    <v-header title="我的保单" :touchFeel="{color:'#0facf7'}"></v-header>
    <div class="content_box">
      <div class="content orders_container">
        <div class="tab">
          <router-link class="unpaid tab" to="/ygbOrders?type=unpaid" @click.native="toggle('unpaid')" tag="div">
            <span :class="{'tab_on': $route.query.type === 'unpaid' || !$route.query.type}">未生效</span>
          </router-link>
          <router-link class="paid tab"  to="/ygbOrders?type=paid" @click.native="toggle('paid')" tag="div">
            <span :class="{'tab_on': $route.query.type === 'paid'}">已生效</span>
          </router-link>
        </div>
        <div class="unpaid unpaidList" v-show="$route.query.type == 'unpaid' || !$route.query.type">
          <div class="order_box" v-for="(order, index) in unpaidOrders" :key="index">
            <p>投保时间: &nbsp;&nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
            <p>公司名称: &nbsp;&nbsp;{{ order.company_name }}</p>
            <p>参保人数: &nbsp;&nbsp;现场操作{{ order.driver_number }}人</p>
            <p class="mar_left">非现场操作{{ order.clerk_number }}人</p>
            <p>保单状态: &nbsp;&nbsp;{{ order.status | transStatus }}</p>
            <p class="control">
              <a v-if="order.status != ygbOrderStatus.msgGetStatus('已支付,待出单')" @click='cancelOrder(order.id, index)' class="cancel">取消</a>
              <router-link v-if="order.status == ygbOrderStatus.msgGetStatus('待支付')" :to="{ path: '/ygbDetails', query: { orderId: order.id, status: order.status }}" class="pay">去付款</router-link>
              <router-link v-if="order.status == ygbOrderStatus.msgGetStatus('待上传盖章后的投保单')" :to="{ path: '/ygbDetails', query: { orderId: order.id, status: order.status }}" class="pay">上传投保单</router-link>
              <router-link v-if="order.status == ygbOrderStatus.msgGetStatus('已支付,待出单')" :to="{ path: '/ygbDetails', query: { orderId: order.id, status: order.status }}" class="pay">查看详情</router-link>
            </p>
          </div>
          <div class="look_more" >
            <span class="more" v-if="unpaidOrders.length < unpaidTotal">
                <i class="iconfont icon-loading loading_more"></i>上拉加载
              </span>
            <span class="more" v-else>无更多数据</span>
          </div>
        </div>
        <div class="paid paidList" v-show="$route.query.type == 'paid'">
          <div class="order_box" v-for="(order, index) in paidOrders" :key="index">
            <p>保单号: <span class="mar_left_01">{{ order.seq_no}}</span></p>
            <p>投保时间: &nbsp;&nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
            <p>公司名称: &nbsp;&nbsp;{{ order.company_name }}</p>
            <template v-if="order.insurance_type != 16">
              <p>参保人数: &nbsp;&nbsp;现场操作{{ order.driver_number }}人</p>
              <p class="mar_left">非现场操作{{ order.clerk_number }}人</p>
            </template>
            <template v-else>
              <p>参保人数: &nbsp;&nbsp;司机类{{ order.trucker_number }}人</p>
              <p class="mar_left">搬运类{{ order.driver_number }}人</p>
              <p class="mar_left">文员类{{ order.clerk_number }}人</p>
            </template>
            <p class="control">
              <a @click="changeMan(order,'ygbChange')" class="cancel">换人</a>
              <a v-if="order.insurance_type != 16" @click="changeMan(order,'ygbAdd')" class="cancel">加人</a>
              <router-link :to="{path:'/ygbOrderDetails',query:{orderId:order.id}}" class="order_detail">查看详情</router-link>
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
    <BackTop ref="backTop"></BackTop>
  </div>
</template>

<script>
  import { ygbOrderStatus } from 'assets/js/ygbStatus'
  import { Toast,MessageBox } from 'mint-ui';
  import { ordersFunc } from '../mixins';
  import { ygbOrderList,ygbOrderCancel,cmnFileList } from "../../assets/js/api";
  import BackTop from '../components/BackTop.vue'
  export default {
    mixins: [ ordersFunc ],
    components: {
      BackTop
    },
    data(){
      return {
        getPaidOrdersFunc : ygbOrderList, // 获取已完成订单的api
        unpaidStatus : ygbOrderStatus.msgGetStatus('待支付')+ygbOrderStatus.msgGetStatus('待上传盖章后的投保单')+ygbOrderStatus.msgGetStatus('已支付,待出单'), // 未完成订单的状态码，查询多个可把对应状态码累加
        paidStatus : ygbOrderStatus.msgGetStatus('已生效'), // 已完成订单的状态码
        cancelOrderFunc : ygbOrderCancel, // 取消本产品订单的api
        cancelOrderStatus : null, // 取消订单的状态码
        ygbOrderStatus,
      }
    },
    filters:{
      transStatus(value){
        return ygbOrderStatus.statusGetMsg(value)
      },
    },
    methods: {
      // 取消订单
      cancelOrder(orderId, index){
        MessageBox.confirm('确定删除此订单?').then(action => {
          this.cancelOrderFunc({ id: orderId * 1}).then((res)=>{
            if(res.err_code === 0){
              this.unpaidOrders.splice(index, 1);
              Toast({ message: '订单已取消', duration: 1000 })
            }else{
              Toast(res.err_msg||'未知错误！')
            }
          })
        }).catch( err => { console.log(err) })
      },
      //换人加人
      changeMan(order,path){
        cmnFileList({
          entity: 'company',
          entity_id: order.company_id,
          type: 4
        }).then((res)=>{
          if(res.err_code === 0){
            if(res.filelist.length === 0){
              MessageBox({
                title: '提示',
                message: '因保险公司风险管控的要求，避免被保险企业错误操作导致的保障纠纷，首次变更人员时，需对投保人员网络变更予以书面确认，请在PC端进行该操作！'
              })
            }else {
              if(path === 'ygbChange'){
                this.$router.push({path:'ygbChange',query:{orderId:order.id,insuranceType:order.insurance_type}})
              }else{
                this.$router.push({path:'ygbAdd',query:{orderId:order.id}})
              }
            }
          }else{
            Toast(res.err_msg||'未知错误！')
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/ygb/ygbOrders.scss';
  @import '~assets/scss/animate.scss';
  .content_box{
    background: #EDEDED;bottom:0;
  }

</style>
