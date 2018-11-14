<template>
  <div class="zcb_create">
    <v-header title="投保信息填写"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order_list">
          <li class="flex">
            <label for="policyholder" class="label">投保人</label>
            <input type="text" id="policyholder" class="company" placeholder="请选择投保人名称" :value="policyholder" disabled maxlength="50"/>
          </li>
          <li class="flex"><label for="beneficiary" class="label">被保险人</label>
            <input type="text" id="beneficiary" class="company" placeholder="请选择被保险人名称" :value="beneficiary" disabled maxlength="50"/>
          </li>
          <li class="li-tab">
            <span class="label">货车类型</span>
            <div class="li-tab-body">
              <div class="tab-item" :class="{active:truck_type==1}" @click="truck_type=1">带挂货车</div>
              <div class="tab-item" :class="{active:truck_type==2}" @click="truck_type=2;plateExtraNo='';">普通货车</div>
            </div>
          </li>
          <li>
            <label class="label" for="plate_no">{{truck_type==1?'头车牌号':'车牌号'}}</label>
            <input type="text" id="plate_no" class="placeholder" :placeholder="truck_type==1?'请填写头车牌号':'请填写车牌号'" v-model.trim="plateNo"/>
            <span :class="plateNoCheck?'green ':'red '" class="plateNoTip" v-show="plateNoTipShow">{{plateNoTip}}</span>
          </li>
          <li v-show="truck_type==1">
            <label class="label" for="plate_extra_no">挂车牌号</label>
            <input type="text" id="plate_extra_no" class="placeholder" placeholder="请填写挂车牌号" v-model.trim="plateExtraNo" maxlength="11"/>
          </li>
          <li class="distance_price_count">
            <label class="label">始发地</label>
            <div class="select_reset">
              <select v-model="startProvince" class="zcb_select1">
                <option :value="''">未选择</option>
                <option v-for="(val,idx) in provinceList" :value="val">{{val}}</option>
              </select>
            </div>
            <div class="select_reset">
              <select v-model="startCity" class="zcb_select2" @change="countPrice">
                <option :value="''">未选择</option>
                <option v-for="(val,idx) in startCityList" :value="val.city" >{{val.city}}</option>
              </select>
            </div>
          </li>
          <li class="distance_price_count">
            <label class="label">目的地</label>
            <div class="select_reset">
              <select v-model="endProvince" class="zcb_select1">
                <option :value="''">未选择</option>
                <option v-for="(val,idx) in provinceList" :value="val">{{val}}</option>
              </select>
            </div>
            <div class="select_reset">
              <select v-model="endCity" class="zcb_select2" @change="countPrice">
                <option :value="''">未选择</option>
                <option v-for="(val,idx) in endCityList" :value="val.city">{{val.city}}</option>
              </select>
            </div>
          </li>
          <li class="li-tip">
            承保运输范围：中国人民共和国境内（港澳台除外，且不含西藏、新疆路线，即起运地、目的地和途径地均不含上述地区）。
          </li>
          <li>
            <span class="label">里程</span><span class="red distance">{{distance}}</span><span>公里</span>
          </li>
          <li class="li-tab">
            <span class="label">责任限额</span>
            <div class="li-tab-body f24">
              <div class="tab-item" :class="{active:coverage == item}" v-for="(item,index) in coverageList" @click="coverage = item;countPrice();">{{item/10000}}万</div>
            </div>
          </li>
          <li class="block2 upload_box">
            <div>上传装车清单照片</div>
            <div class="upload-excel">
              <div @click="excel" class="upload-excel-img" v-for="(item,index) in excelList" :key="index">
                <img src="http://test.jubao56.com/res/2018/02/09/16/4615934/excelSampleOnly.jpg" alt="">
              </div>
              <upload :url="$store.state.fileUrl" :maxLimit="15" v-model="imgList"></upload>
            </div>
          </li>
          <li class="agree" @click="agree=!agree">
            <i class="iconfont" :class="agree?'icon-danxuan':'icon-yuan'" ></i>
            <div class="msg">
              <span>我已阅读并同意</span><span @click.stop="getClause('无车承运人责任保险条款')" class="blue">《无车承运人责任保险条款》</span><span>、</span>
              <span @click.stop="getClause('投保须知')"  class="blue">《投保须知》</span><span>和</span><span @click.stop="getClause('特别约定')"  class="blue">《特别约定》</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom_content">
        <div class="left_create msg_box">￥{{(allPrice/100).toFixed(2)}}</div>
        <div class="right msg_box" @click="createOrder" v-touchFeel>下一步</div>
      </div>
    </div>
    <Risk :title="agreementContent.title" ref="agreement" :html="agreementContent.content"></Risk>
  </div>
</template>

<script>
  import {MessageBox, Indicator, Toast} from 'mint-ui';
  import {carPlateNo} from "../mixins/index.js"
//  import upload from "../../base/weuiUpload/weuiUpload.vue"
  const upload = ()=>import('base/weuiUpload/weuiUpload')
  import {cmnProvinceList, cmnCityList, zxbCoverageList, zxbRoutePrice, cmnCompanyInfo, zxbUserInfo,zxbOrderList, zxbOrderSave,zxbOrderInfo, cmnAdminAgreementList} from '../../assets/js/api';
  import Risk from "../components/Risk.vue"

  export default {
    components: {
      upload, Risk
    },
    mixins: [carPlateNo],
    data() {
      return {
        //信息渲染部分
        policyholder: "",      //投保人
        beneficiary: "",     //被保险人
        truck_type: 1,
        plateNo: null,   //头车牌号
        plateExtraNo: '', //挂车牌号
        startProvince: '',//始发地省份
        startCity: '',     //始发地市
        endProvince: '',   //目的地省份
        endCity: '',       //目的地市
        provinceList: [],
        startCityList: [],
        endCityList: [],
        allPrice: 0, //价格
        distance: 0, //里程
        coverageList: [], //赔偿限额
        coverage: 0,
        imgList: [], //装车清单图片
        excelList:[],//pc端上传的excel
        cargos: null,//装车清单
        agreementContent: {},//协议
        agree: false,
        productType: 'zxb',
      }
    },
    watch: {
      async startProvince(val,oldVal) {
        if (!val) return;
        let res = await cmnCityList(val);
        if (res.err_code !== 0) {
          Toast({message: res.err_msg || '未知错误', position: 'bottom'});
          return
        }
        this.startCityList = res.data;
        if(oldVal){
          this.allPrice = 0;
          this.distance = 0;
          this.startCity = '';
        }
      },
      async endProvince(val,oldVal) {
        if (!val) return;
        let res = await cmnCityList(val);
        if (res.err_code !== 0) {
          Toast({message: res.err_msg || '未知错误', position: 'bottom'});
          return
        }
        this.endCityList = res.data;
        if(oldVal){
          this.allPrice = 0;
          this.distance = 0;
          this.endCity = '';
        }
      },
    },
    created() {
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
      if(this.$route.query.orderId){ //有订单id
        this.orderId = this.$route.query.orderId;
        this._setDataByOrder()
      }else{ //无订单id
        this._setDataInit()
      }
    },
    methods: {
      //初始设置数据和检验  无订单id
      async _setDataInit() {
        try {
          let res = await Promise.all([cmnCompanyInfo(), zxbUserInfo(), zxbOrderList({page: 1, rows: 1}), this._getInitData()]);
          Indicator.close();
          //公司名称
          if (res[0].err_code === 1200) {
            MessageBox({message:'公司名称(纳税人名称)，税务登记号为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
              .then(action =>{
                if(action === 'confirm') this.$router.push({path:'/invoicePage',query:{productType:this.productType}});
                if(action === 'cancel') this.$router.push('/dashboard');
              });
          }
          if (res[0].err_code !== 0) {Toast({message: res[0].err_msg || "未知错误", position: 'bottom'});return;}
          if (res[0].data.name && res[0].data.license_no) {
            this.policyholder = res[0].data.name;
            this.beneficiary = res[0].data.name;
          } else {
            MessageBox({message:'公司名称(纳税人名称)，税务登记号为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
              .then(action =>{
                if(action === 'confirm') this.$router.push({path:'/invoicePage',query:{productType:this.productType}});
                if(action === 'cancel') this.$router.push('/dashboard');
              });
//            this.$router.push("/setCompanyName");
            return;
          }
          //账户
          if (res[1].err_code === 1010 || res[1].data && !res[1].data.signed) {
//            Toast({message: "请先签署相关协议", position: 'bottom'});
            this.$router.push("/zxbAgree");
            return;
          }
          if (res[1].err_code !== 0)  {Toast({message: res[1].err_msg || "未知错误", position: 'bottom'});return;}
          if (res[1].data && res[1].data.disabled) { //账户被禁用
            MessageBox('提示', '尊敬的会员： 非常抱歉，您的账户暂时无法投保专线保，建议您选择其他险种，详询聚保服务热线：40080-59680');
            this.$router.push("dashboard");
            return;
          }
          //历史投保记录则自动录入 投保路线，
          if (res[2].err_code !== 0)  {Toast({message: res[2].err_msg || "未知错误", position: 'bottom'});return;}
          if (res[2].rows && res[2].rows[0]) {
            this.startProvince = res[2].rows[0].start_province;
            this.startCity = res[2].rows[0].start_city;
            this.endProvince = res[2].rows[0].end_province;
            this.endCity = res[2].rows[0].end_city;
            this.coverage = res[2].rows[0].coverage;
            this.allPrice = res[2].rows[0].price;
            this.distance = res[2].rows[0].distance;
          }
        } catch (e) {
          Indicator.close();
        }
      },
      //设置数据 有订单id
      async _setDataByOrder() {
        this.agree = true;
        try {
          let res = await Promise.all([zxbOrderInfo(this.orderId), this._getInitData()]);
          Indicator.close();
          if (res[0].err_code !== 0) {Toast({message: res[0].err_msg || '未知错误', position: 'bottom'});return;}
          this.policyholder = res[0].data.policyholder;
          this.beneficiary = res[0].data.policyholder;
          this.startProvince = res[0].data.start_province;
          this.startCity = res[0].data.start_city;
          this.endProvince = res[0].data.end_province;
          this.endCity = res[0].data.end_city;
          this.coverage = res[0].data.coverage;
          this.allPrice = res[0].data.price;
          this.distance = res[0].data.distance;
          this.plateNo = res[0].data.plate_no;
          this.plateExtraNo = res[0].data.plate_extra_no;
          if(!this.plateExtraNo)this.truck_type = 2;
          this.cargos = res[0].data.cargos;
          res[0].data.cargos.map((item) => {
            let file_type = item.file_url.substring(item.file_url.lastIndexOf('.')+1);
            if(file_type === "xlsx" || file_type === "xls"){
              this.excelList.push(item.file_url)
            }else{
              this.imgList.push(item.file_url)
            }
          })
        } catch (e) {
          console.log(e)
          Indicator.close();
        }
      },
      //获取页面公共初始数据
      async _getInitData() {
        let res = await Promise.all([cmnProvinceList(), zxbCoverageList()]);
        //省份列表
        if (res[0].err_code === 0) {
          this.provinceList = res[0].data;
        } else {
          Toast({message: res[0].err_msg || "未知错误", position: 'bottom'})
        }
        //保额列表
        if (res[1].err_code === 0) {
          this.coverageList = res[1].rows;
          this.coverage = this.coverageList[0]
        } else {
          Toast({message: res[1].err_msg || "未知错误", position: 'bottom'})
        }
      },
      //计算价格里程
      async countPrice() {
        if (this.startProvince && this.startCity && this.endProvince && this.endCity) {
          let data = {
            start_province: this.startProvince,
            start_city: this.startCity,
            end_province: this.endProvince,
            end_city: this.endCity,
            coverage: this.coverage
          };
          let res = await zxbRoutePrice(data);
          if (res.err_code === 0) {
            console.log(res,11)
            this.allPrice = res.data.price;
            this.distance = res.data.distance;
          } else {
            Toast({message: res.err_msg || "未知错误", position: 'bottom'})
          }
        }else{
          this.allPrice = 0;
          this.distance = 0;
        }
      },
      //输入验证
      _checkInput() {
        let errArr = [];
        if (!this.plateNo)errArr.push('请输入运输车辆的车牌号码！');
        if (!this.$store.state.plateNoReg.test(this.plateNo))errArr.push('运输车辆的车牌号码格式有误！');
        if (!this.startProvince || !this.startCity || !this.endProvince || !this.endCity) errArr.push('请选择本次路线的始发地和目的地！');
        if (this.truck_type === 1 && !this.plateExtraNo)errArr.push('带挂车辆请输入运输车辆的挂车牌号码！');
        if (this._getCargos().length === 0) errArr.push('请上传装车清单扫描件！');
        if (!this.agree) errArr.push('请阅读并勾选相关协议！');
        if (errArr.length > 0) {
          Toast({message: errArr[0], position: 'bottom'});
          return false;
        }
        return true;
      },
      //收集货物清单
      _getCargos() {
        let cargos = this.imgList.map((item) => {
          return {file_url: item}
        });
        if (this.cargos) {  //对比图片是否改变，给没改变的带上原有id
          cargos = this.imgList.map((item) => {
            let cargo = {file_url: item};
            this.cargos.forEach((ele) => {
              if (ele.file_url === item) {
                cargo = ele
              }
            });
            return cargo
          })
        }
        return cargos.concat(this.excelList.map((item)=>{return{file_url:item}}));
      },
      //创建订单
      async createOrder() {
        if (!this._checkInput()) return;
        //收集数据
        let data = {
          id: this.orderId ? this.orderId*1 : 0,
          policyholder: this.policyholder,
          beneficiary: this.beneficiary,
          plate_no: this.plateNo,
          plate_extra_no: this.plateExtraNo,
          start_province: this.startProvince,
          start_city: this.startCity,
          end_province: this.endProvince,
          end_city: this.endCity,
          coverage: this.coverage,
          cargos: this._getCargos()
        };
        Indicator.open({text: '订单处理中...', spinnerType: 'fading-circle'});
        try {
          let res = await zxbOrderSave(data);
          Indicator.close();
          if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
          this.$router.push({path: 'zxbConfirm', query: {orderId: res.data.id}})
        } catch (e) {
          Indicator.close();
        }
      },
      //获取协议
      async getClause(title) {
        let res = await cmnAdminAgreementList({product_name:'专线保',title});
        if (res.err_code === 0) {
          this.agreementContent = res.rows[0] || {title,html:''};
          this.$refs.agreement.open();
        }
      },
      excel(){
        Toast({message: "注意：此文件格式仅支持在pc端查看！", position: 'bottom'});
      }
    },
    beforeDestroy(){
      MessageBox.close(false);
    }
  }
</script>
<style lang="scss" type="text/scss">
  .upload-excel{
    .upload-excel-img{
      float: left;
      position: relative;
      margin-top: 10px;
      margin-left: 10px;
      width: 77px ;
      height: 77px;
      border: 1px solid #d9d9d9;
      img{
        width: 77px ;
        height: 77px;
      }
    }
    .weui-cell:before{
     border: none !important;
    }
  }
</style>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/create";
  .zcb_create ul.order_list li {
    height: pxToRem(90);
    line-height: pxToRem(90);
  }
  li.block{
    margin-bottom: pxToRem(20) !important;
  }
  li.block2{
    margin-bottom: pxToRem(30) !important;
  }
  .zcb_create ul.order_list li.li-tip{
    display: flex;
    align-items: center;
    font-size: pxToRem(25);
    line-height: pxToRem(30);
    color: $blue;
  }
  li.li-tab,.li-tab{
    display: flex;
    align-items: center;
    .li-tab-body{
      display: flex;
      height: 100%;
      align-items: center;
      .tab-item{
        height: pxToRem(50);
        line-height: pxToRem(30);
        border-radius: pxToRem(8);
        margin-right: pxToRem(40);
        box-sizing: border-box;
        border: 1px solid #ccc;
        padding: pxToRem(10) pxToRem(7);
        &.active{
          color: $blue;
          border: 1px solid $blue;
        }
        &:first-child{
          margin-left: pxToRem(10);
        }
      }
      &.f24 .tab-item{
        margin-right:pxToRem(25) ;
      }
    }
  }
  li.agree{
    height: auto !important;
    font-size: pxToRem(26) !important;
    line-height: pxToRem(34) !important;
    margin-bottom:pxToRem(40);
    display: flex;
    align-items: center;
    .icon-danxuan{
      color: $blue;
    }
    .msg{
      margin-left: pxToRem(20);
      padding: pxToRem(16) 0 pxToRem(9);
    }
  }
</style>
