<template>
  <div class="addaddress">
      <div class="header">
          <router-link :to="backUrl" tag="span" class="back" v-touchFeel="{color:'#f2f2f2'}"><i class="iconfont icon-fanhui"></i></router-link>
          <span>添加新地址</span>
          <span @click="addAddress" v-touchFeel="{color:'#f2f2f2'}">完成</span>
      </div>
      <div class="addr_box">
          <div class="enter_input">
              <label>收件人</label>
              <input class="weui-input placeholder" type="text" placeholder="请输入" v-model.trim="receiverAdd">
          </div>
          <div class="enter_input">
              <label>联系电话</label>
              <input class="weui-input placeholder" type="number" placeholder="请输入" v-model.trim="phoneAdd">
          </div>
          <div class="enter_input">
              <label>所在地区</label>
              <div class="" @click="addressPicker">
                {{addressPro + addressCity + addressDis}}<span v-if="!addressPro" style="color: #666;">请选择省市区</span>
              </div>
          </div>
          <div class="enter_txtArea">
              <textarea class="" placeholder="请输入详细地址"  v-model.trim="addressDetailAdd"></textarea>
              <div class=""><span>{{addressDetailLength}}</span>/100</div>
          </div>
      </div>
  </div>
</template>

<script>
//  import dataList from 'assets/js/cityData';
  const dataList = ()=>import('assets/js/cityData')
//  import weui from 'weui.js';
  const weui = ()=>import("weui.js");
  import "assets/scss/weui.min.css";
  import { cmnUseraddressAdd } from 'assets/js/api';
  import { Toast } from 'mint-ui';
  export default {
      data() {
          return {
              receiverAdd: '', // 收件人
              phoneAdd: '',   // 联系电话
              addressPro: '', // 省
              addressCity: '', // 市
              addressDis: '', // 区
              addressDetailAdd: '', // 详细地址
              flag: false, // 未设置地址
          }
      },
      computed:{
          addressDetailLength(){  //详细地址长度
              if(this.addressDetailAdd.length > 100){
                  Toast({message: '详细地址不能超过100个字！', duration: 1000 , position:'bottom'});
                  this.addressDetailAdd = this.addressDetailAdd.substring(0,100);
              }
              return this.addressDetailAdd.length
          },
          backUrl(){
              if(this.$store.state.routerFrom.path.toLowerCase().includes("create")){
                  return "/dashboard";
              }else{
                  return this.$store.state.backUrl;
              }
          }
      },
      methods: {
          async addressPicker(){
          	  let _weui = await weui();
          	  let _dataList = await dataList();
              let vm = this;
              _weui.picker(
							    _dataList,
                  {
                      showDistrict:true,
                      defaultValue: ["北京", "北京市", "东城区"],
                      onChange: function (result) {
                      // console.log(result)  // 可选
                      },
                      onConfirm: function (result) {
                        vm.addressPro = result[0].label;
                        vm.addressCity = result[1].label;
                        vm.addressDis = result[2].label;
                      },
                  }
              )
          },
          //添加地址
          addAddress(){
              if(!this.receiverAdd){
                  Toast({message: '请输入收件人！', duration: 1000 , position:'bottom'}); return false;
              }else if(!this.phoneAdd){
                  Toast({message: '请输入手机号！', duration: 1000 , position:'bottom'}); return false;
              }else if(!this.$store.state.reg_phone.test(this.phoneAdd)){
                  Toast({message: '请输入正确手机号！', duration: 1000 , position:'bottom'}); return false;
              }else if(!this.addressDis){
                  Toast({message: '请输入省市区地址！', duration: 1000 , position:'bottom'}); return false;
              }else if(!this.addressDetailAdd){
                  Toast({message: '请输入详细地址！', duration: 1000 , position:'bottom'}); return false;
              }else {
                  let data = {
                      "recipients": this.receiverAdd,
                      "mobile": this.phoneAdd,
                      'province': this.addressPro,
                      'city': this.addressCity,
                      'district': this.addressDis,
                      'street': this.addressDetailAdd
                  }
                  cmnUseraddressAdd(data).then((res)=>{
                      if(res.err_code === 0){
                          this.flag = true;
                          Toast({message: '添加成功！', duration: 1000 , position:'bottom'});
                          if(this.$store.state.routerFrom.path === "/spbCreate"){
                              this.$router.push("spbCreate");
                          }else if(this.$store.state.routerFrom.path === "/ygbCreate"){
                              this.$router.push("ygbCreate");
                          }else{
                              this.$router.push({path:"setAddress",query:this.$route.query});
                          }
                      }else{
                          Toast({ message: res.err_msg || '未知错误', duration: 1000 , position:'bottom'});
                      }
                  }).catch((err)=>{ console.log("cmnUseraddressAdd",err)} )
              }
          },
      }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/user/addAddress.scss';
  .addaddress { height: 100%; background: #fff; }
</style>
