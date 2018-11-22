<template>
  <fill-content v-loading="loading" ref="dataUpload" :title="$t('menu.sysSetting.dataUpload')"
                class-name="data-upload"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.5)">
    <div class="data-upload-page">
      <div class="upload-box">
        <div class="video-used-box">
          {{ $t('dataUpload.used') }} <span class="size">{{ videouse }}</span>，{{ $t('dataUpload.available') }} <span class="size">{{ available }}</span>
        </div>
        <el-upload
          :on-preview="handlePreview"
          :file-list="fileList"
          :on-success="handleVideoUploadSuccess"
          class="upload-demo"
          action="/videoupload"
          accept="video/*"
          multiple>
          <el-button size="small" type="primary">{{ $t('dataUpload.uploadTxt') }}</el-button>
          <!--<div slot="tip" class="el-upload__tip">只能上传video文件</div>-->
        </el-upload>
      </div>
      <el-table
        :data="fileList"
        class="file-table"
        :empty-text="$t('element.emptyText')"
        style="width: 1400px">
        <el-table-column
          :label="$t('dataUpload.name')"
          prop="name"
          width="180">
        </el-table-column>
        <el-table-column
          :label="$t('dataUpload.size')"
          prop="size"
          width="80">
        </el-table-column>
        <el-table-column
          :label="$t('dataUpload.url')"
          prop="url"
        >
        </el-table-column>
        <el-table-column
          :label="$t('dataUpload.control')"
          width="150">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="tabRemove(scope.row, scope.$index)">{{ $t('dataUpload.del') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </fill-content>
</template>

<script>
  export default {
    name: 'DataUpload',
    data () {
      return {
        loading: false,
        fileList: [],
        videouse: '',
        available: ''
      }
    },
    created () {
      this._getVideoList()
    },
    methods: {
      async _getVideoList () {
        this.loading = true
        let res = await this.$api.getVideoList().finally(() => { this.loading = false })
        this.fileList = res.data.videolist
        this.videouse = res.data.videouse
        this.available = res.data.available
      },
      async handleRemove (row) {
        // console.log(file, fileList)
        this.loading = true
        let res = await this.$api.delVideo({id: row.id, videoname: row.name}).finally(() => { this.loading = false })
        this.$message.success(res.message)
        this._getVideoList()
      },
      tabRemove (row, index) {
        this.$confirm(this.$t('dataUpload.confirmTips'), this.$t('confirm.title'), {
          confirmButtonText: this.$t('confirm.confirm'),
          cancelButtonText: this.$t('confirm.cancel'),
          type: 'warning'
        }).then(() => {
          this.handleRemove(row)
        }).catch(() => {})
      },
      handlePreview (file) {
        console.log(file)
      },
      handleVideoUploadSuccess (res, file) {
        this._getVideoList()
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`${this.$t('confirm.delConTips')} ${ file.name }？`)
      }
    }
  }
</script>

<style lang="scss" scoped>
.data-upload-page{
  padding: 50px 100px;
  .file-table{
    margin-bottom: 100px;
  }
  .upload-box{
    padding-bottom:50px;
    overflow: hidden;
    font-size:14px;
    color:#a8a8a8;
    .size{
      color:#3987d9;
      font-size:18px;
    }
    .video-used-box{
      display: inline-block;
      vertical-align: middle;
    }
    .upload-demo{
      display: inline-block;
      vertical-align: middle;
      float:right;
      margin-right:40px;
    }
  }
}
</style>
