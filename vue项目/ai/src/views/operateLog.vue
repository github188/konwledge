<template>
    <div class="operate-log">
        <div class="m-top-info">
            <div class="m-main-box">
                <el-row >
                    <el-col class="page-title" :span="4">
                        <i class="iconfont icon-system-log fz-20"></i>
                        <span>系统日志</span>
                    </el-col>
                    <el-col :span="10">
                        <ul class="tab-ul">
                            <li  v-bind:class="{select: timeType=== 1}" @click="selectTimeFormat(1)">今日</li>
                            <li  v-bind:class="{select: timeType=== 2}" @click="selectTimeFormat(2)">本周</li>
                            <li  v-bind:class="{select: timeType=== 3}" @click="selectTimeFormat(3)">本月</li>
                            <li  v-bind:class="{select: timeType=== 4}" @click="selectTimeFormat(4)">近一月</li>
                            <li  v-bind:class="{select: timeType=== 5}" @click="selectTimeFormat(5)">自定义周期</li>
                        </ul>
                    </el-col>
                    <el-col :span="10" class="align-right" v-show="timeType === 5">
                        <el-date-picker
                            v-model="timeRange"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']"
                            :blur="transformTime()"
                            >
                        </el-date-picker>
                         <el-button class="m-l-5" @click="search()">查 询</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="table-layout">
            <div class="m-main-box">
                <tablebase
                    ref="tbMethods"
                    :tableData="tableData"
                    :loading="loading"
                    :tableKey="tableKey"
                    :hasNumber="true"
                    :event="tableEvent"
                    >
                </tablebase>
            </div>
        </div>
    </div>
</template>

<script>
import selectCom from '../components/utils/selectCom';
import tablebase from '../components/common/tablebase/tablebase';
export default {
    components: {
        selectCom,
        tablebase
    },
    data() {
        return {
            vendorArr: [
                {
                    code: '1',
                    name: '深瞐'
                }
            ],
            param: {
                userId: '',
                startTime: 0,
                endTime: 0
            },
            timeRange: [],
            timeType: 1,
            tableData: [],
            tableOption: {},
            tableKey: [
                {
                    key: 'createTime',
                    name: '创建时间',
                    formatter: this.formatterTime
                },
                {
                    key: 'userAcount',
                    name: '用户账号'
                },
                {
                    key: 'userName',
                    name: '姓名'
                },
                {
                    key: 'crtlType',
                    name: '违法处理'
                },
                {
                    key: 'ip',
                    name: 'IP'
                },
                {
                    key: 'detail',
                    name: '详情'
                }
            ],
            tableEvent: {
                select: function (selection , row ) {
                    console.log(selection , row );
                },
                selectAll: function (selection) {
                    console.log(selection);
                }
            },
            loading: false

        };
    },
    mounted() {
            this._initTableData();
    },
    methods: {
        _initTableData() {
            this.loading = true;
            setTimeout(() => {
                this.tableData = [
                   {id: '1' , createTime: '1540051200000' , userAcount: 'admin' , userName: '吉格斯' , crtlType: '违法处理' , ip: '10.103.2.62' },
                   {id: '2' , createTime: '1540051200000' , userAcount: 'admin' , userName: '萨内' , crtlType: '违法处理' , ip: '10.103.2.62' },
                   {id: '3' , createTime: '1540051200000' , userAcount: 'admin' , userName: '内斯塔' , crtlType: '违法处理' , ip: '10.103.2.62' },
                   {id: '4' , createTime: '1540051200000' , userAcount: 'admin' , userName: '桑其实' , crtlType: '违法处理' , ip: '10.103.2.62' },
                   {id: '5' , createTime: '1540051200000' , userAcount: 'admin' , userName: '吉格斯' , crtlType: '违法处理' , ip: '10.103.2.62' },
                   {id: '6' , createTime: '1540051200000' , userAcount: 'admin' , userName: '吉格斯' , crtlType: '违法处理' , ip: '10.103.2.62' },
                   {id: '7' , createTime: '1540051200000' , userAcount: 'admin' , userName: '吉格斯' , crtlType: '违法处理' , ip: '10.103.2.62' },
                   {id: '8' , createTime: '1540051200000' , userAcount: 'admin' , userName: '吉格斯' , crtlType: '违法处理' , ip: '10.103.2.62' },
                   {id: '9' , createTime: '1540051200000' , userAcount: 'admin' , userName: '吉格斯' , crtlType: '违法处理' , ip: '10.103.2.62' },
                   {id: '10' , createTime: '1540051200000' , userAcount: 'admin' , userName: '吉格斯' , crtlType: '违法处理' , ip: '10.103.2.62' }
                ];
                this.loading = false;
            },1000);
        },
        selectTimeFormat(type) {
            const DATE = new Date();
            let day = DATE.getDay();
            let date = DATE.getDate();
            let time = DATE.getTime();
            let currentDayTime = this.tools.getUnixDate(this.tools.timeFormat(time)) + 3600 * 24 * 1000;

            this.timeType = type;
            if (type === 1) {
                this.param.startTime = currentDayTime - 3600 * 24 * 1000;
            } else if (type === 2) {
                this.param.startTime = currentDayTime - 3600 * 24 * 1000 * day;
            } else if (type === 3 ) {
                this.param.startTime = currentDayTime - 3600 * 24 * 1000 * date;
            } else if (type === 4 ) {
                this.param.startTime = currentDayTime - 3600 * 24 * 1000 * 30;
            }
            this.param.endTime = currentDayTime - 1000;
            if (type !== 5) {
                this.search();
            }
        },
        search() {
            let _this = this;

            this.transformTime();
            this._services.sysLogSearch(this.param)
            .then((res) => {
                _this.tools.message(res.message , 'info');
            });
        },
        transformTime() {
            if (this.timeRange.length) {
                this.param.startTime = this.timeRange[0].getTime();
                this.param.endTime = this.timeRange[1].getTime();
            }
            // console.log(this.param);
        },
        formatterTime(row) {
            return this.tools.timeFormat(row.createTime, 'dateTime');
        },
        selectRow(selection,row) {
            console.log(selection , row);
        }
    }
};
</script>

<style lang="less">
.tab-ul {
    li {
        float: left;
        margin: 0 15px;
        position: relative;
        color: #7f8fa4;
        cursor: pointer;
        &.select {
            color: #000;
            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: #000;
            }
        }


    }
}
.table-layout {
    padding: 40px 0 0 0;
    .m-main-box {
        text-align: center;
        .el-table th {
            text-align: center;
        }
    }
}

</style>


