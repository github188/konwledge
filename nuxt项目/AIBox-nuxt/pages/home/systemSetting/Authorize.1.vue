<template>
  <fill-content ref="fillContent" :title="$t('menu.sysSetting.authorize')" class-name="authorize-page">
    <p class="generate">
      <span class="f14 label fl">{{ $t('authorize.loadOutLabel') }}：</span>
      <!--<el-button v-show="!fileUrl" class="fl" @click="autoFill">生成</el-button>-->
      <el-input v-model="fileUrl" :disabled="true" class="fl">
        <template slot="append"><a :download="fileUrl" :href="fileUrl">{{ $t('authorize.loadOut') }}</a></template>
      </el-input>
    </p>
    <p class="upload-box">
      <span class="f14 label fl">{{ $t('authorize.uploadLabel') }}：</span>
      <el-upload
        ref="uploadAuth"
        :on-preview="handlePreview"
        :on-progress="handleProgress"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="fileList"
        :auto-upload="false"
        :action="uploadAuth"
        class="upload-btn"
        multiple>
        <el-input disabled>
          <template slot="append">{{ $t('authorize.lib') }}</template>
        </el-input>
      </el-upload>
    </p>
    <p class="save-box">
      <el-button type="primary" @click="dataUpdate">{{ $t('authorize.upload') }}</el-button>
    </p>
  </fill-content>
</template>

<script>
  export default {
    name: 'Authorize',
    data () {
      return {
        fileList: [],
        uploadAuth: '/upAuth',
        fileUrl: ''
      }
    },
    created () {
      this.autoFill()
    },
    methods: {
      handlePreview (file) {

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
      async autoFill () {
        let res = await this.$api.getDevInfoFile()
        this.fileUrl = res.data.url
        this.$message.success(res.message)
      },
      async dataUpdate () {
        this.$refs.fillContent.loading()
        /* let res = await this.$api.authorizeUpdate({
          fileUrl: this.fileUrl,
          updateUrl: this.fileList[0]
        }).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message || '设置成功') */
        this.$refs.uploadAuth.submit()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .authorize-page{
    .generate{
      margin-bottom: 38px;
      overflow: hidden;
      .label{
        margin-right: 10px;
        height:40px;
        line-height: 40px;
      }
      .el-button{
        width:100px;
      }
      .el-input{
        width: 300px;
        height: 36px;
      }
    }
    .upload-box{
      margin-bottom: 98px;
      overflow: hidden;
      height:80px;
      .label{
        display: inline-block;
        height:40px;
        line-height: 40px;
        margin-right:10px;
      }
    }
    .save-box{
      padding-left: 162px;
    }
  }
</style>
<style lang="scss">
  .authorize-page{
    padding:66px 0 0 128px;
    color:$fontGrayColor;
    font-size: 16px;
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
    .generate{
      .el-input{
        .el-input-group__append{
          &:hover{
            cursor: pointer;
          }
          a{
            color: #0080d1;
          }
        }
      }
    }
  }
</style>
