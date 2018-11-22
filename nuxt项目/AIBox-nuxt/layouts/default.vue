<template>
  <div>
    <nuxt v-if="$store.state.isRouterAlive"/>
  </div>
</template>

<script>
import {_rePaint} from '~/assets/js/mixins/index'
export default {
  mixins: [_rePaint],
  mounted () {
    this._initLanguage()
  },
  methods : {
    async _initLanguage () {
      let res = await this.$api.getLanguage()
      this.$store.state.language = this.$i18n.locale = res.data.type * 1 === 2 ? 'en' : 'zh'
      this._rePaint()
    }
  }
}
</script>


<style>

</style>
