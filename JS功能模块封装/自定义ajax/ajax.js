var getXmlHttpRequest = function () {
    if (window.XMLHttpRequest) {
        //主流浏览器提供了XMLHttpRequest对象
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //低版本的IE浏览器没有提供XMLHttpRequest对象
        //所以必须使用IE浏览器的特定实现ActiveXObject
        return new ActiveXObject("Microsoft.XMLHttpRequest");
    }
};

var mixinObj = function (obj1, obj2) {
    for(var i in obj2){
        obj1[i] = obj2[i]
    }
    return obj1
}

/**
 * 处理地址栏（window.location）
 * 将对象的键和值拼接到地址栏上
 * @param href  eg:"www.baidu.com?status=1&orderId=2"
 * @param data  {productType:"zcb"}
 * @returns {string|*}      www.baidu.com?productType=zcb /  www.baidu.com?status=1&productType=zcb   / www.baidu.com?status=1&orderId=2&productType=zcb
 */
function addStrQuery(url,data) {
    var str=url.indexOf("?")===-1?"?":"&";
    for(var k in data){
        str += k+"="+data[k]+"&"
    }
    url += str.substring(0,str.length-1);
    return url
}

function ajax(params) {
    var props = mixinObj({
        type: 'GET',
        url: '',
        headers: {},
        data:{},
        formData: {
            name: '',
            files: [], // 文件上传时的文件对象
        },
        onProgress:function () {},
        onError:function () {},
        success: function () {},
        fail: function () {},
        complete: function () {}
    },params)


    // 初始化xhr对象
    var xhr = getXmlHttpRequest();
    var url = null;
    var sendInfo = null;

    if (props.type.toUpperCase() === 'GET') {
        url = addStrQuery(props.url, props.data)
        sendInfo = null
    } else if (props.type.toUpperCase() === 'POST') {
        url = props.url
        sendInfo = JSON.stringify(props.data)

        if (props.formData.name !== '' && (props.formData.files.length > 0)){
            var formData = new FormData()
            // for (var i=0; i<props.formData.files.length; i++) {
            //     formData.append(props.formData.name,props.formData.files[i]);
            // }
            formData.append(props.formData.name,props.formData.files);
            sendInfo = formData
        }
    }

    xhr.open(props.type,url,true);
    // 设置header ,必须在open之后
    for(var i in props.headers){
        xhr.setRequestHeader(i, props.headers[i])
    }

    xhr.send(sendInfo)
    xhr.onreadystatechange = function (){
        if(xhr.readyState===4 && xhr.status===200) {
            props.success(JSON.parse(xhr.responseText));
        }else{
            props.fail(xhr.status)
        }
        props.complete(xhr)
    };
}