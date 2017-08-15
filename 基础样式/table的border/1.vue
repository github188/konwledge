<template>
    <div v-show="$store.state.ygbItemDetail">
        <div class="PopUp ygb_pro_popup" style="margin-top: -262.5px; margin-left: -390px; display: block;">
            <div class="PopUp_box">
                <div class="pop_conditionBox">
                    <h5>聚保“员工保”13项免费升级保障+专属保障</h5>
                    <div class="pop_content">
                        <p style="text-indent: 2em;">聚保“员工保”不仅仅是一般的雇主责任险。他不仅能够真正转移您的用工风险，还协助您关心、体贴您的每一位员工，让其获得最好的医疗保障、足额的误工赔付和高额的伤亡补偿。每个员工损害事项，聚保都为你想得更多、更全、更细致，您对员工的这份心，我们相信能够被有效传导给他们。</p>
                        <p style="text-indent: 2em;">聚保“员工保”，无论您投保任何一个费率档次，我们均免费赠送13项专属升级保障，而根据不同的方案，我们还有4项专属特约保障供您选择。聚保“员工保”，关心您的员工，更关心您！</p>
                        <table class="ygb_pro_info" style="border: 1px solid #000;">
                            <tbody><tr style="font-weight: bolder;text-align: center;"><td width="35">序号</td><td width="300">聚保“员工保”升级保障项目</td><td width="300">其他普通保险</td></tr>
                            <tr style="text-align: center; font-weight: bold"><td colspan="3">以下13项特约内容为聚保量身打造，免费赠送所有投保企业。</td></tr>
                            <tr><td>1</td><td>意外医疗医保用药只扣500元之后，100%赔付。</td><td>医疗费用赔偿，不仅要扣您几百元的免赔金额，还得再扣20%的免赔率。</td></tr>
                            <tr><td>2-1</td><td><span class="red">误工费特约01：</span>误工费标准，可以由您自行选择申报多少，“员工保”就赔多少，不再为工资清单发愁。</td><td>要赔误工费，您得提供过去12个月的员工工资清单。很多临时用工哪里有什么工资清单。或者你就得接受当地最低工资标准赔偿了。</td></tr>
                            <tr><td>2-2</td><td><span class="red">误工费特约02：</span>误工费与伤残赔偿金可以同时获赔。</td><td>要赔伤残赔偿金，得先扣掉已经赔偿的误工费！企业一点办法都没有。 </td></tr>
                            <tr><td>3</td><td><span class="red">理赔材料清单特约：</span>理赔不再提供工伤证明资料。</td><td>员工受伤了，必须提供事故工伤证明。咱们工伤都没买，您确定能提供工伤证明资料？</td></tr>
                            <tr><td>4</td><td><span class="red">律师费、鉴定费、检验费扩展特约：</span>员工不满意，咱支持打官司，所有的诉讼费、律师费、鉴定费、检验费，“员工保”都承担。</td><td>员工赔偿不满意，就要打官司，律师费、鉴定费、检验费，保险公司统统都可以不赔。</td></tr>
                            <tr><td>5</td><td><span class="red">伤残事故简易赔偿特约：</span>残疾赔偿金直接根据协议约定的比例标准，<span>定额</span>赔偿。</td><td>要赔残疾赔偿金，您得提供工资证明，根据基本工资按相应月份标准赔偿。</td></tr>
                            <tr><td>6</td><td><span class="red">“雇员”的概念扩展特约：</span>只要为企业或以企业名义实际服务的人员，都认定为雇员，避免理赔争议。</td><td>提交劳动合同、工资证明、法院判决，才能认定雇员。</td></tr>
                            <tr><td>7</td><td><span class="red">理赔服务时效与预付赔款：</span>发生重大事故，我们马上协助预付赔款；每个理赔环节，我们全程协助沟通，只为让您获得最好的保险理赔服务。</td><td>保险理赔等待时间长，资料不清晰，被保险人权益无保障。</td></tr>
                            <tr><td>8</td><td><span class="red">简化工伤认定理赔资料特约：</span>劳动合同、工资证明、纳税证明统统都不用提供。</td><td>理赔资料多如牛毛，各种资料和证明（证明是什么原因、证明是我的员工、证明工资有多少），企业极难备齐。</td></tr>
                            <tr><td>9</td><td><span class="red">错误遗漏条款：</span>人员信息有错误，只要能够识别，保险公司予以认可。</td><td>申报的人员信息弄错了，保险公司要拒赔怎么办？</td></tr>
                            <tr><td>10</td><td><span class="red">运动或娱乐活动条款：</span>只要是公司组织活动，您的员工受伤，保险公司予以认可。</td><td>公司组织活动，员工受伤要赔偿，工伤保险不予认定怎么办？</td></tr>
                            <tr><td>11</td><td><span class="red">紧急运输费用条款：</span>员工受伤，需要紧急运送的费用，保险公司予以赔偿。</td><td>员工受伤，紧急运送费用可不少。保险公司不赔偿怎么办？</td></tr>
                            <tr><td>12</td><td><span class="red">境内公出条款：</span>司机、押运员在全国怎么跑，企业都放心。</td><td>要求是工作时间、工作场所，司机、押运员总是在外面，受伤怎么认定？</td></tr>
                            <tr><td>13</td><td><span class="red">上下班途中保险条款：</span>上班途中、下班途中，发生意外事故都视同为工伤事故。</td><td>上下班过程，保险公司不认定工伤怎么办？</td></tr>
                            <tr style="text-align: center; font-weight: bold;"><td colspan="3">下述专属特约保障，为收费条款，但在部分产品方案中已经纳入其中。</td></tr>
                            <tr class="choosetr"><td>14</td><td><span class="red">自费药扩展特约：</span>可以选择购买相应的自费药保障</td><td>自费药都得企业自己承担。</td></tr>
                            <tr class="choosetr" v-show="$store.state.ygbItemDetailB"><td>15</td><td><span class="red">24小时意外伤害保障特约：</span>可以选择扩展非工作期间的员工意外伤害保障</td><td>员工在非工作期间受伤，雇主责任险不予赔偿。</td></tr>
                            <tr class="choosetr" v-show="$store.state.ygbItemDetailZ"><td>16</td><td><span class="red">住院津贴补助特约：</span>可以选择扩展员工住院的津贴补助</td><td>员工住院，没有津贴补助。</td></tr>
                            <tr class="dn choosetr" v-show="$store.state.ygbItemDetailK"><td>17</td><td><span class="red">调整伤残等级对应赔偿比例特约：</span>伤残赔偿10级对应提高到10%的赔偿比例，并以此类推，真正获得高额的伤残保障。</td><td>格式条款中的伤残赔偿比例非常低，10级伤残赔偿金比例只有1%-5%。</td></tr>
                            </tbody></table>
                    </div>
                    <div class="pop_button">
                        <a class="pop_go" href="javascript:void(0)">
                            <input type="button" value="确 定" @click="close">
                        </a>
                    </div>
                </div>
            </div>
            <span class="aa" @click="close">
	        <img src="../img/aa.jpg" width="14" height="13">
	    </span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        computed:{

        },
        methods:{
            close(){
                this.$store.state.ygbItemDetail=false;
                this.$store.state.fullbgFlag=false;
            }
        },
        created(){

        }
    }
</script>

<style lang="scss" scoped>
    .ygb_pro_info tr, .ygb_pro_info td {
        border: 1px solid #000;
    }
    .red {
        color: #ff0000;
    }
    .ygb_pro_info {
        border-collapse: collapse; //加这个样式就变成单边框
    }
</style>