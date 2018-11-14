<template>
  <div>
    <div class="smallImg" :style="background(url)" @click="openBigImg"></div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  export default {
  	props:{
  		url:{
  			type:String,
        required:true
      }
    },
    data(){
  		return{
  			bigShow:false,
      }
    },
    mounted(){
      let bigImgBox = document.createElement('div');
      let bigImg = document.createElement('span');
      let closeIcon = document.createElement('div');
      bigImg.style.background = '50% no-repeat';
      bigImg.style.backgroundSize = 'contain';
      bigImg.style.backgroundImage = 'url("' + this.url.replace(/\\/g, "/").replace(/\s/g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29") + '")';
			closeIcon.className = 'closeIcon';
			closeIcon.innerHTML =  `<i class="iconfont icon-cancel"></i>`;
      bigImgBox.className = 'p_bigImgBox';
			bigImgBox.appendChild(bigImg);
			bigImgBox.appendChild(closeIcon);
      let body = document.getElementsByTagName('body')[0];
      body.appendChild(bigImgBox);
			closeIcon.onclick=function () {
        bigImgBox.style.display = 'none';
			};
			this.bigImgBox = bigImgBox;
    },
    methods:{
    	openBigImg(){
				if(this.url.includes("xlsx") || this.url.includes("xls")){
					Toast({message:'此格式文件仅支持在PC端查看',position:'bottom'})
				}else{
          this.bigImgBox.style.display = 'block';
        }
      },
			background(url) {
				if(url.includes("xlsx") || url.includes("xls")){
					url = "http://test.jubao56.com/res/2018/02/09/16/4615934/excelSampleOnly.jpg";
				}
				return {
					backgroundImage: 'url("' + url.replace(/\\/g, "/").replace(/\s/g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29") + '")',
					backgroundSize:'cover',
					backgroundRepeat:'no-repeat',
					backgroundPositionX:'50%',
					backgroundPositionY:'center',
				}
			}
    },
    beforeDestroy(){
			this.bigImgBox.remove();
    }
  }
</script>
<style lang="scss" type="text/scss">
  .p_bigImgBox{
    display : none;
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #000;
    z-index: 1000;
    span{
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .closeIcon{
      position: absolute;
      top: pxToRem(-80);
      right:pxToRem(-80);
      width: pxToRem(160);
      height: pxToRem(160);
      border-radius: 50%;
      box-shadow:-2px 2px pxToRem(11) #333333;
      font-size: pxToRem(30);
      background: #fff;
      z-index: 100;
      i{
        position: absolute;
        top:50%;
        right:57%;
        font-size: pxToRem(36);
        color: #000;
      }
    }
  }
</style>
<style lang="scss" type="text/scss" scoped>
  .smallImg{
    width:pxToRem(140);height:pxToRem(140);margin:pxToRem(10);padding:0;
    border:1px solid #ccc;
  }
</style>
