<template>
  <div class="YgbCreate">
    <v-header title="投保信息填写"></v-header>
    <ul class="order_list">
      <li class="cell cell_label f30">
        <label class="label" for="insPerson">投保人</label><input type="text" id="insPerson" disabled placeholder="请填写投保人名称" v-model="insPerson"/>
      </li>
      <li class="cell cell_label f30">
        <label class="label" for="insedPerson">被保险人</label><input type="text" id="insedPerson" disabled placeholder="请填写被保险人名称" v-model="insedPerson"/>
      </li>
      <li class="panel_cell border"  @click="pickerAddr()">
        <span class="cell_left">公司地址</span>
        <span class="cell_center black" v-if="province">{{province}} {{city}} {{district}}</span>
        <span class="cell_center glay" v-else>请选择公司地址</span>
        <div class="cell_right"><i class="iconfont icon-right f40"></i></div>
      </li>
      <li class="cell_input">
        <input type="text" placeholder="详细地址" v-model.trim="address">
      </li>
      <li class="cell cell_tab f30">
        <div class="label">
          保障方案
        </div>
        <div class="c_tab">
          <div class="tab_item" :class="{active:caseIndex==0}" @click="caseIndex=0">特惠版</div>
          <div class="tab_item" :class="{active:caseIndex==1}" @click="caseIndex=1">经济版</div>
          <div class="tab_item" :class="{active:caseIndex==2}" @click="caseIndex=2">标准版</div>
          <div class="tab_item" :class="{active:caseIndex==3}" @click="caseIndex=3">尊享版</div>
        </div>
      </li>
      <li class="panel f30" >
        <div class="panel_cell" @click="driverShow=!driverShow">
          <span class="cell_left">现场操作人员</span>
          <span class="cell_center">{{driverNum}}人</span>
          <span class="cell_center mr">{{driverPrice[caseIndex]}}元/人/年</span>
          <div class="cell_right"><i class="iconfont icon-right f40" :class="{rotate:driverShow}"></i></div>
        </div>
        <panel :flag="driverShow" :change="driverList" class="panel_body">
          <div class="cell_do f26">
            <div class="do_left">姓名</div>
            <div class="do_center center">身份证号</div>
            <div class="do_right blue" @click="add(driverList)">新增</div>
          </div>
          <div class="cell_do f26" v-for="(item,index) in driverList">
            <div class="do_left">
              <input type="text" placeholder="请输入姓名" v-model.trim="item.name">
            </div>
            <div class="do_center center">
              <input type="text" placeholder="请输入身份证号" v-model.trim="item.idcard" :class="{red:!$store.state.identity.test(item.idcard)}">
            </div>
            <div class="do_right"><i class="iconfont icon-del f50" @click="del(index,driverList)"></i></div>
          </div>
        </panel>
      </li>
      <li class="panel f30">
        <div class="panel_cell" @click="clerkShow=!clerkShow">
          <span class="cell_left">非现场操作人员</span>
          <span class="cell_center">{{clerkNum}}人</span>
          <span class="cell_center mr">{{clerkPrice[caseIndex]}}元/人/年</span>
          <div class="cell_right"><i class="iconfont icon-right f40" :class="{rotate:clerkShow}"></i></div>
        </div>
        <Panel :flag="clerkShow" :change="clerkList" class="panel_body">
          <div class="cell_do f26">
            <div class="do_left">姓名</div>
            <div class="do_center center">身份证号</div>
            <div class="do_right blue" @click="add(clerkList)">新增</div>
          </div>
          <div class="cell_do f26" v-for="(item,index) in clerkList">
            <div class="do_left">
              <input type="text" placeholder="请输入姓名" v-model="item.name">
            </div>
            <div class="do_center center">
              <input type="text" placeholder="请输入身份证号" v-model="item.idcard" :class="{red:!$store.state.identity.test(item.idcard)}">
            </div>
            <div class="do_right"><i class="iconfont icon-del f50"  @click="del(index,clerkList)"></i></div>
          </div>
        </Panel>
      </li>
    </ul>
    <div class="pro_time">
      <div class="time_title">
        请选择生效时间：
      </div>
      <ul class="time_content">
        <li @click="selectDateDefault=true">
          <i class="iconfont" :class="selectDateDefault?'icon-duigou':'icon-yuan'" ></i>
          <div class="con">
            我需要在支付保费的次日零点生效
          </div>
        </li>
        <li>
          <i class="iconfont" :class="selectDateDefault?'icon-yuan':'icon-duigou'" @click="selectDateDefault=false"></i>
          <div class="con">
            <div class="picker" @click="openPicker">
              <span><span v-show="!selectDateDefault">{{changeTime(pickerVisible)}}</span></span>
              <i class="iconfont icon-rili"></i>
            </div>
            <div class="ml70">00:00:00生效</div>
          </div>
        </li>
        <li class="red">
          提示：两者生效时间以付款后较晚者为准！
        </li>
      </ul>
    </div>
    <Invoice :invoiceData="invoiceData" :addressData="addressData" :edit="true" @toAddress="toAddress"></Invoice>
    <div class="pro_pic">
      <div class="pic_title">上传营业执照：</div>
      <div class="upload">
        <upload :url="$store.state.fileUrl" v-model="imgList" :onlyOne="true"></upload>
      </div>
    </div>
    <div class="agreen" @click="agree=!agree">
      <i class="iconfont" :class="agree?'icon-danxuan':'icon-yuan'" ></i> 我已阅读并同意<span @click.stop="getClause('雇主责任保险条款')" class="blue">《雇主责任保险条款》</span>和<span @click.stop="getClause('投保须知')"  class="blue">《投保须知》</span>
    </div>
    <div class="foot">
      <span class="btn">￥{{allPrice}}.00</span>
      <span class="btn bg_blue" @click="createOrder">下一步</span>
    </div>
    <DatetimePicker
      ref="picker"
      v-model="pickerVisible"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
    > </DatetimePicker>
    <Risk :title="agreementContent.title" ref="agreement" :html="agreementContent.content"></Risk>
  </div>
</template>
<script>
  import Risk from "views/components/Risk.vue"
  import AddSubtract from 'views/components/AddSubtract'
//  import Upload from 'base/weuiUpload/weuiUpload'
  const upload = ()=>import('base/weuiUpload/weuiUpload')
  import Invoice from 'views/components/Invoice'
  import Panel from 'base/panel/Panel'
  import { DatetimePicker,Toast,Indicator,MessageBox } from 'mint-ui';
  import {ygbUserInfo,cmnUseraddressList,cmnCompanyInfo,ygbOrderInfo,ygbOrderSave,cmnCompanyUpdate,cmnAdminAgreementList,ygbProductPricelist} from 'assets/js/api'
//  import weui from 'weui.js';
  const weui = ()=>import("weui.js");
//  import dataList from 'assets/js/cityData';
  const dataList = ()=> import('assets/js/cityData');
  import {invoiceCreate} from '../mixins/invoice'

  const productList = ['员工保特惠版','员工保经济版','员工保标准版','员工保尊享版'];

  export default {
    components:{
      AddSubtract,
      DatetimePicker,
      upload,
      Panel,
      Risk,
      Invoice
    },
    mixins:[invoiceCreate],
    data(){
      return {
        insPerson:'',//投保人
        insedPerson:'',//被投保人
        companyId:'',//公司id
        province:'',//省
        city:'',//市
        district:'',//区
        address:'',//街道
        caseIndex:0, //保障方案  0-特惠版 1-经济版 2-标准版 3-尊享版
        driverPrice:[],//现场操作人员价格
        clerkPrice:[],//非现场操作人员价格
        orderId:'',//订单id
        driverList:[
          {name:'',idcard:''}
        ],//现场操作列表
        clerkList:[
          {name:'',idcard:''}
        ], //非现场操作列表
        driverShow:true, //人员列表初始是打开状态
        clerkShow:true,
        pickerVisible:new Date(new Date().getTime()+24*3600*1000),//日历
        startDate:new Date(new Date().getTime()+24*3600*1000),//日历默认初始时间
        selectDateDefault:true,//日期选择的select
        imgList:[],//营业执照
        agree: false, // 同意协议
        agreementContent:{},//协议
        productType: 'ygb', // 专属渠道链接注册使用字段
      };
    },
    computed:{
      driverNum(){ //现场操作人数
        let num = 0;
        this.driverList.forEach((item)=>{if(item.name||item.idcard)num++});
        return num;
      },
      clerkNum(){ //非现场操作人数
        let num = 0;
        this.clerkList.forEach((item)=>{if(item.name||item.idcard)num++});
        return num;
      },
      allPrice(){
        return this.driverNum*this.driverPrice[this.caseIndex] + this.clerkNum*this.clerkPrice[this.caseIndex] || 0;
      },
      effectDate(){ //保单生效时间
        if(this.selectDateDefault){
          let date = new Date();
          date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
          return date/1000 | 0;
        }else{
          return this.pickerVisible.getTime()/1000 | 0;
        }
      }
    },
    created(){
      this.init();
      this.getPriceData();
    },
    methods: {
      //  const driverPrice = [600, 280, 560, 840];//现场操作人员价格
      //  const clerkPrice = [300, 160, 320, 480];//非现场操作人员价格
      //获取价格方案  以上格式
      getPriceData(){
        ygbProductPricelist().then((res)=>{
          console.log(res)
          if(res.err_code === 0){
            productList.forEach((x,index)=>{
              res.ygb_price.forEach((y)=>{
                if(x === y.name){
                  if(y.employee_type === 1){
                    this.driverPrice[index] = y.price/100;
                    this.$set(this.driverPrice,index,this.driverPrice[index])//解决vue有时候不渲染的bug
                  }else if(y.employee_type === 2){
                    this.clerkPrice[index] = y.price/100;
                    this.$set(this.clerkPrice,index,this.clerkPrice[index])
                  }
                }
              })
            });
          }else{
            Toast({message:res.err_msg||'未知错误',position:'bottom'})
          }
        });
      },
      toSetting(){
        MessageBox({message:'公司名称为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
          .then(action=>{
            if(action === 'confirm') this.$router.push({path:'/setCompanyName'});
            if(action === 'cancel') this.$router.push('/dashboard');
          })
      },
      init(){
        //定单判断  先判断是否有订单id，有则根据订单id录入数据，无则根据用户录入默认数据
        if(this._fromAddress()){ //从本地获取数据
          this.setDataBySession();
        } else if(!this.$route.query.orderId){ //无订单id
          Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
          this.setDataInit();
        }else{ //有订单id
          Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
          this.orderId = this.$route.query.orderId;
          this.setDataByOrder();
        }
      },
      //无订单id，即初次录入数据
      setDataInit(){
        this.caseIndex = this.$route.query.type || 0;
        //获取用户信息
        Promise.all([ygbUserInfo(),cmnUseraddressList(),cmnCompanyInfo()]).then((res)=>{
          Indicator.close();
          //检测员工保用户信息
          if(res[0].err_code === 0 && res[0].data.disabled){
            Toast({message:'非常抱歉，您的账户暂时无法投保"员工保"，建议您选择其他险种，详询聚保服务热线: 40080-59680',position:'bottom'})
            this.$router.push('/dashboard');
          }else{
            console.log({message:res[0].err_msg || '未知错误',position:'bottom'})
          }
          // 检测用户邮寄地址（保单寄送地址）
          if(res[1].err_code === 0){
            if(res[1].rows[0]){
							//设置邮寄地址
							this.setAddressData(res[1],'userAddressList');
            }
          }
          // 录入公司名、营业执照、公司地址
          if(res[2].err_code === 0){
            let data = res[2].data;
            if(!data.name){
              this.toSetting();
              return
            }
            this.insPerson = data.name;
            this.insedPerson = data.name;
            this.province = data.province;
            this.city = data.city;
            this.district = data.district;
            this.address = data.address;
            this.imgList =data.license_file_url?[data.license_file_url]:[];
						//设置发票信息
            this.setInvoiceData(res[2].data,'companyInfo')
          }else if(res[2].err_code === 1200){
            this.toSetting();
          }else{
            Toast({message:res[2].err_msg || '未知错误',position:'bottom'})
          }
        }).catch(()=>{
          Indicator.close();
        });
      },
      //有订单id，即返回修改情况
      setDataByOrder(){
        this.agree = true;
        Promise.all([ygbOrderInfo(this.orderId),cmnCompanyInfo()]).then((res)=>{
          Indicator.close();
          //根据订单获取信息
          if(res[0].err_code === 0){
            console.log(res[0])
            this.insPerson = res[0].order.company_name;
            this.insedPerson = res[0].order.company_name;
            this.province = res[0].order.province;
            this.city = res[0].order.city;
            this.district = res[0].order.district;
            this.address = res[0].order.address;
            this.caseIndex = productList.indexOf(res[0].order.product_name); //获取this.caseIndex
            this.driverList = [];
            this.clerkList = [];
            res[0].order.employee_list.forEach((item)=>{ //获取操作人员和非操作人员列表,即被投保员工
              if(item.type === 1){
                this.driverList.push(item)
              }else if(item.type === 2){
                this.clerkList.push(item)
              }
            });
            if(this.driverList.length===0)this.driverList.push({name:'',idcard:''});
            if(this.clerkList.length===0)this.clerkList.push({name:'',idcard:''});
            //设置保单生效时间
            this.setEffectDate(res[0].order.effect_date);
            //设置邮寄地址
						this.setAddressData(res[0],'orderInfo');
						//设置发票信息
						this.setInvoiceData(res[0].order,'orderInfo')
          }else{
            Toast({message:res[0].err_msg || '未知错误',position:'bottom'})
          }
          //营业执照
          if(res[1].err_code === 0){
            this.province = res[1].data.province;
            this.city = res[1].data.city;
            this.district = res[1].data.district;
            this.address = res[1].data.address;
            this.imgList = res[1].data.license_file_url?[res[1].data.license_file_url]:[];
          }else{
            Toast({message:res[1].err_msg || '未知错误',position:'bottom'})
          }
        }).catch(()=>{Indicator.close();});
      },
      //设置保单生效时间
      setEffectDate(res_date){
        let date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let today = date.getDate();

        let aDate = res_date.split("T")[0].split("-");
        if (aDate[0] == year && aDate[1] == month && aDate[2] == today) {
          this.selectDateDefault = true;
        } else {
          this.selectDateDefault = false;
          this.pickerVisible = new Date(res_date);
        }
      },
      //删除操作
      del(index,list){
        list.splice(index,1)
        if(list.length == 0){
          list.push({name:'',idcard:''})
        }
      },
      //新增操作
      add(list){
        list.push({name:'',idcard:''})
      },
      idGetAge(idcard){
        //获取年龄
        let myDate = new Date();
        let month = myDate.getMonth() + 1;
        let day = myDate.getDate();
        let age = myDate.getFullYear() - idcard.substring(6, 10) - 1;
        if (idcard.substring(10, 12) < month || idcard.substring(10, 12) == month && idcard.substring(12, 14) <= day) {
          age++;
        }
        return age;
      },
      checkInput(){
        let errArr = [];
        if(!this.province || !this.city || !this.district){errArr.push(`请选择公司地址！`);}
        if(!this.address){errArr.push(`请填写公司详细地址！`);}
        if(this.driverNum>0){
          this.driverList.forEach((item,index)=>{
            if (!item.name){ errArr.push(`现场操作人员的第${index+1}个员工的姓名未填写！`);return false }
            if (!item.idcard){ errArr.push(`现场操作人员的第${index+1}个员工的身份证号未填写！`);return false }
            if (!this.$store.state.identity.test(item.idcard)){ errArr.push(`现场操作人员的第${index+1}个员工的身份证号格式有误！`);return false }
            if (this.idGetAge(item.idcard) < 16){ errArr.push(`现场操作人员的第${index+1}个员工的年龄未满16周岁的投保年龄界限！`);return false }
            if (this.idGetAge(item.idcard) > 65){ errArr.push(`现场操作人员的第${index+1}个员工的年龄超过了65周岁的投保年龄界限！`);return false }
          })
        }
        if(this.clerkNum>0){
          this.clerkList.forEach((item,index)=>{
            if (!item.name){ errArr.push(`非现场操作人员的第${index+1}个员工的姓名未填写！`);return false }
            if (!item.idcard){ errArr.push(`非现场操作人员的第${index+1}个员工的身份证号未填写！`);return false }
            if (!this.$store.state.identity.test(item.idcard)){ errArr.push(`非现场操作人员的第${index+1}个员工的身份证号格式有误！`);return false }
            if (this.idGetAge(item.idcard) < 16){ errArr.push(`非现场操作人员的第${index+1}个员工的年龄未满16周岁的投保年龄界限！`);return false }
            if (this.idGetAge(item.idcard) > 65){ errArr.push(`非现场操作人员的第${index+1}个员工的年龄超过了65周岁的投保年龄界限！`);return false }
          })
        }
        if(errArr.length !== 0) { Toast({message:errArr[0],position:'bottom'}); return false; }
        if(this.driverNum==0 && this.clerkNum == 0){Toast({message:'请填写员工信息！',position:'bottom'} ); return false; }
				if(!this.checkInvoice())return false;
        if(this.imgList.length==0 || !this.imgList[0]){Toast({message:'请上传营业执照！',position:'bottom'}  ); return false; }
        if(!this.agree) { Toast({message:"请阅读并勾选相关协议",position:'bottom'}); return false; }
        return true;
      },
      //创建订单
      createOrder(){
        //验证用户输入
        if(!this.checkInput())return;
        //获取人员列表
        let employee_list = [];
        if(this.driverNum>0)this.driverList.forEach((item)=>{employee_list.push({name:item.name, idcard:item.idcard, type:1})});
        if(this.clerkNum>0)this.clerkList.forEach((item)=>{employee_list.push({name:item.name, idcard:item.idcard, type:2})});
        let data = {
          product_name: productList[this.caseIndex],
          beneficiary: this.insPerson,
          price: this.allPrice*100,
          effect_date : this.effectDate,
          employee_list: employee_list,
          province: this.province,
          city: this.city,
          district: this.district,
          address: this.address,
          license_file_url:this.imgList[0],
          vat_invoice_type:this.invoiceType,
          user_address_id:this.addressData.user_address_id,
          ...this.invoiceSaveData
        };
        if(this.orderId) data.id = this.orderId*1;
        let query = this.$getStorage("locationQuery");
        if(query && query.alias){
          data.alias = query.alias
        }
        Indicator.open({text: '订单处理中...', spinnerType: 'fading-circle'});
        //提交订单信息
        ygbOrderSave(data).then((res)=>{
          Indicator.close();
          if(res.err_code === 0){
            this.$router.push({path:'/ygbConfirm',query:{orderId:res.data.id}});
          }else{
            Toast({message:res.err_msg||'未知错误',position:'bottom'})
          }
        }).catch(()=>{
          Indicator.close();
        })
      },
      openPicker() {
        this.selectDateDefault = false;
        this.$refs.picker.open();
      },
      // 设置公司省市区
      async pickerAddr(){
      	let _weui = await weui();
      	let _dataList = await dataList();
        let _this = this;
				_weui.picker( _dataList, {
            showDistrict:true,
            defaultValue: ["北京", "北京市", "东城区"],
            onConfirm: function (result) {
              _this.province = result[0].label;
              _this.city = result[1].label;
              _this.district = result[2].label;
              _this.address = '';
            },
          }
        )
      },
      //显示时间
      changeTime(value){
        return value.getFullYear()+'-'+(value.getMonth()+1)+'-'+value.getDate()
      },
      //获取协议
      getClause(title){
        cmnAdminAgreementList({product_name:'员工保',title}).then((res)=>{
          if(res.err_code === 0){
            console.log(res)
            this.agreementContent = res.rows[0]? res.rows[0]:{title,html:''};
            this.$refs.agreement.open();
          }
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~assets/scss/ygb/ygbCreate";
  .clause_risk { position: fixed; top: 0; bottom: 0; left: 0; right: 0; overflow: scroll; background: #fff; z-index: 40; }
  .mr{color:#fc944e !important;margin-left: pxToRem(40)}
</style>
