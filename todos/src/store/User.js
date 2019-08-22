import UserService from '../services/user'
const userService = new UserService('localhost:1337');

export default {
    namespaced: true,
    state: {
        id:1,
        username: 'username'
    },
    mutations: {  },
    actions: {  
        login({}, {username, password}){
            userService.loginAsync({username, password})
            
        }
    }
}