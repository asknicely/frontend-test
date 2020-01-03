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
import * as cookies from 'browser-cookies';

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
        let user = null;
        if (cookies.get('username')) {
            user = {
                username: cookies.get('username')
            };
            api.getTodos().then(todos => {
                this.$set(this, 'todos', todos);
            })
        }

        return {
            todos: null,
            user,
            loginError: null,
            title: 'Isaac Frontend Test',
            menuVisible: false,
            exception: {
                code: cookies.get('code'),
                message: cookies.get('message')
            }
        }
    },
    methods: {
        login: async function (username, password, url) {
            try {
                const user = await api.authenticate(username, password);
                if (user) {
                    this.$set(this, 'user', user);
                    if (url) {
                        this.$set(this, 'todos', null);
                        await this.$router.push(url);
                        const todos = await api.getTodos();
                        this.$set(this, 'todos', todos);
                    }
                }
            } catch (e) {
                this.$set(this, 'loginError', e.message);
            }
        },
        removetodo: async function (todo) {
            await api.removeTodo(todo.id);
            this.$delete(this.todos, this.todos.indexOf(todo));
        },
        settodostatus: async function (todo, completed) {
            todo.completed = completed;
            await api.setTodoStatus(todo.id, completed);
            this.$set(this.todos, this.todos.indexOf(todo), todo);
        },
        addtodo: async function (newTodoName) {
            const todo = await api.addTodo(newTodoName);
            if (todo) {
                this.todos.push(todo);
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
