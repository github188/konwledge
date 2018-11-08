<template>
  <wrapper>
    <v-header title="选择开票保单" className="border-bottom"></v-header>
    <div class="content">
      <div class="one-day" v-for="(day,dayIndex) in listAll">
        <p class="title f28" @click="controlDayChoose(dayChoosed(day.orders),day.orders)">
          <span class="time">{{day.date}}</span>
          <i class="icon-checkbox iconfont f40" :class="dayChoosed(day.orders)?'blue':'deepgray'"></i>
        </p>
        <ul class="one-order" v-for="(order,index) in day.orders">
          <li>
              <span class="date" @click="order.checked=!order.checked">
                <i class="icon-checkbox iconfont f40" :class="order.checked?'blue':'gray'"></i>
              </span>
            <div class="order f28">
              <p>投保时间：{{order.createTime}}</p>
              <p>订单号：{{order.trackNo}}</p>
              <p>投保人：{{order.policyholder}}</p>
              <p>被投保人：{{order.beneficiary}}</p>
            </div>
            <span class="text blue f30">{{order.coverage}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="bottom">
      <p class="total-count f28"><span class="blue">{{totalCount}}</span>个保单，共<span class="blue">{{totalPrice.toFixed(2)}}</span>元（满{{minPrice}}元申请开票）</p>
      <div class="section">
          <span class="choose-all">
          <!--<i class="iconfont icon-checkbox blue f40"></i>-->
             <i class="icon-checkbox iconfont f40" :class="allChoosed(listAll)?'blue':'gray'" @click="controlAllChoose(allChoosed(listAll),listAll)"></i>
          <span class="f36">全选</span>
          </span>
        <span class="next f40" @click="nextStep">下一步</span>
      </div>
    </div>
  </wrapper>
</template>

<script>

  export default {
    data() {
      return {
        listAll:[
          {date:"2018年05月",
            orders:[{createTime:"2018-05-21 16:40",trackNo:"ZTG24569884669890",policyholder:"大道物流有限公司",beneficiary:"大道物流有限公司",coverage:5600,checked:true},{createTime:"2018-05-21 16:40",trackNo:"ZTG24569884669890",policyholder:"大道物流有限公司",beneficiary:"大道物流有限公司",coverage:5600,checked:true}]},
          {date:"2018年05月",
            orders:[{createTime:"2018-05-21 16:40",trackNo:"ZTG24569884669890",policyholder:"大道物流有限公司",beneficiary:"大道物流有限公司",coverage:5600,checked:true},{createTime:"2018-05-21 16:40",trackNo:"ZTG24569884669890",policyholder:"大道物流有限公司",beneficiary:"大道物流有限公司",coverage:5600,checked:true}]},
          {date:"2018年05月",
            orders:[{createTime:"2018-05-21 16:40",trackNo:"ZTG24569884669890",policyholder:"大道物流有限公司",beneficiary:"大道物流有限公司",coverage:5600,checked:true},{createTime:"2018-05-21 16:40",trackNo:"ZTG24569884669890",policyholder:"大道物流有限公司",beneficiary:"大道物流有限公司",coverage:5600,checked:true}]},
        ],
        totalCount:0,
        totalPrice:0,
        minPrice:5000,
      }
    },
    created() {

    },
    watch:{
      listAll:{
        deep:true,
        handler(newValue,oldValue){
          let count = 0 ;
          let price = 0 ;
          newValue.forEach((value)=>{
            value.orders.forEach((val)=>{
              if(val.checked){
                count++;
                price+=val.coverage*1
              }
            })
          });
          this.totalCount = count;
          this.totalPrice = price ;
        },
      }
    },

    methods: {
      dayChoosed(orders){
        return orders.every((val,idx)=>{
          return val.checked
        })
      },
      controlDayChoose(checked,orders){
        orders.forEach((val,idx)=>{
          val.checked=!checked
        });
      },
      allChoosed(listAll){
        return listAll.every((val,idx)=>{
          return this.dayChoosed(val.orders)
        })
      },
      controlAllChoose(checked,listAll){
        listAll.forEach((value,index)=>{
          value.orders.forEach((val,idx)=>{
            val.checked=!checked
          })
        })
      },
      nextStep(){
        this.$router.push("/invoiceEditor")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    position: absolute;
    left:0;right:0;top:pxToRem(90);bottom:pxToRem(100);
    overflow-y: scroll;
  }

  .bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: pxToRem(100);
    width: 100%;
    background: $white;
  }
  //.f6就是font-size为6px

  .invoice-order-list {
    background: $gray;
  }

  .content{
    bottom:pxToRem(160);
  }
  .bottom{
    height:pxToRem(100+60);
    .total-count{
      @include border-1px("top");
      background: #fff;
      height:pxToRem(60);
      line-height:pxToRem(60);
      text-indent: pxToRem(40);
    }
    .section{
      @include border-1px("top");
      height:pxToRem(100)
    }
  }
  .border-bottom{
    @include border-1px("bottom");
  }

  .invoice-order-list {
    background: $gray;
  }

  .deepgray{
    color: $borderColor;
  }
  .one-day{
    .title{
      height:pxToRem(70);
      width:50%;
      display: flex;
      align-items: center;
      margin-left:pxToRem(40);
      i{
        margin-left:pxToRem(10);
      }
    }
    ul.one-order {
      background: $white;
      li {
        display: flex;
        @include border-1px("bottom");
        .date {
          flex: 3;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .order {
          flex: 16;
          p{
            padding:pxToRem(7) 0;
          }
        }
        .text {
          flex: 4;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .section{
    display: flex;
    .choose-all{
      background: #fff;
      flex:2;
      display: flex;
      align-items: center;
      margin-left:pxToRem(40);
      i{
        margin-right:pxToRem(15)
      }
    }
    .next{
      background: linear-gradient(to right, #71cffb , #06acf9);
      flex:1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $white;
    }
  }

</style>
