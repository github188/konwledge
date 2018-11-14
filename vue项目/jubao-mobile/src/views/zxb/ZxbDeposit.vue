<template>
  <div class="zxbDes">
    <v-header title="上传转账凭证"></v-header>
    <div class="main">
      <p>应相关保险公司要求，专线保预交保险需要通过转账方式充值（首次充值最低金额为10000元，后续充值单次2000元以上），请在此处上传转账凭证照片：</p>
      <div class="upload">
        <upload title="上传充值凭证：" :url="$store.state.fileUrl" v-model="imgList" :maxLimit="1"></upload>
      </div>
      <div class="amount">充值金额(元)：<input type="number" placeholder="请输入已充值的金额" v-model="amount"></div>
    </div>
    <div class="foot" @click="next">提交</div>
  </div>
</template>
<script>
  const upload = ()=>import('base/weuiUpload/weuiUpload')
  import {zxbOfflineDepositNew} from '../../assets/js/api'
  import {MessageBox, Indicator, Toast} from 'mint-ui';
  export default {
    components:{
      upload
    },
    data(){
      return{
        imgList:[],
        amount: '',
      }
    },
    methods:{
      async next(){
        if(!this.amount){Toast({message:'请填写充值金额！',position:'bottom'});return}
        if(this.amount<2000){Toast({message:'充值金额最低不得小于2000元！',position:'bottom'});return}
        if(this.imgList.length === 0){Toast({message:'请上传转账凭证！',position:'bottom'});return}
        Indicator.open();
        try{
          let res = await zxbOfflineDepositNew({product_type:1,voucher_urls:this.imgList,amount:this.amount*100});
          Indicator.close();
          if(res.err_code === 0){
            MessageBox({
              confirmButtonText:'好的',
              message: '尊敬的客户，您已成功上传凭证！稍后会收到短信提醒，请关注~',
            }).then(action => {
              if(this.$route.query.orderId){
                this.$router.push({path:"/zxbConfirm",query:{orderId:this.$route.query.orderId}})
              }else{
                this.$router.push("/dashboard")
              }
            });
          }else{
            Toast({message:res.err_msg || '未知错误',position:'bottom'})
          }
        }catch (e){
          Indicator.close();
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .zxbDes{
    background: #eee;
    .main{
      padding: pxToRem(40) pxToRem(25) pxToRem(120) pxToRem(50);
      color: #333;
      font-size: pxToRem(30);
      line-height: pxToRem(36);
      letter-spacing: 0;
      .amount{
        margin-top: pxToRem(40);
        input{
          width: pxToRem(350);
          height: pxToRem(50);
          border-radius: 3px;
          border: 1px solid #999;
          padding: 0 5px;
        }
      }
      .upload{
        margin-top: pxToRem(45);
        .weui-cell{
          padding: 0;
        }
      }
    }
    .foot{
      width: 100%;
      height: pxToRem(100);
      background-color: #06acf9;
      text-align: center;
      font-size: pxToRem(40);
      line-height: pxToRem(100);
      color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
</style>
