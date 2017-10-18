<template>
  <div class="confirm-bg" v-show="isOpen">
    <div class="confirm">
      <div class="title">
        <h5>{{title}}</h5>
        <i @click="close" class="iconfont icon-close"></i>
      </div>
      <div class="message">
        {{message}}
      </div>
      <div class="button">
        <div class="cancel" @click.stop="handleCancel" v-if="showCancel">{{cancel}}</div>
        <div class="success" @click.stop="handleSuccess">{{success}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '提示'
      },
      message: {
        type: String,
        default: ''
      },
      cancel: {
        type: String,
        default: '取消'
      },
      success: {
        type: String,
        default: '确定'
      },
      showCancel: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      handleCancel() {
        this.$emit('cancel')
        this.close()
      },
      handleSuccess() {
        this.$emit('success')
        this.close()
      },
      open() {
        this.isOpen = true
      },
      close() {
        this.isOpen = false
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "./font/iconfont.css";

  .confirm-bg {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .3);
    .confirm {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate3d(-50%, -50%, 0);
      text-align: left;
      background-color: #fff;
      width: 420px;
      border-radius: 3px;
      font-size: 16px;
      overflow: hidden;
      .title {
        position: relative;
        padding: 20px 20px 0;
        h5 {
          margin: 0;
          padding: 0;
          font-size: 16px;
          font-weight: 700;
          height: 18px;
          color: #333;
        }
        .icon-close {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
        }
      }
      .message {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
        text-align: center;
      }
      .button {
        padding: 10px 20px 15px;
        display: flex;
        justify-content: space-around;
        div {
          cursor: pointer;
          border: 1px solid #bfcbd9;
          text-align: center;
          box-sizing: border-box;
          outline: none;
          padding: 5px 20px;
          font-size: 14px;
          border-radius: 4px;
          &.success {
            background: #4db3ff;
            border-color: #4db3ff;
            color: #fff;
          }
        }
      }
    }
  }
</style>












