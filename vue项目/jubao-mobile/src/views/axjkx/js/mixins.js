import { Toast,Indicator } from 'mint-ui';
import { jkxAnxinUnderwrite,jkxAnxinPayurl } from '../../../assets/js/api';
import {wwwCheck} from '../../../assets/js/common'
import {isWx} from '../js/common'

//健康险支付mixins
export const Pay = {
	data(){
		return{
			pay_order_no:'',//	预支付订单号
			pay_type:'',//支付方式
			cancelLink:'/axjkxOrders?type=unpaid'
		}
	},
	methods:{
		async pay(){
			Indicator.open();
			await this._Underwrite(); //核保
			if(this.pay_order_no){ //核保成功
				if(isWx()){ //微信游览器里支付
					this.pay_type = 1;
					await this._getPayUrl(); //支付
					Indicator.close();
				}else{ //其他游览器里支付
					Indicator.close();
					this.$refs.pay.open();
				}
			}
			Indicator.close();
		},
		async choicePayType(pay_type){ //选择支付方式
			this.pay_type = pay_type;
			Indicator.open();
			await this._getPayUrl(); //支付
			Indicator.close();
		},
		async _Underwrite(){ //支付核保
			// let cmnUrl = wwwCheck() ? 'http://www.jubao56.com/m/#' : 'http://test.jubao56.com/m/#';
			let cmnUrl = wwwCheck() ? 'http://www.jubao56.com/v3m/#' : 'http://test.jubao56.com/v3m/#'; //仅作v3m测试，记得替换
			let data = {
				order_id : this.orderId,
				pay_finish_url: cmnUrl + '/axjkxPaySuccess?orderId=' + this.orderId,
				pay_cancel_url: cmnUrl + '/axjkxOrders?type=unpaid',
				pay_error_url: cmnUrl + '/axjkxOrders?type=unpaid'
			};
			let res = await jkxAnxinUnderwrite(data);
			if(res.err_code === 0){
				this.pay_order_no = res.data;
			}else{
				this.pay_order_no = '';
				Toast({message:res.err_msg || '未知错误',duration: 4000})
			}
		},
		async _getPayUrl(){
			let data = {
				order_id : this.orderId,
				pay_type : this.pay_type,
				pay_order_no: this.pay_order_no
			};
			let res = await jkxAnxinPayurl(data);
			if(res.err_code === 0){
				window.location.href = res.data;
			}else{
				Toast({message:res_msg || '未知错误'})
			}
		},
	}
}

//身份证获取性别和生日
export const idCard = {
	methods:{
		idGetBirthday(idCard){
			let birthdayno,birthdaytemp
			if(idCard.length===18){
				birthdayno=idCard.substring(6,14)
			}else if(idCard.length===15){
				birthdaytemp=idCard.substring(6,12)
				birthdayno="19"+birthdaytemp
			}else{
				return '--'
			}
			return birthdayno.substring(0,4)+"-"+birthdayno.substring(4,6)+"-"+birthdayno.substring(6,8)
		},
		idGetSex(idCard){
			let sexno,sex;
			if(idCard.length===18){
				sexno=idCard.substring(16,17)
			}else if(idCard.length===15){
				sexno=idCard.substring(14,15)
			}else{
				return '--'
			}
			let tempid=sexno%2;
			if(tempid===0){
				sex='女'
			}else{
				sex='男'
			}
			return sex
		}
	}
}