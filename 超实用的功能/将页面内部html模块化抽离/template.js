document.getElementsByClassName(getScriptBySrc().className)[0].innerHTML="<div class=\"templateBox\">模板内容\n" +
    "    </div>";


//将字符串?id=7&text=g，转化为{id:7,text:"g"}
function getQuery(str) {
    if(str.indexOf("?")===-1)return {};
    var msgArr = str.substring(str.indexOf("?")+1).split("&");
    var query = {};
    for(var i=0;i<msgArr.length;i++){
        var tempArr = msgArr[i].split("=");
        query[tempArr[0]]=tempArr[1]
    }
    return query
}

function getScriptBySrc(src) {
    var scriptBox = document.getElementsByTagName("script");
    if(!src){return getQuery(scriptBox[scriptBox.length-1].src)}
    for(var i=0;i<scriptBox.length;i++){
        if(scriptBox[i].src.indexOf(src)!==-1){
            return getQuery(scriptBox[i].src);
        }
    }
}

