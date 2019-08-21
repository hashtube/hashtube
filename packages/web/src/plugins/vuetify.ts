import { Context, Plugin } from '@nuxt/types'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const vuetifyPlugin: Plugin = ({ app }: Context) => {
  app.vuetify = new Vuetify({
    theme: {},
  })
}

export default vuetifyPlugin
