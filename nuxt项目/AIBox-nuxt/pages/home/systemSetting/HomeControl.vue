<template>
  <fill-content ref="fillContent" :title="$t('menu.sysSetting.homeControl')" class-name="home-control-page">
    <p class="f14 control-title">{{ $t('homeControl.title') }}</p>
    <p class="home-control-main">
      <el-checkbox v-model="currentStatus.face">{{ $t('homeControl.face') }}</el-checkbox>
      <el-checkbox v-model="currentStatus.car">{{ $t('homeControl.car') }}</el-checkbox>
      <el-checkbox v-model="currentStatus.passerby">{{ $t('homeControl.passerby') }}</el-checkbox>
    </p>
    <p class="save-box">
      <el-button type="primary" @click="dataUpdate">{{ $t('homeControl.upload') }}</el-button>
    </p>
  </fill-content>
</template>

<script>
  export default {
    name: 'HomeControl',
    data () {
      return {
        currentStatus: {
          face: false,
          car: false,
          passerby: false
        }
      }
    },
    mounted () {
      this.$refs.fillContent.loading()
      this._initData().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
    },
    methods: {
      async _initData () {
        let res = await this.$api.homeControl()
        this.currentStatus = Object.assign(this.currentStatus, res.data)
      },
      async dataUpdate () {
        this.$refs.fillContent.loading()
        let res = await this.$api.homeControlSet({...this.currentStatus}).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-control-page{
    p.control-title{
      margin-bottom: 40px;
    }
    .home-control-main{
      margin-bottom: 130px;
    }
    p.save-box{
      padding-left: 180px;
    }
  }
</style>
<style lang="scss">
  .home-control-page{
    padding:80px 0 0 126px;
    .home-control-main{
      .el-checkbox__label{
        color:$fontGrayColor
      }
    }
  }
</style>
