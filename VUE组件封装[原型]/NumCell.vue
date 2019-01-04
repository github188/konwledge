<template>
    <div class="numbers">
        <div class="cell-10" :style="{marginTop: `${ num*(-40) }px`}">
            <div class="cell" v-for="val in num10">{{val}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NumCell",
        props: {
            num: {
                type: Number | String,
                require: true,
                validator(val){
                    return !isNaN(val) && val>=0 && val<=9
                }
            },
        },
        data() {
            return {
                num10: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            }
        }
    }
</script>

<style scoped>
    @font-face {
        font-family: "lcdm2n"; /*字体名称*/
        src: url("./font/LCDM2N.ttf"); /*字体源文件*/
    }
    .numbers{
        display: inline-block;
        width:20px;
        height:40px;

        opacity: 1;
        font-family: "lcdm2n";
        font-size: 38px;
        line-height:40px;
        font-weight: normal;
        font-stretch: normal;
        text-align: center;
        overflow: hidden;
    }
    .cell-10{
        transition: all .5s;
    }
</style>