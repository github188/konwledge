<template>
    <el-menu :default-active="$route.path.split('/')[2]" router class="el-menu-demo" mode="horizontal" background-color="#0F2744" text-color="#7f8fa4" active-text-color="#fff">
        <el-menu-item :index="item.menuPath" v-for="item in manageMenuData" :key="item.menuId" v-if="(!item.children||item.children.length===0)">{{item.menuName}}</el-menu-item>

        <el-submenu :index="item2.menuName" v-for="item2 in manageMenuData" :key="item2.menuId" v-if="(item2.children&&item2.children.length>1)">
            <template slot="title">{{item2.menuName}}</template>
            <el-menu-item :index="i.menuPath" v-for="i in item2 .children" :key="i.menuId">{{i.menuName}}</el-menu-item>
        </el-submenu>

    </el-menu>
</template>

<script>
export default {
    computed: {
        manageMenuData() {
            return this.$store.getters.manageMenuData;
        }
    }
};
</script>


