/**
 * Created by gaofa on 2018/3/8.
 */
// express_cookie.js 文件
var express      = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function(req, res) {
    console.log("Cookies: ", req.cookies)
    res.end(JSON.stringify({'cookie':req.cookie}))
})

app.listen(8081)