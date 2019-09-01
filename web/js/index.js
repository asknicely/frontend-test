import Vue from 'vue'
import App from './App'

// when the template loaded then trigger Vue app instance
document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        el: '#vue-todos',
        render: h => h(App)
    });
});