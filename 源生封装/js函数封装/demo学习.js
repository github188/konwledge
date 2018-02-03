
//给对象自定义方法
/**
 * 设立事件监听
 */
Object.prototype.addListener=function (type, fn, boolean) {
    //boolean=boolean?boolean:"false";
    boolean=boolean || false;
    if (typeof window.addEventListener != "undefined") {
        videoStart.addEventListener(type,fn,boolean)
    }else{
        videoStart.attachEvent(type,fn)
    }
};
Array.prototype.remove = function(element){

    for (var i = 0,j=0; i < this.length; i++) {
        if(this[i]!=element){
            this[j++]=this[i];
        }
    }
    this.length-=1
}
//删除元素下标
Array.prototype.removeIndex=function(dx)
{
    if(isNaN(dx)||dx>this.length)
    {
        alert("删除对象下标越界");
        return false;
    }
    for(var k=0,n=0;k<this.length;k++)
    {
        if(this[k]!=this[dx])
        {
            this[n++]=this[k];
        }
    }
    this.length-=1
}

var arr =["Iphone","MI","SAMSUNG","VIVO","OPPO","HUAWEI","ZTE","SONY","Coolpad","GiONEE","MEIZU","nubia","Letv","TCL"];
arr.push("NOKIA");
arr.remove("Iphone");
arr.removeIndex(1);
alert(arr.join(","));