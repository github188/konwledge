<template>
  <div>
    <!--Reg指令封装-->
    <comp-box title="Reg指令封装" width="300px">
      <el-input v-reg="[{req:reg.username, failCallback: usernameCallback}]" v-model.trim="username"
                :placeholder="$t('login.usernameHolder')" class="f20" suffix-icon="iconfont icon-yonghuming"
                maxlength="30"></el-input>
      <el-input v-reg="[{req:reg.password, failCallback: passwordCallback}]" v-model.trim="password"
                :placeholder="$t('login.passwordHolder')" class="f20"
                suffix-icon="iconfont icon-mima" maxlength="30" type="password"
                @keyup.enter.native="login"
      ></el-input>
    </comp-box>

    <comp-box title="Loading指令封装" width="300px" class="loading-demo"></comp-box>
  </div>
</template>

<script>
  import Reg from '@/assets/js/reg'
  export default {
    name: "Main",
    data () {
      return {
        username: '',
        password: '',
        reg: Reg
      }
    },
    methods: {
      usernameCallback () {
        this.$message.warning(this.$t('reg.username'))
      },
      passwordCallback () {
        this.$message.warning(this.$t('reg.password'))
      },
      login () {
        console.log('login')
      }
    }
  }
</script>

<style lang="scss" scoped>
.loading-demo{
  height:300px;
}
</style>
