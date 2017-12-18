/**
 * Created by gaofa on 2017/12/18.
 */
$.ajax({
    url: cmnUrl + '/v1/cmn/user/list',
    type: "get",
    data: search(),
    headers: {
        Authorization: 'Bearer ' + $.cookie('jubao_admin')
    },
    success: function(res) {
        JtoExcel(res.rows, '用户列表', 'sheet', [
            ['公司', 'company_name'],
            ['用户名', 'realname'],
            ['手机号', 'mobile'],
            ['用户角色', 'role', bind_role],
            ['用户类型', 'parent_id', bind_user_type],
            ['状态', 'disabled', bind_status],
            ['注册时间', 'created_at', fun_date_formate]
        ])
        loading('close')
    }
})

function JtoExcel(data, filename, sheetname, convert){
    var tables = [];
    data.forEach(function(elem, index){
        var table = {};
        convert.forEach(function(item, inx){
            table[convert[inx][1]] = data[index][convert[inx][1]];
            if(typeof convert[inx][2] == 'function') table[convert[inx][1]] = convert[inx][2](table[convert[inx][1]],elem,index)
        })
        tables.push(table);
    });
    var sheetheader = [];
    convert.forEach(function(elem,index){
        sheetheader.push(elem[0])
    });
    var option={};
    option.fileName = filename;
    option.datas=[
        {
            sheetData:tables,//数据
            sheetName: sheetname,
            sheetHeader:sheetheader,//设置表头
        }];
    var toExcel=new ExportJsonExcel(option);
    toExcel.saveExcel();
    debugger;
}