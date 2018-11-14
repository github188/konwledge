<template>
  <div class="all">
    <v-header title="员工保"></v-header>
    <div class="content_box">
      <div class="content">
        <div class="banner">
          <img v-lazy="require('../../assets/img/ygbBanner.png')" alt="">
        </div>
        <div class="pro_video">
          <div class="video-wrapper">
            <video preload="auto"
                   :src="videoSrc"
                   :class="{isPlay:!isVideoEnd}"
                   ref="video"
                   @ended="videoEnd"
                   v-show="!isWx && !showDetail"
                   controls="controls"
            >
              您的游览器不支持视频播放，请升级！
            </video>
            <div ref="container" class="poster" v-lazy:background-image="poster" v-show="isWx || isVideoEnd">
              <div class="video-play" @click="videoPlay">
                <i class="iconfont icon-play"></i>
              </div>
              <div class="tip">为什么要选择聚保员工保 </div>
            </div>
          </div>
        </div>
        <div class="pro_do">
          <div class="do_title">
            员工保——雇主责任险
          </div>
          <div class="do_tab">
            <div class="do_item" v-for="(item,index) in caseList" :class="{active:caseIndex==index}" @click="caseIndex=index">{{item.product}}</div>
          </div>
          <div class="do_content">
            <div class="cell red">
              <div>死亡伤残</div>
              <div>{{caseList[caseIndex].data[0]}}万</div>
            </div>
            <div class="cell gray">
              <div>医疗</div>
              <div>{{caseList[caseIndex].data[1]}}万</div>
            </div>
            <div class="cell gray">
              <div>误工费</div>
              <div>{{caseList[caseIndex].data[2]}}元/天</div>
            </div>
            <div class="cell gray">
              <div>扩展保障</div>
              <div>{{caseList[caseIndex].data[3]}}种</div>
            </div>
            <div class="cell blue">
              <div @click="showDetail=true">查看详情</div>
            </div>
            <div class="cell">
              <div class="cell_w">现场操作人数</div>
              <AddSubtract v-model="driverNum"></AddSubtract>
              <div>{{caseList[caseIndex].price[0]}}元/人</div>
            </div>
            <div class="cell">
              <div class="cell_w">非现场操作人数</div>
              <AddSubtract v-model="clerkNum"></AddSubtract>
              <div>{{caseList[caseIndex].price[1]}}元/人</div>
            </div>
            <div class="cell">
              <div>合计保费</div>
              <div class="red">￥{{allPrice}}.00</div>
            </div>
          </div>
        </div>
        <div class="pro_tab">
          <div class="tab_item" :class="{tab_on: tabIndex===1 }" @click="tabIndex=1">
            <span>产品介绍</span>
          </div>
          <div class="tab_item" :class="{tab_on: tabIndex===2 }" @click="tabIndex=2">
            <span>详细说明</span>
          </div>
        </div>
        <div class="pro_content" v-show="tabIndex===1">
          <div class="imgWrapper" v-for="(item,index) in 8">
            <img v-lazy="ygbImgList[item]" alt="">
            <router-link class="detail" v-if="item==8" :to="'/goldClaims'">了解详情</router-link>
          </div>
        </div>
        <div class="pro_info" v-show="tabIndex===2">
          <div class="pro_item pro_TiaoKuan">
            <div class="item_title">
              <b>产品条款</b>
              <i></i>
            </div>
            <div class="item_text text_center">
              <p>《雇主责任保险条款（2014版）》</p>
            </div>
          </div>
          <div class="pro_item pro_ZeRen">
            <div class="item_title">
              <b>保险责任</b>
              <i></i>
            </div>
            <div class="item_text">
              <p class="blue_font paddingL">主险保障责任:</p>
              <p><i>1</i>在工作时间和工作场所内，因工作原因受到事故伤害； </p>
              <p><i>2</i>工作时间前后在工作场所内，从事与工作有关的预备性或收尾性工作时受到事故伤害； </p>
              <p><i>3</i>在工作时间和工作场所内，因履行工作职责受到暴力等意外伤害；</p>
              <p><i>4</i>患职业病； </p>
              <p><i>5</i>因工外出期间，由于工作原因受到伤害或发生事故下落不明；</p>
              <p><i>6</i>在上下班途中，受到非本人主要责任的交通事故或城市轨道交通、客运轮渡、火车事故伤害； </p>
              <p><i>7</i>在工作时间和工作岗位上，突发疾病死亡或在48小时之内经抢救无效死亡；</p>
              <p><i>8</i>在抢险救灾等维护国家利益、公共利益活动中受到伤害；</p>
              <p><i>9</i>原在军队服役，因战、因公负伤致残，已取得革命伤残军人证，到用人单位后旧伤复发； </p>
              <p><i>10</i>法律、行政法规规定应当认定为工伤的其他情形。</p>
              <p class="blue_font paddingL">免费扩展保障:</p>
              <p><i>1</i>律师费、鉴定费、检验费扩展保障</p>
              <p><i>2</i>理赔服务时效与预付赔款特约保障</p>
              <p><i>3</i>简化工伤认定理赔资料特约保障</p>
              <p><i>4</i>错误遗漏条款保障 </p>
              <p><i>5</i>运动或娱乐活动条款保障</p>
              <p><i>6</i>紧急运输费用条款保障</p>
              <p><i>7</i>境内公出条款保障</p>
              <p><i>8</i>伤残事故简易赔偿特约保障 </p>
              <p class="blue_font paddingL">特享保障:</p>
              <p><i>1</i>误工费与伤残赔偿金可同时获赔特约保障</p>
              <p><i>2</i>自费药特约保障</p>
              <p><i>3</i>24小时意外风险保障</p>
              <p><i>4</i>住院津贴保障</p>
              <p class="blue_font paddingL">（注：特享保障内容适用于其对应的产品版本，详情请见产品介绍页）</p>
            </div>
          </div>
          <div class="pro_item pro_QiXian">
            <div class="item_title">
              <b>保险期限</b>
              <i></i>
            </div>
            <div class="item_text text_center">
              <p>一年</p>
            </div>
          </div>
          <div class="pro_item pro_itemMianZe">
            <div class="item_title">
              <b>免赔额</b>
              <i></i>
            </div>
            <div class="item_text">
              <p class="hasIcon">医疗费用绝对免赔额100元，剩余合理医疗费用按照90%赔偿。</p>
              <p class="hasIcon">误工费免赔天数5天。</p>
            </div>
          </div>
          <div class="pro_item pro_itemMianZe">
            <div class="item_title">
              <b>责任除外说明</b>
              <i></i>
            </div>
            <div class="item_text">
              <p class="hasIcon">投保人、被保险人及其代表的故意或重大过失行为；</p>
              <p class="hasIcon">战争、敌对行动、军事行为、武装冲突、罢工、暴动、民众骚乱、恐怖活动；</p>
              <p class="hasIcon">核辐射、核爆炸、核污染及其他放射性污染；</p>
              <p class="hasIcon">行政行为或司法行为；</p>
              <p class="hasIcon">被保险人的工作人员的故意行为、自残、自杀； </p>
              <p class="hasIcon">被保险人的工作人员醉酒；</p>
              <p class="hasIcon">被保险人的工作人员从事吸毒等违法犯罪行为；</p>
              <p class="hasIcon">在工作时间和工作岗位，被保险人的工作人员因投保时已患有的疾病发作或分娩、流产。</p>
              <p class="blue_font">以上仅为保险合同及条款部分摘要，详细描述请见合同及条款“责任免除”部分。</p>
            </div>
          </div>
          <div class="pro_item pro_LiPei">
            <div class="item_title">
              <b>理赔指南</b>
              <i></i>
            </div>
            <div class="item_text">
              <div>
                <i></i>
                <p class="blue_font">电话报案</p>
                <p>保险事故发生后，应及时报案。建议首先拨打聚保物流保险平台服务热线 <br><span style="color:#06acf9;">40080-59680</span>，与客服人员取得联系，聚保物流保险平台会指派理赔专员进行一对一的报案指导。<br>
                  您也可以按照保单上所示的报案电话直接向保险公司报案。</p>
              </div>
              <div>
                <i></i>
                <p class="blue_font">审核</p>
                <p>准备好理赔影像资料并发送至以下邮箱<br><span style="color:#06acf9;">lipei02@jubao56.com</span></p>
              </div>
              <div>
                <i></i>
                <p class="blue_font">寄送资料原件</p>
                <p>在我们审核后，会告知您寄送理赔资料原件到指定地点。</p>
              </div>
              <div>
                <i></i>
                <p class="blue_font">赔付保险金</p>
                <p>赔付保险金到被保险人的账户，本次理赔完成并结案。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pro_foot">
        <span class="button">￥{{allPrice}}.00</span>
        <a href="tel:4008059680" class="button bg-green">咨询</a>
        <router-link :to="{path:'/ygbCreate',query:{type:caseIndex}}" class="button bg-blue">立即投保</router-link>
      </div>
    </div>
    <YgbLookUp :flag.sync="showDetail" ref="YgbLookUp" :caseIndex="caseIndex"></YgbLookUp>
  </div>
</template>

<script>
  import YgbLookUp from "views/components/YgbLookUp.vue"
  import { Toast } from 'mint-ui';
  import AddSubtract from 'views/components/AddSubtract'
  import {ygbProductList} from 'assets/js/api'
  import axios from "axios"

  let ygbImgList = [];
  for (let i=0;i<8;i++){
    ygbImgList[i+1] = require('../../assets/img/ygb'+(i+1)+'.png')
  }

  const  caseList = [
    {product:'特惠版', data:[60,6,100,13],price:[600,300]},
    {product:'经济版', data:[20,2,100,13],price:[280,160]},
    {product:'标准版', data:[40,4,100,13],price:[560,320]},
    {product:'尊享版', data:[60,6,100,13],price:[840,480]},
  ];
  export default {
    components:{
      AddSubtract,
      YgbLookUp
    },
    data() {
      return {
        videoSrc: "",
        poster: "",
        isVideoEnd: true,
        tabIndex: 1, // 控制tab选中状态
        ygbImgList,
        caseList,//方案列表
        caseIndex: 0, // 控制方案tab选中状态
        driverNum:0, //现场操作人数
        clerkNum:0, //非现场操作人数
        showDetail: false
      }
    },
    computed:{
      allPrice(){
        return this.driverNum*this.caseList[this.caseIndex].price[0] + this.clerkNum*this.caseList[this.caseIndex].price[1];
      },
      isWx(){
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        } else {
          return false;
        }
      },
    },
    created(){
//      this.$Loading.open();
//      this.$Loading.loadImg(this.poster);
//      ygbProductList().then((res)=>{
//        console.log(res)
//      })
//      this._getData();
      this._getMedia(26,(data) => {
        this.videoSrc = data.media_url;
        this.poster = data.cover_image_url;
      })
    },
    methods:{
      _getMedia(id,callback){
        axios({
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
      _getData() {
        axios({
          url: 'https://www.jubao56.com/v1/cmn/biz/media/list',
          type: 'GET',
          params: {title:'聚保精研'}
        }).then((res)=>{
            console.log(res.data,111);
            if(res.data.err_code == 0){
              res.data.rows.map(function (item) {
                if(item.title.indexOf('员工保')>-1){
                  console.log(item,222)
                }
              })
            }
        })
      },
      videoPlay () {
        if(this.$refs.video.error){
          console.log(this.$refs.video.error)
          Toast('视频有误！');
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
  @import "../../assets/scss/ygb/ygb";
  .content_box{
   background: #fff;
  }
</style>

