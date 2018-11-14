<template>
  <div class="province-city-list">
    <label class="label" v-text="label"></label>
    <div class="select_reset">
      <select v-model="province" class="zcb_select1">
        <option v-for="(val,idx) in provinceList" :value="val">{{val}}</option>
      </select>
    </div>
    <div class="select_reset">
      <select v-model="city" class="zcb_select2">
        <option v-for="(val,idx) in cityList" :value="val">{{val}}</option>
      </select>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {cmnProvinceList,cmnCityList} from "../../../assets/js/api"
  export default {
    props:{
      label:String,
      distance:{type:Object,default () {
        return {province:"未选择",city:"未选择"}
      }}
    },
    data() {
      return {
        province: "未选择",
        provinceList: ["未选择"],
        city: "未选择",
        cityList: ["未选择"],
        initFlag:false
      }
    },
    watch:{
      province(val,oldVal){
        this.distance.province=val;
        if(!this.initFlag){
          this.city="未选择";//切换省份时，城市必然为"未选择"
        }else{
          this.initFlag=false;
        }
        //获取城市列表
        if(val==="未选择"){
          this.cityList=["未选择"]
        }else{
          cmnCityList(val).then(res=>{
            if(res.err_code!==0){Toast({message: res.err_msg, position: 'bottom'});return ;}
            this.cityList=["未选择"].concat(res.data.map((val,idx)=>{
              return val.city
            }));
          })
        }
      },
      city(val,oldVal){
        this.distance.city=val;
        this.$emit("change")
      }
    },
    created() {
      this._getProvinceList();
    },
    methods: {
      async _getProvinceList() {
        let provinceList = this.$getStorage("provinceList");
        if(provinceList){
          this.provinceList= this.provinceList.concat(provinceList);
        }else{
          let res = await cmnProvinceList();
          if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
          this.provinceList = this.provinceList.concat(res.data);
          this.$setStorage({"provinceList":res.data})//首次请求时，将省份信息存储在session中
        }
      },
      initData(data){
        this.initFlag=true;
        this.province=data.province;
        this.city=data.city;
      },
      countPrice() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .label {
    display: inline-block;
    width: 1.35rem;
    margin-right: .1rem;
  }

  .province-city-list {
    select {
      font-size: pxToRem(24);
      height: pxToRem(40);
      line-height: pxToRem(40);
    }
    select:nth-of-type(1) {
      width: pxToRem(180);
      padding-left: pxToRem(40);
    }
    select:nth-of-type(2) {
      width: pxToRem(224);
      padding-left: pxToRem(20);
    }
  }

  .select_reset {
    display: inline-block;
    width: pxToRem(220);
    margin: 0 auto;
    height: pxToRem(50);
    line-height: pxToRem(50);
    font-size: pxToRem(28);
    border: 1px #999 solid;
    border-radius: pxToRem(10);
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    &:nth-of-type(2n) {
      width: pxToRem(250);
    }
    &:after {
      content: ' ';
      position: absolute;
      right: pxToRem(6);
      top: 60%;
      width: 0;
      height: 0;
      border-left: pxToRem(16) solid transparent;
      border-right: pxToRem(16) solid transparent;
      border-top: pxToRem(16) solid #999;
      font-size: 0;
      line-height: 0;
    }
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      position: relative;
      outline: none;
      border: 0 none;
      padding: 0 0 0 pxToRem(20) !important;
      width: 80% !important;
      color: #333;
      font-weight: bold;
      background: none;
      background-color: transparent;
      font-size: pxToRem(28);
      z-index: 99;
      overflow: hidden;
    }
  }

</style>
