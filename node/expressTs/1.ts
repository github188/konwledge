import express from "express"
let data = require("../data/data1.json") ;

let app = express()

app.get('/', function(req, res) {
    res.send(data);
});

app.listen(3000);