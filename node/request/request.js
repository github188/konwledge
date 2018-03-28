var request = require('request');
var fs = require('fs');

var url = 'http://test.jubao56.com/v1/cmn/product/list';

request(url, function (error, response, body) { //
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the baidu homepage.
        //typeOf body is string ,
        var content = JSON.parse(body)
    }
})