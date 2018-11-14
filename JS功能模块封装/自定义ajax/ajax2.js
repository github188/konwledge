function ajax(object) {
    var props = {
        type: 'GET',
        url: '',
        token: true,
        data:{},
        success: function () {},
        fail: function () {}
    }
    // props = Object.assign(props,object)
    for(var k in object){
        props[k] = object[k];
    }
    var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if(props.type.toUpperCase() == 'GET'){
        var queryString = '?'
        for(var k in props.data){
            queryString += k+'='+props.data[k]+'&'
        }
        props.url+= queryString.substring(0,queryString.length-1);
        xhr.open(props.type,props.url,true);
        if(props.token)xhr.setRequestHeader("Authorization", 'Bearer ' + getToken());
        xhr.send();
    }else if(props.type.toUpperCase() == 'POST'){
        var formData = new FormData();
        for(var k in props.data){
            formData.append(k, props.data[k]);
        }
        xhr.open(props.type,props.url,true);
			  if(props.token)xhr.setRequestHeader("Authorization", 'Bearer ' + getToken());
        xhr.send(formData);
    }
    xhr.onreadystatechange = function (){
        if(xhr.readyState==4) {
            if(xhr.status==200){
							props.success(JSON.parse(xhr.responseText));
            }else {
							props.fail(xhr.status)
						}
        }
    };
}
// api公用url
var isWWW = false;
var cmnUrl = "http://test.jubao56.com"; //通用
var zcbUrl = "http://test.jubao56.com"; //整车保
var spbUrl = "http://test.jubao56.com"; //商铺保
var phbUrl = "http://test.jubao56.com"; //普货保
var ygbUrl = "http://test.jubao56.com"; //员工保
var dchybUrl = "http://test.jubao56.com"; //员工保
var declareUrl = "http://test.jubao56.com"; //申报业务
var fileUrl = "http://test.jubao56.com"; //文件上传地址
var redirectUrl = "http://test.jubao56.com/pc"; //太平支付的重定向地址
var backUrl = "http://test.jubao56.com/m/#";
var pageUrl = "http://test.jubao56.com"
if (location.hostname.indexOf("www") != -1  || location.hostname.indexOf("jubao56.com")==0) {
    isWWW = true;
    cmnUrl = "https://www.jubao56.com"; //通用
    zcbUrl = "https://www.jubao56.com"; //整车保
    spbUrl = "https://www.jubao56.com"; //商铺保
    phbUrl = "https://www.jubao56.com"; //普货保
    ygbUrl = "https://www.jubao56.com"; //员工保
    dchybUrl = "https://www.jubao56.com"; //员工保
    declareUrl = "https://www.jubao56.com"; //申报业务
    fileUrl = "https://www.jubao56.com"; //文件上传地址
    redirectUrl = "http://www.jubao56.com/#/"; //太平支付的重定向地址
    backUrl = "http://www.jubao56.com/m/#";
    pageUrl = "http://www.jubao56.com"
}
function getToken() {
    var token = null;
    var name = "jubao_user";
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
        token = unescape(arr[2]);
    }
    return token;
}

function promise(url, params,success,fail) {
    if (!fail)fail=function () {};
    return Ajax({
        method: "GET",
        url: url,
        // headers: { 'Authorization': 'Bearer ' + getToken() },
        data:params,
        success:function (resp){
            console.log('Bearer ' + getToken());
            success(resp);
        },
        fail:function (res) {
            fail(res)
            console.log(res)
        }
    });
}
