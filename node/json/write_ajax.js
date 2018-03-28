var request = require('request');
var fs = require('fs');


var url = 'http://test.jubao56.com/v1/cmn/product/list';
var outputFilename = 'D:/gaofangshang/MyGit/node/json/product_list.js';

request(url, function (error, response, body) { //
    if (!error && response.statusCode == 200) {
        //console.log(body) // Show the HTML for the baidu homepage.
       var content = JSON.parse(body)
        fs.writeFile(outputFilename, JSON.stringify(content, null, 2), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputFilename);
            }
        });
    }
})