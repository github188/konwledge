function Ajax(object) {
    var props = {
        type: 'GET',
        url: '',
        data:{},
        success: function () {},
        fail: function () {}
    }
    // props = Object.assign(props,object)
    for(var k in object){
        props[k] = object[k];
    }
    var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if(props.type.toUpperCase() == 'GET'){
        var queryString = '?'
        for(var k in props.data){
            queryString += k+'='+props.data[k]+'&'
        }
        props.url+= queryString.substring(0,queryString.length-1);
        xhr.open(props.type,props.url,true);
        xhr.send();
    }else if(props.type.toUpperCase() == 'POST'){
        var formData = new FormData();
        for(var k in props.data){
            formData.append(k, props.data[k]);
        }
        xhr.open(props.type,props.url,true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(formData);
    }
    xhr.onreadystatechange = function (){
        if(xhr.readyState==4&&xhr.status==200) {
            props.success(JSON.parse(xhr.responseText));
        }else {
            props.fail(xhr.status)
        }
    };
}


