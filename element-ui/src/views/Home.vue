<template>
  <div class="home">
    <ul class="menu fl">
      <router-link v-for="(val,idx) in menuList"
                   tag="li"
                   :key="idx"
                   :to="val.link"
      >{{val.text}}
      </router-link>
    </ul>
    <ul class="menu fl">
      <router-link v-for="(val,idx) in elementList"
                   tag="li"
                   :key="idx"
                   :to="val.link"
      >{{val.text}}
      </router-link>
    </ul>
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
          {link: "/tabs", text: "tabs标签页"},
          {link:"/checkbox",text:"checkbox三级选项"},
          {link:"/loadmore",text:"loadmore（H5）"}
        ],
        elementList: [
          {link: "/elTabs", text: "element tabs"},
        ]

      }
    },
    methods: {},
    created() {

    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .menu {
    width:40%;margin:0 2%;
    padding: 10px;
    border: 1px solid $borderColor;
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
