<template>
  <div class="spb">
    <v-header title="商铺档口火灾保"></v-header>
    <div class="content_box">
      <div class="content">
        <div class="all">
          <div class="banner">
            <img v-lazy="require('../../assets/img/spb/spbBanner.jpg')" alt="">
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
                <div class="tip">为什么要选择聚保商铺档口火灾保</div>
              </div>
            </div>
          </div>
          <div class="pro_case">
            <div class="case_title">商铺档口火灾保——财产基本险</div>
            <div class="case_tab">
              <div class="case_item" :class="caseIndex === 1 ? 'on': ''" @click="caseIndex = 1">方案一<br/>100万</div>
              <div class="case_item" :class="caseIndex === 2 ? 'on': ''" @click="caseIndex = 2">方案二<br/>200万</div>
              <div class="case_item" :class="caseIndex === 3 ? 'on': ''" @click="caseIndex = 3">方案三<br/>300万</div>
            </div>
            <div class="case_content">
              <div class="cell">
                <div>保险金额</div>
                <div>{{ caseList[caseIndex-1][0] }}万</div>
              </div>
              <div class="cell gray">
                <div>固定资产</div>
                <div>{{ caseList[caseIndex-1][1] }}万</div>
              </div>
              <div class="cell gray">
                <div>临时存资</div>
                <div>{{ caseList[caseIndex-1][2] }}万</div>
              </div>
              <div class="cell gray">
                <div>租金补偿</div>
                <div>{{ caseList[caseIndex-1][3] }}元/天*90</div>
              </div>
            </div>
            <div class="cell money">
              <div>合计保费</div>
              <div><span class="red">￥{{ caseList[caseIndex-1][4].toFixed(2) }}</span> 元</div>
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
            <div class="imgWrapper" v-for="(item,index) in 9">
              <img v-lazy="spbImgList[item]" alt="">
              <router-link class="detail" v-if="index==8" :to="'/goldClaims'">了解详情</router-link>
            </div>
          </div>
          <div class="pro_info" v-show="tabIndex===2">
            <div class="pro_item pro_item1">
              <div class="item_title">
                <b>产品条款</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>《财产基本险条款》</p>
              </div>
            </div>
            <div class="pro_item pro_item2">
              <div class="item_title">
                <b>保险责任</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>火灾、爆炸、雷击、空中物体坠落</p>
              </div>
            </div>
            <div class="pro_item pro_item3">
              <div class="item_title">
                <b>保险期限</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>一年</p>
              </div>
            </div>
            <div class="pro_item pro_item4">
              <div class="item_title">
                <b>保障责任</b>
                <i></i>
              </div>
              <div class="item_text">
                <img src="../../assets/img/spb/table.jpg" width="100%">
              </div>
            </div>
            <div class="pro_item pro_item5">
              <div class="item_title">
                <b>免赔额</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>每次事故绝对免赔额为2000元或损失金额的10%，两者以高者为准。</p>
              </div>
            </div>
            <div class="pro_item pro_item6">
              <div class="item_title">
                <b>投保资料</b>
                <i></i>
              </div>
              <div class="item_text">
                <div>
                  <p>企业营业执照</p>
                  <p>商铺档口照片：<br>商铺外部正面全貌照片（1张）<br>商铺内部结构主体、存货的照片（3-4张）</p>
                  <p>投保单</p>
                </div>
              </div>
            </div>
            <div class="pro_item pro_item7">
              <div class="item_title">
                <b>投保须知</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>商铺档口的划分和定义：</p>
                <p>
                  被保险人的物流档口原则上以门牌号码为区分，一个门牌号码对应为一个档口。被保险人应当分门牌档口申报对应的保险金额，保险公司按照每个门牌对应的档口出具保单。
                </p>
                <p>
                  如果被保险人为连号门牌和档口的，且档口间存放货物难以分割的，可按照门牌号码确定档口个数，合并投保。联号门牌和档口的总保险金额超过300万时，将分割为多个保单分别出具。<br>&nbsp;&nbsp;（如：某物流企业有5个连号门牌档口，计划为每个档口投保100万的火灾保，因为总保险金额超过300万的限制，可以按照1-3号投保一份300万的保险，4-5号投保一份200万的保险来出单操作）
                </p>
                <p>
                  如果档口未规范标示门牌号码且档口之间无法准确分割计算档口个数，可拨打聚保物流保险平台24小时服务热线<span style="color:#06acf9;">40080-59680</span>，向客服人员提供档口正面和内部结构照片来确定投保方案。
                </p>
              </div>
            </div>
            <div class="pro_item pro_item8">
              <div class="item_title">
                <b>主要不保财产、货物</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>金银、珠宝、古玩、字画、艺术品等珍贵财物；</p>
                <p>枪支弹药；</p>
                <p>动物、植物、农作物。</p>
              </div>
            </div>
            <div class="pro_item pro_item9">
              <div class="item_title">
                <b>主要不赔事项</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>
                  <i></i>投保人、被保险人及其代表的故意或重大过失行为；
                </p>
                <p>
                  <i></i>战争、类似战争行为、敌对行动、军事行动、武装冲突、罢工、骚乱、暴动、政变、谋反、恐怖活动；
                </p>
                <p>
                  <i></i>地震、海啸及其次生灾害；
                </p>
                <p>
                  <i></i>内在或潜在缺陷、自然磨损、自然损耗，大气（气候或气温）变化、正常水位变化或其他渐变原因，物质本身变化、霉烂、受潮、鼠咬、虫蛀、鸟啄、氧化、锈蚀、渗漏、自燃、烘焙；
                </p>
                <p>
                  <i></i>自然灾害；
                </p>
                <p>
                  <i></i>盗窃、抢劫。
                </p>
                <p>
                  以上仅为保险条款部分摘要，详细描述请见保险条款具体内容。
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
                  <p>保险事故发生后，应及时报案。建议首先拨打聚保物流保险平台服务热线 <br><span style="color:#06acf9;">40080-59680</span>，与客服人员取得联系，聚保物流保险平台会指派理赔专员进行一对一的报案指导。
                    您也可以按照保单上所示的报案电话直接向保险公司报案。</p>
                </div>
                <div>
                  <i></i>
                  <p>审核</p>
                  <p>准备好理赔影像资料并发送至以下邮箱<br><span style="color:#06acf9;">lipei01@jubao56.com</span></p>
                </div>
                <div>
                  <i></i>
                  <p>寄送资料原件</p>
                  <p>在我们审核后，会告知您寄送理赔资料原件到指定地点。</p>
                </div>
                <div>
                  <i></i>
                  <p>赔付保险金</p>
                  <p>赔付保险金到被保险人的账户，本次理赔完成并结案。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pro_foot">
        <span class="button">￥{{ caseList[caseIndex-1][4].toFixed(2) }}</span>
        <a href="tel:4008059680" class="button bg-green">咨询</a>
        <router-link :to="'/spbCreate?coverage=' + caseList[caseIndex-1][0]*10000 + '&price=' + caseList[caseIndex-1][4]*100 " class="button bg-blue">立即投保</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  let spbImgList = [];
  for (let i=0;i<9;i++){
    spbImgList[i+1] = require('../../assets/img/spb/spb0'+(i+1)+'.png')
  }
  export default {
    data() {
      return {
        videoSrc: "",
        poster: "https://www.jubao56.com/res/2017/12/27/10/2850411/整车保2.jpg",
        isVideoEnd: true,
        tabIndex: 1, // 控制tab选中状态
        caseIndex: 1, // 控制方案tab选中状态
        caseList: [  // 方案详细信息
          [100,20,80,200,1200],
          [200,40,160,200,2200],
          [300,60,240,200,3200],
        ],
        goldClaimsUrl:'',
        spbUrl: this.$store.state.spbBackUrl + "/insured-create.html",
        spbImgList
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
  @import "../../assets/scss/spb/spb.scss";
  .content_box{
    background: #efefef;
  }
</style>
