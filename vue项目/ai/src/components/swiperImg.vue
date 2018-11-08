<template>
    <div style="width:100%;height:100%;">
        <el-col class="main-img" style="height:100%;">
            <div class="swiper-container" id="swiper">
                <div class="swiper-wrapper ">
                    <div class="swiper-slide" v-for="(i,idx) in imgList" :key="idx">
                        <div class="swiper-zoom-container">
                            <img :src="i" />
                        </div>
                        </div>
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
        </el-col>
        <el-col class="secondary-img" style="height:100%;">
            <ul class="tab-tool">
                <li v-for="(i,idx) in imgList" :key="idx" @click="slideTo(idx)" :class="imgActiveIndex===idx?'img-actived':'nothing'">
                    <img :src="i">
                </li>
            </ul>
        </el-col>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
let mySwiper = null;

export default {
    props: ['imgList'],
    data() {
        return {
            imgActiveIndex: 0
        };
    },
    methods: {
        initSwiper() {
            let _this = this;

            mySwiper = new Swiper('#swiper', {
                direction: 'vertical',// 竖向切换
                // mousewheel: true,// 鼠标滑轮切换
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                zoom: {
                    maxRatio: 3
                },
                on: {
                    slideChange: function () {
                        _this.imgActiveIndex = this.activeIndex;
                        console.log(_this.imgActiveIndex);
                    }
                }

            });
        },
        slideTo(idx) {
            mySwiper.slideTo(idx, 1000, false);
        }
    }
};
</script>

<style lang="less">
.main-img {
  width: 84%;
  #swiper {
    width: 100%;
    height: 100%;
    .swiper-slide {
      background: #fff;
      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
    .swiper-button-prev {
      width: 40px;
      height: 40px;
      background-image: url("../assets/up.png");
      background-size: 100%;
    }
    .swiper-button-next {
      width: 40px;
      height: 40px;
      background-image: url("../assets/down.png");
      background-size: 100%;
    }
  }
}
.secondary-img {
  margin-left: 2%;
  width: 14%;
  .tab-tool {
    height: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: space-between;
    li {
      width: 100%;
      height: 18%;
      border: 2px solid transparent;
      border-radius: 2px;
      box-sizing: border-box;

      img {
        height: 100%;
        width: 100%;
      }
    }
    .img-actived {
      border: 2px solid #18a5d6;
    }
  }
}
</style>
