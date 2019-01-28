<template>
    <div class="numbers">
        <div v-if="num === ','">
            <div class="cell">,</div>
        </div>
        <div class="cell-10" :style="{marginTop: `${ num *(-40) }px`}" v-else>
            <div class="cell" v-for="val in num10">
                <template v-if="useImg">
                    <img :src="val.img">
                </template>
                <template v-else>
                    {{val.num}}
                </template>
            </div>

        </div>
    </div>
</template>

<script>
    import Num0 from './img/0.png'
    import Num1 from './img/1.png'
    import Num2 from './img/2.png'
    import Num3 from './img/3.png'
    import Num4 from './img/4.png'
    import Num5 from './img/5.png'
    import Num6 from './img/6.png'
    import Num7 from './img/7.png'
    import Num8 from './img/8.png'
    import Num9 from './img/9.png'

    export default {
        name: "NumCell",
        props: {
            num: {
                type: Number | String,
                require: true,
                validator(val){
                    return val===',' || ( !isNaN(val) && val>=0 && val<=9 )
                }
            },
            useImg: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                num10: [
                    {num: 0, img: Num0},
                    {num: 1, img: Num1},
                    {num: 2, img: Num2},
                    {num: 3, img: Num3},
                    {num: 4, img: Num4},
                    {num: 5, img: Num5},
                    {num: 6, img: Num6},
                    {num: 7, img: Num7},
                    {num: 8, img: Num8},
                    {num: 9, img: Num9}
                ]
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
    .cell{
        width: 20px;
        height: 40px;
        background: #1F6B75;
    }
    .cell img{
        width: 100%;
    }

</style>