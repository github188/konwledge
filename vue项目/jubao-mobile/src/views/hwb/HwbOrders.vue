<template>
  <div class="hwb">
    <v-header title="我的保单" :touchFeel="{color:'#0facf0'}" class="blue_header"></v-header>
    <div class="content_box">
      <div class="content orders_container">
        <order-list productEnName="hwb" productCnName="大宗货物保"></order-list>
      </div>
    </div>
  </div>
</template>

<script>
  import OrderList from "../components/OrderList.vue"
  export default {
    components: { OrderList },
  }
</script>
<style scoped>
  .hwb{background: #fff}
  .blue_header { background: #00a0e9; color: #fff;}
  .content_box{
    bottom:0;
  }
</style>
