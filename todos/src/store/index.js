import Vue from "vue";
import Vuex from "vuex";
import Todos from './Todos';
import user from './User';
import UserService from '../services/user'
const userService = new UserService('localhost:1337');
Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        user: user(userService),
        todos: Todos
    }
});