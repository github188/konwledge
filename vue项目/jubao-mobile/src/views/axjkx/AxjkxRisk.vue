<template>
  <div class="risk">
    <transition name="sign-in">
      <div class="all">
        <v-header class="header" :title="title" backIcon="icon-cancel" :touchFeel="{color:'#626368'}" ></v-header>
        <div class="main">
          <div class="content" v-html="html">
          </div>
        </div>
        <div class="bottom">
          <a :href="'tel:'+phoneNum" class="kefu">
            <div>
              <img src="../../assets/img/kefu.jpg" alt="">
              <div>客服顾问</div>
            </div>
          </a>
          <div class="price" @click="back">部分为是</div>
          <div class="next" @click="next">以上全否</div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import {cmnBizChannelInfo,cmnAdminAgreementList} from '../../assets/js/api'
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				title:'被保险人健康告知',
				phoneNum:'4008059680',
				html:""
			}
		},
    created(){
			this.getRisk();
			this.getPhone();
    },
		methods: {
    	async getRisk(){
    		let res = await cmnAdminAgreementList({product_name:'安享一生癌症医疗险',title:this.title});
    		if(res.err_code === 0){
    			this.html = res.rows[0] && res.rows[0].content;
        }else{
    			this.html = res.err_msg || '网络不佳！'
        }
      },
			async getPhone(){
				let query = this.$getStorage("locationQuery");
				if(query && query.alias){
					let alias = query.alias;
					let res = await cmnBizChannelInfo({alias});
					if(res.err_code === 0){
						this.phoneNum = res.data.mobile
					}else{
						console.log(res.err_msg)
					}
				}
			},
			next(){
			  this.$router.push('/axjkxCreate')
			},
			back(){
				Toast({message:'健康条件不符，无法投保！',position:'bottom'});
				this.$router.go(-1)
      }
		}
	}
</script>

<style lang="scss" type="text/scss" scoped>
  .sign-in-enter-active,.sign-in-leave-active{
    transition:all .3s ease
  }
  .sign-in-enter,.sign-in-leave-to{
    transform : translateX(100%) ;
  }
  
  .all{
    position:fixed;left:0;top:0;bottom:0;right:0;overflow-y: scroll;
    z-index: 21;
    background: #fff;
    .header{
      background: #424348;position:fixed;
      color: #fff;
    }
    .main{
      min-height: 100%;
      _height:100%;
    }
    .content{
      padding:pxToRem(110) pxToRem(20) pxToRem(120);
    }
    .bottom{
      @include border-1px('top');
      position: fixed !important;
      bottom: 0;
      left: 0;
      right: 0;
      height: pxToRem(100);
      background: #fff;
      display: flex;
      .kefu{
        position: relative;
        width: pxToRem(169);
        display: flex;
        align-items: center;
        justify-content: center;
        &:after{
          content: '';
          position: absolute;
          top: 15%;
          right: 0;
          width: 0;
          height: 70%;
          border-right: 1px solid #ccc;
        }
        div{
          text-align: center;
          img{
            width: pxToRem(53);
            height: pxToRem(53);
          }
          div{
            font-size: pxToRem(14);
            color: #06acf9;
          }
        }
      }
      .price{
        width: pxToRem(290);
        text-align: center;
        line-height: pxToRem(100);
        font-size: pxToRem(40);
      }
      .next{
        width: pxToRem(290);
        text-align: center;
        line-height: pxToRem(100);
        font-size: pxToRem(40);
        color: #fff;
        background: #06acf9;
      }
    }
  }
</style>
