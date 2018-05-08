BCConfig = {
	"appId": "beacfdf5-badd-4a11-9b23-9ef3801732d1",
	"channels": ["ali", "jd", "bcwxmp", "bcaliqr", "bcwx"],
	"version": "v4",
	"uiVersion": "ui4",
	"urls": ["api.beecloud.cn"],
	"coupons": []
};
! function() {
	"use strict";

	function a(a) {
		var b = T[U]("style");
		if (b.type = "text/css", b.styleSheet) b.styleSheet.cssText = a;
		else {
			var c = T[Y](a);
			b[V](c)
		}
		var d = T[X]("head");
		d.length ? d[0][V](b) : T[U][V](b)
	}

	function b(a, b, c) {
		for (var d in b)
			if (b.hasOwnProperty(d)) {
				if (a.hasOwnProperty(d)) continue;
				1 == c && b[d] instanceof Object ? (a[d] = {}, bcExtend(a[d], b[d], !0)) : a[d] = b[d]
			}
		return a
	}

	function c(a, b, c, d) {
		b.instant_channel || i();
		var e = "r" + Z++,
			f = G.cbs,
			g = T[U]("SCRIPT"),
			h = "http://payservice.beecloud.cn/spay/result.php",
			j = a + "?para=";
		b.appId = BCConfig.appId, b.return_url || (b.return_url = h), M = b.return_url, J && (b.type = "wap"), b.callback = "BC.cbs." + e + ".f", j += "{";
		for (var k in b){
			if (b.hasOwnProperty(k) && "function" != typeof b[k]){
				if ("optional" == k) {
					j += '"' + k + '":{';
					for (var l in b[k]) b[k].hasOwnProperty(l) && (j += '"' + l + '":"' + b[k][l] + '",');
					j = j.substr(0, j.length - 1), j += "},"
				} else if ("analysis" == k) {
					j += '"' + k + '":{';
					for (var l in b[k]) b[k].hasOwnProperty(l) && (j += '"' + l + '":"' + b[k][l] + '",');
					j = j.substr(0, j.length - 1), j += "},"
				} else {
					console.log('3')
					j += '"' + k + '":"' + b[k] + '",';
				}
			}
		}
		console.log('j',j)
				
		if (j = j.substr(0, j.length - 1), j += "}", g.src = encodeURI(j), f[e] = {
				el: g,
				f: function(a) {
					T[X]("head")[0][W](g), 1 == H.debug && alert("获取到支付参数:" + JSON.stringify(a)), c(a, d)
				}
			}, T[X]("head")[0][V](g)){
//			}, T[X]("head")[0][V](g), !H.instant_channel){
				console.log('aa')
				return
				for (var k = 0; k < P.length; k++) P[k].objectid == H.coupon_id && (P.splice(k, 1), H.coupon_id = "")
		}
			
	}

	function d(a, b) {
		if (0 == a.resultCode) {
			if (!K || "ali" != b && "bcali" != b || 0 == H.need_ali_guide) {
				var c = T[U]("form");
				c.id = "beecloud-pay-form", c.name = "beecloud-pay-form", T.body[V](c);
				for (var d in a.param)
					if (a.param.hasOwnProperty(d)) {
						var f = T[U]("input");
						f.type = "hidden", f.name = d, f.value = a.param[d], c[V](f)
					}
				c.method = a.method, c.action = a.url, ("bd" == b || "yee" == b) && (c.acceptCharset = "GBK"), c.submit()
			} else e(a);
			H.instant_channel || L.loading && L.loading.parentNode && L.loading.parentNode[W](L.loading)
		}
	}

	function e(a) {
		var b = a.url,
			c = window.location.href,
			d = "";
		for (var e in a.param) "sign" == e ? d = encodeURIComponent(a.param[e]) : b += e + "=" + a.param[e] + "&";
		window.location.href = "http://wxactivity.beecloud.cn/activity/view/beecloud_isali2.php?url=" + encodeURIComponent(b) + "&returnurl=" + encodeURIComponent(c) + "&cb=" + encodeURIComponent(M) + "&oid=" + a.id + "&appid=" + BCConfig.appId + "&sign=" + d
	}

	function f(a, b, c, d) {
		var e = '{"app_id":"' + c + '","callback":"' + d + '"}',
			f = "https://" + a + "/2/rest/bill_public/" + b + "?para=" + encodeURI(e),
			g = T[U]("SCRIPT");
		g.src = f, T[X]("head")[0][V](g)
	}

	function g(a) {
		WeixinJSBridge.invoke("getBrandWCPayRequest", a, function(a) {
			L.loading && L.loading.parentNode && L.loading.parentNode[W](L.loading), L.background.parentNode[W](L.background), L.wrap.parentNode[W](L.wrap), WeixinJSBridge.log(a.err_msg), 1 == H.debug && alert("微信JSAPI返回:" + JSON.stringify(a)), "function" == typeof I.jsApiHandler && H.jsApiHandler(a), "function" == typeof I.wxJsapiFinish && I.wxJsapiFinish(a), "get_brand_wcpay_request:ok" == a.err_msg ? "function" == typeof I.wxJsapiSuccess && I.wxJsapiSuccess(a) : "function" == typeof I.wxJsapiFail && I.wxJsapiFail(a)
		})
	}

	function h(a) {
		var b = function() {
			g(a)
		};
		"undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", b, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", b), document.attachEvent("onWeixinJSBridgeReady", b)) : b()
	}

	function i() {
		L.loading = s("bc-pay-loading-wrap"), L.loading.innerHTML = '<div class="bc-pay-loading-box"><div alt="" class="bc-pay-loading"></div></div>', L.wrap[V](L.loading)
	}

	function j(a, b) {
		var c = "";
		return "wxmp" == b ? c = "WX_NATIVE" : "bcwxmp" == b ? c = "BC_NATIVE" : "wx" == b ? c = "WX_JSAPI" : "bcwx" == b ? c = "BC_WX_JSAPI" : "un" == b ? c = "UN_WEB" : "unwap" == b ? c = "UN_WAP" : "bckj" == b ? c = "BC_EXPRESS" : "wxwap" == b ? c = "WX_WAP" : "bcwxwap" == b ? c = "BC_WX_WAP" : "bcaliqr" == b ? c = "BC_ALI_QRCODE" : ("bcali" == b && (b = "bc_ali"), c = b.toUpperCase() + (J ? "_WAP" : "_WEB")), "https://" + a + "/2/rest/jsbutton/" + c
	}

	function k(a, b) {
		return !!a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
	}

	function l(a, b) {
		k(a, b) || (a.className += " " + b)
	}

	function m(a, b) {
		k(a, b) && (a.className = a.className.replace(new RegExp("(\\s|^)" + b + "(\\s|$)"), " "))
	}

	function n(a) {
		var b = T[U]("p");
		return a && (b.className = a), b
	}

	function o(a) {
		var b = T[U]("i");
		return a && (b.className = a), b
	}

	function p(a) {
		var b = T[U]("h3");
		return a && (b.className = a), b
	}

	function q(a) {
		var b = T[U]("li");
		return a && (b.className = a), b
	}

	function r(a) {
		var b = T[U]("ul");
		return a && (b.className = a), b
	}

	function s(a) {
		var b = T[U]("div");
		return a && (b.className = a), b
	}

	function t(a) {
		var b = "",
			c = "",
			d = function() {
				m(L[a], "bc-pay-bounceInRight"), null != N && (clearInterval(N), L.couponTop.coupon && L.couponTop.coupon.parentNode && C(L.couponTop.coupon, 0))
			},
			e = p("bc-pay-top-title");
		switch (a) {
			case "channel":
				b = "支付", c = "bc-pay-close-btn", d = function() {
					L.background.parentNode[W](L.background), L.wrap.parentNode[W](L.wrap)
				};
				break;
			case "coupon":
				b = "优惠券列表", c = "bc-pay-back-btn";
				break;
			case "qrcode":
				b = Q + "扫码付款", c = "bc-pay-back-btn", H.instant_channel && (c = "bc-pay-close-btn", d = function() {
					L.background.parentNode[W](L.background), L.wrap.parentNode[W](L.wrap)
				})
		}
		e.innerHTML = b;
		var f = o(c);
		return f.onclick = d, e[V](f), e
	}

	function u(a, b) {
		var c = "",
			d = "",
			e = null;
		return "channel" == a ? (c = "bc-pay-choose-area", e = function() {
			L.coupon && L.coupon.parentNode && L.coupon.parentNode[W](L.coupon), L.wrap[V](F("coupon")), setTimeout(function() {
				l(L.coupon, "bc-pay-bounceInRight")
			}, 100)
		}, d = '优惠券<span class="bc-pay-right-text bc-pay-color-gray">请选择优惠券</span>', b && (d = '优惠券<span class="bc-pay-right-text">优惠券¥' + b + "</span>")) : "coupon" == a && (c = "bc-pay-choose-area notused", e = function() {
			for (var a = this.nextSibling.childNodes, b = 0; b < a.length; b++) m(a[b], "selected");
			C(this, 0)
		}, b && (c = "bc-pay-choose-area notused selected"), d = "不使用优惠券"), L.couponTop[a] = s(c), L.couponTop[a].innerHTML = d, L.couponTop[a].onclick = e, L.couponTop[a]
	}

	function v(a) {
		var b = "channel-" + a,
			c = q(b);
		return c.onclick = function() {
			for (var b = this.parentNode.childNodes, c = 0; c < b.length; c++) m(b[c], "selected");
			l(this, "selected"), H.channel = a
		}, c.innerHTML = $[a].t, c
	}

	function w() {
		var a = O,
			b = r("bc-pay-channel-list"),
			c = 0;
		for (var d in a)("un" == a[d] || "unwap" == a[d]) && c++;
		for (var e in a) {
			if ("wx" == a[e] || "bcwx" == a[e]) {
				if (!K) continue
			} else if ("wxmp" == a[e] || "bcwxmp" == a[e] || "bcwxwap" == a[e] || "wxwap" == a[e]) {
				if (K) continue;
				if (J) {
					var f = !1;
					for (var d in a)
						if ("bcwxwap" == a[d] || "wxwap" == a[d]) {
							f = !0;
							break
						}
					if ("bcwxwap" != a[e] && "wxwap" != a[e] && f) continue
				} else if ("bcwxwap" == a[e] || "wxwap" == a[e]) continue
			} else if ("un" == a[e] || "unwap" == a[e]) {
				if (2 == c)
					if (J) {
						if ("un" == a[e]) continue
					} else if ("unwap" == a[e]) continue
			} else if ("bcaliqr" == a[e] && J) continue;
			b[V](v(a[e]))
		}
		return b
	}

	function x() {
		var a = s("bc-pay-sum-area"),
			b = [{
				name: "subSpan1",
				htm: "span",
				cls: "bc-pay-color-blue",
				txt: "¥40.00",
				fee: 4e3
			}, {
				name: "subSpan2",
				htm: "span",
				cls: "bc-pay-fz12 bc-pay-color-gray",
				txt: "(已优惠¥10.00)",
				fee: 1e3
			}, {
				name: "subBtn",
				htm: "button",
				cls: "bc-pay-btn-ok",
				txt: "确认",
				click: function() {
                    if (!H.channel) return void alert("请选择支付渠道");
                    console.log('L',L);
					switch (L.qrcode && L.qrcode.parentNode && L.qrcode.parentNode[W](L.qrcode), H.channel) {
						case "wxmp":
						case "bcwxmp":
							Q = "微信";
							break;
						case "bcaliqr":
							Q = "支付宝";
							break;
						default:
							Q = ""
					}
					var a = $[H.channel];
					c(a.dataUrl, H, a.f, H.channel)
				}
			}];
		a.innerHTML = "合计：";
		for (var d in b) L[b[d].name] = T[U](b[d].htm), L[b[d].name].className = b[d].cls, L[b[d].name].innerHTML = b[d].txt, b[d].click && (L[b[d].name].onclick = b[d].click), a[V](L[b[d].name]);
		return y(), a
	}

	function y() {
		L.subSpan1.innerHTML = "¥" + (H.order_fee / 100).toFixed(2), L.subSpan2.innerHTML = " (已优惠¥" + (H.coupon_fee / 100).toFixed(2) + ")"
	}

	function z(a) {
		var b = s("bc-pay-par-value");
		return b.innerHTML = '<p class="bc-pay-color-yellow"><span class="bc-pay-fz12">¥</span><em>' + a.discount + "</em></p><p>满" + a.limit_fee / 100 + "可用</p>", b
	}

	function A(a) {
		var b = s("bc-pay-expiry-date");
		return b.innerHTML = '<p class="bc-pay-color-yellow">通用优惠券</p><p>有效期至' + a.end_time + "</p>", b
	}

	function B() {
		var a = P,
			b = r("bc-pay-coupon-list");
		for (var c in a) {
			var d = "",
				e = function(b) {
					return function() {
						m(this.parentNode.previousSibling, "selected");
						for (var c = this.parentNode.childNodes, d = 0; d < c.length; d++) m(c[d], "selected");
						C(this, a[b])
					}
				}(c);
			H.amount < a[c].limit_fee && (d = "disabled", e = ""), a[c].objectid == H.coupon_id && (d += " selected");
			var f = q(d);
			f.onclick = e, f[V](z(a[c])), f[V](A(a[c])), b[V](f)
		}
		return b
	}

	function C(a, b) {
		var c = 0,
			d = "";
		l(a, "selected"), L.coupon.className = "bc-pay-main bc-pay-left", b ? (c = 100 * b.discount, d = b.objectid, L.couponTop.channel.innerHTML = '优惠券<span class="bc-pay-right-text">优惠券¥' + (c / 100).toFixed(2) + "</span>") : L.couponTop.channel.innerHTML = '优惠券<span class="bc-pay-right-text bc-pay-color-gray">请选择优惠券</span>', H.coupon_fee = c, H.order_fee = H.amount - H.coupon_fee, H.coupon_id = d, y()
	}

	function D(a) {
		var b = BCUtil.createQrCode({
				text: a.url
			}),
			c = s("bc-pay-code");
		return c.appendChild(b), c
	}

	function E(a) {
		L.wrap[V](F("qrcode", a)), setTimeout(function() {
			l(L.qrcode, "bc-pay-bounceInRight")
		}, 100), L.loading && L.loading.parentNode && L.loading.parentNode[W](L.loading);
		var b = 0;
		N = setInterval(function() {
			f(R[S], a.id, BCConfig.appId, "queryFun"), b++, b > 100 && (clearInterval(N), L.loading && L.loading.parentNode && L.loading.parentNode[W](L.loading))
		}, 3e3)
	}

	function F(a, b) {
		switch (L[a] = s("bc-pay-main bc-pay-" + a + "-main"), L[a].id = "bc-pay-" + a + "-main", L[a][V](t(a)), a) {
			case "channel":
				L[a][V](u(a, !1)), L[a][V](w()), L[a][V](x());
				break;
			case "coupon":
				if (l(L[a], "bc-pay-left"), P.length <= 0) {
					var c = n("bc-pay-tips");
					c.innerHTML = "无可用优惠券", L[a][V](c)
				} else L[a][V](u(a, H.coupon_id && "" != H.coupon_id ? !1 : !0)), L[a][V](B());
				break;
			case "qrcode":
				H.instant_channel || l(L[a], "bc-pay-left"), L[a][V](D(b));
				var d = n("bc-pay-p1");
				d.innerHTML = "¥" + (H.order_fee / 100).toFixed(2), L[a][V](d);
				var e = n("bc-pay-p2");
				e.innerHTML = "请使用" + Q + "扫码付款", L[a][V](e)
		}
		return L[a]
	}
	if (!window.BC) {
		var G = window.BC = {
				ui: {},
				pay: {}
			},
			H = {},
			I = {},
			J = (G.pay, /android|ipad|iphone|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/i.test(navigator.userAgent)),
			K = "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ? !0 : !1,
			L = null,
			M = null,
			N = null,
			O = null,
			P = null,
			Q = "",
			R = BCConfig.urls,
			S = parseInt((R.length - 1) * Math.random()),
			T = document,
			U = "createElement",
			V = "appendChild",
			W = "removeChild",
			X = "getElementsByTagName",
			Y = "createTextNode",
			Z = 0;
		G.cbs = {}, G.err = function(a) {
			L.loading && L.loading.parentNode && L.loading.parentNode[W](L.loading), 1 == H.debug && alert("error:" + JSON.stringify(a)), "function" == typeof I.errCallback && I.dataError(a)
		}, window.queryFun = function(a) {
			1 == a.pay.spay_result && (console.log(a), clearInterval(N), L.qrcode.parentNode[W](L.qrcode), location.href = M + encodeURI("?bill_no=" + a.pay.bill_no + "&channel=" + a.pay.channel + "&create_time=" + a.pay.create_time + "&spay_result=" + a.pay.spay_result + "&sub_channel=" + a.pay.sub_channel + "&title=" + a.pay.title + "&total_fee=" + a.pay.total_fee + "&trade_no=" + a.pay.trade_no))
		};
		var $ = {};
		$.ali = {
			dataUrl: j(R[S], "ali"),
			t: "支付宝支付",
			f: d
		}, $.un = {
			dataUrl: j(R[S], "un"),
			t: "银联支付",
			f: d
		}, $.unwap = {
			dataUrl: j(R[S], "unwap"),
			t: "银联支付",
			f: d
		}, $.wxmp = {
			dataUrl: j(R[S], "wxmp"),
			t: "微信支付",
			f: E
		}, $.bcwxmp = {
			dataUrl: j(R[S], "bcwxmp"),
			t: "微信支付",
			f: E
		}, $.wxwap = {
			dataUrl: j(R[S], "wxwap"),
			t: "微信支付",
			f: d
		}, $.bcwxwap = {
			dataUrl: j(R[S], "bcwxwap"),
			t: "微信支付",
			f: d
		}, $.wx = {
			dataUrl: j(R[S], "wx"),
			t: "微信支付",
			f: h
		}, $.bcwx = {
			dataUrl: j(R[S], "bcwx"),
			t: "微信支付",
			f: h
		}, $.jd = {
			dataUrl: j(R[S], "jd"),
			t: "京东支付",
			f: d
		}, $.bd = {
			dataUrl: j(R[S], "bd"),
			t: "百度支付",
			f: d
		}, $.yee = {
			dataUrl: j(R[S], "yee"),
			t: "易宝支付",
			f: d
		}, $.kuaiqian = {
			dataUrl: j(R[S], "kuaiqian"),
			t: "快钱支付",
			f: d
		}, $.bckj = {
			dataUrl: j(R[S], "bckj"),
			t: "银联支付",
			f: d
		}, $.bcaliqr = {
			dataUrl: j(R[S], "bcaliqr"),
			t: "支付宝扫码",
			f: E
		}, $.bcali = {
			dataUrl: j(R[S], "bcali"),
			t: "支付宝支付",
			f: d
		}, G.init = function() {
			var b = BCConfig.channels,
				c = '.bc-pay-bounceInRight{left:0!important}@-webkit-keyframes bc-pay-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@-moz-keyframes bc-pay-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@-o-keyframes bc-pay-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@-webkit-keyframes payListMove{0%{bottom:-500px}100%{bottom:0}}@-moz-keyframes payListMove{0%{bottom:-500px}100%{bottom:0}}@-o-keyframes payListMove{0%{bottom:-500px}100%{bottom:0}}#bc-pay-masker{background-color:#000;opacity:.4;filter:alpha(opacity=40);position:fixed;top:0;bottom:0;left:0;right:0;display:none}#bc-pay-masker.bc-pay-open{display:block}#bc-pay-wrap{position:fixed;left:50%;top:50%;bottom:auto;margin:-240px 0 0 -185px;height:480px;width:375px;overflow:hidden;-webkit-animation:payListMove .5s ease-in-out 0s alternate;-o-animation:payListMove .5s ease-in-out 0s alternate;animation:payListMove .5s ease-in-out 0s alternate;text-shadow:none;font-family:PingFangSC-Regular,Helvetica,"Microsoft Yahei",Arial,sans-serif}#bc-pay-wrap .bc-pay-main{position:absolute;top:0;left:0;height:100%;width:100%;background-color:#f2f2f2;box-shadow:0 2px 8px 0 rgba(0,0,0,.3);-webkit-font-smoothing:antialiased;font-size:15px;-webkit-transition:all 500ms;-moz-transition:all 500ms;-ms-transition:all 500ms;-o-transition:all 500ms;transition:all 500ms}#bc-pay-wrap .bc-pay-main.bc-pay-left{left:110%}#bc-pay-wrap .bc-pay-main .bc-pay-fz12{font-size:12px}#bc-pay-wrap .bc-pay-main .bc-pay-color-gray{color:#979797!important}#bc-pay-wrap .bc-pay-main .bc-pay-color-blue{color:#278CE5!important}#bc-pay-wrap .bc-pay-main .bc-pay-color-yellow{color:#FD9D00!important}#bc-pay-wrap .bc-pay-main .bc-pay-tips{text-align:center;color:#979797;margin:1em auto;padding:0}#bc-pay-wrap .bc-pay-main .bc-pay-top-title{margin:0;padding:0;background-color:#f3f3f3;box-shadow:0 0 1px 0 rgba(0,0,0,.2);height:56px;line-height:56px;font-family:PingFangSC-Medium;font-size:16px;color:rgba(10,18,32,.87);text-align:center;position:relative;margin-bottom:8px}#bc-pay-wrap .bc-pay-main .bc-pay-top-title .bc-pay-cancel-btn{position:absolute;top:0;bottom:0;right:0;padding:0 32px;line-height:inherit;color:#167DD6;cursor:pointer}#bc-pay-wrap .bc-pay-main .bc-pay-top-title .bc-pay-back-btn{position:absolute;top:0;bottom:0;left:0;width:48px;background:url(https://dn-jspay.qbox.me/v4.ui4.back2.png?1) 16px center no-repeat;background:url(https://dn-jspay.qbox.me/v4.ui4.back.png?1) 16px center no-repeat \\9;-webkit-background-size:16px 16px;background-size:16px 16px;cursor:pointer}#bc-pay-wrap .bc-pay-main .bc-pay-top-title .bc-pay-close-btn{position:absolute;top:0;bottom:0;left:0;width:48px;background:url(https://dn-jspay.qbox.me/v4.ui4.close2.png?1) 16px center no-repeat;background:url(https://dn-jspay.qbox.me/v4.ui4.close.png?1) 16px center no-repeat \\9;-webkit-background-size:16px 16px;background-size:16px 16px;cursor:pointer}#bc-pay-wrap .bc-pay-main .bc-pay-choose-area{background-color:#f8f8f8;padding:19px 16px;color:rgba(10,18,32,.87);line-height:18px;position:relative;margin-bottom:8px;cursor:pointer}#bc-pay-wrap .bc-pay-main .bc-pay-choose-area.notused{margin:24px 0}#bc-pay-wrap .bc-pay-main .bc-pay-choose-area:after{content:"";position:absolute;right:24px;width:16px;height:16px;background:url(https://dn-jspay.qbox.me/v4.ui4.go2.png?1) right center no-repeat;background:url(https://dn-jspay.qbox.me/v4.ui4.go.png?1) right center no-repeat \\9;-webkit-background-size:100% 100%;background-size:100% 100%}#bc-pay-wrap .bc-pay-main .bc-pay-choose-area .bc-pay-right-text{color:#FF921C;position:absolute;right:45px}#bc-pay-wrap .bc-pay-main .bc-pay-choose-area.notused:after{width:24px;height:24px;background:url(https://dn-jspay.qbox.me/v4.ui4.unselected2.png?1) center no-repeat;background:url(https://dn-jspay.qbox.me/v4.ui4.unselected.png?1) center no-repeat \\9;-webkit-background-size:24px 24px;background-size:24px 24px}#bc-pay-wrap .bc-pay-main .bc-pay-choose-area.notused.selected:after{background-image:url(https://dn-jspay.qbox.me/v4.ui4.selected2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.selected.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list{list-style:none;margin:0;padding:0;height:285px;overflow:auto;margin-bottom:8px}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li{cursor:pointer;padding:16px 16px 16px 50px;line-height:24px;position:relative;margin-bottom:1px;color:rgba(10,18,32,.64);background:#f8f8f8 16px center no-repeat;-webkit-background-size:24px 24px;background-size:24px 24px}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-wallet{background-image:url(https://dn-jspay.qbox.me/v4.ui4.wallet2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.wallet.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-ali{background-image:url(https://dn-jspay.qbox.me/v4.ui4.ali2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.ali.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-bcaliqr{background-image:url(https://dn-jspay.qbox.me/v4.ui4.ali2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.ali.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-bcali{background-image:url(https://dn-jspay.qbox.me/v4.ui4.ali2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.ali.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-wx{background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-wxmp{background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-bcwxmp{background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-bcwx{background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-wxwap{background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-bcwxwap{background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.wx.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-bank{background-image:url(https://dn-jspay.qbox.me/v4.ui4.bankcard2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.bankcard.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-bd{background-image:url(https://dn-jspay.qbox.me/v4.ui4.bd2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.bd.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-jd{background-image:url(https://dn-jspay.qbox.me/v4.ui4.jd2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.jd.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-un{background-image:url(https://dn-jspay.qbox.me/v4.ui4.un2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.un.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-unwap{background-image:url(https://dn-jspay.qbox.me/v4.ui4.un2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.un.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-kuaiqian{background-image:url(https://dn-jspay.qbox.me/v4.ui4.un2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.un.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.channel-bckj{background-image:url(https://dn-jspay.qbox.me/v4.ui4.un2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.un.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li:after{content:"";position:absolute;right:22px;width:24px;height:24px;background:url(https://dn-jspay.qbox.me/v4.ui4.unselected2.png?1) center no-repeat;background:url(https://dn-jspay.qbox.me/v4.ui4.unselected.png?1) center no-repeat \\9;-webkit-background-size:24px 24px;background-size:24px 24px}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li.selected:after{background-image:url(https://dn-jspay.qbox.me/v4.ui4.selected2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.selected.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-sum-area{position:absolute;bottom:0;left:0;right:0;background-color:#f8f8f8;line-height:26px;padding:15px 16px;color:#4A4A4A}#bc-pay-wrap .bc-pay-main .bc-pay-sum-area .bc-pay-btn-ok{position:absolute;right:0;top:0;bottom:0;width:120px;text-align:center;background-color:#278CE5;border:0;outline:0;color:#fff;border-radius:0;font-size:15px;cursor:pointer;margin:0;padding:0}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list{list-style:none;margin:0 16px 8px;padding:0;height:288px;overflow:auto}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li{cursor:pointer;height:64px;position:relative;margin-bottom:8px;color:rgba(10,18,32,.64);background:url(https://dn-jspay.qbox.me/v4.ui4.shape2.png?1) #f8f8f8 0 0 no-repeat;background:url(https://dn-jspay.qbox.me/v4.ui4.shape.png?1) #f8f8f8 0 0 no-repeat \\9;-webkit-background-size:auto 100%;background-size:auto 100%;overflow:hidden;font-size:10px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li:after{content:"";position:absolute;right:8px;top:50%;width:24px;height:24px;margin-top:-12px;background:url(https://dn-jspay.qbox.me/v4.ui4.unselected2.png?1) center no-repeat;background:url(https://dn-jspay.qbox.me/v4.ui4.unselected.png?1) center no-repeat \\9;-webkit-background-size:24px 24px;background-size:24px 24px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li.selected:after{background-image:url(https://dn-jspay.qbox.me/v4.ui4.selected2.png?1);background-image:url(https://dn-jspay.qbox.me/v4.ui4.selected.png?1) \\9}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li.disabled{opacity:.5;filter:alpha(opacity=50)}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-par-value,#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date{float:left;padding-top:8px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-par-value>p,#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date>p{margin:0}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-par-value>p:first-child,#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date>p:first-child{height:32px;margin-bottom:6px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-par-value>p:last-child,#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date>p:last-child{line-height:1}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-par-value{width:30%;border-right:1px dashed #E9E9E9;text-align:center;height:56px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-par-value em{font-family:PingFangSC-Light;font-size:28px;font-style:normal;display:inline-block;line-height:32px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date{width:67%}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date>p{padding-left:14px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date>p:first-child{line-height:32px;font-size:14px}#bc-pay-wrap .bc-pay-main.bc-pay-qrcode-main{text-align:center}#bc-pay-wrap .bc-pay-main.bc-pay-qrcode-main .bc-pay-code{display:block;margin:40px auto 20px;width:66%}#bc-pay-wrap .bc-pay-main.bc-pay-qrcode-main p{margin:0}#bc-pay-wrap .bc-pay-main.bc-pay-qrcode-main .bc-pay-p1{font-size:16px;font-family:PingFangSC-Medium;margin-bottom:10px;line-height:1}#bc-pay-wrap .bc-pay-main.bc-pay-qrcode-main .bc-pay-p2{font-size:14px;color:#979797}#bc-pay-wrap .bc-pay-loading-wrap{position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(255,255,255,.5)}#bc-pay-wrap .bc-pay-loading-wrap .bc-pay-loading-box{width:80px;height:80px;position:absolute;top:50%;left:50%;margin:-40px 0 0 -40px;background-color:rgba(17,17,17,.4);border-radius:10px}#bc-pay-wrap .bc-pay-loading-wrap .bc-pay-loading-box .bc-pay-loading{position:absolute;width:24px;height:24px;top:50%;left:50%;margin:-12px 0 0 -12px;opacity:.6;background:url(https://dn-jspay.qbox.me/v4.ui4.loading2.gif?1) 0 0 no-repeat;background:url(https://dn-jspay.qbox.me/v4.ui4.loading.gif?1) \\9 0 0 no-repeat;background-size:24px 24px}@media screen and (max-width:450px){#bc-pay-wrap{width:100%;left:0;bottom:0;top:auto;margin:0}}@media screen and (max-width:350px){#bc-pay-wrap{height:410px}#bc-pay-wrap .bc-pay-main{font-size:13px}#bc-pay-wrap .bc-pay-main .bc-pay-top-title{height:46px;line-height:46px;font-size:14px}#bc-pay-wrap .bc-pay-main .bc-pay-choose-area{padding-top:14px;padding-bottom:14px}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list{height:235px}#bc-pay-wrap .bc-pay-main .bc-pay-channel-list li{padding-top:11px;padding-bottom:11px}#bc-pay-wrap .bc-pay-main .bc-pay-sum-area{font-size:13px}#bc-pay-wrap .bc-pay-main .bc-pay-sum-area .bc-pay-btn-ok{width:100px;font-size:13px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list{height:248px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li{height:54px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-par-value,#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date{padding-top:3px}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-par-value>p:first-child,#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date>p:first-child{margin-bottom:0}#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-par-value em,#bc-pay-wrap .bc-pay-main .bc-pay-coupon-list li .bc-pay-expiry-date em{font-size:22px}}';
			a(c);
			for (var d in b)
				if ("wxmp" == b[d] || "bcwxmp" == b[d] || "bcaliqr" == b[d]) {
					var e = T[U]("SCRIPT");
					e.type = "text/javascript", e.src = "https://dn-jspay.qbox.me/util.min.js", T[X]("head")[0][V](e)
				}
		}, G.click = function(a, d) {
			console.log('a',a)
			if (console.log(a), H = a, H.order_fee = a.amount, H.coupon_fee = 0, I = {}, d instanceof Object && (I = b(d, {
					wxJsapiFinish: function(a) {},
					wxJsapiSuccess: function(a) {},
					wxJsapiFail: function(a) {},
					dataError: function(a) {}
				}, !1)), O = BCConfig.channels, P = BCConfig.coupons ? BCConfig.coupons : [], 1 == H.debug && alert("您的 BeeCloud appId=" + BCConfig.appId), H.instant_channel) switch (H.instant_channel) {
				case "wx":
				case "bcwx":
				case "wxmp":
				case "bcwxmp":
				case "bcaliqr":
					L = {}, L.couponTop = {}, L.background = T[U]("div"), L.background.id = "bc-pay-masker", L.background.className = "bc-pay-open", T.body[V](L.background), L.wrap = T[U]("div"), L.wrap.id = "bc-pay-wrap", T.body[V](L.wrap);
				case "ali":
				case "un":
				case "unwap":
				case "jd":
				case "bd":
				case "yee":
				case "bckj":
				case "wxwap":
				case "bcwxwap":
				case "kuaiqian":
				case "bcali":
					var e = $[H.instant_channel];
					console.log('instant_channel',H.instant_channel)
					c(e.dataUrl, H, e.f, H.instant_channel);
					break;
				default:
					1 == H.debug && alert("instant_channel 不存在渠道[" + H.instant_channel + "]")
			} else L = {}, L.couponTop = {}, L.background = T[U]("div"), L.background.id = "bc-pay-masker", L.background.className = "bc-pay-open", T.body[V](L.background), L.wrap = T[U]("div"), L.wrap.id = "bc-pay-wrap", T.body[V](L.wrap), L.wrap[V](F("channel")), T.onkeydown = function(a) {
				var b = a || window.event || arguments.callee.caller.arguments[0];
				b && 27 == b.keyCode && (L.background && L.background.parentNode && (L.background.parentNode[W](L.background), L.wrap.parentNode[W](L.wrap)), L.wrap && L.wrap.parentNode && L.wrap.parentNode[W](L.wrap), null != N && clearInterval(N))
			}
		}, G.init()
	}
}(),
function() {
	"use strict";
	var a = document;
	if (a.fireEvent) {
		var b = a.createElement("form");
		b.id = "beecloud", b.style.display = "none", a.body.appendChild(b);
		var c = a.createEventObject();
		c.eventType = "onsubmit", b.fireEvent("onsubmit", c)
	} else {
		var c = new CustomEvent("beecloud:onready", {
			detail: {
				msg: "Welcome Bees"
			},
			bubbles: !0,
			cancelable: !1
		});
		a.dispatchEvent(c)
	}
}();