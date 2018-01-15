/**
 * 批量阻止各个元素上的事件冒泡
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