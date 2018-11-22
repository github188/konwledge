<template>
  <div>
    <div class="vue">
      <div class="index">
        <div class="ivu-row-flex ivu-row-flex-middle ivu-row-flex-center"
             style="position: relative; z-index: 3;">
          <div class="ivu-col ivu-col-span-24">
            <h1 >
              <img src="~/assets/images/ivew-logo.png" class="img-logo">
              <p class="logo-text">哆&nbsp;啦&nbsp;咪</p>
            </h1>
            <h2 >加入了模块：接口简易调试</h2>
            <div class="continue">
              <!--<input type="button" value="点此继续" @click="signInFlag = true">-->
            </div>
            <div class="list">
              <router-link to="/postman">接口调试</router-link>
              <router-link to="/project">项目</router-link >
              <a href="javascript:void (0)" class="">实践</a>
              <a href="javascript:void (0)" class="">概览</a>
              <a href="javascript:void (0)" class="">iViewCli</a>
              <a href="javascript:void (0)" ><i class="ivu-icon ivu-icon-social-github"></i>GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <wave></wave>
  </div>

</template>

<script>
  import Wave from '~/components/common/wave/wave'
  export default {
    name: 'Login',
    components: {
      Wave
    },
    data () {
      return {

      }
    },
    created () {

    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  $bg: '~assets/images/bg-new.png';
  .ivu-row-flex-middle {
    -ms-flex-align: center;
    align-items: center;
  }
  .ivu-row-flex-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .ivu-row-flex {
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .ivu-row-flex, .ivu-row-flex:after, .ivu-row-flex:before {
    display: -ms-flexbox;
    display: flex;
  }

  body{
    min-height:100%;height:100%;
  }
  #indexLizi {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .index {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: #141a48;
    background-image: url($bg);
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }

  .ivu-row-flex{
    height: 100%;
  }
  .list a {
    color: #0099fb;
    font-size: 16px;
    display: inline-block;
    padding: 10px;
    position: relative;
    transition: color .3s;
  }

  a {
    color: #2d8cf0;
    background: 0 0;
    text-decoration: none;
    outline: 0;
    cursor: pointer;
    transition: color .2s ease;
  }

  .list {
    margin: 40px 0 200px;
  }
  .list a:hover {  color: #fff;  }

  .list a:after, .list a:before {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: #fff;
    content: "";
    opacity: 0;
    transition: opacity .3s,-webkit-transform .3s;
    transition: opacity .3s,transform .3s;
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  .list a:before {  top: 0;  -webkit-transform: translateY(-10px);  transform: translateY(-10px);  }
  .list a:after {  bottom: 0;  -webkit-transform: translateY(10px);  transform: translateY(10px);  }

  .list a:hover:after, .list a:hover:before {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  .list a:hover:after, .list a:hover:before {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  h1 img{
    display: block;
    margin: 0 auto;
  }
  h1 .img-logo{
    width: 90px;
    height: 90px;
  }
  h1 .img-name{
    width: 90px;
    height: 40px;
    position: relative;
    left: 0;
  }
  h2{
    color: #fff;
    font-weight: normal;
    margin-top: 50px;
    font-size: 16px;
  }

  .logo-text{
    color:#fff;
    font-size:26px;
  }
  .header{
    position: absolute;
    right:0;top:0;
    z-index:5;
    width:100%;
    height:50px;
  }
  .header .list{
    margin:0;padding:0;
    height:100%;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    float:right;
    margin-right:30px;
  }
  .continue {
    padding: 10px;
  }
  .continue input{
    display: inline-block;
    width: 120px;
    height: 36px;
    border: 1px solid #20a0ff;
    border-radius: 5px;
    background: #0099fb;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  .login-box {
    width: 360px;
    height: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -110px;
    margin-left: -180px;
    padding: 50px 25px 50px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
  }
  .form-item {
    margin-bottom: 22px;
  }
  .form-item input {
    width: 100%;
    display: inline-block;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .form-item.btn input,
  .form-item.btn input:hover{
    font-size: 16px;
    cursor: pointer;
    color: #fff;
    background-color: #cb2431;
    background-image: linear-gradient(-180deg, #de4450 0%, #cb2431 90%);
    border-color: rgba(27,31,35,0.5);
  }
  .form-item input:hover {
    border-color: #8391a5;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 18px;
    color: #666;
    cursor: pointer;
  }
  .close:hover {
    color: #000;
  }
</style>
