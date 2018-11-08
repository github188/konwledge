<template>
    <div class="device-wrapper big-loading"
         v-loading="loading"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(255, 255, 255, 0.5)">
        <div class="device-manage">
            <div class="device-left fl">
                <div class="device-top">
                    <div class="left-line oh">
                        <el-input placeholder="选择配置文件" v-model="configFile" class="upload-reset" disabled>
                            <template slot="append">
                                <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :before-upload="deviceBeforeUpload"
                                        :on-success="deviceUploadSuccess"
                                        :on-error="deviceUploadError"
                                        multiple
                                >
                                    <el-button size="small" type="primary" class="upload-btn">导入</el-button>
                                </el-upload>
                            </template>
                        </el-input>
                    </div>
                    <div class="left-line oh">
                        <el-input placeholder="待标注违法数据" v-model="signFile" class="upload-reset" disabled>
                            <template slot="append">
                                <el-upload
                                        class="upload-demo"
                                        :action="_services.signDeviceImportUrl"
                                        :before-upload="signBeforeUpload"
                                        :on-success="signUploadSuccess"
                                        :on-error="signUploadError"
                                        multiple
                                        :show-file-list="false"
                                >
                                    <el-button size="small" type="primary" class="upload-btn">导入</el-button>
                                </el-upload>
                            </template>
                        </el-input>
                    </div>
                </div>
                <div class="left-line oh project-list-box">
                    <p class="project-name">项目名称</p>
                    <span class="label-content fl">
                         <el-select v-model="currentProjectId" placeholder="请选择">
                            <el-option
                                    v-for="item in projectList"
                                    :key="item.id"
                                    :label="item.projectName"
                                    :value="item.id">
                            </el-option>
                          </el-select>
                        <span class="add pointer" @click="addProject">新增</span>
                    </span>
                </div>

                <div class="device-channel-wrapper">
                    <div class="adus-box">
                        <i class="el-icon-plus" @click="deviceAdd"></i>
                        <i class="el-icon-edit-outline" @click="deviceEditor"></i>
                        <i class="el-icon-delete" @click="deviceDelete"></i>
                        <!--<i class="el-icon-upload2"></i>-->
                        <el-upload
                                class="upload-demo"
                                :action="_services.systemDeviceImportUrl"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :show-file-list="false"
                        >
                            <i class="el-icon-upload2"></i>
                        </el-upload>
                    </div>

                    <div class="left-search">
                        <el-input placeholder="路口检索" v-model="input3" @focus="changInputStyle($event ,'focus')" @blur="changInputStyle($event, 'blur')">
                            <template slot="append">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </template>
                        </el-input>
                    </div>

                    <div class="tree-box">
                        <div class="tree-header">
                            <span></span>
                            <span class="count-title">配置数量</span>
                        </div>
                        <ScollBox max-height="300" scroll-y>
                            <el-tree :data="deviceTree"
                                     node-key="id"
                                     ref="tree"
                                     :props="defaultProps"
                                     :default-expanded-keys="expandTree"
                                     @node-click="handleNodeClick">
                                <div class="custom-tree-node" slot-scope="{ node, data }"
                                     :style="{background: data.id == currentPlant.id ? '#dcdfe6': null}">
                                    <span>{{ node.label }}</span>
                                    <span class="tree-count">{{data.count}}</span>
                                </div>
                            </el-tree>
                        </ScollBox>
                    </div>
                </div>
                <div class="sign-line">
                    <el-button type="primary" @click="signMsgExport">待标注违法信息导出</el-button>
                </div>
                <div class="bottom-line">
                    <el-button>标注文件导出</el-button>
                </div>
            </div>
            <div class="device-center fl">
                <div class="device-center-top">
                    <span>路口编码：{{currentPlantDetail.deviceCode}}</span>
                    <span>设备ID：{{currentPlantDetail.id}} </span>
                    <span>过车方向：{{currentPlantDetail.carDirectName}}</span>
                    <span>车道号：{{currentPlantDetail.carWayCode}}</span>
                </div>
                <div class="image-wrapper">
                    <!--这里的组件最好能够：传入一个img的url进去，这样就不需要v-for循环了。只需要在切换时改变传入的参数cutdownValue-->
                 <DataMark :drawImg="cutdownValue" ref="dataMark"></DataMark>
                </div>

                <!--功能配置-->
                <feature-config
                        :illegallist="illegallist"
                        :current-plant-detail="currentPlantDetail"
                        :setted-road-list="settedRoadList"
                ></feature-config>
            </div>
            <div class="device-right fl">
                <!--<div class="paginate-box">-->
                    <!--<span @click="prePage">上一条</span>-->
                <!--</div>-->
                <div class="small-image-box">
                    <div class="small-img"
                         v-for="(item) in cutdownFilterList"
                         :key="item.imageId"
                         :class="{choosed:cutdownValue=== item.imageId}"
                         @click="selectImg(item.imageId)"
                         :style="{background: `url(${item.imageId}) no-repeat center/cover`}">
                        <input type="radio" v-model="cutdownValue" :value="item.imageId"/>
                    </div>
                    <!--<div class="paginate-page-count">{{cutdownCurrentPage}}/{{allPage}}</div>-->
                </div>
                <!--<div class="paginate-box">-->
                    <!--<span @click="nextPage">下一条</span>-->
                <!--</div>-->
            </div>
        </div>

        <v-dialog ref="plantTending" title="设备维护" d-type="confirm" width="520px" @confirm="plantConfirm">
            <div class="plantTending-content">
                <el-form ref="form" :model="plant" label-width="140px" class="plantTending-form">
                    <el-form-item label="* 厂商">
                        <el-select v-model="plant.manufacturerCode" placeholder="请选择">
                            <el-option
                                    v-for="(item, idx) in factoryDictionary"
                                    :label="item.manufacturerName"
                                    :value="item.manufacturerCode"
                                    :key="item.manufacturerCode+idx"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="* 路口名称">
                        <el-input v-model="plant.roadName"></el-input>
                    </el-form-item>
                    <el-form-item label="* 违法采集设备编码">
                        <el-input v-model="plant.srcDeviceCode"></el-input>
                    </el-form-item>
                    <el-form-item label="* 车道号">
                        <el-select v-model="plant.carWayCodes" placeholder="支持多选" :multiple="plant.multiple">
                            <el-option
                                    v-for="item in carWayCodesList"
                                    :key="item.code"
                                    :label="item.code"
                                    :value="item.code"
                                    :disabled="item.disabled"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="* 过车方向">
                        <el-select v-model="plant.carDirect" placeholder="请选择">
                            <el-option
                                    v-for="item in carDirectList"
                                    :key="item.direct"
                                    :label="item.label"
                                    :value="item.direct"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="* 采集设备类型">
                        <el-select v-model="plant.deviceType" placeholder="1-采集设备编码代表路口及方向">
                            <el-option
                                    v-for="item in deviceTypeList"
                                    :key="item.type"
                                    :label="item.label"
                                    :value="item.type"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="设备ID">-->
                        <!--<el-input v-model="form.name"></el-input>-->
                    <!--</el-form-item>-->
                </el-form>
            </div>
        </v-dialog>

        <v-dialog ref="addProject" title="新建项目名称" d-type="confirm" @confirm="projectConfirm">
            <div class="add-content">
                <el-input placeholder="" v-model="input3">
                    <template slot="prepend">新建项目名称</template>
                </el-input>
            </div>
        </v-dialog>

        <v-dialog ref="signExport" title="待标注违法信息导出" d-type="confirm" @confirm="signExportConfirm" confirm-text="开始导出">
            <div class="sign-export-content">
                <div class="type-layout">
                    <span class="sign-label">违法数据类型：</span>
                    <el-radio v-model="signInfo.type" label="all" class="">全量</el-radio>
                    <el-radio v-model="signInfo.type" label="unsigned" class="">未标注</el-radio>
                </div>
                <div class="singe-layout">
                    <span class="sign-label singe-label">导出方式：</span>
                    <div class="singe-content">
                        <el-radio v-model="signInfo.radio" :label="true" class="label">单设备违法条目</el-radio>
                        <el-input  v-model="signInfo.input" class="single-input"></el-input>
                        <el-radio v-model="signInfo.radio" :label="false" class="label">违法日期</el-radio>
                        <el-date-picker
                                class="date-picker"
                                v-model="signInfo.date"
                                format="yyyy/MM/dd hh:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="use-readied">
                    <span class="sign-label">仅导出预审支持违法：</span>
                    <el-radio v-model="signInfo.prepare" :label="true" class="">是</el-radio>
                    <el-radio v-model="signInfo.prepare" :label="false" class="">否</el-radio>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
    import ScollBox from '../components/common/scrollbox/scrollBox';
    import DataMark from './dataMark';
    import FeatureConfig from '../components/deviceManage/FeatureConfig';

    const factoryDictionary = [
        {manufacturerCode: 'DH', manufacturerName: '大华'},
        {manufacturerCode: 'XH', manufacturerName: '小华'},
        {manufacturerCode: 'ZH', manufacturerName: '中华'},
        {manufacturerCode: 'GH', manufacturerName: '国华'}
    ];
    const carWayCodesList = [
        {code: 1, disabled: false},
        {code: 2, disabled: false},
        {code: 3, disabled: false},
        {code: 4, disabled: false},
        {code: 5, disabled: false},
        {code: 6, disabled: false},
        {code: 7, disabled: false},
        {code: 8, disabled: false}
    ];
    const carDirectList = [
        {direct: 1, label: '前'},
        {direct: 2, label: '后'},
        {direct: 3, label: '左'},
        {direct: 4, label: '右'},
        {direct: 5, label: '前'},
        {direct: 6, label: '后'},
        {direct: 7, label: '左'},
        {direct: 8, label: '右'}
    ];
    const deviceTypeList = [
        {label: '类型一', type: 1},
        {label: '类型二', type: 2},
        {label: '类型三', type: 3},
        {label: '类型四', type: 4}
    ];

    export default {
        name: 'deviceManage',
        components: {
            ScollBox,
            DataMark,
            FeatureConfig
        },
        data() {
            return {
                loading: false,
                signFile: '',
                configFile: '',
                configureData: [
                    {type: '1.压线'},
                    {type: '2.逆行'},
                    {type: '3.闯红灯启用'}
                ],
                input4: '',
                input3: '',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                formType: 'add',
                cutdownValue: '',
                cutdownImg: [],
                cutdownCurrentPage: 1,
                cutdownPageSize: 5,
                signInfo: {
                    type: 'all', // 违法数据类型: 全量，未标注
                    radio: true,
                    date: '',
                    prepare: true
                },
                currentPlant: {id: -1}, // 当前选中的设备树节点信息
                currentPlantDetail: {id: -1}, // 当前选中的设备树节点信息
                currentProjectId: '', // 当前所选项目
                projectList: [], // 项目列表
                deviceTree: [], // 设备树
                expandTree: [], // 默认展开的节点数组
                plant: {
                    multiple: true, // 是否多选
                    manufacturerCode: '', // 厂商名称
                    roadName: '', // 路口名称
                    srcDeviceCode: '', // 违法采集设备编码
                    carWayCodes: [], // 车道号
                    carDirect: '', // 过车方向
                    deviceType: '' // 采集设备类型
                }, // 设备弹框字段大对象
                factoryDictionary: factoryDictionary, // 厂商选项列表 --- 来自前端数据字典
                carWayCodesList: carWayCodesList, // 车道号列表
                carDirectList: carDirectList, // 过车方向列表
                deviceTypeList: deviceTypeList, // 采集设备类型列表
                illegallist: [], // 单个设备上的违法标注
                settedRoadList: [] // 已经设置过的路口
            };
        },
         mounted() {
            if (this.cutdownImg.length > 0) {
                this.selectImg(this.cutdownImg[0].imageId);
            }
         },
        computed: {
            cutdownFilterList() {
                return this.cutdownImg.slice((this.cutdownCurrentPage - 1) * this.cutdownPageSize, this.cutdownCurrentPage * this.cutdownPageSize);
            },
            allPage() {
                return Math.ceil(this.cutdownImg.length / this.cutdownPageSize);
            }
        },
        created() {
            this.loading = true;
            this._initProjectList().then(()=>{
                this._initDeviceTree();
                this._initDeviceIllegallist();
            }).finally(()=>{
                this.loading = false;
            });
        },
        methods: {
            async _initProjectList() {
              // 初始化项目列表
                let res = await this._services.getProjectList();

                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                /**
                 * res.data
                 [
                 {
                     "id": 1,
                     "projectName": "无锡",
                     "status":1
                 },
                 {
                     "id": 2,
                     "projectName": "武汉",
                     "status":0
                 }
                 ]
                 */
                this.projectList = res.data;
                this.currentProjectId = res.data.find((val) => {
                    return val.status === 1;
                }).id;
            },
            async _initDeviceTree(projectId = this.currentProjectId) {
                // 初始化设备列表
                let res = await this._services.getDeviceTree({projectId: projectId});

                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                /**
                 * [{
                        children: [{
                            children: [{
                                id: "1",
                                label: "11319029883930"
                            }],
                            id: "II1",
                            label: "高新五路"
                        }],
                        id: "I0",
                        label: "大华"
                    }]
                 */
                this.deviceTree = res.data;
                if (this.expandTree.length === 0) {
                    this.expandTree = [res.data[0].children[0].children[0].id];
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file, 'file');
            },
            deviceBeforeUpload() {
                this.loading = true;
            },
            deviceUploadSuccess(response) {
                console.log(response, '上传成功');
                this.$message.success('配置文件上传成功');
                this.loading = false;
            },
            deviceUploadError() {
                this.$message.error('文件导入失败');
                this.loading = false;
            },
            signBeforeUpload() {
                this.loading = true;
            },
            signUploadSuccess(response) {
                console.log(response, '上传成功');
                this.loading = false;
            },
            signUploadError() {
                this.$message.error('文件导入失败');
                this.loading = false;
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            async handleNodeClick(data) {
                if (data.children) {return;} // 只有在点击最底层的单元时，才算选中。
                this.expandTree = [data.id];
                this.currentPlant = data;
                this._initDeviceDetail();
                this._initImageList();
            },
            async _initDeviceDetail(deviceId = this.currentPlant.id) {
                this.loading = true;
                let res = await this._services.getDeviceDetail({id: deviceId}).finally(()=>{this.loading = false;});

                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                this.currentPlantDetail = res.data;
                console.log(this.currentPlantDetail, 'currentPlantDetail');
                this.getSettedRoad(res.data.srcDeviceCode);
                /**
                 {
                     carDirect: 1
                     carDirectName: "西向东"
                     carWayCode: 3
                     createTime: 1538560626402
                     deviceCode: "319029883931"
                     deviceType: 1
                     id: 2
                     manufacturerCode: "DH"
                     manufacturerName: "大华"
                     projectId: 2
                     roadName: "高新四路"
                     srcDeviceCode: "19029883931"
                     updateTime: 1538560626402
                 }
                 */
            },
            async getSettedRoad(srcDeviceCode) {
                // 根据违法采集编码获取 已使用车道
                this.loading = true;
                let res = await this._services.getDeviceCarWayCodes({
                    srcDeviceCode: srcDeviceCode
                }).finally(()=>{this.loading = false;});

                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                this.settedRoadList = res.data;
            },
            async _initImageList(deviceId = this.currentPlant.id) {
                let res = await this._services.getDeviceImageList({deviceId: deviceId});

                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                this.cutdownImg = res.data;
                this.cutdownValue = this.cutdownImg[0].imageId;
            },
            async _initDeviceIllegallist(deviceId = this.currentProjectId) {
                let res = await this._services.getDeviceIllegallist({deviceId: deviceId});

                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                this.illegallist = res.data;
                this.illegallist = [
                    {'illegalName': '闯红灯', 'illegalCode': 1},
                    {'illegalName': '变道', 'illegalCode': 1}
                ];
            },
            addProject() {
                this.$refs.addProject.open();
            },
            deviceAdd() {
                this.formType = 'add';
                this.plant = {
                    multiple: true, // 是否多选
                    manufacturerCode: '', // 厂商名称
                    roadName: '', // 路口名称
                    srcDeviceCode: '', // 违法采集设备编码
                    carWayCodes: [], // 车道号 --- 多选
                    carDirect: '', // 过车方向
                    deviceType: '' // 采集设备类型
                }; // 设备弹框字段大对象
                this.carWayCodesList.forEach((val)=>{
                    if (val.disabled) {
                        val.disabled = false;
                    }
                });
                this.$refs.plantTending.open();
            },
            async deviceEditor() {
                if (this.currentPlant.id === -1) {
                    this.$message.warning('请选择对应的道路');
                    return false;
                }
                this.formType = 'editor';
                let currentPlantDetail = this.currentPlantDetail;

                this.plant = {
                    multiple: false,
                    manufacturerCode: currentPlantDetail.manufacturerCode, // 厂商名称
                    roadName: currentPlantDetail.roadName, // 路口名称
                    srcDeviceCode: currentPlantDetail.srcDeviceCode, // 违法采集设备编码
                    carWayCodes: currentPlantDetail.carWayCode, // 车道号 --- 单选
                    carDirect: currentPlantDetail.carDirect, // 过车方向
                    deviceType: currentPlantDetail.deviceType // 采集设备类型
                };
                this.carWayCodesList.forEach((val)=>{
                    this.settedRoadList.forEach((item)=>{
                        if (( val.code * 1 === item * 1) && (val.code * 1 !== this.currentPlantDetail.carWayCode * 1)) {
                            val.disabled = true;
                        }
                    });
                });
                this.$refs.plantTending.open();
            },
            deviceDelete() {
                if (this.currentPlant.id === -1) {
                    this.$message.warning('请选择对应的道路');
                    return false;
                }
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    this._services.deleteDevice({
                        id: this.currentPlant.id,
                        projectId: this.currentProjectId
                    }).then((res)=>{
                        if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                        this.loading = false;
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                }).catch(() => { this.loading = false;});
            },
            changInputStyle(e, type) {
                if (type === 'focus') {
                    e.target.style.borderRightColor = '#409EFF';
                } else if (type === 'blur') {
                    e.target.style.borderRightColor = '#f9f9f9';
                }
            },
            async plantConfirm() {
                this.loading = true;
                let plant = this.plant;

                if (this.formType === 'add') {
                    let res = await this._services.addDevice({
                        'carWayCodes': String(plant.carWayCodes),
                        'roadName': plant.roadName,
                        'deviceType': plant.deviceType,
                        'manufacturerCode': plant.manufacturerCode,
                        'manufacturerName': this.factoryDictionary.find((val)=>{return val.manufacturerCode === plant.manufacturerCode;}).manufacturerName,
                        'srcDeviceCode': plant.srcDeviceCode,
                        'carDirect': plant.carDirect,
                        'projectId': this.currentProjectId
                    }).finally(()=>{this.loading = false;});

                    if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                    this.$refs.plantTending.close();
                    this._initDeviceTree();
                } else if (this.formType === 'editor') {
                    this.loading = true;
                    let res = await this._services.updateDevice({
                        'id': this.currentPlant.id,
                        'carWayCodes': String(plant.carWayCodes),
                        'roadName': plant.roadName,
                        'deviceType': plant.deviceType,
                        'manufacturerCode': plant.manufacturerCode,
                        'manufacturerName': this.factoryDictionary.find((val)=>{return val.manufacturerCode === plant.manufacturerCode;}).manufacturerName,
                        'srcDeviceCode': plant.srcDeviceCode,
                        'carDirect': plant.carDirect,
                        'projectId': this.currentProjectId
                    }).finally(()=>{this.loading = false;});

                    if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                    this.$refs.plantTending.close();
                    this._initDeviceTree();
                }
            },
            async projectConfirm(projectName = this.currentProjectId) {
                this.loading = true;
                let res = await this._services.addProjectList({projectName: projectName}).finally(()=>{this.loading = false;});

                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                this.$refs.addProject.close();
            },
            signMsgExport() {
                this.$refs.signExport.open();
            },
            signExportConfirm() {
                console.log('signExportConfirm');
            },
            prePage() {
                if (this.cutdownCurrentPage > 1 ) {
                    this.cutdownCurrentPage -= 1;
                    this.cutdownValue = this.cutdownImg[(this.cutdownCurrentPage - 1) * this.cutdownPageSize].imageId;
                }
            },
            nextPage() {
                if (this.cutdownCurrentPage < this.allPage ) {
                    this.cutdownCurrentPage += 1;
                    this.cutdownValue = this.cutdownImg[(this.cutdownCurrentPage - 1) * this.cutdownPageSize].imageId;
                }
            },
            selectImg(imageId) {
                this.imgUrl = this._services.imageLocation + '?imageId=' + imageId;
                console.log(this.imgUrl);
                const dataMark = this.$refs.dataMark;

                dataMark && dataMark.loadImg(this.imgUrl);
            }
        }
    };
</script>

<style lang="less" scoped>
    @imageTest1: '../assets/device-test1.png';

    * {
        box-sizing: border-box;
    }

    .big-image{
        width:100%;height:100%;
    }

    .project-name {
        text-align: left;
        margin-bottom: 6px;
        color: #797e88;
    }
    .project-list-box{
        margin:0 17px;
    }

    .left-search {
        text-align: center;
        margin-bottom: 8px;
        .el-input {
            width: 230px;
            .el-input__inner {

            }
        }
        .el-input-group__append{
            background: #f9f9f9;
        }
    }

    .device-wrapper {
        text-align: center;
        .device-manage {
            display: inline-block;
            min-width: 1440px;
            overflow: hidden;
            .device-left {
                width: 295px;
                font-size: 12px;
            }
            .device-center {
                width: 910px;
                margin: 0 15px;
                border: 1px solid #e6eaee;
                .device-center-top{
                    text-align: left;
                    font-size:14px;
                    color:#060e1e;
                    padding-top:20px;
                    span{
                        margin:0 12px;
                    }
                }
            }
            .device-right {
                width: 160px;
                padding-top:60px;
            }
        }
    }

    .device-channel-wrapper {
        margin: 0 18px;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #dedfe6;
    }

    .device-left {
        .forbidden-line{
            overflow: hidden;
            .fob-input{
                width:200px;
            }
            .upload-btn{
                border:none;
            }
        }
        .device-top {
            padding: 17px 17px 14px 17px;
        }
        .left-line {
            padding-bottom: 10px;
        }
        .label {
            height: 26px;
            margin-right: 10px;
            line-height: 26px;
        }
        .label-content {
            .el-select {
                width: 200px;
                .el-input__inner {
                    border-radius: 4px 0 0 4px;
                }
            }
            .add {
                display: inline-block;
                width: 60px;
                line-height: 32px;
                padding: 0 12px;
                background: #18a5d6;
                color: #fff;
            }
        }
        .adus-box {
            background: #f9f9f9;
            text-align: left;
            padding-left: 10px;
            border-radius: 4px 4px 0 0;
            border-bottom: 1px solid #e2e3e9;
            margin-bottom: 8px;
            i {
                font-size: 16px;
                padding: 12px 6px;
                &:hover {
                    cursor: pointer;
                }
            }
            .upload-demo{
                display: inline-block;
            }
        }
        .sign-line {
            padding:12px 0 10px 0;
            text-align: center;
            .el-button {
                background: #3da9c5;
                font-size: 12px;
                border-color:#3da9c5;
            }
        }
        .bottom-line{
            .el-button{
                padding: 12px 32px;
            }
        }
    }

    .device-center {
        .device-top-tips {
            margin-top: 20px;
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            span {
                margin-right: 24px;
                font-size: 14px;
            }
            .control-box {
                display: inline-block;
                height: 40px;
                margin-right: 50px;
                line-height: 40px;
                float: left;
                i {
                    padding: 0 10px;
                    font-size: 18px;
                }
            }
        }
        .image-wrapper {
            height: 600px;
            overflow: hidden;
            margin-top: 9px;
            .img-box{
                width:100%;
                height:100%;
            }
        }
        .feature-configure {
            text-align: left;
            .el-table{
                margin-bottom: 8px;
            }
            .configure-label {
                height: 32px;
                line-height: 32px;
                color: #7f8fa4;
                text-indent: 25px;
                font-size: 12px;
                overflow: hidden;
                .copy{
                    &:hover{
                        cursor: pointer;
                        color:#18a5d6;
                    }
                }
                i{
                    margin:0 5px;
                }
            }
            .operation-text {
                color: #7f8fa4;
                margin: 0 5px;
                &:hover {
                    cursor: pointer;
                }
            }
            .configure-add {
                height: 44px;
                border: 2px dashed #e6eaee;
                line-height: 40px;
                color: #333c48;
                font-size: 14px;
                text-align: center;
                font-weight: bold;
                background: #fff;
                &:hover {
                    cursor: pointer;
                    background: #f9f9f9;
                }
                i {
                    margin-right: 5px;
                }
            }

        }
    }

    .device-right {
        .paginate-page-count{
            display: inline-block;
            line-height: 38px;
            text-align: center;
            font-size:12px;
            color:#7f8fa4;
        }
        .paginate-box{
            padding:8px 0;
            text-align: center;
            span{
                display: inline-block;
                color:#060e1e;
                padding:8px 12px;
                border-radius: 15px;
                border: 1px solid #ced0da;
                font-size:12px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .small-image-box {
            text-align: center;
            background: #fff;
            .small-img {
                display: inline-block;
                position: relative;
                overflow: hidden;
                width: 100%;
                height: 90px;
                margin-bottom: 12px;
                background: url(@imageTest1) no-repeat center/cover;
                input[type='radio'] {
                    position: absolute;
                    left: 0;
                    top: 0;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
            .choosed {
                border: 1px solid #18a5d6;
            }
        }
        .el-select {
            width: 130px;
        }
        .save {
            padding: 0 10px;
        }
        .add {
            .el-button {
                height: 30px;
            }
        }
        .border-wrapper {
            border: 1px solid #797979;
            height: 34px;
            line-height: 32px;
        }
        .right-line {
            overflow: hidden;
            padding: 10px 0;
            margin-bottom: 10px;
            border: 1px solid #797979;
            .tips {
                margin-left: 14px;
            }
            .delete {
                margin-right: 16px
            }
            .reset {
                margin-right: 6px;
            }
        }
        .add {
            padding: 7px 0;
        }
        .select-line {
            padding: 4px 0;
        }
    }

    .add-content {
        padding: 20px;
    }

    .tree-box{
        .tree-header{
            overflow: hidden;
            background: #fff;
            .count-title{
                float:right;
                margin:0 10px;
            }
        }
        .custom-tree-node{
            overflow: hidden;
            text-align: left;
            width:100%;
            height:26px;
            line-height:26px;
            padding-right:18px;
            .tree-count{
                float:right;
                margin:0 10px;
            }
        }
    }

</style>
<style lang="less">
    .device-wrapper {
        .add-content{
            .el-input-group__prepend{
                border:none;
                background: none;
            }
        }
        .sign-export-content{
            padding:20px;
            .sign-label{
                display: inline-block;
                width:170px;
                margin-right:20px;
                text-align: right;
                color:#a8a8a8;
                font-size:12px;
            }
            .type-layout{
                margin-bottom: 25px;
            }
            .singe-layout{
                margin-bottom: 20px;
                .singe-label{
                    vertical-align: top;
                    line-height:26px;
                }
                .singe-content{
                    display: inline-block;
                    width:352px;
                    vertical-align: top;
                    .label{
                        margin-bottom: 9px;
                    }
                    .single-input{
                        margin-bottom: 9px;
                    }
                    .date-picker{
                        width:100%;
                    }
                }
            }
            .use-readied{
                margin-bottom: 20px;
                .el-checkbox__label{
                    color:#a8a8a8;
                    font-size:12px;
                }
            }
            .el-tabs__nav-wrap::after{
                content:none;
            }
            .el-tabs__nav{
                margin-left:120px;
            }
        }
        .plantTending-content {
            padding-top: 26px;
        }
        .device-left {
            .upload-reset {
                .el-input__inner {
                    height: 32px;
                    line-height: 32px;
                    font-size: 14px;
                }
            }

            .upload-btn {
                font-size: 14px;
                background: #18a5d6;
                color: #fff;
                margin-right: -21px;
                border-radius: 0;
            }

            .el-input-group--append {
                font-size: 14px;
                .el-input__inner {
                    height: 32px;
                    line-height: 30px;
                }
            }

            .label-content {
                .el-select {
                    .el-input__inner {
                        border-radius: 4px 0 0 4px;
                    }
                }
            }
            .left-search {
                .el-input {
                    .el-input__inner {
                        border-right-color: #f9f9f9;
                        background: #f9f9f9;
                        &:hover{
                            border-right-color: #c0c4cc;
                        }
                    }
                }
                .el-input-group__append {

                }
            }
            .el-input-group__append {
                color: #0b162e;
                i.el-icon-search {
                    font-size: 16px;
                }
            }
        }
        .device-left, .device-right {
            .el-select {
                .el-input--suffix {
                    height: 32px;
                    .el-input__inner {
                        height: 32px;
                        line-height: 32px;
                    }
                    .el-input__icon {
                        line-height: 32px;
                    }
                }
            }
        }
        .dialog-wrapper {
            .el-form {
                padding: 0 20px;
            }
            .el-select {
                width: 100%;
            }
        }
        .feature-configure {
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
            .cell{
                text-align: center;
            }
        }
    }
</style>
