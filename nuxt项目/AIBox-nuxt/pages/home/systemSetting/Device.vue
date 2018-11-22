<template>
  <fill-content ref="fillContent" :title="$t('menu.sysSetting.device')" class-name="device-page" close-bg>
    <div class="d-box fl reset-procedure">
      <div class="tips"><span class="f14" @click="resetSoftware">{{ $t('device.resetSoft') }}</span></div>
    </div>
    <div class="d-box fl reset-device">
      <div class="tips"><span class="f14" @click="rebootDev">{{ $t('device.resetDev') }}</span></div>
    </div>
    <div class="d-box fl reset-system">
      <div class="tips"><span class="f14" @click="initAll">{{ $t('device.initSetting') }}</span></div>
    </div>

  </fill-content>
</template>

<script>
  export default {
    name: 'Device',
    methods: {
      async resetSoftware () {
        this.$refs.fillContent.loading()
        let res = await this.$api.rebootProcess().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message)
      },
      async rebootDev () {
        this.$refs.fillContent.loading()
        let res = await this.$api.rebootDev().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message)
      },
      async initAll () {
        this.$refs.fillContent.loading()
        let res = await this.$api.recovery().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $initDevice: '~@/assets/images/reset-procedure.png';
  $RebootDev: '~@/assets/images/reset-device.png';
  $resetSystem: '~@/assets/images/reset-system.png';
  .reset-procedure{
    background: url($initDevice) no-repeat center/cover;
  }
  .reset-device{
    background: url($RebootDev) no-repeat center/cover;
  }
  .reset-system {
    background: url($resetSystem) no-repeat center/cover;
  }

  .d-box {
    position: relative;
    width: 258px;
    height: 278px;
    border: 1px solid #e8e8e8;
    margin-right: 40px;

    &:last-child {
      margin-right: 0;
    }
    .tips {
      position: absolute;
      left: 0;
      bottom: -16-30px;
      text-align: center;
      width:100%;
      height:30px;
      span{
        display: inline-block;
        padding:8px 22px;
        border:1px solid #e8e8e8;
        background: #fff;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
