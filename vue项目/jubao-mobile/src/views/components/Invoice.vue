<template>
  <ul class="list" v-if="edit || invoiceData.vat_invoice_open">
    <template>
      <li class="item weight" v-if="edit">
        <span class="label">发票开具</span>
        <mt-switch class="switch" v-model="invoiceData.vat_invoice_open"></mt-switch>
      </li>
      <li class="item kai" @click="isShow = !isShow" v-else>
        <span class="label">开票信息</span>
        <span>{{invoiceData.vat_invoice_type == 2 ? '增值税专用发票' : invoiceData.vat_invoice_title == 1 ? '增值税普通发票(企业)' : '增值税普通发票(个人)'}}</span>
        <i class="iconfont icon-right" :class="{rotate:isShow}"></i>
      </li>
      <Panel :flag="isShow" :change="invoiceData" class="panel_body">
        <li class="item flex" v-if="edit">
          <span class="label">发票类型</span>
          <span class="it-btn" :class="{active:invoiceData.vat_invoice_type==1}" @click="invoiceData.vat_invoice_type=1">增值税普通发票</span>
          <span class="it-btn" :class="{active:invoiceData.vat_invoice_type==2}" @click="invoiceData.vat_invoice_type=2">增值税专用发票</span>
        </li>
        <template v-if="invoiceData.vat_invoice_type==1">
          <li class="item" v-if="edit">
            <span class="label">发票抬头</span>
            <span class="it-check" @click="invoiceData.vat_invoice_title=1"><i class="iconfont" :class="invoiceData.vat_invoice_title==1?'icon-duigou':'icon-yuan'" ></i>企业</span>
            <span class="it-check" @click="invoiceData.vat_invoice_title=2"><i class="iconfont" :class="invoiceData.vat_invoice_title==2?'icon-duigou':'icon-yuan'" ></i>个人</span>
          </li>
          <template v-if="invoiceData.vat_invoice_title==1">
            <x-input :class="{bgBlue:edit}" :label="'企业名称'" :placeholder="'请填写企业名称'" v-model="invoiceData.tax_name" :edit="false" ></x-input>
            <x-input :class="{bgBlue:edit}" :label="'税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号'" :placeholder="'请填写纳税人识别号'" v-model="invoiceData.tax_no" :edit="edit"></x-input>
          </template>
          <template v-if="invoiceData.vat_invoice_title==2">
            <x-input :class="{bgBlue:edit}" :label="'个人名称'" :placeholder="'请填写个人发票抬头'" v-model="invoiceData.individual_title_name" :edit="edit"></x-input>
          </template>
        </template>
        <template v-if="invoiceData.vat_invoice_type==2">
          <x-input :class="{bgBlue:edit}" :label="'企业名称'" :placeholder="'请填写企业名称'" v-model="invoiceData.tax_name" :edit="false"></x-input>
          <x-input :class="{bgBlue:edit}" :label="'税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号'" v-model="invoiceData.tax_no" :placeholder="'请填写纳税人识别号'" :edit="edit"></x-input>
          <x-input :class="{bgBlue:edit}" :label="'注册地址'" :placeholder="'请填写完整地址'" v-model="invoiceData.tax_address" :edit="edit"></x-input>
          <x-input :class="{bgBlue:edit}" :label="'注册电话'" :placeholder="'请填写联系电话'"  v-model="invoiceData.tax_mobile" :edit="edit"></x-input>
          <x-input :class="{bgBlue:edit}" :label="'开户银行'" :placeholder="'请填写开户银行名称'" v-model="invoiceData.tax_bank" :edit="edit"></x-input>
          <x-input :class="{bgBlue:edit}" :label="'银行账户'" :placeholder="'请填写开户银行账户'" v-model="invoiceData.tax_bank_no" :edit="edit"></x-input>
        </template>
        <SendAddress :isEdit="edit" :addressData="addressData" @toAddress="toAddress"></SendAddress>
      </Panel>
    </template>
  </ul>
</template>
<script>
  import SetInvoice from './setInvoice'
  import SendAddress from './SendAddress'
  import Panel from 'base/panel/Panel'
	import { Switch } from 'mint-ui';
  import XInput from './XInput.vue'
 
  export default {
    components:{
      SendAddress,
      SetInvoice,
      Panel,
			mtSwitch:Switch,
			XInput
    },
    props:{
      edit:{type:Boolean,default:true},
      addressData:{type:Object,required:true},
      invoiceData:{type:Object,required:true}
    },
    data(){
    	return{
    		isShow:true
      }
    },
    watch:{
    	'invoiceData.vat_invoice_open':{
				handler(val){
					if(this.edit){
						this.isShow = val;
          }
        },
				immediate:true
			}
    },
    methods:{
      toAddress(){
        this.$emit('toAddress')
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/list";
  .list li.item{
    &.kai{
      height: pxToRem(81);
    }
    &.weight{
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      .switch{
        margin-right: pxToRem(30);
        transform: scale(.8);
      }
    }
    &.flex{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &.bgBlue{
      background: #f7fcfe;
    }
    .label{
      width: pxToRem(130);
    }
    .it-btn{
      margin-right: pxToRem(45);
    }
    .it-check{
      margin-right: pxToRem(40);
      i{
        padding: 0 pxToRem(15);
        &.icon-danxuan{
         color: $blue;
        }
      }
    }
    i.icon-right{
      float: right;
      display: block;
      margin-right: pxToRem(20);
      transition: all .3s ease;
      &.rotate{
        transform: rotate(90deg);
      }
    }
  }
</style>
