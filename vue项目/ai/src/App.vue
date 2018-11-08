<template>
  <router-view></router-view>
</template>


<script>

export default {
  name: 'app',
  methods: {
    getMenu() {
      this._services.getMenu().then(res => {
        if (parseInt(res.errorCode, 10) !== 0) {
          this.tools.message(res.message, 'error');
          return;
        }
        this.$store.commit('saveMenuData', res.data);
      });
    }
  },
  mounted() {
    let { path } = this.$route;

    if (!path.includes('/login')) {
      this.getMenu();
    }
  },
  updated() {
    let { path } = this.$route;

     if (path.includes('/homepage')) {
      this.getMenu();
    }
  }
};
</script>


<style lang="less" >
html,
body {
  height: 100%;
  width: 100%;
}
* {
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
#app {
  height: 100%;
}
.el-menu {
  border: 0 none !important;
}
.el-menu--horizontal {
  border: 0 none !important ;
}
/*滚动条*/
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  /* background-color: #f1f1f1; */
  background-color: transparent;
  border-radius: 10px;
}

.fl {
  float: left;
}
.fr {
  float: right;
}
.pointer {
  cursor: pointer;
}
.oh {
  overflow: hidden;
}
</style>
