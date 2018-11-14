import { wwwCheck } from "./common";
// api公用url
let jinruiIp="192.168.0.22:5007";
let jinruiToken="Authorization: Bearer 8233|s5To5XeUq5Wf3dP+Od11mbmLqTtPtRYA629/v5tia4BInnLLN4VbB+V8yM+sSsVRVK+AT32YqGuBYatlqO51KQ==";

let comStr="http://test.jubao56.com";
// let fileUrl = "http://test.jubao56.com/res/file/upload";
let redirectUrl="http://test.jubao56.com/m/#/";
if (wwwCheck()) {//包含www 或者是以jubao56.com开头字样均会调用www
  comStr="https://www.jubao56.com";
  redirectUrl = "http://www.jubao56.com/#/"; //太平支付的重定向地址
  // fileUrl="https://www.jubao56.com/res/file/upload"
}
export let cookieName = "jubao_user";  //项目在cookie中存token所对应的key;

export let htmlFontSize = ()=>{
  return document.documentElement.style.fontSize
};

export let apiUrl={
  cmnUrl:comStr,    //通用
  zcbUrl:comStr,
  spbUrl:comStr,
  phbUrl:comStr,
  ygbUrl:comStr,
  declareUrl:comStr,
  fileUrl:comStr + '/res/file/upload',
  redirectUrl:redirectUrl
};

export let initCompData={
  payPasswordShow:false,
  //由于本项目还没有此类信息，所以暂时留下原项目信息作为格式模板；当有了三条此类信息后，原项目信息需删除；
  loading:false, //控制loading页面是否显示,默认未显示.
  fullbgFlag:false,   //遮罩层
  zcbTermFlag:false,   //主要保险条件和费率
  zcbProtect:false,   //主要保障和汇率
  zcbProcess:false,    //整车保投保理赔流程
  zcbPopUpTip:false,  //主要不保提示
  zcbImportFlag:true, //导入表格功能前的蒙板
  zcbPopUpTipFlag:true,  //主要不保提示--只显示一次
  zcbPopBox:false,   //手动录入装车订单
  cpyNameFlag:false,  //初次设置公司名称
  registerTerms:false,//注册详情阅读弹框
  zcbPointFlag:false,    //主要保险条件提示
  zcbLimitFlag:false,     //主要保障范围提示
  zcbNoproFlag:false,     //主要不赔事项提示
  zcbGoodsFlag:false,     //主要不保货物提示
  zcbAgreeFlag:false,     //整车保协议
  ygbItemDetail:false,    //显示聚保“员工保”13项免费升级保障+专属保障页面
  ygbItemDetailT:false,       //控制 条款的显示      特惠版
  ygbItemDetailJ:false,       //控制 条款的显示      经济版
  ygbItemDetailB:false,       //控制 条款的显示      标准版
  ygbItemDetailZ:false,       //控制 条款的显示      尊享版
  ygbItemDetailK:false,    //空 暂时不知道是哪个条款显示
};

export let reg={
  plateNoReg:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1}$/,  //车牌号正则
  reg_phone : /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/,//手机号正则
  reg_TelPhone : /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,//座机号正则
  reg_pwd : /^(?=.*?[a-zA-Z])(?=.*?[0-9])[!"#$%&'()*+,\-./:;<=>?@@\[\\\]^_`{|}~A-Za-z0-9]{6,16}$/,//密码正则
  reg_email :  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,//邮箱正则
  identity:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, //15或18位身份证正则匹配
  reg_company: /^[\(\)（）\u4e00-\u9fa5]{1,64}$/, //公司正则
  reg_tax_no:/^[0-9a-zA-Z]{18}$/,//税务登记号正则
};

export let xlsxModel={
  xlsxTicketModel:"https://www.jubao56.com/static/货运清单模板-按票投保.xlsx",//货运清单模板-按票投保
  xlsxCarModel:"https://www.jubao56.com/static/货运清单模板-按车投保.xlsx",
  xlsxYGBModel:"https://www.jubao56.com/static/员工保信息模板.xls",
  xlsxYGBticker:"https://www.jubao56.com/static/增值税发票开票信息采集表.doc",       //员工保发票信息采集表
  modelXlsx:"https://www.jubao56.com/static/装车清单模板.xlsx",  //整车保装车清单模板地址=====net======
};


