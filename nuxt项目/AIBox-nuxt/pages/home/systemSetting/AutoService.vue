<template>
  <fill-content ref="fillContent" :title="$t('menu.sysSetting.autoService')" class-name="auto-service-page">
    <div class="service-box">
      <el-checkbox v-model="autoenable">{{ $t('autoService.autoLabel') }}：</el-checkbox>
      <el-select v-model="dateChoose" placeholder="">
        <el-option v-for="(val) in dateList" :label="val.label"
                   :value="val.value" :key="val.value"
        ></el-option>
      </el-select>
      <el-time-picker
        v-model="timeChoose"
        :placeholder="$t('autoService.timePickerHolder')">
      </el-time-picker>
    </div>
    <p class="save-box">
      <el-button type="primary" @click="dataUpdate">{{ $t('autoService.save') }}</el-button>
    </p>
  </fill-content>
</template>

<script>
  export default {
    name: 'AutoService',
    data () {
      return {
        autoenable: false,
        dateChoose: 1,
        dateList: [
          {label: this.$t('autoService.everyday'), value: 1}
        ],
        timeChoose: ''
      }
    },
    mounted () {
      this.$refs.fillContent.loading()
      this._initData().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
    },
    methods: {
      async _initData () {
        let res = await this.$api.getAutoReboot()
        this.timeChoose = res.data
        this.autoenable = Boolean(res.data.autoenable * 1)
        this.timeChoose = new Date(2018, 10, 12, res.data.hour, res.data.minute, res.data.second)
      },
      async dataUpdate () {
        console.log(this.timeChoose)
        if (this.timeChoose === '') {
          this.$message.warning('')
          return
        }
        this.$refs.fillContent.loading()
        let res = await this.$api.autoServiceSet({
          autoenable: this.autoenable ? '1' : '0',
          day: this.dateChoose,
          hour: this.timeChoose.getHours(),
          minute: this.timeChoose.getMinutes(),
          second: this.timeChoose.getSeconds()
        }).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message)
      }
    }
  }
</script>

<style lang="scss" scoped>
.auto-service-page{
  .service-box{
    margin-bottom: 72px;
    overflow: hidden;
  }
  .save-box{
    padding-left: 130px;
  }
}
</style>
<style lang="scss">
  .auto-service-page{
    padding:66px 0 0 102px;
    .el-checkbox{
      float: left;
      height:40px;
      line-height: 40px;
      .el-checkbox__label{
        font-size:14px;
        color:$fontGrayColor;
        margin-right:10px;
      }
    }
    form.el-form{
      width:500px;
      float: left;
      .el-select{
        width:202px;
      }
    }
  }
</style>
