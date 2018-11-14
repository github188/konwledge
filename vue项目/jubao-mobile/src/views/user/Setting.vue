<template>
  <div class="setting">
    <v-header title="设置"></v-header>
    <div class="setting_box">
      <router-link :to="val.link" tag="div" class="u_setting_item" v-for="(val,idx) in setingList" :key="idx" @click.native="clickNative(val)" v-touchFeel="{color:'#f2f2f2'}">
        <div>
          <i class="iconfont" :class="val.iconfont"></i>&nbsp;&nbsp;<span v-text="val.text"></span>
        </div>
        <span class="undo" v-if="val.undo">未完善</span>
        <div class="icon_box">
          <i class="iconfont icon-right"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Indicator} from 'mint-ui';
  import {delCookie, cookieName} from "../../assets/js/common";
  import {cmnCompanyInfo,cmnUserInfo,cmnUseraddressList} from '../../assets/js/api'

  export default {
    data() {
      return {
        setingList: [
          {link: "/setCompanyName", iconfont: "icon-home", text: "公司名称",undo:false},
          {link: "/setTel", iconfont: "icon-ico-user-info1", text: "手机号"},
          {link: "/recovery", iconfont: "icon-lurudingdan", text: "修改登录密码"},
          {link: "/setPayPassword", iconfont: "icon-mima", text: "修改支付密码"},
          {link: "/setEmail", iconfont: "icon-youxiang", text: "邮箱",undo:false},
          {link: "/setAddress", iconfont: "icon-dizhi", text: "地址管理",undo:false},
          {link: "/invoicePage", iconfont: "icon-fapiao", text: "发票管理",undo:false},
          {link: "", iconfont: "icon-tuichu", text: "安全退出"}
        ]
      }
    },
    created() {
      Indicator.open();
      this.init().then(() => {
        Indicator.close()
      });
    },
    methods: {
      async init() {
        let res = await Promise.all([cmnCompanyInfo(),cmnUserInfo(),cmnUseraddressList()]);
        //公司信息
        if(res[0].err_code === 0){
          let data = res[0].data;
          console.log(data,111)
          if(!data.name){
            this.setingList[0].undo = true;
          }
          if(!data.name || !data.tax_address || !data.license_no || !data.tax_bank || !data.tax_bank_no || !data.tax_mobile){
            this.setingList[6].undo = true;
          }
        }else if(res[0].err_code === 1200){
          this.setingList[0].undo = true;
          this.setingList[6].undo = true;
        }
        //用户信息 邮箱
        if(res[1].err_code === 0){
          if(!res[1].data.email){
            this.setingList[4].undo = true;
          }
        }
        //邮寄地址
        if(res[2].err_code === 0 && res[2].rows.length <1){
          this.setingList[5].undo = true;
        }
      },
      clickNative(val) {
        if (val.text === '安全退出') {
          this.signOut();
        }
      },
      signOut() {
        MessageBox.confirm('确定退出登录?').then(action => {
          delCookie(cookieName);
          this.$router.push("/");
        }).catch(err => {
        })
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .setting {
    height: 100%;
    background: #fff;

    .setting_box {
      @include border-1px('top');
      margin-bottom: pxToRem(50);
      background-color: #fff;

      .u_setting_main, .u_setting_item {
        @include vc-hc(pxToRem(90), space-between);
        @include border-1px('bottom');
        padding: 0 pxToRem(20) 0 pxToRem(38);
        position: relative;
        * {
          font-size: pxToRem(28);
        }

        i {
          font-size: pxToRem(40);
          color: #333;
        }

      }
      .undo{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right: pxToRem(80);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: pxToRem(4) 0 pxToRem(2);
        font-size: pxToRem(16);
        width: pxToRem(60);
        border: 1px solid red;
        box-sizing: border-box;
        color: red;
        border-radius: pxToRem(5);
      }
    }
  }

</style>

