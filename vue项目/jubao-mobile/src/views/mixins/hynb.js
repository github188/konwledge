import Risk from "views/components/Risk"
const upload = ()=>import('base/weuiUpload/weuiUpload')
import Panel from 'base/panel/Panel'
import { Toast,Indicator,MessageBox } from 'mint-ui';
import NumberToChinese from 'assets/js/NumberToChinese';
import {hynbOrderSave,hynbOrderInfo,cmnAdminAgreementList,hynbUserInfo,cmnCompanyInfo,cmnUseraddressList,cmnProductpriceList} from 'assets/js/api';
import {invoiceCreate} from './invoice'
import Invoice from 'views/components/Invoice'

export const hynbCreate = {
  components:{
    upload,
    Panel,
    Risk,
    Invoice
  },
  mixins:[invoiceCreate],
  data(){
    return {
      insPerson:'',
      insedPerson:'',
      priceData: [],  //价格方案列表数据
      truckList:[{
        isShow:true,
        truck_type: 1, //1.带挂货车 2.普通货车
        plate_no:'',
        plate_extra_no:'',
        limitType: 0,   //选择限额类型
        driving_original:[], //正本
        driving_copy:[], //副本
        transport:[], //运输证
        driving_license_with_beneficiary : true, //行驶证所有人名称是否和被保险人相同
        lease_contract_or_attachment_instructions:[], //车辆租赁合同或挂靠说明;
      }],
      imgList:[],   //营业执照
      price_id : '',//价格方案id
      agree:false,   //是否同意协议
      agreementContent:{}, // 协议内容
    };
  },
  computed:{
    allPrice(){
      let price = 0;
      if(this.priceData.length > 0){  //价格方案是异步获取的所以要判断一下
        this.truckList.forEach((item)=>{
          price += this.priceData[item.limitType].price
        });
      }
      return price
    }
  },
  created(){
    Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
    this._getPriceData(); //获取价格方案
  },
  methods:{
    _getPriceData(){
      cmnProductpriceList({product_name:this.product_name}).then((res)=>{
        if(res.err_code === 0){
          this.priceData = res.rows[0].price_level;
          this.price_id = res.rows[0].id; //获取价格方案id，创建订单需要
          this.init();   //初始化放在这里保证运行后面的逻辑时 this.priceData 已经获取完成
        }else{
          Indicator.close();
          Toast({message:res.err_msg || '未知错误',position:'bottom'})
        }
      }).catch(()=>{Indicator.close();})
    },
    init(){
      //定单判断  先判断是否有订单id，有则根据订单id录入数据，无则根据用户录入默认数据
			if(this._fromAddress()){ //从本地获取数据
				this.setDataBySession().then(()=>Indicator.close()).catch(()=>Indicator.close());
			}else if(!this.$route.query.orderId){ //无订单id
        this._setDataInit();
      }else{ //有订单id
        this.orderId = this.$route.query.orderId;
        this._setDataByOrder();
      }
    },
    toSetting(){
      MessageBox({message:'公司名称、地址为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
        .then(action=>{
          if(action === 'confirm') this.$router.push({path:'/setting'});
          if(action === 'cancel') this.$router.push('/dashboard');
        })
    },
    _setDataInit(){//无订单id的情况
      Promise.all([hynbUserInfo(),cmnUseraddressList(),cmnCompanyInfo()]).then((res)=>{
        Indicator.close();
        //检测用户信息
        if(res[0].err_code === 0 && res[0].data.disabled){
          Toast({message:'非常抱歉，您的账户暂时无法投保"'+this.product_name+'"，建议您选择其他险种，详询聚保服务热线: 40080-59680',position:'bottom'})
          this.$router.push('/dashboard');
        }else{
          console.log({message:res[0].err_msg || '未知错误',position:'bottom'})
        }
        // 检测用户邮寄地址（保单寄送地址）
        if(res[1].err_code !== 0){
          Toast({message:res[1].err_msg || '未知错误',position:'bottom'})
        } else if(res[1].rows[0]){
					//设置邮寄地址
					this.setAddressData(res[1],'userAddressList');
        }
        // 录入公司名、营业执照、公司地址
        if(res[2].err_code === 0){
          let data = res[2].data;
          if(!data.name){
            this.toSetting();
            return
          }
					//设置发票信息
					this.setInvoiceData(data,'companyInfo');
          this.insPerson = data.name;
          this.insedPerson = data.name;
          this.imgList =data.license_file_url?[data.license_file_url]:[];
        }else if(res[2].err_code === 1200){
          this.toSetting();
          // Toast({message:'检测到您还没有设置公司名称，请先设置公司名称',position:'bottom'}); // 公司不存在，即未设置公司名称
          // this.$router.push('/setCompanyName')
        }else{
          Toast({message:res[2].err_msg || '未知错误',position:'bottom'})
        }
      }).catch(()=>{Indicator.close();})
    },
    _setDataByOrder(){//有订单id的情况
      this.agree = true;
      Promise.all([hynbOrderInfo(this.orderId),cmnCompanyInfo()]).then((res)=>{
        Indicator.close();
        //根据订单获取信息
        if(res[0].err_code === 0){
          this.insPerson = res[0].data.policyholder;
          this.insedPerson = res[0].data.beneficiary;
          this.truckList = res[0].data.hynb_truck.map((item)=>{
            let limitType;
            this.priceData.forEach((price,index)=>{
              if(price.coverage == item.coverage){
                limitType = index;
              }
            });
            return {
              isShow : true,
              id: item.id,
              plate_no:item.plate_no,
              plate_extra_no:item.plate_extra_no,
              truck_type : item.truck_type,
              limitType,
              driving_original:item.driving_license_original_url?[item.driving_license_original_url]:[],
              driving_copy:item.driving_license_copy_url?[item.driving_license_copy_url]:[],
              transport:item.transport_certificate_url?[item.transport_certificate_url]:[],
              driving_license_with_beneficiary:item.driving_license_with_beneficiary,
              lease_contract_or_attachment_instructions:item.lease_contract_or_attachment_instructions
            }
          });
					//设置邮寄地址
					this.setAddressData(res[0],'orderInfo');
					//设置发票信息
					this.setInvoiceData(res[0].data,'orderInfo')
        }else{
          Toast({message:res[0].err_msg || '未知错误',position:'bottom'})
        }
        //营业执照
        if(res[1].err_code === 0){
          this.imgList = res[1].data.license_file_url?[res[1].data.license_file_url]:[];
        }else{
          Toast({message:res[0].err_msg || '未知错误',position:'bottom'})
        }
      }).catch(()=>{Indicator.close();})
    },
    _checkInput(){
      let errArr = [];
      this.truckList.forEach((item,index)=>{
        if(item.truck_type === 1 && !item.plate_no){errArr.push(`请输入第${this.NumberToChinese(index+1)}辆车的头车牌号！`)}
        if(item.truck_type === 1 && !this.$store.state.plateNoReg.test(item.plate_no)){errArr.push(`第${this.NumberToChinese(index+1)}辆车的头车牌号格式有误！`)}
        if(item.truck_type === 1 && !item.plate_extra_no){errArr.push(`请输入第${this.NumberToChinese(index+1)}辆车的挂车牌号！`)}
        if(item.truck_type === 2 && !item.plate_no){errArr.push(`请输入第${this.NumberToChinese(index+1)}辆车的车牌号！`)}
        if(item.truck_type === 2 && !this.$store.state.plateNoReg.test(item.plate_no)){errArr.push(`第${this.NumberToChinese(index+1)}辆车的车牌号格式有误！`)}
        if(item.driving_original.length === 0){errArr.push(`请上传第${this.NumberToChinese(index+1)}辆车的运输车辆行驶证正本！`)}
        if(item.driving_copy.length === 0){errArr.push(`请上传第${this.NumberToChinese(index+1)}辆车的运输车辆行驶证副本！`)}
        if(!item.driving_license_with_beneficiary && item.lease_contract_or_attachment_instructions.length===0){errArr.push(`请上传第${this.NumberToChinese(index+1)}辆车的车辆租赁合同或挂靠说明！`)}
        if(item.transport.length === 0){errArr.push(`请上传第${this.NumberToChinese(index+1)}辆车的车辆运输证！`)}
      });
			if(!this.checkInvoice())return false;
      if(this.imgList.length === 0){errArr.push(`请上传营业执照！`)}
      if(!this.agree){errArr.push(`请阅读并同意相关条款`)}
      if(errArr.length !== 0) { Toast( errArr[0] ); return false; }
      return true;
    },
    createOrder(){
      //输入验证
      if(!this._checkInput())return;
      //收集数据
      let hynb_truck = this.truckList.map((item)=>{
        return {
          id:item.id ? item.id*1 : 0,
          plate_no:item.plate_no,
          plate_extra_no:item.plate_extra_no,
          truck_type : item.truck_type,
          coverage: this.priceData[item.limitType].coverage,
          price: this.priceData[item.limitType].price*1,
          driving_license_original_url: item.driving_original[0],
          driving_license_copy_url: item.driving_copy[0],
          transport_certificate_url: item.transport[0],
          driving_license_with_beneficiary : item.driving_license_with_beneficiary,
          lease_contract_or_attachment_instructions: item.lease_contract_or_attachment_instructions
        }
      });
      //创建订单
      let data = {
        price_id : this.price_id*1,
        id: this.orderId ?  this.orderId*1 : 0,
        policyholder: this.insPerson,
        beneficiary: this.insedPerson,
        license_file_url: this.imgList[0],
        price: this.allPrice*1,
        hynb_truck,
				user_address_id:this.addressData.user_address_id,
				...this.invoiceSaveData
      };
      let query = this.$getStorage("locationQuery");
      if(query && query.alias){
        data.alias = query.alias
      }
      // if(JSON.stringify(window.sessionStorage.getItem("jubao56")).includes("alias")){ // 处理专属链接工号
      //   data.alias = JSON.parse(window.sessionStorage.getItem("jubao56")).registerDefault.alias;
      // }
      Indicator.open({text: '订单处理中...', spinnerType: 'fading-circle'});
      hynbOrderSave(data).then((res)=>{
        Indicator.close();
        if(res.err_code === 0){
          switch (this.product_name){
            case '货车重大事故保':
              this.$router.push({path:'/hcbConfirm',query:{orderId:res.data.id}});
              break;
            case '定车货运年保':
              this.$router.push({path:'/dchynbConfirm',query:{orderId:res.data.id}});
              break;
          }

        }else{
          Toast({message:res.err_msg||'未知错误',position:'bottom'})
        }
      }).catch(()=>{ Indicator.close();})
    },
    NumberToChinese(num){  //数字转汉字
      return NumberToChinese(num)
    },
    checkPlateNo(e,plate_no){ //自动验证车牌号
      if(!this.$store.state.plateNoReg.test(plate_no)){
        e.target.style.color='red'
      }else{
        e.target.style.color='black'
      }
    },
    add(){ //添加车辆
      this.truckList.push({
        isShow:true,
        truck_type: 1, //1.带挂货车 2.普通货车
        plate_no:'',
        plate_extra_no:'',
        limitType: 0,   //选择限额类型
        driving_original:[], //正本
        driving_copy:[], //副本
        transport:[], //运输证
        driving_license_with_beneficiary : true, //行驶证所有人名称是否和被保险人相同
        lease_contract_or_attachment_instructions:[], //车辆租赁合同或挂靠说明;
      })
    },
    empty(){ //清空信息
      MessageBox.confirm('确定清空信息？').then(()=>{
        this.truckList = [{
          isShow:true,
          truck_type: 1, //1.带挂货车 2.普通货车
          plate_no:'',
          plate_extra_no:'',
          limitType: 0,   //选择限额类型
          driving_original:[], //正本
          driving_copy:[], //副本
          transport:[], //运输证
          driving_license_with_beneficiary : true, //行驶证所有人名称是否和被保险人相同
          lease_contract_or_attachment_instructions:[], //车辆租赁合同或挂靠说明;
        }]
      }).catch(()=>{})
    },
    deleteOne(index){ //删除车辆
      MessageBox.confirm('确定删除车辆？').then(()=>{
        this.truckList.splice(index,1)
      }).catch(()=>{})
    },
    //获取协议
    getClause(title){
      cmnAdminAgreementList({product_name:this.product_name,title}).then((res)=>{
        if(res.err_code === 0){
          this.agreementContent = res.rows[0]? res.rows[0]:{title,html:''};
          this.$refs.agreement.open();
        }
      })
    }
  }
};
