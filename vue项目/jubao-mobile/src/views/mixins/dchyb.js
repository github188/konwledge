import { MessageBox, Indicator, Toast } from 'mint-ui';
import { provinceCity, tickChange, showData, carPlateNo } from "../mixins/index.js"
import { cmnUserInfo, dchybUserInfo, dchybOrderList,cmnProductpriceList,dchybOrderSave,dchybOrderInfo,cmnProductList,dchybOrderPrice,dchybUserList,cmnAdminAgreementList} from '../../assets/js/api';
import { listStateCheck,productData } from "../../assets/js/common"
import Risk from "../components/Risk.vue"
import Pay from "../components/Pay.vue"

export const countPrice={
  data(){
    return {
      price: "0",
      rate:"0", //费率
      minPremium:"",  //最低保费
      coverage:"",      //保险金额
      priceId:"",       //价格方案的id
      maxCoverage:"",   //最高保费
    }
  },
  methods:{
    countPrice() {
      if(isNaN(this.coverage) || !this.coverage || this.coverage*1===0){return ;} //为非数字或者为空，则直接return
      // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
      if(!this.checkDecimal(this.coverage,2)){Toast({message:"保额不能小于两位小数",position:'bottom'});return ;}

      if(this.coverage*10000>this.maxCoverage){
        this.price="0";
        Toast({message: "投保金额高于最高保费!", position: 'bottom'})
      } else {
        dchybOrderPrice({
          price_id:this.priceId,
          coverage:this.coverage*10000  //与后台对接的单位是元，页面显示的默认单位是万元；
        }).then(res=>{
          if(res.err_code!==0){Indicator.close();Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
          this.price=res.price;
        })
      }
    },
    checkDecimal(val,num){
      let str = val+'';
      if(str.indexOf('.')!==-1){
        let length = str.substring(str.indexOf('.')+1).length;
        if(length>num){
          return false;
        }else{
          return true ;
        }
      }else{
        return true ;
      }
    }//功能：低于N位小数，则返回false;否则返回true
  }
};


export const dchybCreate={
  components:{
    Risk
  },
  mixins: [provinceCity, tickChange, showData, carPlateNo,countPrice],
  data() {
    return {
      //信息渲染部分
      policyholder: "某某公司",      //投保人
      beneficiary: "某某公司",     //被保险人
      tickIcon: "icon-duigou",
      orderStatus: "", //订单状态---在有orderId时会实时更新信息，判断此订单是否已支付

      postLimit:true,  //限制用户的点击频率
      trackNo:"",     //运单号
      quantity:"",    //数量包装
      cargoName: "",  //货物名称
      agree:false,     //是否同意协议
      productInfo:"",   //产品信息

      agreementContent:"",
    }
  },
  beforeRouteEnter(to,from ,next){
    next(vm=>{
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
      let query = vm.$route.query;
      vm.getProvinceList();//获取省市信息
      // vm.getAgreements(); //获取协议

      if(query.orderId){
        vm.agree=true;
        Promise.all([dchybOrderInfo(vm.$route.query.orderId),dchybUserList({product_name: productData[vm.productType]["name"]})]).then((res)=>{
          if (res[0].err_code !== 0 || res[1].err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
          Indicator.close();
          vm.setOrderData(res[0].data,res[1].rows[0]); // 传如订单信息和dchyb用户信息
        });
      }else {
        vm.checkProductInfo().then(res=>{  // 获取dchyb用户的信息:检查用户是否有公司名称=>是否被禁用
          Indicator.close();
          vm.setData(res);// 设置用户基本信息
          if(!res){ // 新用户则调cmnInfo获取公司名称
            Promise.all([cmnUserInfo(),cmnProductpriceList({product_name: productData[vm.productType]["name"]})]).then( res =>{
              if(res[0].err_code === 0){
                if(!res[0].data.company_name){
                  MessageBox({message:'公司名称为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
                    .then(action=>{
                      if(action === 'confirm') vm.$router.push({path:'/setCompanyName'});
                      if(action === 'cancel') vm.$router.push({path:'/dashboard'});
                    });
                  // Toast({ message: "请先设置您的公司名称！", duration: 1000, position:'bottom' });
                  // vm.$router.push({path: "/setCompanyName"});
                }
                vm.policyholder = res[0].data.company_name;
                vm.beneficiary = res[0].data.company_name;
              }
              if(res[1].err_code === 0){
                vm.rate = res[1].rows[0].rate;
                vm.minPremium = res[1].rows[0].min_premium;
                vm.maxCoverage = res[1].rows[0].max_coverage;
                vm.priceId = res[1].rows[0].id;
              }
            });
          }
        });
      }
    })
  },
  created(){

  },
  methods: {
    setOrderData(orderInfo,userInfo){
      console.log(orderInfo,userInfo);
      this.orderStatus=orderInfo.status;
      this.policyholder = orderInfo.policyholder; //此处设置为投保人与被保险人相同
      this.beneficiary = orderInfo.policyholder;
      this.startProvince =orderInfo.start_province;
      this.startCity = orderInfo.start_city;
      this.endProvince = orderInfo.end_province;
      this.endCity = orderInfo.end_city;
      this.priceId=orderInfo.price_id;
      this.coverage = orderInfo.coverage / 10000;
      this.plateNo = orderInfo.plate_no;
      this.plateExtraNo = orderInfo.plate_extra_no;
      this.price = orderInfo.price;
      this.cargoName=orderInfo.cargo_name;
      this.trackNo=orderInfo.track_no;
      this.quantity=orderInfo.quantity;

      this.rate=userInfo.rate;
      this.minPremium=userInfo.min_premium;
      this.maxCoverage=userInfo.max_coverage;
    },
    setData(info){//info---dchyb用户信息
      console.log(info);
      if(info){
        this.policyholder = info.company_name;
        this.beneficiary = info.company_name; //此处设置为被保险人就是投保人
        this.rate = info.rate;
        this.minPremium = info.min_premium;
        this.maxCoverage = info.max_coverage;
        this.priceId = info.price_id;
      }
    },
    checkBaseInfo(){
      return new Promise((resolve,reject)=>{
        cmnUserInfo().then(res => {
          if(res.err_code!==0){Indicator.close();Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
          if(!res.data.company_name){Indicator.close();this.$router.push("/setCompanyName") ;return ;}
          resolve(res.data)
        })
      })
    },
    getProductId(){
      return new Promise((resolve,reject)=>{
        cmnProductList({name: productData[this.productType]["name"]}).then(res => {
          if(res.err_code!==0){Indicator.close();Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
          if(res.rows.length!==1){Indicator.close();Toast({message: "获取产品id接口数据异常，", position: 'bottom'});return ;}
          resolve(res.rows[0])
        })
      })
    },
    checkProductInfo(userInfo){
      return new Promise((resolve,reject)=>{
        dchybUserList({product_name: productData[this.productType]["name"]}).then(res=>{
          if(res.err_code !== 0){Indicator.close();console.log(res.err_msg);return ;}
          if(res.rows.length>1){Indicator.close();Toast({message: "单次货运保查询结果不唯一", position: 'bottom'});return ;}
          if (res.rows[0] && res.rows[0].disabled) { //账户被禁用
            Indicator.close();
            MessageBox('提示', '尊敬的会员： 非常抱歉，您的账户暂时无法投保本保险产品，建议您选择其他险种，详询聚保服务热线：40080-59680');
            this.$router.push("dashboard") ;
            return ;
          }
          resolve(res.rows[0])
        });
      });
    },
    getAgreements(e){
      Indicator.open({text: '协议加载中...', spinnerType: 'fading-circle'});
      cmnAdminAgreementList({product_name: productData[this.productType]["name"],title:e.target.innerText}).then(res=>{
        Indicator.close();
        console.log(res,"协议列表");
        this.$refs.agreement.open();
        this.agreementContent = res.rows[0];
      })
    },

    back() {
      if (this.$store.state.routerFrom.path === this.goRouter || this.$store.state.routerFrom === "") {
        this.$router.push("/dashboard")
      } else {
        this.$router.push(this.$store.state.routerFrom.fullPath)
      }
    },
    checkSaveInfo(){
      let tips=null;
      let flag=false;
      if(!this.cargoName){
        tips = "请选择货物名称！"
      } else if(!this.quantity){
        tips = "请填写您数量包装！"
      } else if (this.startProvince === "未选择" || this.startCity === "未选择" || this.endProvince === "未选择" || this.endCity === "未选择") {
        tips = "请选择本次路线的始发地和目的地！"
      } else if (!this.plateNoCheck) {
        tips = "请正确填写本次运输车辆的车牌号码！"
      } else if(!this.trackNo){
        tips = "请填写您的运单号！"
      } else if(!this.coverage){
        tips = "请填写您的保险金额！"
      } else if(!this.agree){
        tips = "请先同意相关协议！"
      } else if(!this.coverage || this.coverage*1===0){
        tips = "投保金额必须填写且不能为0！"
      }else if(isNaN(this.coverage)){
        tips = "投保金额必须填数字！"
      } else if(this.coverage*10000>this.maxCoverage){
        tips = "投保金额高于最高保费！"
      } else{
        //if(this.coverage<this.minPremium){Toast({message: "投保金额低于最低保费，将按照最低保费来计费", position: 'bottom'})}
        flag=true;
      }
      if(!flag){Toast({message: tips, position: 'bottom'});}
      return flag;
    },
    goConfirm() {
      if(this.checkSaveInfo() && this.postLimit ){
        if(this.$route.query.orderId){if (!listStateCheck(this.orderStatus, 1)) {return;}}//订单状态不为1则直接提示}；
        let data = {
          id:this.$route.query.orderId*1 || 0,
          price_id:this.priceId,
          coverage:this.coverage*10000,//与后台对接的单位是元，页面显示的默认单位是万元；
          price:this.price,   //单位为分;价格=保额*费率；传到后台，保障前端显示的价格和后台一样
          policyholder:this.policyholder,
          beneficiary:this.beneficiary,
          cargo_name:this.cargoName,
          quantity:this.quantity,//货物数量描述，前端传值需要保留两位小数再乘以100,
          start_province: this.startProvince,
          start_city: this.startCity,
          end_province: this.endProvince,
          end_city: this.endCity,
          plate_no: this.plateNo,
          plate_extra_no: this.plateExtraNo,
          track_no:this.trackNo,
        };
        let query = this.$getStorage("locationQuery");
        if(query && query.alias){
          data.alias = query.alias
        }
        // if(JSON.stringify(window.sessionStorage.getItem("jubao56")).includes("alias")){ // 处理专属链接工号
        //   data.alias = JSON.parse(window.sessionStorage.getItem("jubao56")).registerDefault.alias;
        // }
        dchybOrderSave(data).then(res=>{
          if(res.err_code!==0){Indicator.close();Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
          this.$router.push({path:this.goRouter,query:{orderId:res.data.id}})
        });
      }
    }
  },
  beforeDestroy(){
    MessageBox.close(false);
  }
};

//投保成功确认页面
export const dchybConfirm = {
  components:{Pay},
  data() {
    return {
      startProvince: "",  //出发省份
      startCity: "",  //出发城市
      endProvince: "",  //到达省份
      endCity: "",  //到达城市

      policyholder: "",
      beneficiary: "",
      cargoName:"",
      quantity:"",    //数量包装
//              beginning:"",
//              destination:"",
      plateNo:"",
      plateExtraNo:"",
      trackNo:"",     //运单号
      coverage: "100万",
      rate:"0", //费率
      minPremium:"",  //最低保费
      maxCoverage:"", //最高保费
      price: "",

      orderStatus:"", //订单状态
      couponId:"",  //优惠券id
    }
  },
  beforeRouteEnter(to,from ,next){
    next(vm=> {
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
      dchybOrderInfo(vm.$route.query.orderId).then((res) => {
        if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return;}
        dchybUserList({product_name: productData[vm.productType]["name"]}).then(resp=>{
          Indicator.close();
          if(resp.err_code!==0){Indicator.close();Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
          if(resp.rows.length===0){
            Indicator.close();Toast({message: "请先设置服务人员", position: 'bottom'});
            this.$router.push({path:"/setChannel",query:{product:vm.productType}});return ;}//rows为空，代表dchyb用户不存在，让用户去设置渠道
          if(resp.rows.length>1){Indicator.close();Toast({message: "单次货运保查询结果不唯一", position: 'bottom'});return ;}
          vm.setData(res.data,resp.rows[0])
        })
      })
    })
  },
  mixins:[showData],
  created() {

  },
  methods: {
    setData(orderInfo,userInfo){//dchyb订单信息；价格方案信息
      console.log(orderInfo,userInfo);
      this.orderStatus=orderInfo.status;
      this.policyholder = orderInfo.policyholder; //此处设置为投保人与被保险人相同
      this.beneficiary = orderInfo.policyholder;

      this.startProvince =orderInfo.start_province;
      this.startCity = orderInfo.start_city;
      this.endProvince = orderInfo.end_province;
      this.endCity = orderInfo.end_city;
//            this.beginning=orderInfo.beginning;
//            this.destination=orderInfo.destination;
      this.coverage = orderInfo.coverage;
      this.plateNo = orderInfo.plate_no;
      this.plateExtraNo = orderInfo.plate_extra_no;
      this.price = orderInfo.price;
      this.cargoName=orderInfo.cargo_name;
      this.trackNo=orderInfo.track_no;
      this.quantity=orderInfo.quantity;
      this.rate=userInfo.rate;
      this.minPremium=userInfo.min_premium;
      this.maxCoverage=userInfo.max_coverage;
    },
    back(){
      this.$router.push({path:this.backRouter,query:{orderId:this.$route.query.orderId}})
    },
    confirmToPay(){
      if (!listStateCheck(this.orderStatus, 1)) {return;}//订单状态不为1则直接提示
      this.$refs.pay.open()

      // this.$router.push({path:"/pay",query:{
      //   orderId:this.$route.query.orderId,
      //   productName:this.productType
      // }})
    },
  }
};
