<template>
  <div class="zcb_create">
    <v-header title="投保信息填写"></v-header>
    <div class="all_content">
      <div class="main">
        <ul class="order_list">
          <li class="flex">
            <label for="policyholder" class="label">投保人</label>
            <input type="text" id="policyholder"
                   class="company" placeholder="请选择投保人名称"
                   :value="policyholder" disabled
                   maxlength="50"/>
          </li>
          <li class="flex">
            <label for="beneficiary" class="label">被保险人</label>
            <input type="text" id="beneficiary"
                   class="company" placeholder="请选择被保险人名称"
                   :value="beneficiary" disabled
                   maxlength="50"/>
          </li>
          <li class="plateNo">
            <plate-no  v-model.trim="plateNo"></plate-no>
          </li>
          <li class="plateExtraNo">
            <label class="label" for="plate_extra_no">挂车牌号</label>
            <input type="text" id="plate_extra_no" class="placeholder" placeholder="选填" v-model.trim="plateExtraNo" maxlength="11"/>
          </li>

          <li class="distance_price_count">
            <pro-link-city label="始发地" :distance="start" ref="proLinkCity" @change="countPrice"></pro-link-city>
          </li>
          <li class="distance_price_count">
            <pro-link-city label="目的地" :distance="end" ref="proLinkCity2" @change="countPrice"></pro-link-city>
          </li>

          <li><span class="label">里程</span><span class="red distance">{{distance}}</span><span>公里</span></li>
          <li class="block">
            <limit-coverage v-model="coverage"></limit-coverage>
          </li>
          <el-tabs v-model="activeName">
            <el-tab-pane label="上传装车清单照片" name="first">
              <li class="block2 zcb_create upload_box">
                <upload :url="uploadUrl"
                        :maxLimit="15"
                        v-model="imgList">
                </upload>
              </li>
            </el-tab-pane>
            <el-tab-pane label="手工添加装车清单" name="second">
              <li class="manual_info">
                <order-list :manualInfoList="manualInfoList" ref="orderList"></order-list>
              </li>
            </el-tab-pane>
          </el-tabs>

          <li class="agree">
            <notice-agreement @showDetail="showAgreementDetail"></notice-agreement>
          </li>
        </ul>
      </div>
      <div class="bottom_content">
        <div class="left_create msg_box">{{price | showPrice}}</div>
        <div class="right msg_box" @click="goZcbConfirm" v-touchFeel>下一步</div>
      </div>
    </div>
    <!--协议详情页面-->
    <agreement-risk ref="risk"></agreement-risk>
    <!--整车保用户达标情况提示框-->
    <verify-notice></verify-notice>
  </div>
</template>

<script>
  import {apiUrl} from "../../../assets/js/data"
  import {MessageBox, Indicator, Toast} from 'mint-ui';
  import {provinceCity, showData} from "../../mixins/index.js"
//  import upload from "../../../base/weuiUpload/weuiUpload.vue"
  const upload = ()=>import('base/weuiUpload/weuiUpload')
  import {cmnUserInfo, zcbUserInfo, zcbOrderList, zcbOrderPrice, zcbOrderSave, zcbOrderTrySave, zcbOrderTryInfo, zcbOrderInfo, zcbAgreementList} from '../../../assets/js/api';
  import {bgUrlEscape, listStateCheck,ToastError} from "../../../assets/js/common"
  import AgreementRisk from "./AgreementRisk.vue"
  import OrderList from "./OrderList.vue"
  import PlateNo from "./PlateNo.vue"
  import ProLinkCity from "./ProLinkCity.vue"
  import LimitCoverage from "./LimitCoverage.vue"
  import NoticeAgreement from "./NoticeAgreement.vue"
  import VerifyNotice from "./VerifyNotice.vue"
  export default {
    components: {
       AgreementRisk,OrderList,PlateNo,ProLinkCity,LimitCoverage,NoticeAgreement,VerifyNotice,upload
    },
    mixins: [ showData],
    data() {
      return {
        plateNo:"",
        plateExtraNo:"",
        start:{
          province:"未选择",
          city:"未选择"
        },
        end:{
          province:"未选择",
          city:"未选择"
        },
        uploadUrl:apiUrl.fileUrl,
        //信息渲染部分
        policyholder: "某某公司",      //投保人
        beneficiary: "某某公司",     //被保险人
        initFlag:false,   //是否为初始化

        orderStatus: "", //订单状态---在有orderId时会实时更新信息，判断此订单是否已支付
        price: "0",
        distance: "0",
        isTrial:false,
        tickIcon: "icon-danxuan",
        coverage: 1500000,
        imgList: [],
        excelList: [],
        agree: true,
        postLimit: true,  //限制用户的点击频率
        manualInfoList: [], //手工添加信息数组
        activeName:"first",
      }
    },
    watch:{
      coverage(val,oldVal){
        if(this.initFlag){this.initFlag=false;return ;}//初始化赋值时不进行计算操作
        this.countPrice();
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
//        vm.getProvinceList();//省市区的信息处理;
        Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
        let query = vm.$route.query;
        if (query.orderId) {
          zcbOrderInfo(query.orderId).then(res=>{
            Indicator.close();
            if(res.err_code !== 0){ Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
            vm.setOrderData(res)
          })
        } else {
          vm.init(query)
        }
      })
    },
    created() {

    },
    mounted(){
      this.$route.query.orderId?null:this.$refs.orderList.addManualInfo()
    },
    methods: {
      init(query){
        Promise.all([cmnUserInfo(),zcbUserInfo(),zcbOrderList({platform_type:1,page:1,rows:10})]).then(res=>{
          if (!this.checkCmnUserInfo(res[0])){Indicator.close();return ;}
          this.policyholder = res[0].data.company_name;//此处设置为被保险人就是投保人
          this.beneficiary = res[0].data.company_name; //此处设置为被保险人就是投保人

          //验证整车保用户信息
          if(!this.checkZcbUserInfo(res[1])){Indicator.close();return ;}

          //取最近一次的历史记录渲染到页面
          if(res[2].err_code !== 0){Indicator.close();Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
          this.setHistoryData(res[2]);
          Indicator.close()
        });
      },
      _initOrderBaseData(row){
        this.initFlag=true;
        this.$refs.proLinkCity.initData({
          province:row.start_province,
          city:row.start_city
        });
        this.$refs.proLinkCity2.initData({
          province:row.end_province,
          city:row.end_city
        });
        this.coverage = row.coverage;
        this.distance =row.distance;
        this.price = row.price;
      },

      showAgreementDetail(res){
        let agreement = res.data[0];
        this.$refs.risk.initData({
          title:agreement.title,
          html:agreement.content,
        });
        this.$refs.risk.open();
      },
      countPrice() {
        if (this.start.province === "未选择" || this.start.city === "未选择" || this.end.province === "未选择" || this.end.city === "未选择") {
          this.distance = "0";
          this.price = "0";
        }else{
          zcbOrderPrice({
            start_province: this.start.province,
            start_city: this.start.city,
            end_province: this.end.province,
            end_city: this.end.city,
            coverage: this.coverage * 1
          }).then((res) => {
            this.distance = res.data.distance;
            this.price = res.data.price;
          })
        }
      },
      goZcbConfirm() {
        if (this.checkSaveInfo() && this.postLimit) {
          if (this.$route.query.orderId) {
            if (!listStateCheck(this.orderStatus, 1)) {
              return;
            }//订单状态不为1则直接提示
          }

          Indicator.open({text: '资料保存中...', spinnerType: 'fading-circle'});
          this.postLimit = false;
          zcbOrderSave({
            "id": this.$route.query.orderId ? Number(this.$route.query.orderId) : 0,
            "policyholder":this.policyholder,
            "beneficiary":this.beneficiary,
            "plate_no": this.plateNo,
            'plate_extra_no': this.plateExtraNo,
            "start_province": this.start.province,
            "start_city": this.start.city,
            "end_province": this.end.province,
            "end_city": this.end.city,
            "coverage": this.coverage * 1,
            "cargos": this.getCargos()
          }).then(res => {
            this.postLimit = true;
            Indicator.close();
            if (res.err_code !== 0) {
              Toast({message: res.err_msg || "未知错误", position: 'bottom'});
              return;
            }
            this.$router.push("/zcbConfirm?orderId=" + res.data.id);
            this.postLimit = false; //成功之后立刻禁用点击功能！
          }).catch(err => {
            this.postLimit = true;
          })
        }
      },
      //======================tools================================================
      showCargosImg(cargos) {
        cargos = cargos.filter( L => L.file_url );
        for (let i = 0; i < cargos.length; i++) {
          let fileType = cargos[i].file_url.substring(cargos[i].file_url.lastIndexOf(".") + 1);
          let fileName = cargos[i].file_url.substring(cargos[i].file_url.lastIndexOf("/") + 1);//eg:"http://test.jubao56.com/res/2017/12/25/11/2518479/cardKingClub.png"=>cardKingClub.png
          if (fileType === "xlsx" || fileType === "xls") { //pc端上传Excel，手机端观看时
            this.excelList.push({
              name: fileName,
              file_url: cargos[i].file_url
            })
          } else {
            this.imgList.push({
              name: fileName,
              file_url: bgUrlEscape(cargos[i].file_url)
            })
          }
        }
      },
      getCargos(){
        // 处理装车清单及扫描件数据
        let cargos = [];
        this.imgList.forEach( L => {
          cargos.push({ file_url: unescape(typeof L === "string" ? L : L.file_url)})
        });
        this.manualInfoList.forEach( L =>{
          if(!Object.values(L).every(M => !M)){ // 不是全为空时则录入手动信息
            cargos.push({
              id:L.id?L.id:0,
              track_no : String(L.track_no),
              beginning : String(L.beginning),
              destination : String(L.destination),
              name : String(L.name),
              quantity : Math.round(L.quantity * 100),
              unit : String(L.unit)
            });
          }
        });
        return cargos
      },
      //======================check================================================
      checkCmnUserInfo(res){
        if (res.err_code !== 0) {Toast({message: res.err_msg || "未知错误", position: 'bottom'});return false;}
        if (!res.data.company_name) {
          Indicator.close();
          MessageBox({message:'公司名称为投保必填信息，请前往设置完善...',confirmButtonText:'去完善信息',cancelButtonText:'返回',showCancelButton:true,closeOnClickModal:false})
            .then(action=>{
              if(action === 'confirm') this.$router.push({path:'/setCompanyName'});
              if(action === 'cancel') this.$router.push({path:'/dashboard'});
            });
//          this.$router.push("/setCompanyName");
          return false;
        }
        return true;
      },
      checkZcbUserInfo(res){
        if(res.err_code === 1010 || res.data && !res.data.signed){ //未签署协议
          Indicator.close();Toast({message: "请先签署相关协议", position: 'bottom'});
          this.$router.push("/zcbAgree");
          return false;
        }else if(res.err_code !== 0){ //异常情况
          Indicator.close(); Toast({message: res.err_msg || "未知错误", position: 'bottom'});
          return false;
        }else if(res.data && res.data.disabled){ //账户被禁用
          Indicator.close();MessageBox('提示', '尊敬的会员： 非常抱歉，您的账户暂时无法投保整车保，建议您选择其他险种，详询聚保服务热线：40080-59680');
          this.$router.push("dashboard");
          return false;
        }else{
          return true;
        }
      },
      checkSaveInfo() {
        let tips = null;
        let flag = false;
        let checkManuaResult = this.$refs.orderList.checkManuaInfoList();
        if(this.isTrial){
          tips="注意：本订单为测试单！"
        } else if (this.start.province === "未选择" || this.start.city === "未选择" || this.end.province === "未选择" || this.end.city === "未选择") {
          tips = "请选择本次路线的始发地和目的地！"
        } else if (!this.$store.state.plateNoReg.test(this.plateNo)) {
          tips = "请正确填写本次运输车辆的车牌号码！"
        } else if (this.imgList.length === 0 && checkManuaResult == "allNotEnter") {
          tips = "请手动输入或上传装车清单扫描件！"
        } else if(checkManuaResult && checkManuaResult != "allNotEnter"){
          tips = checkManuaResult;
        } else if (!this.agree) {
          tips = "请先同意相关协议！"
        } else {
          flag = true;
        }
        if (!flag) {
          Toast({message: tips, position: 'bottom'});
        }
        return flag;
      },
      //======================setData================================================
      setHistoryData(res){
        let row =res.rows[0];
        if(!row){return ;} //没有历史信息，则直接return
        this._initOrderBaseData(row)
      },
      setOrderData(res) {
        if(res.data.is_trial){Toast({message: "本单为测试单,若需要体验请在PC端投保！", position: 'bottom'});}

        this.showCargosImg(res.data.cargos);  //显示所有的图片和文件
        this.$refs.orderList.showManualList(res.data.cargos); //显示手工清单
        if(this.imgList.length===0){this.activeName="second"}
        //===========订单信息渲染渲染==============
        this.orderStatus = res.data.status;//订单状态
        this.isTrial=res.data.is_trial;
        this.policyholder = res.data.policyholder;
        this.beneficiary = res.data.policyholder; //此处设置为被保险人就是投保人
        this._initOrderBaseData(res.data);
        this.plateNo = res.data.plate_no;
        this.plateExtraNo = res.data.plate_extra_no;
      },
    },
    beforeDestroy(){
      MessageBox.close(false);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/create";
  .upload_title {
    @include vc-hc(pxToRem(80));
    text-align: center;
    justify-content: space-around;
    /*border-bottom: 1px solid #ccc;*/
    div{
      flex: 1;
      height: 100%;
      background: #fff;
      font-size: pxToRem(28);
      max-width: pxToRem(280);
      box-sizing: border-box;
      &.on{
        color: #06acf9;
        /*border-bottom: 2px solid #06acf9;*/
      }
    }
  }
  .upload_box {
    background-color: rgba(249, 249, 249, 1) !important;
  }
  .upload_title.zcb_create::after {
    border: none !important;
  }
  .manual_info {
    height: auto !important;
    padding: 0 !important;
    background-color: rgba(249, 249, 249, 1) !important;
  }

</style>
