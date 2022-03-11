import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import waves from './directive/waves/waves.js'
Vue.directive('waves', waves)

import copy from './directive/copy.js'
Vue.directive('copy', copy)

import time from './directive/time.js'
Vue.directive('time', time)




new Vue({
  render: h => h(App),
}).$mount('#app')