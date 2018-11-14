<template>
  <div class="set_email">
      <v-header title="我的邮箱"></v-header>
    <div class="content_box">
      <div class="content">
        <div class="email_box">
          <div>
            <p class="red"><i class="iconfont icon-duigou blue"></i> 您的邮箱:</p>
            <p>{{ email ? email: "您还没有设置邮箱！" }} </p>
          </div>
        </div>
        <div class="enter_box">
          <input type="text" placeholder="请输入邮箱" v-model.trim="newEmail">
        </div>
        <div class="btn_box">
          <input class="blue_bg" @click="fillEmail" v-touchFeel="{color:'#0fbcf7'}" type="button" value="提 交">
        </div>
      </div>
      <div class="copyright">©保险服务平台</div>
    </div>
  </div>
</template>

<script>
  import { cmnUserInfo,cmnUserUpdate } from 'assets/js/api';
  import { Toast, Indicator } from 'mint-ui';
  export default {
      data() {
          return {
              email: "",
              newEmail: "",
              userId: '', // 用户id
              phone: '',  // 用户手机
          }
      },
      created() {
          Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
          cmnUserInfo().then( res =>{
              Indicator.close();
              if(res.err_code === 0) {
                  this.email = res.data.email;
                  this.phone = res.data.mobile;
                  this.userId = res.data.id;
              }
          }).catch((err)=>{ console.log("cmnCompanyInfo",err) });
      },
      methods: {
          fillEmail(){
              if(!this.newEmail){
                  Toast({ message: '请输入邮箱地址！', duration: 1000 , position:'bottom'}); return false;
              }else if(!this.$store.state.reg_email.test(this.newEmail)){
                  Toast({ message: '请输入正确邮箱地址!', duration: 1000 , position:'bottom'});  return false;
              }else {
                  Indicator.open({text: '正在修改...', spinnerType: 'fading-circle'});
                  let data = { "id": this.userId,"mobile": this.phone,"email": this.newEmail };
                  cmnUserUpdate(data).then((res)=>{
                      Indicator.close();
                      if(res.err_code === 0){
                          Toast({ message: '修改成功!', duration: 1000 , position:'bottom'});
                          this.email = res.data.email;
                          this.$router.push('/dashboard');
                      }else if(res.err_code === 1008){
                          Toast({ message: '此邮箱已被占用!', duration: 1000 , position:'bottom'});
                      }else {
                          Toast({ message: res.err_msg || '未知错误', duration: 1000 , position:'bottom'});
                      }
                  }).catch((err)=>{ console.log("cmnUserUpdate",err) })
              }
          },
      }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/user/setEmail.scss';
  .content_box{
    background:#fff;bottom: 0;
  }
  .content{
    height: auto !important;
    min-height: 100%;
  }
  .btn_box{
    margin-bottom: pxToRem(140);
  }
</style>


