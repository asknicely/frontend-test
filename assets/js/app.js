import Vue from 'vue';
import App from "./components/App";
import router from "./router/router";
import store from "./vuex/store";
import { LayoutPlugin, TablePlugin, ButtonPlugin, ModalPlugin, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '../../web/css/global.scss'

Vue
	.use(LayoutPlugin)
	.use(TablePlugin)
	.use(ModalPlugin)
	.use(IconsPlugin)
	.use(ButtonPlugin);

new Vue({
	router,
	store,
	render : h => h(App)
}).$mount('#app');
