<template>
  <div class="comment">
    <v-header title="评价" :touchFeel="{color:'#626368'}" className="header"></v-header>
    <div class="media">
      <i class="iconfont icon-jiankang"></i><span>{{product_name}}</span>
    </div>
    <div class="area">
       <textarea placeholder="产品满足您的期待吗？说说你的心得，分享给想买它的朋友吧！点此输入评论~"
                 v-model="content"
       >
      </textarea>
      <div class="tip">{{num}}/150</div>
    </div>
    <div class="btn" @click="submit">发表评论</div>
  </div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import { cmnServiceProductCommentCreate } from '../../assets/js/api';
  export default {
    data(){
    	return{
				content:'',
        num:0,
				product_id:this.$route.query.product_id*1,
				price_id:this.$route.query.price_id*1,
				product_name:this.$route.query.product_name,
      }
    },
    watch:{
			content(val){
				if(val.length>150){
					Toast({message: '评论不能超过150个字！', position:'bottom'});
					this.content = val.substring(0,150);
        }
				this.num = this.content.length;
      }
    },
    methods:{
			async submit(){
				if(!this.content){
					Toast({message:'请填写评论！'});
          return
        }
        let res = await cmnServiceProductCommentCreate({product_id:this.product_id,price_id:this.price_id,content:this.content});
				if(res.err_code === 0){
					Toast({message:'评论成功',position:'bottom'});
					let timer = setTimeout(()=>{
						this.$router.go(-1);
						clearTimeout(timer)
          },2000);
        }else{
					Toast({message:res.err_msg || '未知错误',position:'bottom'})
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .header{
    background: #424348 !important;
    color: #fff !important;
  }
  .comment{
    background: #eee;
  }
  .media{
    margin-top: pxToRem(20);
    padding: 0 pxToRem(20);
    height: pxToRem(100);
    display: flex;
    align-items: center;
    background: #fff;
    @include border-1px('bottom');
    i{
      font-size: pxToRem(50);
      color: $blue;
      margin-right: pxToRem(20);
    }
  }
  .area{
    font-size: 0;
    background: #fff;
    @include border-1px('bottom');
    textarea{
      width: 100%;
      height: pxToRem(300);
      overflow: auto;
      border: none;
      resize:none;
      padding: pxToRem(20) pxToRem(40);
      box-sizing: border-box;
      font-size: pxToRem(30);
      outline: none;
    }
    .tip{
      color: #999;
      text-align: right;
      font-size: pxToRem(30);
      padding: 0 pxToRem(20) pxToRem(20);
    }
  }
  .btn{
    margin: pxToRem(100) pxToRem(30);
    border-radius: pxToRem(16);
    background: $blue;
    color: #fff;
    text-align: center;
    height: pxToRem(100);
    line-height: pxToRem(100);
    font-size: pxToRem(40);
  }
</style>