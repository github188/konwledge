<template>
  <div class="zcb h5_wrapper">
    <v-header :title="title" :touchFeel="touchFeel" :style="headerStyle" :backIcon="backIcon" v-if="show"></v-header>
    <div class="content_box" :class="{'bottom-no':!go,'show':!show}">
      <div class="content">
         <iframe ref="iframe" width="100%" name="iframe" :src="src"></iframe>
      </div>
      <div class="zcb_bottom" v-show="go">
        <span class="share_price">￥0.00</span>
        <a :href="'tel:'+phoneNumber" class="phone" v-if="phoneNumber">服务顾问</a>
        <a href="tel:4008059680" class="phone" v-else>客服</a>
        <router-link tag="span" :to="go" class="goCreate" v-touchFeel >立即投保</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import {cmnBizChannelInfo} from 'assets/js/api'
  export default {
    data(){
      return{
        src:'',
        title:'',
        backIcon:'',
        go:'',
        phoneNumber:'',
        alias:'',
        show:true,
				headerStyle:{},
				touchFeel:{color:'#f2f2f2'}
      }
    },
    watch:{
      $route(val,oldVal){
        if(val.fullPath !== oldVal.fullPath)this.init();
      }
    },
    created(){
      this.init();
      this.getSessionData();
      this.getPhone();
    },
    mounted(){
      let ygbLookUp;
      window.frames['iframe'].addEventListener('load',() =>{
        let windowIframe = window.frames['iframe'];
        this.$refs.iframe.height = windowIframe.document.body.offsetHeight;
        ygbLookUp = windowIframe.document.getElementsByClassName('h5_ygbLookUp')[0];
        if(ygbLookUp){
          ygbLookUp.addEventListener('click',()=>{
            let caseIndex = ygbLookUp.getAttribute('data-caseIndex');
            this.$router.push({path:'/ygbLookUp',query:{caseIndex}})
          })
        }
        if(this.$route.name === 'axjkx')this.axjkxEvent(windowIframe);
      })
    },
    methods:{
      getSessionData(){
        let query = this.$getStorage("locationQuery");
        if(query && query.alias){
          this.alias = query.alias
        }
      },
      getPhone(){
        if(!this.alias)return;
        cmnBizChannelInfo({alias:this.alias}).then((res)=> {
          if(res.err_code === 0){
            console.log(res.data.mobile,'mobile')
            this.phoneNumber = res.data.mobile
          }
        })
      },
      init(){
        this.backIcon = 'icon-fanhui';
        this.go='';
        switch (this.$route.name){
          case 'zcb' :
            this.src = './vueStatic/share/zcb.html';
            this.title = '整车保';
            this.go = '/zcbCreate';
            break;
          case 'ygb' :
            this.src = './vueStatic/share/ygb.html';
            this.title = '员工保';
            this.go = '/ygbCreate';
            break;
          case 'spb' :
            this.src = './vueStatic/share/spb.html';
            this.title = '商铺档口火灾保';
            this.go = '/spbCreate';
            break;
          case 'hwb' :
            this.src = './vueStatic/share/hwb.html';
            this.title = '大宗货物保';
            this.go = '/hwbCreate';
            break;
          case 'llb' :
            this.src = './vueStatic/share/llb.html';
            this.title = '冷链保';
            this.go = '/llbCreate';
            break;
          case 'phb' :
            this.src = './vueStatic/share/phb.html';
            this.title = '普货保--特惠版';
            this.go = '/phbCreate';
            break;
          case 'hcb' :
            this.src = './vueStatic/share/hcb.html';
            this.title = '货车重大事故保';
            this.go = '/hcbCreate';
            break;
          case 'dchynb' :
            this.src = './vueStatic/share/dchynb.html';
            this.title = '定车货运年保';
            this.go = '/dchynbCreate';
            break;
          case 'zxb' :
            this.src = './vueStatic/share/zxb.html';
            this.title = '专线保';
            this.go = '/zxbCreate';
            break;
          case 'wnb' :
            this.src = './vueStatic/share/wnb.html';
            this.title = '预约货运万能保';
            this.go = '/home';
            break;
          case 'axjkx':
						this.src = './vueStatic/share/axjkx.html';
						this.title = '安享一生癌症医疗险';
						this.headerStyle = {
							background : '#424348',
              color:'#fff'
            };
						this.touchFeel = {
							color:'#626368'
            };
          	break;
        }
      },
      axjkxEvent(windowIframe){
      	let htmlNext = windowIframe.document.getElementsByClassName('html_next')[0];
      	let htmlDetail = windowIframe.document.getElementsByClassName('html_detail')[0];
				htmlNext && htmlNext.addEventListener('click',()=>{
					this.$router.push('/axjkxCreate')
        });
				htmlDetail && htmlDetail.addEventListener('click',()=>{
					this.$router.push('/userComment')
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .content_box{
    background: #fff;
    .content{font-size: 0;}
  }
  .bottom-no{
    bottom: 0 !important;
  }
  .show{
    top:0 !important;
    bottom:0 !important;
  }
  iframe{
    min-height: 100%;
  }
  .zcb_bottom{
    height:pxToRem(100);display: flex;
    span{
      flex:1;display: flex;justify-content: center;align-items: center;font-size:pxToRem(36);
      &.share_price{
        color:red;
      }
      &.goCreate{
        background: #06acf9;color:#fff;
      }
    }
    a{
      flex:1;display: flex;justify-content: center;align-items: center;font-size:pxToRem(36);color:#fff;background: #04bc32;
    }
  }
</style>
