<template>
  <fill-content title="通道设置" class-name="passageway-page" close-bg>
    <p class="control-box">
      <i class="el-icon-plus" @click="addTableData"></i>
      <i class="el-icon-delete" @click="handleBatchDelete"></i>
    </p>
    <el-table
      v-loading="loading"
      :data="tableData"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
      height="600"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="checked"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="通道号"
        width="120">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="chnname"
        label="设备名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="chnip"
        label="设备IP"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="chnport"
        label="设备端口"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="netstatus"
        label="网络状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span :style="{background: scope.row.netstatus === '1' ? '#1bb934':'#9a9a9a'}" class="table-status f12">
            {{ scope.row.online ===1 ? '在线' : '离线' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="chnstatus"
        label="设备状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span :style="{background: scope.row.chnstatus === '1' ? '#1c9ed0':'#da922c'}" class="table-status f12">
            {{ scope.row.status ===1 ? '正常' : '异常' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="proto"
        label="协议类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-box">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <v-dialog ref="dialog" :title="dialogTitle" d-type="confirm" width="600px" confirm-text="保存" @cancel="formCancel" @confirm="formConfirm">
      <div class="dialog-form-reset">
        <el-form ref="form" :model="form" label-width="">
          <el-form-item label="协议：">
            <el-select v-model="form.proto" placeholder="请选择协议">
              <el-option label="ONVIF" value="ONVIF"></el-option>
              <el-option label="RTSP" value="RTSP"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称：">
            <el-input v-model="form.chnname" placeholder="请输入设备名称"></el-input>
          </el-form-item>
          <el-form-item label="设备IP：">
            <el-input v-model="form.chnip" placeholder="请输入设备IP"></el-input>
          </el-form-item>
          <el-form-item label="端口：">
            <el-input v-model="form.chnport" placeholder="请输入端口号"></el-input>
          </el-form-item>
          <el-form-item label="码流：">
            <el-select v-model="form.code" placeholder="请选择码流">
              <el-option label="码流一" value="maliu1"></el-option>
              <el-option label="码流二" value="maliu2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="form.chnuser" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="form.chnpassword" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </v-dialog>
  </fill-content>
</template>

<script>
  const form = {
    proto: '',
    chnname: '',
    chnip: '',
    chnport: '',
    code: '',
    chnuser: '',
    chnpassword: ''
  }

  export default {
    name: 'Passageway',
    data () {
      return {
        loading: false,
        tableData: [],
        multipleSelection: [],
        dialogTitle: '添加通道',
        currentPage: 1,
        pageSize: 10,
        form: this.$copy(form),
        total: 0,
        dialogConfirmType: 'addChnParam' // addChnParam, updateChnParam
      }
    },
    computed: {
      listInPage () {
        if (this.tableData.length <= this.pageSize) {
          return this.tableData
        } else {
          return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
      }
    },
    created () {
      this._initPassData()
    },
    methods: {
      async _initPassData (page = this.currentPage, row = this.pageSize) {
        this.loading = true
        let res = await this.$api.getChnParam({page: page, row: row}).finally(() => { this.loading = false })
        this.tableData = res.data
        this.total = res.total
      },
      addTableData () {
        this.dialogTitle = '添加通道'
        this.form = this.$copy(form)
        this.dialogConfirmType = 'addChnParam'
        this.$refs.dialog.open()
      },
      async handleBatchDelete () {
        if (this.multipleSelection.length === 0) {
          this.$message.warning('请选择通道')
          return
        }

        let idList = this.multipleSelection.map((val, idx) => {
          return val.channel
        })
        let nameList = this.multipleSelection.map((val, idx) => {
          return val.chnname
        })
        await this.$confirm(`是否删除设备${nameList}的相关配置?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(res => {})

        this.loading = true
        let res = await this.$api.delChnParam({id: idList}).finally(() => {
          this.loading = false
        })
        this.$message.success(res.message || '批量删除成功')
        this._initPassData()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      paginationChange () {

      },
      handleEdit (index, row) {
        this.dialogTitle = '修改通道'
        this.dialogConfirmType = 'updateChnParam'
        this.form = row
        this.$refs.dialog.open()
      },
      async handleDelete (index, row) {
        this.$confirm(`是否删除设备${row.chnname}的相关配置?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delData(row.channel)
        }).catch(res => {})
      },
      async delData (channel) {
        this.loading = true
        let res = await this.$api.delChnParam({channel: [channel]}).finally(() => {
          this.loading = false
        })
        this.$message.success(res.message || '删除成功')
        this._initPassData()
      },
      handleCurrentChange (val) {
        this._initPassData()
      },
      async formConfirm (type = this.dialogConfirmType) {
        this.$refs.dialog.loading()

        let res = await this.$api[type]({
          channel: this.form.channel,
          proto: this.form.proto,
          chnname: this.form.chnname,
          chnip: this.form.chnip,
          chnport: this.form.chnport,
          code: this.form.code,
          chnuser: this.form.chnuser,
          chnpassword: this.form.chnpassword
        }).finally(() => {
          this.$refs.dialog.closeLoading()
        })
        this.$message.success(res.message || '设置成功')
        this.$refs.dialog.close()
        this._initPassData()
      },
      formCancel () {

      }
    }
  }
</script>

<style lang="scss" scoped>
.passageway-page{
  .control-box{
    height: 34px;
    line-height: 34px;
    margin-bottom: 22px;
    i{
      display: inline-block;
      vertical-align: middle;
      width:34px;height:34px;
      margin-right: 8px;
      background: #fff;
      text-align: center;
      line-height: 34px;
      font-size: 16px;
      &:hover{
        cursor: pointer;
        color: #2e96d9;
      }
    }
  }
  .table-status{
    display: inline-block;
    width: 46px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color:#fff;
    border-radius: 4px;
    &:hover{
      cursor: pointer;
    }
  }
  .pagination-box{
    position: relative;
  }
}
</style>
<style lang="scss">
  .passageway-page{
    .dialog-wrapper{

    }
  }

</style>
