import Vue from "vue";

export default class UserService {
    constructor(url) {
        this.url=url;
    }

     getTodosAsync() {
        return Vue.axios.get(`http://${this.url}/todo`);
    }
}