<template>
    <transition name="img-slide">
        <div class="img-full-bg" @click="close" ref="imgBoxBg">
            <img :src="src" :alt="alt" ref="img" class="img-center">
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            src: '',
            alt: '',
            originWidth: '',
            originHeight: '',
            originLeft: '',
            originTop: ''
        }
    },
    // mounted () {
        // let img = this.$refs.img;

        // // 添加class名，让其居中
        // this.$refs.img.className = 'img-center'

        // // 暂存图片居中时的宽高，位置
        // let imgWidth = img.getBoundingClientRect().height;
        // let imgHeight = img.getBoundingClientRect().width;
        // let imgLeft = img.clientLeft;
        // let imgTop = img.ClientTop;

        // // 设置图片的宽高和位置
        // this.$refs.img.style.width = this.originWidth + 'px';
        // this.$refs.img.style.height = this.originHeight + 'px';
        // this.$refs.img.style.position = `position:absolute;left:${this.originLeft}px;top:${this.originTop}px;`

        // // 确定动画的范围和时长
        // this.$refs.img.transition = 'all 0.5 ease;'
        
        // // 手动触发页面重绘
        // let f = document.body.offsetHeight;
        
        // // 设置图片最终的宽高和位置
        // this.$refs.img.style.width = this.originWidth + 'px';
        // this.$refs.img.style.height = this.originHeight + 'px';
        // this.$refs.img.style.position = `position:absolute;left:${this.imgLeft}px;top:${this.imgTop}px;`
    // },
    methods: {
        close (e) {
            let ele = this.$refs.imgBoxBg
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

</style>

