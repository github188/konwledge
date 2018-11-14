<template>
  <div class="axjkx_confirm">
    <v-header title="确认投保信息详细" :touchFeel="{color:'#626368'}" className="header"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order list">
          <li class="item title">投保人信息</li>
          <li class="item"><span class="label">姓名</span><span class="right">{{policyholder}}</span></li>
          <li class="item"><span class="label">证件类型</span><span class="right">身份证</span></li>
          <li class="item"><span class="label">证件号码</span><span class="right">{{policyholder_card_no}}</span></li>
          <li class="item"><span class="label">出生日期</span><span class="right">{{idGetBirthday(policyholder_card_no)}}</span></li>
          <li class="item"><span class="label">性别</span><span class="right">{{idGetSex(policyholder_card_no)}}</span></li>
          <li class="item"><span class="label">手机号码</span><span class="right">{{mobile}}</span></li>
          <li class="item title mt20">被保险人信息</li>
          <li class="item"><span class="label">关系</span><span class="right">{{ship}}</span></li>
          <li class="item"><span class="label">姓名</span><span class="right">{{beneficiary}}</span></li>
          <li class="item"><span class="label">证件类型</span><span class="right">身份证</span></li>
          <li class="item"><span class="label">证件号码</span><span class="right">{{beneficiary_card_no}}</span></li>
          <li class="item"><span class="label">出生日期</span><span class="right">{{idGetBirthday(beneficiary_card_no)}}</span></li>
          <li class="item"><span class="label">性别</span><span class="right">{{idGetSex(beneficiary_card_no)}}</span></li>
          <li class="item mt20"><span class="label fb">保障期限</span><span class="right">一年</span></li>
          <li class="item mt40"><span class="label fb">应付金额</span><span class="right blue">¥ {{(price/100).toFixed(2)}}</span></li>
        </ul>
      </div>
      <div class="bottom_content">
        <div class="left_create msg_box" @click="back">返回修改</div>
        <div class="right_bottom msg_box" @click="pay" v-touchFeel>确认</div>
      </div>
    </div>
    <JkxPay ref="pay" @choice="choicePayType" :cancelLink="cancelLink"></JkxPay>
  </div>
</template>
<script>
	import XInput from '../components/XInput.vue'
	import XSelect from '../components/XSelect.vue'
	import { Toast,Indicator } from 'mint-ui';
	import { jkxOrderInfo } from '../../assets/js/api';
	import JkxPay from './components/jkxPay.vue'
	import {shipList} from './js/common'
  import {Pay,idCard} from './js/mixins'
  
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
				price:0,
				shipList,
      }
    },
    computed:{
    	ship(){
    		return this.shipList.filter(item=>item.value === this.relation)[0].name
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
					this.policyholder = res.data.policyholder.name;
					this.policyholder_card_no = res.data.policyholder.card_no;
					this.mobile = res.data.policyholder.mobile;
					this.beneficiary = res.data.beneficiary[0].name;
					this.beneficiary_card_no = res.data.beneficiary[0].card_no;
					this.relation = res.data.beneficiary[0].relation*1;
					this.price = res.data.price*1;
        }else {
					Toast({message:res_msg || '未知错误',position:'bottom'});
        }
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
  .list{
    margin-bottom: pxToRem(40);
  }
</style>