import {setSessionStorage,getSessionStorage,removeSessionStorage} from '../../assets/js/store'
import {cmnUseraddressList} from 'assets/js/api'
import { MessageBox,Toast } from 'mint-ui';

export const invoiceCreate = { //create页面的发票逻辑
  data(){
    return {
			invoiceData:{
				vat_invoice_open:true,
				vat_invoice_type:1,//发票类型 1.普票 2.专票
				vat_invoice_title:1,//发票抬头 1.企业 2.个人
				tax_name:'', //企业名称
				tax_no:'', //税号
				individual_title_name:'', //个人名称
				tax_address:'', //注册地址
				tax_mobile:'', //注册电话
				tax_bank:'', //开户银行名称
				tax_bank_no:''//开户银行账户
      },
      addressData:{}
    }
  },
	computed:{
  	invoiceSaveData(){
  		if(this.invoiceData.vat_invoice_open){
  			return this.invoiceData
			}else{ //不开发票就只传默认值过去
  			return {vat_invoice_open:false}
			}
		}
	},
  methods:{
    //从本地缓存中获取数据,并录入
    async setDataBySession(){
      let obj = getSessionStorage(this.productType+'address');
      if(this.productType === 'ygb'){
        obj.pickerVisible = new Date(obj.pickerVisible); //日期对象在JSON.stringify后变成了字符串，需要重新new Date
        obj.startDate = new Date(obj.startDate);
      }
      for(let k in obj){this[k] = obj[k]}
      removeSessionStorage(this.productType+'address'); //设置完就删了
      await this._getAddress()
    },
    async _getAddress(){
      let res = await cmnUseraddressList();
      // 检测用户邮寄地址（保单寄送地址）
			this.addressData = {};
      if(res.err_code === 0 && res.rows[0]){
				this.setAddressData(res,'userAddressList')
      }
    },
		_fromAddress(){
    	return this.$store.state.routerFrom.path === '/setAddress' && getSessionStorage(this.productType+'address');
		},
    toAddress(){
      setSessionStorage(this.productType+'address',this.$data);
      this.$router.push({path:'/setAddress',query:{productType:this.productType,...this.$route.query}})
    },
		setInvoiceData(res,type){
      if(type === 'companyInfo'){
				let data = {
					tax_name : res.name,
					tax_no: res.license_no,
					tax_address: res.tax_address,
					tax_mobile:res.tax_mobile,
					tax_bank:res.tax_bank,
					tax_bank_no:res.tax_bank_no
				};
				this.invoiceData = Object.assign(this.invoiceData,data);
			}else if(type === 'orderInfo'){
      	for(let k in this.invoiceData){this.invoiceData[k] = res[k]}
      	this.invoiceData.vat_invoice_type = this.invoiceData.vat_invoice_type || 1;
      	this.invoiceData.vat_invoice_title = this.invoiceData.vat_invoice_title || 1;
			}
    },
		setAddressData(res,type){
			if(type === 'userAddressList'){
				this.addressData = {
					user_address_id:res.rows[0].id,
					send_name:res.rows[0].recipients,
					send_moblie:res.rows[0].mobile,
					send_address:res.rows[0].province+res.rows[0].city+res.rows[0].district+res.rows[0].street
				}
			}else if(type === 'orderInfo'){
				let data = res.order || res.data;
				this.addressData={
					user_address_id:data.user_address_id,
					send_name:data.send_name,
					send_moblie:data.send_moblie,
					send_address:data.send_address
				};
			}
		},
		checkInvoice(){
			let data = this.invoiceData;
			if(!data.vat_invoice_open)return true;
			let errArr = [];
			if(data.vat_invoice_type === 1){
				if(data.vat_invoice_title === 1){
					if(!data.tax_name){errArr.push('企业名称不能为空')}
					if(!data.tax_no){errArr.push('请填写纳税人识别号')}
				}else if(data.vat_invoice_title === 2){
					if(!data.individual_title_name){errArr.push('请填写个人发票抬头')}
				}
			}else if(data.vat_invoice_type === 2){
				if(!data.tax_name){errArr.push('企业名称不能为空')}
				if(!data.tax_no){errArr.push('请填写纳税人识别号')}
				if(!data.tax_address){errArr.push('请填写注册地址')}
				if(!data.tax_mobile){errArr.push('请填写注册电话')}
				// if(!this.$store.state.reg_phone.test(data.tax_mobile)){errArr.push('注册电话格式有误')}
				if(!data.tax_bank){errArr.push('请填写开户银行名称')}
				if(!data.tax_bank_no){errArr.push('请填写开户银行账户')}
			}
			if(!this.addressData.user_address_id && !this.addressData.send_name && !this.addressData.send_moblie && !this.addressData.send_address){
				errArr.push('请完善寄送地址！')
			}
			if(errArr.length >0){
				Toast({message:errArr[0],position:'bottom'});
				return false
			}else{
				return true
			}
		}
  },
  beforeDestroy(){
    MessageBox.close(false);
  }
};

export const invoiceConfirm = {
  data(){
    return{
      addressData:{},
      invoiceData:{
				vat_invoice_open:false,
				vat_invoice_type:1,//发票类型 1.普票 2.专票
				vat_invoice_title:1,//发票抬头 1.企业 2.个人
				tax_name:'', //企业名称
				tax_no:'', //税号
				individual_title_name:'', //个人名称
				tax_address:'', //注册地址
				tax_mobile:'', //注册电话
				tax_bank:'', //开户银行名称
				tax_bank_no:''//开户银行账户
			}
    }
  },
  methods:{
    setData(res){
			invoiceCreate.methods.setInvoiceData.call(this,res.order||res.data,'orderInfo');
			invoiceCreate.methods.setAddressData.call(this,res,'orderInfo');
    }
  }
};
