<template>
  <div class="YgbOrderDetails">
    <v-header title="详情" ></v-header>
    <div class="content_box">
      <div class="content">
        <p class='order_item'><span class='order_item_title'>公司名称</span>{{order.company_name}}</p>
        <p class='order_item'><span class='order_item_title'>保单号</span>{{order.policy_no}}</p>
        <p class='order_item'><span class='order_item_title'>保险起期</span>{{order.effect_date?(order.effect_date+'').slice(0, 19).replace('T', '  ') : ''}}</p>
        <p class='order_item'><span class='order_item_title'>保险止期</span>{{order.expire_date?(order.expire_date+'').slice(0, 19).replace('T', '  ') : ''}}</p>
        <p class='order_item'><span class='order_item_title'>保险保障</span><span>{{details}}</span></p>
        <p class='order_item '><span class='order_item_title'>合计保费</span>￥{{order.price/100||''}}</p>
        <template v-if="insurance_type == 16"> <!--信达-->
          <div class='table'>
            <h3 @click='show_trucker=!show_trucker'>司机类人员明细清单列表<i class='iconfont icon-right' :class='{rotate:show_driver}'></i></h3>
            <Panel :flag='show_trucker' :change="trucker_list">
              <div class="table_body">
                <p class='table_line'><span class=' table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_status'>状态</span><span class='table_effect'>生效日期</span><span class='table_price'>单价(元/年)</span></p>
                <p class='table_line' v-for="trucker in trucker_list"><span class=' table_name'>{{trucker.name}}</span><span class='table_idcard'>{{trucker.idcard}}</span><span class='table_status'>{{trucker.status}}</span><span class='table_effect'>{{(trucker.effect_date+'').slice(0, 10)+' 零时起'}}</span><span class='table_price'>{{(trucker.price/100).toFixed(2)}}</span></p>
              </div>
            </Panel>
          </div>
          <div class='table'>
            <h3 @click='show_driver=!show_driver'>搬运类人员明细清单列表<i class='iconfont icon-right' :class='{rotate:show_driver}'></i></h3>
            <Panel :flag='show_driver' :change="driver_list">
              <div class="table_body">
                <p class='table_line'><span class=' table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_status'>状态</span><span class='table_effect'>生效日期</span><span class='table_price'>单价(元/年)</span></p>
                <p class='table_line' v-for="driver in driver_list"><span class=' table_name'>{{driver.name}}</span><span class='table_idcard'>{{driver.idcard}}</span><span class='table_status'>{{driver.status}}</span><span class='table_effect'>{{(driver.effect_date+'').slice(0, 10)+' 零时起'}}</span><span class='table_price'>{{(driver.price/100).toFixed(2)}}</span></p>
              </div>
            </Panel>
          </div>
          <div class='table'>
            <h3 @click='show_clerk=!show_clerk'>文员类人员明细清单列表<i class='iconfont icon-right' :class='{rotate:show_clerk}' ></i></h3>
            <Panel :flag='show_clerk' :change="clerk_list">
              <div class="table_body">
                <p class='table_line'><span class=' table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_status'>状态</span><span class='table_effect'>生效日期</span><span class='table_price'>单价(元/年)</span></p>
                <p class='table_line' v-for="clerk in clerk_list"><span class=' table_name'>{{clerk.name}}</span><span class='table_idcard'>{{clerk.idcard}}</span><span class='table_status'>{{clerk.status}}</span><span class='table_effect'>{{(clerk.effect_date+'').slice(0, 10)+' 零时起'}}</span><span class='table_price'>{{(clerk.price/100).toFixed(2)}}</span></p>
              </div>
            </Panel>
          </div>
        </template>
        <template v-else> <!--大地-->
          <div class='table'>
            <h3 @click='show_driver=!show_driver'>现场操作人员明细清单列表<i class='iconfont icon-right' :class='{rotate:show_driver}'></i></h3>
            <Panel :flag='show_driver' :change="driver_list">
              <div class="table_body">
                <p class='table_line'><span class=' table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_status'>状态</span><span class='table_effect'>生效日期</span><span class='table_price'>单价(元/年)</span></p>
                <p class='table_line' v-for="driver in driver_list"><span class=' table_name'>{{driver.name}}</span><span class='table_idcard'>{{driver.idcard}}</span><span class='table_status'>{{driver.status}}</span><span class='table_effect'>{{(driver.effect_date+'').slice(0, 10)+' 零时起'}}</span><span class='table_price'>{{(driver.price/100).toFixed(2)}}</span></p>
              </div>
            </Panel>
          </div>
          <div class='table'>
            <h3 @click='show_clerk=!show_clerk'>非现场操作人员明细清单列表<i class='iconfont icon-right' :class='{rotate:show_clerk}' ></i></h3>
            <Panel :flag='show_clerk' :change="clerk_list">
              <div class="table_body">
                <p class='table_line'><span class=' table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_status'>状态</span><span class='table_effect'>生效日期</span><span class='table_price'>单价(元/年)</span></p>
                <p class='table_line' v-for="clerk in clerk_list"><span class=' table_name'>{{clerk.name}}</span><span class='table_idcard'>{{clerk.idcard}}</span><span class='table_status'>{{clerk.status}}</span><span class='table_effect'>{{(clerk.effect_date+'').slice(0, 10)+' 零时起'}}</span><span class='table_price'>{{(clerk.price/100).toFixed(2)}}</span></p>
              </div>
            </Panel>
          </div>
        </template>
      </div>
      <div class='button_area' v-if='status==4'>
        <router-link :to="{path:'/ygbChange',query:{orderId:this.orderId,insuranceType:this.insurance_type}}" class="button_area_first" tag="span" v-touchFeel>我要换人</router-link>
        <!--<a @click="toChange(order.id, 'ygbAdd', order.company_id, 'details')">我要加人</a>-->
      </div>
      <div class='button_area' v-if='status==1'>
        <router-link :to="{path:'/ygbChange',query:{orderId:this.orderId}}" tag="span" v-touchFeel>去付款</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import Panel from 'base/panel/Panel';
  import { Toast, MessageBox, Indicator } from 'mint-ui';
  import {ygbOrderInfo,ygbOrderEmployeelist,ygbProductList} from 'assets/js/api'
  export default {
    components:{
      Panel
    },
    data(){
      return{
        order:{},
        productId:'',//产品类型
        details:'',//保障详情
        show_driver:true,
        driver_list:[],
        show_clerk:true,
        clerk_list:[],
        show_trucker:true,
        trucker_list:[],
        status: 0,
        orderId: this.$route.query.orderId,
        insurance_type:2,//	保险公司类型，大地为2，信达为16
      }
    },
    created(){
      this.init();
    },
    methods:{
      init(){
        Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
        Promise.all([ygbOrderInfo(this.orderId*1),ygbOrderEmployeelist({order_id: this.orderId *1})]).then((res)=>{
          Indicator.close();
          //订单详情
          if(res[0].err_code === 0){
            this.order = res[0].order;
            this.productId = res[0].order.product_id;
            this.insurance_type = res[0].order.insurance_type;
            this.getProductList(this.productId);
            this.status = res[0].order.status;
          }else{
            Toast({message:res[0].err_msg||'未知错误',position:'bottom'})
          }
          //员工列表
          if(res[1].err_code === 0){
            res[1].rows.forEach((item) => {
              if(item.status == 1) item.status = '已生效'
              if(item.status == 2) item.status = '未生效'
              if(item.status == 4) item.status = '删除'
              if(item.status == 8) item.status = '锁定'
//              //未生效状态的列表
//              if(this.status == 1){
//                if(item.type == 1 && item.status == '未生效') this.driver_list.push(item);
//                if(item.type == 2 && item.status == '未生效') this.clerk_list.push(item);
//                if(item.type == 4 && item.status == '未生效') this.trucker_list.push(item);
//              }
              //已生效状态的列表
              if(this.status == 4){
                if(item.type == 1 && (item.status == '已生效' || item.status == '锁定')) this.driver_list.push(item);
                if(item.type == 2 && (item.status == '已生效' || item.status == '锁定')) this.clerk_list.push(item);
                if(item.type == 4 && (item.status == '已生效' || item.status == '锁定')) this.trucker_list.push(item);
              }
              console.log(this.driver_list,this.clerk_list)
            })
          }else{
            Toast({message:res[1].err_msg||'未知错误',position:'bottom'})
          }
        }).catch((err)=>{
          Indicator.close()
        })
      },
      getProductList(productId){
        ygbProductList({id:productId}).then((res)=>{
          if(res.err_code !== 0){this.$message(res.err_msg || '未知错误'); return;}
          this.details = res.productlist[0].description;
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .YgbOrderDetails{
    background: #fff;
    font-size: pxToRem(32);
    .header{
      @include border-1px('bottom');
      position: fixed !important;
    }
    .order_item{
      line-height: pxToRem(80);
      padding-left: pxToRem(40);
      @include border-1px('bottom');
      .order_item_title{
        display: inline-block;
        width: pxToRem(180);
      }
    }
    .table{
      h3{
        line-height: pxToRem(80);
        padding: 0 pxToRem(20) 0 pxToRem(40);
        background: #eee;
        i{
          float: right;
          transition: all .3s ease;
        }
        .rotate{
          transform: rotate(90deg);
        }
      }
      .table_body{
        overflow-x: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .table_line{
          line-height: pxToRem(80);
          width: pxToRem(1280);
          @include border-1px('bottom');
          &>span{
            display: inline-block;
            text-align: center;
            @include border-1px('right');
            &:last-child{
              &:after{
                border: none;
              }
            }
          }
          .table_name{
            width: pxToRem(180);
          }
          .table_idcard{
            width: pxToRem(400);
          }
          .table_status{
            width: pxToRem(130);
          }
          .table_effect{
            width: pxToRem(330);
          }
          .table_price{
            width: pxToRem(240);
          }
        }
      }
    }
    .button_area{
      width: 100%;
      span{
        display: block;
        height: pxToRem(100);
        background: $blue;
        line-height: pxToRem(100);
        color: #fff;
        font-size: pxToRem(36);
        text-align: center;
      }
    }
  }
</style>
