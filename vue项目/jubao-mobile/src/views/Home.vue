<template>
  <div class="home">
    <div class="header">
      <div class="header-l" @click="toUser" v-touchFeel="{color:'#f2f2f2'}">
        <i class="iconfont icon-gerenzhongxinzhuyegerenziliao"></i>
      </div>
      <div class="header-title">
        首页
      </div>
      <div class="header-r" v-touchFeel="{color:'#f2f2f2'}">
        <a href="tel:4008059680"><i class="iconfont icon-dianhua"></i></a>
      </div>
    </div>
    <div class="content_box">
      <div class="content">
        <div class="banner" ref="banner">
          <swipe :auto="4000">
            <swipe-item class="item" v-for="(item,index) in banner" :key="index">
              <a class="item-a" :href="item.target_url"><img :src="item.image_url"/></a>
            </swipe-item>
          </swipe>
        </div>
        <div class="center">
          <div class="center-title fns16">
            精研产品
          </div>
          <div class="media" v-for="(val,idx) in productList">
            <router-link :to="val.productLink">
              <img class="media-pic" :src="val.image_url" alt="">
            </router-link>
            <div class="media-foot">
              <div class="price red fns14">￥<span class="fns18">{{val.min_premium}}</span>.00 <span class="glay">起</span></div>
              <router-link class="btn" :to="val.createLink" tag="span" v-touchFeel="{textColor:'#fff',color:'#06acf9'}">立即投保</router-link>
              <router-link class="btn" :to="token?val.ordersLink:'/login'" tag="span" v-touchFeel="{textColor:'#fff',color:'#06acf9'}">我的保单</router-link>
              <router-link class="btn" :to="val.productLink" tag="span" v-touchFeel="{textColor:'#fff',color:'#06acf9'}">了解详情</router-link>
            </div>
          </div>
          <div class="media" v-wwwNone>
            <router-link to="/axjkx">
              <img class="media-pic" src="../assets/img/home/axjkx-banner-v3.jpg" alt="">
            </router-link>
            <div class="media-foot">
              <div class="price red fns14">￥<span class="fns18">50</span>.00 <span class="glay">起</span></div>
              <router-link class="btn" to="/axjkxCreate" tag="span" v-touchFeel="{textColor:'#fff',color:'#06acf9'}">立即投保</router-link>
              <router-link class="btn" :to="token?'/axjkxOrders?type=unpaid':'/login'" tag="span" v-touchFeel="{textColor:'#fff',color:'#06acf9'}">我的保单</router-link>
              <router-link class="btn" to="/axjkx" tag="span" v-touchFeel="{textColor:'#fff',color:'#06acf9'}">了解详情</router-link>
            </div>
          </div>
          <div class="article">
            <router-link to="/article" class="art-title fns16" tag="span">
              理赔案例
              <span class="fns14">更多 <i class="iconfont icon-right"></i></span>
            </router-link>
            <router-link to="/artDetail/123" class="fs0">
              <img class="media-pic" v-lazy="require('../assets/img/home/picl-v3.jpg')" alt="">
            </router-link>
            <router-link to="/artDetail/122" class="art-mes">
              <p>协助物流企业保险事故索赔之老周夜奔记</p>
              <p class="art-alt">4623阅读量</p>
            </router-link>
            <router-link to="/artDetail/124" class="art-mes">
              <p>聚保协赔 | “天价”施救费，聚保帮你追回来！</p>
              <p class="art-alt">1356阅读量</p>
            </router-link>
          </div>
          <div class="article">
            <router-link to="/article" class="art-title fns16" tag="span">
              老周解密
              <span class="fns14">更多 <i class="iconfont icon-right"></i></span>
            </router-link>
            <router-link to="/artDetail/135" class="fs0">
              <img class="media-pic" v-lazy="require('../assets/img/home/picr-v3.jpg')" alt="">
            </router-link>
            <router-link to="/artDetail/132" class="art-mes">
              <p>“双11”面对用工风险的变化，咱们的保险该如何调整以保障万全？</p>
              <p class="art-alt">2265阅读量</p>
            </router-link>
            <router-link to="/artDetail/133" class="art-mes">
              <p>“双11”面对仓储风险的变化，咱们的保险该如何调整以保障万全？</p>
              <p class="art-alt">3576阅读量</p>
            </router-link>
          </div>
        </div>
      </div>
      <tab></tab>
    </div>

  </div>
</template>

<script>
  import { wwwCheck } from '../assets/js/common'
  import Tab from 'views/components/Tab'
  import FontLun from 'base/fontLun/FontLun'
  import { getToken,cmnBizBannerList,cmnAppServicedproductList,cmnProductList } from "../assets/js/api"
  import { Swipe, SwipeItem } from 'mint-ui';
  import {getProductList} from "../assets/js/SaveToSession"


  const fontmes = [
    {mes:'聚保物流保险平台欢迎您！'},
    {mes:'聚保——守护3000万物流人的幸福生活！'},
    {mes:'因为天天投保  所以货物安全！'}
  ];
  const productList = [
    {product_name:"整车保",productLink:"/zcb",createLink:"/zcbCreate",ordersLink:"/zcbOrders?type=unpaid",image_url:require("../assets/img/home/zcb-banner-v3.jpg"),min_premium:40},
    {product_name:"员工保",productLink:"/ygb",createLink:"/ygbCreate",ordersLink:"/ygbOrders",image_url:require('../assets/img/home/ygb-banner-v3.jpg'),min_premium:160},
    {product_name:"商铺档口火灾保",productLink:"/spb",createLink:"/spbCreate",ordersLink:"/spbOrders",image_url:require('../assets/img/home/spb-banner-v3.jpg'),min_premium:1200},
    {product_name:"大宗货物保",productLink:"/hwb",createLink:"/hwbCreate",ordersLink:"/hwbOrders",image_url:require('../assets/img/home/hwb-banner-v3.jpg'),min_premium:10},
    {product_name:"冷链保",productLink:"llb",createLink:"/llbCreate",ordersLink:"/llbOrders?type=unpaid",image_url:require('../assets/img/home/llb-banner-v3.jpg'),min_premium:30},
    {product_name:"普货保",productLink:"phb",createLink:"/phbCreate",ordersLink:"/phbOrders?type=unpaid",image_url:require('../assets/img/home/phb-banner-v3.jpg'),min_premium:20},
    {product_name:"货车重大事故保",productLink:"hcb",createLink:"/hcbCreate",ordersLink:"/hcbOrders?type=unpaid",image_url:require('../assets/img/home/hcb-banner-v3.jpg'),min_premium:1200},
    {product_name:"定车货运年保",productLink:"dchynb",createLink:"/dchynbCreate",ordersLink:"/dchynbOrders?type=unpaid",image_url:require('../assets/img/home/dchynb-banner-v3.jpg'),min_premium:1500},
    {product_name:"专线保",productLink:"zxb",createLink:"/zxbCreate",ordersLink:"/zxbOrders?type=unpaid",image_url:require('../assets/img/home/zxb-banner-v3.jpg'),min_premium:35}
  ];

//  export const idToName = {
//    2:"zcb",
//    4:"ygb",
//    16:"spb",
//    32:"phb",
//    512:"llb",
//    1024:"hwb",
//    8192:"hcb",
//    16384:"dchynb",
//    32768:"hyx",
//    131072:"zxb"
//  };

  export default {
    components:{
      Tab,
      FontLun,
      Swipe,
      SwipeItem
    },
    data (){
      return {
        banner : [],
        fontmes,
        productList:[]
      }
    },
    methods: {
      token(){
        return getToken();
      },
      toUser() {
        if(getToken()){
          this.$router.push("/dashboard")
        }else{
          this.$router.push("/login")
        }
      },
      getBanner(){
        cmnBizBannerList({show_type: 2}).then(res =>{
          if(res.err_code === 0){
            this.banner = res.rows;
          }
        })
      },
      async _showProductList(){
        try{
          let res = this.$getStorage("productList") || await cmnAppServicedproductList({app_id:1,os_type:8});
          if(res.err_code!==0){	Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
          this.productList=res.rows.map((val,idx)=>{
            productList.some((value,idx)=>{
              if(value.product_name===val.product_name){
                val.productLink=value.productLink;
                val.createLink=value.createLink;
                val.ordersLink=value.ordersLink;
                return true ;
              }
            });
            return val
          })
        }catch (err){
          console.log(err)
        }
      },
    },
    created(){
      this.getBanner();
      this._showProductList();//获取产品列表

    },
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/home/home";
</style>
