var fs=require('fs');
var file='D:/gaofangshang/MyGit/node/json/my.json';
var result=JSON.parse(fs.readFileSync( file));
console.log(result)
//操作对象