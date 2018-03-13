function ajax(object) {
    var props = {
        type: "GET",
        url: "",
        data:{},
        file:{
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
        xhr.open(props.file.method,props.url,true);
        for(var i in props.headers){xhr.setRequestHeader(i, props.headers[i]);}
        var formData = new FormData();
        for(var i=0;i<el.files.length;i++){
            formData.append(name,el.files[i]);
        }
        // fileAppend(props.file.el,props.file.name);
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

function addHrefQuery(href,data) {
    var str=href.indexOf("?")===-1?"?":"&";
    for(var k in data){
        str += k+"="+data[k]+"&"
    }
    href+= str.substring(0,str.length-1);
    return href
}

function fileAppend(el,name) {
    var formData = new FormData();
    for(var i=0;i<el.files.length;i++){
        formData.append(name,el.files[i]);
    }
    return formData
}