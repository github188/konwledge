/* eslint-disable */
var express = require('express');
// var data = require("../data/data1.json")
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var fs = require('fs')
var util = require('util');
var multer = require('multer');
var data = require('./data/index.json')
var data2 = require('./data/index.js')

var app = express();
var router = express.Router();

var expressWs = require('express-ws')(app);

app.ws('/ws', function(ws, req) {
  util.inspect(ws);
  ws.on('message', function(msg) {
    console.log('_message');
    console.log(msg);
    ws.send('echo:' + msg);
  });
})

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(multer({dest: '/tmp/'}).array('image'));


app.all('*', function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,Test")
  res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Authorization", "*");
  next()
})

app.get('/', function (req, res) {
  res.send(req.query);
});

app.post('/v2/userlogic', function (req, res) {
  console.log(req.body.method)
  var reqData = req.body
  sleep(() => {
    switch (req.body.method) {
      case 'login' :
        if (req.body.username === "test123") {
          res.send(data.login.fail);
        } else {
          res.send(data.login.success);
        }
        ;
        break;
      case 'getbaseinfo':
        res.send(data.userlogic.getbaseinfo)
        break;
      case 'getnetwork':
        if (req.body.method.type === '1') {
          res.send(data.userlogic.getnetwork)
        } else {
          res.send(data.userlogic.getnetwork2)
        }
        break;
      case 'setnetwork' :
        if (req.body.method.type === '1') {
          res.send(data.userlogic.getnetwork)
        } else {
          res.send(data.userlogic.getnetwork2)
        }
        break;
      case 'setlanguagetype':
        res.send({
          code: 0,
          message: 'language set ok !'
        })
        break;
      case 'getlanguagetype':
        res.send({
          code: 0,
          message: 'language set ok !',
          data: {
            type: '2'
          }
        })
        break;
      case 'getftp' :
        res.send(data.userlogic.getftp)
        break;
      case 'setftp' :
        res.send(data.userlogic.setftp)
        break;
      case 'getchnparam' :
        var resData = data2.passageway.data.filter(function (val, idx) {
          return idx >= (reqData.page - 1) * reqData.row && idx < reqData.page * reqData.row
        })
        let list = [
          {id: '1', proto: '1', urlenable: '1', chnname: 'chnname', chnip: 'chnip', chnport: 'chnport', rtspurl: 'rtspurl', bitstream: 'bitstream', chnuser: 'chnuser', chnpassword: 'chnpassword'},
          {id: '2', proto: '1', urlenable: '1', chnname: 'chnname', chnip: 'chnip', chnport: 'chnport', rtspurl: 'rtspurl', bitstream: 'bitstream', chnuser: 'chnuser', chnpassword: 'chnpassword'}
        ]
        res.send({code: 0, data: list, total: data2.passageway.data.length})
        break;
      case 'getsystemparam':
        res.send({
          "code":"0",
          "message":"获取用户信息成功",
          "data":{
            "status":"正常",  //正常  警告  错误  未授权
            "datanum":"12536414",
            "space":"5G/7G",
            "runtime":"12323232323",
            "proversion":"v1.0.20180910",
            "algversion":"v1.0.20180910",
            "devversion":"v1.0.20180910",
            "devguid": "vasdfadasd"
          }
        })
        break;
      case 'setuserparam':
        res.send({
          "code":"0",
          "message":"设置用户信息成功",
        })
        break;
      case 'gettime':
        res.send({
          "code": "0",
          "message":"获取校时信息成功",
          "data": {
            "ntpenable": "1", //1 自动校时  2 手动校时
            "ntpip": "120.24.166.46",
            "interval":"30",  //分钟
            "time": "2018-03-05 09:41:21"   //获取时会返回时间  可显示在手动校时上面
          }
        })
        break;
      case 'settime':
        res.send({
          "code": "0",
          "message":"获取校时信息成功",
          "data": {
            "ntpenable": "1", //1 自动校时  2 手动校时
            "ntpip": "120.24.166.46",
            "interval":"30",  //分钟
            "time": "2018-03-05 09:41:21"   //获取时会返回时间  可显示在手动校时上面
          }
        })
        break;
      case 'setchnparam' :
        if (req.body.option === 'add') {
          data2.passageway.data.unshift(reqData)
          res.send({code: 0, data: data2.passageway.data})
        } else if (req.body.option === 'update') {
          res.send({code: 0, data: data2.passageway.data})
        } else if (req.body.option === 'del') {
          res.send({code: 0, data: data2.passageway.data})
        }
        break;
      case 'getroi' :
        res.send(data.userlogic.getroi)
        break;
      case 'setroi' :
        res.send(data.userlogic.setroi)
        break;
      case 'roiVideoGet' :
        res.send(data.userlogic.roiVideoData)
        break;
      case 'getuserparam':
        res.send({
          "code":"0",
          "message":"获取用户信息成功",
          "data":[
            {
              "username":"admin",
              "password":"admin",
              "role":"admin"
            },
            {
              "username":"sdds",
              "password":"123456",
              "role":"guest"
            },
          ]
        })
        break;
      case 'userList' :
        var tData = data.userlogic.userList.data
        res.send({code: 0, data: spliceArray(tData, req.body), total: tData.length})
        break;
      case 'userListAdd' :
        var tData = data.userlogic.userListAdd.data
        res.send({code: 0, data: spliceArray(tData, req.body), total: tData.length})
        break;
      case 'userListUpdate' :
        var tData = data.userlogic.userListUpdate.data
        res.send({code: 0, data: spliceArray(tData, req.body), total: tData.length})
        break;
      case 'userListDelete' :
        var tData = data.userlogic.userListDelete.data
        res.send({code: 0, data: spliceArray(tData, req.body), total: tData.length})
        break;
      case 'resetSoftware' :
        res.send({code: 0, data: null, message: 'resetSoftware 设置成功'})
        break;
      case 'resetDevice' :
        res.send({code: 0, data: null, message: 'resetDevice 设置成功'})
        break;
      case 'initAll' :
        res.send({code: 0, data: null, message: 'initAll 设置成功'})
        break;
      case 'checkTime' :
        res.send({code: 0, data: null, message: 'checkTime 设置成功'})
        break;
      case 'homeControl' :
        res.send({code: 0, data: {face: true, car: true, passerby: false}, message: 'homeControl 设置成功'})
        break;
      case 'homeControlSet' :
        res.send({code: 0, data: req.body, message: 'homeControlSet 设置成功'})
        break;
      case 'authorizeGetFile' :
        res.send({
          code: 0,
          data: {url: 'http://c.hiphotos.baidu.com/image/h%3D300/sign=4bc239aadda20cf45990f8df46094b0c/9d82d158ccbf6c81924a92c5b13eb13533fa4099.jpg'},
          message: 'authorizeGetFile 设置成功'
        })
        break;
      case 'authorizeUpdate' :
        res.send({code: 0, data: req.body, message: 'authorizeUpdate 设置成功'})
        break;
      case 'systemLevelInfo' :
        res.send({
          code: 0,
          data: {status: '正常运行/异常/未授权', number: '12536414', room: '16G/32G', time: '2天11小时53分46秒'},
          message: 'systemLevelInfo '
        })
        break;
      case 'systemLevelUpdate' :
        res.send({code: 0, data: req.body, message: 'systemLevelUpdate 设置成功'})
        break;
      case 'autoService' :
        res.send({
          code: 0,
          data: [{label: '区域一', value: 'shanghai'}, {label: '区域二', value: 'beijing'}],
          message: 'autoService 设置成功'
        })
        break;
      case 'autoServiceSet' :
        res.send({code: 0, data: req.body, message: 'autoServiceSet 设置成功'})
        break;
      case 'recordDataSearch' :
        var tData = data.userlogic.recordTableData.data
        res.send({code: 0, data: spliceArray(tData, req.body), total: tData.length})
        break;
      case 'recordEquirementList' :
        res.send({code: 0, data: req.body, message: 'recordEquirementList 设置成功'})
        break;
      case 'channelData' :
        // res.send(data.userlogic.channelData)
        res.send({
          "code" : 0,
          "message": "获取视频通道信息成功",
          "data": {
            "channum": 2,
            "names": [
              {"channel": 0, "chnname":"aaa" },
              {"channel": 1, "chnname":"bbb" }
            ],
            "videochn": 0,
            "rtmpurl": "rtmp://210.12.48.210:8082/seemideo/3"
          }
        })
        break;
      case 'getvideolist':
        res.send({
          "code": "0",
          "message": "获取网络信息成功",
          "data": {
            "videouse": "2.2G",
            "available": "3.3G",
            "videolist":[
              {id: '1',size: '19M', name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {id: '2',size: '28M',  name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
            ]
          }
        })
        break;
      case 'delvideo':
        res.send({
          "code": "0",
          "message": "删除成功",
          "data": {
            "videouse": "2.2G",
            "available": "3.3G",
            "videolist":[
              {id: '1',size: '19M', name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {id: '2',size: '19M', name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
            ]
          }
        })
        break;
      case 'getautoreboot':
        res.send({
          "code": "0",
          "message": "获取网络信息成功",
          "data": {
            "autoenable": "1",
            "day": "7",  //一周为7
            "hour": "3",
            "minute":"12",
            "second":"13"
          }
        })
        break;
      case 'setvideochn':
        res.send({
          "code": "0",
          "message": "设置网络成功"
        })
        break;
      default :
        res.send(null)
    }
  })
})


function spliceArray(data, req) {
  return data.filter(function (val, idx) {
    return idx >= (req.page - 1) * req.row && idx < req.page * req.row
  })
}

function sleep(fn, n = 1) {
  setTimeout(function () {
    fn()
  }, n * 1000)
}

app.get('/cmn/user/info', function (req, res) {
  res.send(data.userInfo)
});


app.post('/file_upload', function (req, res) {
  console.log(req.files[0]);  // 上传的文件信息
  var des_file = __dirname + "/file/" + req.files[0].originalname;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.files[0].originalname
        };
      }
      console.log(response);
      res.end(JSON.stringify(response));
    });
  });
})


// io.on('connection', function (socket) {
//   console.log('socket.io连接成功');
//
//   socket.on("disconnect", function () {
//     console.log("a user go out");
//   });
//
//   socket.on("chartData", function (obj) {
//     //延迟3s返回信息给客户端
//     setTimeout(() => {
//       interval((count) => {
//         io.emit("chartDataEmit", {
//           code: 0, message: '获取实时路况成功', data: [
//             {'code': '1', 'type': '行人', 'count': 46 + count, 'sort': '5'},
//             {'code': '2', 'type': '自行车', 'count': 22 + count},
//             {'code': '3', 'type': '轿车', 'count': 284 + count, 'sort': '2'},
//             {'code': '4', 'type': '摩托车', 'count': 465 + count, 'sort': '1'},
//             {'code': '5', 'type': '大客车', 'count': 92 + count},
//             {'code': '6', 'type': '三轮车', 'count': 5 + count, 'sort': '4'},
//             {'code': '7', 'type': '面包车', 'count': 184 + count, 'sort': '3'},
//             {'code': '8', 'type': '卡车', 'count': 3 + count}
//           ]
//         });
//       }, 10)
//     }, 1000)
//   });
//   socket.on("currentCar", function (obj) {
//     //延迟3s返回信息给客户端
//     setTimeout(() => {
//       let timer = null
//       let count = 0;
//       clearInterval(timer)
//       timer = setInterval(() => {
//
//         io.emit("currentCarEmit", {
//           code: 0, message: '实时路况', data: {
//             car: '摩托车',
//             sex: '女',
//             age: '青年',
//             channel: count,
//             time: '2018:-9-7 09:28:30'
//           }
//         }, 6);
//
//         count = count + 10
//         if (count > 10 * 10) {
//           clearInterval(timer)
//         }
//       }, 1000 * 2)
//
//     }, 1000)
//   });
// });

function interval(fn, num, speed = 2) {
  let count2 = 0;
  let timer2 = null
  clearInterval(timer2)
  timer2 = setInterval(() => {
    fn(count2)
    count2 = count2 + 10
    if (count2 > num * 10) {
      clearInterval(timer2)
    }
  }, 1000 * speed)
}


router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,Test")
  res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Authorization", "*");
  next()
  res.render('im/imRoom');
});

router.get('/imRoom', function (req, res, next) {
  res.render('im/imRoom');
});


let host = 'localhost'
app.listen(3001, function () {
  console.log('http://' + host + ':3001')
  return host
});
