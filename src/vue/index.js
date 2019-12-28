require('../scss/main.scss');

const Vue = require('vue').default;
const VueRouter = require('vue-router').default;

Vue.use(VueRouter);


const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

var app = new Vue({
    router,
    delimiters: ['${', '}'],
    watch: {
        '$route' (to, from) {
            document.title = to.meta.title || 'Your Website'
        }
    },
    data: {
        message: 'Hello Vue!',
        title: 'Isaac Frontend Test'
    }
}).$mount('#app');
