<template>
    <div>
        <div class="m-top-info">
            <div class="m-main-box page-title">
                <i class="iconfont icon-data-push fz-20"></i>
                <span>数据发布管理</span>
            </div>
        </div>
        <div class="m-box m-main-box">
            <div class="tab">
                <span class="title">发布目标库: </span>
                <el-radio v-model="targetType" label="1">外挂系统</el-radio>
                <el-radio v-model="targetType" label="2">执法平台</el-radio>
                <!-- <el-button-group>
                    <el-button v-bind:class="{select : targetType === '1'}" @click="selectType('1')">外挂系统</el-button>
                    <el-button v-bind:class="{select : targetType === '2'}" @click="selectType('2')">执法平台</el-button>
                </el-button-group> -->
            </div>
            <div class="mian-layout">
                <div class="item">
                    <p>预审数据发布</p>
                    <div class="check-box-layout">
                        <el-checkbox-group
                            v-model="preTrial"
                            @change="changeGroup('0')"
                            >
                            <el-checkbox label="0" >预审正片</el-checkbox>
                            <el-checkbox label="1" >预审废片</el-checkbox>
                            <el-checkbox label="2" >未预审</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="item b-l-0">
                    <p>初审数据发布</p>
                    <div class="check-box-layout">
                        <el-checkbox-group
                            v-model="firstTrial"
                            @change="changeGroup('1')"
                            >
                            <el-checkbox label="0" >初审正片</el-checkbox>
                            <el-checkbox label="1" >初审废片</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="item b-l-0">
                    <p>复审数据发布</p>
                    <div class="check-box-layout">
                        <el-checkbox-group
                            v-model="review"
                            @change="changeGroup('2')"
                            >
                            <el-checkbox label="0" >初审废片</el-checkbox>
                            <el-checkbox label="1" >初审废片</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="m-sumbit">
                <el-button>保 存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            targetType: '1',
            preTrial: [],
            firstTrial: [],
            review: []
        };
    },
    methods: {
        selectType(type) {
            this.targetType = type;
            this.clearLabel();
        },
        changeGroup(v) {
            console.log(v);
            if (v === '0') {
                this.review = [];
                this.firstTrial = [];
            } else if (v === '1') {
                this.preTrial = [];
                this.review = [];
            } else if ( v === '2') {
                this.preTrial = [];
                this.firstTrial = [];
            }
        },
        clearLabel() {
            this.preTrial = [];
            this.review = [];
            this.firstTrial = [];
        }
    }
};
</script>

<style lang="less">
.m-box {
    margin-top: 40px;
    height: 660px;
    background-color: #fff;
    border-radius: 3px;
    border: solid 1px #e6eaee;
    .tab {
        padding: 100px 0 20px;
        .title {
            color: #797e88;
            margin: 0 10px;
        }
        text-align: center;
    }
    .select {
        background-color: #18a5d6;
        color: #fff;
    }
    .mian-layout  {
        margin: 0 auto;
        margin-top: 60px;
        display: flex;
        justify-content: center;
        .item {
            height: 125px;
            width: 300px;
            border: solid 1px #eef0f5;
            p {
                padding: 15px 0;
                text-align: center;
                color: #797e88;
            }
            .check-box-layout {
                text-align: center;
                padding: 10px 0;
            }
        }
        .b-l-0 {
            border-left: 0;
        }
    }
    .m-sumbit {
        text-align: center;
        padding: 40px 0;
        button {
            background-color: #18a5d6;
            color: #fff;
        }
    }
}
</style>


