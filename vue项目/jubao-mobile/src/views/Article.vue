<template>
  <div class="artic content_box top0">
    <div class="content">
      <div class="mess">
        <img src="../assets/img/article/lao-pic.jpg">
      </div>
      <ul class="jm_list">
        <li class="list" v-for="(menu,key) in list" @click="menu.isShow=!menu.isShow">
          <div :aid="menu.id" class="list_mes" v-touchFeel="{color:'#f2f2f2'}">
            <p>{{menu.name}}</p>
            <i class="iconfont icon-right" :class="{rotate:menu.isShow}"></i>
          </div>
          <panel :flag="menu.isShow">
            <router-link v-for="(item,index) in menu.children"
                         :key="index"
                         :aid="item.id"
                         class="list_item"
                         :to="'/artDetail/'+item.id"
                         tag="span"
                         v-touchFeel="{color:'#f2f2f2'}"
            >
              <span>{{item.name}}</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </panel>
        </li>
      </ul>
    </div>
    <tab></tab>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import Tab from 'views/components/Tab'
  import Panel from 'base/panel/Panel'
  import {cmnCategoryList} from 'assets/js/api'

  export default {
    components: {
      Tab,
      Panel
    },
    data() {
      return {
        list: [],//老周解密所有文章
      }
    },
    created() {
      this.getListDetail();
    },
    methods: {
      getListDetail: function () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let data = {"id": 6};
        cmnCategoryList(data).then(res => {
          this.list = res.rows.map((item)=>{
            item.isShow = false;
            return item;
          });
          Indicator.close();
        }).catch((err) => {
          console.log("cmnCategoryList", err)
        })
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  div.content_box{
    top:0;bottom:pxToRem(100);
    overflow-y: inherit;
  }
  .artic {
    background: #eee;
    .mess {
      font-size: 0;
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .list {
    color: #000;
    margin: pxToRem(20) 0;
    background: #fff;
    line-height: pxToRem(100);
    .list_mes {
      height: pxToRem(100);
      position: relative;
      padding-left: pxToRem(30);
      font-weight: bold;
      color: #000;
      .iconfont {
        position: absolute;
        top: 0;
        right: pxToRem(30);
        transition: all .3s ease;
      }
    }
    .list_item {
      display: block;
      color: #333;
      line-height: pxToRem(90);
      height: pxToRem(90);
      font-size: pxToRem(28);
      @include border-1px('top');
      margin: 0 pxToRem(30);
      span{
        display: inline-block;
        width: 90%;
        @include no-wrap();
      }
      .iconfont {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .rotate{
      transform: rotate(90deg);
    }
  }
</style>
