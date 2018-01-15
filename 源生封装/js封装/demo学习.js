
//给对象自定义方法
/**
 * 设立事件监听
 */
Object.prototype.addListener=function (type, fn, boolean) {
    //boolean=boolean?boolean:"false";
    boolean=boolean || false;
    if (typeof window.addEventListener != "undefined") {
        videoStart.addEventListener(type,fn,boolean)
    }else{
        videoStart.attachEvent(type,fn)
    }
};