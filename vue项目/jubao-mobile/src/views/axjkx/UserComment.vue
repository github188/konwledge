<template>
  <div class="userComment">
    <v-header title="用户评价" :touchFeel="{color:'#626368'}" className="header" ></v-header>
    <div class="media">
      <i class="iconfont icon-jiankang"></i><span>{{product_name}}</span>
    </div>
    <div class="box">
      <Scroll
        ref="scroll"
        :updateData="[list]"
        :refreshData="[]"
        @pullingDown="loadRefresh"
        @pullingUp="loadMore">
        <!-- 滚动的内容 -->
          <CommentCard v-for="(item,index) in list" :key="index" :data="item"></CommentCard>
      </Scroll>
    </div>
  </div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import CommentCard from './components/CommentCard'
	import Scroll from 'vue-slim-better-scroll';
	import { cmnServiceProductCommentList } from '../../assets/js/api'
	export default {
		components:{
			CommentCard,
			Scroll
		},
    data(){
			return{
				list:[],
				product_name:'安享一生癌症医疗险',
        page:1,
				rows:5
      }
    },
    created(){
      this._getList().then(res=>this.list=res)
    },
    methods:{
      async _getList(){
        let res = await cmnServiceProductCommentList({product_name:this.product_name,page:this.page,rows:this.rows});
        if(res.err_code === 0){
        	if(res.rows.length>0){
						return res.rows;
          }
        }else{
        	Toast({message:res.err_msg || '未知错误',position:'bottom'})
          return false
        }
      },
			async loadRefresh(){
      	this.page = 1;
        this.list = await this._getList();
      },
			async loadMore(){
				this.page ++;
				let data = await this._getList();
				if(data){
					this.list = this.list.concat(data);
				}else{
					setTimeout(()=>{this.$refs.scroll.update(true)},200)
        }
      }
    }
	}
</script>
<style lang="scss" type="text/scss" scoped>
  .header{
    background: #424348 !important;
    color: #fff !important;
  }
  .box{
    position: absolute;
    top:pxToRem(210);
    left: 0;
    right: 0;
    bottom: 0;
  }
  .userComment{
    background: #eee;
  }
  .media{
    margin-top: pxToRem(20);
    padding: 0 pxToRem(20);
    height: pxToRem(100);
    display: flex;
    align-items: center;
    background: #fff;
    @include border-1px('bottom');
    i{
      font-size: pxToRem(50);
      color: $blue;
      margin-right: pxToRem(20);
    }
  }
</style>