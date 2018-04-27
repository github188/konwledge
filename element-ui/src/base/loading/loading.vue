<template>
  <div class="loading" v-show="isShow">
    <span class="cicle" v-show="!isReload"></span>
    <div class="reload" v-show="isReload">
      <i class="iconfont icon-wifi"></i><br>
      网络不给力，请重新加载<br>
      <div onclick="window.location.reload()">重新加载</div>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      timeout:{type:Number,default:10000},
    },
    data(){
      return{
        timer:null,
        isShow:false,
        isReload:false
      }
    },
    methods: {
      open(){
        this.isShow = true;
        this.timer = setTimeout(()=>{
          this.isReload = true;
        },this.timeout);
      },
      close(){
        this.isShow = false;
        clearTimeout(this.timer)
      },
      loadImg(src){
        let img = new Image();
        img.onload = () =>{
          if(!this.isReload){
            this.isShow = false;
            clearTimeout(this.timer)
          }
        };
        img.src = src;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @function rem($val) {
    @return $val/28+rem;
  }
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
  }
  .cicle {
    display: inline-block;
    width: rem(75);
    height: rem(75);
  }
  .cicle:before {
    content: '';
    width: rem(75);
    height: rem(75);
    position: absolute;
    /*使用border-box盒模型，令宽高包括了content、padding和border，使得圆环能完整出现*/
    box-sizing: border-box;
    border: 4px solid rgba(0,0,0,.4);
    border-radius: 50%;   /*令其border为圆环*/
    border-top: 4px solid transparent;    /* 有1/4圆为透明 */
    animation: cicle-rotate 1s infinite linear;
    -webkit-animation: cicle-rotate 1s infinite linear;
  }
  @keyframes cicle-rotate {
    0% {
      transform: rotate(0deg)
    }
    50% {
      transform: rotate(-180deg)
    }
    100% {
      transform: rotate(-360deg)
    }
  }
  @-webkit-keyframes cicle-rotate {
    0% {
      transform: rotate(0deg)
    }
    50% {
      transform: rotate(-180deg)
    }
    100% {
      transform: rotate(-360deg)
    }
  }
  .reload{
    text-align: center;
    color: #999;
  }
  .reload .iconfont{
    font-size:rem(100);
  }
  .reload div{
    display: inline-block;
    border: 1px solid #06acf9;
    color: #06acf9;
    margin-top: 10px;
    padding: 5px 8px;
    border-radius: 5px;
  }
</style>
