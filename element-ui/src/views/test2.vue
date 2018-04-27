<template>
  <div class="">
    <el-tabs></el-tabs>
    <AppLayout>
      <h1 slot="header">这里可能是一个页面标题</h1>

      <p>主要内容的一个段落。</p>
      <p>另一个主要段落。</p>

      <p slot="footer">这里有一些联系信息</p>
    </AppLayout>
  </div>
</template>

<script>
  import AppLayout from "./AppLayout.vue"

  export default {
    components:{
      AppLayout
    },
    data() {
      return {}
    },
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
