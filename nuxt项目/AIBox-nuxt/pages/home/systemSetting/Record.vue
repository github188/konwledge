<template>
  <fill-content title="系统日志" class-name="record-page" close-bg>
    <div class="control-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="设备选择">
          <el-select v-model="form.region" placeholder="请选择设备">
            <el-option label="设备一" value="shanghai"></el-option>
            <el-option label="设备二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span class="date-label fl">日期：</span>
      <el-date-picker
        v-model="dateTimeRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <div class="save-box fl">
        <el-button @click="searchTableData">搜索</el-button>
      </div>
      <i class="iconfont icon-daochu fr"></i>
    </div>

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
        width="55">
      </el-table-column>
      <el-table-column
        prop="number"
        label="序号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        sortable
        width="200">
      </el-table-column>
      <el-table-column
        prop="event"
        label="事件"
        width="250"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="user"
        label="用户"
        show-overflow-tooltip>
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
  </fill-content>
</template>

<script>
  export default {
    name: 'Record',
    data () {
      return {
        loading: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dateTimeRange: '',
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    },
    created () {
      this._initRecordData()
    },
    methods: {
      async _initRecordData (props = {}) {
        this.loading = true
        let res = await this.$api.recordDataSearch({
          page: this.currentPage,
          row: this.pageSize,
          ...props
        }).finally(() => {
          this.loading = false
        })
        this.tableData = res.data
        this.total = res.total
      },
      async _initEquipmentList () {

      },
      async searchTableData () {
        await this._initRecordData({
          region: this.form.region,
          startTime: this.dateTimeRange.length === 0 ? null : this.dateTimeRange[0].getTime(),
          endTime: this.dateTimeRange.length === 0 ? null : this.dateTimeRange[1].getTime()
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleCurrentChange (val) {
        this._initRecordData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color: #bbbbbb;
  .record-page {
    .control-box {
      margin-bottom: 20px;
      .date-label {
        height: 40px;
        line-height: 40px;
        color: $color;
      }

      .iconfont {
        width: 34px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 14px;
        background: #fff;
        border: 1px solid #ced0da;
        &:hover {
          cursor: pointer;
          color: #2084d5;
        }
      }
    }
  }

</style>
<style lang="scss">
  $color: #bbbbbb;
  .record-page {
    padding-right: 26px;
    .control-box {
      overflow: hidden;
      form {
        width: 334px;
        float: left;
        .el-form-item__label {
          color: $color;
        }
      }
      .el-date-editor {
        float: left;
        margin-right: 40px;
        .el-range-separator {
          color: $color;
        }
      }
    }
    .el-table {
      th {
        padding: 7.5px 0;
      }
      td {
        .cell {
          height: 28px;
          line-height: 28px;
        }
      }
    }
  }

</style>
