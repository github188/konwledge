<template>
  <fill-content ref="fillContent" :title="$t('menu.sysSetting.checkTime')" class-name="checked-time">
    <div class="auto-checked-box checked-box">
      <p class="checked-wrapper">
        <!--<el-checkbox v-model="autoChecked">自动校时</el-checkbox>-->
        <el-radio v-model="timeData.ntpenable" label="1">{{ $t('checkTime.autoCheck') }}</el-radio>
      </p>
      <p class="server-box">
        <label class="label f14">{{ $t('checkTime.ip') }}：
          <el-input v-model="timeData.ntpip"></el-input>
        </label>
      </p>
      <p class="time-box f14 auto-checked-bottom">
        <label class="label">{{ $t('checkTime.inter') }}：
          <el-input v-model="timeData.interval"></el-input>
        </label>
      </p>
    </div>

    <div class="hand-checked-box checked-box">
      <p class="checked-wrapper f14">
        <!--<el-checkbox v-model="handChecked">手动校时</el-checkbox>-->
        <el-radio v-model="timeData.ntpenable" label="2">{{ $t('checkTime.handleCheck') }}</el-radio>
      </p>
      <div class="time-choose-box">
        <span class="f14 hand-label">{{ $t('checkTime.timeHolder') }}：</span>
        <el-date-picker
          v-model="timeData.time"
          :placeholder="$t('checkTime.timeHolder')"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime">
        </el-date-picker>
        <!--<el-time-picker-->
        <!--v-model="dateTimeDetail"-->
        <!--placeholder="选择时分秒">-->
        <!--</el-time-picker>-->
      </div>

      <p class="device-time-box f14" style="padding-bottom: 40px; display: inline-block;">
        <label class="label" style="display: inline-block; width:190px; margin-right: 0px; text-align: right;">{{ $t('checkTime.devTime') }}：

        </label>
        <el-input v-model="deviceTime" style="width: 200px; display: inline-block; margin-left: 20px"></el-input>
          <el-button style="margin-left: 10px" @click="getDeviceTime">{{ $t('checkTime.getDevTime') }}</el-button>
      </p>

      <p class="auto-checked-system">
        <el-button type="primary" @click="autoInitSystemTime">{{ $t('checkTime.getSystemTime') }}</el-button>
      </p>
    </div>

    <p class="tips">
      <i class="el-icon-question f16"></i>
      <span class="f16">{{ $t('checkTime.handleTips') }}</span>
    </p>
    <p class="save-box">
      <el-button type="primary" @click="saveData">{{ $t('checkTime.save') }}</el-button>
    </p>
  </fill-content>
</template>

<script>
  export default {
    name: 'CheckTime',
    data () {
      return {
        timeData: {
          'ntpenable': '',
          'ntpip': '',
          'interval': '', // 分钟
          'time': ''
        },
        deviceTime: '',
        switchClear: false
      }
    },
    mounted () {
      this._initTimeData()
    },
    methods: {
      async _initTimeData () {
        this.$refs.fillContent.loading()
        let res = await this.$api.getTime().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.timeData = res.data
        this.deviceTime = res.data.time
      },
      autoInitSystemTime () {
        var thedate = new Date()
        var sp = '-'
        var sp2 = ':'
        var year = thedate.getFullYear()
        var mon = thedate.getMonth() + 1
        var day = thedate.getDate()
        var hour = thedate.getHours()
        var minute = thedate.getMinutes()
        var second = thedate.getSeconds()

        var resulttime = year + sp + mon + sp + day + ' ' + hour + sp2 + minute + sp2 + second
        this.timeData.time = resulttime
      },
      async getDeviceTime () {
        this.$refs.fillContent.loading()
        let res = await this.$api.getTime().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.deviceTime = res.data.time
      },
      async saveData () {
        this.$refs.fillContent.loading()
        let res = await this.$api.setTime(Object.assign(this.timeData)).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message)
      }
    }

  }
</script>

<style lang="scss" scoped>
  $fontColor:#a8a8a8;
  .checked-box{
    padding: 26px 32px 0 32px;
    color:$fontColor;
    p{
      .label{
        display: inline-block;
        width:540px;
        text-align: right;
        color:$fontColor;
        .el-input{
          width:330px;
          margin-left:20px;
        }
      }
    }
    p.checked-wrapper{
      padding-left: 210px;
      padding-bottom: 28px;
      .el-checkbox{
        .span{
          font-size:12px;
          color:$fontColor;
        }
      }
    }
  }

  .auto-checked-box{
    p.server-box{
      padding-bottom: 30px;
    }
    p.time-box{
      padding-bottom: 40px;
    }
    .auto-checked-bottom{
      border-bottom: 1px solid #e7e8e9;
    }
  }

  .hand-checked-box{
    .time-choose-box{
      margin-bottom: 26px;
      .el-date-editor--date{
        margin-right: 26px;
      }
      .hand-label{
        display: inline-block;
        width:190px;
        margin-right: 20px;
        text-align: right;
      }
    }
    .auto-checked-system{
      padding-left: 210px;
      padding-bottom: 30px;
      .el-button{

        height: 36px;
        color:#050519;
        background-image: linear-gradient(0deg,
          #f1f3f7 0%,
          #ffffff 100%),
        linear-gradient(
            #7c7c7c,
            #7c7c7c);
        background-blend-mode: normal,
        normal;
        box-shadow: 2px 3px 16px 0px
        rgba(0, 0, 0, 0.07);
        border-radius: 4px;
        border: solid 1px #ced0da;
      }
    }
  }
  .tips{
    padding-left: 210px;
    margin-bottom: 54px;
    color:$fontColor;
    i.el-icon-question{
      margin-right: 5px;
    }
  }
  p.save-box{
    padding-left: 344px;
  }
</style>
<style lang="scss">
  .checked-time{
    .checked-box{
      p.checked-wrapper{
        .el-checkbox{
          .el-checkbox__label{
            font-size:12px;
            color:#a8a8a8;
          }
        }
      }
    }
  }
</style>
