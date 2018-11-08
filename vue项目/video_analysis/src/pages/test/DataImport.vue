<template>
  <fill-content ref="fillContent" title="数据导入" class-name="data-import-page">
    <div class="data-import">
      <div class="table-top">
        <el-input v-model="input4" placeholder="请输入内容" class="data-upload" disabled>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!--<button class="uploadBtn">上传</button>-->
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
          class="uploadBtn"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <el-button size="small" type="primary">上传</el-button>
        </el-upload>

        <span class="history-data" @click="searchHistory">历史记录</span>

        <div class="table-top-center">
          <span>下载总数：</span><span class="black">500</span>
          <span>下载成功：</span><span class="black">460</span>
          <span>下载失败：</span><span class="black">40</span>
        </div>

        <div class="table-top-right">
          <el-form ref="form" :model="form" label-width="8px">
            <el-form-item>
              <el-select v-model="form.region" placeholder="下载成功">
                <el-option label="下载成功" value="shanghai"></el-option>
                <el-option label="下载成功" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span class="icon-box iconfont icon-daochu"></span>
        </div>
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
          width="40">
        </el-table-column>
        <el-table-column
          label="序号"
          width="40">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="firm"
          label="厂商"
          width="50">
        </el-table-column>
        <el-table-column
          prop="deviceid"
          label="设备ID"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="waycode"
          label="路口编码"
          width="56"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="wayname"
          label="路口名称"
          width="140"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="license"
          label="车牌号"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="licensecolor"
          label="号牌颜色"
          width="65"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fobaction"
          label="违法行为"
          width="65"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fobcode"
          label="厂商违法代码"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="cardirection"
          label="过车方向"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="channelnum"
          label="车道号"
          width="45"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="url1"
          label="图片url1"
          width="110"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="url2"
          label="图片url1"
          width="110"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="url3"
          label="图片url1"
          width="110"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <i v-if="scope.row.status == '1'" class="el-icon-success"></i>
            <i v-else class="el-icon-error"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :pager-count="5"
          :total="total"
          layout="prev, pager, next, total, jumper"
          @current-change="handleCurrentChange">
        </el-pagination>
        <button class="btn-label">数据标注</button>
        <button class="btn-download">下载图片</button>
      </div>

      <v-dialog ref="dialog" d-type="box">
        <el-table
          v-loading="loading"
          :data="historyData"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.5)"
          height="600"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="序号"
            width="40">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="fileName"
            label="文件名"
            width="50">
          </el-table-column>
          <el-table-column
            prop="uploadTime"
            label="上传时间"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="downloadFlow"
            label="下载量"
            width="56"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="downloadSuccess"
            label="下载成功"
            width="140"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="downloadFail"
            label="下载失败"
            width="80"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="labeled"
            label="已标注"
            width="65"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="noLabeled"
            label="未标注"
            width="65"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="mainCount"
            label="正片量"
            width="80"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="othersCount"
            label="废片量"
            width="80"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="search-detail">查看详情</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-box">
          <el-pagination
            :current-page.sync="currentPage2"
            :page-size="pageSize2"
            :pager-count="5"
            :total="total"
            layout="prev, pager, next, total, jumper"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </v-dialog>
    </div>
  </fill-content>
</template>

<script>
  export default {
    name: 'DataImport',
    data () {
      return {
        input4: '',
        form: {
          region: ''
        },
        loading: false,
        tableData: [],
        historyData: [],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        currentPage2: 1,
        pageSize2: 10
      }
    },
    created () {
      this._initTableData()
    },
    methods: {
      async _initTableData () {
        let res = 1
        this.tableData = [
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '1'
          },
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '0'
          },
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '1'
          },
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '0'
          },
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '1'
          },
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '0'
          },
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '1'
          },
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '0'
          },
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '1'
          },
          {
            firm: '大华',
            deviceid: '12345611$1$0$1',
            waycode: 'Y123',
            wayname: '石鲁巷与东大街路西口',
            license: '鲁A12345',
            licensecolor: '蓝牌',
            fobaction: '闯红灯',
            fobcode: '12080',
            cardirection: '自东向西',
            channelnum: '1',
            url1: 'http//192.168...',
            url2: 'http//192.168...',
            url3: 'http//192.168...',
            status: '0'
          }
        ]
        this.historyData = [
          {
            fileName: '测试0912',
            uploadTime: '2018/9/12 19:20',
            downloadFlow: '500',
            downloadSuccess: '470',
            downloadFail: '30',
            labeled: '400',
            noLabeled: '70',
            mainCount: '0',
            othersCount: '0'
          }

        ]
        this.total = 34
        console.log(res)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleCurrentChange (val) {
        this._initTableData()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      searchHistory () {
        this.$refs.dialog.open()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $fontGrayC: #8c9aad;
  .black {
    color: #000;
  }
  .el-icon-success{
    color:#5fb870;
  }
  .el-icon-error{
    color:red;
  }

  .data-import {
    min-width: 880px;
    padding: 40px 0 0 50px;
    .table-top {
      overflow: hidden;
      .data-upload {
        width: 230px;
        .el-input-group__append {
          width: 36px;
        }
      }
      .uploadBtn {
        display: inline-block;
        width: 60px;
        height: 30px;
        margin-right: 20px;
        color: #fff;
        line-height: 30px;
        font-size: 14px;
        border-radius: 5px;
        .el-button{
          background: #18a5d6;
        }
      }
      .history-data {
        color: #18a5d6;
        font-size: 12px;
        &:hover{
          cursor: pointer;
        }
      }
      .table-top-center {
        display: inline-block;
        color: $fontGrayC;
        font-size: 12px;
      }
      .table-top-right {
        width: 200px;
        float: right;
        .el-form {
          display: inline-block;
          width: 110px;
          margin-right: 30px;
          vertical-align: middle;
        }
        .icon-box {
          display: inline-block;
          width: 32px;
          height: 32px;
          color: #fff;
          background: #5fb870;
          border-radius: 50%;
          line-height: 32px;
          text-align: center;
          vertical-align: middle;
        }
      }
    }
    .el-form{
      .el-form-item{
        margin-bottom: 0;
      }
    }
  }

  .pagination-box{
    overflow: hidden;
    height:50px;
    button{
      height:30px;width:80px;border:1px solid #61b4ca;
      font-size:12px;line-height:30px;text-align: center;
      float: right;margin-top:20px;
    }
    .btn-download{
      border-color:#61b4ca;
      background: #18a5d6;
      color:#fff;
      margin-right:35px;
    }
    .btn-label{
      border-color:#d8d9e2;
      color:#333333;
    }
  }
</style>
<style lang="scss">
  .data-import {
    box-sizing: border-box;
    padding: 40px 50px;
    .table-top {
      .data-upload {
        input {
          height:32px;
        }
        .el-input-group__append {

        }
      }
      .el-select{
        .el-input--suffix{
          line-height:32px;
          .el-input__inner{
            height:32px;
            font-size:12px;
          }
          .el-input__icon{
            line-height:32px;
          }
        }
      }
    }
    .search-detail{
      color:#18a5d6;
    }
    .dialog-wrapper{
      .el-table{
        padding: 0 20px;
      }
    }
    .dialog-wrapper .d-body .content{
      max-height:700px !important;
    }
    .el-form{
      .el-form-item__content{
        line-height:32px;
      }
    }
  }
</style>
