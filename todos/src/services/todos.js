import Vue from "vue";

export default class TodoService {
    constructor(url) {
        this.url=url;
    }

     getTodos() {
        return Vue.axios.get(`http://${this.url}/todo`);
    }

    completeTodo(id){
        return Vue.axios.get(`http://${this.url}/todo/complete/${id}`);
    }

    deleteTodo(id){
        return Vue.axios.get(`http://${this.url}/todo/delete/${id}`);
    }
    
    addTodo({description,userId}) {
        return Vue.axios.post(`http://${this.url}/todo/add`,{userId,description});
        
    }
}