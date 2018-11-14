<template>
  <Dialog ref="dialog"
          title="验证"
          :showCancelBtn="false"
          :successBtn="'下一步'"
          @success="register"
  >
    <div class="box">
      <div class="tip">
        提示：验证码将发送到手机号{{mobile}}注意查收
      </div>
      <div class="box_yan flex">
        <label class="label">验证码：</label>
        <input type="text" class="sms" v-model.trim="sms_code" />
        <div class="yzm-btn" :class="{disable}" @click="getSmsCode">{{btn_txt}}</div>
      </div>
    </div>
  </Dialog>
</template>
<script>
	import { Indicator,Toast } from 'mint-ui';
  import Dialog from '../../../base/dialog/Dialog.vue'
	import { cmnServiceLogin, cmnSmsSend } from '../../../assets/js/api'
	import { setCookie , cookieName } from "../../../assets/js/common";
  export default {
  	props:['mobile'],
  	components:{
			Dialog
    },
    data(){
  		return{
				sms_code:'',
				btn_txt:'获取验证码',
				disable:false,
				timer:null
      }
    },
    methods:{
  		open(){
  			this.$refs.dialog.open();
      },
			async register(){
				Indicator.open({text:'处理中...'});
				let data = {
					mobile:this.mobile,
					sms_code:this.sms_code,
					os_type:8
				};
				let query = this.$getStorage("locationQuery");
				if(query && query.alias){
					data.alias = query.alias
				}
        let res = await cmnServiceLogin(data);
        Indicator.close();
        if(res.err_code === 0){
          setCookie( cookieName ,res.data);
          this.$emit('success')
        }else{
          Toast({message:res.err_msg || '未知错误',position:'bottom'})
        }
			},
			async getSmsCode(){
				if(this.disable)return;
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
			},
    },
		beforeDestroy(){
			clearInterval(this.timer);
		}
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .tip{
    color: #999;
    font-size: pxToRem(26);
    text-align: center;
    margin-top: pxToRem(20);
  }
  .box_yan{
    height: pxToRem(140);
    line-height: pxToRem(140);
    font-size: pxToRem(30);
  }
  .flex{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sms{
    width: pxToRem(250);
    height: pxToRem(40);
    padding: 0 pxToRem(10);
    margin-right: pxToRem(20);
    border: 1px solid #ccc;
    border-radius: pxToRem(10);
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