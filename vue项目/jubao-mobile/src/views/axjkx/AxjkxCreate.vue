<template>
  <div class="axjkx_create">
    <v-header title="投保信息填写" :touchFeel="{color:'#626368'}" className="header"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order list">
          <li class="item title">基本信息</li>
          <x-input :label="'姓名'" :placeholder="'请输入投保人姓名'" v-model="policyholder" @blur="autoInputBenficiary"></x-input>
          <li class="item"><span class="label">证件类型</span> 身份证</li>
          <x-input :label="'证件号码'" :placeholder="'请输入证件号码'" v-model="policyholder_card_no" @input="autoInputBenficiary"></x-input>
          <x-input :label="'手机号码'" :type="'Number'" :placeholder="'请输入手机号码'" v-model="mobile"></x-input>
          <li class="item title mt20">被保险人信息</li>
          <x-select :label="'关系'" v-model="relation" :list="shipList" :tip="'请选择关系'" @change="relationChange"></x-select>
          <BeneficiarySelect :label="'姓名'" :value="{name:beneficiary,idCard:beneficiary_card_no}" @change="beneficiaryChange" :list="beneficiaryList" :placeholder="'请输入或选择被投保人姓名'" :tip="'请选择被投保人'" :iconName="'icon-tongxunlu'"></BeneficiarySelect>
          <li class="item"><span class="label">证件类型</span> 身份证</li>
          <x-input :label="'证件号码'" :placeholder="'请输入证件号码'" v-model="beneficiary_card_no"></x-input>
          <li class="agree" @click="agree=!agree">
            <i class="iconfont" :class="agree?'icon-danxuan':'icon-yuan'"></i>
            <div class="msg">
              <span>我已阅读并同意</span><span @click.stop="getClause('投保声明')" class="blue">《投保声明》、</span><span @click.stop="getClause('如实告知声明')"  class="blue">《如实告知声明》、</span><br>
              <span @click.stop="getClause('癌症医疗保险条款（2017版）')" class="blue">《癌症医疗保险条款（2017版）》、</span><span @click.stop="getClause('责任免除')" class="blue">《责任免除》、</span><br>
              <span @click.stop="getClause('投保须知')" class="blue">《投保须知》</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom_content">
        <div class="left_create msg_box">￥{{(allPrice/100).toFixed(2)}}</div>
        <div class="right_bottom msg_box" @click="next" v-touchFeel>下一步</div>
      </div>
    </div>
    <Risk :touchFeel="{color:'#626368'}" :title="agreementContent.title" ref="agreement" :html="agreementContent.content"></Risk>
    <JkxLoginInPage :mobile="mobile" ref="LoginInPage" @success="createOrder"></JkxLoginInPage>
  </div>
</template>
<script>
	import XInput from '../components/XInput.vue'
	import XSelect from '../components/XSelect.vue'
	import BeneficiarySelect from './components/BeneficiarySelect.vue'
	import JkxLoginInPage from './components/JkxLoginInPage.vue'
	import Risk from "../components/Risk.vue"
	import { getToken,jkxOrderHistoryPolicyholder,jkxOrderHistoryBeneficiary,jkxOrderPrice,jkxOrderSave,jkxOrderInfo,cmnAdminAgreementList } from '../../assets/js/api';
	import { Toast,Indicator,MessageBox } from 'mint-ui';
	import { shipList } from './js/common';
	import Router from '../../router/index'
	
	export default {
		components:{
			XInput,
			XSelect,
			BeneficiarySelect,
			JkxLoginInPage,
			Risk
    },
    data(){
			return{
				policyholder:'',
				policyholder_card_type:1,
				policyholder_card_no:'',
				mobile:'',
				beneficiaryList:[],
				beneficiary:'',
				beneficiary_card_type:1,
				beneficiary_card_no:'',
				allPrice:0,
				relation:1,
				agree:false,
				shipList,
				agreementContent: {},//协议
				product_name:'安享一生癌症医疗险',
        orderId:this.$route.query.orderId*1
      }
    },
		beforeRouteEnter(to,from,next){
      if(!to.query.orderId && from.path !== '/axjkxRisk' && from.path !== '/'){
				Router.push('/axjkxRisk')
      }
			next();
    },
    created(){
    	this.init();
    },
    watch:{
			beneficiary_card_no(){
				this.getPrice();
      }
    },
    methods:{
    	init(){
				if(getToken()){
					Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
					if(this.orderId){ //有订单id
            this._getOrderInfo().finally(()=>Indicator.close())
          }else{//没订单id
						Promise.all([this._getHistoryPolicyholder(),this._getHistoryBeneficiary()]).finally(()=>Indicator.close())
          }
        }
      },
      async _getOrderInfo(){
    		this.agree = true;
    		let res = await jkxOrderInfo(this.orderId);
    		if(res.err_code === 0){
					this.policyholder = res.data.policyholder.name;
					this.policyholder_card_no = res.data.policyholder.card_no;
					this.mobile = res.data.policyholder.mobile;
					this.beneficiary = res.data.beneficiary[0].name;
					this.beneficiary_card_no = res.data.beneficiary[0].card_no;
					this.relation = res.data.beneficiary[0].relation*1;
					this.price = res.data.price*1;
        }else{
					Toast({message:res.err_msg || '未知错误'})
        }
      },
      async _getHistoryPolicyholder(){
    		let res = await jkxOrderHistoryPolicyholder({product_name:this.product_name});
				if(res.err_code === 0){
						this.beneficiary = this.policyholder = res.data.name;
						this.beneficiary_card_no = this.policyholder_card_no = res.data.card_no;
						this.mobile = res.data.mobile;
				}else{
					Toast({message:res.err_msg || '未知错误'})
				}
      },
      async _getHistoryBeneficiary(){
				let res = await jkxOrderHistoryBeneficiary({product_name:this.product_name});
				if(res.err_code === 0){
          this.beneficiaryList = res.data.map((item)=>({name:item.name, idCard:item.card_no}));
				}else{
					Toast({message:res.err_msg || '未知错误'})
				}
      },
      async getPrice(){
      	if(!this.beneficiary || !this.beneficiary_card_no || !this.$store.state.identity.test(this.beneficiary_card_no))return;
      	let data = {
					product_name:this.product_name,
					beneficiarys:[{
						beneficiary: this.beneficiary,
						beneficiary_card_type:this.beneficiary_card_type,
						beneficiary_card_no:this.beneficiary_card_no,
						relation:this.relation
          }]
        };
      	let res = await jkxOrderPrice(data);
      	if(res.err_code === 0){
      		this.allPrice = res.data;
        }else{
      		Toast({message:res.err_msg || '未知错误',position:'bottom'})
        }
      },
			next(){
				if(!this._checkInput())return;
				if(getToken()){
					this.createOrder();
        }else{
					this.$refs.LoginInPage.open();
        }
      },
      _checkInput(){
				let errArr = [];
				if(!this.policyholder)errArr.push('请输入投保人姓名');
				if(!this.policyholder_card_no)errArr.push('请投保人输入证件号码');
				if(!this.$store.state.identity.test(this.policyholder_card_no))errArr.push('投保人证件号码格式有误');
				if(!this.mobile)errArr.push('请输入手机号码');
				if(!this.$store.state.reg_phone.test(this.mobile))errArr.push('手机号码格式有误');
				if(!this.beneficiary)errArr.push('请输入或选择被投保人姓名');
				if(!this.beneficiary_card_no)errArr.push('请被保险人输入证件号码');
				if(!this.$store.state.identity.test(this.beneficiary_card_no))errArr.push('被保险人证件号码格式有误');
				if(this.relation === 1 && (this.policyholder_card_no !== this.beneficiary_card_no || this.policyholder !== this.beneficiary))errArr.push('投保人和被保险人信息不相同，请核对两者关系');
				if(this.relation !== 1 && this.policyholder_card_no === this.beneficiary_card_no && this.policyholder === this.beneficiary)errArr.push('投保人和被保险人信息相同，请核对两者关系');
				if(!this.agree)errArr.push('请阅读并同意相关协议');
        if(errArr.length>0){
        	Toast({message:errArr[0],position:'bottom'});
          return false
        }
        return true
			},
			async createOrder(){
				Indicator.open({text:'订单处理中...'});
				let data = {
					id:this.orderId || null,
					product_name: this.product_name,
					policyholder: this.policyholder,
					policyholder_card_type: this.policyholder_card_type,
					policyholder_card_no: this.policyholder_card_no,
					policyholder_mobile: this.mobile,
					beneficiarys: [{
							beneficiary: this.beneficiary,
							beneficiary_card_type: this.beneficiary_card_type,
							beneficiary_card_no: this.beneficiary_card_no,
							relation: this.relation
						}]
        };
				let query = this.$getStorage("locationQuery");
				if(query && query.alias){
					data.alias = query.alias
				}
        let res = await jkxOrderSave(data);
        Indicator.close();
        if(res.err_code === 0){
					this.$router.push({path:'axjkxConfirm',query:{orderId:res.data.id}})
        }else{
          Toast({message:res.err_msg || '未知错误',position:'bottom'})
        }
      },
			async getClause(title){
				let res = await cmnAdminAgreementList({product_name:this.product_name,title});
				if (res.err_code === 0) {
					this.agreementContent = res.rows[0] || {title,html:''};
					this.$refs.agreement.open();
				}
      },
			beneficiaryChange(val){
				console.log(val)
				this.beneficiary = val.name;
				this.beneficiary_card_no = val.idCard;
      },
			relationChange(val){
				if(val === 1){
					this.beneficiary = this.policyholder;
					this.beneficiary_card_no = this.policyholder_card_no;
        }else {
					if(this.beneficiary === this.policyholder && this.beneficiary_card_no === this.policyholder_card_no){
						this.beneficiary = '';
						this.beneficiary_card_no = '';
          }
        }
      },
			autoInputBenficiary(){
        console.log(this.relation === 1 && this.policyholder && this.$store.state.identity.test(this.policyholder_card_no))
				if(this.relation === 1 && this.policyholder && this.$store.state.identity.test(this.policyholder_card_no)){
					this.beneficiary = this.policyholder;
					this.beneficiary_card_no = this.policyholder_card_no;
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .axjkx_create li.x-select i{
      color: $blue !important;
     &.icon-tongxunlu{
       font-size: pxToRem(60);
     }
  }
  .axjkx_create{
    .header{
      background: #424348 !important;
      color: #fff;
    }
  }
</style>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/list.scss";
  @import "../../assets/scss/axjkx/axjkx";
</style>
