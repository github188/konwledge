const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/GrindPlayer/swfobject.js'},
      { src: '/ckplayer/ckplayer.js'},
      { src: '/echarts/echarts.min.js'},
      { src: '/three/three.js'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    {
      src: '~assets/scss/base/index.scss',
      lang: 'scss'
    },
    'element-ui/lib/theme-chalk/index.css',
    {
      src: '~assets/scss/common/index.scss',
      lang: 'scss'
    }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~plugins/element-ui/element-ui.js', ssr: true},
    {src: '~plugins/vue-i18n/vue-i18n.js', ssr: true},
    {src: '~plugins/vue-install/index.js', ssr: true}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    },
    styleResources: {
      scss: './assets/scss/base/index.scss',
      options: {
        // See https://github.com/yenshih/style-resources-loader#options
        // Except `patterns` property
      }
    },
    vendor:['element-ui']
  }
}
