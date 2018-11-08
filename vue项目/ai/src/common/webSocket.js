/**
 * Created by lyuwei
 * User: lvwei@seemmo.com
 * Date: 2018/09/10
 * Describe:
 * Log:
 *  ---- 2018/09/10 17:46 [lyuwei] 初次添加
 */
import services from './service';
import tools from './tools';

let socket = null;

export let wsChannelId = null;

export function connectSocket(userId, groupId, callback) {
    if (!window.WebSocket) {
        tools.notify('当前浏览器不支持websocket', 'error', '错误');
        return;
    }
    if (socket) {
        socket.close();
    }
    services.getBSLogic().then((res) => {
        let url = `ws://${res.pushwsserver[0].ip}:${res.pushwsserver[0].port}/websocket`;

        socket = new WebSocket(url);
        socket.onmessage = (event) => {
            let jsonOperation = JSON.parse(event.data);
            let jsonData = typeof jsonOperation.data === 'string' ? JSON.parse(jsonOperation.data) : jsonOperation.data;

            if (jsonOperation.operation !== 'registerResult') {
                responseMsg(jsonOperation.messageId);
            } else {
                wsChannelId = jsonData.wsChannelId;
            }
            if (callback) {
                callback(jsonData);
            }
        };
        socket.onopen = () => {
            if (socket.readyState === WebSocket.OPEN) {
                let register = {};

                register.type = 'push';
                register.operation = 'register';
                register.data = {};
                register.data.clientId = userId;
                register.data.groupId = groupId;
                register.data.platform = '平台';
                socket.send(JSON.stringify(register));
            } else {
                tools.notify('WebSocket 连接没有建立成功！', 'error', '错误');
            }
        };
    });
}

export function responseMsg(message) {
    if (socket.readyState === WebSocket.OPEN) {
        let register = {};

        register.type = 'push';
        register.operation = 'dataResponse';
        register.messageId = message;
        socket.send(JSON.stringify(register));
    } else {
        tools.notify('WebSocket 连接没有建立成功！', 'error', '错误');
    }
}
