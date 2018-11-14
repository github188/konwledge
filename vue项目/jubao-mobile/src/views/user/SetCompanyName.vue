<template>
  <!--<transition name="slide">-->
    <div class="setCompanyName">
      <v-header title="公司名称"></v-header>
      <div class="content_box">
        <div class="content">
          <div class="comp_box hasCompanyName" v-if="companyName">
            <div>
              <p class="red"><i class="iconfont icon-duigou blue"></i> 您的公司名称:</p>
              <p>{{ companyName }} </p>
            </div>
            <div class="btn_box blue_bg">
              <input class="but" @click="$router.push('/dashboard')" v-touchFeel="{color:'#0fbcf7'}" type="submit" value="返回个人中心" id="next">
            </div>
          </div>
          <div class="comp_box" v-else>
            <p>请务必输入工商注册企业名称，否则可能导致保险公司拒赔</p>
            <div class="enter_box">
              <input type="text" @input="checkCpyName" placeholder="公司名称" v-model.trim="setCompanyName">
              <span v-show="nameTip" class="red">&nbsp;{{nameTip}}</span>
            </div>
            <div class="btn_box blue_bg">
              <input @click="fillCompName" type="button" v-touchFeel="{color:'#0fbcf7'}" value="提 交">
            </div>
          </div>
        </div>
        <div class="copyright">©保险服务平台</div>
      </div>

    </div>
  <!--</transition>-->
</template>

<script>
  import { cmnUserInfo,cmnCompanyNew } from 'assets/js/api';
  import { Toast, Indicator } from 'mint-ui';
	export default {
      data() {
          return {
              companyName: '',
              setCompanyName: '',
              nameTip:'' // 设置公司名称提示
          }
      },
      created() {
          cmnUserInfo().then( res =>{
              if(res.err_code === 0) this.companyName = res.data.company_name;
          }).catch((err)=>{ console.log("cmnCompanyInfo",err) });
      },
      methods: {
          checkCpyName(){
              if(!this.setCompanyName){
                  this.nameTip="请填写公司名称"; return false;
              }else if(!this.$store.state.reg_company.test(this.setCompanyName) || this.setCompanyName.length<4){
                  this.nameTip="公司名称格式不正确"; return false;
              }else{
                  this.nameTip=''; return true;
              }
          },
          fillCompName(){
              if(this.checkCpyName()){
                  Indicator.open({text: '正在设置...', spinnerType: 'fading-circle'});
                  let data = { name: this.setCompanyName };
                  cmnCompanyNew(data).then((res)=>{
                      Indicator.close();
                      if(res.err_code === 0 ){
                          Toast({ message: '设置成功', duration: 1000 , position:'bottom'}); this.$router.push('/dashboard');
                      }else if(res.err_code === 1002 ){
                          Toast({ message: '很抱歉，您没有权限', duration: 1000 , position:'bottom'});
                      }else if(res.err_code === 1201 ){
                          Toast({ message: '公司已存在，请重新设置', duration: 1000 , position:'bottom'});
                      }else {
                          Toast({ message: res.err_msg || '未知错误', duration: 1000 , position:'bottom'});
                      }
                  }).catch((err)=>{ console.log("cmnCompanyNew",err) })
              }
          }
      },
      beforeRouteLeave( to,from,next ){
          if(to.path.toLowerCase().includes("create") && !this.companyName){
              next({ path: '/dashboard' });
          }else {
              next();
          }
      }
	}
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/user/setCompanyName.scss';
  .slide-enter-active,.slide-leave-active{
    transition:opacity .5s;
  }
  .slide-enter,.slide-leave-to{
    transform: translateY(100%);
  }
  .content_box{
    background:#fff;bottom:0;
  }
  .content{
    height: auto !important;
    min-height: 100%;
  }
  .btn_box{
    margin-bottom: pxToRem(160) !important;
  }

</style>


