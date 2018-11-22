// 手机端

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