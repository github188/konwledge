const addHrefQuery = require("./1.js");
module.exports = function ajax(object) {
    var props = {
        type: "GET",
        url: "",
        data:{},
        upload:{
            method:"POST",
            el:"",
            name:""
        },
        headers:{"Authorization":"Bearer "+""},
        success: function () {},
        fail: function () {}
    }
    // props = Object.assign(props,object)
    for(var k in object){
        props[k] = object[k];
    }
    var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

    if(props.type.toUpperCase() === "GET"){
        xhr.open(props.type,addHrefQuery(props.url,props.data),true);
        for(var i in props.headers){xhr.setRequestHeader(i, props.headers[i]);}
        xhr.send();
    }else if(props.type.toUpperCase() === "POST"){
        xhr.open(props.type,props.url,true);
        for(var i in props.headers){xhr.setRequestHeader(i, props.headers[i]);}
        xhr.send(JSON.stringify(props.data));
    }else if(props.type.toUpperCase() === "UPLOAD"){
        debugger;
        xhr.open(props.upload.method,props.url,true);
        for(var i in props.headers){xhr.setRequestHeader(i, props.headers[i]);}
        var formData = new FormData();
        for(var i=0;i<props.upload.el.files.length;i++){
            formData.append(props.upload.name,props.upload.el.files[i]);
        }
        // fileAppend(props.upload.el,props.upload.name);
        xhr.send(formData);
    }



    xhr.onreadystatechange = function (){
        if(xhr.readyState===4&&xhr.status===200) {
            props.success(JSON.parse(xhr.responseText));
        }else {
            props.fail(xhr.status)
        }
    };
}