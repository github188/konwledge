<template>
  <div id="app">
      <header>
        <router-link tag="span" to="/" class="left pointer">{{currentPath==="/home"?"":"返回"}}</router-link>
        <span class="center">头部</span>
        <span class="right"></span>
      </header>
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {
        currentPath:"/"
      }
    },
    created(){


    },
    mounted(){

    },
    methods:{

    },
    watch: {
      '$route': function (to, from) {
        console.log(to.path)
        this.currentPath=to.path

      }
    }
  }
</script>
<style lang="scss" scoped>
  body{
    background: $f2;
  }
  header{
    display: flex;
    border-bottom: 1px solid #333333;
    margin-bottom: 20px;

    span{
      padding:10px 0 ; text-align: center;
    }
    span.left{
      flex: 1;
      &:hover{
        cursor: pointer;
        background: $white;
      }
    }
    span.right{
      flex: 1;
    }
    span.center{
      flex:3;
    }
  }

</style>
