import { MessageBox,Indicator } from 'mint-ui';
import BackTop from '../components/BackTop.vue'
import { ordersFunc } from '../mixins';
import { hynbOrderList,hynbOrderCancel } from "../../assets/js/api";
export const hynbOrders = {
  components: {
    BackTop
  },
  mixins: [ ordersFunc ],
  data(){
    return {
      getPaidOrdersFunc : hynbOrderList, // 获取已完成订单的api
      unpaidStatus : 11, // 未完成订单的状态码，查询多个可把对应状态码累加
      paidStatus : 240, // 已完成订单的状态码
      cancelOrderFunc : hynbOrderCancel, // 取消本产品订单的api
      cancelOrderStatus : null, // 取消订单的状态码
    }
  },
  methods: {
    // 获取未支付保单数据
    getUnpaidData(type){
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
      this.getPaidOrdersFunc({
        product_name: this.product_name,
        page: this.unpaidPage,
        rows: 10,
        status: this.unpaidStatus,
        platform_type: 1
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
        product_name: this.product_name,
        page: this.paidPage,
        rows: 10,
        status: this.paidStatus,
        platform_type: 1
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
  filters:{
    transStatus(order){
      switch(order.status){
        case 1: order.handle = "上传投保单";return '待上传投保单'; break;
        case 2: order.handle = "去付款";return '待付款'; break;
        case 8: order.handle = "查看详情";return '已付款，待生效'; break;
        case 16: order.handle = "查看详情";return '保单生效'; break;
        case 32: order.handle = "查看详情";return '已上传支付凭证，待审核'; break;
        case 64: order.handle = "查看详情";return '支付凭证审核失败'; break;
        case 128: order.handle = "查看详情";return '已确认支付，待出单'; break;
      }
    }
  },
}
