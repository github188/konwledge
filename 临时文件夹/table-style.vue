<template>
    <div class="device-online-component table">
        <div class="table-top">
            <h2 class="table-title">设备在线率</h2>
        </div>
        <div class="tr">
            <div class="td">类别</div><div class="td">在线</div><div class="td">离线</div>
        </div>
        <div class="tr">
            <div class="td">人脸相机</div><div class="td">500</div><div class="td">400</div>
        </div>
        <div class="tr">
            <div class="td">治安监控</div><div class="td">500</div><div class="td">400</div>
        </div>
        <div class="tr">
            <div class="td">交警监控</div><div class="td">500</div><div class="td">400</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "table-style"
    }
</script>

<style lang="less" scoped>

    // table类的样式
    .table{
        .table-top{
            .table-title{
                font-weight: bold;
            }
        }
        .tr{
            height:20px;
            .td{
                width:150px;
                display: inline-block;
                vertical-align: middle;
                height:100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                text-align: center;
            }
        }
    }
</style>