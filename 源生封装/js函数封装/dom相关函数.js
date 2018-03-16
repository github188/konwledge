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

//".box .it #china"
function getElement(str) {
    var parent=document;
    var arr = str.split(" ");
    arr.forEach(function (val, idx) {
        parent=getParentChild(parent,val);
    });
    return parent
}

//只能输入一个不带空格的字符串 .it
function getParentChild(parent,str) {
    if(str.indexOf("#")!==-1){
        return document.getElementById(str.substring(str.indexOf("#")+1))
    }else if(str.indexOf(".")!==-1){
        return parent.getElementsByClassName(str.substring(str.indexOf(".")+1))[0]
    }else{
        return parent.getElementsByTagName(str)[0]
    }
}
//".box #span .it #china"
function getArr(str) {
    var arr = str.split(" ");
    var index=0;
    arr.forEach(function (val, idx) {
        if(val.indexOf("#")!==-1){
            parent=getParentChild(parent,val);
            index=idx;
        }
    });
    return arr.slice(index);
}