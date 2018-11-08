<template>
  <el-menu :default-active="$route.path.split('/')[2]" router mode="horizontal" background-color="#0F2744" text-color="#7f8fa4" active-text-color="#fff">
    <el-menu-item v-for="item in mainMenuData" :index="item.menuPath" :key="item.menuId" v-if="(!item.children||item.children.length===0)">{{item.menuName}}</el-menu-item>

    <el-submenu v-for="item2 in mainMenuData" :index="item2.menuName" :key="item2.menuId" v-if="(item2.children&&item2.children.length>1)">
      <template slot="title">{{item2.menuName}}</template>
      <el-menu-item v-for="i in item2 .children" :index="i.menuPath" :key="i.menuId">{{i.menuName}}</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  mounted() {
  },
  computed: {
    mainMenuData() {
      return this.$store.getters.mainMenuData;
    }
  }
};
</script>

<style lang="less">
.el-menu-item {
  font-size: 16px !important;
}
.el-menu-item.is-active {
  border: none 0 !important;
}
.el-submenu__title {
  font-size: 16px !important;
}
.el-menu--horizontal {
  .el-menu {
    background-color: #fff !important;
    border-radius: 3px;
    .el-menu-item {
      background-color: #fff !important;
      font-size: 14px !important;
      &:hover {
        background-color: #f2f4f7 !important;
      }
    }
    .el-menu-item.is-active {
      color: #000 !important;
    }
  }
}
</style>


