<template>
  <div class="phb_create">
    <v-header title="投保信息填写"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order_list">
          <li class="flex-center" v-if="!hasLogin">
            我已是会员，<a @click="goLogin">一键登录</a>&nbsp;投保
          </li>
          <li class="flex">
            <label for="policyholder" class="label">投保人</label>
            <input type="text" id="policyholder" class="company" placeholder="与被保险人一致" :value="beneficiary" :class="{red:!$store.state.reg_company.test(beneficiary)}" disabled maxlength="50"/>
          </li>
          <li class="flex"><label for="beneficiary" class="label">被保险人</label>
            <input type="text" id="beneficiary" class="company" placeholder="请输入被保险人名称" v-model.trim="beneficiary" :class="{red:!$store.state.reg_company.test(beneficiary)}" :disabled="disabled" maxlength="50"/>
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
              <select v-model="startCity" class="zcb_select2">
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
              <select v-model="endCity" class="zcb_select2">
                <option :value="''">未选择</option>
                <option v-for="(val,idx) in endCityList" :value="val.city">{{val.city}}</option>
              </select>
            </div>
          </li>
          <li>
            <label class="label" style="width: 35%;">保险金额（万元）</label>
            <input type="number" class="company" :placeholder="'保额不超过'+(max_coverage/10000)+'万元'" v-model="coverage" @input="countPrice"/>
          </li>
          <li class="baofei">
            <div>保险费率： <span>{{rate ? (rate/10000)+'%' : '--'}}</span></div>
            <div>最低保费： <span>{{min_premium}}</span>元</div>
          </li>
          <li class="tab-title">
            <div :class="{active:type==1}" @click="type=1">单票投</div>
            <div :class="{active:type==2}" @click="type=2">整车投</div>
            </li>
          <li class="block2" v-if="type==1">
            <ul>
              <li class="flex">
                <label class="label">运单号</label>
                <input type="text" class="company" placeholder="请输入运单号" v-model="track_no" />
              </li>
              <li class="flex"><label class="label">货物名称</label>
                <input type="text" class="company" placeholder="请输入货物名称" v-model="cargo_name" />
              </li>
              <li class="flex"><label class="label">数量单位</label>
                <input type="text" class="company" placeholder="请输入数量和单位，例如10吨、20件" v-model="quantity" />
              </li>
            </ul>
          </li>
          <li class="block2" v-if="type==2">
            <div class="upload-excel">
              <!--<div @click="excel" class="upload-excel-img" v-for="(item,index) in excelList" :key="index">-->
                <!--<img src="http://test.jubao56.com/res/2018/02/09/16/4615934/excelSampleOnly.jpg" alt="">-->
              <!--</div>-->
              <upload :url="$store.state.fileUrl" :maxLimit="10" v-model="imgList"></upload>
            </div>
            <div class="tip">温馨提示：请上传装车清单照片</div>
          </li>
          <RegisterInPage :company.sync="beneficiary" ref="registerInPage" @success="getClause('不保货物告知')" v-if="!hasLogin"></RegisterInPage>
          <li class="agree" @click="agree=!agree">
            <i class="iconfont" :class="agree?'icon-danxuan':'icon-yuan'" ></i>
            <div class="msg">
              <span>我已阅读并同意</span><span @click.stop="getClause('国内水路、陆路货物运输保险条款')" class="blue">《国内水路、陆路货物运输保险条款》</span>
              <span>和</span><span @click.stop="getClause('投保须知')"  class="blue">《投保须知》</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom_content">
        <div class="left_create msg_box">￥{{(allPrice/100).toFixed(2)}}</div>
        <div class="right msg_box" @click="next" v-touchFeel>下一步</div>
      </div>
    </div>
    <!--只在查看‘不保货物告知’后点击‘我知道了’才会触发next事件-->
    <Risk :title="agreementContent.title" ref="agreement" :productType="productType" @next="createOrder" :html="agreementContent.content"></Risk>
  </div>
</template>

<script>
	import {MessageBox, Indicator, Toast} from 'mint-ui';
	import {carPlateNo} from "../mixins/index.js"
//	import upload from "../../base/weuiUpload/weuiUpload.vue"
  const upload = ()=>import('base/weuiUpload/weuiUpload')
	import { getToken ,cmnProvinceList, cmnCityList, cmnProductpriceList, cmnCompanyInfo, dchybUserList,dchybOrderList,dchybOrderPrice, dchybOrderSave,dchybOrderInfo, cmnAdminAgreementList} from '../../assets/js/api';
	import Risk from "../components/Risk.vue"
	import RegisterInPage from "../components/RegisterInPage.vue"
  import { login } from '../mixins/login.js'
  import {debounce} from '../../assets/js/store'

	export default {
		components: {
      upload, Risk, RegisterInPage
		},
		mixins: [login,carPlateNo],
		data() {
			return {
				//信息渲染部分
        hasLogin:getToken(),
				beneficiary: "",     //被保险人
				disabled:true,
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
				type:1, //1.按票 2.按车
				rate:0,
				max_coverage:0,
				min_premium:0,
				price_id:'',
				coverage: '',
				track_no:'',
				cargo_name:'',
				quantity:'',
				imgList: [], //装车清单图片
//				excelList:[],//pc端上传的excel
				cargos: null,//装车清单
				agreementContent: {},//协议
				agree: false,
				productType: 'phb',
				productName: '普货保',
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
			if(this._fromLogin()){ //判断是否直接从登录页面过来并且本地有数据
				this._getStorageData();
				this.$nextTick(()=>Indicator.close());
			}else if(!this.hasLogin){ //未登录
        this.disabled = false;
				this._getInitData().then(()=>Indicator.close()).catch(()=>Indicator.close());
      }else if(this.$route.query.orderId){ //有订单id
				this.orderId = this.$route.query.orderId;
				this._setDataByOrder()
			}else{ //无订单id，需先获取价格方案
				this._getInitData().then(()=>{
					if(this.price_id) this._setDataInit();
        })
			}
		},
		methods: {
			//初始设置数据和检验  无订单id
			async _setDataInit() {
				try {
					let res = await Promise.all([cmnCompanyInfo(), dchybUserList({price_id:this.price_id}), dchybOrderList({product_name : this.productName,page: 1, rows: 1})]);
					Indicator.close();
					//公司名称
					if (res[0].err_code === 1200) {
						MessageBox({message:'公司名称为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
							.then(action =>{
								if(action === 'confirm') this.$router.push({path:'/setCompanyName'});
								if(action === 'cancel') this.$router.push('/dashboard');
							});
					}
					if (res[0].err_code !== 0) {Toast({message: res[0].err_msg || "未知错误", position: 'bottom'});return;}
					if (res[0].data.name) {
						this.beneficiary = res[0].data.name;
					} else {
						MessageBox({message:'公司名称为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
							.then(action =>{
								if(action === 'confirm') this.$router.push({path:'/setCompanyName'});
								if(action === 'cancel') this.$router.push('/dashboard');
							});
						return;
					}
					//账户
					if (res[1].err_code !== 0)  {Toast({message: res[1].err_msg || "未知错误", position: 'bottom'});return;}
					if (res[1].rows[0] && res[1].rows[0].disabled) { //账户被禁用
						MessageBox('提示', '尊敬的会员： 非常抱歉，您的账户暂时无法投保普货保，建议您选择其他险种，详询聚保服务热线：40080-59680');
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
					}
				} catch (e) {
					Indicator.close();
				}
			},
			//设置数据 有订单id
			async _setDataByOrder() {
				this.agree = true;
				try {
					let res = await Promise.all([dchybOrderInfo(this.orderId), this._getInitData()]);
					Indicator.close();
					if (res[0].err_code !== 0) {Toast({message: res[0].err_msg || '未知错误', position: 'bottom'});return;}
					this.beneficiary = res[0].data.policyholder;
					this.startProvince = res[0].data.start_province;
					this.startCity = res[0].data.start_city;
					this.endProvince = res[0].data.end_province;
					this.endCity = res[0].data.end_city;
					this.coverage = res[0].data.coverage/10000;
					this.allPrice = res[0].data.price;
					this.plateNo = res[0].data.plate_no;
					this.plateExtraNo = res[0].data.plate_extra_no;
					if(!this.plateExtraNo)this.truck_type = 2;
				  this.type = res[0].data.type;
				  this.track_no = res[0].data.track_no;
				  this.cargo_name = res[0].data.cargo_name;
				  this.quantity = res[0].data.quantity;
				  this.imgList = res[0].data.cargo_file_urls ? res[0].data.cargo_file_urls : [];
				} catch (e) {
					console.log(e)
					Indicator.close();
				}
			},
			//获取页面公共初始数据
			async _getInitData() {
				let res = await Promise.all([cmnProvinceList(), cmnProductpriceList({name:'信达普货保'})]);
				//省份列表
				if (res[0].err_code === 0) {
					this.provinceList = res[0].data;
				} else {
					Indicator.close();
					Toast({message: res[0].err_msg || "未知错误", position: 'bottom'})
				}
				//保额列表
				if (res[1].err_code === 0){
					if(res[1].rows[0]){
            this.rate = res[1].rows[0].rate;
            this.min_premium = res[1].rows[0].min_premium;
            this.max_coverage = res[1].rows[0].max_coverage
            this.price_id = res[1].rows[0].id;
          } else {
						Indicator.close();
						Toast({message: '未找到价格方案', position: 'bottom'})
          }
        }else{
					Indicator.close();
					Toast({message: res[1].err_msg || "未知错误", position: 'bottom'})
        }
			},
			//输入验证
			_checkInput() {
				let errArr = [];
				if (!this.hasLogin && !this.beneficiary)errArr.push('请输入被保险人名称！');
				if (!this.hasLogin && !this.$store.state.reg_company.test(this.beneficiary))errArr.push('被保险人名称格式有误！');
				if (!this.plateNo)errArr.push('请输入运输车辆的车牌号码！');
				if (!this.$store.state.plateNoReg.test(this.plateNo))errArr.push('运输车辆的车牌号码格式有误！');
				if (this.truck_type === 1 && !this.plateExtraNo)errArr.push('带挂货车请输入运输车辆的挂车牌号码！');
				if (!this.startProvince || !this.startCity || !this.endProvince || !this.endCity) errArr.push('请选择本次路线的始发地和目的地！');
				if (!this.coverage) errArr.push('请输入保险金额！');
				if (this.coverage < 0) errArr.push('您输入的保险金额有误！');
				if (this.coverage > (this.max_coverage/10000)) errArr.push('保险金额不得超过'+(this.max_coverage/10000)+'万！');
				if (this.type === 1 && !this.track_no)errArr.push('单票投请输入运单号！');
				if (this.type === 1 && !this.cargo_name)errArr.push('单票投请输入货物名称！');
				if (this.type === 1 && !this.quantity)errArr.push('单票投请输入数量和单位！');
				if (this.type === 2 && this.imgList.length === 0) errArr.push('请上传装车清单照片！');
				if (!this.agree) errArr.push('请阅读并勾选相关协议！');
				if (errArr.length > 0) {
					Toast({message: errArr[0], position: 'bottom'});
					return false;
				}
				return true;
			},
			/*下一步逻辑
			1.先验证输入
			2.未登录状态
			  （1）先自动打开注册组件，注册完成后自动打开不保货物提示
			  （2）不保货物提示点击“我知道了"后自动创建订单，进入确认页
      3.已登录状态
        （1）直打开不保货物提示，点击"我知道了"后自动创建订单，进入确认页
			* */
			next(){
				if (!this._checkInput()) return;
				if(!this.hasLogin){
					this.$refs.registerInPage.register()
				}else{
					this.getClause('不保货物');
        }
			},
			//创建订单
			async createOrder() {
				//收集数据
        let cargo = {};
        if(this.type === 1){ //按票
        	cargo = {
						track_no : this.track_no,
						cargo_name : this.cargo_name,
						quantity : this.quantity
          }
        }else{ //按车
        	cargo.cargo_file_urls = this.imgList;
        }
				let data = {
					id: this.orderId ? this.orderId*1 : 0,
					price_id: this.price_id,
					beneficiary: this.beneficiary,
					coverage:this.coverage*10000 | 0,//与后台对接的单位是元，页面显示的默认单位是万元；
					price: this.allPrice,
          type: this.type,
					plate_no: this.plateNo,
					plate_extra_no: this.plateExtraNo,
					start_province: this.startProvince,
					start_city: this.startCity,
					end_province: this.endProvince,
					end_city: this.endCity,
          ...cargo
				};
				Indicator.open({text: '订单处理中...', spinnerType: 'fading-circle'});
				try {
					let res = await dchybOrderSave(data);
					Indicator.close();
					if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
					this.$router.push({path: 'phbConfirm', query: {orderId: res.data.id}})
				} catch (e) {
					Indicator.close();
				}
			},
      //获取价格
      countPrice : debounce(async function(){
			 	if(!this.coverage){this.allPrice = 0;return}
			 	if (this.coverage < 0) {Toast({message:'您输入的保险金额有误！',position:'bottom'});return}
			 	if (this.coverage > (this.max_coverage/10000)) {Toast({message:'保险金额不得超过'+(this.max_coverage/10000)+'万元！',position:'bottom'});return}
				let res = await dchybOrderPrice({price_id:this.price_id,coverage:this.coverage*10000 | 0})
				if(res.err_code === 0){
					this.allPrice = res.price;
        }else{
					Toast({message:res.err_msg || '未知错误',position:'bottom'})
        }
			},400),
			//获取协议
			async getClause(title) {
				let res = await cmnAdminAgreementList({price_id:this.price_id,title});
				if (res.err_code === 0) {
					this.agreementContent = res.rows[0] || {title,html:''};
					this.$refs.agreement.open();
				}
			},
//			excel(){
//				Toast({message: "注意：此文件格式仅支持在pc端查看！", position: 'bottom'});
//			}
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
  .phb_create ul.order_list li {
    height: pxToRem(90);
    line-height: pxToRem(90);
  }
  li.flex-center{
    height: pxToRem(70) !important;
    line-height: pxToRem(70) !important;
    padding-left: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    a{
      color: $blue;
      text-decoration: underline;
    }
  }
  li.flex input.company{
    padding-right: pxToRem(20) !important;
    padding-left: pxToRem(20) !important;
  }
  li.baofei{
    div{
      display: inline-block;
      &:last-child{
        margin-left: pxToRem(20);
      }
    }
  }
  li.tab-title{
    display: flex;
    align-items: center;
    justify-content: space-around;
    div{
      width: pxToRem(300);
      text-align: center;
      &.active{
       color: $blue;
        border-bottom: 4px solid $blue;
      }
    }
  }
  li.block2{
    height:auto !important;overflow: hidden;
    background: #f9f9f9 !important;
    padding-left: 0 !important;
    .tip{
      height: pxToRem(40);
      line-height: pxToRem(40);
      margin-bottom: pxToRem(20);
      margin-left: pxToRem(30);
      color: #999;
    }
    li{
      background: #f9f9f9 !important;
    }
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
    margin-top: pxToRem(20);
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
