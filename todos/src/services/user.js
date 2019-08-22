import Vue from "vue";

export default class UserService {
    constructor(url) {}

async loginAsync(file) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await Vue.axios.post(`${this.url}/login`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        return response;
    } catch (e) {
        throw e;
    }
}
}