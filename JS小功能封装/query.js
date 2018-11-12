/**
 * 处理地址栏（window.location）
 * 将地址栏携带的的参数转化为对象的形式
 * @param str   eg:"www.baidu.com?status=1&orderId=2"
 * @returns {{}}    eg:{status:1,orderId:2}
 */
function getStrQuery(str) {
    var msgArr = str.substring(str.indexOf("?")+1).split("&");
    var query = {};
    for(var i=0;i<msgArr.length;i++){
        var tempArr = msgArr[i].split("=");
        query[tempArr[0]]=tempArr[1]
    }
    return query
}
/**
 * 处理地址栏（window.location）
 * 将对象的键和值拼接到地址栏上
 * @param href  eg:"www.baidu.com?status=1&orderId=2"
 * @param data  {productType:"zcb"}
 * @returns {string|*}      www.baidu.com?productType=zcb /  www.baidu.com?status=1&productType=zcb   / www.baidu.com?status=1&orderId=2&productType=zcb
 */
function addStrQuery(str,data) {
    var str=str.indexOf("?")===-1?"?":"&";
    for(var k in data){
        str += k+"="+data[k]+"&"
    }
    href+= str.substring(0,str.length-1);
    return str
}