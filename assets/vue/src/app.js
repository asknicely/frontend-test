/* /////  Light Vue Todos - Symfony2.0 /////
///////  Author: Kinson Lau ///////////////////////// */

/*
  Import Vue components
*/
import Vue from 'vue'
import Todos from './views/Todos'

/*
  VUE CONFIG
*/
Vue.config.devtools = true // Remove for production
Vue.config.productionTip = false // Update for production

/*
  Init vue app
*/
/* eslint-disable no-new */
new Vue({
  delimiters: ['${', '}'],
  el: '#app',
  components: {
    Todos: Todos
  }
})
