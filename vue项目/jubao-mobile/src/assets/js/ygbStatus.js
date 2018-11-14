class YgbOrderStatus {//员工保保单状态码
  constructor(){
    this.arr =  [
      {status:0,msg:'未知状态',name:'unKnow'},
      {status:1,msg:'待支付',name:'unPaid'},
      {status:2,msg:'已取消',name:'cancelled'},
      {status:4,msg:'已生效',name:'paid'},
      {status:8,msg:'已过期',name:'expired'},
      {status:16,msg:'理赔中',name:'claiming'},
      {status:32,msg:'理赔完成',name:'claimed'},
      {status:64,msg:'待上传盖章后的投保单',name:'fileWaitForm'},
      {status:128,msg:'已支付,待出单',name:'fileWaitForm'},
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
export let ygbOrderStatus = new YgbOrderStatus();


class YgbEmployeeStatus {//员工保定单中各人员的状态码 ps：可用状态和出险状态一起未已生效状态
  constructor(){
    this.arr = [
      {status:0,msg:'未知状态',name:'unKnow'},
      {status:1,msg:'已生效',name:'enabled'},
      {status:2,msg:'未生效',name:'disabled'},
      {status:4,msg:'已删除',name:'deleted'},
      {status:8,msg:'出险锁定',name:'locked'},
      {status:16,msg:'已过期',name:'expired'}
    ]
  }
  nameGetStatus(name){
    return this.arr.filter(item=>item.name === name)[0].status;
  }
  msgGetStatus(msg){
    return this.arr.filter(item=>item.msg === msg)[0].status;
  }
  statusGetMsg(status){
    return this.arr.filter(item=>item.status*1 === status)[0].msg;
  }
}
export let ygbEmployeeStatus = new YgbEmployeeStatus();
