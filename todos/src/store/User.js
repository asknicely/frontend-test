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
        async login({}, {username, password}){
           const response =await userService.loginAsync({username, password});
           console.log(response);
            
        }
    }
}