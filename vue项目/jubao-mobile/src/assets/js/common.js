/**
 * Created by pc-20170420 on 2017/9/29.
 */
import { MessageBox, Indicator } from 'mint-ui';
import {zcbOrderInfo, spbOrderInfo, ygbOrderInfo, dchybOrderInfo, cmnProductList, hynbOrderInfo} from "./api";

export let cookieName = "jubao_user";  //项目在cookie中存token所对应的key;
export let wwwCheck=()=>{
  if(location.hostname.indexOf("www") !== -1  || location.hostname.indexOf("jubao56.com")===0){
      return true  //为www环境为true
  }else{
    return false
  }
};

export let goPageHref=(page)=> {
    let location = window.location.href;
    let str= "";
    if(wwwCheck()){
        str="http://www.jubao56.com/m/"
    }else{
        str="http://test.jubao56.com/m/"
    }
    window.location.href=str+page
};
export let setCookie = (name,value,time)=>{
	let hours = time?time:4;  //单位小时
	let exp = new Date();
	exp.setTime(exp.getTime() + hours*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/";
};
export let getCookie= (name)=>{
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]) ;
    }else {
        return null ;
    }
};
export let delCookie= (name)=>{
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  document.cookie = name + "=" + cookieName + ";expires=" + exp.toGMTString() + ";path=/";
};

export const getZcbQuery = ()=>{
  let location = window.location.href;
  let beforeStr = location.substring(location.indexOf("?")+1);
  if(beforeStr.indexOf("?")!==-1){
    beforeStr=beforeStr.substring(beforeStr.indexOf("?")+1)
  }
  let locMsg = beforeStr.substring(beforeStr.indexOf("?") + 1).split("_");
  return {
    status:locMsg[0].split('=')[1],
    orderId:locMsg[1]
  }
};
/**
 * 最终效果：如果你期望的flag的值和case的值一样，返回结果就是true
 * @param listState 返回的订单状态码
 * @param passState 期望当listState为XXX时，返回true
 * @returns {boolean}
 */
export const listStateCheck = (listState,passState)=>{
  let flag=false;
  switch (listState*1){
    case 0 :MessageBox("提示","该订单处于未知状态");flag=passState===0;break;
    case 1 : flag=passState===1;break;//未支付时返回true
    case 2 :MessageBox("提示","该订单已取消");flag=passState===2;break;
    case 4 :MessageBox("提示","该订单已支付");flag=passState===4;break;
    case 8 :MessageBox("提示","该订单已过期");flag=passState===8;break;
    case 16 :MessageBox("提示","该订单处于理赔中");flag=passState===16;break;
    case 32 :MessageBox("提示","该订单已经理赔完成");flag=passState===32;break;
  }
  return flag;
};

export const redefinitionToFixed = ()=>{
  Number.prototype.toFixed = function (n) {
    if (n > 20 || n < 0) {
      throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    const number = this;
    if (isNaN(number) || number >= Math.pow(10, 21)) {
      return number.toString();
    }
    if (typeof (n) == 'undefined' || n == 0) {
      return (Math.round(number)).toString();
    }

    let result = number.toString();
    const arr = result.split('.');

    // 整数的情况
    if (arr.length < 2) {
      result += '.';
      for (let i = 0; i < n; i += 1) {
        result += '0';
      }
      return result;
    }

    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length == n) {
      return result;
    }
    if (decimal.length < n) {
      for (let i = 0; i < n - decimal.length; i += 1) {
        result += '0';
      }
      return result;
    }
    result = integer + '.' + decimal.substr(0, n);
    const last = decimal.substr(n, 1);

    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
      const x = Math.pow(10, n);
      result = (Math.round((parseFloat(result) * x)) + 1) / x;
      result = result.toFixed(n);
    }

    return result;
  };
};
export const bodyRelative = ()=> {
  let body = document.querySelector("body");
  body.style.height= document.documentElement.clientHeight+"px";
  body.style.position='relative';
  window.onresize=function () {
    body.style.height= document.documentElement.clientHeight+"px"
  }
}
/**
 * 解决ImgUrl作为background时，因为空格，"(" ，")" 等特殊字符而无法显示的bug
 * 传入：eg:"http://test.jubao56.com/res/2017/12/25/11/2518479/card KingClub(1).png"=
 */

export let bgUrlEscape = (url)=>{
  // let fileBefore = url.substring(0,url.lastIndexOf("/") + 1);
  // let fileName = url.substring(url.lastIndexOf("/") + 1);//eg:"http://test.jubao56.com/res/2017/12/25/11/2518479/cardKingClub.png"=>cardKingClub.png
  // let newFileName = fileName.replace(/\s/g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29")
  // reutrn fileBefore+newFileName
  return url.substring(0,url.lastIndexOf("/") + 1)+url.substring(url.lastIndexOf("/") + 1).replace(/\s/g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29")
};

/**实现小驼峰命名转化为下划线命名*/
export let toUnderline = (str)=>{
  return str.replace(/[A-Z]/g,val=>{
    return "_"+val.toLowerCase()
  })
};
/**实现下划线命名转化为小驼峰命名*/
export let toHump = (str)=>{
  return str.replace(/_[a-z]/g,val=>{
    return val.replace("_","").toUpperCase()
  })
};
/**
 * 产品类型转化
 字段值	说明
 1	整车保充值支付
 2	员工保加保支付
 4	员工保保单支付
 8	商铺保
 16	聚保业务申报-中储零担保货运险
 32	预约货运万能保充值支付
 */
export const nameToType=(name)=>{
  let type=null;
  switch (name){
    case "zcb" : type=1;break;
    case "ygbAdd" : type=2;break;
    case "ygbOrder" : type=4;break;
    case "spb" : type=8;break;
    case "ldb" : type=16;break;
    case "hyb" : type=32;break;
    case 'hwb' : case 'phb' : case 'llb' : type=64;break;
    case 'hcb' : case 'dchynb' : type=128; break;
  }
  return type;
};
export const nameToAjax = (name)=>{
  let type= {
    info: null
  };
  switch (name){
    case "zcb" : type.info = zcbOrderInfo;break;
    case "ygbAdd" : type.info = ygbOrderInfo;break;
    case "ygbOrder" : type.info = ygbOrderInfo;break;
    case "spb" : type.info = spbOrderInfo;break;
    case "hwb" : case "llb" : case "phb" : type.info = dchybOrderInfo;break;
    case "hcb" : case "dchynb" : type.info = hynbOrderInfo; break;
  }
  return type;
};

export const productData = {
  zcb: { "id": 2, "name": "整车保", "enname": 'zcb' },
  ygb: { "id": 4, "name": "员工保", "enname": 'ygb' },
  spb: { "id": 16, "name": "商铺档口火灾保", "enname": 'spb' },
  phb: { "id": 32, "name": "普货保", "enname": 'phb' },
  llb: { "id": 512, "name": "冷链保", "enname": 'llb'},
  hwb: { "id": 1024, "name": "大宗货物保", "enname": 'hwb' }

};

//对promise.all的结果进行err_code验证，并且报错
export const ToastError=(res)=> {
  let flag = true;
  for(let i=0;i<res.length;i++){
    if(res[i].err_code!==0){
      Toast({message: res[i].err_msg || "未知错误", position: 'bottom'});
      flag=false;break;
    }
  }
  return flag;
}
