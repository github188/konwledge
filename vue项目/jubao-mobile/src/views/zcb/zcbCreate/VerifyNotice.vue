<template>
  <Dialog cancelBtn="关闭"
          successBtn="不再提醒"
          ref="dialog"
          @success="closeDialog">
    <p class="reachstandard_txt"><b>{{verifyMessage.title}}</b></p>
    <p class="reachstandard_txt">{{verifyMessage.content1}}</p>
    <p class="reachstandard_txt">{{verifyMessage.content2}}</p>
  </Dialog>
</template>

<script>
  import Dialog from '../../../base/dialog/Dialog.vue'
  import {Toast} from 'mint-ui';
  import {zcbReachstandardVerify,zcbReachstandardNoprompt} from "../../../assets/js/api"
  export default {
    components:{
      Dialog
    },
    data() {
      return {
        current_begin_date: "", // 整车保投保验证返回数据
        next_begin_date: "",    // 整车保投保验证返回数据
        notify_code: 0,         // 整车保投保验证返回数据
        statistics_id: "",      // 整车保用户达标情况统计id
      }
    },
    created() {
      let query = this.$route.query;
      if (query.orderId) {

      }else{
        this._initData();
      }
    },
    computed: {
      verifyMessage: function () {
        if (this.notify_code === 1) {
          this.$refs.dialog.open();
          return ({
            title: `尊敬的用户，太平财产保险有限公司根据您的投保理赔数据，将对您投保的整车保产品相关条件予以变更。具体变更如下：`,
            content1: `1.您月均投保单量完全低于整车保产品的最低考核标准（最低月投保单量为25单），保险人将自${this.next_begin_date}起调整您后续投保的保险费率条件，保险费率条件见新的整车保电子协议；`,
            content2: `2.如您在接到本通知${this.current_begin_date}后的30日内投保总单量达到了最低25单的相关标准，且后续仍持续达到上述最低标准的，则您仍可继续享受原优惠费率条件，否则保险人有权通知并提高本产品的保险费率条件。`,
          })
        } else if (this.notify_code === 2) {
          this.$refs.dialog.open();
          return ({
            title: `尊敬的用户，太平财产保险有限公司将对平台整车保产品相关条件予以变更。具体变更如下：`,
            content1: `1.保险公司对于连续两月投保单量低于正常发车规模的投保人，有权提高保险费率，保险费率条件见新的整车保电子协议。`,
            content2: `2.鉴于您已连续两个考核周期未达到整车保月均投保单量最低考核标准（最低月投保单量为25单），保险公司将提高保险费率，具体生效时间为${this.next_begin_date}。`
          })
        }
        ;
        return {}
      }
    },
    methods: {
      async _initData(){   // 录入投保统计信息
        let res = await zcbReachstandardVerify();
        if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
        this.current_begin_date = res.data.current_begin_date.substr(0,11).replace("-","年").replace("-","月").replace("T","日");
        this.next_begin_date = res.data.next_begin_date.substr(0,11).replace("-","年").replace("-","月").replace("T","日");
        this.statistics_id = res.data.id;
        this.notify_code = res.data.notify_code;
      },
      // 关闭dialog并调用不再提示
      closeDialog(){
        zcbReachstandardNoprompt({statistics_id: this.statistics_id}).then(res => {
          if(res.err_code === 0) this.$refs.dialog.close();
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .reachstandard_txt {
    font-size: pxToRem(26);
    padding: 0 pxToRem(10);
  }
</style>
