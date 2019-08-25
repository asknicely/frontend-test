import Vue from "vue";

export default class UserService {
    constructor(url) {
        this.url=url;
    }

    loginAsync({username,password}) {
        return Vue.axios.post(`/login`,{username,password});
    }
}