// api公用url
var cmnUrl = "http://test.jubao56.com"; //通用
var zcbUrl = "http://test.jubao56.com"; //整车保
var spbUrl = "http://test.jubao56.com"; //商铺保
var phbUrl = "http://test.jubao56.com"; //普货保
var ygbUrl = "http://test.jubao56.com"; //员工保
var dchybUrl = "http://test.jubao56.com"; //员工保
var declareUrl = "http://test.jubao56.com"; //申报业务
var fileUrl = "http://test.jubao56.com"; //文件上传地址
var redirectUrl = "http://test.jubao56.com/pc"; //太平支付的重定向地址
var backUrl = "http://test.jubao56.com/v3m/#"
if (location.hostname.indexOf("www") != -1  || location.hostname.indexOf("jubao56.com")==0) {
    cmnUrl = "https://www.jubao56.com"; //通用
    zcbUrl = "https://www.jubao56.com"; //整车保
    spbUrl = "https://www.jubao56.com"; //商铺保
    phbUrl = "https://www.jubao56.com"; //普货保
    ygbUrl = "https://www.jubao56.com"; //员工保
    dchybUrl = "https://www.jubao56.com"; //员工保
    declareUrl = "https://www.jubao56.com"; //申报业务
    fileUrl = "https://www.jubao56.com"; //文件上传地址
    redirectUrl = "http://www.jubao56.com/#/"; //太平支付的重定向地址
    backUrl = "http://www.jubao56.com/v3m/#"
}
