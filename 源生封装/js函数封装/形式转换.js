/*
1,获取location上？后面以&和=形式传过来的参数；返回一个带属性属性的对象{id:7,text:"g"}
2,
 */


/**
 * @param str   www.baidu.com?status=1&orderId=2
 * @returns {{}}    {status:1,orderId:2}
 */
function getQuery(str) {
    var msgArr = str.substring(str.indexOf("?")+1).split("&");
    var query = {};
    for(var i=0;i<msgArr.length;i++){
        var tempArr = msgArr[i].split("=");
        query[tempArr[0]]=tempArr[1]
    }
    return query
}

/**
 * @param href  www.baidu.com /  www.baidu.com?status=1  / www.baidu.com?status=1&orderId=2
 * @param data  {productType:"zcb"}
 * @returns {string|*}      www.baidu.com?productType=zcb /  www.baidu.com?status=1&productType=zcb   / www.baidu.com?status=1&orderId=2&productType=zcb
 */
function addHrefQuery(href,data) {
    var str=href.indexOf("?")===-1?"?":"&";
    for(var k in data){
        str += k+"="+data[k]+"&"
    }
    href+= str.substring(0,str.length-1);
    return href
}

//将30000 秒 转化为01:19:28 这种形式
function changeTimeFormat(allTime) {
    //将9变成09 的形式
    function numToTwo(num) {
        if(typeof num == "number"){
            return num=num<10?("0"+num):num;
        }
    }
    var hours =numToTwo(Math.floor(allTime/(60*60)));   var hourOvermuch=allTime%(60*60); //时
    var minute = numToTwo(Math.floor(hourOvermuch/60));      var minuteOvermuch = hourOvermuch%60; //分
    var second = numToTwo(Math.floor(minuteOvermuch));
    return hours+":"+minute+":"+second;
    // return minute+":"+second;
}