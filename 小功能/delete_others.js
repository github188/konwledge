
//去除ifame标签的影响---残留在本页面内的广告
var html = document.documentElement.innerHTML;
if(window.parent.document.getElementsByTagName("iframe").length>0){window.parent.document.documentElement.innerHTML=html;}

var jubaoAll = document.getElementById("jubao_all");
var parentList = jubaoAll.parentNode.children;

//删除div形式植入的广告----残留
var k = 0 ; //审查parent下的第k元素
var parentLenght = parentList.length;
for(var i=0;i<parentLenght;i++){
    console.log("记录for循环执行了几次");
    if(parentList[k]!==jubaoAll){  //每次removeChild的时候第二位元素都会变成第一位元素
        jubaoAll.parentNode.removeChild(parentList[k])
    }else{
        k++;
    }
}

//删除script标签形式植入的广告
var allScript = document.getElementsByTagName("script");
var jubaoScript=document.getElementsByClassName("jubao56_script");
for(var i=0;i<allScript.length;i++){
    if(allScript[0]!==jubaoScript){
        allScript[0].parentNode.removeChild(allScript[0])
    }
}

