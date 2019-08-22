import Vue from "vue";

export default class UserService {
    constructor(url) {
        this.url=url;
    }

async loginAsync({username,password}) {
    try {
        const response = await Vue.axios.post(`http://${this.url}/login`,{username,password});
        return response;
    } catch (e) {
        throw e;
    }
}
}