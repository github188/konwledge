import format from "./timeformat"

let a = format(new Date(),"yyyy-MM-dd hh-mm-ss");

let b = format(new Date(),'yyyy年MM月dd日 hh时mm分ss秒')    //
let c = format(new Date(),'yyyy-MM-dd hh-mm-ss')
let d = format(new Date(),'hh:mm:ss  yyyy年MM月dd日')

console.log(a);
console.log("===================")
console.log(b);
console.log(c);
console.log(d);