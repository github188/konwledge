/**
 * 1，批量阻止各个元素上的事件冒泡
 * 2，将body的高度设置屏幕高度，自带属性：position:relative；
 *
 */


//批量阻止各个元素上的事件冒泡
function preventBubble(elArr) {
    if(isArray(elArr)){
        for(var i=0;i<elArr.length;i++){
            elArr[i].onclick=function (e) {
                window.event? window.event.cancelBubble = true : e.stopPropagation();
            }
        }
    }
}
//将body的高度设置屏幕高度，自带属性：position:relative；
function bodyRelative() {
    var body = document.querySelector("body");
    body.style.height= document.documentElement.clientHeight+"px";
    body.style.position='relative';
    window.onresize=function () {
        body.style.height= document.documentElement.clientHeight+"px"
    }
}
