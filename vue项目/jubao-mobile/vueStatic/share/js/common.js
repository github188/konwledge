//====================start=============================================
var isArray =function(arg){
  if (typeof arg === 'object') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }else{
    console.log("%c "+ arg +" type is not Array","color:red;")
  }
  return false;
};
var isObject =function(arg){
  if(typeof arg === 'object'){
    return Object.prototype.toString.call(arg) === '[object Object]';
  }else{
    console.log("%c "+ arg +" type is not Object","color:red;")
  }
};
var handleLocation =function(location){
  var a = location.substring(location.indexOf("?")+1);
  if(a.indexOf("?")!==-1){
    a=handleLocation(a)
  }
  return  a
};
var getLocationQuery=function(location){
  var queryInfo = location.substring(location.lastIndexOf("?")+1);
  if(!queryInfo){return null;}
  var array = queryInfo.split("&");
  var query = {};
  array.forEach(function(val,idx){
    var a = val.split("=");
    query[a[0]]=a[1]
  });
  return query
};
var setStorage = function(L){
  if(!isObject(L)){return ;}
  if(!window.sessionStorage){return ;}
  for(var key in L){
    window.sessionStorage.setItem(key,JSON.stringify(L[key]));
  }
};
var getStorage = function(key){
  if(!window.sessionStorage){return ;}
  return JSON.parse(window.sessionStorage.getItem(key));
};
var saveLocationInfo=function(){
  var query = getLocationQuery(location.href); //获取?后面的信息
  if(!query){return}
  var oldQuery = getStorage("locationQuery") || {};
  for(var i in query){
    oldQuery[i]=query[i]
  }
  setStorage({ "locationQuery":oldQuery });
};
//===================end==============================================

function  getParamName(name) {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest[name]
}
function timeFormal(time) {
    //0001-01-01T00:00:00Z
    return time.substring(0,time.indexOf("T"))
}

//时间格式转换
function dateFtt(fmt,date)
{
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

//提示框
function Toast(tip,timeout) {
    timeout = timeout || 2000;
    var oBody = document.getElementsByTagName('body')[0];
    console.log(oBody)
    var oStyle = document.createElement('style');
    oStyle.innerHTML = '.toast{z-index:10000000000;font-size:14px;animation: toast 1s linear; -webkit-animation: toast 1s linear; max-width: 3rem;padding: .16rem .27rem;border-radius: .07rem;background: rgba(0,0,0,.7);color: #fff;position: fixed;text-align: center;top:300px;left: 50%;transform: translate3d(-50%,0,0); -webkit-transform: translate3d(-50%,-50%,0); }\n' +
        '        @keyframes toast { 0%{opacity: 0;} 50%{ opacity: .75; } 100%{ opacity: 1; }}\n' +
        '        @-webkit-keyframes toast { 0%{ opacity: 0;} 50%{ opacity: .75; }100%{ opacity: 1; }}'
    oBody.appendChild(oStyle);

    var oToast = document.createElement('p');
    oToast.className = 'toast';
    oToast.innerHTML = '<span>'+tip+'</span>';
    oBody.appendChild(oToast);
    setTimeout(function () {
        oToast.remove();
    },timeout)
}
//去除广告
// (function () {
//     window.addEventListener('load',function () {
//         var oBody = document.getElementsByTagName('body')[0];
//         var children = oBody.children;
//         var arr = [];
//         for(var i=0;i<children.length;i++){
//             if(children[i].className.indexOf('all')==-1){
//                 arr.push(children[i]);
//             }
//         }
//         arr.forEach(function (item) { item.remove() });
// //            var iframe = document.getElementsByTagName('iframe');
// //            var arr1 = [];
// //            for(var j=0;j<iframe.length;j++){
// //                arr1.push(iframe[j]);
// //            }
// //            arr1.forEach(function (item) { item.remove() });
//     })
// })();

window.onload = function () {
  var aImg = document.getElementsByTagName('img');
  for(var i=0;i<aImg.length;i++){
    (function (i) {
			aImg[i].addEventListener('click',function (e) {
				e.preventDefault();
			})
		})(i)
  }
}
