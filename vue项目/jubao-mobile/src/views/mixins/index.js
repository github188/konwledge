import { Toast,MessageBox,Indicator } from 'mint-ui';
import { cmnCityList,cmnProvinceList,cmnCaptchaNew,cmnBizChannelInfo,zcbUserRegister,spbUserRegister,ygbUserRegister,dchybUserRegister } from "../../assets/js/api";
import { bgUrlEscape,productData } from "../../assets/js/common"
// 两次密码输入框验证
export const checkPassWord = {
  data(){
    return {
      password: "", // 密码
      checkPass: "", // 确认密码
    }
  },
  methods: {
      // 验证密码
      testPass(){
          if(!this.$store.state.reg_pwd.test(this.password)){
              Toast('密码格式错误！');
              this.password = '';
              return false;
          }else {
              return true;
          }
      },
      // 验证两次密码是否一致
      reTestPass(){
          if(this.password !== this.checkPass){
              Toast('两次输入的密码不一致！');
              this.checkPass = '';
              return false;
          }else {
              return true;
          }
      },
  },
};

// 验证码输入框公共逻辑   注册、重置等
export const countdownFunc = {
  data(){
    return {
      captchaCode: "", // 输入的图形验证码
      captcha: "", // 图形验证码地址参数
    }
  },
  computed:{
    captchaUrl(){
      return this.captcha ? this.$store.state.cmnUrl+'/v1/cmn/captcha/new/'+this.captcha+'.png' : null;
    }
  },
  methods: {
    //获取图形验证码
    getCaptcha(){
      cmnCaptchaNew().then((res)=>{
        if(res.err_code===0){
          this.captcha = res.data.captcha_id;
        }else{
          Toast({ message: res.err_msg, duration: 1000, position:'bottom' });
        }
      })
    },
    // 验证码按钮的失败情况的回调事件
    smsError(res){
      if(res.err_code === 1005){
        Toast({ message: '图形验证码错误！', duration: 1000, position:'bottom' });
        this.getCaptcha();
        this.captchaCode = '';
      }else{
        Toast({ message: res.err_msg, duration: 1000, position:'bottom' });
      }
    },
  },
};
//省市联动
export const provinceCity ={
  data() {
    return {
      startProvince: "未选择",  //出发省份
      endProvince: "未选择",  //到达省份
      startCity: "未选择",  //出发城市
      endCity: "未选择",  //到达城市
      startProvinceList: ["未选择"],  //出发省份列表
      endProvinceList: ["未选择"],  //到达省份列表
      startCityList: ["未选择"],  //出发城市列表
      endCityList: ["未选择"],  //到达城市列表
    }
  },
  methods: {
    getProvinceList(){
      cmnProvinceList().then(res=>{
        if(res.err_code!==0){Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
        this.startProvinceList = this.startProvinceList.concat(res.data);
        this.endProvinceList = this.endProvinceList.concat(res.data);
      })
    }
  },
  watch:{
    startProvince(val,oldVal){
      if(val==="未选择"){ this.startCityList= ["未选择"];this.startCity="未选择";return;}
      cmnCityList(val).then(res=>{
        if(res.err_code!==0){Toast({message: res.err_msg, position: 'bottom'});return ;}
        let list = ["未选择"];
        res.data.forEach((val,idx)=>{
          list.push(val.city);
        });
        if(oldVal!=="未选择"){this.startCity="未选择";} //强制性给默认值赋值；在默认值为旧值时不赋值
        this.startCityList=list;
        // this.countPrice() //不同的产品，计算方式不一样；
      })
    },
    endProvince(val,oldVal){
      if(val==="未选择"){ this.endCityList= ["未选择"];this.endCity="未选择";return;}
      cmnCityList(val).then(res=>{
        if(res.err_code!==0){Toast({message: res.err_msg, position: 'bottom'});return ;}
        let list = ["未选择"];
        res.data.forEach((val,idx)=>{
          list.push(val.city);
        });
        if(oldVal!=="未选择"){this.endCity="未选择";}
        this.endCityList=list;
        // this.countPrice()
      })
    }
  },
};
/**
 * 1，页面中data内需要挂载数据tickIcon；showData
 * 2，tickIcon和tick(icon,newIcon)种的icon相同，
 * @type {{methods: {tick: (function(*, *))}}}
 */
export const tickChange = {
  methods: {
    tick(icon='icon-duigou',newIcon='icon-checkmarkcircle'){
      if(this.tickIcon===icon){
        this.tickIcon=newIcon
      }else{
        this.tickIcon=icon
      }
    },
  }
};
/**
 * 被控制元素为el,el上要设置ref,并且内嵌样式display="none/block"
 * 效果：点击方法所在的元素，控制元素el显示隐藏切换。
 * @type {{methods: {changeDisplay: (function(*))}}}
 */
export const changeDisplay = {
  methods:{
    changeDisplay(refName){
      if(this.$refs[refName].style.display==="none"){
        this.$refs[refName].style.display="block"
      }else{
        this.$refs[refName].style.display="none"
      }
    }
  }
};
//各种价格，费率的显示filters
export const showData = {
  filters:{
    showPrice(val){  //价格；分====》元
      if(!isNaN(val)){
        return "￥"+(val/100).toFixed(2)
      }else{
        return "0"
      }
    },
    showCoverage(val){ //保险限额；元====》万元
      if(!isNaN(val)){
        return (val/10000)+"万"
      }
    },
    showRate(val){ //费率；分====》 %
      if(!isNaN(val)){
        return (val/10000)+"%"
      }
    },
    showYuan(val){  //价格；分====》元
      if(!isNaN(val)){
        return (val/100).toFixed(2)+"元"
      }
    },
  },
};
//当图片作为背景图时，将图片地址进行编码
export const showBg = {
  methods:{
    background(url,size='contain') {
      return {
        backgroundImage: 'url("' + bgUrlEscape(url) + '")',
        backgroundSize:size,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center'
      }
    }
  }
};

//车牌号提示语句和验证格式是否正确
export const carPlateNo = {
  data(){
    return {
      plateNo:null,
      plateExtraNo:"",
      plateNoTip:"",        //车牌号提示信息txt文本
      plateNoTipShow:false,
    }
  },
  computed:{
    plateNoCheck(){
      if(this.plateNo!==null){
        this.plateNoTipShow=true
      }
      if (!this.plateNo) {
        this.plateNoTip = "此处不能为空";return false;
      } else if (!this.$store.state.plateNoReg.test(this.plateNo)) {
        this.plateNoTip = "格式不正确";return false;
      } else {
        this.plateNoTip = "格式正确";return true;
      }
    },
  },
};

export const touchFeel = {
  data(){
    return {
      touchFeelColor:"",
      touchDownColor:"#0089ed",
    }
  },
  methods: {
    buttonTouchStart(e){
      this.touchFeelColor=e.target.style.background;
      e.target.style.background=this.touchDownColor;
    },
    buttonTouchEnd(e){
      e.target.style.background=this.touchFeelColor;
    },
  }
};

// 订单列表公共逻辑
export const ordersFunc = {
  data(){
      return {
          orderStatus: this.$route.query.type || 'unpaid',
          unpaidOrders: [], // 总的未支付订单，用于累计储存每次加载的数据
          unpaidLoadOrders: [], // 每次数据请求返回的未支付数据
          unpaidTotal: [], // 未支付保单的条数
          unpaidPage: 1, // 未支付保单的页码
          paidOrders: [], // 总的已完成订单，用于累计储存每次加载的数据
          paidLoadOrders: [], // 每次数据请求返回的已完成数据
          paidTotal: [], // 已完成保单的条数
          paidPage: 1, // 已完成保单的页码
      }
  },
  created(){
      if(this.$route.query.type === "unpaid" || !this.$route.query.type){
          this.getUnpaidData("init");
      }else if(this.$route.query.type === "paid"){
          this.getPaidData("init");
      }
  },
  mounted(){
      let self = this;
      // 返回角度
      function getSlideAngle(dx, dy) {
          return Math.atan2(dy, dx) * 180 / Math.PI;
      }
      // 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
      function getSlideDirection(startX, startY, endX, endY) {
          let dy = startY - endY;
          let dx = endX - startX;
          let result = 0;

          //如果滑动距离太短
          if(Math.abs(dx) < 2 && Math.abs(dy) < 2) return result;

          let angle = getSlideAngle(dx, dy);
          if(angle >= -45 && angle < 45) {
              result = 4;
          }else if (angle >= 45 && angle < 135) {
              result = 1;
          }else if (angle >= -135 && angle < -45) {
              result = 2;
          }
          else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
              result = 3;
          }
          return result;
      }

      // 滑动处理
      let startX, startY;
      document.addEventListener('touchstart',function (ev) {
          startX = ev.touches[0].pageX;
          startY = ev.touches[0].pageY;
      }, false);
      document.addEventListener('touchend',function (ev) {
          let endX, endY;
          endX = ev.changedTouches[0].pageX;
          endY = ev.changedTouches[0].pageY;
          let direction = getSlideDirection(startX, startY, endX, endY);
          switch(direction) {
              // case 0: console.log("没滑动"); break;
              case 1:
                  if(!self.$route.path.toLowerCase().includes("order")) break;
                  let containerHeight = document.querySelector(".orders_container").offsetHeight;
                  let containerScroll = document.querySelector(".orders_container").scrollTop - document.querySelector(".header").offsetHeight;
                  if(self.$route.query.type === "unpaid"){
                      let unpaidHeight = document.querySelector(".unpaidList").offsetHeight;
                      containerHeight + containerScroll >= unpaidHeight - 5 && self.unpaidLoadMore();
                  }else{
                      let paidHeight = document.querySelector(".paidList").offsetHeight;
                      containerHeight + containerScroll >= paidHeight - 5 && self.paidLoadMore();
                  }
                  break;
              // case 2: console.log("向下"); break;
              // 左右滑动效果不好，暂时取消
              // case 3:
              //       if(!self.$route.path.toLowerCase().includes("order")) break;
              //       self.getUnpaidData("init");
              //       self.$router.push({ path: self.$route.path, query:{ type: 'unpaid' } });
              //       break;
              // case 4:
              //     if(!self.$route.path.toLowerCase().includes("order")) break;
              //     self.getPaidData("init");
              //     self.$router.push({ path: self.$route.path, query:{ type: 'paid' } });
              //     break;
              default:
          }
      }, false);
  },
  methods: {
      // 获取未支付保单数据
      getUnpaidData(type){
          Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
          this.getPaidOrdersFunc({
              page: this.unpaidPage,
              rows: 10,
              status: this.unpaidStatus,
              platform_type: 1
          }).then((res)=>{
              Indicator.close();
              if(res.err_code !==0 ){ MessageBox( "提示",res.err_msg );return ;}
              let unpaidLoadOrders = res.rows;
              if(type === "init"){
                  this.unpaidOrders= unpaidLoadOrders;
              }else {
                  this.unpaidOrders= this.unpaidOrders.concat(unpaidLoadOrders);
              }
              this.unpaidTotal = res.total;
          })
      },
      // 获取已完成保单数据
      getPaidData(type){
          Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
          this.getPaidOrdersFunc({
              page: this.paidPage,
              rows: 10,
              status: this.paidStatus,
              platform_type: 1
          }).then((res)=>{
              Indicator.close();
              if(res.err_code !==0 ){ MessageBox("提示",res.err_msg);return ;}
              let paidLoadOrders = res.rows;
              if(type === "init"){
                  this.paidOrders= paidLoadOrders;
              }else {
                  this.paidOrders= this.paidOrders.concat(paidLoadOrders);
              }
              this.paidTotal = res.total;
          })
      },
      // 取消订单
      cancelOrder(orderId, index){
          MessageBox.confirm('确定删除此订单?').then(action => {
              this.cancelOrderFunc({ order_id: orderId * 1,status: this.cancelOrderStatus }).then((res)=>{
                  if(res.err_code === 0){
                      this.unpaidOrders.splice(index, 1);
                      Toast({ message: '订单已取消', duration: 1000, position: 'bottom' });
                  }else{
                      Toast({ message: res.err_msg || '未知错误！', duration: 1000, position: 'bottom' });
                  }
              })
          }).catch( err => { console.log(err) })
      },
      // 加载更多
      unpaidLoadMore(){
          if(this.unpaidOrders.length < this.unpaidTotal){
              this.unpaidPage++;
              this.getUnpaidData();
          }
      },
      paidLoadMore(){
          if(this.paidOrders.length < this.paidTotal){
              this.paidPage++;
              this.getPaidData();
          }
      },
      toggle(type){
          if(type==="unpaid"){
              this.getUnpaidData("init");
          }else if(type==="paid"){
              this.getPaidData("init");
          }
      }
  },
};







