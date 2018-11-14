<template>
  <div class="hcbCreate">
    <v-header title="投保信息填写"></v-header>
    <div class="content_box">
      <div class="content">
        <ul class="order_list">
          <li><span class="label">投保人</span><input type="text" id="insPerson" disabled v-model="insPerson"/></li>
          <li><span class="label">被保险人</span><input type="text" id="insedPerson" disabled v-model="insedPerson"/></li>
          <div class="car-panel" v-for="(item,index) in truckList" :key="index">
            <li class="li-title-eee" @click="item.isShow=!item.isShow">
              <span class="label lg">投保车辆 {{NumberToChinese(index+1)}}</span>
              <i class="iconfont icon-right lr" :class="{rotate:item.isShow}"></i>
            </li>
            <Panel :flag="item.isShow" :change="item.driving_original.concat(item.driving_copy)">
              <li class="li-tab">
                <span class="label">货车类型</span>
                <div class="li-tab-body">
                  <div class="tab-item" :class="{active:item.truck_type==1}" @click="item.truck_type=1">带挂货车</div>
                  <div class="tab-item" :class="{active:item.truck_type==2}" @click="item.truck_type=2;item.plate_extra_no='';">普通货车</div>
                </div>
              </li>
              <li><span class="label">{{item.truck_type==1?'头车牌号':'车牌号'}}</span><input type="text" :placeholder="item.truck_type==1?'请填写头车牌号':'请填写车牌号'" @input="checkPlateNo($event,item.plate_no)" v-model.trim="item.plate_no"/></li>
              <li v-show="item.truck_type==1"><span class="label">挂车牌号</span><input type="text" placeholder="请填写挂车牌号" v-model.trim="item.plate_extra_no" maxlength="11"/></li>
              <li class="li-tab">
                <span class="label">责任限额</span>
                <div class="li-tab-body f24">
                  <div v-for="(price,PriceIndex) in  priceData" :key="PriceIndex+'b'" class="tab-item" :class="{active:item.limitType==PriceIndex}" @click="item.limitType=PriceIndex">{{price.coverage/10000}}万</div>
                </div>
              </li>
              <li><span class="label">价格</span><span class="lr"><span class="red">{{priceData.length>0 ? priceData[item.limitType].price/100 : 0}}.00</span>元</span></li>
              <li class="article">
                <span>上传运输车辆行驶证（正副本）</span>
                <div class="article-body">
                  <div class="upload">
                    <upload :url="$store.state.fileUrl" v-model="item.driving_original" :onlyOne="true"></upload>
                    <div class="upload-tip">正本</div>
                  </div>
                  <div class="upload">
                    <upload :url="$store.state.fileUrl" v-model="item.driving_copy" :onlyOne="true"></upload>
                    <div class="upload-tip">副本</div>
                  </div>
                </div>
              </li>
              <li class="article">
                <span>上传车辆运输证</span>
                <div class="upload">
                  <upload :url="$store.state.fileUrl" v-model="item.transport" :onlyOne="true"></upload>
                </div>
              </li>
              <li class="r-btn">
                <span class="active" @click="add">新增车辆</span>
                <span v-if="index==0" @click="empty">清空信息</span>
                <span v-else @click="deleteOne(index)">删除车辆</span>
              </li>
            </Panel>
          </div>
          <li class="article lisence">
            <span>上传营业执照</span>
            <div class="upload">
              <upload :url="$store.state.fileUrl" v-model="imgList" :onlyOne="true"></upload>
            </div>
          </li>
          <Invoice :invoiceData="invoiceData" :addressData="addressData" :edit="true" @toAddress="toAddress"></Invoice>
          <li class="agree" @click="agree=!agree">
            <i class="iconfont" :class="agree?'icon-danxuan':'icon-yuan'" ></i>
            <div class="msg">
              我已阅读并同意<span @click.stop="getClause('公路货物运输定额保险条款')" class="blue">《公路货物运输定额保险条款》</span><br/>
              <span @click.stop="getClause('公路货物运输保险附加第三者责任保险条款')" class="blue">《公路货物运输保险附加第三者责任保险条款》</span><br/>
              和<span @click.stop="getClause('投保须知')"  class="blue">《投保须知》</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="foot">
        <span class="btn">￥{{(allPrice/100).toFixed(2)}}</span>
        <span class="btn bg_blue" @click="createOrder">下一步</span>
      </div>
    </div>
    <Risk :title="agreementContent.title" ref="agreement" :html="agreementContent.content"></Risk>
  </div>
</template>
<script>
  import {hynbCreate} from '../mixins/hynb'

  export default {
    mixins:[hynbCreate],
    data(){
      return {
        product_name:'货车重大事故保',
        productType:'hcb'
      }
    },
  }
</script>
<style>
  .article-body .weui-uploader__bd {
      display: flex !important;
    }
</style>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/ygb/ygbCommon";
  @import "../../assets/scss/hcb/hcbCreate";
  .content_box {
    bottom:0;
    .content {
      min-height: 100%;
      height: auto !important;
      background: #eee;
      .order_list{
        padding-bottom: pxToRem(100);
      }
    }
    .foot{margin-top: pxToRem(-100)}
  }
</style>
