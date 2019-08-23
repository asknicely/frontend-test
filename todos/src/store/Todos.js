import Vue from "vue";
import TodosService from '../services/todos'
const todosService = new TodosService('localhost:1337');

export default {
    namespaced: true,
    state: {
        todos:{}
    },

    getters:{
        getTodos(state){
            return state.todos
        },
    },
    
    mutations: {
        saveTodos(state, { todos }) {
            todos.forEach(i => {
                Vue.set(state.todos, i.id, i);
            });
        },
        deleteTodo(state, { todo }) {
            Vue.delete(state.todos, todo.id);
        },
    },
    actions: {
        async getTodosAsync({commit}){
            const response = await todosService.getTodos();
            const todos = response.data.map(todo=>{
                return {
                    ...todo,
                    completed:todo.completed==1? true: false,
                }
            });
            commit('saveTodos', {todos});
            return todos;
        },

        async completeTodoAsync({commit},{todo}){
            const response = await todosService.completeTodo(todo.id);
            return response;
        },

        async deleteTodoAsync({commit},{todo}){
            const response = await todosService.deleteTodo(todo.id);
            commit('deleteTodo', { todo });
            return response;
        },

        async addTodoAsync({commit},{description,userId}){
            const response = await todosService.addTodo({description,userId});
            
            return response;
        },
        
        
        
    }
}