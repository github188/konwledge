<template>
  <div class="reco-item">
    <div class="reco-box">
      <div class="reco-title">{{ title }}</div>
      <div class="reco-content" >
        <div ref="recoBox" class="reco-card-wrapper" >
          <!--<reco-card v-for="(val,idx) in itemList" :key="idx" :info="val"></reco-card>-->   <!-- 用js冬天生成替换-->
        </div>
      </div>
    </div>
    <div class="reco-blank"></div>
  </div>
</template>

<script>
  const recoCardStr = (info) => `
  <div class="pic">
    <img src="${info.img}" alt="">
  </div>
  <div class="content">
    <div class="main-text"><i class="iconfont icon-motuoche"></i><span>${info.car}</span></div>
    <div class="feature"><i class="iconfont icon-xingbie"></i><span></span><span>${info.sex}</span></div>
    <div class="feature"><i class="iconfont icon-nianling"></i><span></span><span>${info.ageGroup}</span></div>
    <div class="feature"><i class="iconfont icon-tongdao"></i><span></span><span>${info.age}</span></div>
    <div class="feature"><i class="iconfont icon-shijian"></i><span></span><span>${info.time}</span>
    </div>
  </div>
`

  export default {
    name: 'RecoItem',
    props: {
      title: String,
      itemList: Array
    },
    data () {
      return {}
    },
    watch: {
      itemList (newVal, oldVal) {
        preprend(this.$refs.recoBox, recoCardStr(newVal[0]))
      }
    },
    created () {

    },
    mounted () {

    }
  }

  function preprend (el, str) {
    var card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = str
    el.insertBefore(card, el.firstElementChild)
    setTimeout(() => {
      card.className += ' reco-after'
    }, 200)
  }

</script>

<style lang="scss" scoped>
  $recoTitleBg: '~@/assets/images/recognition_title_bg.png';
  .reco-item {
    overflow: hidden;
    .reco-box {
      min-height: 156px;
      height: 156px;
      position: relative;
      .reco-title {
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        padding: 20px 10px 10px;
        margin-right: 6px;
        height: 100%;
        width: 50px;
        background: url($recoTitleBg) no-repeat center top;
        font-size: 16px;
        color: #2bb0fb;
        text-align: center;
        line-height: 32px;
      }
      .reco-content {
        display: inline-block;
        box-sizing: border-box;
        height: 100%;
        min-width: 1000px;
        width: 100%;
        padding-left: 56px;
        background: rgba(127, 110, 251, .3);
        overflow: hidden;
        .reco-card-wrapper{
          width:120%;
          height:100%;
        }
      }
    }
    .reco-blank {
      height: 25px;
      position: relative;
      &:after {
        position: absolute;
        content: ' ';
        top: 50%;
        left: 0;
        width: 100%;
        margin-left: 56px;
        border: 1px dashed #5f6bf5;
      }
    }
  }

</style>
<style lang="scss">
  .reco-item {
    .card {
      transition: all .5s;
      width: 0;
      transform: scale(0);
      transform-origin: 0 0;
      margin:0 0;
      border: 0 solid #20ebfc;

      display: inline-block;
      box-sizing: border-box;
      height: 100%;

      .pic {
        float: left;
        width: 41%;
        height: 100%;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .content {
        box-sizing: border-box;
        color: #21b5fd;
        height: 100%;
        padding-left: 6px;
        float: left;
        width: 59%;
        .main-text {
          box-sizing: border-box;
          background: -webkit-gradient(linear, 0 50%, 100% 50%, from(rgba(42, 63, 218, 1)), to(rgba(42, 63, 218, .0)));
          padding: 5px 0px;
          height: 24%;
          line-height: 1;
          i {
            font-size: 26px;
            vertical-align: middle;
          }
          span {
            font-size: 16px;
            margin-left: 10px;
            color: #20ebfc;
          }
        }
        .feature {
          box-sizing: border-box;
          line-height: 1;
          padding: 4px 0px;
          height: 14%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #20ebfc;
          i {
            font-size: 18px;
            margin-right: 5px;
          }
        }
      }
    }
    .card.reco-after {
      width: calc((100% - 72px) / 6);
      transform: scale(1);
      margin: 0 6px;
      border: 2px solid #20ebfc;
    }
  }

</style>
