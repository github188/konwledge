<template>
  <div class="home">
    <ul class="menu">
      <router-link v-for="(val,idx) in menuList"
                   tag="li"
                   :key="idx"
                   :to="val.link"
      >{{val.text}}
      </router-link>
    </ul>
  </div>
</template>

<script>
  import t from "./1.vue"

  export default {
    components: {
      t
    },
    data() {
      return {
        menuList: [
          {link: "/test", text: "测试页面"},
          {link: "/tabs", text: "tabs标签页"},
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
