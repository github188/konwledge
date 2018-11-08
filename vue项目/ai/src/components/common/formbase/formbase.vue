<template>
    <el-form :label-width="labelWidth" :label-position="'right'" ref="formRef" :rules="rules" :model="formData">
        <template v-for="item in formGroups">
            <el-form-item
                v-if="item.input"
                :label="item.label"
                :prop="item.key"
                :key="item.key"
                >
                <el-input v-model="formData[item.key]" :placeholder="item.placeholder" :type="item.type?item.type:'text'"></el-input>
             </el-form-item>
             <el-form-item
                v-if="item.selection"
                :label="item.label"
                :prop="item.key"
                :key="item.key"
                >
                <el-select
                    v-model="formData[item.key]"
                    :multiple="item.multiple"
                    >
                    <el-option
                        v-for="option in item.options"
                        :placeholder="item.placeholder"
                        :key="option.code?option.code:option[item.optionKey]"
                        :label="option.name?option.name:option[item.optionName]"
                        :value="option.code?option.code:option[item.optionKey]"
                        >
                    </el-option>
                </el-select>
             </el-form-item>
        </template>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            formValidate: {}
        };
    },
    props: {
        rules: { type: Object},
        formData: {type: Object },
        formGroups: { type: Array },
        labelWidth: { type: String , default: '80px'}
    },
    mounted() {
        this.formValidate = this.$refs['formRef'];
    }
};
</script>

<style lang="less">
.el-select {
    display: block;
}
</style>


