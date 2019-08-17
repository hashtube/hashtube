import { Context } from '@nuxt/vue-app'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default ({ app }: Context) => {
  app.vuetify = new Vuetify({
    theme: {},
  })
}
