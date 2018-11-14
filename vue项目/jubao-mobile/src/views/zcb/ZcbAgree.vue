<template>
  <div class="agreement">


      <div v-for="(val,idx) in agreementList" v-show="pageCount===idx">
        <!--<div class="content_wrap" v-show="pageCount===idx">-->
          <!--<sub-head @back="back" :title="val.title" backIconfont="icon-cancel" ></sub-head>-->
          <v-header @back="back" :title="val.title" backIcon="icon-cancel" :routerLinkMode="false"></v-header>
        <div class="header_repeat"></div>
          <div v-html="val.content" class="content"></div>
          <div class="bottom" @click="agree(val.id)" v-touchFeel>
            <span>我知道了</span>
          </div>
        <!--</div>-->
      </div>

  </div>
</template>

<script>
  import {zcbAgreementSign,zcbAgreementList} from "../../assets/js/api"
  import { Toast,Indicator,MessageBox  } from 'mint-ui';

  export default {
    data(){
      return {
        agreementList:[],
        pageCount:0,//控制页面显示，从0开始 0 1 2 3
        zcbAgree:false,
      }
    },
    computed: {

    },
    beforeRouteEnter(to,from ,next){
      next(vm=>{
        Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
        zcbAgreementList({unsigned_only:true}).then((res)=>{
          Indicator.close();
          console.log(res.data);
          vm.agreementList=res.data|| []
        })
      })
    },
    created(){
      //顺序为  "17==主要保险条件提示" "14==主要保障范围提示" "11==主要不赔事项提示" "5==主要不保货物提示"  "2==整车保协议"
    },
    methods: {
      translitionProps(id){
        return this.pageCount===id
      },
      agree(id){
        console.log(id,"协议id");
        console.log(this.pageCount,"下一页页面页码");
        Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
        let data = {agreement_id: id};
        if(JSON.stringify(window.sessionStorage.getItem("jubao56")).includes("alias")){ // 处理专属链接工号
          data.alias = JSON.parse(window.sessionStorage.getItem("jubao56")).registerDefault.alias;
        }
        zcbAgreementSign(data).then((res)=>{
          Indicator.close();
          if(this.pageCount<this.agreementList.length-1){
            this.pageCount++;
          }else{
            this.$router.go(-1);
          }
        })
      },
      back(){
        if(this.pageCount>0){
          this.pageCount--;
        }else{
          MessageBox.confirm('确定要取消协议签署吗?').then(action => {
              this.$router.push("/dashboard")
          }).catch(err=>{})
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .agreement{background: #fff;}
  .header{
    @include border-1px('bottom');
    background: #f0f0f0;
  }

  .content{
    padding: pxToRem(20);
    table{
      max-width: 100% !important;
    }
  }

  .bottom{
    position: fixed;left:0;bottom:0;
    width:100%;  height:pxToRem(100);
    background-color: #06acf9;
    text-align: center;line-height: pxToRem(100);
    span{
      font-size: pxToRem(40);
      line-height: pxToRem(36);
      color: #ffffff;
    }
  }

  .agreement-enter-active, .agreement-leave-active {
    transition: all .3s ease
  }
  .agreement-enter, .agreement-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    transform: translateX(100%);
  }
</style>
