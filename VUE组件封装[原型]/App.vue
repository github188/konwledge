<template>
    <div class="template">
        快速原型开发 <span>好牛逼</span>
        <div class="num-rolling">
            <!--<transition-group name="carry" tag="div">-->
                <!--<num-cell :num="val" v-for="(val,idx) in numList" :key="`num-${ idx }`"></num-cell>-->
            <!--</transition-group>-->
            <num-roll :num="num"></num-roll>
            <br>
            <num-roll :num="num" type="title"></num-roll>
            <button @click="addNum">addNum</button>
            <button @click="removeNum">removeNum</button>
        </div>
    </div>
</template>

<script>
    import NumRoll from './NumRoll'
    export default {
        name: "appMain",
        components: {
            NumRoll
        },
        data() {
            return {
                num: 0,
            }
        },
        computed: {
            numList(){
                let {num} = this
                return String(num).split('')
            }
        },
        methods: {
            addNum(){
                // this.num = '8'
                this.num = this.num + 1234567
            },
            removeNum(){
                this.num--;
            }
        }
    }
</script>

<style scoped>
.template{
    color:red;
}

.num-rolling{
    width:500px;height:300px;border:1px solid #000;
}

</style>
