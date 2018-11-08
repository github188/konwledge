<template>
    <el-select v-model="code" :multiple="multiple" :placeholder="placeholder" @change="changeItem" clearable size="small" style="width: 100%">
        <el-option v-for="item in info" :key="item.code" :label="item.name" :value="item.code">
        </el-option>
    </el-select>
</template>
<script>

export default {
    data() {
        return {
            code: ''
        };
    },
    props: ['multiple', 'info', 'name','placeholder' ],
    mounted: function () {
    },
    methods: {
        changeItem() {
            this.$emit('getCode', this.code.toString(), this.name);
            console.log(this.code);
        },
        clear() {
            if (this.multiple) {
                this.code = [];
            } else {
                this.code = '';
            }
        }
    }
};
</script>
<style scoped>
</style>

