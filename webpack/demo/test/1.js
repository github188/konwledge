module.exports = function addHrefQuery(href,data) {
    var str=href.indexOf("?")===-1?"?":"&";
    for(var k in data){
        str += k+"="+data[k]+"&"
    }
    href+= str.substring(0,str.length-1);
    return href
}