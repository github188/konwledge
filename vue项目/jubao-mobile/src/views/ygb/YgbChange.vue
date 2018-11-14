<template>
  <div class="YgbChange">
    <v-header title="在线换人"></v-header>
    <div class="content_box">
      <!--大地-->
      <div class="content" v-if="insurance_type != 16">
        <div class='select1' v-if="step==1">
          <template v-if="driver_list.length>0">
            <h3 class='cell_title' @click='show_driver=!show_driver'>现场操作人员<i class='iconfont icon-right' :class='{rotate:show_driver}'></i></h3>
            <panel class='table' :flag="show_driver" :change="driver_list">
              <p class='table_line'><span class='table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_sel'>选择</span></p>
              <p class='table_line' v-for="(driver, index) in driver_list"  @click="driver.selected = !driver.selected"><span class='table_name'>{{driver.name}}</span><span class='table_idcard'>{{driver.idcard}}</span><span class='table_sel'><i class='iconfont' :class="driver.selected?'icon-duigou':'icon-yuan'"></i></span></p>
            </panel>
          </template>
          <template v-if="clerk_list.length>0">
            <h3 class='cell_title' @click='show_clerk=!show_clerk'>非现场操作人员<i class='iconfont icon-right' :class='{rotate:show_clerk}'></i></h3>
            <panel class='table'  :flag="show_clerk" :change="clerk_list">
              <p class='table_line'><span class='table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_sel'>选择</span></p>
              <p class='table_line' v-for="(clerk, index) in clerk_list" @click='clerk.selected = !clerk.selected'><span class='table_name' >{{clerk.name}}</span><span class='table_idcard'>{{clerk.idcard}}</span><span class='table_sel' ><i class='iconfont' :class="clerk.selected?'icon-duigou':'icon-yuan'"></i></span></p>
            </panel>
          </template>
        </div>
        <div class="select2" v-if="step==2">
          <template v-if="driver_list_out.concat(driver_list_in).length>0">
            <h3 class='cell_title step2'>现场操作人员</h3>
            <div class='confirm'>
              <panel class='out table' :flag="true" :change="driver_list_out" >
                <p class='table_line'><span class='out_name'>换出人姓名</span><span class='out_idcard'>换出人身份证号</span></p>
                <p class='table_line' v-for="(driver, index) in driver_list_out"><span class='out_name'>{{driver.name}}</span><span class='out_idcard'>{{driver.idcard}}</span></p>
              </panel>
              <panel class='in table' :flag="true" :change="driver_list_in" >
                <p class='table_line'><span class='in_name'>换入人姓名</span><span class='in_idcard'>换入人身份证号</span><span class='handle' @click="add_people('driver_list_in',1)"><button class='add sel_button'>新增</button></span></p>
                <p class='table_line' v-for="(driver, index) in driver_list_in"><span class='in_name'><input type='text' v-model.trim='driver.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='driver.idcard' class='input input_idcard' @blur='check_idcard(driver)' :class="{checked_false:driver.checked==1}"></span><span class='handle' @click='driver_list_in.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
              </panel>
            </div>
          </template>
          <template v-if="clerk_list_out.concat(clerk_list_in).length>0">
            <h3 class='cell_title step2'>非现场操作人员</h3>
            <div class='confirm'>
              <panel class='out table' :flag="true" :change="clerk_list_out" >
                <p class='table_line'><span class='out_name'>换出人姓名</span><span class='out_idcard'>换出人身份证号</span></p>
                <p class='table_line' v-for="(clerk, index) in clerk_list_out"><span class='out_name'>{{clerk.name}}</span><span class='out_idcard'>{{clerk.idcard}}</span></p>
              </panel>
              <panel class='in table' :flag="true" :change="clerk_list_in" >
                <p class='table_line'><span class='in_name'>换入人姓名</span><span class='in_idcard'>换入人身份证号</span><span class='handle' @click="add_people('clerk_list_in',2)"><button class='add sel_button'>新增</button></span></p>
                <p class='table_line' v-for="(clerk, index) in clerk_list_in"><span class='in_name'><input type='text' v-model.trim='clerk.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='clerk.idcard' class='input input_idcard' @blur='check_idcard(clerk)' :class="clerk.checked==1?'checked_false': ''"></span><span class='handle' @click='clerk_list_in.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
              </panel>
            </div>
          </template>
        </div>
      </div>
      <!--信达-->
      <div class="content" v-else>
        <div class='select1' v-if="step==1">
          <template v-if="trucker_list.length>0">
            <h3 class='cell_title' @click='show_trucker=!show_trucker'>司机类人员<i class='iconfont icon-right' :class='{rotate:show_trucker}'></i></h3>
            <panel class='table'  :flag="show_trucker" :change="trucker_list">
              <p class='table_line'><span class='table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_sel'>选择</span></p>
              <p class='table_line' v-for="(trucker, index) in trucker_list" @click='trucker.selected = !trucker.selected'><span class='table_name' >{{trucker.name}}</span><span class='table_idcard'>{{trucker.idcard}}</span><span class='table_sel' ><i class='iconfont' :class="trucker.selected?'icon-duigou':'icon-yuan'"></i></span></p>
            </panel>
          </template>
          <template v-if="driver_list.length>0">
            <h3 class='cell_title' @click='show_driver=!show_driver'>搬运类人员<i class='iconfont icon-right' :class='{rotate:show_driver}'></i></h3>
            <panel class='table' :flag="show_driver" :change="driver_list">
              <p class='table_line'><span class='table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_sel'>选择</span></p>
              <p class='table_line' v-for="(driver, index) in driver_list"  @click="driver.selected = !driver.selected"><span class='table_name'>{{driver.name}}</span><span class='table_idcard'>{{driver.idcard}}</span><span class='table_sel'><i class='iconfont' :class="driver.selected?'icon-duigou':'icon-yuan'"></i></span></p>
            </panel>
          </template>
          <template v-if="clerk_list.length>0">
            <h3 class='cell_title' @click='show_clerk=!show_clerk'>文员类人员<i class='iconfont icon-right' :class='{rotate:show_clerk}'></i></h3>
            <panel class='table'  :flag="show_clerk" :change="clerk_list">
              <p class='table_line'><span class='table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_sel'>选择</span></p>
              <p class='table_line' v-for="(clerk, index) in clerk_list" @click='clerk.selected = !clerk.selected'><span class='table_name' >{{clerk.name}}</span><span class='table_idcard'>{{clerk.idcard}}</span><span class='table_sel' ><i class='iconfont' :class="clerk.selected?'icon-duigou':'icon-yuan'"></i></span></p>
            </panel>
          </template>
        </div>
        <div class="select2" v-if="step==2">
          <template v-if="trucker_list_out.concat(trucker_list_in).length>0">
            <h3 class='cell_title step2'>司机类人员</h3>
            <div class='confirm'>
              <panel class='out table' :flag="true" :change="trucker_list_out" >
                <p class='table_line'><span class='out_name'>换出人姓名</span><span class='out_idcard'>换出人身份证号</span></p>
                <p class='table_line' v-for="(trucker, index) in trucker_list_out"><span class='out_name'>{{trucker.name}}</span><span class='out_idcard'>{{trucker.idcard}}</span></p>
              </panel>
              <panel class='in table' :flag="true" :change="trucker_list_in" >
                <p class='table_line'><span class='in_name'>换入人姓名</span><span class='in_idcard'>换入人身份证号</span><span class='handle' @click="add_people('trucker_list_in',2)"><button class='add sel_button'>新增</button></span></p>
                <p class='table_line' v-for="(trucker, index) in trucker_list_in"><span class='in_name'><input type='text' v-model.trim='trucker.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='trucker.idcard' class='input input_idcard' @blur='check_idcard(trucker)' :class="trucker.checked==1?'checked_false': ''"></span><span class='handle' @click='trucker_list_in.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
              </panel>
            </div>
          </template>
          <template v-if="driver_list_out.concat(driver_list_in).length>0">
            <h3 class='cell_title step2'>搬运类人员</h3>
            <div class='confirm'>
              <panel class='out table' :flag="true" :change="driver_list_out" >
                <p class='table_line'><span class='out_name'>换出人姓名</span><span class='out_idcard'>换出人身份证号</span></p>
                <p class='table_line' v-for="(driver, index) in driver_list_out"><span class='out_name'>{{driver.name}}</span><span class='out_idcard'>{{driver.idcard}}</span></p>
              </panel>
              <panel class='in table' :flag="true" :change="driver_list_in" >
                <p class='table_line'><span class='in_name'>换入人姓名</span><span class='in_idcard'>换入人身份证号</span><span class='handle' @click="add_people('driver_list_in',1)"><button class='add sel_button'>新增</button></span></p>
                <p class='table_line' v-for="(driver, index) in driver_list_in"><span class='in_name'><input type='text' v-model.trim='driver.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='driver.idcard' class='input input_idcard' @blur='check_idcard(driver)' :class="{checked_false:driver.checked==1}"></span><span class='handle' @click='driver_list_in.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
              </panel>
            </div>
          </template>
          <template v-if="clerk_list_out.concat(clerk_list_in).length>0">
            <h3 class='cell_title step2'>文员类人员</h3>
            <div class='confirm'>
              <panel class='out table' :flag="true" :change="clerk_list_out" >
                <p class='table_line'><span class='out_name'>换出人姓名</span><span class='out_idcard'>换出人身份证号</span></p>
                <p class='table_line' v-for="(clerk, index) in clerk_list_out"><span class='out_name'>{{clerk.name}}</span><span class='out_idcard'>{{clerk.idcard}}</span></p>
              </panel>
              <panel class='in table' :flag="true" :change="clerk_list_in" >
                <p class='table_line'><span class='in_name'>换入人姓名</span><span class='in_idcard'>换入人身份证号</span><span class='handle' @click="add_people('clerk_list_in',2)"><button class='add sel_button'>新增</button></span></p>
                <p class='table_line' v-for="(clerk, index) in clerk_list_in"><span class='in_name'><input type='text' v-model.trim='clerk.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='clerk.idcard' class='input input_idcard' @blur='check_idcard(clerk)' :class="clerk.checked==1?'checked_false': ''"></span><span class='handle' @click='clerk_list_in.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
              </panel>
            </div>
          </template>
        </div>
      </div>
      <div class='button_area foot1' v-if='step==1'>
        <a @click='selected_next'>下一步</a>
      </div>
      <div class='button_area foot2' v-if='step==2'>
        <a  class="button_area_first" @click='confirm_change' style="border-bottom: 5px solid #fff">确认变更</a>
        <a href='javascript:;' @click='step = 1'>返回修改</a>
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
        <p v-if="insurance_type != 16">检测到您换入的现场操作人员为 <span>{{driver_list_in.length}}</span> 人，非现场操作人员为 <span>{{clerk_list_in.length}}</span> 人</p>
        <p v-else>检测到您换入的司机类人员为 <span>{{trucker_list_in.length}}</span> 人，换入的搬运类人员为 <span>{{driver_list_in.length}}</span> 人，文员类人员为 <span>{{clerk_list_in.length}}</span> 人</p>
        <div class='get_yzm'>
          <input type='text' v-model='yzm'>
          <Countdown class="btn" :mobile="mobile" :type="1"></Countdown>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>

  import Panel from 'base/panel/Panel';
  import Dialog from 'base/dialog/Dialog';
  import Countdown from 'views/components/Countdown';
  import { Toast, MessageBox, Indicator } from 'mint-ui';
  import { cmnUserInfo,ygbOrderEmployeechange,ygbOrderInfo,ygbOrderEmployeelist } from 'assets/js/api'
  export default {
    components:{
      Panel,
      Dialog,
      Countdown
    },
    data(){
      return{
        step:1, //1 代表选择换出人员阶段 2代表信息确认阶段
        show_driver:true,
        driver_list:[],
        show_clerk:true,
        clerk_list:[],
        show_trucker:true,
        trucker_list:[],
        driver_list_out:[],
        driver_list_in:[],
        clerk_list_out:[],
        clerk_list_in:[],
        trucker_list_out:[],
        trucker_list_in:[],
        employee_list:[],//最终名单
        orderId:this.$route.query.orderId,
        mobile:'',
        yzm:'',//验证码
        insurance_type:this.$route.query.insuranceType,//	保险公司类型，大地为2，信达为16
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
        //获取订单列表
        ygbOrderEmployeelist({order_id:this.orderId}).then((res)=>{
          Indicator.close();
          console.log(res)
          if(res.err_code === 0){
            res.rows.forEach((ele, index) => {
              ele.selected = false;
              if(ele.type == 1 && ele.status == 1) this.driver_list.push(ele);
              if(ele.type == 2 && ele.status == 1) this.clerk_list.push(ele);
              if(ele.type == 4 && ele.status == 1) this.trucker_list.push(ele);
            })
          }else{
            Toast({message:res.err_msg || '未知错误',position:'bottom'})
          }
        }).catch((err)=>{
          Indicator.close();
        })
      },
      checkStatus(){
        ygbOrderInfo(this.orderId).then((res)=>{
          if(res.err_code===0){
            if(res.order.status === 8){
              Indicator.close();
              MessageBox.alert('您的保单已经过期，不可以进行加人/换人操作！请重新投保员工保！如有疑问，请拨打我们的客服服务热线 40080-59680').then(action => {
                this.$router.go(-1);
              });
            }
          }
        }).catch((err)=>{
          Indicator.close();
        });
      },
      selected_next(){
        this.driver_list_out = [];
        this.driver_list_in = [];
        this.clerk_list_out = [];
        this.clerk_list_in = [];
        this.trucker_list_out = [];
        this.trucker_list_in = [];
        this.driver_list.forEach((ele, index) => {
          if(ele.selected) {
            this.driver_list_out.push(ele)
            this.driver_list_in.push({
              "name":'',
              "idcard":'',
              "type":1,
              'id': 0,
              'checked': 0, //0代表初始未填入状态, 1代表身份证检查未通过，2 代表通过。
            })
          }
        });
        this.clerk_list.forEach((ele, index) => {
          if(ele.selected) {
            this.clerk_list_out.push(ele)
            this.clerk_list_in.push({
              "name":'',
              "idcard":'',
              "type":1,
              'id': 0,
              'checked': 0, //0代表初始未填入状态, 1代表身份证检查未通过，2 代表通过。
            })
          }
        });
        this.trucker_list.forEach((ele, index) => {
          if(ele.selected) {
            this.trucker_list_out.push(ele)
            this.trucker_list_in.push({
              "name":'',
              "idcard":'',
              "type":1,
              'id': 0,
              'checked': 0, //0代表初始未填入状态, 1代表身份证检查未通过，2 代表通过。
            })
          }
        });
        if(this.driver_list_out.length === 0 && this.clerk_list_out.length === 0 && this.trucker_list_out.length === 0){
          Toast({message:'请选择您要换出的人员',position:'bottom'})
          return;
        }
        this.step = 2;
      },
      //新增
      add_people(list,type){
        if(this[list.replace('in', 'out')].length == this[list].length){
          Toast({message:'您最多可以换入的人员数是 ' + this[list.replace('in', 'out')].length + ' 人！',position:'bottom'})
          return ;
        }
        this[list].push({
          'name': '',
          'idcard': '',
          'type': type,
          'id': 0,
          'checked': 0,
        })
      },
      confirm_change(){
        this.driverCheck = true;
        this.clerkCheck = true;
        this.truckerCheck = true;
        this.employee_list = [];
        if(this.driver_list_in.length < this.driver_list_out.length || this.clerk_list_in.length < this.clerk_list_out.length || this.trucker_list_in.length < this.trucker_list_out.length) {
          Toast('您换入的操作人员少于换出人员');
          this.driverCheck = false;
          return false;
        }
        this.trucker_list_in.forEach((ele, index) => {
          if(ele.name != '' && ele.checked == 2){
            let item ={};
            Object.assign(item,ele);
            item.id = this.trucker_list_out[index].id;
            this.employee_list.push(item);
            delete this.employee_list[index].checked;
          }else {
            Toast('您换入的第 '+ (index + 1) + ' 个司机类人员信息不正确');
            this.truckerCheck = false;
            return false;
          }
        })
        this.driver_list_in.forEach((ele, index) => {
          if(ele.name != '' && ele.checked == 2){ // 姓名不为空且身份证验证通过
            var item ={};
            Object.assign(item, ele);
            item.id = this.driver_list_out[index].id;
            this.employee_list.push(item);
            delete this.employee_list[this.trucker_list_in.length +index].checked;
          }else {
            console.log(this.insurance_type)
            Toast('您换入的第 '+ (index + 1) + ' 个'+(this.insurance_type == 16?'搬运类':'现场操作')+'人员信息不正确');
            this.driverCheck = false;
            return false;
          }
        });
        this.clerk_list_in.forEach((ele, index) => {
          if(ele.name != '' && ele.checked == 2){
            let item ={};
            Object.assign(item,ele);
            item.id = this.clerk_list_out[index].id;
            this.employee_list.push(item);
            delete this.employee_list[this.trucker_list_in.length +this.driver_list_in.length + index].checked;
          }else {
            Toast('您换入的第 '+ (index + 1) + ' 个'+(this.insurance_type==16?'文员类':'非现场操作')+'人员信息不正确');
            this.clerkCheck = false;
            return false;
          }
        })
        if(this.employee_list.length>0 && this.driverCheck === true && this.clerkCheck=== true && this.truckerCheck === true){
          this.$refs.yanzheng.open();
        }
      },
      confirm_send(){
        if(!this.yzm){Toast('请输入验证码！');return}
        Indicator.open({text: '订单处理中...', spinnerType: 'fading-circle'});
        ygbOrderEmployeechange({order_id:this.orderId*1,employee_list:this.employee_list,sms_code:this.yzm}).then((res)=>{
          Indicator.close();
          if(res.err_code == 0){
            this.$refs.yanzheng.close();
            MessageBox.alert(res.message).then(action=>{
              this.$router.go(-1);
            });
          }else if(res.err_code == 1014){
            MessageBox({
              title: '提示',
              message: '尊敬的客户：非常抱歉，您的账户暂时无法进行"员工保"的换人操作，建议您选择其他险种，详询聚保服务热线: 40080-59680'
            })
            this.$refs.yanzheng.close();
            this.yzm = '';
          }else if(res.err_code == 203){
            MessageBox('提示','您换入的员工在保单中已存在，不能重复添加，请仔细核对后再重试，如有疑问请致电聚保服务热线: 40080-59680')
            this.$refs.yanzheng.close();
            this.yzm = '';
          }else if(res.err_code == 2){
            MessageBox('提示',"参数错误");
          }else if(res.err_code == 1006) {
            MessageBox('提示','验证码错误或过期,请重新输入正确的手机验证码');
            this.yzm = '';
          }else if(res.err_code == 1103){
            this.$refs.yanzheng.close();
            MessageBox('提示',"未找到被替换员工记录");
          } else{
            this.$refs.yanzheng.close();
            MessageBox('提示',res.err_msg);
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
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/ygb/ygbChange";
  .content_box{
    bottom: 0;
    .content{
      height: auto;
      min-height: 100%;
      .select1{
        margin-bottom: pxToRem(100) !important;
      }
      .select2{
        margin-bottom: pxToRem(210) !important;
      }
    }
    .foot1{
      margin-top: pxToRem(-100) !important;
    }
    .foot2{
      margin-top: pxToRem(-210) !important;
    }
  }
</style>
