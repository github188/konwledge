import Vue from 'vue'
import Router from 'vue-router'
import { getToken} from "assets/js/api"

import {getStorage} from "../libs/js/SessionStorage"
import {setLocationQuery} from "../libs/js/LocationTransform"

//首页和其他路由
const Home = resolve => require(['views/Home'], resolve);
const Login = resolve => require(['views/Login'], resolve);
const SMSLogin = resolve => require(['views/SMSLogin'], resolve);
const Register = resolve => require(['views/Register'], resolve);
const GoldClaims = resolve => require(['views/GoldClaims'], resolve);

//文章
const Article = resolve => require(['views/Article'], resolve);
const ArtDetail = resolve => require(['views/ArtDetail'], resolve);

// user
const Dashboard = resolve => require(['views/user/Dashboard'], resolve);
const Recovery = resolve => require(['views/user/Recovery'], resolve);
const AddAddress = resolve => require(['views/user/AddAddress'], resolve);
const SetAddress = resolve => require(['views/user/SetAddress'], resolve);
const SetCompanyName = resolve => require(['views/user/SetCompanyName'], resolve);
const SetEmail = resolve => require(['views/user/SetEmail'], resolve);
const SetTel = resolve => require(['views/user/SetTel'], resolve);
const Message = resolve => require(['views/user/Message'], resolve);
const Setting = resolve => require(['views/user/Setting'], resolve);
const InvoicePage = resolve => require(['views/user/InvoicePage'], resolve);

//hwb
// const Hwb = resolve => require(['views/hwb/Hwb'], resolve);
const HwbRisk = resolve => require(['views/hwb/HwbRisk'], resolve);
const HwbAgree = resolve => require(['views/hwb/HwbAgree'], resolve);
const HwbCreate = resolve => require(['views/hwb/HwbCreate'], resolve);
const HwbConfirm = resolve => require(['views/hwb/HwbConfirm'], resolve);
const HwbSuccess = resolve => require(['views/hwb/HwbSuccess'], resolve);
const HwbOrders = resolve => require(['views/hwb/HwbOrders'], resolve);

//phb
// const Phb = resolve => require(['views/phb/Phb'], resolve);
const PhbCreate = resolve => require(['views/phb/PhbCreate'], resolve);
const PhbConfirm = resolve => require(['views/phb/PhbConfirm'], resolve);
const PhbOrders = resolve => require(['views/phb/PhbOrders'], resolve);


//llb
// const Llb = resolve => require(['views/llb/Llb'], resolve);
const LlbAgree = resolve => require(['views/llb/LlbAgree'], resolve);
const LlbCreate = resolve => require(['views/llb/LlbCreate'], resolve);
const LlbConfirm = resolve => require(['views/llb/LlbConfirm'], resolve);
const LlbOrders = resolve => require(['views/llb/LlbOrders'], resolve);

// zcb
// const Zcb = resolve => require(['views/zcb/Zcb'], resolve);
const ZcbCreate = resolve => require(['views/zcb/zcbCreate/ZcbCreate'], resolve);
const ZcbConfirm = resolve => require(['views/zcb/ZcbConfirm'], resolve);
const ZcbSuccess = resolve => require(['views/zcb/ZcbSuccess'], resolve);
const ZcbAgree = resolve => require(['views/zcb/ZcbAgree'], resolve);
const ZcbOrders = resolve => require(['views/zcb/ZcbOrders'], resolve);

//zxb
const ZxbCreate = resolve => require(['views/zxb/ZxbCreate'], resolve);
const ZxbConfirm = resolve => require(['views/zxb/ZxbConfirm'], resolve);
const ZxbOrders = resolve => require(['views/zxb/ZxbOrders'], resolve);
const ZxbAgree = resolve => require(['views/zxb/ZxbAgree'], resolve);
const ZxbDescription = resolve => require(['views/zxb/ZxbDescription'], resolve);
const ZxbDeposit = resolve => require(['views/zxb/ZxbDeposit'], resolve);

// ygb
// const Ygb = resolve => require(['views/zcb/zcb'], resolve);
const YgbRisk = resolve => require(['views/ygb/YgbRisk'], resolve);
const YgbCreate = resolve => require(['views/ygb/YgbCreate'], resolve);
const YgbConfirm = resolve => require(['views/ygb/YgbConfirm'], resolve);
const YgbOrders = resolve => require(['views/ygb/YgbOrders'], resolve);
const YgbAdd = resolve => require(['views/ygb/YgbAdd'], resolve);
const YgbChange = resolve => require(['views/ygb/YgbChange'], resolve);
const YgbOrderDetails = resolve => require(['views/ygb/YgbOrderDetails'], resolve);
const YgbDetails = resolve => require(['views/ygb/YgbDetails'], resolve);
const YgbLookUp = resolve => require(['views/ygb/YgbLookUp'], resolve);

// spb
// const Spb = resolve => require(['views/spb/Spb'], resolve);
const SpbCreate = resolve => require(['views/spb/SpbCreate'], resolve);
const SpbConfirm = resolve => require(['views/spb/SpbConfirm'], resolve);
const SpbOrders = resolve => require(['views/spb/SpbOrders'], resolve);
const SpbOrderDetails = resolve => require(['views/spb/SpbOrderDetails'], resolve);

//hcb
const HcbCreate = resolve => require(['views/hcb/HcbCreate'], resolve);
const HcbConfirm = resolve => require(['views/hcb/HcbConfirm'], resolve);
const HcbOrders = resolve => require(['views/hcb/HcbOrders'], resolve);
const HcbOrderDetails = resolve => require(['views/hcb/HcbOrderDetails'], resolve);

//dchynb
const DchynbCreate = resolve => require(['views/dchynb/DchynbCreate'], resolve);
const DchynbConfirm = resolve => require(['views/dchynb/DchynbConfirm'], resolve);
const DchynbOrders = resolve => require(['views/dchynb/DchynbOrders'], resolve);
const DchynbOrderDetails = resolve => require(['views/dchynb/DchynbOrderDetails'], resolve);

//axjkx
const AxjkxCreate = resolve => require(['views/axjkx/AxjkxCreate'], resolve);
const AxjkxConfirm = resolve => require(['views/axjkx/AxjkxConfirm'], resolve);
const AxjkxDetail = resolve => require(['views/axjkx/AxjkxDetail'], resolve);
const AxjkxOrders = resolve => require(['views/axjkx/AxjkxOrders'], resolve);
const Comment = resolve => require(['views/axjkx/Comment'], resolve);
const UserComment = resolve => require(['views/axjkx/UserComment'], resolve);
const AxjkxPaySuccess = resolve => require(['views/axjkx/AxjkxPaySuccess'], resolve);
const AxjkxRisk = resolve => require(['views/axjkx/AxjkxRisk'], resolve);

//公用路由组件
const PolicyDown = resolve => require(['views/components/PolicyDown'], resolve);
const PolicyUp = resolve => require(['views/components/PolicyUp'], resolve);
const SetChannel = resolve => require(['views/components/SetChannel'], resolve);
const SetPayPassword = resolve => require(['views/components/SetPayPassword'], resolve);
const Wrapper = resolve => require(['views/components/Wrapper'], resolve);
Vue.use(Router);


const router =  new Router({
  routes: [
      { path: '/', redirect:'home' },
      { path: '/home', component: Home ,meta:{ level: 1 }},
      { path: '/login', component: Login, name: 'login',meta:{ level: 7 } },
      { path: '/smslogin', component: SMSLogin, name: 'smslogin' ,meta:{ level: 8 }},
      { path: '/GoldClaims', component: GoldClaims, name: 'GoldClaims',meta:{ level: 3 } },
      { path: '/register', component: Register, name: 'register',meta:{ level: 9 }},

      //文章
      { path: '/article', component: Article ,meta:{ level: 1 }},
      { path: '/artDetail', component: ArtDetail ,meta:{ level: 3 }},
      { path: '/artDetail/:artId', component: ArtDetail ,meta:{ level: 3 }},
      // user
      { path: '/dashboard', component: Dashboard, name: 'dashboard' ,meta:{ requiresAuth: true ,level: 1 }},
      { path: '/recovery', component: Recovery, name: 'recovery' ,meta:{ level: 7 }},
      { path: '/addAddress', component: AddAddress, name: 'addAddress' ,meta:{ requiresAuth: true ,level: 8 }},
      { path: '/setAddress', component: SetAddress, name: 'setAddress' ,meta:{ requiresAuth: true ,level: 7 }},
      { path: '/setCompanyName', component: SetCompanyName, name: 'setCompanyName' ,meta:{ requiresAuth: true ,level: 7 }},
      { path: '/setEmail', component: SetEmail, name: 'setEmail' ,meta:{ requiresAuth: true ,level: 7 }},
      { path: '/setTel', component: SetTel, name: 'setTel' ,meta:{ requiresAuth: true ,level: 7 }},
      { path: '/message', component: Message, name: 'message' ,meta:{ requiresAuth: true ,level: 6 }},
      { path: '/setting', component: Setting, name: 'setting' ,meta:{ requiresAuth: true ,level: 6 }},
      { path: '/invoicePage', component: InvoicePage, name: 'invoicePage' ,meta:{ requiresAuth: true ,level: 7 }},

      //zcb
      { path: '/zcb', component: Wrapper, name: 'zcb',meta:{ level: 2 } },
      { path: '/zcbAgree', component: ZcbAgree, name: 'zcbAgree' ,meta:{ requiresAuth: true , level: 5}},
      { path: '/zcbCreate', component: ZcbCreate, name: 'zcbCreate'  ,meta:{ requiresAuth: true , level: 4}},
      { path: '/zcbConfirm', component: ZcbConfirm, name: 'zcbConfirm'  ,meta:{ requiresAuth: true , level: 5}},
      { path: '/zcbSuccess', component: ZcbSuccess, name: 'zcbSuccess' },
      { path: '/zcbOrders', component: ZcbOrders, name: 'zcbOrders' ,meta:{ requiresAuth: true ,level: 2 }},
      //zxb
      { path: '/zxb', component: Wrapper, name: 'zxb',meta:{ level: 2 } },
      { path: '/zxbCreate', component: ZxbCreate, name: 'zxbCreate'  ,meta:{ requiresAuth: true , level: 4}},
      { path: '/zxbConfirm', component: ZxbConfirm, name: 'zxbConfirm'  ,meta:{ requiresAuth: true , level: 5}},
      { path: '/zxbOrders', component: ZxbOrders, name: 'zxbOrders' ,meta:{ requiresAuth: true ,level: 2 }},
      { path: '/zxbAgree', component: ZxbAgree, name: 'zxbAgree' ,meta:{ requiresAuth: true , level: 5}},
      { path: '/zxbDescription', component: ZxbDescription, name: 'zxbDescription' ,meta:{ requiresAuth: true , level: 5}},
      { path: '/zxbDeposit', component: ZxbDeposit, name: 'zxbDeposit' ,meta:{ requiresAuth: true , level: 6}},
      // ygb
      { path: '/ygb', component: Wrapper, name: 'ygb',meta:{ level: 2 } },
      { path: '/ygbRisk', component: YgbRisk, name: 'ygbRisk'},
      { path: '/ygbCreate', component: YgbCreate, name: 'ygbCreate' ,meta:{ requiresAuth: true ,level: 3 }},
      { path: '/ygbConfirm', component: YgbConfirm, name: 'ygbConfirm' ,meta:{ requiresAuth: true ,level: 4 }},
      { path: '/ygbOrders', component: YgbOrders, name: 'ygbOrders' ,meta:{ requiresAuth: true ,level: 2 }},
      { path: '/ygbAdd', component: YgbAdd, name: 'ygbAdd'  ,meta:{ requiresAuth: true ,level: 3 }},
      { path: '/ygbChange', component: YgbChange, name: 'ygbChange'  ,meta:{ requiresAuth: true ,level: 3 }},
      { path: '/ygbOrderDetails', component: YgbOrderDetails, name: 'ygbOrderDetails'  ,meta:{ requiresAuth: true ,level: 3 }},
      { path: '/ygbDetails', component: YgbDetails, name: 'ygbDetails'  ,meta:{ requiresAuth: true ,level: 3 }},
      { path: '/ygbLookUp', component: YgbLookUp, name: 'ygbLookUp',meta:{ level: 3 } },
      // hwb
      { path: '/hwb', component: Wrapper, name: 'hwb' ,meta:{ level: 2 }},
      { path: '/hwbRisk', component: HwbRisk, name: 'hwbRisk' },
      { path: '/hwbAgree', component: HwbAgree, name: 'hwbAgree'},
      { path: '/hwbCreate', component: HwbCreate, name: 'hwbCreate',meta:{ requiresAuth: true ,level: 3 } },
      { path: '/hwbConfirm', component: HwbConfirm, name: 'hwbConfirm' ,meta:{ requiresAuth: true ,level: 4 }},
      { path: '/hwbSuccess', component: HwbSuccess, name: 'hwbSuccess'},
      { path: '/hwbOrders', component: HwbOrders, name: 'hwbOrders' ,meta:{ requiresAuth: true ,level: 2 }},
      //phb
      { path: '/phb', component: Wrapper, name: 'phb' ,meta:{ level: 2 }},
      { path: '/phbCreate', component: PhbCreate, name: 'phbCreate' ,meta:{ level: 3 } },
      { path: '/phbConfirm', component: PhbConfirm, name: 'phbConfirm' ,meta:{ requiresAuth: true ,level: 4 } },
      { path: '/phbOrders', component: PhbOrders, name: 'phbOrders' ,meta:{ requiresAuth: true ,level: 2 } },
      //llb
      { path: '/llb', component: Wrapper, name: 'llb' ,meta:{ level: 2 }},
      { path: '/llbAgree', component: LlbAgree, name: 'llbAgree' },
      { path: '/llbCreate', component: LlbCreate, name: 'llbCreate',meta:{ requiresAuth: true ,level: 3 } },
      { path: '/llbConfirm', component: LlbConfirm, name: 'llbConfirm',meta:{ requiresAuth: true ,level: 4 } },
      { path: '/llbOrders', component: LlbOrders, name: 'llbOrders',meta:{ requiresAuth: true ,level: 2 } },
      // spb
      { path: '/spb', component: Wrapper, name: 'spb' ,meta:{ level: 2 } },
      { path: '/spbCreate', component: SpbCreate, name: 'spbCreate',meta:{ requiresAuth: true ,level: 3 }},
      { path: '/spbConfirm', component: SpbConfirm, name: 'spbConfirm',meta:{ requiresAuth: true ,level: 4 } },
      { path: '/spbOrders', component: SpbOrders, name: 'spbOrders' ,meta:{ requiresAuth: true ,level: 2 } },
      { path: '/spbOrderDetails', component: SpbOrderDetails, name: 'spbOrderDetails' ,meta:{ requiresAuth: true ,level: 3 }},

      //hcb
      { path: '/hcbCreate', component: HcbCreate, name: 'hcbCreate',meta:{ requiresAuth: true ,level: 3 }},
      { path: '/hcbConfirm', component: HcbConfirm, name: 'hcbConfirm',meta:{ requiresAuth: true ,level: 4 } },
      { path: '/hcbOrders', component: HcbOrders, name: 'hcbOrders' ,meta:{ requiresAuth: true ,level: 2 } },
      { path: '/hcbOrderDetails', component: HcbOrderDetails, name: 'hcbOrderDetails' ,meta:{ requiresAuth: true ,level: 3} },

      //dchynb
      { path: '/dchynbCreate', component: DchynbCreate, name: 'dchynbCreate',meta:{ requiresAuth: true ,level: 3 }},
      { path: '/dchynbConfirm', component: DchynbConfirm, name: 'dchynbConfirm',meta:{ requiresAuth: true ,level: 4 } },
      { path: '/dchynbOrders', component: DchynbOrders, name: 'dchynbOrders' ,meta:{ requiresAuth: true ,level: 2 } },
      { path: '/dchynbOrderDetails', component: DchynbOrderDetails, name: 'dchynbOrderDetails' ,meta:{ requiresAuth: true ,level: 3} },

      //axjkx
      { path: '/axjkx', component: Wrapper, name: 'axjkx' ,meta:{ level: 2 }},
      { path: '/axjkxRisk', component: AxjkxRisk, name: 'axjkxRisk' ,meta:{ level: 3 }},
      { path: '/axjkxCreate', component: AxjkxCreate, name: 'axjkxCreate' ,meta:{ level: 4 } },
      { path: '/axjkxConfirm', component: AxjkxConfirm, name: 'axjkxConfirm' ,meta:{ requiresAuth: true ,level: 5 } },
      { path: '/axjkxDetail', component: AxjkxDetail, name: 'axjkxDetail' ,meta:{ requiresAuth: true ,level: 5 } },
      { path: '/axjkxOrders', component: AxjkxOrders, name: 'axjkxOrders' ,meta:{ requiresAuth: true ,level: 2 } },
      { path: '/comment', component: Comment, name: 'comment' ,meta:{ requiresAuth: true ,level: 3 } },
      { path: '/userComment', component: UserComment, name: 'userComment' ,meta:{ level: 4 } },
      { path: '/axjkxPaySuccess', component: AxjkxPaySuccess, name: 'axjkxPaySuccess' ,meta:{ level: 5 } },

      //公用路由组件
      { path: '/policyDown', component: PolicyDown, name: 'policyDown',meta:{ requiresAuth: true ,level: 5} },
      { path: '/policyUp', component: PolicyUp, name: 'policyUp',meta:{ requiresAuth: true,level: 6 } },
      { path: '/setChannel', component: SetChannel, name: 'setChannel',meta:{ requiresAuth: true ,level: 8} },
      { path: '/setPayPassword', component: SetPayPassword, name: 'setPayPassword',meta:{ requiresAuth: true ,level: 8 } },

      //其他产品和分享页面
      { path: '/hcb', component: Wrapper, name: 'hcb',meta:{ level: 2 } },
      { path: '/dchynb', component: Wrapper, name: 'dchynb',meta:{ level: 2 } },
      { path: '/wnb', component: Wrapper, name: 'wnb',meta:{ level: 2 } },
      // { path: '/goldClaims', component: Wrapper, name: 'goldClaims',meta:{ level: 3 } },
    
  ]
})

router.beforeEach((to, from, next) => {
  let query = getStorage("locationQuery");
  //token验证功能,token过期则跳回登陆界面
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!getToken()) {
      if(query && query["alias"]){
        router.push(setLocationQuery("/login",{"alias":query["alias"]}));
      }else{
        router.push("/login");
      }
    }
  }

  if(query && query["alias"]){
      if(to.fullPath.indexOf("alias")===-1){
        router.push(setLocationQuery(to.fullPath,{"alias":query["alias"]}))
        // router.push(to.fullPath+`${to.fullPath.indexOf("?")!==-1?"&":"?"}alias=${query["alias"]}`)
      }
  }
  next();
});
export default router;



