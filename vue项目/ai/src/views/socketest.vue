<template>
    <div class="socket">
        <el-row>测试websocket</el-row>
        <el-row style="margin-top:10px;">
            <el-button @click="connectSocket" type="primary">1. 获取wsChannelId</el-button>
        </el-row>
        <el-row style="margin-top:10px;">
            <el-button @click="registBlackWarn" type="primary"> 2.订阅黑名单</el-button>
        </el-row>
    </div>

</template>
<script>

import * as socket from '../common/webSocket';

export default {
    data() {
        return {};
    },
    mounted() {

    },
    methods: {
        connectSocket() {
            this._services.getUserLogin({
                type: 'islogin'
            }).then(res => {
                socket.connectSocket(res.data.userId, res.data.orgId, (jsonData) => {
                    this.injectData(jsonData);
                });
            });
        },
        injectData(jsonData) {
            if (!jsonData.wsChannelId) {
                let { channelId, simiScore } = jsonData;
                let str = `设备Id:${channelId};相似度:${simiScore}`;

                this.tools.notify(str, 'success', '接收数据', 0);
            } else {
                this.tools.notify('获取wschannelId成功!，再点订阅按钮', 'success', '接收数据', 0);
            }
        },
        registBlackWarn() {
            if (!socket.wsChannelId) {
                this.tools.message('请先获取wsChannelId!');
                return;
            }
            this._services.getPushLogic(
                {
                    type: 'register',
                    topic: 'black_warn',
                    wsChannelId: socket.wsChannelId
                }
            ).then((res) => {
                let type = parseInt(res.code, 10) === 0 ? 'success' : 'error';
                let msg = parseInt(res.code, 10) === 0 ? '订阅成功，坐等推送就好了!' : '订阅失败了';

                this.tools.message(msg, type);
            });
        }
    },
    beforeDestroy() {
        console.log('beforeDestroy');
        // 路由切换之前可以在此退订推送
    },
    destroyed() {
        console.log('destroyed');
    }
};

</script>


<style lang="less">
.socket {
  width: 400px;
  height: 200px;
  border: 3px solid #606266;
  border-radius: 2px;
  text-align: center;
  line-height: 30px;
}
</style>

