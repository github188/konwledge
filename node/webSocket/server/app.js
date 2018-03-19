var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 8081;

app.listen(PORT);
/*
	*新手必读
	*function中的socket为每个客户端单独连接的socket实例，只通知当前连接用户
	*io.sockets 通知所有连接用户
	*socket.broadcast 给除了自己以外的客户端广播消息
*/
io.on('connection', function (socket) {
	for(let i=0; i<100; i++){
    	setTimeout(()=>{
    		io.sockets.emit('progress',i);
    		console.log("当前进度为",i);
    	},300*i)
    }
})

console.log('app listen at：'+PORT);

