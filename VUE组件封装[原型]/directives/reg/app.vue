<template>
    <div class="wrapper">
        <div class="form-input-box">
            <el-input
                    v-model.trim="username"
                    v-reg="[{req:Reg.username, failCallback: usernameCallback}]"
                    :placeholder="请输入用户名"
                    class="f20"
                    suffix-icon="iconfont icon-yonghuming"
                    maxlength="30"></el-input>
        </div>
        <div class="form-input-box">
            <el-input
                    v-reg="[{req:Reg.password, failCallback: passwordCallback}]"
                    v-model.trim="password" :placeholder="$t('login.passwordHolder')" class="f20"
                    suffix-icon="iconfont icon-mima" maxlength="30" type="password"
                    @keyup.enter.native="login"
            ></el-input>
        </div>
    </div>
</template>

<script>
    import Reg from '../../assets/js/reg'
    export default {
        name: "app.vue",
        data() {
            return {
                Reg
            }
        },
        methods: {
            usernameCallback () {
                this.$message.warning(this.$t('reg.username'))
            },
            passwordCallback () {
                this.$message.warning(this.$t('reg.password'))
            },
        }
    }
</script>

<style scoped>

</style>