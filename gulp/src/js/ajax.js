function ajax(object) {
    var props = {
        type: "GET",
        url: "",
        data:{},
        file:{
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
        if(props.file.el==="" || props.file.name===""){ //以el和name是否全部写入为判断标准，
            xhr.send(JSON.stringify(props.data));
        }else{
            var formData = new FormData();
            for(var i=0;i<props.file.el.files.length;i++){
                formData.append(props.file.name,props.file.el.files[i]);
            }
            props.file.el.value="";//这里的props.file.el是一个指针，当他做出修改时，原来的也会跟着改变
            xhr.send(formData);
        }
    }else{
        console.log("%c unexpect type for ['"+props.type+"']","color:red;")
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