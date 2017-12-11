//兼容性js  start----------------------------------------------
/**
 * 获取元素的属性
 * @param el
 * @param attr
 * @returns {*}
 */
function getStyle(el,attr) {
    if(window.getComputedStyle){
        return window.getComputedStyle(el)[attr]
    }else{
        return el.currentStyle[attr];
    }
}
//阻止浏览器的默认事件
function defaultEvent(e) {
    e.preventDefault()
}
//video 全屏 el -- document.documentElement;
function makeVideoFull(el) {
    var docElm = el;
    //W3C
    if(docElm.requestFullscreen){
        docElm.requestFullscreen();
    }//FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }//Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }//IE11
    else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
}
//退出全屏
function exitVideoFull() {
    //退出全屏
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
//兼容性js  end-------------------------------------------------


/**
 * 快速阻止事件冒泡
 * @param elArr  这里是多个元素所组成的数组集合
 */
function preventBubble(elArr) {
    if(isArray(elArr)){
        for(var i=0;i<elArr.length;i++){
            elArr[i].onclick=function (e) {
                window.event? window.event.cancelBubble = true : e.stopPropagation();
            }
        }
    }
}
//小方法 end------------------------------------------------------


//给对象自定义方法
/**
 * 设立事件监听
 * @param type
 * @param fn
 * @param boolean
 */
Object.prototype.addListener=function (type, fn, boolean) {
    boolean=boolean?boolean:"false";
    if (typeof window.addEventListener != "undefined") {
        videoStart.addEventListener(type,fn,boolean)
    }else{
        videoStart.attachEvent(type,fn)
    }
};



//二级封装 start------------------------------------------------------------

//二级封装 end--------------------------------------------------------------