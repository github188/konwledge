<template>
    <el-row style="height:100%;">
        <el-col :span="4" class="left-part">
            <el-row class="sea-item">
                <el-select v-model="paramCol.libId" :multiple="true" placeholder="人脸库范围" clearable size="medium" style="width: 100%">
                    <el-option v-for="item in faceLibArr" :key="item.libId" :label="item.libName" :value="item.libId">
                    </el-option>
                </el-select>
            </el-row>
            <el-row class="sea-item">
                <el-input v-model="paramCol.name" placeholder="姓名"></el-input>
            </el-row>
            <el-row class="sea-item">
                <el-input v-model="paramCol.idNumber" placeholder="身份证"></el-input>
            </el-row>
            <!-- <el-row class="sea-item">
                <Sex :multiple="true" ref="sex" />
            </el-row>
            <el-row class="sea-item">
                <Age :multiple="true" ref="age" />
            </el-row>
            <el-row class="sea-item">
                <Hair :multiple="true" ref="hair" />
            </el-row>
            <el-row class="sea-item">
                <Glasses :multiple="true" ref="glasses" />
            </el-row> -->
            <el-row class="sea-item">
                <SelectCom :name="'maskCode'" :multiple="false" :info="maskInfo" :placeholder="'口罩'" @getCode="getCode" ref="mask" />
            </el-row>
            <el-row class="sea-item">
                <SelectCom :name="'hatCode'" :multiple="true" :info="hatInfo" :placeholder="'帽子'" @getCode="getCode" ref="hat" />
            </el-row>
            <el-row class="sea-item">
                <el-button @click="search" type="primary">检索</el-button>
                <el-button @click="reset" type="primary">重置</el-button>
            </el-row>
        </el-col>
        <el-col :span="20" class="right-part">
            <SearchResult :searchData="searchData" :totalNum="totalNum" @search="search" v-loading="loading" element-loading-text="正在查询..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" />
        </el-col>

    </el-row>

</template>
<script>
// import Sex from '../components/utils/sex';
// import Age from '../components/utils/age';
// import Hair from '../components/utils/hair';
// import Glasses from '../components/utils/glasses';
// import MaskC from '../components/utils/mask';
// import Hat from '../components/utils/hat';
import Tree from '../components/utils/tree';
import SelectCom from '@/components/utils/selectCom';
import SearchResult from '../components/utils/searchResult';

import { hatInfo, maskInfo } from '@/common/dataCustom.js';

const todayStart = new Date().getTime() - (new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000);

export default {
    components: {
        // Sex,
        // Age,
        // Hair,
        // Glasses,
        // MaskC,
        // Hat,
        Tree,
        SearchResult,
        SelectCom
    },
    data() {
        return {
            hatInfo,
            maskInfo,
            dateRange: [todayStart, todayStart * 1 + 86400000],
            timeRange: [todayStart, todayStart * 1 + 86400000],
            paramCol: {
                libId: [],
                name: '',
                idNumber: '',
                sortKey: 'createTime',
                sortType: 'desc',
                start: 0,
                rows: 10
            },
            faceLibArr: [],
            kindArr: [{ name: '全部', code: '' }, { name: '自行车', code: '2' }, { name: '摩托车', code: '3' }],
            helmetArr: [{ name: '全部', code: 0 }, { name: '有', code: 1 }, { name: '无', code: 2 }],
            searchData: [],
            totalNum: 0,
            loading: false
        };
    },
    mounted() {
        this.getFaceLib();
    },
    methods: {
        submit() {
            console.log(this.paramCol);
        },
        getCode(code, type) {
            this.paramCol[type] = code;
            if (!code) {
                delete this.paramCol[type];
            }
        },
        reset() {
            // this.$refs.sex.clear();
            // this.$refs.age.clear();
            // this.$refs.hair.clear();
            // this.$refs.glasses.clear();
            this.$refs.mask.clear();
            this.$refs.hat.clear();
            this.paramCol = {
                libId: '',
                name: '',
                idNumber: '',
                sortKey: 'createTime',
                sortType: 'desc',
                start: 0,
                rows: 10
            };
        },
        getFaceLib() {
            this._services.getFaceLib({ type: 'get', copy: 1 }).then(
                (res) => {
                    if (parseInt(res.code, 10) !== 0) {
                        this.tools.message(res.message, 'error');
                        return;
                    }
                    this.faceLibArr = res.data;
                }
            );
        },
        search(currentPage) {
            // this.loading = true;
            this.searchData = [];
            if (currentPage) {
                this.paramCol.pages = currentPage;
                this.paramCol.start = (currentPage - 1) * this.paramCol.rows;
            }
            if (this.paramCol.libId.length === 0) {
                let lib = [];

                this.faceLibArr.map(item => {
                    lib.push(item.libId);
                });
                this.paramCol.libId = lib;
            }
            this.searchData = [
                {
                    name: 'tom',
                    idNumber: '13886055527',
                    faceId: '../../assets/city_cars.jpg'
                },
                {
                    name: 'tom',
                    idNumber: '13886055527'
                },
                {
                    name: 'tom',
                    idNumber: '13886055527'
                },
                {
                    name: 'tom',
                    idNumber: '13886055527'
                },
                {
                    name: 'tom',
                    idNumber: '13886055527'
                },
                {
                    name: 'tom',
                    idNumber: '13886055527'
                },
                {
                    name: 'tom',
                    idNumber: '13886055527'
                },
                {
                    name: 'tom',
                    idNumber: '13886055527'
                }
            ];
            // this._services.searchFace(
            //     { ...this.paramCol, libId: this.paramCol.libId.toString() }
            // ).then((res) => {
            //     this.loading = false;
            //     if (parseInt(res.code, 10) !== 0) {
            //         this.tools.message(res.message, 'error');
            //         return;
            //     }
            //     if (res.data.length === 0) {
            //         this.tools.message('暂无数据', 'info');
            //         return;
            //     }
            //     this.pagenationShow = true;
            //     this.totalNum = res.totalNum;
            //     this.searchData = res.data;
            // });
        }
    }
};
</script>


<style lang="less">
.left-part,
.right-part {
  height: 100%;
}

.left-part {
  .sea-item {
    margin-bottom: 20px;
  }
}

.right-part {
  padding: 0 20px;
  height: 100%;

  .bottom-part {
    padding: 10px;
    text-align: left;
    line-height: 25px;
    font-size: 14px;
  }
}

.items {
  margin-bottom: 20px;
  .image-wrap {
    width: 100%;
    height: 150px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

