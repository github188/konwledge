<template>
  <fill-content ref="fillContent" :title="$t('menu.sysSetting.levelUp')" class-name="level-up-page">
    <div class="system-status">
      <el-table
        :data="[systemInfo]"
        border
        style="width: 100%">
        <el-table-column
          :label="$t('levelUp.status')"
          prop="status"
          width="220">
        </el-table-column>
        <el-table-column
          prop="datanum"
          :label="$t('levelUp.datanum')"
        >
        </el-table-column>
        <el-table-column
          :label="$t('levelUp.space')"
          prop="space"
          width="220">
        </el-table-column>
        <el-table-column
          :label="$t('levelUp.runtime')"
          prop="runtime"
          width="220">
        </el-table-column>
      </el-table>
    </div>
    <div :class="$i18n.locale" class="version-status">
      <div class="version-cell">
        <span class="version-label f14">{{ $t('levelUp.proversion') }}：</span>
        <el-input v-model="systemInfo.proversion" disabled></el-input>
      </div>
      <div class="version-cell">
        <span class="version-label f14">{{ $t('levelUp.devversion') }}：</span>
        <el-input v-model="systemInfo.devversion" disabled></el-input>
      </div>
      <div class="version-cell">
        <span class="version-label f14">{{ $t('levelUp.algversion') }}：</span>
        <el-input v-model="systemInfo.algversion" disabled></el-input>
      </div>
      <div class="version-cell">
        <span class="version-label f14">{{ $t('levelUp.devguid') }}：</span>
        <el-input v-model="systemInfo.devguid" disabled></el-input>
      </div>
      <div class="version-cell version-upload">
        <span class="version-label f14 fl">{{ $t('levelUp.uploadFile') }}：</span>
        <el-upload
          ref="upload"
          :on-preview="handlePreview"
          :on-progress="handleProgress"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :auto-upload="false"
          :action="doupload"
          class="upload-btn"
          multiple>
          <el-input disabled>
            <template slot="append">{{ $t('levelUp.lib') }}</template>
          </el-input>
        </el-upload>
      </div>
      <p class="save-box">
        <el-button type="primary" @click="dataUpdate">{{ $t('levelUp.up') }}</el-button>
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
          algversion: '',
          datanum: '',
          devversion: '',
          proversion: '',
          runtime: '',
          space: '',
          status: '',
          devguid: ''
        },
        doupload: '/upload',
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
        alert(file)
      },
      handleRemove (file, fileList) {

      },
      handleProgress (event, file, fileList) {

      },
      handleSuccess (res, file, fileList) {
        console.log(res)
        this.$refs.fillContent && this.$refs.fillContent.closeLoading()
        this.$message.success(res.message)
      },
      async dataUpdate () {
        this.$refs.fillContent.loading()
        /* let res = await this.$api.systemLevelUpdate({
          system: '',
          hardware: '',
          software: '',
          algorithm: ''
        }).finally(() => {
          this.$refs.fillContent && this.$refs.fillContent.closeLoading()
        }) */
        this.$refs.upload.submit()
      }
    }
  }
</script>

<style lang="scss" scoped>
.level-up-page{
  .system-status{
    padding:0 108px 56px 108px;
    border-bottom: 1px solid #e7e8e9;
  }
  .version-status{
    padding-top:52px;
    padding-left: 70px;
    .version-cell{
      display: inline-block;
      height:40px;
      margin-bottom: 30px;
      .version-label{
        display: inline-block;
        width:114px;
        margin-right: 20px;
        height: 40px;
        color:$fontGrayColor;
        text-align:center;
        line-height: 40px;
      }
      .el-input{
        width:330px;
      }
    }
    .version-upload{
      display: block;
      margin-bottom: 98px;
      height:40px;
    }
    .save-box{
      margin-left:256px;
      .el-button{
        background: #2084d5;
      }
    }
  }
  .version-status{
    .version-cell{
      .version-label{
        width:124px;
      }
    }
  }
}
</style>
<style lang="scss">
  .level-up-page{
    padding: 60px 32px 0 32px;
    .system-status{
      .cell{
        text-align: center;
      }
    }

    .upload-btn{
      .el-upload--text{
        .el-input-group--append{
          .el-input-group__append{
            font-size:14px;
            color:#0080d1;
          }
        }
      }
    }

    .el-table__body-wrapper{
      .el-table__row{
        td{
          background: #f6f6f6;
        }
      }
    }
  }
</style>
