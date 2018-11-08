<template>
  <fill-content ref="fillContent" title="IP设置" class-name="ip-page">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="网口1设置" name="first">
        <div class="ip-setting">
          <div class="ip-cell">
            <span class="ip-label f14">设备名称：</span>
            <el-input v-model.trim="ipInfo.devname"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv6地址：</span>
            <el-input v-model.trim="ipInfo.v6" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">设备型号：</span>
            <el-input v-model.trim="ipInfo.model" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv6子网掩码：</span>
            <el-input v-model.trim="ipInfo.v6Mask" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv4地址：</span>
            <el-input v-model.trim="ipInfo.ipv4ip"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">DNS：</span>
            <el-input v-model.trim="ipInfo.dns"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv4子网掩码：</span>
            <el-input v-model.trim="ipInfo.ipv4mask"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">MAC地址：</span>
            <el-input v-model.trim="ipInfo.mac" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv4网关：</span>
            <el-input v-model.trim="ipInfo.ipv4gateway"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">MTU：</span>
            <el-input v-model.trim="ipInfo.mtu"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="网口2设置" name="second">
        <div class="ip-setting">
          <div class="ip-cell">
            <span class="ip-label f14">设备名称：</span>
            <el-input v-model.trim="ipInfo.devname"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv6地址：</span>
            <el-input v-model.trim="ipInfo.v6" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">设备型号：</span>
            <el-input v-model.trim="ipInfo.model" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv6子网掩码：</span>
            <el-input v-model.trim="ipInfo.v6Mask" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv4地址：</span>
            <el-input v-model.trim="ipInfo.ipv4ip"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">DNS：</span>
            <el-input v-model.trim="ipInfo.dns"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv4子网掩码：</span>
            <el-input v-model.trim="ipInfo.ipv4Mask"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">MAC地址：</span>
            <el-input v-model.trim="ipInfo.mac" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">IPv4网关：</span>
            <el-input v-model.trim="ipInfo.ipv4gateway"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">MTU：</span>
            <el-input v-model.trim="ipInfo.mtu"></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <p class="btn-wrapper">
      <el-button class="test" @click="testIpInfo">测试</el-button>
      <el-button class="save" type="primary" @click="setIpInfo">保存</el-button>
    </p>
  </fill-content>
</template>

<script>
  export default {
    name: 'Ip',
    data () {
      return {
        activeName: 'first',
        ipInfo: {
          eth: '',
          devname: '',
          v6: '',
          model: '',
          v6Mask: '',
          ipv4ip: '',
          dns: '',
          ipv4mask: '',
          mac: '',
          ipv4gateway: '',
          mtu: ''
        },
        currentRemind: ''
      }
    },
    mounted () {
      this._getIpInfo('1')
    },
    methods: {
      updateRemind (res) {
        this.currentRemind = {...res.data} // 存入印象，作为后续对比的副本
        this.ipInfo = {...res.data}
      },
      async _getIpInfo (type) {
        this.$refs.fillContent.loading()
        let res = await this.$api.getNetwork({eth: type}).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.updateRemind(res)
      },
      async handleTabClick (oVal) {
        if (JSON.stringify(this.currentRemind) === JSON.stringify(this.ipInfo)) {
          // console.log('无修改')
          this._getIpInfo(this.activeName === 'first' ? '1' : '2')
        } else {
          // console.log('有修改')
          this.$confirm('信息还未保存，确定离开?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(res => {
            this._getIpInfo(this.activeName === 'first' ? '1' : '2')
          }).catch(() => {
            this.activeName = this.activeName === 'first' ? 'second' : 'first'
          })
        }
      },
      async setIpInfo () {
        this.$refs.fillContent.loading()
        let res = await this.$api.setNetwork({
          eth: this.ipInfo.eth,
          ipv4: this.ipInfo.ipv4ip,
          ipv4mask: this.ipInfo.ipv4mask,
          ipv4gateway: this.ipInfo.ipv4gateway,
          dns: this.ipInfo.dns
        }).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.currentRemind = {...this.ipInfo} // 保存之后更新暂存数据
        this.$message.success(res.message || '设置成功')
      },
      async testIpInfo () {
        this.$refs.fillContent.loading()
        let res = await this.$api.setNetwork({
          eth: this.ipInfo.eth,
          ipv4: this.ipInfo.ipv4ip,
          ipv4mask: this.ipInfo.ipv4mask,
          ipv4gateway: this.ipInfo.ipv4gateway,
          dns: this.ipInfo.dns
        }).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.currentRemind = {...this.ipInfo} // 保存之后更新暂存数据
        this.$message.success(res.message || '设置成功')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ip-page {
    margin-bottom:60px;
    .ip-setting{
      .ip-cell{
        display: inline-block;
        height:40px;
        margin-bottom: 30px;
        .ip-label{
          display: inline-block;
          width:114px;
          margin:0 20px;
          height: 40px;
          color:$fontGrayColor;
          text-align:center;
          line-height: 40px;
        }
        .el-input{
          width:330px;
        }
      }
    }
    .btn-wrapper{
      padding-left:420px;
      .el-button{
        padding:12px 35px;
      }
      .test{
        margin-right: 36px;
      }
      .save{

      }
    }
  }
</style>
<style lang="scss">
  .ip-page{
    .main{
      width:100% !important;
      margin:0 !important;
      min-width:1164px;
    }
   .el-tabs{
     box-shadow: none;
     border-bottom: none;
     margin-bottom: 75px;
     .el-tabs__nav{
       .el-tabs__item{
         padding:0 80px;
       }
     }
   }
  }
</style>
