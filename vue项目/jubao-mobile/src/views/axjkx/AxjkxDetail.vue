<template>
  <div class="axjkx_confirm">
    <v-header title="保单详情" :touchFeel="{color:'#626368'}" className="header"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order list " :class="{no_foot:status === orderStatus.msgGetStatus('已生效')}">
          <li class="item title">投保人信息</li>
          <li class="item"><span class="label">姓名</span><span class="gray">{{policyholder}}</span></li>
          <li class="item"><span class="label">证件类型</span><span class="gray">身份证</span></li>
          <li class="item"><span class="label">证件号码</span><span class="gray">{{policyholder_card_no}}</span></li>
          <li class="item"><span class="label">出生日期</span><span class="gray">{{idGetBirthday(policyholder_card_no)}}</span></li>
          <li class="item"><span class="label">性别</span><span class="gray">{{idGetSex(policyholder_card_no)}}</span></li>
          <li class="item"><span class="label">手机号码</span><span class="gray">{{mobile}}</span></li>
          <li class="item title mt20">被保险人信息</li>
          <li class="item"><span class="label">关系</span><span class="gray">{{ship}}</span></li>
          <li class="item"><span class="label">姓名</span><span class="gray">{{beneficiary}}</span></li>
          <li class="item"><span class="label">证件类型</span><span class="gray">身份证</span></li>
          <li class="item"><span class="label">证件号码</span><span class="gray">{{beneficiary_card_no}}</span></li>
          <li class="item"><span class="label">出生日期</span><span class="gray">{{idGetBirthday(beneficiary_card_no)}}</span></li>
          <li class="item"><span class="label">性别</span><span class="gray">{{idGetSex(beneficiary_card_no)}}</span></li>
          <li class="item title mt20">保单信息</li>
          <li class="item"><span class="label">保障方案</span><span class="gray">计划一</span></li>
          <li class="item"><span class="label">保障期限</span><span class="gray">一年</span></li>
          <li class="item"><span class="label">应付金额</span><span class="gray">{{(price/100).toFixed(2)}}元</span></li>
          <li class="item"><span class="label">订单号</span><span class="gray">{{seq_no}}</span></li>
          <li class="item"><span class="label">状态</span><span class="gray blue">{{orderStatus.statusGetMsg(status)}}</span></li>
          <template v-if="status === orderStatus.msgGetStatus('已生效')">
            <li class="item"><span class="label">保单号</span><span class="gray blue">{{policy_no}}</span></li>
            <li class="item"><a :href="baodanHref" class="right blue" target="_blank">查看/下载电子保单->></a></li>
          </template>
        </ul>
      </div>
      <div class="bottom_content" v-if="status === orderStatus.msgGetStatus('待支付')">
        <div class="left_create msg_box" @click="back">返回修改</div>
        <div class="right_bottom msg_box" @click="pay" v-touchFeel>支 付</div>
      </div>
    </div>
    <JkxPay ref="pay" @choice="choicePayType" :cancelLink="cancelLink"></JkxPay>
  </div>
</template>
<script>
	import XInput from '../components/XInput.vue';
	import XSelect from '../components/XSelect.vue';
	import { Toast,Indicator } from 'mint-ui';
	import { jkxOrderInfo } from '../../assets/js/api';
	import JkxPay from './components/jkxPay.vue';
	import { shipList,orderStatus } from './js/common';
	import { Pay,idCard } from './js/mixins';
	import { wwwCheck } from '../../assets/js/common'
 
	export default {
		components:{
			XInput,
			XSelect,
			JkxPay
		},
		mixins:[Pay,idCard],
		data(){
			return {
				orderId:this.$route.query.orderId*1,
				policyholder:'',
				policyholder_card_no:'',
				mobile:'',
				beneficiary:'',
				beneficiary_card_no:'',
				relation:1,
				seq_no:'',//订单号
				policy_no:'',//保单号
				price:0,
				status:1,
				shipList,
				orderStatus
			}
		},
		computed:{
			ship(){
				return this.shipList.filter(item=>item.value === this.relation)[0].name
			},
			baodanHref(){
				return wwwCheck()?'https://www.jubao56.com/v1/jkx/anxin/policy?order_id='+this.orderId:'http://test.jubao56.com/v1/jkx/anxin/policy?order_id='+this.orderId
			}
		},
		created(){
			Indicator.open({text:'加载中...'});
			this.init().finally(()=>Indicator.close());
		},
		methods:{
			async init(){
				let res = await jkxOrderInfo(this.orderId);
				if(res.err_code === 0){
					console.log(res)
					this.policyholder = res.data.policyholder.name;
					this.policyholder_card_no = res.data.policyholder.card_no;
					this.mobile = res.data.policyholder.mobile;
					this.beneficiary = res.data.beneficiary[0].name;
					this.beneficiary_card_no = res.data.beneficiary[0].card_no;
					this.relation = res.data.beneficiary[0].relation*1;
					this.price = res.data.price*1;
					this.status = res.data.status;
					this.seq_no = res.data.seq_no;
					this.policy_no = res.data.policy_no;
				}else {
					Toast({message:res.err_msg || '未知错误',position:'bottom'});
				}
			},
			next(){
				this.$refs.pay.open();
			},
			back(){
				this.$router.push({path:'/axjkxCreate',query:{orderId:this.orderId}});
			},
		}
	}
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/list.scss";
  @import "../../assets/scss/axjkx/axjkx";
  .right{
    margin-right: pxToRem(20);
  }
  .gray{
    color: #999;
    margin-left: pxToRem(20);
  }
  .list{
    margin-bottom: pxToRem(40);
    &.no_foot{
      padding-bottom: 0 !important;
      margin-bottom: 0 !important;
    }
  }
</style>