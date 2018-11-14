<template>
  <div class="zxbDes">
    <v-header title="充值转账说明"></v-header>
    <div class="main">
      <p>应相关保险公司要求，专线保预交保险需要通过转账方式充值（首次充值最低金额为10000元，后续充值单次2000元以上），保险公司转账信息如下：</p>
      <ul>
        <li>户名：华泰财产保险有限公司航运保险运营中心</li>
        <li>账号：121913142210223</li>
        <li>开户行：招商银行上海分行张杨支行</li>
        <li>12位联行号（CNAPS Code）：308290003214</li>
        <li>开户行地址：上海市浦东新区张杨路810号</li>
      </ul>
    </div>
    <router-link tag="div" :to="{path:'/zxbDeposit',query:$route.query}" class="foot">上传转账凭证</router-link>
  </div>
</template>
<script>
	import {cmnCompanyInfo, zxbUserInfo} from '../../assets/js/api';
	import {MessageBox, Indicator, Toast} from 'mint-ui';
  export default {
  	created(){
			Indicator.open();
  		this.init().finally(()=>Indicator.close());
    },
    methods:{
			async init() {
        let res = await Promise.all([cmnCompanyInfo(), zxbUserInfo()]);
        //公司名称
        if (res[0].err_code === 1200) {
          MessageBox({message:'公司名称(纳税人名称)，税务登记号为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
            .then(action =>{
              if(action === 'confirm') this.$router.push({path:'/invoicePage',query:{productType:this.productType}});
              if(action === 'cancel') this.$router.push('/dashboard');
            });
        }
        if (res[0].err_code !== 0) {Toast({message: res[0].err_msg || "未知错误", position: 'bottom'});return;}
        if (res[0].data.name && res[0].data.license_no) {
          this.policyholder = res[0].data.name;
          this.beneficiary = res[0].data.name;
        } else {
          MessageBox({message:'公司名称(纳税人名称)，税务登记号为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
            .then(action =>{
              if(action === 'confirm') this.$router.push({path:'/invoicePage',query:{productType:this.productType}});
              if(action === 'cancel') this.$router.push('/dashboard');
            });
//            this.$router.push("/setCompanyName");
          return;
        }
        //账户
        if (res[1].err_code === 1010 || res[1].data && !res[1].data.signed) {
//            Toast({message: "请先签署相关协议", position: 'bottom'});
          this.$router.push("/zxbAgree");
          return;
        }
        if (res[1].err_code !== 0)  {Toast({message: res[1].err_msg || "未知错误", position: 'bottom'});return;}
        if (res[1].data && res[1].data.disabled) { //账户被禁用
          MessageBox('提示', '尊敬的会员： 非常抱歉，您的账户暂时无法投保专线保，建议您选择其他险种，详询聚保服务热线：40080-59680');
          this.$router.push("dashboard");
        }
			},
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .zxbDes{
    background: #eee;
    .main{
      padding: pxToRem(40) pxToRem(25) pxToRem(20) pxToRem(50);
      color: #333;
      font-size: pxToRem(30);
      line-height: pxToRem(36);
      letter-spacing: 0;
      ul{
        margin-top: pxToRem(50);
        line-height: pxToRem(45);
      }
    }
    .foot{
      width: 100%;
      height: pxToRem(100);
      background-color: #06acf9;
      text-align: center;
      font-size: pxToRem(40);
      line-height: pxToRem(100);
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
</style>
