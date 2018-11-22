<template>
  <div class="Home" :class="$i18n.locale">
    <v-header :title="$t('home.title')"></v-header>
    <transition name="slide-fade" mode="out-in">
      <router-view class="big-layout"></router-view>
    </transition>
  </div>
</template>

<script>
  import VHeader from '~/components/content/VHeader/VHeader.vue'
  export default {
    components: {
      VHeader
    },
    data () {
      return {

      }
    },
    mounted () {
      // this._initLanguage()
    },
    methods: {
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bg:'~assets/images/big_bg.png';
  .Home{
    display: flex;
    flex-direction: column;
    min-height:100vh;
    // min-width:1500px;
    .big-layout{
      flex: 1;
      overflow: hidden;
      min-width:1500px;
      /*display: flex;*/
    }
  }

.slide-fade-enter-active, .slide-fade-leave-active{
  transition: all 300ms ease;
}
.slide-fade-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
