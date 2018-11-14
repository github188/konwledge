<template>
  <div class="addr_box">
      <v-header title="地址管理"></v-header>
      <div class="content_box">
        <div class="content">
          <div class="">
            <div class="addr_top">
              <div class="addr_item" v-for="(item,index) in addressRows">
                <div class="addr_tel">
                  <span>{{item.recipients}}</span>
                  <span>{{item.mobile}}</span>
                </div>
                <div class="addr_detail">{{item.province+item.city+item.district+item.street}}</div>
                <div class="addr_icon">
                  <a href="javascript:void(0)" v-show="index==0">
                    <i class="iconfont icon-duigou"></i> 已置顶
                  </a>
                  <a href="javascript:void(0)" v-show="index!=0" @click="defaultAddress(item.id)">
                    <i class="iconfont icon-checkmarkcircle"></i> 置顶
                  </a>
                  <a href="javascript:void(0)" @click="deleteAddress(item.id)">
                    <i class="iconfont icon-del"></i> 删除
                  </a>
                </div>
              </div>
              <div class="noData" v-if="!count">暂无数据</div>
            </div>
          </div>
          <div class="addr_box">
            <input class="blue_bg" type="submit" @click="$router.push({path:'/addAddress',query:$route.query})" v-touchFeel="{color:'#0fbcf7'}" value="添加新地址">
          </div>
        </div>

      </div>

  </div>
</template>

<script>
  import { cmnUseraddressList,cmnUseraddressSetdefaultaddr,cmnUseraddressDelete } from 'assets/js/api';
  import { Toast,MessageBox,Indicator } from 'mint-ui';
  export default {
      data() {
          return {
              addressRows: [], // 所有邮寄地址
              count: 0, // 邮寄地址总数
          }
      },
      created() {
          this.init();
      },
      methods: {
          init(){
              Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
              cmnUseraddressList().then((res)=>{
                  Indicator.close();
                  if(res.err_code === 0 && res.rows.length>0){
                      this.count = res.total;
                      this.addressRows = res.rows;
                  }
              }).catch((err)=>{ console.log("cmnUseraddressList",err) })
          },
          //置顶
          defaultAddress(id){
              Indicator.open({text: '正在置顶...', spinnerType: 'fading-circle'});
              cmnUseraddressSetdefaultaddr(id).then((res)=>{
                  Indicator.close();
                  if(res.err_code === 0){
                      Toast({ message: '置顶成功！', duration: 1000 , position:'bottom'}); this.init();
                  }else {
                      Toast({ message: '置顶失败！', duration: 1000 , position:'bottom'});
                  }
              }).catch((err)=>{ console.log("cmnUseraddressSetdefaultaddr",err) })
          },
          //删除地址
          deleteAddress(id){
              MessageBox.confirm('确定删除？').then(action =>{
                Indicator.open({text: '正在删除...', spinnerType: 'fading-circle'});
                cmnUseraddressDelete(id).then((res)=>{
                  Indicator.close();
                  if(res.err_code === 0){
                    Toast({ message: '删除成功!', duration: 1000 , position:'bottom'});
                    this.addressRows = [];
                    this.count = 0;
                    this.init();
                  }else if(res.err_code === 1103) {
                    Toast({ message: '未找到对应地址!', duration: 1000 , position:'bottom'});
                  }else {
                    Toast({ message: res.err_msg || '未知错误', duration: 1000 , position:'bottom'});
                  }
                }).catch((err)=>{ console.log("cmnUseraddressDelete",err) })
              })
          },
      }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/user/setAddress.scss';
  .content_box{
    background:#fff;bottom:0;
  }
</style>
