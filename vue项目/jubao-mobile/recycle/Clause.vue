<template>
  <div class="clause">
    <v-header :title="title" backIcon="icon-cancel"></v-header>
    <div class="content" v-html="content"></div>
    <router-link :to="$store.state.backUrl" class="blue_bg know" tag="div">我知道了</router-link>
  </div>
</template>

<script>
  import { cmnAdminAgreementInfo } from 'assets/js/api';
  import { Toast,Indicator } from 'mint-ui';
  export default {
    data(){
      return {
        id:this.$route.query.id,
        title:'',
        content: "",
      }
    },
    created(){
      Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
      cmnAdminAgreementInfo({id:this.id}).then( res => {
        Indicator.close();
        if(res.err_code === 0){
          this.title = res.data.title;
          this.content = res.data.content;
        }else{
          Toast({message:res.err_msg||"未知错误！",position:'bottom'})
        }
      }).catch(()=>{
        Indicator.close()
      })
    }
  }
</script>

<style lang="scss" scoped>
  .clause{padding-top: pxToRem(80)}
  .content { width: 90%; margin: 0 auto; padding-bottom: pxToRem(80); padding-top: pxToRem(20);}
  .know{height: pxToRem(80);line-height: pxToRem(80);text-align: center;font-size: pxToRem(36);}
  .header { @include border-1px('bottom');position: fixed !important; top: 0; left: 0; right: 0;}
</style>
