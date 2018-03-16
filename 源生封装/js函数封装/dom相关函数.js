/*
1,获取元素的属性
2,阻止浏览器的默认事件
3,video 全屏
4,video 退出全屏
 */
function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}
//获取元素的样式
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
//video 退出全屏
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