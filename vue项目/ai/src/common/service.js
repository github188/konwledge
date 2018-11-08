/**
 * Created by lyuwei
 * User: lvwei@seemmo.com
 * Date: 2018/09/10
 * Describe:
 * Log:
 *  ---- 2018/09/10 14:25 [lyuwei] 初次添加
 */
import serviceBase from './serviceBase';

// const urlLoaction = 'http://' + window.location.host;
const urlLoaction = 'http://192.168.2.92:8080'; // 测试地址
const gisService = 'http://' + window.location.host + '/map/';

window.GISService = gisService;
window.ctxPath = urlLoaction;


export const URLS = {
    gettollgateinfo: urlLoaction + '/business/gettollgateinfo.php',//卡口
    bs: urlLoaction + '/client/bs.php',
    push: urlLoaction + '/common/push.php',
    menulogic: urlLoaction + '/auth/menulogic.php',//菜单
    faceLib: urlLoaction + '/business/face_lib.php',//人像库
    channelConfig: urlLoaction + '/business/channel_config.php',//通道
    faceSearch: urlLoaction + '/client/face_search.php',//人脸检索
    illegalQuery: urlLoaction + '/business/IllegalQuery',//违法查询,
    role: urlLoaction + '/business/basic/role/get'
};

const deviceManage = {
    imageLocation: urlLoaction + '/business/image/get',
    // 导入设备列表的url
    systemDeviceImportUrl: urlLoaction + '/system/device/import',
    signDeviceImportUrl: urlLoaction + '/system/device/import',
    // urlLoaction + '/test/task/list'
    getProjectList(params, axiosParams) {
        return serviceBase.request(urlLoaction + '/system/project/list', params, axiosParams);
    },
    addProjectList(params) {
        return serviceBase.request(urlLoaction + '/system/project/add', params, {method: 'post'});
    },
    getDeviceTree(params, axiosParams) {
        return serviceBase.request(urlLoaction + '/system/device/tree', params, axiosParams);
    },
    addDevice(params) {
        return serviceBase.request(urlLoaction + '/system/device/add', params, {method: 'post'});
    },
    getDeviceDetail(params) {
        return serviceBase.request(urlLoaction + '/system/device/detail', params);
    },
    deleteDevice(params) {
        return serviceBase.request(urlLoaction + '/system/device/delete', params);
    },
    updateDevice(params) {
        return serviceBase.request(urlLoaction + '/system/device/update', params, {method: 'post'});
    },
    getDeviceImageList(params) {
        return serviceBase.request(urlLoaction + '/system/device/imagelist', params);
    },
    getDeviceIllegallist(params) {
        return serviceBase.request(urlLoaction + '/system/device/illegallist', params);
    },
    getDeviceCarWayCodes(params) {
        return serviceBase.request(urlLoaction + '/system/device/get', params);
    },
    getLabelpageList(params ) {
        return serviceBase.request(urlLoaction + '/test/illegal/labelpage/list', params);
    },
    getTestTaskList(params ) {
        return serviceBase.request(urlLoaction + '/test/task/list', params);
    },
    taskExecutorAdd(params ) {
        return serviceBase.request(urlLoaction + '/test/task/executor/add', params);
    },
    taskExecutorGet(params ) {
        return serviceBase.request(urlLoaction + '/test/task/executor/get', params);
    }
};

// 首页和统计的接口
const homeAndStatistics = {
    detail(params) {
        return serviceBase.request(urlLoaction + '/statistics/detail', params);
    },
    audittrend(params) {
        return serviceBase.request(urlLoaction + '/statistics/audittrend', params);
    },
    index(params) {
        return serviceBase.request(urlLoaction + '/statistics/index', params);
    },
    waiter(params) {
        return serviceBase.request(urlLoaction + '/statistics/waiter', params);
    },
    illegalCount(params) {
        return serviceBase.request(urlLoaction + '/business/IllegalCount', params, {method: 'post'});
    },
    statisticsVehicleTypeCount(params) {
        return serviceBase.request(urlLoaction + '/business/statisticsVehicleTypeCount', params, {method: 'post'});
    },
    wrongRank(params) {
        return serviceBase.request(urlLoaction + '/business/WrongRank', params, {method: 'post'});
    }
};

export default {
    // request: serviceBase.request,
    // 用户登录
    login: function (params, axiosParams) {
        return serviceBase.request(urlLoaction + '/business/basic/user/login', params, axiosParams);
    },
    // 用户退出
    logout: function (params, axiosParams) {
        return serviceBase.request(urlLoaction + '/business/basic/user/logout', params, axiosParams);
    },
    // 获取登陆态
    isLogin: function (params, axiosParams) {
        return serviceBase.request(urlLoaction + '/business/basic/user/islogin', params, axiosParams);
    },
    // 获取菜单
    getMenu: function (params, axiosParams) {
        return serviceBase.request(urlLoaction + '/business/basic/menu/get', params, axiosParams);
    },
    // 获取违法审核查询结果
    getCheckResult: function (params, axiosParams) {
        return serviceBase.request(urlLoaction + '/test/illegal/check/list', params, axiosParams);
    },
    // 违法初审数据查询
    firstCheckQuery: function (params, axiosParams) {
        return serviceBase.request(urlLoaction + '/business/check/firstCheckQuery', params, axiosParams);
    },
    // 违法初审修改数据
    firstCheck: function (params, axiosParams) {
        return serviceBase.request(urlLoaction + '/business/check/firstCheck', params, axiosParams);
    },
    // 删除任务
    deleteTask: function (params, axiosParams) {
        return serviceBase.request(urlLoaction + 'test/task/delete', params, axiosParams);
    },
    // 获取菜单
    getMenuLogic: function (params, axiosParmas) {
        return serviceBase.request(URLS.menulogic, params, axiosParmas);
    },
    // 获取通道数据
    getChannelLogic: function (params, axiosParmas) {
        return serviceBase.request(URLS.channelConfig, params, axiosParmas);
    },
    getFaceLib: function (params, axiosParmas) {
        return serviceBase.request(URLS.faceLib, params, axiosParmas);
    },
    searchFace: function (params, axiosParmas) {
        return serviceBase.request(URLS.faceSearch, params, axiosParmas);
    },
    getStatistics: function (params, axiosParmas) {
        return serviceBase.request(URLS.statistics, params, axiosParmas);
    },
    getBSLogic: function (params, axiosParmas) {
        return serviceBase.request(URLS.bs, params, axiosParmas);
    },
    getPushLogic: function (params, axiosParmas) {
        return serviceBase.request(URLS.push, params, axiosParmas);
    },
    getGettollgateinfo: function (params, axiosParmas) {
        return serviceBase.request(URLS.gettollgateinfo, params, axiosParmas);
    },
    getRole: function () {
        return serviceBase.request(URLS.role);
    },
    // 获取用户
    getUser: function (params) {
        return serviceBase.request(urlLoaction + '/business/basic/user/search', params, {method: 'POST'});
    },
    // 新增用户
    userAdd: function (params) {
        return serviceBase.request(urlLoaction + '/business/basic/user/add' , params , {method: 'POST'});
    },
    // 删除用户
    userDelete: function (params ) {
        return serviceBase.request(urlLoaction + '/business/basic/user/delete' , params );
    },
    // 更新用户
    userUpdate: function (params ) {
        return serviceBase.request(urlLoaction + '/business/basic/user/update' , params , {method: 'POST'} );
    },
    // 查询用户
    userSearch: function (params ) {
        return serviceBase.request(urlLoaction + '/business/basic/user/search' , params , {method: 'POST'} );
    },
    // 更新密码
    updatePasswd: function (params ) {
        return serviceBase.request(urlLoaction + '/business/basic/user/updatepassword' , params , {method: 'POST'} );
    },
    // 重置密码
    resetPsd: function (params) {
        return serviceBase.request(urlLoaction + '/business/basic/user/resetpassword' , params);
    },
    // 查询系统日志
    sysLogSearch(params) {
        return serviceBase.request(urlLoaction + '/business/basic/systemlog/search', params);
    },
    // 新增操作日志
    sysLogAdd(params) {
        return serviceBase.request(urlLoaction + '/business/basic/systemlog/add' , params , {method: 'POST'});
    },
    // 设备管理
    ...deviceManage,
    // 首页和统计的接口
    ...homeAndStatistics
};
