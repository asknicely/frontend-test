import Vue from "vue";

export default class TodoService {
    constructor(url) {
        this.url=url;
    }

     getTodos() {
        return Vue.axios.get(`http://${this.url}/todos/1`);
    }

    completeTodo(id){
        return Vue.axios.get(`http://${this.url}/todo/complete/${id}`);
    }
    
    completeTodo(id){
        return Vue.axios.delete(`http://${this.url}/todo/delete/${id}`);
    }
    
    addTodo({description,userId}) {
        return Vue.axios.post(`http://${this.url}/todo/add`,{description, userId});
    }
}