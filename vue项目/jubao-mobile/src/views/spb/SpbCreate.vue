<template>
  <div class="spb_create">
      <v-header title="投保信息填写" ></v-header>
    <div class="content_box">
      <div class="content">
        <div class="spb_cell">
          <div class="enter_title">投保人</div>
          <div class="enter_input">
            <input type="text" :value="policyholder" disabled>
          </div>
          <div class="icon"></div>
        </div>
        <div class="spb_cell">
          <div class="enter_title">被保险人</div>
          <div class="enter_input">
            <input type="text" placeholder="请输入被保险人公司名称" :value="beneficiary" disabled>
          </div>
          <div class="icon"></div>
        </div>
        <div class="spb_order" v-for="(item,index) in shops" :key="index">
          <div class="spb_order_title spb_cell" v-touchFeel="{color:'#f1f1f1'}" @click="toggleShop(index)">
            <div>商铺档口{{ index+1 }}</div>
            <div class="icon">
              <i class="iconfont icon-jiantou" v-if="item.toggle === 'display'"></i>
              <i class="iconfont icon-right" v-if="item.toggle === 'hide'"></i>
            </div>
          </div>
          <div class="spb_orderDetail" :ref="'shop'+index">
            <div class="spb_order_case spb_cell">
              <div>保障方案</div>
              <ul class="case_tab">
                <li class="case_item"
                    :class="item.coverage === priceItem.coverage ? 'on': ''"
                    @click="setCase(index,priceItem.coverage,priceItem.price)"
                    :key="Idx"
                    v-for="(priceItem,Idx) in priceList">
                  {{ priceItem.name }}<br/>{{ priceItem.coverage/10000 }}万
                </li>
              </ul>
            </div>
            <div class="spb_cell" @click="pickerAddr(index)">
              <div class="enter_title">档口地址</div>
              <div class="enter_input">
                <input type="text" placeholder="请选择省市区" disabled :value="item.province + item.city + item.district">
              </div>
              <div class="icon">
                <i class="iconfont icon-right"></i>
              </div>
            </div>
            <div class="spb_order">
              <div class="spb_cell">
                <div class="enter_input">
                  <input type="text" class="only_input" placeholder="详细地址" v-model.trim="item.address">
                </div>
              </div>
            </div>
            <div class="spb_front upload">
              <upload :url="$store.state.fileUrl"
                      v-model="item.front_image_urls"
                      title="上传商铺正面照(至少一张)">
              </upload>
            </div>
            <div class="spb_inside upload">
              <upload :url="$store.state.fileUrl"
                      v-model="item.inside_image_urls"
                      title="上传商铺内部照(至少三张)">
              </upload>
            </div>
            <div class="spb_fire upload">
              <upload :url="$store.state.fileUrl"
                      v-model="item.fire_device_image_urls"
                      title="上传商铺消防设施照(至少两张)">
              </upload>
            </div>
            <div class="delete">
              <span @click="addShop()">新增档口</span>
              <span @click="emptyShop()" v-if="index === 0">清空信息</span>
              <span @click="deleteSp(index)" v-else>删除档口</span>
            </div>
          </div>
        </div>
        <Invoice :invoiceData="invoiceData" :addressData="addressData" :edit="true" @toAddress="toAddress"></Invoice>
        <div class="spb_lisence upload">
          <upload :url="$store.state.fileUrl"
                  v-model="license_file_url"
                  title="上传营业执照"
                  :onlyOne="true">
          </upload>
        </div>
        <div class="agree">
          <span @click="agree = !agree">
            <i class="iconfont icon-danxuan blue" v-if="agree"></i><i class="iconfont icon-danxuan1" v-else></i> 我已阅读并同意
          </span>
          <span class="blue" @click.stop="getClause('财产基本险条款')" >《财产基本险条款》</span>
          <span>和</span>
          <span class="blue" @click.stop="getClause('投保须知')" >《投保须知》</span>
        </div>
      </div>
      <div class="next">
        <span class="red">¥{{ totalPrice }}</span>
        <input type="button" class="blue_bg" value="下一步" v-touchFeel="{color:'#0fbcf7'}" @click="createOrder()">
      </div>
    </div>
      <Risk :title="agreementContent.title" ref="agreement" :html="agreementContent.content"></Risk>
  </div>
</template>

<script>
  import Risk from "views/components/Risk.vue"
//  import UpLoad from 'base/weuiUpload/weuiUpload';
  const upload = ()=>import('base/weuiUpload/weuiUpload')
  import { Toast,Indicator,MessageBox } from 'mint-ui';
  const dataList = ()=> import('assets/js/cityData');
  const weui = ()=>import("weui.js")
  import {invoiceCreate} from '../mixins/invoice'
  import Invoice from 'views/components/Invoice'
  import {
    cmnUserInfo,
    spbUserInfo,
    cmnUseraddressList,
    spbOrderSave,
    cmnCompanyInfo,
    cmnCompanyUpdate,
    spbOrderInfo,
    cmnAdminAgreementList,
    spbPrice
  } from 'assets/js/api';
  export default {
      components: { upload,Risk,Invoice },
      mixins:[invoiceCreate],
      data(){
          return {
              orderId: 0, // 订单ID  不为0，修改已有订单;  id为0，创建新订单;
              priceName: [], // 价格方案名称
              priceList: [], // 价格方案列表
              policyholder: "", // 投保人
              beneficiary: "", // 被保险人(公司)
              operator_mobile: "",// 操作人手机号
              price: "",
              shops: [
                  {
                      "coverage": this.priceList && this.priceList[0].coverage || 1000000,
                      "price": this.priceList && this.priceList[0].price || 120000,
                      "province": '',
                      "city": '',
                      "district": '',
                      "address": "",
                      "front_image_urls": [],
                      "inside_image_urls": [],
                      "fire_device_image_urls": [],
                      "toggle": "display" // 档口显示隐藏
                  },
              ],
              license_file_url: [], // 投保人公司营业执照 Array
              agree: false, // 同意协议
              agreementContent:{},// 协议
              postLimit: true,  // 限制用户的点击频率
              productType: 'spb', //
          };
      },
      created(){
          Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
          // 获取价格方案列表
          this.getPrice();
				  if(this._fromAddress()){ //从本地获取数据
					    this.setDataBySession().then(()=>Indicator.close()).catch(()=>Indicator.close());
				  }else if(this.$route.query.orderId){// 1. 有订单ID进入
              this.orderId = this.$route.query.orderId; // 赋值orderId
              this.agree = true; // 由订单ID返回默认同意
              Promise.all([spbOrderInfo(this.orderId),cmnCompanyInfo()]).then( res =>{
                  Indicator.close();
                  // 商铺保订单信息
                  let tempArr = ["policyholder","beneficiary","operator_mobile","price"];
                  if(res[0].err_code === 0){
                      tempArr.forEach( item => this[item] = res[0]["data"][item] );
                      this.shops = res[0].data.shops.map( L => {
                          let temp = ["created_at","updated_at","deleted_at","note","inside_image","front_image","fire_device_image"];
                          temp.forEach( M => { delete L[M]; });
                          L.toggle = "display"; // 控制shop点击显示隐藏
                          // 赋值为[]兼容未上传档口照片的旧订单
                          if(L.front_image_urls === null || L.front_image_urls.length === 0) L.front_image_urls = [];
                          if(L.inside_image_urls === null || L.inside_image_urls.length === 0) L.inside_image_urls = [];
                          if(L.fire_device_image_urls === null || L.fire_device_image_urls.length === 0) L.fire_device_image_urls = [];
                          return L;
                      });
                      //设置邮寄地址
                      this.setAddressData(res[0],'orderInfo');
                      //设置发票信息
                      this.setInvoiceData(res[0].data,'orderInfo')
                  }
                  // 公司营业执照、ID
                  if(res[1].err_code === 0){
                      this.license_file_url =  [ res[1]["data"].license_file_url ];    // array
                  }
              }).catch( err =>{ MessageBox('网络异常,请手动刷新页面，详情请咨询聚保服务热线:40080-59680') });
          }else{  // 2. 新建保单
              Promise.all([spbUserInfo(),cmnUseraddressList(),cmnCompanyInfo(),cmnUserInfo()]).then( res =>{
                  Indicator.close();
                  // 商铺保用户信息
                  if(res[0].err_code === 0 && res[0].data.disabled){
                    Toast({message:'非常抱歉，您的账户暂时无法投保"商铺档口火灾保"，建议您选择其他险种，详询聚保服务热线: 40080-59680',position:'bottom'});
                    this.$router.push('/dashboard');
                  }
                  // 用户邮寄地址（保单寄送地址）
                  if(res[1].err_code === 0 && res[1].rows[0]){
                      //设置邮寄地址
                      this.setAddressData(res[1],'userAddressList');
                  }
                  // 公司名、营业执照、ID
                  if(res[2].err_code === 0){
                      let data = res[2].data;
                      if(!data.name){
                      	this.toSetting();
                      	return
                      }
                      //设置发票信息
                      this.setInvoiceData(data,'companyInfo');
                      this.policyholder =  data.name; // string
                      this.beneficiary =  data.name; // string
                      this.license_file_url =  data.license_file_url ? [ data.license_file_url ] : [];  // array
                  }else if(res[2].err_code === 1200){
                    this.toSetting();
//                      Toast({message:'检测到您还没有设置公司名称，请先设置公司名称',position:'bottom'}); // 公司不存在，即未设置公司名称
//                      this.$router.push('/setCompanyName')
                  }
                  if(res[3].err_code === 0){
                    this.operator_mobile =  res[3]["data"].mobile;
                  }
              }).catch( err =>{ MessageBox('网络异常,请手动刷新页面，详情请咨询聚保服务热线:40080-59680') });
          }
      },
      computed: {
          totalPrice(){ // 总价
              this.price = this.shops.reduce((x,y)=>{ return x + y.price*1 },0);
              return (this.shops.reduce((x,y)=>{ return x + y.price*1 },0) / 100).toFixed(2);
          },
      },
      methods: {
          toSetting(){
            MessageBox({message:'公司名称为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
              .then(action=>{
                if(action === 'confirm') this.$router.push({path:'/setCompanyName'});
                if(action === 'cancel') this.$router.push('/dashboard');
              })
          },
          // 选择档口方案
          setCase(index,coverage,price){
              this.shops[index].coverage = coverage; // 单位元
              this.shops[index].price = price; // 单位分
          },
          // 设置档口省市区
          async pickerAddr(index){
          	  let _weui = await weui();
          	  let _dataList = await dataList();
              let self = this;
						_weui.picker( _dataList, {
                      showDistrict:true,
                      defaultValue: ["北京", "北京市", "东城区"],
                      onConfirm: function (result) {
                          self.shops[index].province = result[0].label;
                          self.shops[index].city = result[1].label;
                          self.shops[index].district = result[2].label;
                      },
                  }
              )
          },
          // 增加商铺
          addShop() {
              this.shops.push({"coverage": this.priceList[0].coverage,"price": this.priceList[0].price,"province": '',"city": '',"district": '',"address": "","front_image_urls": [],"inside_image_urls": [],"fire_device_image_urls": [],"toggle": "display" });
          },
          // 清空信息
          emptyShop(){
              let temp = {"coverage": this.priceList[0].coverage,"price": this.priceList[0].price,"province": '',"city": '',"district": '',"address": "","front_image_urls": [],"inside_image_urls": [],"fire_device_image_urls": [],"toggle": "display" };
              this.shops.splice(0,1,temp);
          },
          // 删除档口
          deleteSp(index) {
              MessageBox.confirm('确定删除档口?').then(action => {
                  this.shops.splice(index, 1);
                  Toast({message:'删除成功！', duration: 1000, position:'bottom'});
              }).catch(err=>{})
          },
          // 商铺显示隐藏
          toggleShop(index){
              let display = this.$refs["shop"+index][0].style.display;
              if(display === "none") {
                  this.$refs["shop"+index][0].style.display = "block";
                  this.shops[index].toggle = 'display';
              }else {
                  this.$refs["shop"+index][0].style.display = "none";
                  this.shops[index].toggle = 'hide';
              }
          },
          // 创建订单
          createOrder(){
              // 信息验证
              var errArr = [];
              this.shops.forEach((item,index)=>{
                  if(!item.district) { errArr.push(`请选择档口${index + 1}省市区地址`); return false; }
                  if(!item.address) { errArr.push(`请输入档口${index + 1}详细地址`); return false; }
                  if(item.front_image_urls.length < 1) { errArr.push(`请完善档口${index + 1}正面照`); return false; }
                  if(item.inside_image_urls.length < 3) { errArr.push(`请完善档口${index + 1}内部照`); return false; }
                  if(item.fire_device_image_urls.length < 2) { errArr.push(`请完善档口${index + 1}消防设施照`); return false; }
              })

              if(errArr.length !== 0) { Toast({message: errArr[0], duration: 1000, position:'bottom'}); return false; }
						  if(!this.checkInvoice())return false;
              if(this.license_file_url.length < 1) { Toast({message:'请上传投保人公司营业执照', duration: 1000, position:'bottom'});  return false; }
              if(!this.agree) { Toast({message:'请阅读并勾选相关协议', duration: 1000, position:'bottom'}); return false; }
              // 点击限制
              if(!this.postLimit) {
                  return false;
              }else {
                  this.postLimit = false;
              }
              Indicator.open({text: '订单处理中...', spinnerType: 'fading-circle'});
              // 保存订单
              let data = {
                  id: this.orderId * 1,
                  policyholder: this.policyholder,
                  beneficiary: this.beneficiary,
                  license_file_url: this.license_file_url[0],
                  operator_mobile: this.operator_mobile,
                  price: this.price,
                  shops: this.shops,
                  user_address_id:this.addressData.user_address_id,
                  ...this.invoiceSaveData
              };
            let query = this.$getStorage("locationQuery");
            if(query && query.alias){
              data.alias = query.alias
            }
              spbOrderSave(data).then( res =>{
                  Indicator.close(); this.postLimit = true;
                  if(res.err_code === 0){
                      Toast({ message: '订单保存成功！', duration: 1000, position:'bottom' }); this.$router.push({path: "/spbConfirm", query: { orderId: res.data.id }});
                  }else if(res.err_code === 1014){
                      MessageBox("提示", "尊敬的会员： 非常抱歉，您的账户暂时无法投保商铺保，建议您选择其他险种，详询聚保服务热线：40080-59680");return false;
                  }else {
                      Toast({message: res.err_msg || '未知错误！', duration: 1000 , position:'bottom'}); return false;
                  }
              })
          },
          // 获取价格列表
          getPrice(){
              spbPrice().then( res => {
                  if(res.err_code === 0){
                      this.priceList = res.data;
                  }
              })
          },
          //获取协议
          getClause(title){
              cmnAdminAgreementList({product_name:'商铺档口火灾保',title}).then((res)=>{
                  this.agreementContent = {};
                  if(res.err_code === 0){
                      this.agreementContent = res.rows[0]? res.rows[0]:{title,html:''};
                      this.$refs.agreement.open();
                  }
              })
          }
      },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/spb/spbCreate.scss";
  .clause_risk { position: fixed; top: 0; bottom: 0; left: 0; right: 0; overflow: scroll; background: #fff; z-index: 1000; }
  .content_box{
    bottom:0;
    .content{
      min-height: 100%;
      height: auto !important;
    }
    .agree{
      margin-bottom: pxToRem(100);
    }
    .next{
      margin-top: pxToRem(-100);
    }
  }
</style>
