<template>
  <div class="main">
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

    <!-- Loading指令封装 -->
    <comp-box title="Loading指令封装" width="300px" class="loading-demo"></comp-box>


    <!-- 进度条组件 -->
    <comp-box title="进度条组件封装" width="300px;">
      <v-progress :percentage="percentage"></v-progress>
    </comp-box>
    food2.jpeg
    <el-upload
      class="upload-demo"
      action="http://127.0.0.1:8081/file_upload"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
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
        reg: Reg,
        percentage: 0,
        timer: null,
        fileList:[]
      }
    },
    created () {
      let count =0
      this.timer = setInterval(()=>{
        this.percentage ++
        if (this.percentage>=80) {
          clearInterval(this.timer)
        }
      },100)
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
      },
      handleExceed () {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
.loading-demo{
  height:300px;
}
.main{
  >>>.comp-box{
    float:left;
  }
}

</style>
