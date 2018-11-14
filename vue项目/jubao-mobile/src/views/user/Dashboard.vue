<template>
  <div class="user">
    <div class="content_box">
      <div class="content">
        <div class="user_head blue_bg">
          <div class="message">
            <router-link to="/message">
              <i class="iconfont icon-youxiang"></i>
            </router-link>
          </div>
          <div class="ziliao">
            <img src="../../assets/img/userImg.png">
            <p v-if="companyName">{{companyName}}</p>
            <p v-else @click="$router.push('/setCompanyName')">设置公司名称</p>
          </div>
          <div class="setting">
            <router-link to="/setting">
              <i class="iconfont icon-shezhi"></i>
            </router-link>
          </div>
        </div>
        <div class="user_pro_box">

          <div class="user_pro" :class="`user_${val.name}`"  v-for="(val,idx) in productList">
            <div class="u_sub_top">
              <div>
                <i class="iconfont blue" :class="val.icon"></i>&nbsp;&nbsp;<span>{{val.productName}}</span>
              </div>
              <div class="right_txt" v-if="val.balanceMoney">可用余额：<span class="red">{{ (nameToBalance(val.name) / 100).toFixed(2) }}元</span></div>
            </div>
            <div class="u_sub_bot">
              <router-link :to="val.btn1Href || `/${val.name}Create`" tag="span" v-touchFeel="{color:'#f2f2f2'}">{{val.btn1Text}}</router-link>
              <router-link :to="val.btn2Href || `/${val.name}Orders?type=unpaid`" tag="span" v-touchFeel="{color:'#f2f2f2'}">{{val.btn2Text}}</router-link>
              <router-link :to="val.btn3Href || `/${val.name}Orders?type=paid`" tag="span" v-touchFeel="{color:'#f2f2f2'}" v-if="!val.btn3Event">{{val.btn3Text}}</router-link>
              <span @click="nameToRecharge(val.name)" v-touchFeel="{color:'#f2f2f2'}" v-else>充值</span>
            </div>
          </div>


          <!--<div class="user_pro user_zcb">-->
            <!--<div class="u_sub_top">-->
              <!--<div>-->
                <!--<i class="iconfont icon-huoche2 blue"></i>&nbsp;&nbsp;<span>专线保</span>-->
              <!--</div>-->
              <!--<div class="right_txt">可用余额：<span class="red">{{ (zxbBalance / 100).toFixed(2) }}元</span></div>-->
            <!--</div>-->
            <!--<div class="u_sub_bot">-->
              <!--<router-link to="/zxbCreate" tag="span" v-touchFeel="{color:'#f2f2f2'}">立即投保</router-link>-->
              <!--<router-link to="/zxbOrders?type=unpaid" tag="span" v-touchFeel="{color:'#f2f2f2'}">我的保单</router-link>-->
              <!--<router-link to="/zxbDescription" tag="span" v-touchFeel="{color:'#f2f2f2'}">充值</router-link>-->
            <!--</div>-->
          <!--</div>-->
          <div class="user_pro user_hwb" v-wwwNone>
            <div class="u_sub_top">
              <div>
                <i class="iconfont icon-jiankang blue"></i>&nbsp;&nbsp;<span>安享一生癌症医疗险</span>
              </div>
            </div>
            <div class="u_sub_bot">
              <router-link to="/axjkxCreate" tag="span" v-touchFeel="{color:'#f2f2f2'}">立即投保</router-link>
              <router-link to="/axjkxOrders?type=unpaid" tag="span" v-touchFeel="{color:'#f2f2f2'}">未生效保单</router-link>
              <router-link to="/axjkxOrders?type=paid" tag="span" v-touchFeel="{color:'#f2f2f2'}">已生效保单</router-link>
            </div>
          </div>
          <div class="user_pro user_hwb" v-wwwNone>
            <div class="u_sub_top">
              <div>
                <i class="iconfont icon-qiche blue"></i>&nbsp;&nbsp;<span>大宗货物保</span>
              </div>
            </div>
            <div class="u_sub_bot">
              <router-link to="/hwbCreate" tag="span" v-touchFeel="{color:'#f2f2f2'}">立即投保</router-link>
              <router-link to="/hwbOrders?type=unpaid" tag="span" v-touchFeel="{color:'#f2f2f2'}">未生效保单</router-link>
              <router-link to="/hwbOrders?type=paid" tag="span" v-touchFeel="{color:'#f2f2f2'}">已生效保单</router-link>
            </div>
          </div>
          <div class="user_pro user_llb" v-wwwNone>
            <div class="u_sub_top">
              <div>
                <i class="iconfont icon-icon-weather-snowflake blue"></i>&nbsp;&nbsp;<span>冷链保</span>
              </div>
            </div>
            <div class="u_sub_bot">
              <router-link to="/llbCreate" tag="span" v-touchFeel="{color:'#f2f2f2'}">立即投保</router-link>
              <router-link to="/llbOrders?type=unpaid" tag="span" v-touchFeel="{color:'#f2f2f2'}">未生效保单</router-link>
              <router-link to="/llbOrders?type=paid" tag="span" v-touchFeel="{color:'#f2f2f2'}">已生效保单</router-link>
            </div>
          </div>
        </div>
        <a href="tel:4008059680" class="user_tel">
          <i class="iconfont icon-tel"></i>
          <span>24小时服务热线 40080-59680</span>
        </a>
      </div>
      <tab></tab>
    </div>
    <Recharge type="zcb" @refreshAmount="init()" ref="recharge"></Recharge>
  </div>
</template>

<script>
	import Tab from 'views/components/Tab';
	import Panel from '../../base/panel/Panel'
	import {MessageBox, Toast, Indicator} from 'mint-ui';
	import {cmnUserInfo, cmnCompanyInfo, zcbUserInfo, zxbUserInfo,cmnAppServicedproductList} from '../../assets/js/api';
	import {productData} from '../../assets/js/common';
	import Recharge from "../components/Recharge.vue"
  import {getProductList} from "../../assets/js/SaveToSession"

  const productList = [
    {name:"zcb",icon:"icon-puhuoche",productName:"整车保",btn1Text:"立即投保",btn2Text:"我的保单",btn3Text:"充值",btn3Event:true,balanceMoney:true},
    {name:"ygb",icon:"icon-baoxian",productName:"员工保",btn1Text:"立即投保",btn2Text:"我的保单",btn3Text:"加人换人"},
    {name:"spb",icon:"icon-huozai",productName:"商铺档口火灾保",btn1Text:"立即投保",btn2Text:"未生效保单",btn3Text:"已生效保单"},
    {name:"phb",icon:"icon-cir-umbrella",productName:"普货保",btn1Text:"立即投保",btn2Text:"未生效保单",btn3Text:"已生效保单"},
    {name:"hcb",icon:"icon-lahuoche",productName:"货车重大事故保",btn1Text:"立即投保",btn2Text:"未生效保单",btn3Text:"已生效保单"},
    {name:"dchynb",icon:"icon-huoche1",productName:"定车货运年保",btn1Text:"立即投保",btn2Text:"未生效保单",btn3Text:"已生效保单"},
    {name:"zxb",icon:"icon-huoche2",productName:"专线保",btn1Text:"立即投保",btn2Text:"我的保单",btn3Text:"充值",btn3Href:"/zxbDescription",balanceMoney:true},
//    {name:"axjkx",icon:"icon-jiankang",productName:"安享一生癌症医疗险",btn1Text:"立即投保",btn2Text:"未生效保单",btn3Text:"已生效保单"}
  ];

	export default {
		components: {
			Tab, Recharge, Panel
		},
		data() {
			return {
				companyName: "", // 公司名称
				zcbBalance: 0, // 整车保余额
				rechargeType: "",    //充值的类型
				zxbBalance: 0, //专线保余额
				cmnUserInfo: {},
				zcbUserInfo: {},
        productList:[]
			}
		},
		created() {
		  this._showDashboardList();//按顺序显示个人中心列表
			this.init();
		},
		methods: {
//      ,zxbUserInfo()
      async _showDashboardList(){
        try{
          let res = this.$getStorage("productList") || await cmnAppServicedproductList({app_id:1,os_type:8});
          if(res.err_code!==0){	Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
          this.productList=res.rows.map((val,idx)=>{
//            let name = idToName[val.product_id];
            productList.some((value,idx)=>{
              if(value.productName===val.product_name){
                for(let i in value){
                  val[i]=value[i]
                }
                return true ;
              }
            });
            return val
          })
//            .sort((a,b)=>{
//              return a.sort-b.sort
//            });
        }catch (err){
          console.log(err)
        }
      },
      nameToBalance(name){
        const json = {
          "zcb":this.zcbBalance,
          "zxb":this.zxbBalance
        };
        return json[name]
      },
      nameToRecharge(name){
        const json = {
          "zcb":this.zcbRecharge,
        };
        json[name]()
      },
			init() {
				Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
				Promise.all([cmnUserInfo(), zcbUserInfo(), zxbUserInfo()]).then(res => {
					Indicator.close();
					this.companyName = res[0].err_code === 0 ? res[0]["data"].company_name : ""; // 公司名称
					this.zcbBalance = res[1].err_code === 0 ? res[1]["data"].balance : "0.00"; // 整车保余额
					this.zxbBalance = res[2].err_code === 0 ? res[2]["data"].balance : "0.00"; // 专线保余额
					this.cmnUserInfo = res[0];
					this.zcbUserInfo = res[1];
				}).catch(err => {
					console.log('网络异常,请手动刷新页面');
				})
			},
			zcbRecharge() {
				if(this.checkCmnUserInfo(this.cmnUserInfo) && this.checkZcbUserInfo(this.zcbUserInfo)){
					this.rechargeType = "zcb";
					this.$refs.recharge.open()
				}
			},
			checkCmnUserInfo(res) {
				if (res.err_code !== 0) {
					Toast({message: res.err_msg || "未知错误", position: 'bottom'});
					return false;
				}
				if (!res.data.company_name) {
					Indicator.close();
					MessageBox({
						message: '公司名称为投保必填信息，请前往设置完善...',
						confirmButtonText: '去完善信息',
						cancelButtonText: '返回',
						showCancelButton: true,
						closeOnClickModal: false
					})
						.then(action => {
							if (action === 'confirm') this.$router.push({path: '/setCompanyName'});
							if (action === 'cancel') this.$router.push({path: '/dashboard'});
						});
//          this.$router.push("/setCompanyName");
					return false;
				}
				return true;
			},
			checkZcbUserInfo(res) {
				if (res.err_code === 1010 || res.data && !res.data.signed) { //未签署协议
					Indicator.close();
					Toast({message: "请先签署相关协议", position: 'bottom'});
					this.$router.push("/zcbAgree");
					return false;
				} else if (res.err_code !== 0) { //异常情况
					Indicator.close();
					Toast({message: res.err_msg || "未知错误", position: 'bottom'});
					return false;
				} else if (res.data && res.data.disabled) { //账户被禁用
					Indicator.close();
					MessageBox('提示', '尊敬的会员： 非常抱歉，您的账户暂时无法投保整车保，建议您选择其他险种，详询聚保服务热线：40080-59680');
					this.$router.push("dashboard");
					return false;
				} else {
					return true;
				}
			},
		},
//        beforeRouteLeave( to,from,next ){
//            if(to.path.toLowerCase().includes("create") && !this.companyName){
//                Toast({ message: "请先设置您的公司名称！", duration: 1000 , position:'bottom'});
//                next({ path: '/setCompanyName' });
//            }else {
//                next();
//            }
//        }
	}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/user/dashboard.scss';

  .content_box {
    top: 0;
  }

  .icon_box {
    transition: all .3s ease;
  }

  .rotate {
    transform: rotate(90deg);
  }

</style>
