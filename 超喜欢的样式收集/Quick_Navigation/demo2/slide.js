/**
 * Created by gaofa on 2018/4/1.
 */
$(".slide_box_li").mouseover(function () {
    $(this).find(".detail_box").stop().animate({left:-156})
})
$(".slide_box_li").mouseout(function () {
    $(this).find(".detail_box").stop().animate({left:-0})
})
function backtop() {
    $("html,body").animate({scrollTop:0}, 500);
}