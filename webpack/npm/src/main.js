import timeFormat from "./timeformat"
// import "./timeformat/index.script"

let a = timeFormat(new Date(),"yyyy-MM-dd hh-mm-ss");
let b = timeFormat(new Date(),'yyyy年MM月dd日 hh时mm分ss秒')    //
let c = timeFormat(new Date(),'yyyy-MM-dd hh-mm-ss')
let d = timeFormat(new Date(),'hh:mm:ss  yyyy年MM月dd日')

console.log(a);
console.log(b);
console.log(c);
console.log(d);
