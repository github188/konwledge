/**
 * 判断是手机端访问还是PC端访问
 * @returns {boolean}
 */
function isApp() {
    var flag = false; //设置初始值
    var userAgent = window.navigator.userAgent;//获取用户代理信息
    // "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"
    var app = ["Android", "iPhone", "iPad", "Windows Phone", "BB"]; //app的种类
    //判断app的种类 是否在userAgent中出现过
    for (var i = 0; i < app.length; i++) {
        var catg = app[i];
        if (userAgent.indexOf(catg) != -1) {
            flag = true;
            break
        }
    }
    return flag;
}

/**
 * 判断是安卓机还是IOS机
 * @returns {string}        'Android' / 'IOS' / 'Unknown'
 */
function getAppType() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return 'Android'
    } else if (isiOS) {
        return 'IOS'
    } else {
        return 'Unknown'
    }
}