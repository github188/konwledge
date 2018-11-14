<template>
  <div class="InvoicePage">
    <v-header :title="isEdit?'编辑发票资质':'发票资质'" :routerLinkMode="false" @back="back" className="border"></v-header>
    <setInvoice class="setInvoice" :isEdit="isEdit" :hasCompanyName="hasCompanyName" :invoiceData="invoiceData" ></setInvoice>
    <div class="foot ">
      <a v-if="!isEdit" class="btn bg_blue" @click="isEdit=true">编辑</a>
      <a v-else class="btn bg_blue" @click="submit">提交</a>
    </div>
  </div>
</template>
<script>
  import {cmnCompanyInfo,cmnCompanyUpdate,cmnCompanyNew} from '../../assets/js/api'
  import setInvoice from '../components/setInvoice.vue'
  import { Toast,MessageBox } from 'mint-ui';

  export default {
    components:{
      setInvoice
    },
    data(){
      return {
        invoiceData:{},
        isEdit:false,
        fromShow:false,
        companyId:'',
        hasCompanyName:true,
        productType:this.$route.query.productType
      }
    },
    created(){
      this._getInfo();
    },
    methods:{
      async _getInfo(){
        let res = await cmnCompanyInfo();
        if(res.err_code === 0){
          if(!res.data.name){
            this.hasCompanyName = false;
            this.isEdit = true;
            return
          }
          if(!res.data.name || !res.data.tax_address || !res.data.license_no || !res.data.tax_bank || !res.data.tax_bank_no || !res.data.tax_mobile){
            this.isEdit = true;
          }else{
            this.fromShow = true;
          }
          this.companyId = res.data.id;
          this.invoiceData = {
            tax_name:res.data.name,
            tax_no:res.data.license_no,
            tax_address:res.data.tax_address,
            tax_mobile:res.data.tax_mobile,
            tax_bank:res.data.tax_bank,
            tax_bank_no:res.data.tax_bank_no
          };
        }else if(res.err_code === 1200){
          this.hasCompanyName = false;
          this.isEdit = true;
        }else{
          Toast({message:res.err_msg||'未知错误',position:'bottom'})
        }
      },
      checkInput(){
        let errArr = [];
        if(!this.invoiceData.tax_name) errArr.push('请填写纳税人名称！');
        if(!this.$store.state.reg_company.test(this.invoiceData.tax_name) || this.invoiceData.tax_name.length<4) errArr.push('纳税人名称格式有误！');
        if(!this.invoiceData.tax_no) errArr.push('请填写税务登记号！');
//        let productTypeList = ['ygb','spb','hcb','dchynb'];
//        if(productTypeList.includes(this.productType)){
//          if(!this.invoiceData.tax_address) errArr.push('请填写税务登记地址！');
//          if(!this.invoiceData.tax_mobile) errArr.push('请填写税务登记联系电话！');
//          if(!this.invoiceData.tax_bank) errArr.push('请填写税务开户银行名称！');
//          if(!this.invoiceData.tax_bank_no) errArr.push('请填写税务开户银行账号！');
//        }
        if(errArr.length>0){
          Toast({message:errArr[0],position:'bottom'})
          return false
        }
        return true;
      },
      async submit(){
        if(!this.checkInput())return;
        let data = {
          id:this.companyId,
          tax_address:this.invoiceData.tax_address,
          license_no:this.invoiceData.tax_no,
          tax_mobile:this.invoiceData.tax_mobile,
          tax_bank:this.invoiceData.tax_bank,
          tax_bank_no:this.invoiceData.tax_bank_no
        };
        let ajax = cmnCompanyUpdate;
        if(!this.hasCompanyName){
          ajax = cmnCompanyNew;
          data.name = this.invoiceData.tax_name;
        }
        let res = await ajax(data);
        if(res.err_code === 0){
          MessageBox.alert('修改成功！').then(action=>{
            if(data.tax_address && data.tax_mobile && data.tax_bank && data.tax_bank_no){
              this.isEdit = false;
            }else{
              this.$router.push(this.$store.state.routerFrom.fullPath)
            }
          });
        }else{
          Toast({message:res.err_msg||'未知错误',position:'bottom'})
        }
      },
      back(){
        if(this.isEdit){
          if(this.fromShow){
            this.isEdit = false
          }else{
            this.$router.push('/setting')
          }
        }else{
          this.$router.push(this.$store.state.routerFrom.fullPath)
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .InvoicePage{background: #fff;}
  .border{
    @include border-1px('bottom')
  }
  .setInvoice{
    margin-top: 0 !important;
    margin-bottom: pxToRem(100) !important;
  }
  .foot{
    width: 100%;
    height: pxToRem(100);
    font-size: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    .btn{
      display: inline-block;
      width: 100%;
      font-size:pxToRem(40);
      line-height: pxToRem(100);
      text-align: center;
      color: $yellow;
      background: #fff;
      &.bg_blue{
        color: #fff;
        background: $blue;
      }
    }
  }
</style>
