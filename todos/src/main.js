import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './routes'
import store from './store'
import VeeValidate from 'vee-validate';




console.log(process.env)

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VeeValidate);


Vue.config.productionTip = false

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
