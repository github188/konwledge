<template>
    <div class="font_lun" ref="fontLun">
        <transition-group name="list" mode="out-in">
            <a
                    class="mes fns14"
                    :key="index"
                    v-show="step == index"
                    v-for="(item,index) in message"
                    @touchstart="touchstart"
                    @touchend="touchend"
            >{{item.mes}}</a>
        </transition-group>
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            step: 0,
            timer: null
        }
    },
    mounted() {
        this._setInterval()
    },
    methods: {
        _setInterval(){
            this.timer = setInterval(()=> {
                this.step++
                if(this.step > this.message.length-1){
                    this.step = 0
                }
            },3000)
        },
        touchstart(e) {
          clearInterval(this.timer);
          e.preventDefault()
        },
        touchend() {
            this._setInterval()
        }
    }
}
</script>
<style lang="scss" scoped>
    .font_lun{
        height: 100%;
        width:100%;
        display: inline-block;
        overflow: hidden;
        position: relative;
    }
    .font_lun .mes {
        color: #333;
        height: 100%;
        width: 100%;
        line-height: pxToRem(80);
        position: absolute;
        top: 1px;
    }
    .icon img{
        height: 16px;
        width: auto;
    }
    .list-enter-active, .list-leave-active{
        transition: all .5s;
    }
    .list-enter{
        transform: translateY(100%);
    }
    .list-leave-to{
        transform: translateY(-100%);
    }
</style>
