<template>
    <div class="risk clearfix">
      <div class="header">
        <i class="iconfont icon-cancel"></i>
        <span>风险告知</span>
      </div>

      <div class="content">
        <div class="tag1">
          <h2>一、本保险承保标的</h2>
          <p>本保险承保标的为：<span class="red">煤炭、钢铁、矿砂及其他一般大宗金属类货物。</span></p>
        </div>

        <div class="tag2">
          <h2>二、本保险免赔额</h2>
          <p>每次事故绝对<span class="red">免赔额</span>为人民币<span class="red">500元</span>。</p>
          <p>本保险对于散装货物因非保险责任造成的短量，不承担赔偿责任。</p>
        </div>

        <div class="tag3">
          <h2><span class="red">三、本保险责任免除</span></h2>
          <h3>(一)  由于下列原因造成保险货物的损失，保险人不负赔偿责任：</h3>
          <p>1、战争、军事行动、武装冲突、恐怖行动、罢工、骚乱、暴动；</p>
          <p>2、核反应、核子辐射和放射性污染；</p>
          <p>3、有关部门的行政行为或执法行为；</p>
          <p>4、地震；</p>
          <p>5、保险货物本身的缺陷或自然损耗、霉烂变质、包装不善；</p>
          <p class="red">6、违章装载货物及从事非法运输；</p>
          <p class="red">7、被保险人或驾驶员的故意行为。</p>
          <h3>(二)  对于下列情况下因任何原因发生的保险货物的损失，保险人均不承担赔偿责任：</h3>
          <p class="red">1、驾驶员持审验不合格的驾驶证，或未经公安交通部门同意，持未检验的驾驶证驾车；</p>
          <p class="red">2、承运车辆没有公安交通管理部门核发的行驶证和号牌，或未按规定检验或检验不合格。</p>
          <h3>(三)  其他不属于保险责任范围内的损失和费用，保险人不负责赔偿。</h3>
        </div>
        <div class="tag4">
          <h2 class="red">四、本保险不予承保货物</h2>
          <h3>(一)  以下货物均不属于本保险承保范围，您即使申报了，也不予承担保险责任，请务必仔细阅读。</h3>
          <p>1、商品汽车；</p>
          <p>2、超高超宽超长超重的重大件机器设备（任何机机械设备如果满足以下条件之一，应视为重大件机械设备：任一部件由于体积或重量的原因必须由特殊运输工具运输；任一部件包括包装不能放进40英尺标准集装箱或公路平板车，即超过12米长、2.5米宽或2.5米高；任一部件包括包装超过20吨重；任一部件由于本身的特性必须特殊处理，如要求特殊的绑扎固定及保持重心的平衡）；</p>
          <p>3、艺术品、古董古玩、金银珠宝、稀有/贵重金属、玉器；</p>
          <p>4、邮票、金融票据；</p>
          <p>5、易燃易爆危险品；</p>
          <p>6、冷藏冷冻品、鲜活动植物、蔬菜水果类；</p>
          <p>7、精密仪器设备（任何仪器或设备如果满足以下条件之一，应视为精密仪器或设备：运输过程中对该仪器或设备的平衡、稳定、防震、防尘、搬运倾斜角度等有特殊严格要求；仪器或设备受损后受国内维修能力所限，无法在国内修复；单件仪器或设备保额超过人民币50万元）。</p>
          <p>8、其他不属于本保险约定承保标的范围内的货物。</p>
          <h3>(二)  保险人再次申明：因本保险为网络申报承保的电子保单，保险人无法识别投保人申报的实际货物真实类别，如贵司申报或承运的货物包含上述不予承保货物的，无论保险人是否出具本保险（大宗货物保）的电子保单，保险人均不对其承担任何赔偿责任。贵司有上述不予承保货物保险需求的，请投保其他相关保险产品。</h3>
        </div>
      </div>
      <div class="bottom">
        <span>我知道了</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {}
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
  .header{
    @include border-1px('bottom');
  }
  .content{
    padding:pxToRem(20) 0 pxToRem(50) pxToRem(20);
    font-size:pxToRem(26);
    line-height:pxToRem(40);
    color:#666666;
    .h2{
      color:#333333;
    }
  }
  .bottom{
    width:100%;  height:pxToRem(100);
    background-color: #06acf9;
    text-align: center;line-height: pxToRem(100);
    span{
      font-size: pxToRem(40);
      line-height: pxToRem(36);
      color: #ffffff;
    }
  }

</style>
