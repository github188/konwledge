<template>
    <div class="">
        <div class="zcb_pay">
            <div class="content">
                <h3>请输入您的支付密码</h3>
                <div class="input_word">
                    <label for="payment_password">支付密码</label>
                    <input type="password" id="payment_password" maxlength="30" v-model="payPassword">
                </div>
                <p class="botton_wrap">
                    <button type="button" class="pay_button">支&nbsp;&nbsp;付</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .zcb_pay{
        position: fixed;bottom:pxToRem(400);left:0;
        background: rgba(0,0,0,.2);
        width:100%;
        display: flex;justify-content: center;align-items: center;
        overflow: hidden;
        .content{
            flex: 1;
            /*height:pxToRem(320);*/
            margin:pxToRem(30);
            background: #fff;
            padding:0 pxToRem(40);
            h3{
                height: pxToRem(120);  line-height: pxToRem(120);
                text-align: center;
                font-size: pxToRem(32);
                color: #333;
            }
            .input_word{
                height:pxToRem(120);
                @include border-1px('bottom');
                label{
                    padding:0 pxToRem(14);
                }
                input{
                    height:pxToRem(80);
                }
            }
            p.botton_wrap{
                display: flex;justify-content: center;
                button.pay_button{
                    background: #0089ed;color:#fff;font-size:pxToRem(30);
                    margin:pxToRem(30);
                    width:pxToRem(380);height:pxToRem(90);
                    border-radius: pxToRem(5);
                    box-shadow:pxToRem(2) pxToRem(2) pxToRem(2) pxToRem(2) #0089ed;
                }
            }
        }
    }

    input{
        position: relative;
        z-index: 99;
        color: #313b4b;
        border-radius: 5px;
        border: 1px solid #d1d1d1;
        background: url("../../assets/img/inputBg.jpg") repeat-x 50%;
        text-indent: pxToRem(20);
    }
</style>