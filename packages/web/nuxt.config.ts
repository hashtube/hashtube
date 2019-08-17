import NuxtConfiguration from '@nuxt/config'
import path from 'path'
import sass from 'sass'

const nuxtConfig: NuxtConfiguration = {
  rootDir: __dirname,
  srcDir: path.join(__dirname, 'src'),
  server: {
    port: 4000,
  },
  serverMiddleware: [{ path: '/api', handler: path.join(__dirname, 'src/server/api-handler') }],
  plugins: [path.join(__dirname, 'src/plugins/vuetify.ts')],
  head: {
    titleTemplate: (title: string): string => {
      return `${title ? `${title} - ` : ''}HashTube`
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
      },
    ],
  },
  css: [path.join(__dirname, 'src/assets/main.scss')],
  build: {
    extractCSS: true,
    typescript: {
      typeCheck: {
        // Only check src files
        reportFiles: ['src/**/*.{ts,tsx}'],
      },
    },
    loaders: {
      scss: {
        implementation: sass,
      },
    },
  },
}

export default nuxtConfig
