<template>
  <ul class="RegisterInPage list">
    <li class="item flex">
      <label class="label">手机号码</label>
      <input type="text" placeholder="请输入手机号码" v-model="mobile" />
    </li>
    <li class="item flex">
      <label class="label">验证码</label>
      <input type="text" class="sms" placeholder="请输入手机收到的验证码" v-model="sms_code" />
      <div class="yzm-btn" :class="{disable}" @click="getSmsCode">{{btn_txt}}</div>
    </li>
  </ul>
</template>
<script>
	import { MessageBox,Toast } from 'mint-ui';
  import { cmnUserCodeReglogin, cmnSmsSend } from '../../assets/js/api'
	import { setCookie , cookieName } from "../../assets/js/common";
  export default {
  	props:{
			company:{
				type:String,
        required:true
      }
    },
  	data(){
  		return {
				mobile:'',
				sms_code:'',
        btn_txt:'获取验证码',
        disable:false,
        timer:null
      }
    },
    methods:{
  		checkAll(){
				if(!this.checkMobile())return false;
				if(!this.sms_code){
					Toast({message:'请输入手机收到的验证码！',position:'bottom'});
					return false
        }
        return true
      },
  		async register(){
				if(!this.checkAll())return false;
				let data = {
					mobile:this.mobile,
          sms_code:this.sms_code,
					company_name: this.company,
        };
				let query = this.$getStorage("locationQuery");
				if(query && query.alias){
          data.alias = query.alias
        }
//				if(JSON.stringify(window.sessionStorage.getItem("jubao56")).includes("alias")){ // 处理专属链接工号
//					data.alias = JSON.parse(window.sessionStorage.getItem("jubao56")).registerDefault.alias;
//				}
  			let res = await cmnUserCodeReglogin(data);
  			if(res.err_code === 0){
  				if(res.data.company_name !== this.company){
						MessageBox({message:'您的手机号已注册，且注册公司名称为"'+res.data.company_name+'"与您输入的被保险人名称不一致，请核对后投保；如继续投保，被保险人信息将会修正为已注册公司信息，请确认是否继续；',confirmButtonText:'继续投保',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
							.then(action=>{
								if(action === 'confirm') {
//									this.company = res.data.company_name;
									this.$emit('update:company', res.data.company_name)
									setCookie( cookieName ,res.data.access_token);
									this.$emit('success');
								}
							})
          }else{
						setCookie( cookieName ,res.data.access_token);
						this.$emit('success');
          }
        }else{
        	Toast({message:res.err_msg || '未知错误',position:'bottom'})
        }
      },
      checkMobile(){
  			let message;
  			if(!this.mobile){
  				message = '请输入手机号！';
        }else if(!this.$store.state.reg_phone.test(this.mobile)){
  				message = '手机号格式有误！'
        }
				if(message){
					Toast({message,position:'bottom'});
					return false
        }
        return true;
      },
			async getSmsCode(){
      	if(this.disable)return;
      	if(!this.checkMobile())return;
				let res = await cmnSmsSend({mobile:this.mobile});
				if(res.err_code === 0){
					Toast({ message: '短信验证码发送成功,请在60秒内输入', duration: 2000 , position:'bottom'});
					this.disable = true;
					let count = 60;
					this.btn_txt = '获取验证码('+count+')';
					this.timer = setInterval(()=>{
						count--;
						this.btn_txt = '获取验证码('+count+')';
						if(count === 0){
							this.btn_txt = '获取验证码';
							clearInterval(this.timer);
              this.disable = false;
						}
          },1000)
        }else{
					Toast({message:res.err_msg || '未知错误',position:'bottom'})
        }
			}
    },
    beforeDestroy(){
			clearInterval(this.timer);
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/list";
  .flex{
    display: flex;
    align-items: center;
  }
  .sms{
    width: pxToRem(350) !important;
  }
  .yzm-btn{
    display: flex;
    align-items: center;
    border-radius: 3px;
    padding: 0 pxToRem(5);
    height: pxToRem(40);
    margin-right: pxToRem(20);
    background: $blue;
    color: #fff;
    font-size: pxToRem(24);
    &.disable{
      background: #ccc;
      cursor: not-allowed;
    }
  }
</style>
