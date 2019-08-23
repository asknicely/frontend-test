import TodosService from '../services/todos'
const todosService = new TodosService('localhost:1337');

export default {
    namespaced: true,
    state: {
    },
    mutations: {  },
    actions: {
        async getTodos({commit}){
            const response = await todosService.getTodosAsync();
            console.log(response);
            //const user = JSON.parse(response.data);
           // commit('setUser', {id:user.id, username: user.username});
            return response;
        },
    }
}