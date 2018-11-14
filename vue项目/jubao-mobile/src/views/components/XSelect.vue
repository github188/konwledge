<template>
  <li class="item x-select">
    <span class="label" v-html="label"></span>
    <input class="msg" :value="name" disabled :placeholder="placeholder" >
    <i class="iconfont" :class="iconName" @click="popupVisible=true"></i>
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
      <mt-picker :slots="slots" @change="onValuesChange" :itemHeight="30"></mt-picker>
    </mt-popup>
  </li>
</template>
<script>
	import { Popup ,Picker } from 'mint-ui';
  export default {
  	components:{
  		mtPopup:Popup,
			mtPicker:Picker
    },
    props:{
			label:{ type:String, default:'' },
      value:{ type:[String,Number], default:''},
			placeholder:{type:String, default:''},
      iconName:{ type:String, default:'icon-jiantou'},
      list:{type:Array,required:true},
      canInput:{type:Boolean,default:false},
      tip:{type:String,default:''},
    },
    computed:{
  		name(){
  			return this.list.filter(item=>item.value === this.value)[0].name
      },
  		slots(){
        return [{
					defaultIndex:this.value ? this.list.map(item=>item.value).indexOf(this.value): 0,
					flex: 1,
        	values: this.list.map(item=>item.name),
					className: 'slot1',
					textAlign: 'center'
        }]
      }
    },
    data(){
  		return{
				popupVisible:false,
        selectValue:this.value
      }
    },
		methods:{
			onValuesChange(picker, values){
				this.selectValue = this.list.filter(item=>item.name === values[0])[0].value;
      },
			cancle(){
				this.popupVisible=false;
				this.selectValue = this.value
      },
			select(){
				this.popupVisible=false;
				this.$emit('input',this.selectValue)
        this.$emit('change',this.selectValue)
      }
		}
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/list";
  .msg{
    display: inline-block;
    width: pxToRem(460);
  }
  i{
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
</style>