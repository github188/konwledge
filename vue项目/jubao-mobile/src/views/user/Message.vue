<template>
  <div class="message">
      <v-header title="我的消息" backUrl="/dashboard"></v-header>
      <div class="message_box">
          <span>暂无消息</span>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
    .message {
        height: 100%;
        background: #fff;
        .message_box {
            padding: pxToRem(50);
            text-align: center;
        }
    }
</style>

