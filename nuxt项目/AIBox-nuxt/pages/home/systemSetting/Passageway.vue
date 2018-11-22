<template>
  <fill-content :title="$t('menu.passageway.passageway')" class-name="passageway-page" close-bg>
    <!-- <p class="tips">*提示：只允许配置1、2、4、6、8路视频</p> -->
    <p class="control-box">
      <!--<i class="el-icon-plus" @click="addTableData"></i>-->
      <!--<i class="el-icon-delete" @click="handleBatchDelete"></i>-->
      <span class="icon-box">
         <i ref="rote" class="el-icon-refresh animate-rote" @click="handleDataRefresh"></i>
      </span>
    </p>
    <el-table
      v-loading="loading"
      :data="tableData"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
      height="600"
      tooltip-effect="dark"
      style="width:1400px;"
      @selection-change="handleSelectionChange">
      <!--<el-table-column-->
      <!--prop="checked"-->
      <!--type="selection"-->
      <!--width="55">-->
      <!--</el-table-column>-->
      <el-table-column
        :label="$t('passageway.id')"
        fixed
        prop="id"
        type="index"
        width="80">
      </el-table-column>
      <el-table-column
        :label="$t('passageway.chnname')"
        prop="chnname"
        width="120">
      </el-table-column>
      <el-table-column
        :label="$t('passageway.chnip')"
        prop="chnip"
        width="130"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        :label="$t('passageway.chnport')"
        prop="chnport"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        :label="$t('passageway.netstatus')"
        prop="netstatus"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-show="scope.row.id !== null" :style="{background: scope.row.netstatus === '1' ? '#1bb934':'#9a9a9a'}"
                class="table-status f12">
            {{ scope.row.netstatus ==1 ? $t('passageway.online') : $t('passageway.offline') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('passageway.chnstatus')"
        prop="chnstatus"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-show="scope.row.id !== null" :style="{background: scope.row.chnstatus === '1' ? '#1c9ed0':'#da922c'}"
                class="table-status f12">
            {{ scope.row.chnstatus ==1 ? $t('passageway.normal') : $t('passageway.unusual') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('passageway.proto')"
        prop="proto"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        :label="$t('passageway.rtspurl')"
        prop="rtspurl"
        width="380"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        :label="$t('passageway.control')"
        width="100"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">{{ $t('passageway.editor') }}
          </el-button>
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="handleDelete(scope.$index, scope.row)">删除-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!--<div class="pagination-box">-->
    <!--<el-pagination-->
    <!--:current-page.sync="currentPage"-->
    <!--:page-size="pageSize"-->
    <!--:total="total"-->
    <!--layout="prev, pager, next, total"-->
    <!--@current-change="handleCurrentChange">-->
    <!--</el-pagination>-->
    <!--</div>-->

    <v-dialog ref="dialog" :title="dialogTitle" :confirm-text="$t('passageway.dialogConfirm')" :cancel-text="$t('dialog.cancel')" d-type="confirm" width="600px" @cancel="formCancel"
              @confirm="formConfirm">
      <div class="dialog-form-reset">
        <el-form ref="form" :model="form" label-width="">
          <el-form-item :class="`${form.proto}-before`" :label="$t('passageway.dProto')">
            <el-select v-model="form.proto" :placeholder="$t('passageway.dSelectHolder')" @change="protoChange">
              <!--<el-option label="ONVIF" value="ONVIF"></el-option>-->
              <el-option label="RTSP" value="RTSP"></el-option>
            </el-select>
          </el-form-item>
          <div v-show="form.proto==='RTSP'" class="urlenable-box">
            <el-checkbox v-model="form.urlenable">{{ $t('passageway.rtspurl') }}</el-checkbox>
          </div>
          <el-form-item :label="`${$t('passageway.chnname')}：`" :class="$i18n.locale">
            <el-input v-model="form.chnname" :placeholder="$t('passageway.chnnameHolder')"></el-input>
          </el-form-item>
          <panel :flag="form.urlenable">
            <el-form-item v-show="form.urlenable" :label="`${$t('passageway.rtspurl')}：`" class="rtspurl" :class="$i18n.locale">
              <el-input v-model="form.rtspurl" :placeholder="$t('passageway.dRtspHolder')"></el-input>
            </el-form-item>
          </panel>
          <panel :flag="!form.urlenable" init-height="124">
            <el-form-item :label="`${$t('passageway.chnip')}：`">
              <el-input v-model="form.chnip" :placeholder="$t('passageway.dIpHolder')"></el-input>
            </el-form-item>
            <el-form-item :label="`${ $t('passageway.dPort') }：`">
              <el-input v-model="form.chnport" :placeholder="$t('passageway.dPortHolder')"></el-input>
            </el-form-item>
          </panel>
          <el-form-item v-show="form.proto==='ONVIF'" :label="`${ $t('passageway.bitstream') }：`">
            <el-select v-model="form.bitstream" :placeholder="$t('passageway.bitstreamHolder')">
              <el-option :label="$t('passageway.maliu1')" value="maliu1"></el-option>
              <el-option :label="$t('passageway.maliu2')" value="maliu2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${ $t('passageway.username') }：`">
            <el-input v-model="form.chnuser" :placeholder="$t('passageway.usernameHolder')"></el-input>
          </el-form-item>
          <el-form-item :label="`${ $t('passageway.password') }：`">
            <el-input v-model="form.chnpassword" :placeholder="$t('passageway.passwordHolder')"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </v-dialog>
  </fill-content>
</template>

<script>
  import Panel from '@/components/common/panel/Panel.vue'

  const form = {
    proto: 'RTSP',
    urlenable: false,
    rtspurl: '',
    chnname: '',
    chnip: '',
    chnport: '',
    bitstream: '',
    chnuser: '',
    chnpassword: ''
  }

  export default {
    name: 'Passageway',
    components: {
      Panel
    },
    data () {
      return {
        rotateCount: 0,
        loading: false,
        tableData: [],
        multipleSelection: [],
        dialogTitle: this.$t('passageway.addChn'),
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
    watch: {
      'form.urlenable': function (newVal) {
        if (newVal) {
          this.form.chnip = ''
          this.form.chnport = ''
        } else {
          this.form.rtspurl = ''
        }
      }
    },
    created () {
      this._initPassData()
    },
    methods: {
      async _initPassData (page = this.currentPage, row = this.pageSize) {
        this.loading = true
        let res = await this.$api.getChnParam({page: page, row: row}).finally(() => {
          this.loading = false
        })
        let list = []
        for (let i = 0; i < 8; i++) {
          let findResult = res.data.some(item => {
            if (item.id * 1 === i) {
              list.push(item)
            }
            return item.id * 1 === i
          })
          if (!findResult) {
            list.push({
              id: i,
              proto: '',
              urlenable: '0',
              chnname: '',
              chnip: '',
              chnport: '',
              rtspurl: '',
              bitstream: '',
              chnuser: '',
              chnpassword: ''
            })
          }
        }
        this.tableData = list.map((val, idx) => {
          val.urlenable = Boolean(val.urlenable * 1)
          return val
        }).sort((a, b) => {
          return a.id - b.id
        })
        console.log(this.tableData, 'tableData')
        // this.total = res.total
      },
      addTableData () {
        this.dialogTitle = this.$t('passageway.addChn')
        this.form = this.$copy(form)
        this.dialogConfirmType = 'addChnParam'
        this.$refs.dialog.open()
      },
      async handleBatchDelete () {
        if (this.multipleSelection.length === 0) {
          this.$message.warning(this.$t('passageway.chooseChn'))
          return
        }

        let idList = this.multipleSelection.map((val, idx) => {
          return val.id
        })
        let nameList = this.multipleSelection.map((val, idx) => {
          return val.chnname
        })
        await this.$confirm(`${this.$t('passageway.delConfirmBf') }"${nameList}"${this.$t('passageway.delConfirmAf')}?`, this.$t('confirm.title'), {
          confirmButtonText: this.$t('passageway.confirm'),
          cancelButtonText: this.$t('passageway.cancel'),
          type: 'warning'
        }).catch(res => {
        })

        this.loading = true
        let res = await this.$api.delChnParam({id: idList}).finally(() => {
          this.loading = false
        })
        this.$message.success(res.message)
        this._initPassData()
      },
      protoChange () {
        if (this.form.proto === 'RTSP') {
          this.form.bitstream = ''
        } else if (this.form.proto === 'ONVIF') {
          this.form.rtspurl = ''
        } else {
          console.log(this.form.proto, 'error')
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      paginationChange () {

      },
      handleDataRefresh (e) {
        this.rotateCount++
        e.target.style.transform = `rotate(${ this.rotateCount * -360}deg)`
        this._initPassData()
      },
      handleEdit (index, row) {
        this.dialogTitle = this.$t('passageway.editorChn')
        this.dialogConfirmType = 'updateChnParam'
        this.form = this.$copy(row)
        this.$refs.dialog.open()
        this.edit_index = index
      },
      async handleDelete (index, row) {
        this.$confirm(`${ this.$t('passageway.delConfirmBf') }"${row.chnname}"${ this.$t('passageway.delConfirmAf') }?`, this.$t('confirm.title'), {
          confirmButtonText: this.$t('confirm.confirm'),
          cancelButtonText: this.$t('confirm.cancel'),
          type: 'warning'
        }).then(() => {
          this.delData(index)
        }).catch(res => {
        })
      },
      async delData (id) {
        this.loading = true
        let res = await this.$api.delChnParam({id: [id]}).finally(() => {
          this.loading = false
        })
        this.$message.success(res.message)
        this._initPassData()
      },
      handleCurrentChange (val) {
        this._initPassData()
      },
      async formConfirm (type = this.dialogConfirmType) {
        this.$refs.dialog.loading()

        let res = await this.$api[type]({
          id: this.edit_index + '',
          proto: this.form.proto,
          urlenable: this.form.urlenable ? '1' : '0',
          chnname: this.form.chnname,
          chnip: this.form.chnip,
          chnport: this.form.chnport,
          rtspurl: this.form.rtspurl,
          bitstream: this.form.bitstream,
          chnuser: this.form.chnuser,
          chnpassword: this.form.chnpassword
        }).finally(() => {
          this.$refs.dialog.closeLoading()
        })
        this.$message.success(res.message)
        this.$refs.dialog.close()
        this._initPassData()
      },
      formCancel () {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .passageway-page {
    .animate-rote {
      transition: all .5s ease;
    }
    .tips {
      font-size: 12px;
      color: red;
    }
    .RTSP-before {
      margin-bottom: 0 !important;
    }
    .urlenable-box {
      padding-left: 170px;
      padding-top: 10px;
      margin-bottom: 12px;
    }
    .control-box {
      height: 34px;
      line-height: 34px;
      margin-bottom: 22px;
      .icon-box{
        display: inline-block;
        vertical-align: middle;
        width: 34px;
        height: 34px;
        margin-right: 8px;
        background: #fff;
        text-align: center;
        line-height: 34px;
      }
      i {
        display: inline-block;
        vertical-align: middle;
        width: 34px;
        height: 34px;
        margin-right: 8px;
        background: #fff;
        text-align: center;
        line-height: 34px;
        font-size: 16px;
        border-radius: 50%;
        &:hover {
          cursor: pointer;
          color: #2e96d9;
        }
      }
    }
    .table-status {
      display: inline-block;
      width: 46px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #fff;
      border-radius: 4px;
      &:hover {
        cursor: pointer;
      }
    }
    .pagination-box {
      position: relative;
    }
  }
</style>
<style lang="scss">
  .passageway-page {
    .cell{
      word-break: keep-all;
    }
    .rtspurl {
      .el-form-item__label {
        width: 110px;
        margin-left: 60px;
      }
    }
    .dialog-wrapper {

    }
    .dialog-wrapper{
      .el-form-item.en{
        label.el-form-item__label{
            width: 130px;
            margin-left: 40px;
        }
      }
    }
  }
</style>
