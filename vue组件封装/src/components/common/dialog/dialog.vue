<template>
  <transition name="fade-top">
    <div v-show="show" class="dialog-wrapper">
      <div :class="className" class="d-body">
        <div v-if="showClose" class="close el-icon-close" @click="close"></div>
        <div v-show="bodyLoading" class="dialog-loading">
          <i :class="loadingIcon" class="dialog-icon"></i>
        </div>
        <div v-if="title" class="title">{{ title }}</div>
        <div :style="{width:width, height: height, overflowY: height ? 'scroll' : ''}" class="content">
          <slot></slot>
        </div>
        <div v-show="showCancel || showConfirm" class="footer">
          <button v-if="showCancel" class="v-btn v-btn-normal" @click="cancel">
            <span>{{ cancelText }}</span>
          </button>
          <button v-if="showConfirm" class="v-btn v-btn--primary v-btn-normal" @click="confirm">
            <span>{{ confirmText }}</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      dType: {type: String, default: 'common'},
      className: {type: String, default: ''},
      showFooter: {type: Boolean, default: false},
      title: {type: String, default: ''},
      width: {type: String},
      height: {type: String},
      confirmText: {type: String, require: true},
      cancelText: {type: String, require: true},
      loadingIcon: {type: String, default: 'el-icon-loading'}
    },
    data () {
      return {
        bodyLoading: false,
        show: false,
        showCancel: false,
        showConfirm: false,
        showClose: true
      }
    },
    created () {
      switch (this.dType) {
      case 'common' :
        this.showCancel = false
        this.showConfirm = true
        break
      case 'confirm' :
        this.showCancel = true
        this.showConfirm = true
        break
      case 'box' :
        this.showCancel = false
        this.showConfirm = false
        break
      }
    },
    methods: {
      loading () {
        this.bodyLoading = true
      },
      closeLoading () {
        this.bodyLoading = false
      },
      open () {
        this.show = true
      },
      close () {
        this.show = false
      },
      cancel () {
        this.close()
        this.$emit('cancel')
      },
      confirm () {
        this.$emit('confirm')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  .v-btn:focus, .v-btn:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }

  .v-btn-small {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }

  .v-btn-normal {
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 3px;
  }

  .v-btn--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

  .v-btn--primary:focus, .v-btn--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }

  .dialog-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 30;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    &:after {
      content: "";
      display: inline-block;
      height: 100%;
      width: 0;
      vertical-align: middle;
    }
    .d-body {
      position: relative;
      display: inline-block;
      min-width: 420px;
      padding-bottom: 10px;
      vertical-align: middle;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      font-size: 18px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      text-align: left;
      overflow: hidden;
      backface-visibility: hidden;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      .content {
        max-height: 600px;
        &::-webkit-scrollbar {
          width: 0;
        }
      }
      .close {
        font-size: 20px;
        position: absolute;
        top: 20px;
        right: 10px;
        cursor: pointer;
        z-index: 20;
      }
      .title {
        position: relative;
        text-align: center;
        font-weight: bold;
        padding: 20px;
        font-size: 20px;
        margin-bottom: 26px;
        &:after {
          position: absolute;
          content: ' ';
          background: #efefef;
          height: 1px;
          left: 20px;
          right: 20px;
          bottom: 0;
        }
      }
      .footer {
        padding: 5px 15px 0;
        text-align: center;
        button:last-child {
          margin-left: 36px;
        }
      }
    }
  }

  .dialog-loading {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, .5);
    text-align: center;
    &:after {
      content: "";
      display: inline-block;
      height: 100%;
      width: 0;
      vertical-align: middle;
    }
    .dialog-icon {
      vertical-align: middle;
    }
  }

  .fade-top-enter-active, .fade-top-leave-active {
    transition: all .2s;
    .d-body {
      transition: all .2s;
    }
  }

  .fade-top-enter, .fade-top-leave-to {
    opacity: 0;
    .d-body {
      transform: translate(0, -30px);
    }
  }

</style>
<style lang="scss">
  .dialog-form-reset {
    padding-right: 40px;
    .el-input-group {
      margin-bottom: 20px;
      .el-input__inner {
        border-radius: 5px;
      }
    }

    .el-form-item__content {
      display: inline-block;
      width: 330px;
      background: #f6f6f6;
    }
    .el-input__inner {
      width: 330px;
      background: #fff;
    }
    .el-form-item__label {
      width: 100px;
      text-align: right;
      border: none;
      background: none;
      margin-left: 70px;
      color: #a5a5a5;
    }
  }
</style>
