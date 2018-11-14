<template>
    <div class="back_top" @click="backTop">
      <i class="back_top_btn iconfont icon-fanhuidingbu"></i>
    </div>
</template>

<script>
	export default {
      mounted(){
          // 包裹订单列表的元素滚动监听
          let listDom = document.querySelector(".orders_container");
          listDom.addEventListener('scroll',function (ev) {
              if(listDom.scrollTop > 100){
                  document.querySelector(".back_top").style.display = "block";
              }else {
                  document.querySelector(".back_top").style.display = "none";
              }
          },false);
      },
      methods: {
          backTop(){
              document.querySelector(".back_top").classList.toggle("animate_top");
              clearInterval(timer);
              let timer = setInterval( function(){
                  //获取滚动条的滚动高度
                  let scrollTop = document.querySelector(".orders_container").scrollTop;
                  //用于设置速度差，产生缓动的效果
                  let speed = Math.floor(-scrollTop / 7);
                  document.querySelector(".orders_container").scrollTop = scrollTop + speed; // 用纯数字赋值
                  if(scrollTop === 0) {
                      clearInterval(timer);
                      document.querySelector(".back_top").classList.toggle("animate_top");
                  }
              },30 );
          }
      },
	}
</script>

<style lang="scss" scoped>
    .back_top {
        display: none;
        position: fixed;
        right: pxToRem(60);
        top: 90%;
        transition: 800ms;
        i {
          font-size: pxToRem(80);
          color: #333;
        }
        &.animate_top {
            top: -100px;
            i { color: #0facf7 };
        }
    }
</style>
