<template>
  <fill-content ref="fillContent" title="系统升级" class-name="level-up-page">
    <div class="system-status">
      <el-table
        :data="[systemInfo]"
        border
        style="width: 100%">
        <el-table-column
          prop="status"
          label="当前状态"
          width="220">
        </el-table-column>
        <el-table-column
          prop="datanum"
          label="获取数据数量"
        >
        </el-table-column>
        <el-table-column
          prop="space"
          width="220"
          label="存储空间">
        </el-table-column>
        <el-table-column
          prop="runtime"
          width="220"
          label="设备运行时间">
        </el-table-column>
      </el-table>
    </div>
    <div class="version-status">
      <div class="version-cell">
        <span class="version-label f14">系统版本号：</span>
        <el-input v-model="systemInfo.sysversion"></el-input>
      </div>
      <div class="version-cell">
        <span class="version-label f14">硬件版本号：</span>
        <el-input v-model="systemInfo.proversion"></el-input>
      </div>
      <div class="version-cell">
        <span class="version-label f14">软件版本号：</span>
        <el-input v-model="systemInfo.devversion"></el-input>
      </div>
      <div class="version-cell">
        <span class="version-label f14">算法版本号：</span>
        <el-input v-model="systemInfo.algversion"></el-input>
      </div>
      <div class="version-cell version-upload">
        <span class="version-label f14 fl">上传升级文件：</span>
        <el-upload
          :on-preview="handlePreview"
          :on-progress="handleProgress"
          :on-remove="handleRemove"
          :file-list="fileList"
          class="upload-btn"
          action=""
          multiple>
          <el-input disabled>
            <template slot="append">浏览</template>
          </el-input>
        </el-upload>
      </div>
      <p class="save-box">
        <el-button type="primary" @click="dataUpdate">升级</el-button>
      </p>
    </div>
  </fill-content>
</template>

<script>
  export default {
    name: 'LevelUp',
    data () {
      return {
        systemInfo: {
          sysversion: '',
          algversion: '',
          datanum: '',
          devversion: '',
          proversion: '',
          runtime: '',
          space: '',
          status: ''
        },
        fileList: []
      }
    },
    mounted () {
      this._initSystemData()
    },
    methods: {
      async _initSystemData () {
        this.$refs.fillContent.loading()
        let res = await this.$api.getSystemParam().finally(() => {
          this.$refs.fillContent && this.$refs.fillContent.closeLoading()
        })
        this.systemInfo = res.data
      },
      handlePreview (file) {

      },
      handleRemove (file, fileList) {

      },
      handleProgress (event, file, fileList) {

      },
      async dataUpdate () {
        this.$refs.fillContent.loading()
        let res = await this.$api.systemLevelUpdate({
          system: '',
          hardware: '',
          software: '',
          algorithm: ''
        }).finally(() => {
          this.$refs.fillContent && this.$refs.fillContent.closeLoading()
        })
        this.$message.success(res.message || '升级成功')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .level-up-page {
    .system-status {
      padding: 0 108px 56px 108px;
      border-bottom: 1px solid #e7e8e9;
    }
    .version-status {
      padding-top: 52px;
      padding-left: 70px;
      .version-cell {
        display: inline-block;
        height: 40px;
        margin-bottom: 30px;
        .version-label {
          display: inline-block;
          width: 114px;
          margin-right: 20px;
          height: 40px;
          color: $fontGrayColor;
          text-align: center;
          line-height: 40px;
        }
        .el-input {
          width: 330px;
        }
      }
      .version-upload {
        display: block;
        margin-bottom: 98px;
        height: 40px;
      }
      .save-box {
        margin-left: 256px;
        .el-button {
          background: #2084d5;
        }
      }
    }
  }
</style>
<style lang="scss">
  .level-up-page {
    padding: 60px 32px 0 32px;
    .system-status {
      .cell {
        text-align: center;
      }
    }

    .upload-btn {
      .el-upload--text {
        .el-input-group--append {
          .el-input-group__append {
            font-size: 14px;
            color: #0080d1;
          }
        }
      }
    }

    .el-table__body-wrapper {
      .el-table__row {
        td {
          background: #f6f6f6;
        }
      }
    }
  }
</style>
