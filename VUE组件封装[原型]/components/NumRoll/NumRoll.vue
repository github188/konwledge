<template>
    <div class="num-roll">
        <transition-group name="carry" tag="div">
            <num-cell :num="val" v-for="(val,idx) in numList" :key="`num-${ idx }`" :use-img="useImg"></num-cell>
        </transition-group>
    </div>
</template>

<script>
    import NumCell from './NumCell'
    export default {
        name: "NumRoll",
        components: {
            NumCell
        },
        props: {
            num: {
                type: Number | String,
                require: true,
                validator(val){
                    return !isNaN(val)
                }
            },
            type: {
                type: String,
                default: 'common',
                validator(val){
                    return ~['common', 'title'].indexOf(val)
                }
            },
            useImg: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            numList(){
                let {num, type, formatNumber} = this
                console.log(type === 'common' ?  String(num).split('') : String( formatNumber(num) ).split(''))
                return type === 'common' ?  String(num).split('') : String( formatNumber(num) ).split('')
            }
        },
        methods: {
            formatNumber(num) {
                return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            },
        }
    }
</script>

<style scoped>
    .num-roll{
        display: inline-block;
    }
    .carry-enter-active, .carry-leave-active {
        transition: all .5s;
    }
    .carry-enter, .carry-leave-to{
        opacity: 0;
    }
</style>