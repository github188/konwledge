/*! 个人所有，欢迎使用 */!function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=6)}({6:function(t,n,e){"use strict";var o={format:function(t,n){return t instanceof Date?void 0===n?(console.log("%c function format's param type is undefined","color:#BA55D3"),null):this.DateToString(t,n):"string"==typeof t?this.stringToDate(t):(console.log("%c function format's param time is not [Date | String] type","color:#BA55D3"),null)},stringToDate:function(t){if("string"!=typeof t)return console.log("%c function stringToDate's param time is not String type","color:#BA55D3"),null;t=this.initStringBlank(t);var n=(t=this.deleteDayAfter(t)).substring(0,4),e=t.substring(5,7)-1,o=t.substring(8,10),r=t.substring(11,13),i=t.substring(14,16),u=t.substring(17,19);return new Date(n,e,o,r,i,u)},DateToString:function(t,n){if(!t instanceof Date)return console.log("%c function DateTotime's param date is not Date type","color:#BA55D3"),null;if(!n instanceof String)return console.log("%c function DateTotime's param type is not String type","color:#BA55D3"),null;var e=t.getFullYear(),o=this.numToTwo(t.getMonth()+1),r=this.numToTwo(t.getDate()),i=this.numToTwo(t.getHours()),u=this.numToTwo(t.getMinutes()),a=this.numToTwo(t.getSeconds());return n.replace(/[yy|YY]{4}/,e).replace(/MM/,o).replace(/[dd|DD]{2}/,r).replace(/[hh|HH]{2}/,i).replace(/mm/,u).replace(/[ss|SS]{2}/,a)},initStringBlank:function(t){return-1!==(t=t.replace(/  /g," ")).indexOf("  ")&&(t=this.initStringBlank(t)),t},deleteDayAfter:function(t){return t.length>10?(" "!==t.substring(10,11)&&(t=t.substring(0,10)+t.substring(11),t=this.deleteDayAfter(t)),t):t},numToTwo:function(t){return t<10?"0"+t:t}};void 0!==window.timeFormat?console.log("%c function name %c timeFormat has been defined ,%c it's conflict with own function name ! ","color:#BA55D3","color:red;","color:#BA55D3"):window.timeFormat=function(t,n){return t instanceof Date?void 0===n?(console.log("%c function format's param type is undefined","color:#BA55D3"),null):o.DateToString(t,n):"string"==typeof t?o.stringToDate(t):(console.log("%c function format's param time is not [Date | String] type","color:#BA55D3"),null)}}});