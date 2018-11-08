<template>
  <fill-content ref="fillContent" title="FTP设置" class-name="ftp-page">
    <div class="auto-checked-box checked-box">
      <p class="checked-wrapper">
        <el-checkbox v-model="ftpInfo.ftpenable">启用FTP</el-checkbox>
      </p>
      <p class="server-box">
        <label class="label f14">服务器地址：
          <el-input v-model.trim="ftpInfo.ftpip"></el-input>
        </label>
      </p>
      <p class="time-box f14">
        <label class="label">端口：
          <el-input v-model.trim="ftpInfo.ftpport"></el-input>
        </label>
      </p>
      <p class="time-box f14">
        <label class="label">账号：
          <el-input v-model.trim="ftpInfo.ftpuser"></el-input>
        </label>
      </p>
      <p class="time-box f14">
        <label class="label">密码：
          <el-input v-model.trim="ftpInfo.ftppassword"></el-input>
        </label>
      </p>
      <p class="time-box f14">
        <label class="label">FTP路径：
          <el-input v-model.trim="ftpInfo.ftppath"></el-input>
        </label>
      </p>
    </div>

    <div class="hand-checked-box checked-box">
      <p class="checked-wrapper f14">
        <el-checkbox v-model="ftpInfo.httpenable">启用HTTP</el-checkbox>
      </p>
      <p class="time-box f14 http-choose">
        <label class="label">HTTP地址：
          <el-input v-model.trim="ftpInfo.httpurl"></el-input>
        </label>
      </p>
    </div>
    <p class="save-box">
      <el-button type="primary" @click="setFtpData">保存</el-button>
    </p>
  </fill-content>
</template>

<script>
  export default {
    name: 'CheckTime',
    data () {
      return {
        ftpInfo: {
          ftpenable: '',
          ftpip: '',
          ftpport: '',
          ftpuser: '',
          ftppassword: '',
          ftppath: '',
          httpenable: '',
          httpurl: ''
        }
      }
    },
    mounted () {
      this.$refs.fillContent.loading()
      this._initData().finally(() => {
        this.$refs.fillContent && this.$refs.fillContent.closeLoading()
      })
    },
    methods: {
      async _initData () {
        let res = await this.$api.getFtp()
        this.ftpInfo = Object.assign(res.data, {
          ftpenable: res.data.ftpenable === '1',
          httpenable: res.data.httpenable === '1'
        })
      },
      async setFtpData () {
        this.$refs.fillContent.loading()
        let res = await this.$api.setFtp(Object.assign(this.ftpInfo, {
          ftpenable: this.ftpInfo.ftpenable ? '1' : '0',
          httpenable: this.ftpInfo.httpenable ? '1' : '0'
        })).finally(() => {
          this.$refs.fillContent && this.$refs.fillContent.closeLoading()
        })
        this.$message.success(res.message || '设置成功')
      }
    }

  }
</script>

<style lang="scss" scoped>
  $fontColor: #a8a8a8;
  .checked-box {
    display: inline-block;
    padding: 26px 32px 80px 32px;
    color: $fontColor;
    vertical-align: top;
    p {
      .label {
        display: inline-block;
        width: 500px;
        text-align: right;
        color: $fontColor;
        .el-input {
          width: 330px;
          margin-left: 20px;
        }
      }
    }
    p.checked-wrapper {
      padding-left: 210px;
      padding-bottom: 28px;
      .el-checkbox {
        .span {
          font-size: 12px;
          color: $fontColor;
        }
      }
    }
  }

  .auto-checked-box {
    p.server-box {
      padding-bottom: 20px;
    }
    p.time-box {
      padding-bottom: 20px;
    }
  }

  .hand-checked-box {
    .time-choose-box {
      margin-bottom: 26px;
      .el-date-editor--date {
        margin-right: 26px;
      }
      .hand-label {
        display: inline-block;
        width: 190px;
        margin-right: 20px;
        text-align: right;
      }
    }
    .auto-checked-system {
      padding-left: 210px;
      padding-bottom: 30px;
      .el-button {
        width: 132px;
        height: 36px;
        color: #050519;
        background-image: linear-gradient(0deg,
          #f1f3f7 0%,
          #ffffff 100%),
        linear-gradient(
            #7c7c7c,
            #7c7c7c);
        background-blend-mode: normal,
        normal;
        box-shadow: 2px 3px 16px 0px rgba(0, 0, 0, 0.07);
        border-radius: 4px;
        border: solid 1px #ced0da;
      }
    }
    .http-choose {
      margin-bottom: 80px;
    }
  }

  .tips {
    padding-left: 210px;
    margin-bottom: 54px;
    color: $fontColor;
    i.el-icon-question {
      margin-right: 5px;
    }
  }

  p.save-box {
    text-align: center;
  }
</style>
<style lang="scss">
  .ftp-page {
    .checked-box {
      p.checked-wrapper {
        .el-checkbox {
          .el-checkbox__label {
            font-size: 12px;
            color: #a8a8a8;
          }
        }
      }
    }
  }
</style>
