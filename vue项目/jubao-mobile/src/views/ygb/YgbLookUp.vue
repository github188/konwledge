<template>
  <div class="risk">
    <transition name="sign-in">
    <div class="all">
      <v-header title="专属保障" backIcon="icon-cancel" :touchFeel="{color:'#aaa'}"></v-header>
      <div class="main">
        <div class="content">
          <p class="pro">聚保“员工保”不仅仅是一般的雇主责任险。他不仅能够真正转移您的用工风险，还协助您关心、体贴您的每一位员工，让其获得最好的医疗保障、足额的误工赔付和高额的伤亡补偿。每个员工损害事项，聚保都为你想得更多、更全、更细致，您对员工的这份心，我们相信能够被有效传导给他们。</p>
          <p class="pro">聚保“员工保”，无论您投保任何一个费率档次，我们均免费赠送13项专属升级保障，而根据不同的方案，我们还有3项专属特约保障供您选择。聚保“员工保”，关心您的员工，更关心您！</p>
          <p class="title">以下13项特约内容为聚保量身打造，免费赠送所有投保企业。</p>
          <div class="bar">
            <span class="tip">1、</span><p>意外医疗医保用药扣除100元之后，90%赔付。</p>
          </div>
          <div class="bar">
            <span class="tip">2、</span>
            <p>误工费特约：<span class="gray">误工费标准，可以由您自行选择申报多少，“员工保”就赔多少，不再为工资清单发愁。</span></p>
            <!--<p>误工费特约02：<span class="gray">误工费与伤残赔偿金可以同时获赔。</span></p>-->
          </div>
          <div class="bar">
            <span class="tip">3、</span><p>理赔材料清单特约：<span class="gray">理赔不再提供工伤证明资料。</span></p>
          </div>
          <div class="bar">
            <span class="tip">4、</span><p>律师费、鉴定费、检验费扩展特约：<span class="gray">员工不满意，咱支持打官司，所有的诉讼费、律师费、鉴定费、检验费，“员工保”都承担。</span></p>
          </div>
          <div class="bar">
            <span class="tip">5、</span><p>伤残事故简易赔偿特约：<span class="gray">残疾赔偿金直接根据协议约定的比例标准，定额赔偿。</span></p>
          </div>
          <div class="bar">
            <span class="tip">6、</span><p>“雇员”的概念扩展特约：<span class="gray">只要为企业或以企业名义实际服务的人员，都认定为雇员，避免理赔争议。</span></p>
          </div>
          <div class="bar">
            <span class="tip">7、</span><p>理赔服务时效与预付赔款：<span class="gray">发生重大事故，我们马上协助预付赔款；每个理赔环节，我们全程协助沟通，只为让您获得最好的保险理赔服务。</span></p>
          </div>
          <div class="bar">
            <span class="tip">8、</span><p>简化工伤认定理赔资料特约：<span class="gray">劳动合同、工资证明、纳税证明统统都不用提供。</span></p>
          </div>
          <div class="bar">
            <span class="tip">9、</span><p>错误遗漏条款：<span class="gray">人员信息有错误，只要能够识别，保险公司予以认可。</span></p>
          </div>
          <div class="bar">
            <span class="tip">10、</span><p>运动或娱乐活动条款：<span class="gray">只要是公司组织活动，您的员工受伤，保险公司予以认可。</span></p>
          </div>
          <div class="bar">
            <span class="tip">11、</span><p>紧急运输费用条款：<span class="gray">员工受伤，需要紧急运送的费用，保险公司予以赔偿。</span></p>
          </div>
          <div class="bar">
            <span class="tip">12、</span><p>境内公出条款：<span class="gray">司机、押运员在全国怎么跑，企业都放心。</span></p>
          </div>
          <div class="bar">
            <span class="tip">13、</span><p>上下班途中保险条款：<span class="gray">上班途中、下班途中，发生意外事故都视同为工伤事故。</span></p>
          </div>
          <p class="title" v-if="caseIndex==2 || caseIndex==3">下述专属特约保障，为收费条款，但在部分产品方案中已经纳入其中。</p>
          <div class="bar" v-if="caseIndex==2 || caseIndex==3">
            <span class="tip">14、</span><p>自费药扩展特约：<span class="gray">可以选择购买相应的自费药保障。</span></p>
          </div>
          <!--<div class="bar"  v-if="caseIndex==2 || caseIndex==3">-->
            <!--<span class="tip">15、</span><p>24小时意外伤害保障特约：<span class="gray">可以选择扩展非工作期间的员工意外伤害保障。</span></p>-->
          <!--</div>-->
          <div class="bar" v-if="caseIndex==3">
            <span class="tip">15、</span><p>住院津贴补助特约：<span class="gray">可以选择扩展员工住院的津贴补助。</span></p>
          </div>
        </div>
      </div>
      <router-link tag="div" :to="$store.state.backUrl" class="bottom" v-touchFeel><span>我知道了</span></router-link>
    </div>
    </transition>
  </div>

</template>

<script>
  export default {
    data(){
      return {
        caseIndex:this.$route.query.caseIndex
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sign-in-enter-active,.sign-in-leave-active{
    transition:all .3s ease
  }
  .sign-in-enter,.sign-in-leave-to{
    transform : translateX(100%) ;
  }

  .all{
    position:fixed;left:0;top:0;bottom:0;right:0;overflow-y: scroll;
    z-index: 21;
    background: #fff;
    .header2{
      background: #fff;position:fixed;
    }
    .main{
      min-height: 100%;
      _height:100%;
      background: #f2fbff ;
    }
    .content{
      padding:pxToRem(110) pxToRem(20) pxToRem(120);
      .pro{
        font-size: pxToRem(24);
        text-indent: 2em;
        color: #666;
      }
      .title{
        margin: pxToRem(40) 0 pxToRem(30);
        font-size: pxToRem(30);
        color: #333;
      }
      .bar{
        position: relative;
        font-size: pxToRem(30);
        color: #333;
        padding-left: pxToRem(50);
        .tip{
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .gray{
        color: #666;
      }
    }
    .bottom {
      margin-top: pxToRem(-100);
      width: 100%;
      height: pxToRem(100);
      background-color: #06acf9;
      text-align: center;
      line-height: pxToRem(100);
      span {
        font-size: pxToRem(40);
        line-height: pxToRem(36);
        color: #ffffff;
      }
    }
  }
</style>
