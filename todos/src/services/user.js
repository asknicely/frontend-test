import Vue from "vue";

export default class UserService {
    constructor(url) {
        this.url=url;
    }

    loginAsync({username,password}) {
        return Vue.axios.post(`http://${this.url}/login`,{username,password});
    }
}