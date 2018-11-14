<template>
  <div class="zcb_confirm">
    <v-header title="投保信息确认"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order_list zcb_order_list">
          <li><span class="label">投保人</span><span>{{order.policyholder}}</span></li>
          <li><span class="label">被保险人</span><span>{{order.beneficiary}}</span></li>
          <li><span class="label">货车类型</span><span>{{order.plate_extra_no?'带挂货车':'普通货车'}}</span></li>
          <li><span class="label">{{order.plate_extra_no?'头车牌号':'车牌号'}}</span><span>{{order.plate_no}}</span></li>
          <li v-if="order.plate_extra_no"><span class="label">挂车牌号</span><span>{{order.plate_extra_no}}</span></li>
          <li><span class="label">始发地</span><span>{{order.start_province + order.start_city || ''}}</span></li>
          <li><span class="label">目的地</span><span>{{order.end_province + order.end_city || ''}}</span></li>
          <li><span class="label">保险金额</span><span>{{(order.coverage/10000)}}万元</span></li>
          <li class="baofei">
            <div>保险费率： <span>{{order.rate ? (order.rate/10000)+'%' : '--'}}</span></div>
            <div>最低保费： <span>{{order.min_premium}}</span></div>
          </li>
          <li><span>货运详情</span></li>
          <li class="block2 detail" v-if="order.type == 1">
            <ul>
              <li><span class="label">运单号</span><span>{{order.track_no}}</span></li>
              <li><span class="label">货物名称</span><span>{{order.cargo_name}}</span></li>
              <li><span class="label">数量包装</span><span>{{order.quantity}}</span></li>
            </ul>
          </li>
          <li class="block2 zcb_create upload_box" v-if="order.type == 2">
            <ul class="img_boxs">
              <li :style="background(val)" v-for="(val,idx) in order.cargo_file_urls" :key="idx"></li>
            </ul>
          </li>
          <li><span class="label">合计保费:</span><span class="rg"><span class="red">{{order.price ? (order.price/100).toFixed(2) : '0.00'}} </span>元</span></li>
          <li class="bg_msg">
            提示：已经发生损失事故投保的，保险人不承担任何保险责任，
            且保险人保留向投保人骗取保险金行为的法律权利。
          </li>
        </ul>
      </div>
      <div class="bottom_content">
        <router-link tag="div" :to="{path:'phbCreate',query:{orderId}}" class="left_confirm msg_box"  v-touchFeel="{color:'#f2f2f2'}">返回并修改</router-link>
        <div class="right msg_box" @click="next">确认并支付</div>
      </div>
    </div>
  </div>
</template>

<script>
	import {MessageBox, Indicator, Toast} from 'mint-ui';
	import { dchybOrderInfo, cmnUserInfo, cmnTonglianPayurl } from '../../assets/js/api';
	import { wwwCheck } from '../../assets/js/common'
 
	export default {
		data() {
			return {
				order:{},
				payPassword:'',
				productType:'phb',
				backOrderLink:"/phbOrders?type=paid",
				cancelLink:"/phbOrders?type=unpaid",
			}
		},
		created() {
			this.orderId = this.$route.query.orderId;
			this.init();
		},
		methods: {
			async init(){
				Indicator.open();
				try{
					let res = await dchybOrderInfo(this.orderId);
					Indicator.close();
					if(res.err_code !== 0){Toast({message: res.err_msg || "未知错误", position: 'bottom'});return}
					this.order = res.data;
				}catch (e){
					Indicator.close();
				}
			},
      async next(){
				let url = wwwCheck() ? 'http://www.jubao56.com/m/vueStatic/paySuccess.html' : 'http://test.jubao56.com/m/vueStatic/paySuccess.html';
				let data = {
					amount : this.order.price,
					client_type: 1,
					product_type: 256,
					order_id:this.orderId*1,
					jump_url: url + '?orderId='+this.orderId+'&productType=phb'
        };
				Indicator.open({text: '订单处理中...', spinnerType: 'fading-circle'});
				try{
					let res = await cmnTonglianPayurl(data);
					if(res.err_code === 0){
						window.location.href = res.pay_url;
					}else if(res.err_code === 1109){
						Indicator.close();
						MessageBox({message:'订单已支付！',confirmButtonText:'去查看',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
							.then(action=>{
								if(action === 'confirm') window.location.href = url + '?orderId='+this.orderId+'&productType=phb';
								if(action === 'cancel') this.$router.push('/dashboard');
							});
          }else{
						Indicator.close();
						Toast({message:res.err_msg || '未知错误',position:'bottom'})
					}
        }catch (e){
					Indicator.close();
        }
			},
			background(url) {
				if(url.includes("xlsx") || url.includes("xls")){
					url = "http://test.jubao56.com/res/2018/02/09/16/4615934/excelSampleOnly.jpg";
				}
				return {
					backgroundImage: 'url("' + url.replace(/\\/g, "/").replace(/\s/g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29") + '")',
					backgroundSize:'contain',
					backgroundRepeat:'no-repeat',
					backgroundPosition:'center'
				}
			}
		},
    beforeDestroy(){
			Indicator.close();
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/create";
  .main .order_list{
    padding-bottom: pxToRem(100+10);
  }
  .no_coupon_text{
    font-size:pxToRem(26);color:#aaa;text-decoration: line-through;
  }
  
  .img_list{
    width:pxToRem(140);height:pxToRem(140);border:1px solid #b1b1b1;
    margin:pxToRem(10);
  }
  ul.zcb_order_list{
    li{
      height:pxToRem(80);
      &.manualList {
        height: auto;
      }
    }
  }
  li.detail{
    height: auto !important;
    padding-left: 0 !important;
  }
  ul.zcb_order_list li.bg_msg{
    background: transparent ;
    color: red;
    font-size: pxToRem(26);
    line-height: pxToRem(30);
    margin-top: pxToRem(20);
    &:after{
      border: none;
    }
  }
  li.upload_box{
    height:auto;
    ul.img_boxs{
      display: flex;flex-wrap: wrap;
      justify-content: space-between;
      padding:0 pxToRem(50) pxToRem(50) pxToRem(50);
      li{
        /*display: inline-block;*/
        width:pxToRem(140);height:pxToRem(140);margin:pxToRem(10);padding:0;
        border:1px solid $borderColor;
      }
    }
  }
  li.baofei{
    margin-bottom: pxToRem(10);
    div{
      display: inline-block;
      &:last-child{
        margin-left: pxToRem(20);
      }
    }
  }
  .rg{
    float: right;
    margin-right: pxToRem(30);
  }
  .red{color: red !important;}
  .step {
    position: relative;
    min-height: pxToRem(80);
    font-size: pxToRem(24);
    padding: pxToRem(20) pxToRem(50);
    .label {
      width: 100%;
      height: pxToRem(160);
      margin: auto auto;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        display: block;
        /*width:pxToRem(220);*/
        height: pxToRem(60);
        padding: 0 pxToRem(10);
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }
    .mes {
      text-align: center;
    }
    .weixinQR {
      img {
        display: block;
        margin: 0 auto;
      }
    }
  }
</style>
