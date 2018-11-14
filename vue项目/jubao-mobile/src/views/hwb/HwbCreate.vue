<template>
  <div class="hwb_create">
    <v-header title="投保信息填写"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order_list">
          <li class="flex"><label for="policyholder" class="label">投保人</label><input type="text" id="policyholder"
                                                                                     class="company" placeholder="请选择投保人名称"
                                                                                     :value="policyholder" disabled
                                                                                     maxlength="50"/></li>
          <li class="flex"><label for="beneficiary" class="label">被保险人</label><input type="text" id="beneficiary"
                                                                                     class="company" placeholder="请选择被保险人名称"
                                                                                     :value="beneficiary" disabled
                                                                                     maxlength="50"/></li>
          <li class="flex_li">
            <label class="label">货物名称</label>
            <div class="reset_case">
              <span :class="cargoName==='煤炭'?'radio_bechose':''">
                煤炭 <input type="radio" v-model="cargoName" value="煤炭"/>
              </span>
                <span :class="cargoName==='钢材'?'radio_bechose':''">
                 钢材 <input type="radio" v-model="cargoName" value="钢材"/>
              </span>
                <span :class="cargoName==='矿砂'?'radio_bechose':''">
                 矿砂 <input type="radio" v-model="cargoName" value="矿砂"/>
              </span>
                <span :class="cargoName==='大宗金属货物'?'radio_bechose':''">
                 大宗金属货物 <input type="radio" v-model="cargoName" value="大宗金属货物"/>
              </span>
            </div>

          </li>
          <li><label for="quantity" class="label">数量包装</label><input type="text" id="quantity" placeholder="必填" v-model="quantity" class="placeholder"/></li>
          <li class="distance_price_count">
            <label class="label">始发地</label>
            <div class="select_reset">
              <select v-model="startProvince" class="zcb_select1">
                <option v-for="(val,idx) in startProvinceList" :value="val">{{val}}</option>
              </select>
            </div>
            <div class="select_reset">
              <select v-model="startCity" class="zcb_select2">
                <option v-for="(val,idx) in startCityList" :value="val">{{val}}</option>
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
          <li>
            <label class="label" for="plate_no">头车牌号</label><input type="text" id="plate_no" class="placeholder"
                                                                   placeholder="必填" v-model.trim="plateNo"/>
            <span :class="plateNoCheck?'green ':'red '" class="plateNoTip" v-show="plateNoTipShow">{{plateNoTip}}</span>
          </li>
          <li><label class="label" for="plate_extra_no">挂车牌号</label><input type="text" id="plate_extra_no"
                                                                           class="placeholder" placeholder="选填" maxlength="11"
                                                                           v-model.trim="plateExtraNo"/>
          </li>

          <li class="block"><span class="label">运单号</span><input type="text" placeholder="必填" v-model.trim="trackNo"
                                                                 class="placeholder"/></li>

          <li><label for="price" class="label">保险金额</label><input type="number" id="price" class="placeholder" v-model="coverage" :placeholder="'保额不超过'+maxCoverage/10000+'万元'" @keyup="countPrice"/><span class="fr price_unit">万元</span></li>
          <li class="block2">
            <div class="inline inline_box1">
              <span class="label">保险费率</span><span class="red">{{rate | showRate}}</span>
            </div>
            <div class="inline">
              <span class="label">最低保费</span><span class="red">{{minPremium }}元</span>
            </div>

          </li>
          <li class="agree">
            <i class="iconfont" :class="agree?'icon-duigou':'icon-checkmarkcircle'" @click="agree=!agree"></i>
            <span @click="agree=!agree">我已阅读并同意</span>
            <span class="blue" @click="getAgreements">公路货物运输定额保险条款</span>
            <span>和</span>
            <span class="blue" @click="getAgreements">投保须知</span>
          </li>
        </ul>
      </div>
      <div class="bottom_content">
        <div class="left_create msg_box">{{price | showPrice}}</div>
        <div class="right msg_box" @click="goConfirm"  v-touchFeel>下一步</div>
      </div>
    </div>

    <Risk :title="agreementContent.title" ref="agreement" :html="agreementContent.content"></Risk>

  </div>
</template>

<script>
  import {dchybCreate} from "../mixins/dchyb"
  export default {
    data(){
      return {
        productType:"hwb",
        goRouter:"/hwbConfirm"
      }
    },
    mixins: [dchybCreate],
    created() {

    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/create";
  .price_unit{
    margin-right:pxToRem(40);
  }
  .reset_case {
    @include vc-hc(pxToRem(40));
    line-height: pxToRem(40);
    width: pxToRem(540);
    justify-content: space-around;
    padding: pxToRem(10) 0;
    &>span {
      position: relative;
      padding: pxToRem(6) pxToRem(16);
      border: 1px solid #ddd;
      border-radius: pxToRem(10);
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 1;
        appearance: none
      }
    }
  }
  ul.order_list li.agree{
    font-size: pxToRem(26);
  }
</style>
