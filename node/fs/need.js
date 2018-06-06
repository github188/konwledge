var request = require('request');
var fs = require('fs');


var url = 'http://test.jubao56.com/v1/cmn/product/list';
var outputFilename = 'D:/Mr.Gao/MyGit/node/fs/product_list.json';

request(url, function (error, response, body) { //
    if (!error && response.statusCode == 200) {
        //console.log(body) // Show the HTML for the baidu homepage.
        var content = JSON.parse(body);
        content=content.rows.map(function (val, idx) {
            delete val.version
            delete val.note
            delete val.created_at
            delete val.updated_at
            delete val.deleted_at
            return val
        })

        fs.writeFile(outputFilename, JSON.stringify(content, null, 2), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputFilename);
            }
        });
    }
})