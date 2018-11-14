<template>
  <div class="risk">
      <div class="all">
        <v-header class="header" :title="title" backIcon="icon-cancel" :touchFeel="{color:'#aaa'}"></v-header>
        <div class="main">
          <div class="content" v-html="html">
            网络不佳，暂无数据~
          </div>
          <!--<div class="code">-->
            <!--<div>请填写 统一社会信用代码：</div>-->
            <!--<input type="text" v-model="license_no">-->
          <!--</div>-->
        </div>
        <div class="bottom" @click="next"  v-touchFeel><span>我知道了</span></div>
      </div>
  </div>

</template>

<script>
  import {MessageBox, Indicator, Toast} from 'mint-ui';
  import {zxbAgreementList,zxbAgreementSign} from '../../assets/js/api'
  export default {
    data() {
      return {
        html:'',
        title:'',
//        license_no:'',
        id:'',
      }
    },
    created() {
      this.init();
    },
    methods: {
      async init(){
        let res = await zxbAgreementList();
        if(res.err_code !== 0){Toast({message: res.err_msg || "未知错误", position: 'bottom'});return}
        this.html = res.rows[0].content;
        this.title = res.rows[0].title;
        this.id = res.rows[0].id;
      },
      async next(){
//        if(!this.license_no){Toast({message: '请填写统一社会信用代码', position: 'bottom'});return}
//        if(!this.$store.state.reg_tax_no.test(this.license_no)){Toast({message: '统一社会信用代码格式有误', position: 'bottom'});return}
        Indicator.open();
        let data = {agreement_id:this.id};
        let query = this.$getStorage("locationQuery");
        if(query && query.alias){
          data.alias = query.alias
        }
        try{
          let res = await zxbAgreementSign(data);
          Indicator.close();
          if(res.err_code !== 0){Toast({message: res.err_msg || "未知错误", position: 'bottom'});return}
          this.$router.push(this.$store.state.routerFrom.fullPath)
        }catch (e){
          Indicator.close();
        }
      }
    },
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .all{
    position:fixed;left:0;top:0;bottom:0;right:0;overflow-y: scroll;
    z-index: 21;
    background: #fff;
    .header{
      background: #fff;position:fixed;
    }
    .main{
      min-height: 100%;
      _height:100%;
      background: #f2fbff;
    }
    .code{
      font-size: pxToRem(30);
      line-height: pxToRem(36);
      padding:pxToRem(20) pxToRem(45) pxToRem(220);
      input{
        width: pxToRem(618);
        height: pxToRem(75);
        padding: 0 pxToRem(20);
        background: #fff;
        border-radius: pxToRem(5);
        font-size: pxToRem(40);
        margin-top: pxToRem(24);
      }
    }
    .content{
      padding:pxToRem(110) pxToRem(20) pxToRem(120);
    }
    .bottom {
      margin-top: pxToRem(-100);
      width: 100%;
      height: pxToRem(100);
      background-color: #06acf9;
      text-align: center;
      line-height: pxToRem(100);
      span {
        font-size: pxToRem(40);
        line-height: pxToRem(36);
        color: #ffffff;
      }
    }
  }
</style>
