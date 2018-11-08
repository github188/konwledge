<template>
    <div class="scroll-box" :style="{
    width:parseInt(width)+'px',
    height: parseInt(height)+'px',
    minHeight: minHeight ? parseInt(minHeight)+'px' : null,
    maxHeight: maxHeight ? parseInt(maxHeight)+'px' : null
    }">
        <div class="scroll-box-content" :style="{
        width: typeof width === 'undefined' ? `calc(100% + 18px)` : parseInt(width)+ 18+ 'px',
        // width: `calc(100% + 18px)`,
        height: parseInt(height)+ 18+ 'px',
        minHeight: minHeight ? parseInt(minHeight)+'px' : null,
        maxHeight: maxHeight ? parseInt(maxHeight)+'px' : null,
        overflowX:  scrollX === ''? 'scroll' : null,
        overflowY:  scrollY === ''? 'scroll' : null
        }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'scrollBox',
        props: ['width', 'height', 'scroll-x', 'scroll-y', 'min-height', 'max-height'],
        created() {
            console.log(typeof this.width === 'undefined');
            console.log(this.scrollX, typeof this.scrollX);
        }
    };
</script>

<style scoped>
.scroll-box{
    overflow: hidden;
}
    .calc{
        width:calc(100% + 18px)
    }
</style>
