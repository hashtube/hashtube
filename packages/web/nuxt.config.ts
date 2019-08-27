import { Configuration } from '@nuxt/types'
import path from 'path'
import sass from 'sass'

const nuxtConfig: Configuration = {
  rootDir: __dirname,
  srcDir: path.join(__dirname, 'src'),
  server: {
    host: '0.0.0.0',
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
  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: {
        // Only check src files
        reportFiles: ['src/**/*.{ts,tsx}'],
      },
    }],
  ],
  build: {
    extractCSS: true,
    loaders: {
      scss: {
        implementation: sass,
      },
    },
    babel: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
}

export default nuxtConfig
