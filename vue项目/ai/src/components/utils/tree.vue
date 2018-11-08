<template>
    <el-row>
        <el-col :span="24">
            <el-input v-model="selectText" placeholder="请选择卡口" @focus="dialogVisible=true">
                <i v-show="selectText" slot="suffix" class="el-input__icon el-icon-error" @click="clear"></i>
            </el-input>
        </el-col>
        <el-dialog title="卡口选择" :visible.sync="dialogVisible" width="30%">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            </el-input>
            <el-tree :data="localTreeData" show-checkbox ref="treeSelf" accordion node-key="deviceId"
                     :props="defaultProps" :filter-node-method="filterNode" @check="getCheckedNodes">
            </el-tree>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false;">关 闭</el-button>
      </span>
        </el-dialog>
    </el-row>
</template>
<script>
    export default {
        data() {
            return {
                filterText: '',
                dialogVisible: false,
                selectText: '',
                localTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'nodeName',
                    nodeKey: 'nodeId'
                }
            };
        },
        watch: {
            filterText(val) {
                this.$refs.treeSelf.filter(val);
            }
        },
        mounted() {
            setTimeout(() => {
                this.getTreeData();
            }, 500);
        },
        methods: {
            filterNode(value, data) {
                if (!value) {
                    return true;
                }
                return data[this.defaultProps.label].indexOf(value) !== -1;
            },
            getCheckedNodes() {
                let checkedArr = this.$refs.treeSelf.getCheckedNodes();
                let str = '';
                let code = '';

                checkedArr.map(i => {
                    str += i[this.defaultProps.label] + ',';
                    code += i[this.defaultProps.nodeKey] + ',';
                });
                this.selectText = str.substring(0, str.length - 1);
                code = code.substring(0, code.length - 1);
                this.$emit('getCode', code, 'tollgateDeviceId');
            },
            clear() {
                this.selectText = '';
                this.$refs.treeSelf.setCheckedKeys([]);
                this.$emit('getCode', '', 'tollgateDeviceId');
            },
            getTreeData() {
                this._services.getGettollgateinfo({type: 'getDevicesTree'}).then(
                    (res) => {
                        if (parseInt(res.code, 10) === 0) {
                            this.localTreeData = res.data;
                        }
                    }
                );
            }
        }
    };
</script>

<style>
    .el-dialog__body {
        max-height: 500px;
        overflow-y: scroll;
    }

    .el-icon-error {
        cursor: pointer;
    }

    /*滚动条*/
    /* ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }

    ::-webkit-scrollbar-thumb {
        background: #5393ff;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: #fff;
        border-radius: 10px;
    } */

    .el-input__inner {
        height: 36px;
        line-height: 36px;
    }
</style>
