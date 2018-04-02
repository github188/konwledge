var http = require('http');
var qs = require('querystring');
var fs = require('fs');

var data = {
    platform_type: 1,
    page:1,
    rows:10,
    time: new Date().getTime()
};//这是需要提交的数据
var content = qs.stringify(data);

var url = 'http://test.jubao56.com/v1/cmn/product/list';
var options = {
    hostname: 'test.jubao56.com',
    port: "",
    path: '/v1/cmn/product/list?' + content,
    method: 'GET',
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    writeHeaders(res);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        writeBody(JSON.parse(chunk))
    });
});

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
req.end();

function writeHeaders(res) {
    var outputFilename = 'D:/gaofangshang/MyGit/node/request/headers.json';
    fs.writeFile(outputFilename, JSON.stringify(res.headers, null, 4), function(err) {
        if (err) throw err;
        console.log("JSON headers saved to " + outputFilename);
    });
}

function writeBody(body) {
    var outputFilename = 'D:/gaofangshang/MyGit/node/request/body.json';
    fs.writeFile(outputFilename, JSON.stringify(body, null, 4), function(err) {
        if (err) throw err;
        console.log("JSON body saved to " + outputFilename);
    });
}
