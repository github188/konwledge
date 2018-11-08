<template>
    <div class="file-upload-box">
        <el-input :placeholder="placeholder" v-model="inputText" class="upload-reset" disabled>
            <template slot="append">
                <span class="el-icon-tickets upload-icon"></span>
            </template>
        </el-input>
        <el-upload
                class="upload-demo"
                :action="url"
                :on-preview="handlePreview"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :on-error="handleError"
                :on-success="handleSuccess"
        >
            <el-button size="small" type="primary" class="upload-text">上传</el-button>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: 'fileUpload',
        props: {
            url: {type: String, require: true},
            placeholder: {type: String, default: ''}
        },
        data() {
            return {
                inputText: ''
            };
        },
        methods: {
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleError(err, file){
                this.$emit('uploadSuccess', err);
            },
            handleSuccess(response, file){
                console.log(response);
            }
        }
    };
</script>

<style lang="less">
    .file-upload-box {
        display: inline-block;
        overflow: hidden;
        .upload-reset {
            float: left;
            width: 230px;
            input {
                border-right: none;
                height: 35px;
                line-height: 35px;
            }
            .el-input-group__append {
                background: #f5f7fa;
            }
        }
        .upload-demo{
            float: left;
        }
        .upload-text {
            height: 33px;
            margin-top: 1px;
            margin-left: 9px;
            background: #18a5d6;
            border-color: #3da9c5;
        }
    }
</style>
