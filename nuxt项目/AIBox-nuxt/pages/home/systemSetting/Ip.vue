<template>
  <fill-content ref="fillContent" :title="$t('menu.net.ip')" class-name="ip-page">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane :label="$t('ip.wanTitle1')" name="first">
        <div :class="$i18n.locale" class="ip-setting">
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.devname') }}：</span>
            <el-input v-model.trim="ipInfo.devname"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.ipv6') }}：</span>
            <el-input v-model.trim="ipInfo.v6" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.model') }}：</span>
            <el-input v-model.trim="ipInfo.model" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.v6mask') }}：</span>
            <el-input v-model.trim="ipInfo.v6Mask" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.ipv4') }}：</span>
            <el-input v-model.trim="ipInfo.ipv4ip"></el-input>
          </div>
          <!--<div class="ip-cell">-->
            <!--<span class="ip-label f14">DNS：</span>-->
            <!--<el-input v-model.trim="ipInfo.dns"></el-input>-->
          <!--</div>-->
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.v4mask') }}：</span>
            <el-input v-model.trim="ipInfo.ipv4mask"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.mac') }}：</span>
            <el-input v-model.trim="ipInfo.mac" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.v4gateway') }}：</span>
            <el-input v-model.trim="ipInfo.ipv4gateway"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.mtu') }}：</span>
            <el-input v-model.trim="ipInfo.mtu"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('ip.wanTitle2')" name="second">
        <div :class="$i18n.locale" class="ip-setting">
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.devname') }}：</span>
            <el-input v-model.trim="ipInfo.devname"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.ipv6') }}：</span>
            <el-input v-model.trim="ipInfo.v6" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.model') }}：</span>
            <el-input v-model.trim="ipInfo.model" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.v6mask') }}：</span>
            <el-input v-model.trim="ipInfo.v6Mask" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.ipv4') }}：</span>
            <el-input v-model.trim="ipInfo.ipv4ip"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.dns') }}：</span>
            <el-input v-model.trim="ipInfo.dns"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.v4mask') }}：</span>
            <el-input v-model.trim="ipInfo.ipv4mask"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.mac') }}：</span>
            <el-input v-model.trim="ipInfo.mac" disabled></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.v4gateway') }}：</span>
            <el-input v-model.trim="ipInfo.ipv4gateway"></el-input>
          </div>
          <div class="ip-cell">
            <span class="ip-label f14">{{ $t('ip.mtu') }}：</span>
            <el-input v-model.trim="ipInfo.mtu"></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <p class="btn-wrapper">
      <el-button class="test" @click="testIpInfo">{{ $t('ip.testBtn') }}</el-button>
      <el-button class="save" type="primary" @click="setIpInfo">{{ $t('ip.saveBtn') }}</el-button>
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
          this.$confirm(this.$t('ip.switchTips'), this.$t('confirm.title'), {
            confirmButtonText: this.$t('confirm.confirm'),
            cancelButtonText: this.$t('confirm.cancel'),
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
          devname: this.ipInfo.devname,
          ipv4ip: this.ipInfo.ipv4ip,
          ipv4mask: this.ipInfo.ipv4mask,
          ipv4gateway: this.ipInfo.ipv4gateway
          // dns: this.ipInfo.dns
        }).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.currentRemind = {...this.ipInfo} // 保存之后更新暂存数据
        this.$message.success(res.message)
      },
      async testIpInfo () {
        this.$refs.fillContent.loading()
        let res = await this.$api.setNetwork({
          eth: this.ipInfo.eth,
          ipv4: this.ipInfo.ipv4ip,
          ipv4mask: this.ipInfo.ipv4mask,
          ipv4gateway: this.ipInfo.ipv4gateway
          // dns: this.ipInfo.dns
        }).finally(() => { this.$refs.fillContent && this.$refs.fillContent.closeLoading() })
        this.currentRemind = {...this.ipInfo} // 保存之后更新暂存数据
        this.$message.success(res.message)
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
    .ip-setting.en{
      .ip-cell{
        .ip-label{
          width:134px;
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
         padding:0 80px !important;
       }
     }
   }
  }
</style>
