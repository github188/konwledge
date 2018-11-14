<template>
  <div class="YgbAdd YgbChange">
    <v-header title="在线加人"></v-header>
    <div class="content_box">
      <div class="content">
        <h3 class='cell_title step2'>现场操作人员</h3>
        <div class='confirm'>
          <panel class='in table' :flag="true" :change="driver_list" >
            <p class='table_line'><span class='in_name'>姓名</span><span class='in_idcard'>身份证号</span><span class='handle' @click="add_people(driver_list,1)"><button class='add sel_button'>新增</button></span></p>
            <p class='table_line' v-for="(driver, index) in driver_list"><span class='in_name'><input type='text' v-model.trim='driver.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='driver.idcard' class='input input_idcard' @blur='check_idcard(driver)' :class="{checked_false:driver.checked==1}"></span><span class='handle' @click='driver_list.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
          </panel>
        </div>
        <h3 class='cell_title step2'>非现场操作人员</h3>
        <div class='confirm'>
          <panel class='in table' :flag="true" :change="clerk_list" >
            <p class='table_line'><span class='in_name'>姓名</span><span class='in_idcard'>身份证号</span><span class='handle' @click="add_people(clerk_list,2)"><button class='add sel_button'>新增</button></span></p>
            <p class='table_line' v-for="(clerk, index) in clerk_list"><span class='in_name'><input type='text' v-model.trim='clerk.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='clerk.idcard' class='input input_idcard' @blur='check_idcard(clerk)' :class="{checked_false:clerk.checked==1}"></span><span class='handle' @click='clerk_list.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
          </panel>
        </div>
      </div>
      <div class='button_area'>
        <a @click='confirm_next'>确认增加</a>
      </div>
    </div>


    <Dialog :successBtn="'确认变更'"
            :cancelBtn="'返回修改'"
            title=""
            :successClose="false"
            ref="yanzheng"
            @success="confirm_send"
    >
      <div class="yzm">
        <p>系统检测到您增加的现场操作人员为 <span>{{driver_list.length}}</span> 人，非现场操作人员为 <span>{{clerk_list.length}}</span> 人</p>
        <p>此次人员增加需支付保险费用：<span>{{(amount/100).toFixed(2)}}</span>元</p>
        <div class='get_yzm'>
          <input type='text' v-model.trim='yzm'>
          <Countdown class="btn" :mobile="mobile" :type="1"></Countdown>
        </div>
      </div>
    </Dialog>
    <Dialog :successBtn="'支付完成'"
            :successClose="false"
            title=""
            ref="baofu"
            @success="success"
    >
      <div class="baofu">
        <div class='pay_title'>
          <h3 :class="pay_way=='zhifubao' ? 'active':''" @click="pay_way='zhifubao'">支付宝</h3>
          <h3 :class="pay_way=='weixin' ? 'active':''" @click="pay_way='weixin'">微&nbsp;&nbsp;信</h3>
        </div>
        <div class="pay_body">
          <div v-show="pay_way == 'weixin'" ><p>微信二维码</p><p>{{time_wx}}</p></div>
          <div v-show="pay_way == 'zhifubao'" ><p>支付宝二维码</p><p>{{time_zhifubao}}</p></div>
          <div class='QR' v-show="pay_way == 'weixin'" >
            <img v-if="weixin_url" :src='weixin_url'>
            <div v-else class="err_msg">二维码请求失败</div>
          </div>
          <div class="QR" v-show="pay_way == 'zhifubao'">
            <img v-if="zhifubao_url" :src='zhifubao_url'>
            <div v-else class="err_msg">二维码请求失败</div>
          </div>
          <p>温馨提示</p>
          <p>此二维码将在2小时后失效，请尽快支付</p>
          <div class="tip" v-if="pay_way == 'weixin'">
            <p>因微信支付未开放“长按二维码识别支付”接口，请您使用另一部手机的微信扫码完成支付</p>
            <!--<p style='font-weight: bold;text-align: left;'>【方案一】：请将付款二维码截屏 → 进入个人微信首页 → 右上角“+” → “扫一扫” → 点击右上角“从相册选取二维码” → 选取付款二维码截图 → 立即支付"</p>
            <p style='font-weight: bold;text-align: left;'>【方案一】：请使用另一部手机扫码完成支付</p>-->
          </div>
          <div class="tip" v-if="pay_way == 'zhifubao'">
            <p>请您使用“支付宝>扫一扫”功能完成支付，具体操作方式如下：</p>
            <p class="bold">【方案一】：请将付款二维码截屏 → 打开支付宝 → “扫一扫” → 点击右上角“相册” → 选取付款二维码截图 → 立即支付</p>
            <p class="bold">【方案二】：请使用另一部手机扫码完成支付</p>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
  import QRious from 'qrious';
  import Panel from 'base/panel/Panel';
  import Dialog from 'base/dialog/Dialog';
  import Countdown from 'views/components/Countdown';
  import { Toast, MessageBox, Indicator } from 'mint-ui';
  import { cmnUserInfo,ygbOrderEmployeechange,ygbOrderEmployeeaddprice,ygbOrderEmployeeadd,cmnBaofuPayurl,ygbOrderInfo,ygbOrderEmployeelist,cmnBaoFinish } from 'assets/js/api'
  export default {
    components:{
      Panel,
      Dialog,
      Countdown
    },
    data(){
      return{
        driver_list:[],
        clerk_list:[],
        employee_list:[],
        orderId:this.$route.query.orderId,
        amount:0,//费用
        mobile:'',
        yzm:'',//验证码
        groupNo:'',
//        baofu_id:'',//保付id
        pay_way:'zhifubao',//保付支付方式
        weixin_url:'',
        zhifubao_url:'',
        time_wx:'',
        time_zhifubao:''
      }
    },
    created(){
      this.init();
      this.getMobile();
    },
    methods:{
      init(){
        Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
        //检测是否过期
        this.checkStatus();
      },
      checkStatus(){
        ygbOrderInfo(this.orderId).then((res)=>{
          Indicator.close();
          if(res.err_code===0 && res.order.status === 8){
            MessageBox.alert('您的保单已经过期，不可以进行加人/换人操作！请重新投保员工保！如有疑问，请拨打我们的客服服务热线 40080-59680').then(action => {
              this.$router.go(-1);
            });
          }
        }).catch((err)=>{
          Indicator.close();
        });
      },
      add_people(list,type){
        list.push({
          "name":'',
          "idcard":'',
          "type":type,
          'id': 0,
          'checked': 0, //0代表初始未填入状态, 1代表身份证检查未通过，2 代表通过。
        })
      },
      //验证信息，计算加保费用，打开验证码弹框
      confirm_next(){
        let errArr = [];
        this.employee_list = this.driver_list.concat(this.clerk_list);
        if(this.employee_list.length === 0){
          Toast('你增加的人数为0人，请添加员工信息后再进行下一步');
          return false;
        }

        this.driver_list.forEach((item,index)=>{if(!item.name || item.checked !== 2)errArr.push('您增加的第 '+ (index + 1) + ' 个现场操作人员信息不正确')});
        this.clerk_list.forEach((item,index)=>{if(!item.name || item.checked !== 2)errArr.push('您增加的第 '+ (index + 1) + ' 个非现场操作人员信息不正确')});
        if(errArr.length>0){
          Toast(errArr[0]);
          return false;
        }
        // 验证身份证是否重复
        let arr_idcard =this.employee_list.map(item=>item.idcard);
        if ([...new Set(arr_idcard)].length !== arr_idcard.length) {
          Toast('你增加的人员中包含相同的身份证号，请检查后重新提交！', '提示');
          return false;
        }
        Indicator.open();
        //计算加保费用
        ygbOrderEmployeeaddprice({order_id: this.orderId*1, driver_num: this.driver_list.length*1, clerk_num: this.clerk_list.length*1}).then(res=>{
          if(res.err_code == 0){
            Indicator.close();
            this.$refs.yanzheng.open();
            this.amount = res.total_price;
          }else if(res.err_code == 1014){
            Indicator.close();
            MessageBox('提示', '尊敬的客户：非常抱歉，您的账户暂时无法进行"整车保"加人操作，建议您选择其他险种，详询聚保服务热线: 40080-59680')
          }else{
            Indicator.close();
            Toast('提示', res.err_msg);
          }
        }).catch((err)=>{ Indicator.close(); })
      },
      //验证验证码， 创建加人订单， 开启保付打开弹框
      confirm_send(){
        if(this.yzm.length !== 6){
          Toast('请输入正确的验证码！');
          return false;
        }
        Indicator.open({text: '订单处理中...', spinnerType: 'fading-circle'});
        let data = {
          order_id: this.orderId*1,
          group_no: this.groupNo? this.groupNo : '',
          sms_code: this.yzm,
          employee_list: this.employee_list,
          price: this.amount*1
        };
        //创建加人订单
        ygbOrderEmployeeadd(data).then((res)=>{
          if(res.err_code == 0){
            this.$refs.baofu.open();
            this.yzm = '';
            this.$refs.yanzheng.close();
            this.groupNo = res.groupNo;
//            this.baofu_id = res.baofuId;

            //保付
            let data = {
              amount: this.amount*1,
              order_id: this.orderId*1,
              product_type: 2,
              additional_info: this.groupNo,
            };
            let weixin_data = {pay_type: 1,...data};
            let zhifubao_data = {pay_type: 2,...data};
            //请求微信支付链接
            cmnBaofuPayurl(weixin_data).then((res)=>{
              Indicator.close();
              if(res.err_code == 0){
                let now = new Date();
                this.time_wx = now.toLocaleDateString() + ' ' + now.toTimeString().slice(0, 8);
                let qr = new QRious({
                  value: res.pay_url,
                  background: 'white',
                  //backgroundAlpha: 0.8,
                  foreground: 'black',
                  //foregroundAlpha: 0.8,
                  level: 'H',
                  padding: 0,
                  size: 160,
                });
                this.weixin_url = qr.toDataURL();
              }
            }).catch((err)=>{Indicator.close();})
            //请求支付宝支付链接
            cmnBaofuPayurl(zhifubao_data).then((res)=>{
              Indicator.close();
              if(res.err_code == 0) {
                let now = new Date();
                this.time_zhifubao = now.toLocaleDateString() + ' ' + now.toTimeString().slice(0, 8);
                let qr = new QRious({
                  value: res.pay_url,
                  background: 'white',
                  //backgroundAlpha: 0.8,
                  foreground: 'black',
                  //foregroundAlpha: 0.8,
                  level: 'H',
                  padding: 0,
                  size: 180,

                });
                this.zhifubao_url = qr.toDataURL();
              }
            }).catch((err)=>{Indicator.close();})
          }else{
            Indicator.close();
            Toast({message:res.err_msg||'未知错误',position:'bottom'})
          }
        }).catch((err)=>{Indicator.close();})
      },
      check_idcard(obj){
        if(!this.$store.state.identity.test(obj.idcard)){
          Toast('请输入正确的身份证号码！');
          obj.checked = 1;
        }else{
          let now = new Date((new Date()).getTime() + 8*60*60*1000) //换算成本地时间
          let idcard_num = parseInt(obj.idcard.slice(6, 14));
          let now_num = parseInt(now.toISOString().slice(0, 10).replace(/-/g, ''));
          if(now_num-650000 > idcard_num){
            Toast("对不起，该员工年龄超过了65周岁的投保年龄界限");
            obj.checked = 1;
            return false;
          }
          if(now_num-160000 < idcard_num){
            Toast("对不起，该员工年龄未满16周岁的投保年龄界限");
            obj.checked = 1;
            return false;
          }
          obj.checked = 2;
        }
      },
      getMobile(){
        cmnUserInfo().then(res=>{
          if(res.err_code == 0){
            this.mobile = res.data.mobile;
          }else{
            Toast(res.err_msg||'未知错误！')
          }
        })
      },
      //保付是否成功验证
      success(){
        cmnBaoFinish({
          amount: this.amount*1,
          order_id: this.orderId*1,
          product_type: 2,
          additional_info: this.groupNo? this.groupNo : '',
        }).then((res)=>{
          if(res.err_code == 1109){
            this.$refs.baofu.close();
            MessageBox.alert('充值成功！').then(action=>{
              this.$router.go(-1);
            })
          }else if(res.err_code == 1116){
            Toast({message:'您还未支付此订单，也可能是网络延时，请稍后再试，如有疑问请联系客服',position:'bottom'})
          }else if(res.err_code == 1103){
            Toast({message:'未找到该订单的信息，如有疑问请联系客服',position:'bottom'})
          }else{
            Toast({message:res.err_msg||'未知错误',position:'bottom'})
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/ygb/ygbChange";
  .baofu{
    padding: pxToRem(60) pxToRem(20) pxToRem(20);
    font-size: pxToRem(28);
    .pay_title{
      display: flex;
      justify-content: space-around;
      h3{
        width: 50%;
        text-align: center;
        font-size: pxToRem(32);
        &.active{
          color: $blue;
          border-bottom: 2px solid $blue;
        }
      }
    }
    .pay_body{
      text-align: center;
      .QR{
        font-size: 0;
        .err_msg{
          font-size: pxToRem(28);
          line-height: pxToRem(200);
          height: pxToRem(200);
        }
      }
      &>p{color: #666}
      .tip{
        text-align: left;
        text-indent: 2em;
        line-height: pxToRem(45);
        .bold{
          text-indent: 0;
          font-weight: bold;
        }
      }
    }
  }
</style>
