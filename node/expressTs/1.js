"use strict";
exports.__esModule = true;
var express_1 = require("express");
var data = require("../data/data1.json");
var app = express_1["default"]();
app.get('/', function (req, res) {
    res.send(data);
});
app.listen(3000);
