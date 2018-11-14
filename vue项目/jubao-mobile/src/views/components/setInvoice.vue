<template>
  <ul class="setInvoice list" :class="{isEdit}">
    <li class="item">
      <span class="label">纳税人名称<span class="red" v-if="isEdit">*</span></span>
      <input class="name" type="text" placeholder="请填写纳税人名称" v-model="invoiceData.tax_name" :disabled="hasCompanyName">
    </li>
    <li class="item">
      <span class="label">税务登记号<span class="red" v-if="isEdit">*</span></span>
      <input type="text" placeholder="请填写税务登记号" v-model="invoiceData.tax_no"  v-if="isEdit">
      <input type="text"  :value="invoiceData.tax_no || '暂无'" disabled  v-else>
    </li>
    <li class="bg" v-if="isEdit">温馨提示：带星号为必填，如需发票请完善如下信息</li>
    <li class="item">
      <span class="label">税务登记地址</span>
      <span v-if="!isEdit">{{invoiceData.tax_address || '暂无'}}</span>
      <textarea v-else placeholder="请输入完整地址" v-model="invoiceData.tax_address"></textarea>
    </li>
    <li class="item">
      <span class="label">税务登记联系电话</span>
      <input type="text" placeholder="请填写税务登记联系电话" v-model="invoiceData.tax_mobile"  v-if="isEdit">
      <input type="text" :value="invoiceData.tax_mobile || '暂无'" disabled  v-else>
    </li>
    <li class="item">
      <span class="label">税务开户银行名称</span>
      <input type="text" placeholder="请填写税务开户银行名称" v-model="invoiceData.tax_bank" v-if="isEdit">
      <input type="text" :value="invoiceData.tax_bank || '暂无'"  disabled  v-else>
    </li>
    <li class="item">
      <span class="label">税务开户银行账号</span>
      <input type="text" placeholder="请填写税务开户银行账号" v-model="invoiceData.tax_bank_no"  v-if="isEdit">
      <input type="text" :value="invoiceData.tax_bank_no || '暂无'" disabled  v-else>
    </li>
  </ul>
</template>
<script>
  export default {
    props:{
      invoiceData:{type:Object,require:true},
      isEdit:{type:Boolean,default:false},
      hasCompanyName:{type:Boolean,default:true}
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/list";
  .isEdit{
    input,textarea{
      color: #999 !important;
    }
    input.name{
      color: #333!important;
    }
  }
  .setInvoice{
    margin-top: 0!important;
    li.item{
      padding-right: pxToRem(5);
      height: auto;
      display: flex;
      .label{
        width: pxToRem(255);
        flex: 0 0 auto;
      }
      i{
        float: right;
        margin-right: pxToRem(20);
      }
    }
    li.bg{
      padding-left: pxToRem(30);
      background: #eee;
      color: $blue;
      font-size: pxToRem(24);
      height: pxToRem(60);
      line-height: pxToRem(60);
    }
    input{
      display: block;
      width: 100%;
      height: pxToRem(80);
    }
    textarea {
      width: 100%;
      overflow: auto;
      border: none;
      resize:none;
      box-sizing: border-box;
      font-size: pxToRem(30);
      line-height: pxToRem(80);
      outline: none;
    }
  }
  .red{
    color: red;
  }
</style>
