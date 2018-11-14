<template>
  <div class="spb">
    <v-header title="大宗货物保"></v-header>
    <div class="content_box">
      <div class="content">
        <div class="all">
          <div class="banner">
            <img v-lazy="require('../../assets/img/hwb/hwbBanner.png')" alt="">
          </div>
          <div class="pro_video">
            <div class="video-wrapper">
              <video preload="auto"
                     :src="videoSrc"
                     :class="{isPlay:!isVideoEnd}"
                     ref="video"
                     @ended="videoEnd"
                     controls="controls"
              >
                您的游览器不支持视频播放，请升级！
              </video>
              <div class="poster" v-lazy:background-image="poster" v-show="isVideoEnd">
                <div class="video-play" @click="videoPlay">
                  <i class="iconfont icon-play"></i>
                </div>
                <div class="tip">为什么要选择聚保大宗货物保</div>
              </div>
            </div>
          </div>
          <ul class="zcb_count">
            <li class="title">大宗货物保----公路货运基本险</li>
            <li class="distance_price_count">
              <label class="label">始发地</label>
              <div class="select_reset">
                <select v-model="startProvince" class="zcb_select1">
                  <option v-for="(val,idx) in startProvinceList" :value="val">{{val}}</option>
                </select>
              </div>
              <div class="select_reset">
                <select v-model="startCity" class="zcb_select2">
                  <option v-for="(val,idx) in startCityList"  :value="val" >{{val}}</option>
                </select>
              </div>
            </li>
            <li class="distance_price_count">
              <label class="label">目的地</label>
              <div class="select_reset">
                <select v-model="endProvince" class="zcb_select1">
                  <option v-for="(val,idx) in endProvinceList" :value="val">{{val}}</option>
                </select>
              </div>
              <div class="select_reset">
                <select v-model="endCity" class="zcb_select2">
                  <option v-for="(val,idx) in endCityList" :value="val">{{val}}</option>
                </select>
              </div>
            </li>
            <li class="block"><span class="label">保险金额</span><input type="text" :placeholder="'保额不超过'+maxCoverage/10000+'万元'" v-model="coverage"  @keyup="countPrice"><span class="fr">万元</span></li>
            <li class="price_box">
              <span class="label">保费</span>
              <span class="fr">
                <span class="price">{{(price/100).toFixed(2) }}</span><span>元</span>
               </span>
            </li>
          </ul>
          <div class="pro_tab">
            <div class="tab_item" :class="{tab_on: tabIndex===1 }" @click="tabIndex=1">
              <span>产品介绍</span>
            </div>
            <div class="tab_item" :class="{tab_on: tabIndex===2 }" @click="tabIndex=2">
              <span>详细说明</span>
            </div>
          </div>
          <div class="pro_content" v-show="tabIndex===1">
            <div class="imgWrapper" v-for="(item,index) in 4">
              <img v-lazy="spbImgList[item]" alt="">
              <!--<router-link class="detail" v-if="index==8" :to="'/goldClaims'">了解详情</router-link>-->
            </div>
          </div>
          <div class="pro_info" v-show="tabIndex===2">
            <div class="pro_item pro_item1">
              <div class="item_title">
                <b>产品条款</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>《国内水路、陆路货物运输保险条款》基本险</p>
              </div>
            </div>
            <div class="pro_item pro_item2">
              <div class="item_title">
                <b>承保标的货物种类</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>煤炭、钢铁、矿砂及其他一般大宗金属类货物</p>
              </div>
            </div>
            <div class="pro_item pro_item7">
              <div class="item_title">
                <b>保险责任</b>
                <i></i>
              </div>
              <div class="item_text">
                <p style="color:#06acf9;">本保险仅承保以下事故导致的货物损失：</p>
                <p>
                  因火灾、爆炸所造成的损失；
                </p>
                <p>
                  由于运输工具发生碰撞、倾覆所造成的损失。
                </p>
              </div>
            </div>
            <div class="pro_item pro_item2">
              <div class="item_title">
                <b>免赔额</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>每次事故绝对免赔额为货物总价值的5%</p>
              </div>
            </div>
            <div class="pro_item pro_item2">
              <div class="item_title">
                <b>保险费率</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>0.01%</p>
              </div>
            </div>
            <div class="pro_item pro_item2">
              <div class="item_title">
                <b>最高保险金额</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>单次最高可申报保险金额人民币200万元</p>
              </div>
            </div>
            <div class="pro_item pro_item2">
              <div class="item_title">
                <b>保险费</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>保险费=保险金额*保险费率</p>
                <p>单次申报运输最低保险费为人民币10元</p>
              </div>
            </div>
            <div class="pro_item pro_item9">
              <div class="item_title">
                <b>产品优势</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>无需签订预约协议，单票货物可随时投保</p>
                <p>
                  <span style="color:#06acf9;">本保险产品是国内唯一将单次运费纳入保险保障范围的互联网单次货运险产品。</span><br>
                  保险人将根据定损金额与保险金额的比例*该次运费的数额对损失的运费进行补偿，但最高不超过该次运费的实际金额。
                </p>
              </div>
            </div>
            <div class="pro_item pro_item10">
              <div class="item_title">
                <b>理赔指南</b>
                <i></i>
              </div>
              <div class="item_text">
                <div>
                  <i></i>
                  <p>电话报案</p>
                  <p>保险事故发生后，应及时报案。<br>建议首先拨打聚保物流保险平台服务热线<span style="color:#06acf9;">40080-59680</span>，与客服人员取得联系，聚保物流保险平台会指派理赔专员进行一对一的报案指导。<br>
                    您也可以按照保单上所示的报案电话直接向保险公司报案。</p>
                </div>
                <div>
                  <i></i>
                  <p>资料收集</p>
                  <p>被保险人应根据案件情况，及时保存和准备关于事故原因、事故损失、货物价值证明、车辆及单位证件等相关的事故索赔资料。</p>
                </div>
                <div>
                  <i></i>
                  <p>保险顾问协助</p>
                  <p>报案成功后，保险顾问会及时联系被保险人，以确认被保险人准备资料的完整性和必要性。<br>被保险人准备好理赔资料后，可先将影印资料发送至聚保金牌理赔专属电子邮箱：<span style="color:#06acf9;">lipei01@jubao56.com</span>，保险顾问会进一步协助您核定资料完整性。</p>
                </div>
                <div>
                  <i></i>
                  <p>寄送资料原件</p>
                  <p>资料审核无误后，被保险人可根据保险顾问的具体建议，将资料原件寄送到指定地点。</p>
                </div>
                <div>
                  <i></i>
                  <p>赔付保险金</p>
                  <p>保险公司审核原件资料，双方确定保险赔偿金额后，保险赔偿金将直接支付到被保险人的账户，本次理赔完成并结案。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pro_foot">
        <span class="button">{{ price | showPrice }}</span>
        <a href="tel:4008059680" class="button bg-green">咨询</a>
        <router-link :to="'/hwbCreate'" class="button bg-blue">立即投保</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { dchybDetail } from '../mixins/dchybDetail'
  let spbImgList = [];
  for (let i=0;i<4;i++){
    spbImgList[i+1] = require('../../assets/img/hwb/hwb'+(i+1)+'.png')
  }
  export default {
    mixins: [dchybDetail],
    data() {
      return {
        videoSrc: "",
        poster: "https://www.jubao56.com/res/2017/12/27/10/2850411/整车保2.jpg",
        isVideoEnd: true,
        tabIndex: 1, // 控制tab选中状态
        caseIndex: 1, // 控制方案tab选中状态
        goldClaimsUrl:'',
        spbImgList,
        productType:'hwb',
      }
    },
    created(){

    },
    methods:{
      _getMedia(id,callback){
        this.$store.state.axios({
          method: 'GET',
          url: 'https://www.jubao56.com/v1/cmn/biz/media/info',
          params: {id:id},
        }).then((res)=>{
          console.log(res);
          if(res.data.err_code == 0){
            callback(res.data.data)
          }
        }).catch((err)=>{console.log(err)})
      },
      videoPlay () {
        if(this.$refs.video.error){
          console.log(this.$refs.video.error)
          Toast({message: '视频有误',position:'bottom'});
          return
        }
        this.$refs.video.play();
        this.isVideoEnd = false;
      },
      videoEnd () {
        this.isVideoEnd = true;
      },
      background (img) {
        return {
          background:'url("'+img+'") 0 0 no-repeat'
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/hwb/hwb.scss";
  .content_box{
    background: #efefef;
  }
  ul.zcb_count{
    border-bottom:pxToRem(20) solid #eeeeee;
    border-top:pxToRem(20) solid #eeeeee;
    li{
      font-size:pxToRem(30);
      color:#333333;
      height:pxToRem(80);
      line-height: pxToRem(80);
      @include border-1px('bottom');
      padding:0 0 0 pxToRem(30);
      background: #fff;
      .label{
        display: inline-block;
        width:pxToRem(135);
        margin-right:pxToRem(10)
      }
      span.distance{
        padding:0 pxToRem(14);
      }
      span.coverage{
        font-size:pxToRem(30);padding:0 pxToRem(20);
        border:1px solid #666666;border-radius: pxToRem(8);
      }
      span.br{
        margin-right:pxToRem(50);margin-left: pxToRem(20);
      }
      span.bechose{
        border-color:#06acf9;
      }
    }
    li.distance_price_count{
      select{
        font-size:pxToRem(24);
        height:pxToRem(40);line-height:pxToRem(40);
      }
      select:nth-of-type(1){
        width:pxToRem(180);
        padding-left: pxToRem(40);
      }
      select:nth-of-type(2){
        width:pxToRem(224);padding-left: pxToRem(20);
      }
    }
    li{
      input{text-align: right;}
      .fr{
        margin-right:pxToRem(50);
        .price{
          color:red;padding:0 pxToRem(10);
        }
      }
    }

  }
</style>
