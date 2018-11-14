<template>
      <Dialog title="整车保投保协议" ref="zcbProtocol"
              :showCancelBtn="false"
              :success="close"
              :cancel="close"
              >
        <div class="zcb_protocol_box">
          <h3>1、下列物流货物不论投保人是否有向保险人申报，对于发生损失后依法应由被保险人承担赔偿责任的，保险人均不负责赔偿。</h3>
          <p>（1）金银、珠宝、钻石、玉器、贵重金属；</p>
          <p>（2）古玩、古币、古书、古画、艺术作品、雕塑、邮票；</p>
          <p>（3）旧品、二手品、展览后之展品和陈列品等无法确定其价值的货品；</p>
          <p>（4）枪支弹药、爆炸物品；</p>
          <p>（5）现钞、有价证券、票据、文件、档案、帐册、图纸、技术资料、信用证、护照；</p>
          <p>（6）需冷藏或恒温运输的货物；</p>
          <p>（7）蔬菜、水果、活牲畜、禽鱼类和其他动物。易腐品、易蛀品、农产品，如果仁、花生、玉米、豆类、大小麦、豆粕、鱼粉、菜籽饼、地瓜干、木薯干、肉类、蛋类、蔬菜、水果类等；易变质品、活品，如海鲜、动植物等；</p>
          <p>（8）易燃易爆及危险品（参照GB12268-2005《危险货物品名表》）；</p>
          <p>（9）危险品，化工品如硫酸、水泥等；</p>
          <p>（10）军火、军品；</p>
          <p>（11）原木、原棉、天然橡胶等；</p>
          <p>（12）汽车，船舶；</p>
          <p>（13）无任何包装且无法确定单件价值的大宗货物，如煤炭、矿石/砂、沥青、焦油、水泥等；</p>
          <p>
            （14）重大件机械设备（任何机机械设备如果满足以下条件之一，应视为重大件机械设备：任一部件由于体积或重量的原因必须由特殊运输工具运输；任一部件包括包装不能放进40英尺标准集装箱或公路平板车，即超过12米长、2.5米宽或2.5米高；任一部件包括包装超过50吨重；任一部件由于本身的特性必须特殊处理，如要求特殊的绑扎固定及保持重心的平衡）；</p>
          <h3> 2、在任何情况下，保险人不对被保险人承运的“不予承保货物”、不具承运资质的标的货物的损失进行认定和赔付。</h3>
          <h3>
            3、在任何情况下，保险人不对被保险人在本保单项下申报的物流货物在本次保单生效前发生的损失事故进行认定和赔付。且保险人保留投保人/被保险人因发生货物损失事故后，故意向保险人投保以骗取保险金的行为的有关法律权利。</h3>
        </div>
      </Dialog>

</template>

<script>
  import Dialog from "../../base/dialog/Dialog.vue"
    export default {
        components:{
          Dialog
        },
        data() {
            return {
              flag:false
            }
        },
        created() {

        },
        methods: {
          open(){
            this.$refs.zcbProtocol.open()
          },
          close(){
            this.$refs.zcbProtocol.close();
          }
        }
    }
</script>

<style lang="scss" scoped>
  .zcb_protocol_box:first-child {
    padding: 0.7em 20px 1.7em;
  }
  .zcb_protocol_box {
    min-height: 40px;
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    height: 22rem; overflow-y: scroll;text-align: left;color:black;
  }
</style>
