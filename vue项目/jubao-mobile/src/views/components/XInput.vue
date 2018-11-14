<template>
  <li class="item">
    <span class="label" v-html="label"></span>
    <input class="msg" :type="type" :value="value" @input="$emit('input',$event.target.value)" @blur="blur" :placeholder="placeholder" v-if="edit">
    <span class="msg" v-else>{{value ? value :'暂无'}}</span>
  </li>
</template>
<script>
  export default {
  	props:{
  		edit:{type:Boolean,default:true},
      value:{},
      label:{type:String,required:true},
			placeholder:{type:String},
      type:{type:String,default:'text'}
    },
    methods:{
			blur($event){
  			if(this.type === 'text'){
					this.$emit('input',this.trim($event.target.value))
        }
				this.$emit('blur');
      },
  		trim(str){
  			return str.replace(/^\s+|\s+$/gm,'')
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../assets/scss/list";
  .list li.item{
    display: flex;
    .label{
      width: pxToRem(130);
    }
    .msg{
      display: inline-block;
      width: pxToRem(500);
      padding: 0 pxToRem(10);
    }
    span.msg{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
</style>
