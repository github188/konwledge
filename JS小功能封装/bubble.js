/**
 * 批量阻止各个元素上的事件冒泡
 * @param elArr  dom元素组形成的数组  [el1, el2, el3]
 */
function preventBubble(elArr) {
    if(Array.isArray(elArr)){
        for(var i=0;i<elArr.length;i++){
            elArr[i].onclick=function (e) {
                window.event? window.event.cancelBubble = true : e.stopPropagation();
            }
        }
    } else {
        console.log("参数错误",elArr)
    }
}