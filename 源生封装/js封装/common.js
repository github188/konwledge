//小方法 start------------------------------------------------------
/**(
 * 将 "39px" 转化为39 的形式
 * @param val
 * @param isPlus  时候取绝对值
 * @returns {number}
 */
function pxToNum(val,isPlus) {
    if(typeof val=="string"){
        if(!isPlus){
            return val.substring(0,val.lastIndexOf("px"))*1
        }else{
            return Math.abs(val.substring(0,val.lastIndexOf("px"))*1)
        }
    }
}

//将9变成09 的形式
function numToTwo(num) {
    if(typeof num == "number"){
        return num=num<10?("0"+num):num;
    }
}
/**
 * 将 秒 转化为01:19:28 这种形式
 * @param allTime
 * @returns {string}
 */
function changeTimeFormat(allTime) {
    var hours =numToTwo(Math.floor(allTime/(60*60)));   var hourOvermuch=allTime%(60*60); //时
    var minute = numToTwo(Math.floor(hourOvermuch/60));      var minuteOvermuch = hourOvermuch%60; //分
    var second = numToTwo(Math.floor(minuteOvermuch));
    // return hours+":"+minute+":"+second;
    return minute+":"+second;
}

//数组的自定义方法
function isArray(arg) {
    if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}

/**
 * 获取location上？后面以&和=形式传过来的参数；返回值为一个包含各类属性的对象
 * @returns {{}}
 */
function getQuery() {
    var msgArr = window.location.href.substring(window.location.href.indexOf("?")+1).split("&");
    var query = {};
    for(var i=0;i<msgArr.length;i++){
        var tempArr = msgArr[i].split("=");
        query[tempArr[0]]=tempArr[1]
    }
    return query
}