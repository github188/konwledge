<template>
  <div class="channel">
      <v-header title="设置服务人员" :backUrl="backUrl"></v-header>
      <div class="header_repeat"></div>
      <div class="haveChannel" v-if="channel">
          <div>
              <p>
                <b>{{ channel }}</b>为您服务
              </p>
              <p>
                  <span>如果信息有误,请拨打我公司服务热线:</span><br>
                  <span>40080-59680</span>
              </p>
          </div>
          <input type="submit" class="btn blue_bg" @click="$router.push('/dashboard')" value="下一步">
      </div>
      <div class="noChannel" v-else>
          <div class="search_box">
              <input type="text" placeholder="请输入您的服务机构或服务人员" @blur="channelTest" v-model.trim="setChannel">
              <input type="button" class="blue_bg" value="搜 索" @click="searchChannel()">
              <div class="searchResults" v-show="resultsData.length !== 0">
                  <ul>
                      <li v-for="item in resultsData" v-text="item.realname" @click="selectedChannel(item)"></li>
                  </ul>
                  <div @click="resultsData = []">关闭</div>
              </div>
              <div class="notFound_box">
                  <span class="notFound" style="display:none;color:red;">很抱歉,没有匹配到服务机构或服务人员!</span>
              </div>
          </div>
          <input class="btn blue_bg" @click="fillChannel" v-touchFeel="{color:'#0fbcf7'}" type="submit" value="设 置">
      </div>
      <p class="copyright">©聚保平台</p>
  </div>
</template>

<script>
  import { Toast,Indicator  } from 'mint-ui';
  import { zcbUserInfo,spbUserInfo,ygbUserInfo,cmnChannelList,zcbUserRegister,spbUserRegister,ygbUserRegister,dchybUserList,dchybUserRegister,cmnProductList } from 'assets/js/api';
  import { productData } from "../../assets/js/common"
	export default {
      data() {
          return {
              product: "zcb", // 产品类型
              channel: '', // 渠道
              setChannel: '', // input数据渠道筛选字符
              company_id: '', // 公司ID
              channelData: [], // 渠道数据数组
              resultsData: [],  // 搜索匹配结果数组
              selectedDate: {}, // 选中数据对象
              defaultId: "", // 默认渠道id
              funcObj: {
                  ajaxInfo: "",
                  ajaxRegister: ""
              }, // api
          }
      },
      computed: {
          backUrl() {
              return this.channel ? this.$store.state.routerFrom.path : "/dashboard";
          }
      },
      watch: {
          // 处理选择后重新输入，清空原数据
          setChannel: function(value){
              if(this.selectedDate.realname !== value) this.selectedDate = {};
          }
      },
      created() {
          this.product = this.$route.query.product;
          this.init();
          this.loadChannelList();
      },
      methods: {
          // 点击搜索匹配显示数据
          searchChannel() {
              let self = this;
              if (!self.setChannel) {
                  Toast({message: '请先通过查询选择服务机构或服务人员!', duration: 1000, position: 'bottom'});
                  return false;
              } else {
                  self.resultsData = [];
                  self.resultsData = self.channelData.filter(item => {
                      return item.realname.match(self.setChannel);
                  });
                  if (self.resultsData.length === 0) {
                      self.resultsData = [];
                      document.querySelector('.notFound').style.display = 'block';
                      setTimeout(function () {
                          document.querySelector('.notFound').style.display = 'none';
                      }, 2000)
                  }
              }
          },
          selectedChannel(item) {
              this.resultsData = [];
              this.setChannel = item.realname;
              this.selectedDate = item;
          },
          loadChannelList() { // 获取渠道列表
              cmnChannelList().then((res) => {
                  if (res.err_code === 0) {
                      this.channelData = res.data;
                      let defaultId = this.channelData.filter(L => {
                          if (L.realname === "聚保") {
                              return L.id;
                          }
                      })[0].id;
                      this.defaultId = defaultId;
                      this.selectedDate.id = defaultId;
                  }
              }).catch((err) => { console.log(err); });
          },
          channelTest() {
              // *********** 修改渠道需测试：直接设置、输入设置、输入选择设置、输入选择修改设置、选择重复的字段 ********
              // 筛选字段   默认已选择“聚保”渠道ID
              let data = this.channelData.filter((item) => {
                  if(this.selectedDate.id){  // 选择了渠道并有渠道id
                      return item.realname == this.setChannel && item.id == this.selectedDate.id;
                  }else {                   // 只是输入了渠道，没有渠道id
                      return item.realname == this.setChannel;
                  }
              });
              // 1. 有输入，未选择
              if (data.length === 1 && this.setChannel) {
                  // 当输入值匹配一个服务人员
                  this.selectedDate = data[0];
                  Toast({message: '输入正确!', duration: 1000, position: 'bottom'});
                  return true;
              } else if (data.length >= 1 && this.setChannel) {
                  // 当输入文本匹配多个服务人员
                  Toast({message: '请先通过查询选择唯一服务机构或服务人员!', duration: 1000, position: 'bottom'});
                  return false;
              } else if (data.length === 0 && this.setChannel) {
                  // 匹配为零的情况
                  Toast({message: '没有匹配到服务机构或服务人员!', duration: 1000, position: 'bottom'});
                  return false;
              //  2. 未输入
              } else if (!this.setChannel) {
                  return true;
              }
          },
          // 取得服务人员ID后注册
          fillChannel() {
              let data = null;
              if (!this.channelTest()) {
                  return false;
              } else if (this.product === "hwb" || this.product === "phb" || this.product === "llb"){
                  data = {
                      channel_id: this.selectedDate.id || this.defaultId,
                      product_name: productData[this.$route.query.product]["name"]
                  }
              } else {
                  data = { channel_id: this.selectedDate.id || this.defaultId }
              }
              Indicator.open({text: '正在设置...', spinnerType: 'fading-circle'});
              this.funcObj.ajaxRegister(data).then((res) => {
                  Indicator.close();
                  if (res.err_code !== 0) {
                      Toast({message: res.err_msg || "未知错误", position: 'bottom'});
                      return;
                  }
                  Toast({message: '设置成功!', duration: 1000, position: 'bottom'});
                  this.init();
              }).catch(err => { console.log(err);});
          },
          init() {
              // 根据不同产品定义各自方法
              if (this.product === "zcb") {
                  this.funcObj.ajaxInfo = zcbUserInfo;
                  this.funcObj.ajaxRegister = zcbUserRegister;
              } else if (this.product === "spb") {
                  this.funcObj.ajaxInfo = spbUserInfo;
                  this.funcObj.ajaxRegister = spbUserRegister;
              } else if (this.product === "ygb") {
                  this.funcObj.ajaxInfo = ygbUserInfo;
                  this.funcObj.ajaxRegister = ygbUserRegister;
              } else if (this.product === "hwb" || this.product === "phb" || this.product === "llb") {
                  this.funcObj.ajaxInfo = dchybUserList;
                  this.funcObj.ajaxRegister = dchybUserRegister;
              }
              // 获取初始化信息
              if(this.product === "hwb" || this.product === "phb" || this.product === "llb"){
                  this.funcObj.ajaxInfo({ product_name: productData[this.$route.query.product]["name"] }).then((res) => {
                      this.channel = res.rows[0].channel_name;//暂时不考虑rows.length不为1的情况
                  }).catch(err => { console.log(err); });
              }else{
                  this.funcObj.ajaxInfo().then((res) => {
                      // 兼容员工保写法
                      if (res.data && res.data.channel_name || res.ygb_user && res.ygb_user.channel_name) {
                          this.channel = res.data ? res.data.channel_name : res.ygb_user.channel_name;
                      }
                  }).catch(err => { console.log(err);});
              }
          }
      },
	}
</script>

<style lang="scss" scoped>
  @import '~assets/scss/user/setChannel';
  .channel { background: #fff; }
</style>

