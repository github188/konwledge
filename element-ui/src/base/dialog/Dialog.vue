<template>
  <transition name="dialog-show">
    <div class="Dialog" v-show="isShow">
      <div class="dialog-bg"></div>
      <div class="body">
        <div class="title" v-if="title">{{title}}</div>
        <div class="main">
          <slot></slot>
        </div>
        <div class="footer" v-if="showBtn">
          <div class="btn cancel" @click="cancel" v-show="showCancelBtn">{{cancelBtn}}</div>
          <div class="btn" @click="success">{{successBtn}}</div>
        </div>
        <div class="close" @click="cancel">
          <img src="./close.jpg" width="14" height="13">
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props:{
      title:{type:String,default:'提示'},
      showBtn:{type:Boolean,default:true},
      showCancelBtn:{type:Boolean,default:true},
      successBtn:{type:String,default:'确定'},
      cancelBtn:{type:String,default:'取消'},
      successClose:{type:Boolean,default:true},//点击确定后是否关闭弹框 默认关闭
    },
    data(){
      return{
        isShow:false,
      }
    },
    methods:{
      open(){
        this.isShow = true;
      },
      close(){
        this.isShow = false;
      },
      cancel(){
        this.isShow = false;
        this.$emit('cancel');
      },
      success(){
        if(this.successClose) this.isShow = false;
        this.$emit('success');
      },
    }
  }
</script>
<style lang="scss"  scoped>
  .Dialog{
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    .dialog-bg{
      position: absolute;
      left:0;top:0;
      width: 100%;
      height: 100%;
      opacity:1;
      background: rgba(0,0,0,.5);
    }
    .body{
      position: relative;
      width: 90%;
      min-height: 50px;
      border-radius: 5px;
      background: #fff;
      font-size: 16px;
      .title{
        display: flex;
        font-weight: bold;
        align-items: flex-end;
        justify-content: center;
        padding-top: 10px;
        height: 35px;
      }
      .footer{
        height: 40px;
        font-size: 0;
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: space-around;
        .btn{
          box-sizing: border-box;
          float: left;
          min-width: 50%;
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 16px;
          color: #06acf9;
          &.cancel{
            color: #333;
            border-right: 1px solid #ccc;
          }
        }
      }
      .close{
        font-size: 0;
        position: absolute;
        top:10px;
        right: 10px;
      }
    }
  }
  .dialog-show-enter-active{
    transition: all .2s ;
    .body,.dialog-bg{
      transition: all .2s ;
    }
  }
  .dialog-show-leave-active{
    transition: all .2s;
    .body,.dialog-bg{
      transition: all .2s;
    }
  }
  .dialog-show-enter{
    .dialog-bg{
      opacity:.5;
    }
    .body{
      transform: scale(1.1);
      opacity:.7;
    }
  }
  .dialog-show-leave-to{
    .dialog-bg{
      opacity:.3;
    }
    .body{
      transform: scale(.8);
      opacity:0;
    }
  }
</style>
