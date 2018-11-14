<template>
  <div class="zcb">
    <v-header title="整车保"></v-header>
    <div class="content_box">
      <div class="content">
        <div class="all">
          <div class="banner">
            <img v-lazy="require('../../assets/img/zcb/zcbBanner.jpg')" alt="">
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
              <div class="poster"  v-lazy:background-image="poster"  v-show="isVideoEnd">
                <div class="video-play" @click="videoPlay">
                  <i class="iconfont icon-play"></i>
                </div>
                <div class="tip">为什么要选择聚保整车保</div>
              </div>
            </div>
          </div>

          <!--整车保计算器 start-->
          <ul class="zcb_count">
            <li class="title">整车保----物流责任险</li>
            <li class="distance_price_count">
              <label class="label">始发地</label>
              <div class="select_reset">
                <select v-model="startProvince" class="zcb_select1">
                  <option v-for="(val,idx) in startProvinceList" :value="val">{{val}}</option>
                </select>
              </div>
              <div class="select_reset">
                <select v-model="startCity" class="zcb_select2" @change="countPrice">
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
                <select v-model="endCity" class="zcb_select2" @change="countPrice">
                  <option v-for="(val,idx) in endCityList" :value="val">{{val}}</option>
                </select>
              </div>
            </li>
            <li><span class="label">里程</span><span class="red distance">{{distance}}</span><span>公里</span></li>
            <li class="block"><span class="label">赔偿限额</span><span class="coverage br" :class="coverage===1500000?'bechose':''" @click="switchRadio(1500000)">150万</span><span class="coverage" :class="coverage===500000?'bechose':''" @click="switchRadio(500000)">50万</span></li>
            <li class="price_box">
              <span class="label">保费</span>
              <span class="fr">
            <span class="price">{{price | showPrice}}</span><span>元</span>
          </span>

            </li>
          </ul>
          <!--整车保计算器 end-->

          <div class="pro_tab">
            <div class="tab_item" :class="{tab_on: tabIndex===1 }" @click="tabIndex=1">
              <span>产品介绍</span>
            </div>
            <div class="tab_item" :class="{tab_on: tabIndex===2 }" @click="tabIndex=2">
              <span>详细说明</span>
            </div>
          </div>
          <div class="pro_content" v-show="tabIndex===1">
            <div class="imgWrapper" v-for="(item,index) in 11">
              <img v-lazy="zcbImgList[item]" alt="">
              <router-link class="detail" v-if="item==11" :to="'/goldClaims'"></router-link>
            </div>
          </div>
          <div class="pro_info" v-show="tabIndex===2">
            <div class="pro_item pro_TiaoKuan">
              <div class="item_title">
                <b>产品条款</b>
                <i></i>
              </div>
              <div class="item_text text_center">
                <p>《物流责任保险条款》</p>
              </div>
            </div>
            <div class="pro_item pro_ZeRen">
              <div class="item_title">
                <b>保险责任</b>
                <i></i>
              </div>
              <div class="item_text">
                <p class="isTitle">19项意外事故造成货物损失</p>
                <p class="hasIcon">火灾、爆炸；</p>
                <p class="hasIcon">运输工具发生碰撞、出轨、倾覆、坠落、搁
                  浅、触礁、沉没，隧道坍塌、桥梁坍塌、码
                  头坍塌；</p>
                <p class="hasIcon">碰撞、挤压导致包装破裂或容器损坏；</p>
                <p class="hasIcon">物流货物的正常装卸、搬运；</p>
                <p class="hasIcon">物流货物遭遇盗窃、抢劫；</p>
                <p class="hasIcon">整车货物连车失踪。</p>
                <p class="isTitle">11项自然灾害造成货物损失</p>
                <p class="hasIcon">雷电、冰雹、暴风、暴雨、洪水、地震、海
                  啸、地陷、崖崩、滑坡、泥石流所造成的损
                  失以及运输过程中遭受雨淋。</p>
                <div>详细保障范围以整车保产品协议为准。</div>
              </div>
            </div>
            <div class="pro_item pro_Tab">
              <div class="item_title">
                <b>责任限额及保费</b>
                <i></i>
              </div>
              <div class="item_text">
                <div class="tab_con">
                  <div class="tab_head">
                    <div class="distance">干线距离</div>
                    <div class="zeren">
                      <div>每次事故责任</div>
                      <div>
                        <span>限额150万</span>
                        <span>限额50万</span>
                      </div>
                      <div>对应保险费</div>
                    </div>
                  </div>
                  <div class="tab_item">
                    <div class="distance">500 公里以内</div>
                    <div class="time">50元 / 次</div>
                    <div class="time">35元 / 次</div>
                  </div>
                  <div class="tab_item" v-for="item in 14">
                    <div class="distance">{{400 + 100 * item}}-{{500 + 100 * item}} 公里</div>
                    <div class="time">{{50 + 10 * item}}元 / 次</div>
                    <div class="time">{{35 + 7 * item}}元 / 次</div>
                  </div>
                  <div class="tab_item">
                    <div class="distance">1900 公里以上</div>
                    <div class="time">200元 / 次</div>
                    <div class="time">140元 / 次</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pro_item pro_MianPei">
              <div class="item_title">
                <b>免赔额</b>
                <i></i>
              </div>
              <div class="item_text">
                <p>每次事故免赔率为人民币5000元或损失金
                  额的10%，两者以高者为准。</p>
                <p>保险事故如发生在新疆、内蒙古、青海、甘
                  肃四个行政区域内时，则该次事故的对应免
                  赔额为：人民币5000元或损失金额的15%,
                  两者以高者为准。</p>
                <p>火灾每次事故免赔率为人民币5000元或损
                  失金额的20%，两者以高者为准。</p>
                <p>玻璃制品、陶瓷制品、石膏制品等易碎品的
                  免赔额为：人民币5000元或损失金额的
                  15%，两者以高者为准。</p>
              </div>
            </div>
            <div class="pro_item pro_itemXuZi">
              <div class="item_title">
                <b>投保须知</b>
                <i></i>
              </div>
              <div class="item_text">
                <p class="isTitle">主要不保货物：</p>
                <p class="hasIcon">金银、珠宝、钻石、玉器、贵重金属； </p>
                <p class="hasIcon">古玩、古币、古书、古画、艺术作品、雕塑、邮票；</p>
                <p class="hasIcon">旧品、二手品、展览后之展品和陈列品等无法确定其价值的货品；</p>
                <p class="hasIcon">枪支弹药、爆炸物品；</p>
                <p class="hasIcon">现钞、有价证券、票据、文件、档案、帐册、图纸、技术资料、信用证、护照；</p>
                <p class="hasIcon">需冷藏或恒温运输的货物；</p>
                <p class="hasIcon">蔬菜、水果、活牲畜、禽鱼类和其他动物。易腐品、易蛀品、农产品，如果仁、花生、玉米、豆类、大小麦、豆粕、鱼粉、菜籽
                  饼、地瓜干、木薯干、肉类、蛋类、蔬菜、水果类等；易变质品、活品，如海鲜、动植物等；</p>
                <p class="hasIcon">易燃易爆及危险品（参照GB12268-2005《危险货物品名表》）；</p>
                <p class="hasIcon">危险品，化工品如硫酸、水泥等；</p>
                <p class="hasIcon">军火、军品；</p>
                <p class="hasIcon">原木、原棉、天然橡胶等；</p>
                <p class="hasIcon">汽车，船舶；</p>
                <p class="hasIcon">无任何包装且无法确定单件价值的大宗货物如煤炭、矿石/砂、沥青、焦油、水泥等;</p>
                <p class="hasIcon">重大件机械设备。</p>
                <p class="isTitle">主要不赔事项：</p>
                <p class="hasIcon">违反国家、行业或物流企业的安全运输规定或物流操作规程；</p>
                <p class="hasIcon">投保人、被保险人及其代表的故意行为或重大过失；</p>
                <p class="hasIcon">战争、类似战争行为、敌对行动、军事行动、武装冲突、罢工、骚乱、暴动、政变、谋反、恐怖活动； </p>
                <p class="hasIcon">行政行为或司法行为;</p>
                <p class="hasIcon">运输或装卸工具不适合运输或装卸物流货物，或仓库不具备存储物流货物的条件；</p>
                <p class="hasIcon">物流货物设计错误、工艺不善、本质缺陷或特性、自然渗漏、自然损耗、自然磨损、自燃或由于自身原因造成腐烂、变质、伤病、死亡等自身变化；</p>
                <p class="hasIcon">物流货物包装不当，或物流货物包装完好而内容损坏或不符，或物流货物标记错制、漏制、不清；</p>
                <p class="hasIcon">发货人或收货人确定的物流货物数量、规格或内容不准确。</p>
                <p class="blue_font">以上仅为保险条款部分摘要，详细描述请见保险条款具体内容。</p>
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
                  <p>保险事故发生后，应及时报案。建议首先拨打聚保物流保险平台服务热线 <br><span style="color:#06acf9;">40080-59680</span>，与客服人员取得联系，聚保物流保险平台会指派理赔专员进行一对一的报案指导。
                    您也可以按照保单上所示的报案电话直接向保险公司报案。</p>
                </div>
                <div>
                  <i></i>
                  <p class="blue_font">审核</p>
                  <p>准备好理赔影像资料并发送至以下邮箱<br><span style="color:#06acf9;">lipei01@jubao56.com</span></p>
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
      </div>
      <div class="zcb_bottom">
        <span class="price">{{price | showPrice}}</span>
        <a href="tel:4008059680" class="phone">客服</a>
        <router-link tag="span" to="/zcbCreate" class="goCreate" v-touchFeel>立即投保</router-link>
      </div>
    </div>



  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import axios from "axios"
  import {provinceCity,showData} from "../mixins/index.js"
  import {zcbCountPrice} from "../mixins/zcb"
  let zcbImgList = [];
  for (let i = 0; i < 11; i++) {
    zcbImgList[i + 1] = require('../../assets/img/zcb/zcb' + (i + 1) + '.jpg')
  }
  export default {
    data() {
      return {
        videoSrc: "",
        poster: "",
        isVideoEnd: true,
        tabIndex: 1, // 控制tab选中状态
        goldClaimsUrl: '',
        zcbImgList,

      }
    },
    mixins:[provinceCity,showData,zcbCountPrice],
    created() {
      this._getMedia(28,(data) => {
        this.videoSrc = data.media_url;
        this.poster = data.cover_image_url;
      })
    },
    methods: {
      _getMedia(id,callback){
        axios({
          method: 'GET',
          url: 'https://www.jubao56.com/v1/cmn/biz/media/info',
          params: {id:id},
        }).then((res)=>{
          console.log(res);
          if(res.data.err_code == 0){
            callback(res.data.data)
          }else{
            this.$Loading.close();
            Toast({message: "视频有误！", position: 'bottom'});
          }
        }).catch((err)=>{console.log(err);this.$Loading.close();})
        this.getProvinceList();
      },
      videoPlay() {
        if (this.$refs.video.error) {
          console.log(this.$refs.video.error)
          Toast('视频有误！');
          return
        }
        this.$refs.video.play();
        this.isVideoEnd = false;
      },
      videoEnd() {
        this.isVideoEnd = true;
      },
      background(img) {
        return {
          background: 'url("' + img + '") 0 0 no-repeat'
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/zcb/zcb.scss";
  .content_box{
    background: #fff;
  }
  .zcb_bottom{
    height:pxToRem(100);display: flex;
    span{
      flex:1;display: flex;justify-content: center;align-items: center;font-size:pxToRem(36);
      &.price{
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
