<template>
  <div class="pretrial-test">
    <div class="pretrial-top">
      <div class="pretrial-to-content">
        <file-upload url="test/task/upload" @uploadSuccess="showDialog"></file-upload>
        <!-- <i class="icon-delete el-icon-delete fr pointer" @click="deleteBatch"></i> -->
      </div>
    </div>

    <div class="pretrial-content">
      <el-table class="element-reset-table" stripe :data="tableData" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.5)" height="608" style="width: 1200px;border: 1px solid #e6eaee;border-radius: 3px;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" width="90">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="文件名称" width="140">
        </el-table-column>
        <el-table-column prop="createTime" width="176" label="上传时间">
        </el-table-column>
        <el-table-column prop="illegalCount" width="140" label="违法量">
        </el-table-column>
        <el-table-column prop="taskStatus" width="140" label="分析状态">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="tabResult(1, scope.row.taskId)">预审结果</el-button>
            <el-button v-if="scope.row.status != 990" size="mini" @click="tabResult(2, scope.row.taskId)">重新分析</el-button>
            <el-button  v-if="scope.row.status != 990" size="mini" @click="tabResult(3, scope.row)">&nbsp;&nbsp;&nbsp;&nbsp;查看&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button size="mini" type="danger" @click="tabDelete(scope.$index, scope.row)">&nbsp;&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;&nbsp;</el-button>

            <!--<router-link tag="span" :to="{path: 'dataImport',query: {id: scope.row.id, type: 'check'}}" class="search control">查看</router-link>-->
            <!--<span class="result control">预审结果</span>-->
            <!--<router-link tag="span" :to="{path: 'dataImport',query: {id: scope.row.id, type: 'recheck'}}"-->
            <!--class="analysis control">重新分析-->
            <!--</router-link>-->
            <!--<span class="delete control" @click="handleDelete(scope.$index, scope.row)">删除</span>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :pager-count="5" :total="total" layout="prev, pager, next, total, jumper" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="违法信息查看" center width='700px' :visible.sync="detailVisible">
      <div class="detail-body">
        <div class="line"></div>
        <el-steps class="steps" :active="active">
          <el-step v-bind:title="item.title" v-for="item in stepsList" :key="item.code"></el-step>
        </el-steps>
        <template v-if="active==1">
          <div class="step-info">
            <i class="el-icon-info"></i>厂商不存在，请核对厂商编码是否正确。请在"后台管理"-"违法行为配置"中维护厂商信息</div>
        </template>
        <template v-if="active==2">
          <div class="step-info">
            <i class="el-icon-info"></i>导入的违法编码异常</div>
          <div class="illegal-bar">
            <el-row>
              <el-col class="illegal-title" :span="6">厂商违法编码</el-col>
              <el-col class="illegal-title" :span="6">违法名称</el-col>
              <el-col class="illegal-title" :span="6">深瞐违法编码</el-col>
              <el-col class="illegal-title" :span="6">操作</el-col>
            </el-row>
            <el-row>
              <el-col class="illegal-content" :span="6">234</el-col>
              <el-col class="illegal-content" :span="6">闯红灯</el-col>
              <el-col class="illegal-content" :span="6">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    下拉菜单
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <el-col class="illegal-content" :span="6">
                <i class="el-icon-delete" style="font-size: 24px;"></i>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-if="active==3">
          <div class="step-info">
            <i class="el-icon-info"></i>导入的号牌颜色编码异常</div>
          <div class="illegal-bar">
            <el-row>
              <el-col class="illegal-title" :span="6">厂商违法编码</el-col>
              <el-col class="illegal-title" :span="6">违法名称</el-col>
              <el-col class="illegal-title" :span="6">深瞐号牌颜色编码</el-col>
              <el-col class="illegal-title" :span="6">操作</el-col>
            </el-row>
            <el-row>
              <el-col class="illegal-content" :span="6">234</el-col>
              <el-col class="illegal-content" :span="6">闯红灯</el-col>
              <el-col class="illegal-content" :span="6">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    下拉菜单
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <el-col class="illegal-content" :span="6">
                <i class="el-icon-delete" style="font-size: 24px;"></i>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-if="active==4">
          <div class="step-info">
            <i class="el-icon-info"></i>导入的过车方向编码异常</div>
          <div class="illegal-bar">
            <el-row>
              <el-col class="illegal-title" :span="6">方向编码</el-col>
              <el-col class="illegal-title" :span="6">过车方向</el-col>
              <el-col class="illegal-title" :span="6">深瞐过车方向编码</el-col>
              <el-col class="illegal-title" :span="6">操作</el-col>
            </el-row>
            <el-row>
              <el-col class="illegal-content" :span="6">234</el-col>
              <el-col class="illegal-content" :span="6">闯红灯</el-col>
              <el-col class="illegal-content" :span="6">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    下拉菜单
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <el-col class="illegal-content" :span="6">
                <i class="el-icon-delete" style="font-size: 24px;"></i>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-if="active==5">
          <div class="step-info">
            <i class="el-icon-info"></i>发现89条违法数据车道号信息为空</div>
        </template>
        <template v-if="active==6">
          <div class="step-info">
            <p>
              <i class="el-icon-info"></i>文件违法数据共1000条</p>
            <p>成功导入900条</p>
          </div>
        </template>
        <el-row class="illegal-btn">
          <el-button class="progress-confirm" @click="tabResult(3)" v-if="active==6">进入图片下载页面</el-button>
          <el-button class="progress-confirm" @click="cancelStep" v-if="active!=6">取消导入</el-button>
          <el-button class="progress-confirm" @click="nextStep" v-if="active!=1&&active!=5&&active!=6">下一步</el-button>
          <span @click="tabResult(4)" v-if="active==1">违法行为配置</span>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FileUpload from "../components/common/fileupload/fileUpload.vue";

export default {
  name: "pretrialTest",
  components: {
    FileUpload
  },
  data() {
    return {
      input4: "",
      tableData: [],
      loading: false,
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      detailVisible: false,
      active: 1,
      stepsList: [
        {
          code: 0,
          title: "厂商校验"
        },
        {
          code: 1,
          title: "厂家违法编码"
        },
        {
          code: 2,
          title: "号牌颜色"
        },
        {
          code: 3,
          title: "过车方向"
        },
        {
          code: 4,
          title: "车道号"
        },
        {
          code: 5,
          title: "完成"
        }
      ]
    };
  },
  mounted() {
    this._initTableData();
  },
  methods: {
    _initTableData() {
      this.loading = true;
      this._services.getMenu().then(res => {
        res = {
          errorCode: 0,
          message: "success",
          data: [
            {
              taskId: 1,
              taskName: "预审测试001",
              createTime: "1490334941000",
              updateTime: "1490334941000",
              illegalCount: 100,
              userId: 1,
              taskStatus: 0,
              msg: "消息"
            }
          ]
        };
        this.tableData = res.data;
        this.loading = false;
        this.total = res.data.length;
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    tabResult(idx, taskId) {
      let path = "";
      let id = 0;
      switch (idx) {
        case 1:
          path = "/main/preTestResult";
          id = taskId;
          break;
        case 2:
          path = "/main/dataLabel";
          id = taskId;
          break;
        case 3:
          path = "/main/dataImport";
          id = taskId;
          break;
        case 4:
          path = "/managePlatform/iaconfig";
          break;
        default:
          break;
      }
      this.$router.push({
        path: path,
        query: { id: id }
      });
    },
    tabDelete(index, row) {
      this.$confirm(`是否删除任务${row.fileName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteTable(row.id);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async deleteTable(id) {
      this.loading = true;
      // let res = new Promise((resolve, reject) => {
      //   await this._services.getMenu({ id: id }).then(res => {
      //     resolve();
      //     this.loading = false;
      //   });
      // });
      console.log(res);
      //let res = {};

      setTimeout(() => {
        this.loading = false;
        this.$message.success(res.message || "删除成功");
        this._initTableData();
      }, 1000);
    },
    handleCurrentChange() {},
    deleteBatch() {
      console.log(this.multipleSelection);
    },
    showDialog() {
      var _this = this;
      this.active = 0;
      this.detailVisible = true;

      const interval = setInterval(function() {
        if (this.active == 6) {
          clearInterval(interval);
        }
        _this.nextStep();
      }, 3000);
    },
    cancelStep() {
      this.detailVisible = false;
    },
    nextStep() {
      if (this.active == 6) {
        return;
      }
      this.active++;
    }
  }
};
</script>

<style lang="less" scoped>
.fr {
  float: right;
}
.pretrial-top {
  background: #fff;
  text-align: center;
  padding: 12px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .pretrial-to-content {
    display: inline-block;
    width: 1200px;
    text-align: left;
    .icon-delete {
      box-sizing: border-box;
      width: 32px;
      height: 32px;
      background: #5fb870;
      border: 1px solid #47ad5a;
      text-align: center;
      line-height: 30px;
      font-size: 17px;
      border-radius: 50%;
      color: #fff;
    }
  }
  .upload-reset {
    width: 300px;
  }
}

.pretrial-content {
  text-align: center;
  min-width: 1250px;
  .el-table {
    display: inline-block;
  }
}
</style>
<style lang="less">
.detail-body {
  .line {
    width: 90%;
    height: 2px;
    background: #f0f0f0;
    margin: 0 auto;
  }
  .steps {
    margin-top: 50px;
    margin-left: 5%;
    margin-bottom: 40px;
    width: 94%;
    // .el-step__icon.is-text {
    //   color: #c0c4cc;
    //   border-color: #c0c4cc;
    // }
    .el-step__title {
      position: static;
      color: #18a5d6;
      font-size: 14px;
      line-height: 38px;
      margin-left: -12%;
      margin-top: -60px;
    }
  }
  .step-info {
    text-align: center;
  }
  .illegal-bar {
    width: 71.3%;
    margin-left: 5%;
    margin-top: 20px;
    width: 90%;
    font-size: 14px;
    .illegal-title {
      height: 40px;
      line-height: 40px;
      background: #f6f6f6;
      text-align: center;
      color: #7f8fa4;
      border: 0;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .illegal-content {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .illegal-btn {
    text-align: center;
    margin-top: 30px;
    span {
      color: #18a5d6;
      margin-left: 20px;
    }
  }
}
.pretrial-test {
  .el-icon-loading {
    font-size: 30px;
  }
  .el-table th > .cell {
    text-align: center;
  }
  .control {
    padding: 0 6px;
    &:hover {
      cursor: pointer;
    }
  }
  // hover颜色修改，第一个td的border修改
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #e3f6fb !important;
    &:first-child {
      border-left: 4px solid #18a5d6;
      border-radius: 4px 0 0 4px;
    }
  }
  // 条纹颜色
  .el-table--striped tr.el-table__row--striped td {
    background: #f9f9f9;
  }
}
</style>
