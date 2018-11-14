<template>
  <Dialog title="投保须知" ref="insureNotice"
          :showCancelBtn="false"
          :success="close"
          :cancel="close"
  >
    <div class="notice_box">
      <p>1、凡是从事物流经营，且有相应正规经营铺面的物流商户均可投保本保险（聚保商铺档口火灾保---财产基本险产品）。</p>
      <p>2、本保险的保险标的为：商铺的临时存货及其他代保管货物；物流企业自有相关物流财产和办公财产；合法建筑物及装修等。</p>
      <p>3、投保本保险的物流企业，需将商铺的正面照片、内部照片、消防设施照片等上传，保险公司审核后，予以承保。</p>
      <p>4、因标的临时存货的所有权一般不属于物流企业所有，发生保险事故后，物流企业应务必要求货主方提供货物的有关价值证明资料和权益交割资料，以便于保险人进行核算理赔。 </p>
      <p style="color: #ff0000;">
        5、本保险不承保以下标的：在居民住房内从事货物存储经营的物流企业；无任何消防设施设备的物流商铺档口；其他实质从事仓储经营的物流企业。仓库经营企业请联系聚保投保专门的“仓储保”产品。</p>
      <p style="color: #ff0000;">6、经公安消防机关或政府有关部门确认，被保险人故意违法经营易燃易爆的危险品，导致发生火灾、爆炸事故，造成保险标的损失的，保险人有权拒绝向该被保险人赔偿。</p>
      <p>7、保险公司报案电话：95590；保险顾问24小时咨询服务热线：40080-59680。</p>
    </div>
  </Dialog>

</template>

<script>
  import Dialog from "../src/base/dialog/Dialog.vue"

  export default {
    props:{
      html:{
        type:String
      }
    },
    components: {
      Dialog
    },
    data() {
      return {
        flag: false
      }
    },
    created() {

    },
    methods: {
      open() {
        this.$refs.insureNotice.open()
      },
      close() {
        this.$refs.insureNotice.close();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notice_box:first-child {
    padding: 0.7em 20px 1.7em;
  }

  .notice_box {
    min-height: 40px;
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    height: 22rem;
    overflow-y: scroll;
    text-align: left;
    color: black;
  }
</style>
