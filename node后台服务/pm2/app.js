const http = require('http'); 
http.createServer(function(req, res) { 
    res.writeHead(200, { 'Content-Type': 'text/plain' }); 
    res.end('this is test vi'); 
}) .listen(3001); 
console.log('server runing on http://47.xx.139.xx:8081');