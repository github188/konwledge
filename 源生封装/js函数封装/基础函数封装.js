//基础函数封装================================================================================================
function getElement(val,parent) {
    var el=null;
    parent = parent || document;
    if(val.indexOf("#")!==-1){
        el = parent.getElementById(val.substring(val.indexOf("#")+1));
    }else if(val.indexOf(".")!==-1){
        el = parent.getElementsByClassName(val.substring(val.indexOf(".")+1))[0];
    }else{
        el = parent.getElementsByTagName(val)[0]
    }
    return el;
}

//将字符串?id=7&text=g，转化为{id:7,text:"g"}
function getQuery(str) {
    var msgArr = str.substring(str.indexOf("?")+1).split("&");
    var query = {};
    for(var i=0;i<msgArr.length;i++){
        var tempArr = msgArr[i].split("=");
        query[tempArr[0]]=tempArr[1]
    }
    return query
}



//函数二次封装 ================================================================================================
function removeChild(parent,child) {
    parent = getElement(parent);
    child = child?getElement(child,parent) : null;
    child?parent.removeChild(child):parent.parentNode.removeChild(parent)
}
function getScriptBySrc(src) {//默认获取最后一个script标签的src所附带的信息，
    var scriptBox = document.getElementsByTagName("script");
    if(!src){return getQuery(scriptBox[scriptBox.length-1].src)}
    for(var i=0;i<scriptBox.length;i++){
        if(scriptBox[i].src.indexOf(src)!==-1){
            return getQuery(scriptBox[i].src);
        }
    }
}