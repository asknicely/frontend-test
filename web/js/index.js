import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueToast from 'vue-toast-notification';
import babelPolyfill from 'babel-polyfill'
import App from './App'

// Vue Instance Global Plugins
Vue.use(VueAxios, axios)
Vue.use(VueToast, {
    position: 'top'
})

// when the template loaded then trigger Vue app instance
document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        el: '#vue-todos',
        render: h => h(App)
    });
});