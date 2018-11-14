import {setSessionStorage,getSessionStorage,removeSessionStorage} from '../../assets/js/store'
import {getToken,cmnCompanyInfo} from '../../assets/js/api'
import {delCookie, cookieName} from "../../assets/js/common"
import {MessageBox, Toast} from 'mint-ui';

export const login = {
	methods:{
		//跳转到登陆页并存本地
		goLogin(){
			setSessionStorage(this.productType+'login',this.$data);
			this.$router.push({path:'/login',query:{productType:this.productType}})
		},
		_fromLogin(){
			let routerFrom = this.$store.state.routerFrom;
			return (routerFrom.path === '/login' || routerFrom.path === '/register' || routerFrom.path === '/smslogin') && routerFrom.query.productType === this.productType && this._hasStorageData();
		},
		//验证本地是否有数据
		_hasStorageData(){
			return getSessionStorage(this.productType+'login')
		},
		//给this赋值
		async _getStorageData(){
			let data = this._hasStorageData();
			for(let k in data){this[k] = data[k]}
			this.hasLogin = getToken();
			removeSessionStorage(this.productType+'login');//用完就删掉，避免影响下一次
			if(this.hasLogin){
				let res = await cmnCompanyInfo();
				if(res.err_code !== 0){Toast({message:res.err_msg || '未知错误',position:'bottom'});return;}
				if(!data.beneficiary){this.beneficiary = res.data.name; return;}
				if(data.beneficiary !== res.data.name){
					MessageBox({message:'您登录账户的公司名称为"'+res.data.name+'"与您已输入的被保险人不一致,是否替换为该账户的公司名称？',confirmButtonText:'替换',cancelButtonText:'退出登录',showCancelButton:true,closeOnClickModal:false})
						.then(action=>{
							if(action === 'confirm') {
								this.beneficiary = res.data.name;
							}
							if(action === 'cancel'){
								delCookie(cookieName);
								this.hasLogin = false
							}
						})
				}
			}
		}
	}
};
