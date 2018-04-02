/**
 * Created by gaofa on 2018/4/2.
 */
var clientHeight = document.documentElement.clientHeight;  //获取可视区域的高度
var backTop = document.querySelector(".back_top");
var timer = null;
var isTop = true;   //定义一个布尔值，用于判断是否到达顶部
var header = document.querySelector(".header");

//手动滚动事件----window.onscroll，或者是document.addEventListener('scroll',function (e) {})
window.onscroll =function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    backTop.style.display = scrollTop>=clientHeight?"block":"none";

    if(!isTop){ //判断当点击回到顶部按钮后滚动条在回滚过程中，若手动滚动滚动条，则清除定时器---即，只要发生scroll事件[手动滚动滚动条事件]，则清除计时器
        clearInterval(timer);
    }
    isTop = false;

    if(scrollTop>200){
        header.style.display="block";
        var length = scrollTop-200;
        var data = length/600;
        console.log(data,"data");
        if(0<=data<=1){
            header.style.opacity=data;
        }
    }else{
        header.style.display="none";
        header.style.opacity=0;
    }
};

function goTop() {
    timer = setInterval( function(){
        //获取滚动条的滚动高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //用于设置速度差，产生缓动的效果
        var speed = Math.floor(-scrollTop / 6);
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed;//用纯数字赋值
        isTop =true;  //用于阻止滚动事件清除定时器
        if(scrollTop == 0){
            clearInterval(timer);
        }
    },50 );
}