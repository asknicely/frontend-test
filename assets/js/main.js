// Core
import Vue from 'vue';
import App from "./components/App";
import router from "./router/router";
import store from "./vuex/store";

// Plugins & Libraries
import { BVToastPlugin } from 'bootstrap-vue';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '../css/global.scss';

// Utils
import { showError, showToast } from "./utils/functions.utils";

// Load
Vue.use(BVToastPlugin);

Vue.mixin({
	computed: {
		is_mobile () {
			const isMobile = window.matchMedia("only screen and (max-width: 480px)");
			return isMobile.matches
		}
	},
	methods: {
		showError,
		showToast
	}
})

new Vue({
	router,
	store,
	render : h => h(App)
}).$mount('#app');
