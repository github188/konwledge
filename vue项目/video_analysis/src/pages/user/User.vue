<template>
  <fill-content title="用户管理" class-name="user-page" close-bg>
    <p class="control-box">
      <i class="el-icon-plus" @click="addUser"></i>
      <i class="el-icon-delete" @click="handleBatchDelete"></i>
    </p>
    <el-table
      v-loading="loading"
      ref="multipleTable"
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
        width="130">
      </el-table-column>
      <el-table-column
        label="序号"
        width="150">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        width="220"
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
        :pager-count="5"
        :total="total"
        layout="prev, pager, next, total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <v-dialog ref="dialog" :title="dialogTitle" d-type="confirm" width="600px" confirm-text="保存" @cancel="formCancel" @confirm="formConfirm">
      <div class="dialog-form-reset">
        <el-form ref="form" :model="form" label-width="">
          <el-form-item label="用户名：">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：" class="u-password">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <p class="form-tips">
            <i class="iconfont icon-guanyuwomen"></i><span>提示：请使用至少四位密码</span>
          </p>
          <el-form-item label="确认密码：">
            <el-input v-model="form.RePassword" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-select v-model="form.role" placeholder="请选择角色">
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="角色二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <p v-show="resetPass" class="form-tips reset-pass-box">
            <el-button>重置密码</el-button>
            <i class="iconfont icon-guanyuwomen"></i><span>提示：密码重置为初始状态</span>
          </p>
        </el-form>
      </div>
    </v-dialog>
  </fill-content>
</template>

<script>
  const form = {
    username: '',
    password: '',
    RePassword: '',
    role: 'admin'
  }
  export default {
    name: 'User',
    data () {
      return {
        loading: false,
        tableData: [],
        dialogTitle: '添加用户',
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        form: {...form},
        resetPass: false,
        dialogConfirmType: '' // 点击确定按钮时调用的接口类型； 可选值必须为passageAdd, passageUpdate
      }
    },
    created () {
      this._initUserList()
    },
    methods: {
      async _initUserList () {
        this.loading = true
        let res = await this.$api.getUserParam({page: this.currentPage, row: this.pageSize}).finally(() => { this.loading = false })
        this.tableData = res.data
        this.total = res.total
      },
      addUser () {
        this.dialogTitle = '添加用户'
        this.form = this.$copy(form)
        this.dialogConfirmType = 'addUserParam'
        this.resetPass = false
        this.$refs.dialog.open()
      },
      async formConfirm (type = this.dialogConfirmType) {
        this.$refs.dialog.loading()
        let res = await this.$api[type]({
          username: this.form.username,
          password: this.form.password,
          role: this.form.role
        }).finally(() => {
          this.$refs.dialog.closeLoading()
        })
        this.$message.success(res.message || '设置成功')
        this.$refs.dialog.close()
        this._initUserList()
      },
      formCancel () {

      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleCurrentChange (val) {
        this._initUserList()
      },
      handleEdit (index, row) {
        this.dialogTitle = '修改用户'
        this.dialogConfirmType = 'updateUserParam'
        this.resetPass = true
        this.form = {
          username: row.username,
          password: '',
          RePassword: '',
          role: 'admin'
        }
        this.$refs.dialog.open()
      },
      async handleDelete (index, row) {
        if (this.total === 1) {
          this.$message.warning('仅剩一名用户，不可删除')
          return
        }
        this.$confirm(`是否删除设备${row.username}的相关配置?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUser([row.id])
        }).catch(e => {})
      },
      async deleteUser (idList) {
        this.loading = true
        let res = await this.$api.deleteUserParam({id: idList}).finally(() => {
          this.loading = false
        })
        this.$message.success(res.message || '删除成功')
        this._initUserList()
      },
      async handleBatchDelete () {
        if (this.multipleSelection.length === 0) {
          this.$message.warning('请选择用户')
          return
        }

        let idList = this.multipleSelection.map((val, idx) => {
          return val.id * 1
        })
        let nameList = this.multipleSelection.map((val, idx) => {
          return val.username
        })
        await this.$confirm(`是否删除设备${nameList}的相关配置?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUser(idList)
        }).catch(res => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
.user-page{
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
}
</style>
<style lang="scss">
  .user-page{
    .u-password{
      margin-bottom: 0;
    }
    .dialog-form-reset{
      margin-bottom:25px;
    }
    .form-tips{
      padding:10px 0 15px 0;
      text-align: center;
      font-size:16px;
      color:#b8b8b8;
      .i{
        margin-right: 8px;
      }

      .el-button{
        box-sizing: border-box;
        width:100px;
        height:34px;
        margin-left: 100px;
        margin-right: 20px;
        line-height: 0;
      }
    }
    .reset-pass-box{
      margin-bottom:25px;
    }
  }
</style>
