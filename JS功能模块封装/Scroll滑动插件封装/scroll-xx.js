/**
 *obj--滑动对象
 *offset--滑动距离（当滑动距离大于等于offset时将调用callback）
 *callback--滑动完成后的回调函数
 */

var downSlide = function (obj, offset, callback) {
    var start,
        end,
        isLock = false, //是否锁定整个操作
        isCanDo = false, //是否移动滑块
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        hasTouch = 'ontouchstart' in window && !isTouchPad;
    //将对象转换为jquery的对象
    obj = $(obj);
    //loading动画对象
    var oLoading = obj.find("img.rotate-loading");
    var objparent = $(window);
    /*操作方法*/
    var fn = {
        //移动容器
        translate: function (diff) {
            obj.css({
                "-webkit-transform": "translate3d(0," + diff + "px,0)",
                "-moz-transform": "translate3d(0," + diff + "px,0)",
                "transform": "translate3d(0," + diff + "px,0)"
            });
        },
        //设置效果时间
        setTranslition: function (time) {
            obj.css({
                "-webkit-transition": "all " + time + "s",
                "-moz-transition": "all " + time + "s",
                "transition": "all " + time + "s"
            });
        },
        //返回到初始位置
        back: function () {
            fn.translate(0 - offset);
            //标识操作完成
            isLock = false;
            //移除遮罩
            $("#fresh_mask").remove();
            oLoading.removeClass("icon-loading");
        }
    };
    //滑动开始
    obj.bind("touchstart", function (e) {
        if (objparent.scrollTop() <= 0 && !isLock) {
            var even = typeof event == "undefined" ? e : event;
            //标识操作进行中
            isLock = true;
            isCanDo = true;
            //保存当前鼠标Y坐标
            start = hasTouch ? even.touches[0].pageY : even.pageY;
            //消除滑块动画时间
            fn.setTranslition(0);
        }
    });
    //滑动中
    obj.bind("touchmove", function (e) {
        if (objparent.scrollTop() <= 0 && isCanDo) {
            var even = typeof event == "undefined" ? e : event;
            //保存当前鼠标Y坐标
            end = hasTouch ? even.touches[0].pageY : even.pageY;
            if (start < end) {
                even.preventDefault();
                //消除滑块动画时间
                fn.setTranslition(0);
                //移除loading动画
                oLoading.removeClass("icon-loading");
                //移动滑块
                fn.translate((end - start - offset)/3);
            }
        }
    });
    //滑动结束
    obj.bind("touchend", function (e) {
        if (isCanDo) {
            end = e.originalEvent.changedTouches[0].pageY;
            isCanDo = false;
            //判断滑动距离是否大于等于指定值
            if (end - start >= offset) {
                //显示loading动画
                oLoading.addClass("icon-loading");
                //设置滑块回弹时间
                fn.setTranslition(0.5);
                //保留提示部分
                fn.translate(0);
                //显示透明遮罩禁止点击
                $('body').append('<div id="fresh_mask" style="position: fixed;z-index: 999;width: 100%;height: 100%;top: 0;left: 0;"></div>');
                //执行回调函数
                if (typeof callback == "function") {
                    callback.call(fn, e);
                }
            } else {
                //返回初始状态
                fn.back();
            }
        }
    });
};
// 调用方法如下:
//$(function() {
//    downSlide("#container", 50, function(e) {
//        var that = this;
//        setTimeout(function() {
//            that.back.call();
//        }, 2000);
//    });
//});