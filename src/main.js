import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import $ from 'jquery'
import _ from 'lodash'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
