const ajax = require("./2.js");
var token ="13092|OBEq22aNG9wH71Pt4FFBg3ou/anVsXEbbaiVGu+MJA9AIzq633lPpn5T14wmaJ2fvUbTG7VFytGvZaruUyfTag==";

document.getElementById("get").onclick=function getData() {
    ajax({
        type:"get",
        url:"http://test.jubao56.com"+"/v1/cmn/province/list",
        success:function (res) {
            document.getElementById("text").innerHTML=JSON.stringify(res);
            console.log(res)
        }
    })

}

document.getElementById("post").onclick=function postData() {
    ajax({
        type: "post",
        url: "http://test.jubao56.com"+"/v1/zcb/order/save",
        data:{
            beneficiary: "武汉双视角保险理赔咨询有限公司",
            coverage: 500000,
            cargos:[
                {file_url: "http://test.jubao56.com/res/2018/03/07/17/4942356/小兔子.jpg"}
            ],
            end_city: "南京市",
            end_province: "江苏省",
            id: 53445,
            plate_extra_no: "1",
            plate_no: "asdf123",
            policyholder: "武汉双视角保险理赔咨询有限公司",
            start_city: "武汉市",
            start_province: "湖北省"
        },
        headers:{"Authorization":"Bearer "+token},
        success:function (res) {
            document.getElementById("text").innerHTML=JSON.stringify(res);
            console.log(res)
        }
    })
}

document.getElementById("upload").onchange=function upload() {
    ajax({
        type:"upload",
        url: "http://test.jubao56.com"+"/res/file/upload",
        headers:{"Authorization":"Bearer "+token},
        upload:{
            el:document.getElementById("upload"),
            name:"fileVal",
            method:"POST"
        },
        success:function (res) {
            document.getElementById("text").innerHTML=JSON.stringify(res);
            console.log(res)
        },
        fail:function (err) {
            console.log(err)
        }
    })
}