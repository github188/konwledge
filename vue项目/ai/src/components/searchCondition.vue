
<template>
    <el-form ref="form" :model="form" label-width="80px" :label-position="'top'" :rules="rules" class="search-condition">
        <el-form-item label=" " v-if="titleName=='预审测试审核'">
            {{taskName}}
        </el-form-item>
        <el-form-item label="违法时段" v-if="titleName=='违法复核'||titleName==='违法初审'" prop="startTime" style="margin-bottom:0;">
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="开始日期时间" :clearable="false" @change="checkTime('endTime')">
            </el-date-picker>
        </el-form-item>
        <el-form-item label=" " v-if="titleName==='违法复核'||titleName==='违法初审'" prop="endTime" class="endTime">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="结束日期时间" :clearable="false" @change="checkTime('startTime')">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="违法地点" v-if="titleName=='违法复核'||titleName==='违法初审'">
            <DeviceSelect @getCode="getCode" />
        </el-form-item>
        <el-form-item label="违法行为">
            <el-select v-model="form.illegalCode" size="small" placeholder=" " style="width:100%;">
                <el-option v-for="item in illegalBehaviorInfo" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
            <el-select v-model="form.checkStatus" size="small" placeholder=" " style="width:100%;">
                <el-option v-for="item in dataStatusInfo" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="违法车牌" prop="carPlateNumber" v-if="titleName=='违法复核'||titleName==='违法初审'">
            <el-input size="small" v-model="form.carPlateNumber "></el-input>
        </el-form-item>
        <el-form-item label="号牌颜色" v-if="titleName=='违法复核'||titleName==='违法初审'">
            <el-select v-model="form.plateColorCode" clearable size="small" placeholder=" " style="width:100%;">
                <el-option v-for="item in carplateColorInfo" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" size="small" style="width:100%;background:#18A5D6;" @click="submitForm('form')">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {
    carplateColorInfo,
    illegalBehaviorInfo,
    illegalPlaceInfo
} from '@/common/dataCustom.js';
import DeviceSelect from '@/components/utils/deviceSelect';

export default {
    props: ['taskName', 'dataStatusInfo'],
    components: {
        DeviceSelect
    },
    data() {
        let startTimeValid = (rule, value, callback) => {
            let { endTime, startTime } = this.form;

            startTime = startTime.getTime();
            endTime = endTime.getTime();
            if (startTime > endTime) {
                callback(new Error('开始时间不得大于结束时间'));
            } else if (endTime - startTime > 86400000 * 30 * 6) {
                callback(new Error('查询范围不得超过半年'));
            } else {
                callback();
            }
        };
        let endTimeValid = (rule, value, callback) => {
            let { endTime, startTime } = this.form;

            startTime = startTime.getTime();
            endTime = endTime.getTime();
            if (startTime > endTime) {
                callback(new Error('结束时间不得小于开始时间'));
            } else if (endTime - startTime > 86400000 * 30 * 6) {
                callback(new Error('查询范围不得超过半年'));
            } else {
                callback();
            }
        };

        return {
            carplateColorInfo,
            illegalBehaviorInfo,
            illegalPlaceInfo,
            titleName: '',
            form: {
                startTime: new Date(new Date().setHours(0, 0, 0, 0)),
                endTime: new Date(),
                deviceId: '',
                illegalCode: null,//违法行为
                checkStatus: 1,//审核状态
                carPlateNumber: '',//违法车牌
                plateColorCode: null //号牌颜色
            },


            rules: {
                carPlateNumber: [
                    {
                        required: false,
                        message: '请输入车牌',
                        trigger: 'blur'
                    },
                    {
                        min: 7,
                        max: 7,
                        message: '长度为 7 位'
                    },
                    {
                        pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
                        message: '车牌号错误'
                    }
                ],
                startTime: [{
                    validator: startTimeValid
                }],
                endTime: [{
                    validator: endTimeValid
                }]
            }
        };
    },
    filters: {
        carplateUppercase(val) {
            if (!val) {
                return;
            }
            return val.toUpperCase();
        }
    },
    created() {
        this.titleName = this.$route.name;
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('getConditions', this.form);
                } else {
                    return false;
                }
            });
        },
        reset() {
            this.form = {
                startTime: new Date(new Date().setHours(0, 0, 0, 0)),
                endTime: new Date(),
                deviceId: '',// 违法地点
                illegalCode: 0,//违法行为
                checkStatus: 2,//审核状态
                carPlateNumber: '',//违法车牌
                plateColorCode: 0//车牌颜色
            };
            this.$refs['form'].validate();
        },
        checkTime(type) {
            // 改变开始时间验证结束时间，改变结束时间验证开始时间。
            this.$refs['form'].validateField(type);
        },
        getCode(code, type) {
            this.form[type] = code;
            if (!code) {
                delete this.form[type];
            }
        }

    }
};
</script>
<style lang="less">
.search-condition {
  .el-range-editor.el-input__inner,
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-form-item__label {
    line-height: 15px;
  }
  //   .el-date-editor.el-input {
  //     margin-bottom: 10px;
  //   }
  .el-input--prefix .el-input__inner {
    height: 32px;
  }
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
}
</style>

