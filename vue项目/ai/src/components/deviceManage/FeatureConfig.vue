<template>
    <div class="feature-wrapper">
        <div class="featrue-config">
            <div class="feature-left fl">
                <div class="top">
                    <span class="sign-text">已标注违法行为</span>
                    <span class="fr copy" @click="copyDeviceInfo">
                        <i class="el-icon-tickets"></i>
                        <span class="copy-text">复制到其他设备</span>
                    </span>
                </div>
                <ul class="choose">
                    <li v-for="item in labeledAction" :key="item.label">
                        <p class="choose-icon">
                            <i :class="item.icon"></i>
                        </p>
                        <span class="text">{{item.label}}</span>
                    </li>
                </ul>
            </div>
            <div class="feature-right fr">
                <p class="title">车道涉及违法行为</p>
                <ul class="box">
                    <li v-for="item in illegallist" :key="item.illegalName">{{item.illegalName}}</li>
                </ul>
            </div>

            <v-dialog ref="copyDevice" title="设备标注数据信息复制" d-type="confirm" @confirm="copyConfirm" confirm-text="开始赋值">
                <div class="copy-device-content">
                    <div class="device-top-wrapper">
                        <div class="detail-box detail-box-left">
                            <p class="detail-box-title">
                                <span>路口编码：{{currentPlantDetail.deviceCode}}</span>
                                <span>设备ID：{{currentPlantDetail.id}} </span>
                                <span>过车方向：{{currentPlantDetail.carDirectName}}</span>
                                <span>车道号：{{currentPlantDetail.carWayCode}}</span>
                            </p>
                            <div class="dialog-img">
                                <img src="http://h1.ioliu.cn/bing/CalidrisCanutus_EN-AU8947402764_1920x1080.jpg" alt="">
                            </div>
                        </div>
                        <div class="detail-box detail-box-right">
                            <p class="detail-box-title">
                                <span>路口编码：{{copyInfo.deviceCode}}</span>
                                <span>设备ID：{{copyInfo.id}} </span>
                                <span>过车方向：{{copyInfo.carDirectName}}</span>
                            </p>
                            <div class="dialog-img">
                                <img  :src="copyInfo" alt="图片加载失败">
                            </div>
                        </div>
                    </div>
                    <div class="device-bottom-wrapper">
                        <ul class="config-box config-box-left">
                            <p class="config-box-title">已标注违法</p>
                            <li class="li" v-for="(item,idx) in configOptions" :key="idx">{{item.label}}</li>
                        </ul>
                        <ul class="config-box config-box-left">
                            <p class="config-box-title c">
                                <i class="el-icon-tickets"></i>请选择复制车道
                                <el-select v-model="copyInfo.carWayCode" placeholder="请选择" size="small">
                                    <el-option
                                            v-for="item in settedRoadList"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </p>
                            <li class="li c">1.压线</li>
                            <li class="li c">2.变道</li>
                            <li class="li c">3.闯红灯</li>
                        </ul>
                    </div>
                </div>
            </v-dialog>
        </div>
    </div>

</template>

<script>
    const configOptions = [
        {label: '1.压线', id: '1'},
        {label: '2.变道', id: '2'},
        {label: '3.闯红灯', id: '3'},
        {label: '4.不按导向形式', id: '4'},
        {label: '5.不礼让行人', id: '5'}
    ];
    const labeledAction = [
        {label: '闯红灯', icon: 'run-red-lights'},
        {label: '未按导向形式', icon: 'error-flow'},
        {label: '压线', icon: 'pressing-line'},
        {label: '逆行', icon: 'opposite-direction'},
        {label: '未礼让行人', icon: 'un-comity-person'}
    ];

    export default {
        name: 'FeatureConfig',
        props: {
            illegallist: {type: Array, require: true},
            currentPlantDetail: {require: true},
            settedRoadList: {require: true}
        },
        data() {
            return {
                labeledAction: labeledAction, // 已标注违法行为，来源于数据字典
                copyInfo: {
                    deviceCode: '',
                    id: '',
                    carDirectName: '',
                    carWayCode: ''
                },
                configOptions: configOptions
            };
        },
        created() {
        },
        methods: {
            copyDeviceInfo() {
                console.log(this.settedRoadList, 'settedRoadList');
                if (this.currentPlantDetail.id === -1) {
                    this.$message.warning('请选择对应的道路');
                    return;
                }
                this.copyInfo.carWayCode = this.settedRoadList[0];
                this._getDeviceDetail();
                this.$refs.copyDevice.open();
            },
            async _getDeviceDetail() {
                this.$refs.copyDevice.loading();
                let res = await this._services.getDeviceDetail({
                    srcDeviceCode: this.currentPlantDetail.srcDeviceCode,
                    carWayCode: this.copyInfo.carWayCode
                }).finally(()=>{
                    this.$refs.copyDevice.closeLoading();
                });

                if (res.errorCode !== 0) {this.$message.warning(res.message || '未知错误'); return;}
                this.copyInfo = res.data;
            },
            copyConfirm() {
                this.$refs.copyDevice.loading();
                setTimeout(()=>{
                    this.$refs.copyDevice.closeLoading();
                    this.$refs.copyDevice.close();
                },1000);
                console.log('copyConfirm');
            }
        }
    };
</script>

<style lang="less" scoped>
    *{
        box-sizing: border-box;
    }

    @runRedLights:'~@/assets/run-red-lights.png';
    @errorFlow:'~@/assets/error-flow.png';
    @pressingLine:'~@/assets/pressing-line.png';
    @oppositeDirection:'~@/assets/opposite-direction.png';
    @unComityPerson:'~@/assets/un-comity-person.png';

    .run-red-lights{
        background: url(@runRedLights) no-repeat center/cover;
    }
    .error-flow{
        background: url(@errorFlow) no-repeat center/cover;
    }
    .pressing-line{
        background: url(@pressingLine) no-repeat center/cover;
    }
    .opposite-direction{
        background: url(@oppositeDirection) no-repeat center/cover;
    }
    .un-comity-person{
        background: url(@unComityPerson) no-repeat center/cover;
    }

.featrue-config{
    text-align: left;
    overflow: hidden;
    width: 1100px;
    .feature-left{
        width:750px;
        padding-top:12px;
        padding-left:20px;
        background: #fff;
        .top{
            margin-bottom: 45-20px;
            .sign-text{
                font-size:14px;
                color:#738293;
            }
            .copy{
                font-size:12px;
                margin-right:16px;
                color:#18a5d6;
                &:hover{
                    cursor: pointer;
                }
                i{
                    vertical-align: middle;

                }
                .copy-text{
                    border-bottom:1px solid #18a5d6;
                    padding:2px 0;
                    margin:0 4px;
                    color:#a7b2bc;
                    vertical-align: middle;
                }
            }
            i{
                font-size:14px;
            }
        }
        .choose{
            overflow: hidden;
            margin-bottom: 45-20px;
            li{
                width:116px;height:116px;
                border:1px solid #96a1ae;
                float: left;
                border-radius: 12px;
                text-align: center;
                margin-right: 18px;
                overflow: hidden;
                .choose-icon{
                    margin-top:22px;
                    margin-bottom: 14px;
                    i{
                        font-size:44px;
                        color:#738293;
                        display: inline-block;
                        width:44px;
                        height:44px;
                    }
                }
                .text{
                    color: #3e3a39;
                    font-size:14px;
                }
            }
        }
    }
    .feature-right{
        width:330px;
        padding-top:18px;
        padding-left: 22px;
        background: #fff;
        margin-left:8px;
        .title{
            color:#738293;
            font-size:14px;
            margin-bottom: 12px;
        }
        .box{
            overflow-y: scroll;
            height:170-20px;
            li{
                height:34px;
                line-height: 34px;
                font-size:14px;
                text-indent: 16px;
                &:hover{
                    border-left:4px solid #18a5d6;
                }
            }
            li:nth-of-type(odd){
                background: #f9f9f9;
            }
            li:nth-of-type(even){
                background: #fff;
            }
        }
    }
}
</style>
<style lang="less" scoped>
    .copy-device-content{
        padding: 32px 40px;
        min-width:1292px;
        .detail-box{
            display: inline-block;
            width:600px;
            border: 1px solid #e6eaee;
            vertical-align: top;
            .detail-box-title{
                padding:0 18px;
                font-size:14px;
                line-height:32px;
                color:#060e1e;
                border-radius: 2px;
                span{
                    margin-right:24px;
                }
                span:last-child{
                    margin-right:0;
                }
            }
            .dialog-img{
                text-align: center;height:316px;
                img{
                    height:316px;
                    vertical-align: middle;
                }
            }
        }
        .detail-box-left{
            margin-right:6px;
        }
        .device-top-wrapper{
            margin-bottom:10px;
        }
        .device-bottom-wrapper{
            margin-bottom:40px;
            .config-box-left{
                margin-right:6px;
            }
            .config-box{
                display: inline-block;
                vertical-align: top;
                width:600px;
                border: 1px solid #e6eaee;
                .config-box-title{
                    line-height:40px;
                    font-size:14px;
                    color:#7f8fa4;
                    padding-left:25px;
                    background: #f5f8fa;
                    border-bottom:1px solid #e6eaee;
                    i{
                        margin:0 2px;
                        color:#18a5d6;
                    }
                    .el-select{
                        width:230px;
                        margin-left:100px;
                    }
                }
                .config-box-title.c{
                    color:#333c48
                }
                .li{
                    line-height:40px;
                    font-size:14px;
                    height:40px;
                    text-indent: 120px;
                    color:#333c48;
                }
                .li:nth-of-type(odd){
                    background: #f9f9f9;
                }
                .li:nth-of-type(even){
                    background: #fff;
                }
                .li.c{
                    color:#7f8fa4;
                }

            }
        }
    }
</style>
