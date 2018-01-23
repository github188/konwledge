var domUtil = {
    // 获取DOM元素
    get: function(query) {
        var _this = this;
        if(document.querySelector) {
            return document.querySelector(query);
        } else {
            var elements = document;
            var queryStrArray = query.split(/ +/);
            for(var i = 0; i < queryStrArray.length; i++) {
                var domName = queryStrArray[i];
                elements = _this.getElementsOfParentNode(domName, elements);
            }
            if(elements.length == 1) {
                return elements[0];
            } else {
                return elements;
            }
        }
    },
    // 获取DOM元素
    getElementsOfParentNode: function(domName, parentNode) {
        var _this = this;
        parentNode = parentNode || document;
        domName = domName.trim();
        var regExps = {
            id: /^#/,
            class: /^/
        };
        if(regExps.id.test(domName)) {
            domName = domName.replace(/^\#/g, "");
            return parentNode.getElementById(domName);
        } else if(regExps.class.test(domName)) {
            domName = domName.replace(/^./g, "");
            return _this.getElementsByClassName(domName, parentNode);
        } else {
            return parentNode.getElementsByTagName(domName);
        }
    },
    // 获取class元素的兼容方法
    getElementsByClassName: function(className, parentNode) {
        if(parentNode.getElementsByClassName){
            return parentNode.getElementsByClassName(className);
        } else {
            className = className.replace(/^ +| +$/g,"");
            var classArray = className.split(/ +/);
            var eles = parentNode.getElementsByTagName("*");
            for(var i = 0;i < classArray.length; i++){
                var classEles = [];
                var reg = new RegExp("(^| )" + classArray[i] + "( |$)");
                for(var j = 0;j < eles.length; j++){
                    var ele = eles[j];
                    if(reg.test(ele.className)){
                        classEles.push(ele);
                    }
                }
                eles = classEles;
            }
            return eles;
        }
    }
};
/*
 * 数字动画（目前仅支持数字动画的线性变化）
 * options参数：
 *  element {String} DOM元素query字符串
 *  from {Number} 起始数字
 *  to {Number} 终点数字
 *  duration {Number} 动画时间
 *  callback {Function} 数字变化时的回调函数
 */
var animatingNumber = function(options) {
    this.element = domUtil.get(options.element);
    this.startNum = options.from;
    this.endNum = options.to;
    this.duration = options.duration || 2000;
    this.callback = options.callback;

    this.timer = null;
};

animatingNumber.prototype = {
    start: function() {
        var _this = this;
        _this.animate();
    },
    stop: function() {
        if(this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    },
    animate: function() {
        var _this = this;
        var curNum = _this.startNum;
        var animateTime = 0;
        var range = _this.endNum - _this.startNum;
        var timerStep = Math.abs( Math.floor(_this.duration / range) );
        timerStep = timerStep > 20 ? timerStep : 20;
        var numStep = (range / _this.duration) * timerStep;

        _this.stop();

        (function animate() {
            _this.timer = setTimeout(function() {
                curNum = Math.ceil( curNum + numStep );
                if( (_this.endNum > _this.startNum && curNum >= _this.endNum) || (_this.endNum < _this.startNum && curNum <= _this.endNum) ) {
                    curNum = _this.endNum;
                }
                _this.element.innerText = curNum;
                animateTime++;
                if(typeof this.callback == 'function') {
                    this.callback(curNum);
                }
                animate();
                if(curNum >= _this.endNum) {
                    _this.stop();
                }
            }, timerStep);
        })();
    }
};

animatingNumber.create = function(options) {
    return new animatingNumber(options);
};