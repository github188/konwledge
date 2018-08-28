var express = require('express');
var data = require("../data/data1.json")
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var fs = require('fs')
var multer  = require('multer');


var app = express();
var router = express.Router();
// 创建 application/x-www-form-urlencoded 编码解析; 为false则会返回String'或'Array'形式，为true会返回任意形式
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(multer({ dest: '/tmp/'}).array('image'));



app.all('*',function (req, res, next) {
    // console.log(req.query)
    // console.log(req.body)

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,Authorization,Test")
    res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})

app.get('/', function(req, res) {
    console.log(req.query)
    res.send(data);
});

app.post('/save/order',function (req, res) {
    console.log(req.body)
    res.send(data);
})

app.post('/file_upload', function (req, res) {
    console.log(req.files[0]);  // 上传的文件信息
    var des_file = __dirname + "/file/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
})

app.listen(3000);