/**
 * @global backendException
 */
import '../scss/main.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    MdApp,
    MdToolbar,
    MdButton,
    MdContent,
    MdIcon,
    MdDrawer,
    MdList,
    MdField,
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import routes from './routes';
import Api from "./api";

Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdIcon);
Vue.use(MdDrawer);
Vue.use(MdList);
Vue.use(MdField);
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

const api = new Api('/api/v1');

var app = new Vue({
    router,
    delimiters: ['${', '}'],
    data: function () {
        return {
            ...serverData,
            title: 'Isaac Frontend Test',
            menuVisible: false,
        };
    },
    methods: {
        login: async function (username, password, url) {
            const user = await api.authenticate(username, password);
            if (user) {
                this.$set(this, 'user', user);
                if (url) {
                    await this.$router.push(url);
                }
            }
        },
        logout: async function (url) {
            await api.logout();
            this.$set(this, 'user', null);
            await this.$router.push(url);
        }
    }
});

app.$mount('#app');
