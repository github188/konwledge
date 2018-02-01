var zcbDepositNew = function (params,success,fail) {
    return $.ajax({url:zcbUrl + "/v1/zcb/deposit/new",type: "POST",headers:getHeader(),data:JSON.stringify(params),success:success,fail:fail})
};
var zcbDepositInfo = function (params,success,fail) {
    return $.ajax({url:zcbUrl + "/v1/zcb/deposit/info",type: "GET",headers:getHeader(),data:params,success:success,fail:fail})
};
var cmnBaofuPayurl = function (params,success,fail) {
    return $.ajax({url:cmnUrl + "/v1/cmn/baofu/payurl",type: "POST",headers:getHeader(),data:params,success:success,fail:fail})
};
