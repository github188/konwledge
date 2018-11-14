var AddSubtract = {
    template:'<div class="AddSubtract">\n' +
    '    <i class="iconfont icon-jian" @click.stop="num<=0?num=0:num--"></i>\n' +
    '    <div>{{num}}</div>\n' +
    '    <i class="iconfont icon-jia" @click.stop="num++"></i>\n' +
    '  </div>',
    props:{
        value:{
            type:Number,
            default:0
        }
    },
    data:function(){
        return{
            num:this.value
        }
    },
    watch:{
        num:function(val){
            this.$emit('input',val)
        }
    }
}