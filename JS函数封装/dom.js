/**
 * 获取元素的样式
 * @param el        元素
 * @param attr      需要获取的样式属性,如width，height，color
 * @returns {*}
 */
export const getStyle = (el, attr) => {
    if (window.getComputedStyle) {
        return window.getComputedStyle(el)[attr]
    } else {
        return el.currentStyle[attr]
    }
}

/**
 * 将body的高度设置屏幕高度，并设置属性：position:relative；
 */
function bodyRelative() {
    var body = document.querySelector("body");
    body.style.height= document.documentElement.clientHeight+"px";
    body.style.position='relative';
    window.onresize=function () {
        body.style.height= document.documentElement.clientHeight+"px"
    }
}