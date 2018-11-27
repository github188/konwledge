<template>
    <transition name="img-slide">
        <div class="img-full-bg" @click="close" ref="imgbox">
            <img :src="src" :alt="alt" class="img-center">
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            src: '',
            alt: ''
        }
    },
    methods: {
        close (e) {
            let ele = this.$refs.imgbox
            ele.parentNode.removeChild(ele)
        }
    }
}
</script>

<style lang="scss" scoped>
.img-full-bg{
    position: absolute;
    left:0;right:0;top:0;bottom:0;
    background: rgba(0,0,0,.5);
    text-align: center;
    &:after{
        content: ' ';
        width:0;
        height:100%;
        display: inline-block;
        vertical-align: middle            
    }
    .img-center{
        vertical-align: middle;
    }
}

    .img-slide-enter-active, .img-slide-leave-active{
        transition: all .2s;
    }
    .img-slide-enter, .img-slide-leave-to {
        
    }
</style>

