<template>
  <div id="app">
      <header>
        <router-link tag="span" to="/" class="left pointer">{{currentPath==="/home"?"":"返回"}}</router-link>
        <span class="center">头部</span>
        <span class="right blue"></span>
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
        this.currentPath=to.path

      }
    }
  }
</script>
<style lang="scss" scoped>
  #app{
    padding:0 10px;
    border:1px dashed #f2f2f2;
  }
  body{
    background: $f2;
  }
  header{
    display: flex;
    border-bottom: 1px dashed #333333;
    margin-bottom: 20px;
    background: $brown;
    span{
      padding:10px 0 ; text-align: center;
    }
    span.left{
      flex: 1;
      &:hover{
        cursor: pointer;
        background: $gay;
      }
    }
    span.right{
      flex: 1;
    }
    span.center{
      flex:3;
    }
  }
  .blue{
    color:blue;
  }

</style>
