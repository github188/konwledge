<template>
    <div class="template">
        <div class="num-rolling">
            <num-roll :num="num"></num-roll>
            <br>
            <num-roll :num="num" type="title"></num-roll>
            <br>
            <num-roll :num="num" :use-img="true"></num-roll>
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
                num: 3252,
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
        },
        mounted () {
            // var i=1000;
            // setInterval(()=>{
            //     i=i*2;
            //     this.num=i;
            // }, 2000);
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
