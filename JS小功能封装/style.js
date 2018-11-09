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