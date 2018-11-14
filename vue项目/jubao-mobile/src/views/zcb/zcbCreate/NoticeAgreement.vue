<template>
    <div class="notice-agreement">
      <span>查看</span>
      <span class="blue" @click="openZcbNotice">《不保货物品类详情》</span>
    </div>
</template>

<script>
  import { Indicator, Toast} from 'mint-ui';
  import {zcbAgreementList } from "../../../assets/js/api"
    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {
          openZcbNotice() {
            Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
            zcbAgreementList({
              agreement_id: 5        //主要不保货物提示
            }).then(res => {
              Indicator.close();
              if (res.err_code !== 0) {
                Toast({message: res.err_msg || "未知错误", position: 'bottom'});
                return;
              }
//              this.protocolHtml = res.data[0].content;
//              this.noticeTitle = res.data[0].title;
              this.$emit("showDetail",res)
            });
          },
        }
    }
</script>

<style lang="scss" scoped>
.notice-agreement{
  font-size:pxToRem(26);
  i{float:left;margin-right:pxToRem(10);}
  span{  float:left;  }
}
</style>
