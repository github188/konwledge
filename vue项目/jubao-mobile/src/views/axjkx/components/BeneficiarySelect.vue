<template>
  <li class="item x-select">
    <span class="label" v-html="label"></span>
    <input class="msg" v-model.trim="inputValue.name" @input="input" :placeholder="placeholder" >
    <i class="iconfont openIcon" :class="iconName" @click="openPopup"></i>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      style="width:100%;"
    >
      <div class="picker-toolbar">
        <span class="picker-cancel" @click="cancle">取消</span>
        <span class="tip">{{tip || placeholder }}</span>
        <span class="picker-confirm" @click="select">确定</span>
      </div>
      <div class="scroll-box" v-if="list.length>0">
        <div class="box-item" v-for="(item,index) in list" :key="index" @click="choice(item,index)">
          <i class="iconfont " :class="choiceIndex==index ? 'icon-duigou':'icon-yuan'"></i>
          <div class="info">
            <div>{{item.name}}</div>
            <div>{{item.idCard}}</div>
          </div>
        </div>
      </div>
      <div class="tip" v-else>
        暂无被投保人信息
      </div>
    </mt-popup>
  </li>
</template>
<script>
	import { Popup } from 'mint-ui';
	export default {
		components:{
			mtPopup:Popup,
		},
		props:{
			label:{ type:String, default:'' },
			value:{ type:Object, default:{name:'',idCard:''}},
			placeholder:{type:String, default:''},
			iconName:{ type:String, default:'icon-jiantou'},
			tip:{type:String,default:''},
      list:{type:Array,required:true},
		},
		data(){
			return{
				popupVisible:false,
				choiceIndex:0,
				inputValue:{name:'',idCard:''},
				selectValue:{name:'',idCard:''}
			}
		},
    watch:{
			value:{
				handler(val) {
					this.selectValue = JSON.parse(JSON.stringify(val));
					this.inputValue = JSON.parse(JSON.stringify(val));
					if(!this.selectValue.name && !this.selectValue.idCard){
						this.selectValue = this.list[0]
          }
				},
        deep:true,
				immediate:true
      }
    },
		methods:{
			input(){
				if(this.inputValue.name !== this.value.name){
					this.$emit('change',{name:this.inputValue.name,idCard:''})
        }
			},
			choice(item,index){
				this.selectValue = item;
				this.choiceIndex = index;
      },
			async openPopup(){
				this.popupVisible=true;
				this.list.forEach((item,index)=>{
					if(item.name === this.value.name && item.idCard === this.value.idCard){
						this.choiceIndex = index;
          }
        })
      },
			cancle(){
				this.popupVisible=false;
				this.selectValue = this.value
			},
			select(){
				this.popupVisible=false;
				this.$emit('change',this.selectValue)
			}
		}
	}
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../../assets/scss/list";
  .msg{
    display: inline-block;
    width: pxToRem(460);
  }
  i.openIcon{
    display: inline-block;
    width: pxToRem(80);
    text-align: center;
    float: right;
    font-size: pxToRem(40);
  }
  .picker-toolbar{
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .picker-cancel{
      width: pxToRem(90);
      padding-left: pxToRem(30);
      color: #06abfa;
    }
    .picker-confirm{
      width: pxToRem(90);
      padding-right: pxToRem(30);
      text-align: right;
      color: #06abfa;
    }
  }
  .scroll-box{
    overflow-y: scroll;
    max-height: pxToRem(460);
    .box-item{
      display: flex;
      align-items: center;
      height: pxToRem(120);
      padding-left: pxToRem(30);
      @include border-1px('bottom');
      i{
        font-size: pxToRem(40);
        color: #999 !important;
        &.icon-duigou{
          color: #debb47 !important;
        }
      }
      .info{
        line-height: pxToRem(40);
        font-size: pxToRem(30);
        padding-left: pxToRem(30);
      }
    }
  }
  .tip{
    height: pxToRem(120);
    line-height: pxToRem(120);
    text-align: center;
  }
</style>