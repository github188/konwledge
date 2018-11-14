<template>
  <div class="info_box">
    <div class="info_item" v-for="(info,index) in manualInfoList">
      <div class="info_item_box">
        <span>运单号</span><input type="text" v-model.trim="info.track_no" placeholder="请填写运单号码">
      </div>
      <div class="info_item_box">
        <span>始发地</span><input type="text" v-model.trim="info.beginning" placeholder="请填写至市级">
      </div>
      <div class="info_item_box">
        <span>目的地</span><input type="text" v-model.trim="info.destination" placeholder="请填写至市级">
      </div>
      <div class="info_item_box">
        <span>货物名称</span><input type="text" v-model.trim="info.name" placeholder="请注意不保货物">
      </div>
      <div class="info_item_box">
        <span>货物数量</span><input type="number" v-model.trim="info.quantity" placeholder="数值只能保留两位小数">
      </div>
      <div class="info_item_box">
        <span>计量单位</span><input type="text" v-model.trim="info.unit" placeholder="请填写计量单位">
      </div>
      <div class="delete">
        <span @click="addManualInfo()">新增清单</span>
        <span @click="emptyInfo()" v-if="index === 0">清空信息</span>
        <span @click="deleteInfo(index)" v-else>删除清单</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox,Toast} from "mint-ui"
    export default {
        props:{
          manualInfoList:Array
        },
        data() {
            return {

            }
        },
        created() {

        },
        methods: {
          // 新增手动清单
          addManualInfo(){
            this.manualInfoList.push({id:0,track_no:"",beginning:"",destination:"",name:"",quantity:"",unit:""});
          },
          // 清空手动清单
          emptyInfo(){
            let temp = {id:0,track_no:"",beginning:"",destination:"",name:"",quantity:"",unit:""};
            this.manualInfoList.splice(0,1,temp);
          },
          // 删除手动清单
          deleteInfo(index){
            MessageBox.confirm('确定删除清单?').then(action => {
              this.manualInfoList.splice(index, 1);
              Toast({message:'删除成功！', duration: 1000, position:'bottom'});
            }).catch(err=>{})
          },
          // check手动输入信息
          checkManuaInfoList(){
            function delOthers(L){
              delete L.created_at;
              delete L.file_deleted;
              delete L.id;
              delete L.order_id;
              return L
            }

            let errArr = [];
            if(this.manualInfoList.map((item)=>Object.values(delOthers(item)).every(L => !L)).every(L => L)){ //判断用户是否完全没有手动输入
              errArr.push('allNotEnter')
            }else{
              this.manualInfoList.forEach( (item,index) =>{
                if(!item.track_no) { errArr.push(`请输入第${index + 1}个清单运单号`); return false; }
                if(!item.beginning) { errArr.push(`请输入第${index + 1}个清单始发地`); return false; }
                if(!item.destination) { errArr.push(`请输入第${index + 1}个清单目的地`); return false; }
                if(!item.name) { errArr.push(`请输入第${index + 1}个清单货物名称`); return false; }
                if(!item.quantity) { errArr.push(`请输入第${index + 1}个清单货物数量`); return false; }
                if(!item.unit) { errArr.push(`请输入第${index + 1}个清单计量单位`); return false; }
              });
            }
            return errArr.length !== 0 ? errArr[0] : ""; // 两种情况： 验证未通过（输入错误和未输入）和验证通过（输入正确）
          },
          showManualList(cargos){
            cargos.forEach((L,idx)=>{
              if(!L.file_url){
                L.quantity = L.quantity / 100;
                this.manualInfoList.push(L)
              }
            });

            if(!this.manualInfoList.length){
              this.addManualInfo();
            }
          },
        }
    }
</script>

<style lang="scss" scoped>
  .info_box {
    padding: pxToRem(20) 0;
    .info_item {
      .info_item_box {
        display: flex;
        width: pxToRem(600);
        margin: 0 auto;
        align-items: center;
        border-bottom: 1px solid #eee;
        span {
          width: pxToRem(160);
        }
        input {
          flex: 1;
          border-radius: pxToRem(8);
          height: pxToRem(60);
          padding-left: pxToRem(16);
          font-size: pxToRem(26);
        }
      }
      .delete {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: pxToRem(80);
        text-align: right;
        background: #fff;
        padding: 0 pxToRem(20);
        &>span {
          display: inline-block;
          width: pxToRem(160);
          height: pxToRem(60);
          line-height: pxToRem(60);
          border: 1px solid #00a0e9;
          text-align: center;
          color: #333;
          border-radius: pxToRem(50);
          margin-right: pxToRem(20);
        }
      }
    }
  }
</style>
