/*/////  Light Vue Todos for Symfony2.0 /////
///////  Author: Kinson Lau ///////////////////////// */

/*
  VUE CONFIG
*/
Vue.config.devtools = true // Remove for production
Vue.config.productionTip = false // Update for production

/* 
  EVENTS CENTRE
  This vue instance is used to dispatch and recieve events
  - Use $bus.$emit to send an event
  - Use $bus.$on to recieve an event
*/
var bus = new Vue({})
Object.defineProperty(Vue.prototype, '$bus', {
  get() {
    return this.$root.bus
  },
  set(newInstance) {
    this.$root.bus = newInstance
  }
})


/*
  ROOT COMPONENT
  METHODS
  - addToCart: Adds product via the product page and product tiles
  - updateQuantity: Updates an item in the cart
  - setFocus: Displays / hides the mobile search form and focuses
*/

import Todos from './vue/components/Todos.js'

new Vue({
  delimiters: ['${', '}'],
  el: '#app',
  data: {
    bus: new Vue()
  },
  components: {
    VueTodos: Todos
  }
})