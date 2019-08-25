import Vue from "vue";

export default class TodoService {
    constructor(url) {
        this.url=url;
    }

     getTodos() {
        return Vue.axios.get(`/todo`);
    }

    completeTodo(id){
        return Vue.axios.get(`/todo/complete/${id}`);
    }

    deleteTodo(id){
        return Vue.axios.get(`/todo/delete/${id}`);
    }
    
    addTodo({description,userId}) {
        return Vue.axios.post(`/todo/add`,{userId,description});
        
    }
}