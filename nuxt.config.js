
export default {
  webpack: {
    filenames: {
      chunk: ({ isDev }) => 'server.js'
    },
    filenames: 'main.js'
  },
  ssr: false,
  filenames: {
    chunk: ({ isDev }) => 'server.js'
  },
  builder: 'webpack',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-store',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  alias: {
    '~': `${__dirname}/`
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/static/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // 其他插件
    '~/plugins/axios.js' // 添加自定义的 axios 插件
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // // https://go.nuxtjs.dev/chakra
    // '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'https://chat-api.scaperow.com',
    baseURL: process.env.BASE_URL || 'http://localhost:8888',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:8888'
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:8888'
    }
  },

  // serverMiddleware: [
  //   { path: '/api', handler: '~/api/orders.ts' },
  //   async (req, res, next) => {
  //     // 执行其他自定义的设置操作
  //     const AV = require('leancloud-storage');
  //     const appId = 'tHpsOodTG4tgJqbEWIvHOyBk-gzGzoHsz';
  //     const appKey = 'IDjAYSEOB1rXIpR0ndU8nn2V';
  //     AV.init({ appId, appKey, serverURL: 'https://thpsoodt.lc-cn-n1-shared.com' });

  //     // 调用下一个中间件或处理程序
  //     next();
  //   }
  // ],
}
