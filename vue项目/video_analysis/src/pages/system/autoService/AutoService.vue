<template>
  <fill-content ref="fillContent" title="自动维护" class-name="auto-service-page">
    <div class="service-box">
      <el-checkbox v-model="auto">自动重启系统：</el-checkbox>
      <el-form ref="form" :model="form" label-width="10px">
        <el-form-item label="">
          <el-select v-model="form.choose1" placeholder="">
            <el-option v-for="(val) in form.list1" :label="val.label"
                       :value="val.value" :key="val.value"
            ></el-option>
          </el-select>
          <el-select v-model="form.choose2" placeholder="">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <p class="save-box">
      <el-button type="primary" @click="dataUpdate">保存</el-button>
    </p>
  </fill-content>
</template>

<script>
  export default {
    name: 'AutoService',
    data () {
      return {
        auto: '',
        form: {
          choose1: '',
          list1: [],
          choose2: '',
          list2: []
        }
      }
    },
    mounted () {
      this.$refs.fillContent.loading()
      this._initData().finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
    },
    methods: {
      async _initData () {
        let res = await this.$api.getAutoReboot()
        this.form.list1 = res.data
      },
      async dataUpdate () {
        this.$refs.fillContent.loading()
        let res = await this.$api.autoServiceSet({
          choose1: this.form.list1,
          choose2: this.form.list2
        }).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.$message.success(res.message || '自动维护设置成功')
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
