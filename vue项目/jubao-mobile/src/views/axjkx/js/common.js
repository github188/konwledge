export const shipList = [
	{value:1,name:'本人'},
	{value:2,name:'子女'},
	{value:3,name:'父母'},
	{value:4,name:'配偶'},
];

class OrderStatus {//axjkx保单状态码
	constructor(){
		this.arr =  [
			{status:0,msg:'未知状态',name:'unKnow'},
			{status:1,msg:'待支付',name:'unPaid'},
			{status:2,msg:'已取消',name:'cancelled'},
			{status:4,msg:'已生效',name:'paid'},
			{status:8,msg:'已过期',name:'expired'},
			{status:16,msg:'理赔中',name:'claiming'},
			{status:32,msg:'理赔完成',name:'claimed'},
		];
	}
	nameGetStatus(name){
		return this.arr.filter(item=>item.name === name)[0].status;
	}
	msgGetStatus(msg){
		return this.arr.filter(item=>item.msg === msg)[0].status;
	}
	statusGetMsg(status){
		return this.arr.filter(item=>item.status === status)[0].msg;
	}
}
export let orderStatus = new OrderStatus();

export const isWx = ()=>{
	let ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true
	} else {
		return false
	}
};