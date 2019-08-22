import Vue from "vue";
import Vuex from "vuex";
import Todos from './Todos';
import user from './User';
Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        user: user,
        todos: Todos
    }
});