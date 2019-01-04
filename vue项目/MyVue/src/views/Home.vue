<template>
  <div class="home">
    <ul class="menu">
      <h3>自定义组件</h3>
      <router-link v-for="(val,idx) in menuList"
                   tag="li"
                   :key="idx"
                   :to="val.link"
      >{{val.text}}
      </router-link>
    </ul>
    <ul class="menu">
      <h3>element ui</h3>
      <router-link v-for="(val,idx) in elementList"
                   tag="li"
                   :key="idx"
                   :to="val.link"
      >{{val.text}}
      </router-link>
    </ul>

    <ul class="menu">
      <h3>mint ui</h3>
      <router-link v-for="(val,idx) in mintList"
                   tag="li"
                   :key="idx"
                   :to="val.link"
      >{{val.text}}
      </router-link>
    </ul>
    <img src="../assets/img/reset-procedure.png" alt="" v-enlarge>
    <div style="height:300px;background: #0ED1C1">

    </div>
  </div>
</template>

<script>
  import t from "./test/1.vue"

  export default {
    components: {
      t
    },
    data() {
      return {
        menuList: [
          {link: "/test", text: "测试页面"},
          {link: "/checkbox", text: "checkbox三级选项"},
        ],
        elementList: [
          {link: "/elTabs", text: "element tabs"},
        ],
        mintList: [
          {link: "/loadmore", text: "loadmore（H5）"},
        ]
      }
    },
    methods: {},
    created() {

    },
    mounted() {

    },
  }
</script>

<style lang="scss" scoped>
  .menu {
    display: inline-block;
    width: 40%;
    margin: 2%;
    padding: 10px;
    border: 1px solid $borderColor;
    h3 {
      margin:10px;
    }
    li {
      padding: 10px;
      &:nth-of-type(2n) {
        background: $oldlace;
      }
      &:nth-of-type(2n+1) {
        background: $shallowGreen;
      }
      &:hover {
        background: $gay;
        cursor: pointer;
      }
    }
  }

</style>
