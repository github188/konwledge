<template>
  <div class="post-man">
    <el-input v-model="uploadUrl" placeholder="">
      <template slot="prepend">请输入上传地址</template>
    </el-input>
    <el-upload
      :action="uploadUrl"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      class="upload-demo"
      multiple>
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div>
      <el-input
        :rows="2"
        v-model="textarea"
        type="textarea"
        placeholder="请输入内容">
      </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fileList: [],
        uploadUrl: 'http://10.10.29.203:8080/',
        textarea: '上传成功后的返回值'
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess (response) {
        this.$message.success('上传成功')
        this.textarea = JSON.stringify(response)
      },
      handleError () {
        this.$message.error('上传失败')
      }

    }
  }
</script>

<style lang="scss" scoped>
  .post-man{
    width:500px;
    margin:100px auto;
    padding:20px;
    border:1px solid #000;
  }
</style>
